/**
 * Every sentence on the site, grouped by page and section.
 *
 * How to edit: change the text in quotes and save. Words inside {curly braces} are filled in
 * from live data (prices, names), so leave those as they are. Voice: first person, plain,
 * short sentences. No hype words, no em dashes.
 */

export const copy = {
  nav: {
    links: [
      { href: "/#prices", label: "Prices" },
      { href: "/#how", label: "How it works" },
      { href: "/#work", label: "Work" },
      { href: "/#faq", label: "FAQ" },
    ],
    cta: "Book a call",
    menu: "Menu",
    close: "Close menu",
    skip: "Skip to content",
  },
  mobileBar: {
    text: "An hour with me is ${call}.",
    cta: "Book",
  },
  hero: {
    kicker: "CONTENT COACHING",
    h1: "Your videos aren't bad. They're forgettable.",
    sub: "Book an hour. Bring the videos, the pitch, the page, whatever isn't working. You leave with a one-pager of what to do next.",
    primary: "Book a call",
    secondary: "Monthly plans",
    videoAlt: "A short montage of Sing Family brand videos",
    placeholder: "Montage coming soon",
  },
  /** The partner code box under the prices, and what shows once a code is in. */
  partner: {
    line: "Referred by a partner? Enter their code here for your first-month discount.",
    label: "Partner code",
    placeholder: "Code",
    apply: "Apply",
    applying: "Checking",
    applied: "{name}'s code is in. The first payment shows the discount below and at checkout.",
    unknown: "That code isn't one I recognize. Check the spelling, or skip it.",
    remove: "Remove code",
    cardOnce: "${price} with {name}'s code",
    cardFirstMonth: "${price} first month with {name}'s code, then ${full}",
    fine: "First purchase only, new customers only, one code per customer.",
  },
  prices: {
    h2: "Prices",
    sub: "Pick how much of my time you want. Everything is paid up front.",
    once: "one time",
    perMonth: "/month",
    fine: "Calls are one hour on video. Every call ends with a one-pager from me: what we decided and what you're doing next. Reschedule up to 24 hours before. Inside 24 hours, the call is used. Monthly calls don't roll over. Cancel a plan anytime from the link at the bottom of every page, and you keep your calls through the month you paid for.",
  },
  how: {
    h2: "How it works",
    steps: [
      { title: "Pay.", body: "Pick one above. Card, Apple Pay, whatever Stripe takes." },
      { title: "Book.", body: "A calendar right after checkout. Pick your hour." },
      { title: "Do the work.", body: "You get a one-pager after the call. I coach. You make it. Filming and editing are on you." },
    ],
  },
  onePager: {
    h2: "What a call looks like",
    body: "An hour, and a one-pager in your inbox afterwards. Three parts, in this order.",
    parts: [
      { label: "KEEP", text: "what's working, so you don't fix it by accident" },
      { label: "FIX", text: "the three things killing it, biggest first" },
      { label: "NEXT", text: "what you're making before we talk again, and the first line of it" },
    ],
    caption: "First ten minutes I look at what you've posted. Last ten minutes you leave with the list.",
    sample: "Read a real one",
    placeholder: "Sample coming soon.",
  },
  who: {
    h2: "Who this is for",
    creators: {
      title: "Creators",
      body: "You post. You've made some money from it or you're close. You want brand deals, and you want them to pay more. I've done 150 of them from your side of the table.",
    },
    owners: {
      title: "Business owners",
      body: "A dentist, a gym, a restaurant, a shop. Your page has 400 followers and brings nobody in. I'll tell you what to film, and the person at your front desk can shoot it on a phone.",
    },
    notFor: {
      title: "Not for you if",
      items: ["You want someone to film and edit for you.", "You want a course you'll never finish.", "You want to go viral by Friday.", "You get defensive about notes."],
    },
    brands: { text: "Brand or agency? That's a different thing.", link: { href: "/brands", label: "Go here" } },
  },
  work: {
    h2: "The work",
    view: "See the post",
  },
  about: {
    h2: "About",
    body: "Peter Sing. Comedy videos with my wife Elena as The Sing Family since 2019. Actor, SAG-AFTRA. Before this, 10 years in learning and development at PwC. Orange County, CA.",
  },
  faq: { h2: "Questions" },
  final: {
    h2: "Book an hour.",
    sub: "${call}. Bring what isn't working. Leave with a plan.",
    cta: "Book a call",
  },
  footer: {
    contact: "Contact",
    follow: "The Sing Family",
    links: [
      { href: "/book", label: "Book a call (members)" },
      { href: "/cancel", label: "Cancel your plan" },
      { href: "/terms", label: "Terms" },
      { href: "/privacy", label: "Privacy" },
      { href: "/brands", label: "Brands" },
    ],
  },

  checkout: {
    unavailable: "Checkout isn't set up yet. Email contact@coachpetersing.com and I'll send you a link.",
  },

  welcome: {
    // A one-time call
    callH1: "Paid. Pick a time.",
    callH1Named: "Paid. Pick a time, {name}.",
    callSub: "One hour on video. Reschedule up to 24 hours before from the confirmation email.",
    // A monthly plan
    planH1: "You're in.",
    planH1Named: "You're in, {name}.",
    planSub: "Book your calls below. Bookmark this page, or use the Book a call link at the bottom of the site anytime.",
    planNote: "Your plan renews monthly until you cancel. The welcome email has the details. Cancel anytime from the link at the bottom of every page.",
    bookFallback: "Open the booking page",
    noCal: "I'll email you a booking link within the hour.",
    // No session found
    plainH1: "Thanks.",
    plainSub: "If you just paid, check your email. Your receipt has everything you need.",
  },
  book: {
    h1: "Book a call",
    intro: "For people on a monthly plan. Enter the email you signed up with.",
    button: "Show my calendar",
    checking: "Checking",
    notFound: "I can't find an active plan for that email. If you're on one, reply to your welcome email and I'll sort it out. Not on one? Prices are on the home page.",
    oneOff: "Paid for a single call and lost the link? Reply to your receipt and I'll resend it.",
    note: "Your plan includes {calls} calls a month. Book them whenever. They don't roll over.",
  },
  cancel: {
    h1: "Cancel your plan",
    body: "Click below, enter your email, cancel. You keep your calls through the month you paid for.",
    button: "Go to billing",
    fine: "Trouble? Email contact@coachpetersing.com and I'll cancel it for you.",
  },
  brands: {
    h1: "Brands and agencies",
    body: "Coaching is for individuals and small businesses. For brands and agencies I do two things: sponsored content with The Sing Family, and help running creator campaigns, brief to post.",
    cta: "Email me",
  },
  qr: {
    h1: "Partner codes",
    intro: "Pick a partner to get their QR code, link and printable card. Add partners in src/content/partners.ts.",
    none: "No partners yet. Add one in src/content/partners.ts and push.",
    unknown: "That code isn't in the partners list.",
    link: "Link",
    download: "Download QR (SVG)",
    downloadPng: "Download QR (PNG)",
    card: "Open the printable card",
    back: "All partners",
  },
  card: {
    scan: "Scan to book",
    line: "Use code {code} when you book. Your first call is ${price} instead of ${full}.",
    stats: ["150+ paid brand deals", "1B+ views", "Orange County, CA"],
    tagline: "Content coaching for creators and business owners.",
  },
  partners: {
    h1: "Send me creators.",
    sub: "$30 per call, 15% of every month they stay subscribed, for a year.",
    how: {
      h2: "How it works",
      steps: [
        { title: "You get a code.", body: "Your first name, usually. It's also a link and a QR code if you want them." },
        { title: "They use it.", body: "They type it under the prices on the site or come in through your link. Their first payment is discounted: $50 off a call, $100 off the first month of two calls, $200 off the first month of four." },
        { title: "You get paid.", body: "$30 when a call is booked. 15% of the full plan price every month they stay, for 12 months. Paid on the 1st, 30 days after the payment clears, $100 minimum or it rolls to next month." },
      ],
    },
    terms: {
      h2: "The fine print",
      items: [
        "The discount is for a customer's first purchase only, and only once per person. Someone who cancels and comes back with a new code doesn't get it twice.",
        "Your cut is 15% of full price, including the discounted first month. Two calls a month pays you $75 a month. Four pays $135.",
        "Payouts stop when the client cancels, and after 12 months on any one client. A refund pulls that payout back.",
        "Paid monthly on the 1st through Melio, with a 30-day hold. Under $100 rolls over to the next month.",
        "You're an independent referral partner, not an employee. No quotas, no hours, no exclusivity. You'll get a 1099 if you cross the IRS threshold.",
        "Say it's a referral. If you post about it, disclose it.",
      ],
    },
    form: {
      h2: "Want a code?",
      intro: "Tell me who you are and who you'd send. I'll reply within a couple of days.",
      submit: "Send",
      sending: "Sending",
      success: "Got it. I'll be in touch.",
    },
  },
  notFound: {
    h1: "Nothing here.",
    body: "That page doesn't exist. It may have moved when the site changed.",
    home: "Back home",
    prices: "See prices",
  },
};

/** Fills {placeholders} in a copy string. */
export function fill(s: string, vars: Record<string, string | number>) {
  return s.replace(/\{(\w+)\}/g, (_, k) => (k in vars ? String(vars[k]) : `{${k}}`));
}
