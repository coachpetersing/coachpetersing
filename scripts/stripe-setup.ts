/**
 * One-time Stripe setup. Creates the two products and monthly prices (by lookup key), the
 * Opening Day coupon, and the OPENINGDAY promotion code. Safe to run again: it reuses what exists.
 * Run in test mode first (sk_test_ key), then again with the live key.
 *
 *   npm run stripe:setup
 *
 * It prints the IDs to paste into .env.local and Vercel.
 */
import Stripe from "stripe";
import { plans, openingDay, type PlanId } from "@/content/site";

const key = process.env.STRIPE_SECRET_KEY;
if (!key) {
  console.error("Set STRIPE_SECRET_KEY in .env.local first.");
  process.exit(1);
}
const stripe = new Stripe(key);
const LOOKUP: Record<PlanId, string> = { notes: "notes_monthly", coaching: "coaching_monthly" };

async function ensurePrice(plan: PlanId) {
  const p = plans[plan];
  const existing = await stripe.prices.list({ lookup_keys: [LOOKUP[plan]], expand: ["data.product"] });
  if (existing.data[0]) {
    const price = existing.data[0];
    if (price.unit_amount !== p.price * 100) console.warn(`  ! ${p.name} price in Stripe is $${(price.unit_amount ?? 0) / 100}, site says $${p.price}.`);
    return price.id;
  }
  const product = await stripe.products.create({ name: p.name, description: p.features.join(". ") });
  const price = await stripe.prices.create({
    product: product.id,
    currency: "usd",
    unit_amount: p.price * 100,
    recurring: { interval: "month" },
    lookup_key: LOOKUP[plan],
  });
  return price.id;
}

async function ensureCoupon() {
  const id = "opening-day";
  try {
    return (await stripe.coupons.retrieve(id)).id;
  } catch {
    const c = await stripe.coupons.create({
      id,
      name: "Opening Day",
      amount_off: 10000,
      currency: "usd",
      duration: "repeating",
      duration_in_months: openingDay.months,
      max_redemptions: openingDay.spots,
    });
    return c.id;
  }
}

async function ensurePromo(coupon: string) {
  const existing = await stripe.promotionCodes.list({ code: openingDay.promoCode, limit: 1 });
  if (existing.data[0]) return existing.data[0].id;
  const promo = await stripe.promotionCodes.create({ promotion: { type: "coupon", coupon }, code: openingDay.promoCode });
  return promo.id;
}

async function main() {
  const notes = await ensurePrice("notes");
  const coaching = await ensurePrice("coaching");
  const coupon = await ensureCoupon();
  await ensurePromo(coupon);
  console.log(`\nStripe is set up (${key!.startsWith("sk_live") ? "LIVE" : "test"} mode). Add these to .env.local and Vercel:\n`);
  console.log(`STRIPE_PRICE_NOTES=${notes}`);
  console.log(`STRIPE_PRICE_COACHING=${coaching}`);
  console.log(`STRIPE_COUPON_OPENING_DAY=${coupon}\n`);
  console.log("Then finish the Dashboard steps in the README (terms URL, portal, invoice footer, webhook).\n");
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
