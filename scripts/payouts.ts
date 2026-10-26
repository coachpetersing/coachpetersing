/**
 * Partner payouts for one calendar month, straight from Stripe (so it works even if a Sheet write
 * failed). Run it on the 1st for the month before last, which respects the 30-day hold:
 *
 *   npm run payouts -- --month 2026-11
 *
 * It lists every payment that month with a partner code, works out the payout with the rules in
 * site.ts ($30 once on a Call, 15% of full price per month on a plan for 12 months), subtracts
 * refunds, and prints a total per partner. Under $100 is marked "rolls over": add it to next
 * month by hand. Pay the totals through Melio.
 */
import Stripe from "stripe";
import { products, partnerPayout, referral, type ProductId } from "@/content/site";
import { findPartner } from "@/content/partners";

const key = process.env.STRIPE_SECRET_KEY;
if (!key) {
  console.error("Set STRIPE_SECRET_KEY in .env.local first.");
  process.exit(1);
}
const stripe = new Stripe(key);

const arg = process.argv.indexOf("--month");
const month = arg > -1 ? process.argv[arg + 1] : "";
if (!/^\d{4}-\d{2}$/.test(month)) {
  console.error("Give a month like --month 2026-11");
  process.exit(1);
}
const [y, m] = month.split("-").map(Number);
const from = Math.floor(Date.UTC(y, m - 1, 1, 8) / 1000); // midnight Pacific, near enough
const to = Math.floor(Date.UTC(y, m, 1, 8) / 1000);
const MIN_PAYOUT = 100;

type Line = { code: string; kind: string; product: ProductId; email: string; amount: number; month: number; payout: number; id: string };
const lines: Line[] = [];

const priceEnv: Record<ProductId, string> = {
  call: process.env.STRIPE_PRICE_CALL ?? "",
  two: process.env.STRIPE_PRICE_TWO ?? "",
  four: process.env.STRIPE_PRICE_FOUR ?? "",
};
const productOf = (priceId?: string | null, meta?: string | null): ProductId | null => {
  for (const id of Object.keys(priceEnv) as ProductId[]) if (priceEnv[id] && priceEnv[id] === priceId) return id;
  return meta && meta in products ? (meta as ProductId) : null;
};
const monthIndex = (sub: Stripe.Subscription, periodStart: number) => Math.max(1, Math.round((periodStart - sub.start_date) / (30 * 86400)) + 1);

async function main() {
  // One-time Calls and first plan payments: Checkout Sessions.
  for await (const s of stripe.checkout.sessions.list({ created: { gte: from, lt: to }, status: "complete", limit: 100, expand: ["data.line_items"] })) {
    const code = (s.client_reference_id ?? s.metadata?.ref ?? "").toLowerCase();
    if (!code || s.payment_status !== "paid") continue;
    const product = productOf(s.line_items?.data[0]?.price?.id, s.metadata?.product);
    if (!product) continue;
    lines.push({ code, kind: "Sale", product, email: s.customer_details?.email ?? "", amount: (s.amount_total ?? 0) / 100, month: 1, payout: partnerPayout(product, 1), id: s.id });
  }
  // Renewals: paid invoices for subscription cycles.
  for await (const inv of stripe.invoices.list({ created: { gte: from, lt: to }, status: "paid", limit: 100 })) {
    if (inv.billing_reason !== "subscription_cycle") continue;
    const subId = typeof inv.parent?.subscription_details?.subscription === "string" ? inv.parent.subscription_details.subscription : inv.parent?.subscription_details?.subscription?.id;
    if (!subId) continue;
    const sub = await stripe.subscriptions.retrieve(subId);
    const code = (sub.metadata?.ref ?? "").toLowerCase();
    if (!code) continue;
    const product = productOf(sub.items.data[0]?.price.id, sub.metadata?.product);
    if (!product) continue;
    const mi = monthIndex(sub, inv.period_start);
    lines.push({ code, kind: "Renewal", product, email: inv.customer_email ?? "", amount: (inv.amount_paid ?? 0) / 100, month: mi, payout: partnerPayout(product, mi), id: inv.id ?? "" });
  }
  // Refunds that month pull the payout for the payment they refund.
  for await (const r of stripe.refunds.list({ created: { gte: from, lt: to }, limit: 100, expand: ["data.charge"] })) {
    const charge = r.charge as Stripe.Charge | null;
    if (!charge || r.status !== "succeeded") continue;
    const pi = typeof charge.payment_intent === "string" ? charge.payment_intent : charge.payment_intent?.id;
    const sessions = pi ? await stripe.checkout.sessions.list({ payment_intent: pi, limit: 1, expand: ["data.line_items"] }) : null;
    const s = sessions?.data[0];
    if (s) {
      const code = (s.client_reference_id ?? s.metadata?.ref ?? "").toLowerCase();
      const product = productOf(s.line_items?.data[0]?.price?.id, s.metadata?.product);
      if (code && product) lines.push({ code, kind: "Refund", product, email: s.customer_details?.email ?? "", amount: -r.amount / 100, month: 1, payout: -partnerPayout(product, 1), id: r.id });
      continue;
    }
    const customer = typeof charge.customer === "string" ? charge.customer : charge.customer?.id;
    if (!customer) continue;
    const invs = await stripe.invoices.list({ customer, limit: 24, expand: ["data.payments"] });
    const inv = invs.data.find((i) => (i.payments?.data ?? []).some((p) => (typeof p.payment.payment_intent === "string" ? p.payment.payment_intent : p.payment.payment_intent?.id) === pi));
    const subId = typeof inv?.parent?.subscription_details?.subscription === "string" ? inv.parent.subscription_details.subscription : inv?.parent?.subscription_details?.subscription?.id;
    if (!inv || !subId) continue;
    const sub = await stripe.subscriptions.retrieve(subId);
    const code = (sub.metadata?.ref ?? "").toLowerCase();
    const product = productOf(sub.items.data[0]?.price.id, sub.metadata?.product);
    if (!code || !product) continue;
    const mi = monthIndex(sub, inv.period_start);
    lines.push({ code, kind: "Refund", product, email: inv.customer_email ?? "", amount: -r.amount / 100, month: mi, payout: -partnerPayout(product, mi), id: r.id });
  }

  if (!lines.length) {
    console.log(`No partner-coded payments in ${month}.`);
    return;
  }
  console.log(`\nPartner payouts for ${month} (${key!.startsWith("sk_live") ? "LIVE" : "test"} mode). Rules: $${products.call.payout.kind === "flat" ? products.call.payout.amount : 0} per Call, 15% of full price per plan month, ${referral.payoutMonths} months max.\n`);
  const byCode = new Map<string, Line[]>();
  for (const l of lines) byCode.set(l.code, [...(byCode.get(l.code) ?? []), l]);
  for (const [code, ls] of byCode) {
    const partner = findPartner(code);
    const total = ls.reduce((n, l) => n + l.payout, 0);
    console.log(`${partner?.name ?? code} (${code}): $${total.toFixed(2)}${total < MIN_PAYOUT ? "  <- under $" + MIN_PAYOUT + ", rolls over" : ""}${partner ? "" : "  <- code not in partners.ts"}`);
    for (const l of ls) console.log(`   ${l.kind.padEnd(8)} ${products[l.product].name.padEnd(20)} month ${String(l.month).padStart(2)}  paid $${l.amount.toFixed(2).padStart(8)}  payout $${l.payout.toFixed(2).padStart(7)}  ${l.email}  ${l.id}`);
  }
  console.log("");
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
