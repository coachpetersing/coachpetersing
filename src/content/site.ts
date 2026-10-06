export const site = {
  name: "Coach Peter Sing",
  shortName: "Peter Sing",
  business: "Content Creator Coaching",
  url: "https://coachpetersing.com",
  email: "contact@coachpetersing.com",
  location: "Lake Forest, California",
  handle: "@coachpetersing",
  familyHandle: "@thesingfamily",
  social: {
    instagram: "https://www.instagram.com/coachpetersing",
    tiktok: "https://www.tiktok.com/@coachpetersing",
    youtube: "https://www.youtube.com/@coachpetersing",
  },
  familySocial: [
    { name: "TikTok", url: "https://www.tiktok.com/@thesingfamily", followers: "1.1M" },
    { name: "Instagram", url: "https://www.instagram.com/thesingfamily", followers: "476K" },
    { name: "YouTube", url: "https://www.youtube.com/@thesingfamily", followers: "131K" },
  ],
  // Peter supplies these. Set to null until the files exist in /public/images.
  headshot: null as string | null, // e.g. "/images/headshot.jpg"
  secondPhoto: null as string | null, // e.g. "/images/peter-candid.jpg"
  // Formspree form id (the part after formspree.io/f/). "TBD" hides the form and shows email instead.
  formspreeId: "TBD",
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
