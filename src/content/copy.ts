/**
 * Every sentence on the site, grouped by page and section.
 *
 * How to edit: change the text in quotes and save. Words inside {curly braces} are filled in
 * from live roster data, so leave those as they are. Voice: first person, plain, short
 * sentences. No hype words, no em dashes.
 */

export const copy = {
  nav: {
    links: [
      { href: "/#how", label: "How it works" },
      { href: "/#plans", label: "Plans" },
      { href: "/#roster", label: "Roster" },
      { href: "/#work", label: "Work" },
      { href: "/#faq", label: "FAQ" },
    ],
    cta: "Try out",
    menu: "Menu",
    close: "Close menu",
    skip: "Skip to content",
    pillOpen: "{open} spots open",
    pillOpenOne: "1 spot open",
    pillFull: "Roster full",
  },
  mobileBar: {
    open: "{open} of {size} spots open",
    full: "Roster full. Join Tryouts.",
    cta: "Try out",
  },
  hero: {
    kicker: "COACHING · 15 SPOTS",
    h1: "Your videos aren't bad. They're forgettable.",
    sub: "Send me what you make. I tell you what to cut, what to fix, and what to make next. You do the work.",
    primary: "Try out",
    secondary: "See a review",
    statusOpen: "{open} of {size} spots open.",
    statusFull: "Roster full. Next spots open {draftDay}.",
    statusOpeningDay: "All {size} spots open.",
    videoAlt: "A short montage of Sing Family brand videos",
    placeholder: "Montage coming soon",
  },
  marquee: { label: "Made videos for" },
  how: {
    h2: "How it works",
    steps: [
      {
        title: "Try out.",
        body: "Your page, one video, and what you want fixed. Two minutes.",
      },
      {
        title: "Get picked.",
        body: "When a spot opens, I email you a link. It's good for 72 hours.",
      },
      {
        title: "Send work.",
        body: "Get notes back. Repeat.",
      },
    ],
  },
  what: {
    h2: "What you get",
    review: {
      title: "Review",
      body: "Send a video, posted or not. Or your profile, or a brand pitch. You get a screen recording of what I'd change and why.",
      parts: [
        { label: "KEEP", text: "what works" },
        { label: "FIX", text: "the one thing that matters most" },
        { label: "TRY", text: "what to test next" },
      ],
      caption: "Every review ends this way.",
    },
    brief: {
      title: "Brief",
      body: "Don't know what to make? I tell you. Hook, shots, ending. You film it, then send it back for a review.",
    },
    turnaround: { title: "Turnaround", body: "In by Tuesday. Back by Friday." },
    audit: { title: "First review", body: "A full audit of your page and your last 3 videos." },
    coach: "I coach. I don't produce. Filming and editing are on you.",
  },
  sample: {
    h2: "What a review looks like",
    sub: "A real review of one of our videos. Same thing you'd get.",
    play: "Play the sample review",
    placeholder: "Sample review coming soon.",
    title: "Sample review by Peter Sing",
  },
  plans: {
    h2: "Two plans",
    sub: "Month to month. Cancel online.",
    perMonth: "/month",
    goodFor: "For",
    coachingBadge: "{cap} spots",
    coachingFull: "Coaching full",
    cta: "Try out",
    openingDay:
      "Opening Day: the first {spots} on the roster pay ${notesOD} or ${coachingOD} a month for {months} months, then regular price. {left} of {spots} left.",
    fine: "Plans renew monthly until you cancel. Cancel anytime from your billing page or the Cancel link at the bottom of every page. Your first review is a full audit of your page. If it isn't useful, tell me within 7 days of getting it and I'll refund the month. Unused reviews and briefs don't roll over.",
  },
  roster: {
    h2: "The roster",
    sub: "15 spots. That's it. The numbers are real. Names stay private.",
    status: "{filled} of {size} signed · {open} open · Updated {updated}",
    private: "Roster member",
    open: "Open",
    openHover: "Try out →",
    openLabel: "Spot {n} is open. Try out.",
    draft: "Full? Open spots get filled on the 1st of each month.",
    cta: "Try out",
    planTag: { notes: "Notes", coaching: "Coaching" },
  },
  work: {
    h2: "The work",
    view: "See the post",
  },
  who: {
    h2: "Who it's for",
    notFor: {
      title: "Not for you if",
      items: [
        "You want someone to film and edit for you.",
        "You want a course you'll never finish.",
        "You want to go viral by Friday.",
        "You get defensive about notes.",
      ],
    },
    isFor: {
      title: "For you if",
      items: [
        "You post every week, or you're ready to.",
        "You'll actually use the notes.",
        "You're fine hearing your video is too long.",
        "Creator, actor or business owner. Doesn't matter.",
      ],
    },
    brands: { text: "Brand or agency? That's a different thing.", link: { href: "/brands", label: "Go here" } },
  },
  about: {
    h2: "About",
    body: "Peter Sing. Comedy videos with my wife Elena as The Sing Family since 2019. Actor, SAG-AFTRA. Before this, 10 years in learning and development at PwC. Orange County, CA.",
  },
  faq: { h2: "Questions" },
  final: {
    h2: "15 spots.",
    sub: "Two minutes. I read every one.",
    cta: "Try out",
  },
  footer: {
    contact: "Contact",
    follow: "The Sing Family",
    links: [
      { href: "/terms", label: "Terms" },
      { href: "/privacy", label: "Privacy" },
      { href: "/cancel", label: "Cancel your plan" },
      { href: "/brands", label: "Brands" },
    ],
  },

  tryouts: {
    h1: "Try out",
    intro:
      "Your page, one video, and what you want fixed. I read every one. You'll get an email either way.",
    success: "You're on the list. Check your email for a confirmation.",
    submit: "Send it",
    sending: "Sending",
    consent: "OK to email me about my tryout.",
  },
  welcome: {
    h1: "You're on the roster.",
    h1Named: "You're on the roster, {name}.",
    sub: "Three things.",
    step1: "Fill out your intake",
    step2: "Bookmark your submit page",
    step2Body: "Send videos and ask for briefs here. In by Tuesday, back by Friday.",
    step2Button: "Go to your submit page",
    step3: "Book your first call",
    step3Fallback: "Open the booking page",
    footer: "Your first review is a full audit of your page and last 3 videos. Within 5 days.",
    listingNote: "I'll check the wording before it goes up. You can ask me to take it down anytime.",
    intakeSuccess: "Got it. I'll read this before your first review.",
  },
  submit: {
    h1: "Send your work",
    intro: "Members only. Use the email you signed up with.",
    notFound: "I can't find an active plan for that email. Reply to your welcome email and I'll sort it out.",
    success: "Got it. If it's in by Tuesday night, you'll have it by Friday.",
    overLimit: "Heads up, that's more than your plan includes this month. I'll reach out.",
  },
  cancel: {
    h1: "Cancel your plan",
    body: "Click below, enter your email, cancel. You keep access until the end of the month you paid for.",
    button: "Go to billing",
    fine: "Trouble? Email contact@coachpetersing.com and I'll cancel it for you.",
  },
  brands: {
    h1: "Brands and agencies",
    body: "The roster is for individuals. For brands and agencies I do two things: sponsored content with The Sing Family, and help running creator campaigns, brief to post.",
    cta: "Email me",
  },
  notFound: {
    h1: "Nothing here.",
    body: "That page doesn't exist. It may have moved when the site changed.",
    home: "Back home",
    tryout: "Try out",
  },
  unsubscribe: {
    h1: "Leave the Tryouts list",
    body: "Click below and I'll stop sending you roster updates. You can always try out again later.",
    button: "Take me off the list",
    done: "Done. You're off the list.",
    invalid: "That link doesn't look right. Email contact@coachpetersing.com and I'll take you off.",
  },
};

/** Fills {placeholders} in a copy string. */
export function fill(s: string, vars: Record<string, string | number>) {
  return s.replace(/\{(\w+)\}/g, (_, k) => (k in vars ? String(vars[k]) : `{${k}}`));
}
