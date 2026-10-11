import type Stripe from "stripe";
import { stripe, planOfSubscription } from "@/lib/stripe";
import { env } from "@/lib/env";
import { appendRow, readRows, nowStamp } from "@/lib/sheets";
import { notifyPeter } from "@/lib/email";
import { sendWelcome, sendCanceled } from "@/lib/mailers";
import { markPick, markTryout } from "@/lib/picks";
import { refreshRoster } from "@/lib/roster";
import { longDate, ordinal, pacificParts } from "@/lib/dates";
import { plans, type PlanId } from "@/content/site";
import { emails } from "@/content/emails";
import { fill } from "@/content/copy";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function alreadyHandled(id: string) {
  try {
    const rows = await readRows("Events");
    return rows.some((r) => r["Stripe event ID"] === id);
  } catch (err) {
    console.error("[webhook] could not read Events tab, processing anyway:", (err as Error).message);
    return false;
  }
}

async function recordHandled(e: Stripe.Event) {
  try {
    await appendRow("Events", { Timestamp: nowStamp(), "Stripe event ID": e.id, Type: e.type });
  } catch (err) {
    console.error("[webhook] could not record event:", (err as Error).message);
  }
}

async function customerEmail(customer: string | Stripe.Customer | Stripe.DeletedCustomer | null) {
  if (!customer) return "";
  if (typeof customer !== "string") return "email" in customer ? (customer.email ?? "") : "";
  const c = await stripe().customers.retrieve(customer);
  return "email" in c ? (c.email ?? "") : "";
}

async function onCheckoutCompleted(session: Stripe.Checkout.Session) {
  if (session.mode !== "subscription" || !session.subscription) return;
  const sub = await stripe().subscriptions.retrieve(typeof session.subscription === "string" ? session.subscription : session.subscription.id);
  const plan = (planOfSubscription(sub) ?? session.metadata?.plan) as PlanId | undefined;
  if (!plan || !plans[plan]) {
    await notifyPeter("Signing with unknown plan", { session: session.id, subscription: sub.id });
    return;
  }
  const email = session.customer_details?.email ?? (await customerEmail(session.customer));
  const name = session.customer_details?.name ?? "";
  const openingDay = (session.total_details?.amount_discount ?? 0) > 0;
  const renewDay = ordinal(pacificParts(new Date(sub.billing_cycle_anchor * 1000)).day);

  if (email) {
    try {
      await sendWelcome(email, { plan, renewDay, openingDay, sessionId: session.id });
    } catch (err) {
      console.error("[webhook] welcome email failed:", (err as Error).message);
      await notifyPeter(`WELCOME EMAIL FAILED: ${email}`, `Send the welcome email by hand. It's required. Error: ${(err as Error).message}`);
    }
  }

  await notifyPeter(fill(emails.peter.signing, { email, plan: plans[plan].name }), {
    Name: name,
    Email: email,
    Plan: plans[plan].name,
    "Opening Day": openingDay ? "yes" : "no",
    "Renews on": `the ${renewDay}`,
    Subscription: sub.id,
  });

  try {
    await appendRow("Members", {
      Timestamp: nowStamp(),
      Email: email,
      Name: name,
      Plan: plans[plan].name,
      Price: String(openingDay ? plans[plan].openingDayPrice : plans[plan].price),
      "Opening Day": openingDay ? "yes" : "no",
      "Customer ID": typeof session.customer === "string" ? session.customer : (session.customer?.id ?? ""),
      "Subscription ID": sub.id,
      "Renews on day": renewDay,
    });
  } catch (err) {
    console.error("[webhook] Members row failed:", (err as Error).message);
  }

  const linkId = typeof session.payment_link === "string" ? session.payment_link : session.payment_link?.id;
  await markPick(linkId, "Signed");
  if (email) await markTryout(email, "Signed");
  refreshRoster();
}

async function onSubscriptionUpdated(sub: Stripe.Subscription, prev: Partial<Stripe.Subscription> | undefined) {
  // Member scheduled a cancel in the portal: confirm it now, with their last day.
  const nowScheduled = Boolean(sub.cancel_at) || sub.cancel_at_period_end;
  const wasScheduled = prev && ("cancel_at" in prev || "cancel_at_period_end" in prev) ? Boolean(prev.cancel_at) || Boolean(prev.cancel_at_period_end) : nowScheduled;
  if (!nowScheduled || wasScheduled) return;
  const end = sub.cancel_at ?? sub.items.data[0]?.current_period_end;
  const email = await customerEmail(sub.customer);
  if (email && end) await sendCanceled(email, longDate(new Date(end * 1000)));
  const plan = planOfSubscription(sub);
  await notifyPeter(`Cancel scheduled: ${email}, ${plan ? plans[plan].name : "?"}`, `Spot opens on ${end ? longDate(new Date(end * 1000)) : "?"}.`);
}

async function onSubscriptionDeleted(sub: Stripe.Subscription) {
  const plan = planOfSubscription(sub);
  const email = await customerEmail(sub.customer);
  // If the member didn't schedule this themselves (Peter canceled, or payment failed for good), confirm it now.
  if (!sub.cancel_at && !sub.cancel_at_period_end && email) {
    await sendCanceled(email, longDate(new Date((sub.ended_at ?? Date.now() / 1000) * 1000)));
  }
  await notifyPeter(fill(emails.peter.spotOpened, { plan: plan ? plans[plan].name : "unknown plan" }), { Email: email, Subscription: sub.id });
  refreshRoster();
}

async function onPaymentFailed(invoice: Stripe.Invoice) {
  const email = invoice.customer_email ?? (await customerEmail(invoice.customer));
  await notifyPeter(fill(emails.peter.paymentFailed, { email }), {
    Email: email,
    Amount: `$${(invoice.amount_due / 100).toFixed(2)}`,
    Attempt: invoice.attempt_count,
    Invoice: invoice.hosted_invoice_url ?? invoice.id,
  });
}

export async function POST(req: Request) {
  const secret = env.stripeWebhookSecret();
  const sig = req.headers.get("stripe-signature");
  if (!secret || !sig) return new Response("Missing signature", { status: 400 });

  let event: Stripe.Event;
  try {
    event = stripe().webhooks.constructEvent(await req.text(), sig, secret);
  } catch (err) {
    console.error("[webhook] bad signature:", (err as Error).message);
    return new Response("Bad signature", { status: 400 });
  }

  if (await alreadyHandled(event.id)) return Response.json({ received: true, duplicate: true });

  try {
    switch (event.type) {
      case "checkout.session.completed":
        await onCheckoutCompleted(event.data.object);
        break;
      case "customer.subscription.updated":
        await onSubscriptionUpdated(event.data.object, event.data.previous_attributes as Partial<Stripe.Subscription> | undefined);
        break;
      case "customer.subscription.deleted":
        await onSubscriptionDeleted(event.data.object);
        break;
      case "invoice.payment_failed":
        await onPaymentFailed(event.data.object);
        break;
      default:
        return Response.json({ received: true, ignored: event.type });
    }
  } catch (err) {
    console.error(`[webhook] ${event.type} failed:`, err);
    // 500 so Stripe retries. Nothing was recorded, so the retry runs fully.
    return new Response("Handler error", { status: 500 });
  }

  await recordHandled(event);
  return Response.json({ received: true });
}
