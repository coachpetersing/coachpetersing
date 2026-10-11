/**
 * Terms and Privacy pages. Each section is a heading and a list of paragraphs.
 *
 * How to edit: change the text in quotes. Update `updated` when anything changes.
 * The terms are a plain-language draft and must be reviewed by a lawyer before launch.
 * Keep the renewal, cancellation, and refund wording in line with src/content/site.ts
 * and the emails in src/content/emails.ts.
 */

type Section = { h: string; p: string[] };

export const terms: { title: string; updated: string; intro: string; sections: Section[] } = {
  title: "Subscription terms",
  updated: "Updated October 2026",
  intro:
    "These are the terms for the coaching roster at coachpetersing.com, run by Peter Sing in Orange County, California. I've kept them short and plain. By joining a plan you agree to them.",
  sections: [
    {
      h: "Plans and prices",
      p: [
        "Notes is $297 a month. It includes 4 reviews or briefs a month and a monthly check-in. Brand pitches and media kits count as a review.",
        "Coaching is $697 a month. It includes 6 reviews or briefs a month, one 45-minute call a month, questions by email or voice note answered Tuesdays and Thursdays, and help with brand deals.",
        "If you joined with the Opening Day rate, you pay $197 (Notes) or $597 (Coaching) a month for your first 3 months, then the regular price.",
      ],
    },
    {
      h: "Automatic renewal",
      p: [
        "Your plan renews automatically every month, on the same day of the month you joined, and charges the card on file until you cancel. You agree to this when you check out.",
      ],
    },
    {
      h: "Cancelling",
      p: [
        "You can cancel online anytime at coachpetersing.com/cancel, or from the billing link in any email from me. You don't need to call or email anyone.",
        "When you cancel, you keep access until the end of the month you've already paid for, and you won't be charged again.",
        "If you have trouble, email contact@coachpetersing.com and I'll cancel it for you.",
      ],
    },
    {
      h: "Refunds",
      p: [
        "Your first review is a full audit of your page and your last 3 videos. If it isn't useful, tell me within 7 days of getting it and I'll refund your first month.",
        "Other than that, payments aren't refunded, including for partial months.",
      ],
    },
    {
      h: "Reviews and briefs",
      p: [
        "Unused reviews and briefs don't roll over. They reset at the start of each billing month.",
        "There are no pauses. If you need a break, cancel and try out again later.",
        "Turnaround times, like in by Tuesday night and back by Friday, are targets I work hard to hit, not guarantees.",
      ],
    },
    {
      h: "What I do and don't do",
      p: [
        "This is coaching only. I give notes, briefs, and advice. I don't create, film, or edit content for you.",
        "Help with brand deals, pricing, and contracts is general guidance from my own experience. It isn't legal, tax, or financial advice. For those, talk to a lawyer, accountant, or other professional.",
      ],
    },
    {
      h: "Your content and privacy",
      p: [
        "I won't share anything you send me publicly without your written permission.",
        "Being listed on the public roster is opt-in. Listings are anonymous: a short description with no name or handle. I'll take yours down whenever you ask.",
      ],
    },
    {
      h: "Price changes",
      p: [
        "If I change prices, I'll email you at least 30 days before the change affects you. Current members keep their rate unless I've told you otherwise in that notice.",
      ],
    },
    {
      h: "Governing law",
      p: ["These terms are governed by the laws of the State of California."],
    },
    {
      h: "Contact",
      p: ["Questions about these terms: contact@coachpetersing.com."],
    },
  ],
};

export const privacy: { title: string; updated: string; sections: Section[] } = {
  title: "Privacy",
  updated: "Updated October 2026",
  sections: [
    {
      h: "Who I am",
      p: [
        "This site is run by Peter Sing in Orange County, California. Here's what it collects, why, and who helps me handle it.",
      ],
    },
    {
      h: "What the forms collect",
      p: [
        "Tryouts: your name, email, what you do, your main handle or website, platform, follower range, a video link, what you want help with, which plan you're interested in, and how you found me.",
        "Member intake: your name, email, handles, goals, links to recent videos, anything else you choose to share, and, if you opt in, the short anonymous description for the public roster.",
        "Submissions: your email and the links and notes you send for a review or brief.",
        "I use all of this to run the roster, coach you, and email you about it. Nothing else.",
      ],
    },
    {
      h: "Who processes it",
      p: [
        "Stripe handles payments and billing. I never see your full card number.",
        "Resend sends the emails you get from me.",
        "Google Sheets stores form responses and the roster list.",
        "Cal.com handles booking for Coaching calls.",
        "Vercel hosts the site. Vercel Web Analytics counts visits anonymously, sets no cookies, and doesn't follow you across other sites.",
        "Cloudflare Turnstile checks that form submissions come from a person, not a bot.",
      ],
    },
    {
      h: "What I don't do",
      p: ["I don't sell your data, and I don't share it with anyone except the services above, which need it to work."],
    },
    {
      h: "Deleting your data",
      p: [
        "Email contact@coachpetersing.com and ask. I'll delete your form responses and roster listing, and tell you when it's done. Stripe keeps payment records it's legally required to keep.",
        "To stop getting Tryouts emails, use the unsubscribe link in any of them.",
      ],
    },
  ],
};
