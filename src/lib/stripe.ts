import Stripe from "stripe";
import { env } from "./env";
import { products, type ProductId } from "@/content/site";

let client: Stripe | null = null;

/** Throws if STRIPE_SECRET_KEY is missing, so callers can fall back. */
export function stripe(): Stripe {
  const key = env.stripeKey();
  if (!key) throw new Error("STRIPE_SECRET_KEY is not set");
  if (!client) client = new Stripe(key);
  return client;
}

export const configured = () => Boolean(env.stripeKey());

const priceEnv: Record<ProductId, () => string> = {
  call: env.priceCall,
  two: env.priceTwo,
  four: env.priceFour,
};

const couponEnv: Record<ProductId, () => string> = {
  call: env.couponCall,
  two: env.couponTwo,
  four: env.couponFour,
};

export function priceId(product: ProductId): string {
  const id = priceEnv[product]();
  if (!id) throw new Error(`STRIPE_PRICE_${product.toUpperCase()} is not set`);
  return id;
}

export function productFromPrice(price: string | null | undefined): ProductId | null {
  if (!price) return null;
  for (const id of Object.keys(priceEnv) as ProductId[]) if (priceEnv[id]() && priceEnv[id]() === price) return id;
  return null;
}

export function isProductId(v: unknown): v is ProductId {
  return typeof v === "string" && v in products;
}

export function productOfSubscription(sub: Stripe.Subscription): ProductId | null {
  for (const item of sub.items.data) {
    const p = productFromPrice(item.price.id);
    if (p) return p;
  }
  const meta = sub.metadata?.product;
  return isProductId(meta) ? meta : null;
}

/** Statuses that count as "on a plan". */
export const ACTIVE_STATUSES: Stripe.Subscription.Status[] = ["active", "past_due", "trialing"];

/** Finds an active plan for an email, across every customer with that email. */
export async function findActiveMember(email: string) {
  const s = stripe();
  const customers = await s.customers.list({ email: email.trim().toLowerCase(), limit: 10 });
  for (const c of customers.data) {
    const subs = await s.subscriptions.list({ customer: c.id, status: "all", limit: 20 });
    for (const sub of subs.data) {
      if (!ACTIVE_STATUSES.includes(sub.status)) continue;
      const product = productOfSubscription(sub);
      if (product && products[product].per === "month") return { customer: c, subscription: sub, product };
    }
  }
  return null;
}

/**
 * Creates a Checkout Session for one product. `ref` is a validated partner code or null; it rides
 * along as client_reference_id and metadata (and on the subscription, so renewals carry it too),
 * and it takes that product's referral discount off the first payment when the coupon exists.
 */
export async function createCheckout(product: ProductId, ref: string | null): Promise<string> {
  const s = stripe();
  const p = products[product];
  const site = env.siteUrl();
  const monthly = p.per === "month";
  const metadata = { product, ref: ref ?? "" };

  const params: Stripe.Checkout.SessionCreateParams = {
    mode: monthly ? "subscription" : "payment",
    line_items: [{ price: priceId(product), quantity: 1 }],
    success_url: `${site}/welcome?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${site}/#prices`,
    client_reference_id: ref ?? undefined,
    metadata,
    billing_address_collection: "auto",
    allow_promotion_codes: false,
    ...(monthly
      ? {
          subscription_data: { metadata },
          // Terms consent needs the Terms URL set in Stripe > Settings > Business > Public details.
          consent_collection: { terms_of_service: "required" },
          // A separate, affirmative yes to the renewal (California Automatic Renewal Law).
          custom_fields: [
            {
              key: "renewal",
              label: { type: "custom", custom: `I understand this renews monthly at $${p.price} until I cancel.` },
              type: "dropdown",
              dropdown: { options: [{ label: "Yes, I understand", value: "yes" }] },
              optional: false,
            },
          ],
        }
      : { customer_creation: "always", invoice_creation: { enabled: true } }),
  };

  if (ref && couponEnv[product]()) {
    params.discounts = [{ coupon: couponEnv[product]() }];
  }

  const session = await s.checkout.sessions.create(params);
  if (!session.url) throw new Error("Stripe returned no checkout URL");
  return session.url;
}

/** Product and payment state for a completed Checkout Session, or null if it isn't one. */
export async function sessionSummary(id: string) {
  const session = await stripe().checkout.sessions.retrieve(id, { expand: ["line_items"] });
  if (session.status !== "complete") return null;
  const price = session.line_items?.data[0]?.price?.id;
  const product = productFromPrice(price) ?? (isProductId(session.metadata?.product) ? session.metadata!.product : null);
  const name = session.customer_details?.name ?? "";
  return {
    session,
    product,
    name,
    first: name.split(" ")[0] ?? "",
    email: session.customer_details?.email ?? "",
    paid: session.payment_status === "paid" || session.payment_status === "no_payment_required",
    ref: session.client_reference_id ?? session.metadata?.ref ?? "",
  };
}

/**
 * Has this email paid me before, other than through `exceptCustomer`? Used to flag a referral
 * discount used by a returning customer (the code is for first purchases only). Best effort.
 */
export async function hasPaidBefore(email: string, exceptCustomer: string) {
  if (!email) return false;
  const s = stripe();
  const customers = await s.customers.list({ email: email.trim().toLowerCase(), limit: 10 });
  for (const c of customers.data) {
    if (c.id === exceptCustomer) continue;
    const sessions = await s.checkout.sessions.list({ customer: c.id, limit: 10 });
    if (sessions.data.some((x) => x.payment_status === "paid")) return true;
    const subs = await s.subscriptions.list({ customer: c.id, status: "all", limit: 5 });
    if (subs.data.length) return true;
  }
  return false;
}
