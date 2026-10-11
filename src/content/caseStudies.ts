/**
 * The four case studies on the home page and /brands.
 *
 * How to edit: change the text in quotes. `url` is the live post. `poster` is a vertical (9:16)
 * thumbnail in /public. TikTok thumbnails are downloaded automatically by
 * scripts/fetch-posters.mjs into /public/posters/<video id>.jpg before every build.
 * Numbers come from the Brand Deal Stats table in Notion.
 */

export type CaseStudy = {
  brand: string;
  title: string;
  stats: string[];
  url: string;
  poster: string | null;
  alt: string;
};

export const caseStudies: CaseStudy[] = [
  {
    brand: "Coca-Cola",
    title: "Recipe for Magic",
    stats: ["23.3M TikTok views", "5.6M Instagram views"],
    url: "https://www.tiktok.com/@thesingfamily/video/7371890581632732462",
    poster: "/posters/7371890581632732462.jpg",
    alt: "Peter and Elena on a date night with Coca-Cola, from the Recipe for Magic video",
  },
  {
    brand: "Annie's",
    title: "Luke episode",
    stats: ["5.9M TikTok views", "455K Instagram views"],
    url: "https://www.tiktok.com/@thesingfamily/video/7417893122157333791",
    poster: "/posters/7417893122157333791.jpg",
    alt: "Still from The Sing Family's Annie's mac and cheese video",
  },
  {
    brand: "Wonka x IHOP",
    title: "Wonka x IHOP",
    stats: ["23.4M views"],
    url: "https://www.tiktok.com/@thesingfamily/video/7306211237266836778",
    poster: "/posters/7306211237266836778.jpg",
    alt: "Still from The Sing Family's Wonka x IHOP video",
  },
  {
    brand: "Charmin",
    title: "Charmin",
    stats: ["6.2M views"],
    url: "https://www.tiktok.com/@thesingfamily/video/7291452248532454698",
    poster: "/posters/7291452248532454698.jpg",
    alt: "Still from The Sing Family's Charmin video",
  },
];

export const repeatLine = "Walmart, P&G and Dove came back for more.";
