import Stripe from "stripe";
import { env } from "./env";
import type { PlanId } from "@/content/site";

let client: Stripe | null = null;

/** Throws if STRIPE_SECRET_KEY is missing, so callers can fall back. */
export function stripe(): Stripe {
  const key = env.stripeKey();
  if (!key) throw new Error("STRIPE_SECRET_KEY is not set");
  if (!client) client = new Stripe(key);
  return client;
}

export function priceId(plan: PlanId): string {
  const id = plan === "notes" ? env.priceNotes() : env.priceCoaching();
  if (!id) throw new Error(`STRIPE_PRICE_${plan.toUpperCase()} is not set`);
  return id;
}

export function planFromPrice(price: string | null | undefined): PlanId | null {
  if (!price) return null;
  if (price === env.priceNotes()) return "notes";
  if (price === env.priceCoaching()) return "coaching";
  return null;
}

export function planOfSubscription(sub: Stripe.Subscription): PlanId | null {
  for (const item of sub.items.data) {
    const p = planFromPrice(item.price.id);
    if (p) return p;
  }
  return null;
}

/** Statuses that hold a roster spot. */
export const SPOT_STATUSES: Stripe.Subscription.Status[] = ["active", "past_due"];

/** Finds an active roster subscription for an email, across every customer with that email. */
export async function findActiveMember(email: string) {
  const s = stripe();
  const customers = await s.customers.list({ email: email.trim().toLowerCase(), limit: 10 });
  for (const c of customers.data) {
    const subs = await s.subscriptions.list({ customer: c.id, status: "all", limit: 20 });
    for (const sub of subs.data) {
      if (!SPOT_STATUSES.includes(sub.status)) continue;
      const plan = planOfSubscription(sub);
      if (plan) return { customer: c, subscription: sub, plan };
    }
  }
  return null;
}
