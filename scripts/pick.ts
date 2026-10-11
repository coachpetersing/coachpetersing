/**
 * Picks someone from Tryouts: creates a single-use Stripe Payment Link that expires in 72 hours,
 * emails it to them, and logs it in the Sheet.
 *
 *   npm run pick -- --email jane@example.com --plan notes
 *   npm run pick -- --email jane@example.com --plan coaching --note https://loom.com/share/abc --opening-day
 *
 * Refuses to run when the roster is full, when Coaching is full (for a Coaching pick), or when
 * every open spot already has a pick link out. Pass --force to ignore outstanding picks only.
 */
import { parseArgs } from "node:util";
import { stripe, priceId } from "@/lib/stripe";
import { fetchRoster } from "@/lib/rosterCore";
import { sendPick } from "@/lib/mailers";
import { appendRow, nowStamp } from "@/lib/sheets";
import { markTryout } from "@/lib/picks";
import { env } from "@/lib/env";
import { plans, openingDay, type PlanId } from "@/content/site";

const HOURS = 72;

function fail(msg: string): never {
  console.error(`\n  ✗ ${msg}\n`);
  process.exit(1);
}

async function outstandingPicks() {
  const now = Date.now() / 1000;
  const out: { email: string; plan: string }[] = [];
  for await (const link of stripe().paymentLinks.list({ active: true, limit: 100 })) {
    const exp = Number(link.metadata?.expires_at);
    if (link.metadata?.pick_email && exp > now) out.push({ email: link.metadata.pick_email, plan: link.metadata.plan ?? "" });
  }
  return out;
}

async function main() {
  const { values } = parseArgs({
    options: {
      email: { type: "string" },
      plan: { type: "string" },
      note: { type: "string" },
      "opening-day": { type: "boolean", default: false },
      force: { type: "boolean", default: false },
    },
  });
  const email = values.email?.trim().toLowerCase() ?? "";
  const plan = values.plan as PlanId;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) fail("Pass a valid --email.");
  if (plan !== "notes" && plan !== "coaching") fail("Pass --plan notes or --plan coaching.");
  if (values.note && !/^https?:\/\//.test(values.note)) fail("--note must be a link starting with https://");

  const roster = await fetchRoster();
  if (roster.source !== "stripe") fail("Couldn't read the roster from Stripe. Check STRIPE_SECRET_KEY and the price IDs.");
  console.log(`\n  Roster: ${roster.filled} of ${roster.size} signed, ${roster.open} open, ${roster.coachingOpen} Coaching open, ${roster.openingDayLeft} Opening Day left.`);

  if (roster.open <= 0) fail("The roster is full. No pick sent.");
  if (plan === "coaching" && roster.coachingOpen <= 0) fail("Coaching is full. Pick them for Notes, or wait for a Coaching spot.");
  if (values["opening-day"] && roster.openingDayLeft <= 0) fail("The Opening Day rate is used up. Run again without --opening-day.");

  const pending = await outstandingPicks();
  if (pending.some((p) => p.email === email)) fail(`${email} already has an active pick link.`);
  const pendingCoaching = pending.filter((p) => p.plan === "coaching").length;
  if (!values.force) {
    if (pending.length >= roster.open) fail(`All ${roster.open} open spots already have a pick link out (${pending.map((p) => p.email).join(", ")}). Wait for one to sign or expire, or pass --force.`);
    if (plan === "coaching" && pendingCoaching >= roster.coachingOpen) fail("Every open Coaching spot already has a pick link out. Pass --force to send anyway.");
  }

  const p = plans[plan];
  const expiresAt = Math.floor(Date.now() / 1000) + HOURS * 3600;
  const od = values["opening-day"];
  const consentLabel = od
    ? `I understand this renews monthly until I cancel: $${p.openingDayPrice} for ${openingDay.months} months, then $${p.price}.`
    : `I understand this renews monthly at $${p.price} until I cancel.`;

  const link = await stripe().paymentLinks.create({
    line_items: [{ price: priceId(plan), quantity: 1 }],
    restrictions: { completed_sessions: { limit: 1 } },
    metadata: { pick_email: email, plan, expires_at: String(expiresAt) },
    subscription_data: { metadata: { plan, pick_email: email } },
    after_completion: {
      type: "redirect",
      redirect: { url: `${env.siteUrl()}/welcome?plan=${plan}&session_id={CHECKOUT_SESSION_ID}` },
    },
    consent_collection: { terms_of_service: "required" },
    // Stripe has no checkbox field type; a required one-option dropdown is the closest separate, affirmative consent.
    custom_fields: [
      {
        key: "renewal_consent",
        label: { type: "custom", custom: consentLabel },
        type: "dropdown",
        dropdown: { options: [{ label: "Yes, I understand", value: "yes" }] },
        optional: false,
      },
    ],
    custom_text: { submit: { message: "Renews monthly until you cancel. Cancel anytime online." } },
    allow_promotion_codes: true,
    inactive_message: "This link has expired or was already used. Email contact@coachpetersing.com if you think that's a mistake.",
  });

  const url = new URL(link.url);
  url.searchParams.set("locked_prefilled_email", email);
  if (od) url.searchParams.set("prefilled_promo_code", openingDay.promoCode);
  const finalUrl = url.toString();

  try {
    await sendPick(email, { plan, link: finalUrl, note: values.note, openingDay: od });
    console.log(`  ✓ Pick email sent to ${email}`);
  } catch (err) {
    console.error(`  ✗ Email failed (${(err as Error).message}). Send the link below yourself.`);
  }

  try {
    await appendRow("Picks", {
      Timestamp: nowStamp(),
      Status: "Sent",
      Email: email,
      Plan: p.name,
      "Opening Day": od ? "yes" : "no",
      Link: finalUrl,
      "Link ID": link.id,
      "Expires at": new Date(expiresAt * 1000).toISOString(),
      Note: values.note ?? "",
    });
    await markTryout(email, "Picked");
    console.log("  ✓ Logged in the Picks tab");
  } catch (err) {
    console.error(`  ✗ Sheet write failed: ${(err as Error).message}`);
  }

  console.log(`\n  ${p.name} link for ${email}, good until ${new Date(expiresAt * 1000).toLocaleString("en-US", { timeZone: "America/Los_Angeles" })} PT:\n\n  ${finalUrl}\n`);
}

main().catch((err) => fail(err.message));
