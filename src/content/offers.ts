export const offers = {
  oneOnOne: {
    name: "1:1 Coaching",
    priceUsd: null as number | null,
    bookingUrl: "TBD",
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
    bookingUrl: "TBD",
  },
  brands: {
    mediaKitEmail: "contact@coachpetersing.com",
    bookingUrl: "TBD",
  },
};

export const isSet = (v: string | number | null | undefined): v is string | number =>
  v !== null && v !== undefined && v !== "" && v !== "TBD";
