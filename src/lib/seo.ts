import type { Metadata } from "next";
import { site } from "@/content/site";

export const homeTitle = "Peter Sing | Content coaching for creators, actors and businesses";
export const homeDescription =
  "15 spots. Send me your videos. Get back what to cut, what to fix, and what to make next. Orange County, CA and online.";

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
  tryouts: "Try out for one of 15 spots. Send one video and what you want fixed. Two minutes.",
  terms: "Subscription terms for the coaching roster: plans, monthly renewal, how to cancel online, and the first-month refund.",
  privacy: "What coachpetersing.com collects, who processes it, and how to ask for it to be deleted.",
  brands: "Sponsored content from The Sing Family and help running creator campaigns for brands and agencies.",
  welcome: "Welcome to the roster.",
  submit: "Send work for a review or a brief.",
  cancel: "Cancel your coaching plan online.",
  unsubscribe: "Leave the Tryouts list.",
};
