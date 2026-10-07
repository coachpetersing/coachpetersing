import type { Metadata } from "next";
import { site } from "@/content/site";

export const homeTitle = "Coach Peter Sing: Content coaching for creators, actors, and small businesses";
export const homeDescription =
  "Peter Sing has made comedy videos with his family as The Sing Family since 2019 and has worked with brands like Coca-Cola, Walmart, Disney, and Dove. He offers one-on-one content coaching for creators, actors, and small businesses.";

export function pageMeta(title: string, description: string, path: string): Metadata {
  const url = `${site.url}${path}`;
  return {
    title: `${title} | ${site.name}`,
    description,
    alternates: { canonical: url },
    openGraph: { title: `${title} | ${site.name}`, description, url, type: "website" },
    twitter: { card: "summary_large_image", title: `${title} | ${site.name}`, description },
  };
}

export const descriptions = {
  work: "Brand campaigns from The Sing Family with Coca-Cola, Wonka x IHOP, Charmin, Disney, and others.",
  coaching: "1:1 content coaching from $150, small-group workshops in Orange County and online, and help for small businesses that want to post more consistently.",
  brands: "Work with Peter Sing on creator partnerships with The Sing Family, campaign consulting, speaking, or team training.",
  about: "Peter Sing runs The Sing Family with his wife Elena, spent ten years at PwC, where he was Director of Learning and Development on client programs, and is a SAG-AFTRA actor. He coaches creators, actors, and business owners from Orange County, CA.",
  contact: "Email Peter Sing, book a call, or send a note. He replies within two days.",
  thanks: "Your message is in. Peter replies within two days.",
  privacy: "What coachpetersing.com collects and what it does with it, in plain English.",
};
