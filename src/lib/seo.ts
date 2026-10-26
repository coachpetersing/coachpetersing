import type { Metadata } from "next";
import { site } from "@/content/site";

export const homeTitle = "Peter Sing | Content coaching for creators and business owners";
export const homeDescription = "Book an hour with Peter Sing. Bring the videos, the pitch, the page. Leave with a one-pager of what to do next. $299, or monthly plans. Orange County, CA and online.";

export function pageMeta(title: string, description: string, path: string, opts: { noindex?: boolean } = {}): Metadata {
  const url = `${site.url}${path}`;
  const full = `${title} | ${site.name}`;
  return {
    title: full,
    description,
    alternates: { canonical: url },
    openGraph: { title: full, description, url, type: "website" },
    twitter: { card: "summary_large_image", title: full, description },
    ...(opts.noindex ? { robots: { index: false, follow: false } } : {}),
  };
}

export const descriptions = {
  terms: "Terms for calls and monthly call plans: prices, partner codes, renewal, how to cancel online, refunds.",
  privacy: "What coachpetersing.com collects, who processes it, and how to ask for it to be deleted.",
  brands: "Sponsored content from The Sing Family and help running creator campaigns for brands and agencies.",
  welcome: "You're paid up. Here's your next step.",
  book: "Book a call on your monthly plan.",
  cancel: "Cancel your plan online.",
  qr: "QR codes and cards for partners.",
  partners: "Refer creators and business owners to Peter Sing and get paid for it.",
};
