import type Stripe from "stripe";
import { stripe, productFromPrice, productOfSubscription, isProductId, hasPaidBefore } from "@/lib/stripe";
import { env } from "@/lib/env";
import { appendRow, readRows, nowStamp } from "@/lib/sheets";
import { notifyPeter } from "@/lib/email";
import { sendCallPaid, sendPlanWelcome, sendCanceled } from "@/lib/mailers";
import { longDate, ordinal, pacificParts } from "@/lib/dates";
import { products, partnerPayout, type ProductId } from "@/content/site";
import { findPartner } from "@/content/partners";
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

const idOf = (v: string | { id: string } | null | undefined) => (typeof v === "string" ? v : (v?.id ?? ""));
const refTag = (code: string) => (code ? fill(emails.peter.refTag, { code }) : "");

/** Which month of a subscription a payment falls in: 1 for the first, 2 for the first renewal, and so on. */
function monthIndex(sub: Stripe.Subscription, periodStart: number) {
  return Math.max(1, Math.round((periodStart - sub.start_date) / (30 * 24 * 60 * 60)) + 1);
}

/** One row in the Sales tab plus a note to Peter. This is the record partner payouts are paid from. */
async function recordSale(o: {
  kind: "Sale" | "Renewal" | "Refund";
  product: ProductId;
  amount: number;
  email: string;
  name: string;
  ref: string;
  month: number;
  flags?: string;
  stripeId: string;
  customerId: string;
  subscriptionId: string;
}) {
  const partner = findPartner(o.ref);
  const payout = partner ? partnerPayout(o.product, o.month) * (o.kind === "Refund" ? -1 : 1) : 0;
  const row = {
    Timestamp: nowStamp(),
    Kind: o.kind,
    Product: products[o.product].name,
    Amount: (o.kind === "Refund" ? -o.amount : o.amount).toFixed(2),
    Email: o.email,
    Name: o.name,
    "Partner code": partner?.code ?? o.ref,
    "Partner name": partner?.name ?? "",
    "Month #": String(o.month),
    Payout: payout ? payout.toFixed(2) : "",
    Flags: o.flags ?? "",
    "Stripe ID": o.stripeId,
    "Customer ID": o.customerId,
    "Subscription ID": o.subscriptionId,
  };
  let sheetError = "";
  try {
    await appendRow("Sales", row);
  } catch (err) {
    sheetError = (err as Error).message;
    console.error("[webhook] Sales row failed:", sheetError);
  }
  const template = o.kind === "Sale" ? emails.peter.sale : o.kind === "Renewal" ? emails.peter.renewal : emails.peter.refund;
  const subject = fill(template, { product: products[o.product].name, amount: o.amount.toFixed(0), email: o.email, ref: refTag(partner?.code ?? o.ref) }) + (o.flags ?? "");
  await notifyPeter(subject, { ...row, ...(sheetError ? { "SHEET WRITE FAILED": sheetError } : {}) }, o.email || undefined);
}

async function onCheckoutCompleted(session: Stripe.Checkout.Session) {
  const full = await stripe().checkout.sessions.retrieve(session.id, { expand: ["line_items"] });
  const price = full.line_items?.data[0]?.price?.id;
  const product = productFromPrice(price) ?? (isProductId(full.metadata?.product) ? full.metadata!.product : null);
  const email = full.customer_details?.email ?? (await customerEmail(full.customer));
  const name = full.customer_details?.name ?? "";
  const ref = (full.client_reference_id ?? full.metadata?.ref ?? "").toLowerCase();
  const amount = (full.amount_total ?? 0) / 100;
  const customerId = idOf(full.customer);

  if (!product) {
    await notifyPeter(emails.peter.unknownProduct, { Session: full.id, Email: email, Amount: amount, Price: price ?? "" });
    return;
  }

  // Tell the buyer what to do next.
  if (email) {
    try {
      if (product === "call") await sendCallPaid(email, full.id);
      else if (full.subscription) {
        const sub = await stripe().subscriptions.retrieve(idOf(full.subscription));
        await sendPlanWelcome(email, { product, renewDay: ordinal(pacificParts(new Date(sub.billing_cycle_anchor * 1000)).day) });
      }
    } catch (err) {
      console.error("[webhook] buyer email failed:", (err as Error).message);
      await notifyPeter(`BUYER EMAIL FAILED: ${email} (${products[product].name})`, `Send it by hand. Session ${full.id}. Error: ${(err as Error).message}`);
    }
  }

  // The partner discount is for first purchases only. Stripe can't check that by email, so flag it here.
  let flags = "";
  if (ref && (full.total_details?.amount_discount ?? 0) > 0) {
    try {
      if (await hasPaidBefore(email, customerId)) flags = emails.peter.returning;
    } catch (err) {
      console.error("[webhook] returning-customer check failed:", (err as Error).message);
    }
  }

  await recordSale({
    kind: "Sale",
    product,
    amount,
    email,
    name,
    ref,
    month: 1,
    flags,
    stripeId: full.id,
    customerId,
    subscriptionId: idOf(full.subscription),
  });
}

/** A plan renewed. Logged with the month number so the partner's 12 months can be counted. The first invoice is covered by checkout. */
async function onInvoicePaid(invoice: Stripe.Invoice) {
  if (invoice.billing_reason !== "subscription_cycle") return;
  const subId = idOf(invoice.parent?.subscription_details?.subscription);
  if (!subId) return;
  const sub = await stripe().subscriptions.retrieve(subId);
  const product = productOfSubscription(sub);
  if (!product) return;
  const email = invoice.customer_email ?? (await customerEmail(invoice.customer));
  await recordSale({
    kind: "Renewal",
    product,
    amount: (invoice.amount_paid ?? 0) / 100,
    email,
    name: invoice.customer_name ?? "",
    ref: (sub.metadata?.ref ?? "").toLowerCase(),
    month: monthIndex(sub, invoice.period_start),
    stripeId: invoice.id ?? "",
    customerId: idOf(invoice.customer),
    subscriptionId: sub.id,
  });
}

/** A refund: a negative row so the partner's payout for that payment is pulled. */
async function onChargeRefunded(charge: Stripe.Charge) {
  const s = stripe();
  const email = charge.billing_details?.email ?? charge.receipt_email ?? (await customerEmail(charge.customer));
  const name = charge.billing_details?.name ?? "";
  const customerId = idOf(charge.customer);
  const refunded = (charge.amount_refunded ?? 0) / 100;

  // Find what the charge paid for: a Checkout Session (one-time) or an invoice (plan).
  const sessions = await s.checkout.sessions.list({ payment_intent: idOf(charge.payment_intent) || undefined, limit: 1 }).catch(() => null);
  const session = sessions?.data[0];
  if (session) {
    const full = await s.checkout.sessions.retrieve(session.id, { expand: ["line_items"] });
    const product = productFromPrice(full.line_items?.data[0]?.price?.id) ?? (isProductId(full.metadata?.product) ? full.metadata!.product : null);
    if (!product) return;
    await recordSale({
      kind: "Refund",
      product,
      amount: refunded,
      email,
      name,
      ref: (full.client_reference_id ?? full.metadata?.ref ?? "").toLowerCase(),
      month: 1,
      stripeId: charge.id,
      customerId,
      subscriptionId: idOf(full.subscription),
    });
    return;
  }
  const pi = idOf(charge.payment_intent);
  const invoices = customerId ? await s.invoices.list({ customer: customerId, limit: 24, expand: ["data.payments"] }).catch(() => null) : null;
  const invoice = invoices?.data.find((i) => (i.payments?.data ?? []).some((p) => idOf(p.payment.charge) === charge.id || (pi && idOf(p.payment.payment_intent) === pi)));
  if (!invoice) {
    await notifyPeter(`Refund with no matching sale: $${refunded.toFixed(2)} to ${email}`, { Charge: charge.id, Customer: customerId });
    return;
  }
  const subId = idOf(invoice.parent?.subscription_details?.subscription);
  if (!subId) return;
  const sub = await s.subscriptions.retrieve(subId);
  const product = productOfSubscription(sub);
  if (!product) return;
  await recordSale({
    kind: "Refund",
    product,
    amount: refunded,
    email,
    name,
    ref: (sub.metadata?.ref ?? "").toLowerCase(),
    month: monthIndex(sub, invoice.period_start),
    stripeId: charge.id,
    customerId,
    subscriptionId: sub.id,
  });
}

async function onSubscriptionUpdated(sub: Stripe.Subscription, prev: Partial<Stripe.Subscription> | undefined) {
  // Member scheduled a cancel in the portal: confirm it now, with their last day.
  const nowScheduled = Boolean(sub.cancel_at) || sub.cancel_at_period_end;
  const wasScheduled = prev && ("cancel_at" in prev || "cancel_at_period_end" in prev) ? Boolean(prev.cancel_at) || Boolean(prev.cancel_at_period_end) : nowScheduled;
  if (!nowScheduled || wasScheduled) return;
  const end = sub.cancel_at ?? sub.items.data[0]?.current_period_end;
  const email = await customerEmail(sub.customer);
  if (email && end) await sendCanceled(email, longDate(new Date(end * 1000)));
  const product = productOfSubscription(sub);
  await notifyPeter(fill(emails.peter.cancelScheduled, { email, product: product ? products[product].name : "?" }), `Last day: ${end ? longDate(new Date(end * 1000)) : "?"}.`);
}

async function onSubscriptionDeleted(sub: Stripe.Subscription) {
  const product = productOfSubscription(sub);
  const email = await customerEmail(sub.customer);
  // If the member didn't schedule this themselves (Peter canceled, or payment failed for good), confirm it now.
  if (!sub.cancel_at && !sub.cancel_at_period_end && email) {
    await sendCanceled(email, longDate(new Date((sub.ended_at ?? Date.now() / 1000) * 1000)));
  }
  await notifyPeter(fill(emails.peter.planEnded, { email, product: product ? products[product].name : "unknown plan" }), { Email: email, Subscription: sub.id });
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
      case "invoice.paid":
        await onInvoicePaid(event.data.object);
        break;
      case "charge.refunded":
        await onChargeRefunded(event.data.object);
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
