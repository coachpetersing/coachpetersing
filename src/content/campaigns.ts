export type Campaign = {
  brand: string;
  name: string;
  category: string;
  result: string; // the one headline number
  detail: string;
  year?: number;
  role?: string;
  media: string; // local "/video/x.mp4" or "TBD"
  poster: string; // local "/images/x.jpg" or "TBD" (TikTok posters are fetched automatically, see scripts/fetch-posters.mjs)
  url: string; // live post url or "TBD"
  featured: boolean;
  /** true hides the card on the home page and Work page. The data stays so it can come back once a working link exists. */
  hidden?: boolean;
};

// Filter chips on /work. Must match the category strings below and in brands.ts.
export const campaignCategories = [
  "Food and drink",
  "Retail and delivery",
  "CPG and household",
  "Auto, finance, telecom",
  "Entertainment and toys",
  "Travel and apparel",
];

// Source: the Brand Deal Stats table in Notion (Projects > Brand Deal Stats) plus the site brief.
// Years come from the post id's timestamp. "TBD" url means no live link yet.
export const campaigns: Campaign[] = [
  {
    brand: "Dove Men+Care",
    name: "Dove Men+Care",
    category: "CPG and household",
    result: "24.4M views",
    detail: "41K likes, 534 comments on TikTok. 109K views on Instagram",
    year: 2024,
    role: "Wrote, shot, and starred",
    media: "/video/dove-mens.mp4",
    poster: "/images/dove-mens.jpg",
    url: "https://www.tiktok.com/@thesingfamily/video/7325545956689055018",
    featured: true,
    hidden: true,
  },
  {
    brand: "Coca-Cola",
    name: "Recipe for Magic",
    category: "Food and drink",
    result: "23.3M TikTok views",
    detail: "5.6M Instagram views, 147K likes, 3,879 saves",
    year: 2024,
    role: "Concept, script, production",
    media: "TBD",
    poster: "TBD",
    url: "https://www.tiktok.com/@thesingfamily/video/7371890581632732462",
    featured: true,
  },
  {
    brand: "Wonka x IHOP",
    name: "Wonka x IHOP",
    category: "Entertainment and toys",
    result: "23.4M views",
    detail: "72.3K likes, 1,152 comments",
    year: 2023,
    role: "Concept, script, production",
    media: "TBD",
    poster: "TBD",
    url: "https://www.tiktok.com/@thesingfamily/video/7306211237266836778",
    featured: true,
  },
  {
    brand: "Baby Dove",
    name: "Baby Dove",
    category: "CPG and household",
    result: "13.6M views",
    detail: "Brand media buy",
    role: "Creative and production",
    media: "TBD",
    poster: "TBD",
    url: "TBD",
    featured: true,
    hidden: true,
  },
  {
    brand: "Disney",
    name: "Disney",
    category: "Entertainment and toys",
    result: "1M Instagram views",
    detail: "79.3K likes, 2,199 comments on Instagram. 662.9K views on TikTok",
    year: 2024,
    role: "Creative and production",
    media: "TBD",
    poster: "TBD",
    url: "https://www.tiktok.com/@thesingfamily/video/7341417290275032362",
    featured: false,
  },
  {
    brand: "Charmin",
    name: "Charmin",
    category: "CPG and household",
    result: "6.2M views",
    detail: "5,030 likes",
    year: 2023,
    media: "TBD",
    poster: "TBD",
    url: "https://www.tiktok.com/@thesingfamily/video/7291452248532454698",
    featured: true,
  },
  {
    brand: "Annie's",
    name: "Annie's (Luke episode)",
    category: "Food and drink",
    result: "5.9M TikTok views",
    detail: "455K Instagram views, 9,552 likes",
    year: 2024,
    role: "Creative and production",
    media: "TBD",
    poster: "TBD",
    url: "https://www.tiktok.com/@thesingfamily/video/7417893122157333791",
    featured: true,
  },
  {
    brand: "Puffs",
    name: "Puffs",
    category: "CPG and household",
    result: "5M views",
    detail: "8,054 likes, 92 comments",
    year: 2024,
    media: "TBD",
    poster: "TBD",
    url: "https://www.tiktok.com/@thesingfamily/video/7324775352235019562",
    featured: false,
  },
  {
    brand: "Charmin",
    name: "Forever Roll, \"When Bigger Is Better\"",
    category: "CPG and household",
    result: "4.3M views",
    detail: "19K likes, 1,771 saves",
    year: 2025,
    role: "Concept, script, production",
    media: "TBD",
    poster: "TBD",
    url: "https://www.tiktok.com/@thesingfamily/video/7583015036478573838",
    featured: false,
  },
  {
    brand: "Annie's",
    name: "Annie's",
    category: "Food and drink",
    result: "2.9M views",
    detail: "2,404 likes, 286 shares",
    year: 2024,
    media: "TBD",
    poster: "TBD",
    url: "https://www.tiktok.com/@thesingfamily/video/7413130145856326943",
    featured: false,
  },
  {
    brand: "Oreo",
    name: "Oreo",
    category: "Food and drink",
    result: "2M views",
    detail: "3,407 likes",
    year: 2024,
    media: "TBD",
    poster: "TBD",
    url: "https://www.tiktok.com/@thesingfamily/video/7376736949530266922",
    featured: false,
  },
  {
    brand: "Energizer",
    name: "Energizer",
    category: "CPG and household",
    result: "1.8M views",
    detail: "2,240 likes",
    year: 2024,
    media: "TBD",
    poster: "TBD",
    url: "https://www.tiktok.com/@thesingfamily/video/7394519582406495519",
    featured: false,
  },
  {
    brand: "Sanofi",
    name: "Sanofi",
    category: "CPG and household",
    result: "1.2M TikTok views",
    detail: "1.2M Instagram views, 5,855 likes",
    year: 2024,
    media: "TBD",
    poster: "TBD",
    url: "https://www.tiktok.com/@thesingfamily/video/7330010464904121630",
    featured: false,
  },
  {
    brand: "Lactaid",
    name: "Lactaid",
    category: "Food and drink",
    result: "545K Instagram views",
    detail: "57.7K TikTok views, 4,524 likes",
    year: 2023,
    media: "TBD",
    poster: "TBD",
    url: "https://www.tiktok.com/@thesingfamily/video/7315508690918952235",
    featured: false,
  },
  {
    brand: "Coca-Cola",
    name: "Coca-Cola (mom coming over)",
    category: "Food and drink",
    result: "428.5K views",
    detail: "23.9K likes, 776 shares",
    year: 2024,
    media: "TBD",
    poster: "TBD",
    url: "https://www.tiktok.com/@thesingfamily/video/7386730291869601054",
    featured: false,
  },
  {
    brand: "Habit",
    name: "Habit",
    category: "Food and drink",
    result: "311.2K views",
    detail: "10.4K likes",
    year: 2024,
    media: "TBD",
    poster: "TBD",
    url: "https://www.tiktok.com/@thesingfamily/video/7419052996354379038",
    featured: false,
  },
  {
    brand: "Yellow Tail",
    name: "Yellow Tail",
    category: "Food and drink",
    result: "90.1K views",
    detail: "6,253 likes, 139 comments",
    year: 2024,
    media: "TBD",
    poster: "TBD",
    url: "https://www.instagram.com/reel/DBJ3Gf1SOgO/",
    featured: false,
    hidden: true,
  },
  {
    brand: "Lysol",
    name: "Lysol",
    category: "CPG and household",
    result: "75.8K views",
    detail: "65.8K likes",
    year: 2024,
    media: "TBD",
    poster: "TBD",
    url: "https://www.tiktok.com/@thesingfamily/video/7356345501505064238",
    featured: false,
  },
  {
    brand: "CeraVe",
    name: "CeraVe",
    category: "CPG and household",
    result: "63.3K views",
    detail: "5,317 likes",
    year: 2023,
    media: "TBD",
    poster: "TBD",
    url: "https://www.tiktok.com/@thesingfamily/video/7310251070918249770",
    featured: false,
  },
  {
    brand: "CeraVe",
    name: "CeraVe",
    category: "CPG and household",
    result: "28.8K views",
    detail: "1,333 likes",
    year: 2024,
    media: "TBD",
    poster: "TBD",
    url: "https://www.tiktok.com/@thesingfamily/video/7399732508486618398",
    featured: false,
  },
  {
    brand: "McDonald's",
    name: "McDonald's Coffee",
    category: "Food and drink",
    result: "17.4K views",
    detail: "2,386 likes",
    year: 2024,
    media: "TBD",
    poster: "TBD",
    url: "https://www.tiktok.com/@thesingfamily/video/7419427019898768670",
    featured: false,
  },
  {
    brand: "Blue Bunny",
    name: "Blue Bunny",
    category: "Food and drink",
    result: "79K views",
    detail: "10.2K likes",
    media: "TBD",
    poster: "TBD",
    url: "TBD",
    featured: false,
    hidden: true,
  },
  {
    brand: "Zevo",
    name: "Zevo",
    category: "CPG and household",
    result: "77K views",
    detail: "7,230 likes",
    media: "TBD",
    poster: "TBD",
    url: "TBD",
    featured: false,
    hidden: true,
  },
];

/** Parses the headline result into a number for ranking, for example "23.3M TikTok views" -> 23300000. */
export function headlineViews(c: Campaign): number {
  const m = c.result.match(/([\d.]+)\s*([KMB])?/i);
  if (!m) return 0;
  const mult = { K: 1e3, M: 1e6, B: 1e9 }[(m[2] || "").toUpperCase() as "K" | "M" | "B"] ?? 1;
  return parseFloat(m[1]) * mult;
}

/** Newest year first, then most views. Campaigns without a year go last. */
export const byYearThenViews = (a: Campaign, b: Campaign) =>
  (b.year ?? 0) - (a.year ?? 0) || headlineViews(b) - headlineViews(a);

/** Everything shown on the Work page, in display order. */
export const visibleCampaigns = campaigns.filter((c) => !c.hidden).sort(byYearThenViews);

/**
 * Home page picks: visible featured campaigns, in the same order as the Work page. If fewer than
 * four survive, the highest-view visible campaigns fill the rest, and the result is re-sorted.
 */
export const featuredCampaigns: Campaign[] = (() => {
  const picks = visibleCampaigns.filter((c) => c.featured);
  const rest = visibleCampaigns.filter((c) => !c.featured).sort((a, b) => headlineViews(b) - headlineViews(a));
  return [...picks, ...rest].slice(0, Math.max(4, picks.length)).sort(byYearThenViews);
})();

export const repeatPartners = [
  { brand: "Walmart", note: "10+ campaigns, 2022 to 2025" },
  { brand: "P&G", note: "Tide, Charmin, Pampers, Swiffer, Bounty, Luvs, Puffs" },
  { brand: "Dove and Unilever", note: "5 campaigns" },
  { brand: "Amazon", note: "3 divisions" },
  { brand: "CVS", note: "3 cycles" },
  { brand: "Klarna", note: "3 campaigns" },
  { brand: "Verizon", note: "10-month program" },
  { brand: "Lexus", note: "8-month program" },
  { brand: "IHG", note: "Ongoing since 2025" },
];
