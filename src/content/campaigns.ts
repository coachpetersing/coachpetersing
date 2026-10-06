export type Campaign = {
  brand: string;
  name: string;
  category: string;
  result: string;
  detail: string;
  year?: number;
  role: string;
  media: string; // "/video/x.mp4" or "TBD"
  poster: string; // "/images/x.jpg" or "TBD"
  url: string; // live post url or "TBD"
  featured: boolean;
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

export const campaigns: Campaign[] = [
  {
    brand: "Dove Men+Care", name: "Dove Men+Care campaign", category: "CPG and household",
    result: "24.4M views", detail: "41K likes", year: 2024, role: "Wrote, shot, and starred",
    media: "/video/dove-mens.mp4", poster: "/images/dove-mens.jpg", url: "TBD", featured: true,
  },
  {
    brand: "Coca-Cola", name: "Recipe for Magic", category: "Food and drink",
    result: "23.3M TikTok views", detail: "5.6M Instagram views, 147K likes, 3,880 saves",
    role: "Concept, script, production",
    media: "TBD", poster: "TBD", url: "TBD", featured: true,
  },
  {
    brand: "Wonka x IHOP", name: "Wonka x IHOP", category: "Entertainment and toys",
    result: "23.4M views", detail: "1,152 comments", role: "Concept, script, production",
    media: "TBD", poster: "TBD", url: "TBD", featured: true,
  },
  {
    brand: "Baby Dove", name: "Baby Dove", category: "CPG and household",
    result: "13.6M views", detail: "Brand media buy", role: "Creative and production",
    media: "TBD", poster: "TBD", url: "TBD", featured: true,
  },
  {
    brand: "Disney", name: "Disney (Instagram)", category: "Entertainment and toys",
    result: "1M views", detail: "79.3K likes, 2,199 comments", role: "Creative and production",
    media: "TBD", poster: "TBD", url: "TBD", featured: false,
  },
  {
    brand: "Annie's", name: "Annie's (Luke episode)", category: "Food and drink",
    result: "5.9M TikTok views", detail: "455K Instagram views, 9,552 likes",
    role: "Creative and production",
    media: "TBD", poster: "TBD", url: "TBD", featured: false,
  },
];

export const featuredCampaigns = campaigns.filter((c) => c.featured).slice(0, 4);

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
