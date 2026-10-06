import type { Metadata } from "next";
import { site } from "@/content/site";

export const homeTitle = "Coach Peter Sing: Content coaching from a creator with 150+ brand deals";
export const homeDescription =
  "Peter Sing has done 150+ paid brand deals for 80+ brands as The Sing Family. He coaches creators, actors, and business owners on content that gets seen and gets paid, and works with brands as a creator, consultant, and speaker.";

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
  work: "Featured campaigns from 150+ brand deals: Dove Men+Care, Coca-Cola, Wonka x IHOP, Baby Dove, Disney, and more, with the numbers and the brands that came back.",
  coaching: "1:1 coaching from $150, small-group workshops in Orange County and online, and a simple social system for business owners and professionals. Taught by a creator who has done it 150 times.",
  brands: "Hire Peter Sing for creator partnerships on The Sing Family, creative consulting, speaking, and team training. 2M+ followers, 1B+ views, zero brand-safety incidents.",
  about: "Peter Sing runs The Sing Family with his wife Elena, spent ten years at PwC, where he was Director of Learning and Development on client programs, and is a SAG-AFTRA actor. He coaches creators, actors, and business owners from Orange County, CA.",
  contact: "Email Peter Sing, book a call, or send a note. He replies within two days.",
  thanks: "Your message is in. Peter replies within two days.",
  privacy: "What coachpetersing.com collects and what it does with it, in plain English.",
};
