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
      { href: "/#prices", label: "Work with me" },
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
    h1: "Make videos people actually watch.",
    sub: "Book an hour. Bring the videos, the pitch, the page, whatever isn't working yet. You leave with a clear next step and a one-pager from me.",
    primary: "Book a call",
    secondary: "Monthly options",
  },
  logos: { heading: "Brands I've made content for" },
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
    h2: "Work with me",
    sub: "Three ways to do it. Pay up front, book right after.",
    once: "one time",
    perMonth: "/month",
    fine: "Calls are one hour on video, and you get a one-pager from me after each one. Reschedule up to 24 hours before. Inside 24 hours, the call is used. Monthly calls don't roll over. Cancel a plan anytime from the link at the bottom of every page, and you keep your calls through the month you paid for.",
  },
  /** The form that opens on a waitlisted price card. */
  waitlist: {
    email: "Email",
    message: "What do you want help with?",
    messageHint: "Your page, your goals, where you're stuck. A few sentences is plenty.",
    submit: "Join the waitlist",
    sending: "Sending",
    cancel: "Cancel",
    done: "You're on the {plan} waitlist. I'll email you when a spot opens.",
    doneCopy: "A copy of what you sent is in your inbox.",
    failed: "Something broke on my end and it didn't go through. Email contact@coachpetersing.com instead and I'll add you.",
  },
  how: {
    h2: "How it works",
    steps: [
      { title: "Pick one.", body: "Card or Apple Pay through Stripe. Takes a minute." },
      { title: "Book your hour.", body: "A calendar comes up right after checkout. Pick a time that works." },
      { title: "Make it.", body: "You get a one-pager from me after the call. The filming and editing stay with you; I make sure they count." },
    ],
  },
  onePager: {
    h2: "What a call looks like",
    body: "An hour on video, one on one. Three parts.",
    parts: [
      { label: "LOOK", text: "We go through what you've posted and what you brought." },
      { label: "WORK", text: "The thing you came for: the video, the pitch, the page, the deal." },
      { label: "ONE-PAGER", text: "Afterwards you get a one-pager from me, so nothing from the hour gets lost." },
    ],
    caption: "Same shape every time, whether it's your first call or your fortieth.",
    sample: "See an example",
    placeholder: "Example coming soon.",
  },
  who: {
    h2: "Who this is for",
    creators: {
      title: "Creators",
      body: "You post, and you want it to turn into paid work. Brand deals, better ones, more of them. I've done 150 of them from the creator side, so I know what brands look for and what they pay.",
    },
    owners: {
      title: "Business owners",
      body: "A dentist, a gym, a restaurant, a shop. You want your page to bring people in. I'll tell you what to film, who should be in it, and how to keep it simple enough that your team can shoot it on a phone.",
    },
    notFor: {
      title: "What I don't do",
      items: ["Film or edit for you.", "Run your accounts.", "Promise views or followers. What I can promise is that you'll know exactly what to do next."],
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
    sub: "${call}. Bring what isn't working yet. Leave with a plan.",
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
    // A monthly plan button was clicked but checkout couldn't start
    unavailableH1: "Checkout is down for a minute.",
    unavailableSub: "Sorry about that. Email me at {email}, say you want {plan}, and I'll send you a payment link today. Or book a single call now and we'll set up the plan on it.",
    unavailableCta: "Book a single call",
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
        { title: "They use it.", body: "They type it under the prices on the site or come in through your link. Their first payment is discounted: $50 off a call, $100 off the first month of Gold, $200 off the first month of Diamond." },
        { title: "You get paid.", body: "$30 when a call is booked. 15% of the full plan price every month they stay, for 12 months. Paid on the 1st, 30 days after the payment clears, $100 minimum or it rolls to next month." },
      ],
    },
    terms: {
      h2: "The fine print",
      items: [
        "The discount is for a customer's first purchase only, and only once per person. Someone who cancels and comes back with a new code doesn't get it twice.",
        "Your cut is 15% of full price, including the discounted first month. Gold pays you $75 a month. Diamond pays $135.",
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
