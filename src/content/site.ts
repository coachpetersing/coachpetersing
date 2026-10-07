export const site = {
  name: "Coach Peter Sing",
  shortName: "Peter Sing",
  business: "Content Creator Coaching",
  url: "https://coachpetersing.com",
  email: "contact@coachpetersing.com",
  location: "Orange County, CA",
  familyHandle: "@thesingfamily",
  /** Every "DM me" link goes here. */
  dmUrl: "https://www.instagram.com/thesingfamily",
  /** Every "Work with me" button goes here, in a new tab. */
  workWithMeUrl: "https://cal.com/coachpetersing/intro",
  familySocial: [
    { name: "TikTok", url: "https://www.tiktok.com/@thesingfamily", followers: "1.1M" },
    { name: "Instagram", url: "https://www.instagram.com/thesingfamily", followers: "476K" },
    { name: "YouTube", url: "https://www.youtube.com/@thesingfamily", followers: "131K" },
  ],
  // Peter supplies these. Set to null until the files exist in /public/images.
  headshot: "/images/peter-headshot.jpg" as string | null,
  secondPhoto: null as string | null, // e.g. "/images/peter-candid.jpg"
  /** Photo beside the story on the About page. Falls back to the headshot. */
  aboutPhoto: "/images/peter-portrait.jpg" as string | null,
  colors: {
    ink: "#0E1A12",
    forest: "#1F3D2B",
    cream: "#F6F1E7",
    tan: "#C9A96E",
    offblack: "#141414",
  },
};

export const nav = [
  { href: "/work", label: "Work" },
  { href: "/coaching", label: "Coaching" },
  { href: "/brands", label: "Brands" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];
