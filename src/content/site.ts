/**
 * Site-wide settings: roster size, plans and prices, contact details, social counts, stats,
 * the brand marquee, and the media Peter supplies.
 *
 * How to edit: change the values in quotes or the numbers, save, and push. Keep the shape the same.
 * Prices here are what the site shows. The amount actually charged lives in Stripe, so change
 * both together. No em dashes anywhere; use periods, commas, or "to".
 */

export const ROSTER_SIZE = 15;
export const COACHING_CAP = 6;

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

export type PlanId = "notes" | "coaching";

export const plans: Record<
  PlanId,
  {
    id: PlanId;
    name: string;
    price: number;
    openingDayPrice: number;
    /** Reviews and briefs included each month. /submit flags anything over this. */
    monthlyLimit: number;
    features: string[];
    goodFor: string;
  }
> = {
  notes: {
    id: "notes",
    name: "Notes",
    price: 297,
    openingDayPrice: 197,
    monthlyLimit: 4,
    features: [
      "4 reviews or briefs a month",
      "In by Tuesday, back by Friday",
      "Monthly check-in",
      "Brand pitches and media kits count as a review",
    ],
    goodFor: "People who post on their own and want a second set of eyes.",
  },
  coaching: {
    id: "coaching",
    name: "Coaching",
    price: 697,
    openingDayPrice: 597,
    monthlyLimit: 6,
    features: [
      "6 reviews or briefs a month",
      "One 45-minute call a month",
      "Questions answered Tuesdays and Thursdays",
      "Help with brand deals: pricing, reading briefs, contracts (I'm not a lawyer)",
    ],
    goodFor: "People working with brands, or about to.",
  },
};

export const openingDay = {
  promoCode: "OPENINGDAY",
  /** Must match max_redemptions on the Stripe coupon. */
  spots: 5,
  months: 3,
};

export const stats = [
  { value: 150, decimals: 0, suffix: "+", label: "paid brand deals" },
  { value: 80, decimals: 0, suffix: "+", label: "brands" },
  { value: 1.7, decimals: 1, suffix: "M", label: "followers" },
  { value: 1, decimals: 0, suffix: "B+", label: "views" },
];

/** Shown once as text in the marquee. Order is the order on screen. */
export const marqueeBrands = [
  "Coca-Cola",
  "McDonald's",
  "Disney",
  "Walmart",
  "Amazon",
  "Dove",
  "Lego",
  "Tide",
  "Oreo",
  "Mattel",
  "Minecraft",
  "Wonka",
  "P&G",
  "Charmin",
  "Annie's",
  "IHOP",
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
  sampleReview: {
    /** An MP4 in /public or a Loom share link (https://www.loom.com/share/...). */
    src: null as string | null,
    poster: null as string | null, // e.g. "/images/sample-poster.jpg" (16:9)
    captions: null as string | null, // e.g. "/video/sample.vtt" (only needed for MP4; Loom has its own captions)
  },
  aboutPhoto: "/images/peter-portrait.jpg" as string | null,
  aboutPhotoAlt: "Peter Sing smiling outdoors at sunset",
};
