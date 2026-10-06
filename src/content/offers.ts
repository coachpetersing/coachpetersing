/** The free 15-minute intro call. Every "Book a call" button on the site goes here. */
export const introCallUrl = "https://cal.com/coachpetersing/intro";

export type SessionOption = { label: string; priceUsd: number; bookingUrl: string };

export const offers = {
  oneOnOne: {
    name: "1:1 Coaching",
    priceUsd: null as number | null, // per-session prices live in `options`
    bookingUrl: "https://cal.com/coachpetersing/60min",
    options: [
      { label: "30 minutes", priceUsd: 150, bookingUrl: "https://cal.com/coachpetersing/30min" },
      { label: "60 minutes", priceUsd: 250, bookingUrl: "https://cal.com/coachpetersing/60min" },
    ] as SessionOption[],
  },
  workshop: {
    name: "Workshops",
    nextDate: "TBD",
    location: "Orange County, CA and online",
    priceUsd: null as number | null,
    waitlistFormAction: "TBD",
  },
  business: {
    name: "Social for your business",
    priceUsd: null as number | null,
    bookingUrl: introCallUrl,
  },
  brands: {
    mediaKitEmail: "contact@coachpetersing.com",
    bookingUrl: introCallUrl,
  },
};

export const isSet = (v: string | number | null | undefined): v is string | number =>
  v !== null && v !== undefined && v !== "" && v !== "TBD";
