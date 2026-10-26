/**
 * One-time Stripe setup. Creates the three products and prices (found again by lookup key) and
 * the three referral coupons (first payment only, each restricted to its own product). Safe to
 * run again: it reuses what exists and warns if a Stripe price no longer matches site.ts.
 * Run in test mode first (sk_test_ key), then with the live key.
 *
 *   npm run stripe:setup
 *
 * It prints the IDs to paste into .env.local and Vercel.
 */
import Stripe from "stripe";
import { products, productIds, type ProductId } from "@/content/site";

const key = process.env.STRIPE_SECRET_KEY;
if (!key) {
  console.error("Set STRIPE_SECRET_KEY in .env.local first.");
  process.exit(1);
}
const stripe = new Stripe(key);

async function ensurePrice(id: ProductId) {
  const p = products[id];
  const existing = await stripe.prices.list({ lookup_keys: [p.lookupKey], expand: ["data.product"] });
  if (existing.data[0]) {
    const price = existing.data[0];
    if (price.unit_amount !== p.price * 100) console.warn(`  ! ${p.name} price in Stripe is $${(price.unit_amount ?? 0) / 100}, site says $${p.price}.`);
    return { priceId: price.id, productId: typeof price.product === "string" ? price.product : price.product.id };
  }
  const product = await stripe.products.create({ name: p.name, description: p.lines.join(" ") });
  const price = await stripe.prices.create({
    product: product.id,
    currency: "usd",
    unit_amount: p.price * 100,
    lookup_key: p.lookupKey,
    ...(p.per === "month" ? { recurring: { interval: "month" } } : {}),
  });
  return { priceId: price.id, productId: product.id };
}

async function ensureCoupon(id: ProductId, stripeProductId: string) {
  const p = products[id];
  const couponId = `referral-${id}-${p.referralOff}`;
  try {
    return (await stripe.coupons.retrieve(couponId)).id;
  } catch {
    const c = await stripe.coupons.create({
      id: couponId,
      name: `Partner referral: $${p.referralOff} off ${p.name}`,
      amount_off: p.referralOff * 100,
      currency: "usd",
      duration: "once",
      applies_to: { products: [stripeProductId] },
    });
    return c.id;
  }
}

async function main() {
  const out: string[] = [];
  for (const id of productIds) {
    const { priceId, productId } = await ensurePrice(id);
    const coupon = await ensureCoupon(id, productId);
    out.push(`STRIPE_PRICE_${id.toUpperCase()}=${priceId}`, `STRIPE_COUPON_${id.toUpperCase()}=${coupon}`);
  }
  console.log(`\nStripe is set up (${key!.startsWith("sk_live") ? "LIVE" : "test"} mode). Add these to .env.local and Vercel:\n`);
  console.log(out.join("\n") + "\n");
  console.log("Then finish the Dashboard steps in the README (terms URL, portal, webhook).\n");
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
