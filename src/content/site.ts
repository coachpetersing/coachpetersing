/**
 * Site-wide settings: the three things for sale, the partner discounts and payouts, contact
 * details, social counts, stats, and the media Peter supplies.
 *
 * How to edit: change the values in quotes or the numbers, save, and push. Keep the shape the
 * same. Prices here are what the site shows. The amount actually charged lives in Stripe, so
 * change both together (then run `npm run stripe:setup` and update the IDs in Vercel).
 * No em dashes anywhere; use periods, commas, or "to".
 */

export const site = {
  name: "Peter Sing",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://coachpetersing.com",
  email: "contact@coachpetersing.com",
  location: "Orange County, CA",
  instagramHandle: "@thesingfamily",
  social: [
    { name: "TikTok", url: "https://www.tiktok.com/@thesingfamily", followers: "1.1M" },
    { name: "Instagram", url: "https://www.instagram.com/thesingfamily", followers: "476K" },
    { name: "YouTube", url: "https://www.youtube.com/@thesingfamily", followers: "131K" },
  ],
};

export type ProductId = "call" | "two" | "four";

export type Product = {
  id: ProductId;
  name: string;
  price: number;
  /** "once" is a one-time payment. "month" renews monthly until canceled. */
  per: "once" | "month";
  /** Calls included per month. */
  callsPerMonth: number;
  /** Shown on the price card, one line each. */
  lines: string[];
  /** Button label. */
  cta: string;
  /** Lookup key for the Stripe price. Don't change after launch. */
  lookupKey: string;
  /** Partner referral: taken off the first payment only. Must match the Stripe coupon from `npm run stripe:setup`. */
  referralOff: number;
  /** Partner payout: a flat amount once, or a share of full price every month for `payoutMonths`. */
  payout: { kind: "flat"; amount: number } | { kind: "share"; rate: number };
};

export const products: Record<ProductId, Product> = {
  call: {
    id: "call",
    name: "Call",
    price: 299,
    per: "once",
    callsPerMonth: 1,
    lines: ["One hour, one on one, on video.", "Bring videos, a pitch, a brand contract, your page. We fix what we can in 60 minutes.", "A one-pager after the call: what we decided and what you're doing next."],
    cta: "Book a call",
    lookupKey: "call_once_299",
    referralOff: 50,
    payout: { kind: "flat", amount: 30 },
  },
  two: {
    id: "two",
    name: "Two calls a month",
    price: 499,
    per: "month",
    callsPerMonth: 2,
    lines: ["Two hours a month.", "Same two slots every month if you want them.", "A one-pager after every call."],
    cta: "Start",
    lookupKey: "two_calls_monthly_499",
    referralOff: 100,
    payout: { kind: "share", rate: 0.15 },
  },
  four: {
    id: "four",
    name: "Four calls a month",
    price: 899,
    per: "month",
    callsPerMonth: 4,
    lines: ["An hour a week.", "For people building something and posting every week.", "A one-pager after every call."],
    cta: "Start",
    lookupKey: "four_calls_monthly_899",
    referralOff: 200,
    payout: { kind: "share", rate: 0.15 },
  },
};

export const productIds = Object.keys(products) as ProductId[];

export const referral = {
  /** Days a partner code is remembered in the visitor's browser. */
  cookieDays: 30,
  /** Monthly payouts to a partner run this many months per referred client, then stop. */
  payoutMonths: 12,
};

/** What a referred customer pays the first time. */
export const referredPrice = (id: ProductId) => products[id].price - products[id].referralOff;

/** What the partner earns on one payment of this product (month 1 counts; discounts don't reduce it). */
export function partnerPayout(id: ProductId, monthIndex: number) {
  const p = products[id].payout;
  if (p.kind === "flat") return monthIndex === 1 ? p.amount : 0;
  return monthIndex <= referral.payoutMonths ? Math.round(products[id].price * p.rate) : 0;
}

export const stats = [
  { value: 150, decimals: 0, suffix: "+", label: "paid brand deals" },
  { value: 80, decimals: 0, suffix: "+", label: "brands" },
  { value: 1.7, decimals: 1, suffix: "M", label: "followers" },
  { value: 1, decimals: 0, suffix: "B+", label: "views" },
];

/**
 * Media Peter supplies. Set a path once the file is in /public, or leave null and the site shows
 * a placeholder. Nothing breaks either way.
 */
export const media = {
  hero: {
    mp4: null as string | null, // e.g. "/video/hero.mp4" (9:16, under 15 seconds)
    webm: null as string | null, // e.g. "/video/hero.webm"
    poster: null as string | null, // e.g. "/images/hero-poster.jpg"
    captions: null as string | null, // e.g. "/video/hero.vtt"
  },
  /** A real one-pager to show as the sample, e.g. "/sample-one-pager.pdf" in /public. */
  samplePdf: null as string | null,
  aboutPhoto: "/images/peter-portrait.jpg" as string | null,
  aboutPhotoAlt: "Peter Sing smiling outdoors at sunset",
};
