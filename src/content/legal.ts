/**
 * Terms and Privacy pages. Each section is a heading and a list of paragraphs.
 *
 * How to edit: change the text in quotes. Update `updated` when anything changes.
 * The terms are a plain-language draft and should be reviewed by a lawyer before launch.
 * Keep the prices, renewal, cancellation, and refund wording in line with src/content/site.ts
 * and the emails in src/content/emails.ts.
 */

type Section = { h: string; p: string[] };

export const terms: { title: string; updated: string; intro: string; sections: Section[] } = {
  title: "Terms",
  updated: "Updated October 2026",
  intro:
    "These are the terms for coaching bought at coachpetersing.com, run by Peter Sing in Orange County, California. I've kept them short and plain. By paying for anything here you agree to them.",
  sections: [
    {
      h: "What's for sale",
      p: [
        "Call: $299, one time. One 60-minute coaching call on video, booked after payment, plus a written one-pager afterwards.",
        "Two calls a month: $499 a month. Two 60-minute calls in each billing month, each with a one-pager.",
        "Four calls a month: $899 a month. Four 60-minute calls in each billing month, each with a one-pager.",
      ],
    },
    {
      h: "Partner codes",
      p: [
        "Some people who refer clients to me have a code. Entered before checkout, it takes $50 off a Call, $100 off the first month of Two calls a month, or $200 off the first month of Four calls a month. The discount shows at checkout before you pay.",
        "It applies to your first purchase only and once per person. If you've bought from me before, or cancel and come back, the code doesn't apply, and I may charge the difference or cancel the discounted order.",
        "The person whose code you used is paid a referral fee by me. It doesn't change your price.",
      ],
    },
    {
      h: "Automatic renewal",
      p: [
        "The monthly plans renew automatically every month, on the same day of the month you joined, and charge the card on file until you cancel. You agree to this when you check out, and your welcome email repeats the price, the renewal day, and how to cancel.",
      ],
    },
    {
      h: "Cancelling a plan",
      p: [
        "You can cancel online anytime at coachpetersing.com/cancel, or from the billing link in any email from me. You don't need to call or email anyone.",
        "When you cancel, you keep your calls through the month you've already paid for, and you won't be charged again.",
        "If you have trouble, email contact@coachpetersing.com and I'll cancel it for you.",
      ],
    },
    {
      h: "Calls",
      p: [
        "Calls are booked through the calendar link you get after paying. Reschedule up to 24 hours before the start time from your confirmation email. Inside 24 hours, or if you don't show up, the call counts as used.",
        "Monthly calls don't roll over. Unused calls expire at the end of the billing month.",
        "If I have to cancel a call, you can rebook it at no charge, and it doesn't count against your month.",
      ],
    },
    {
      h: "Refunds",
      p: ["Payments aren't refunded, including for partial months or unused calls, except for a call I cancel and you choose not to rebook."],
    },
    {
      h: "What I do and don't do",
      p: [
        "This is coaching only. I give notes and advice. I don't create, film, or edit content for you, and I don't run your accounts.",
        "Anything I say about brand deals, pricing, and contracts is general guidance from my own experience. It isn't legal, tax, or financial advice. For those, talk to a lawyer, accountant, or other professional.",
        "I can't promise views, followers, or deals. I can promise my honest opinion.",
      ],
    },
    {
      h: "Your content and privacy",
      p: ["I won't share anything you send me publicly without your written permission. See the Privacy page for what's collected and who handles it."],
    },
    {
      h: "Price changes",
      p: ["If I change the price of a plan you're on, I'll email you at least 30 days before the change affects you."],
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
      p: ["This site is run by Peter Sing in Orange County, California. Here's what it collects, why, and who helps me handle it."],
    },
    {
      h: "What's collected",
      p: [
        "Checkout: your name, email, and payment details, handled by Stripe. I never see your full card number.",
        "Booking: your name, email, and the time you pick, handled by Cal.com.",
        "Partner codes: if you enter a code or arrive through a partner's link or QR code, a small cookie remembers that code for 30 days so they get credit if you buy. It holds the code and nothing else.",
        "Partner form: if you apply to be a partner, your name, email, and what you tell me about who you'd refer.",
        "I use all of this to deliver what you paid for and to email you about it. Nothing else.",
      ],
    },
    {
      h: "Who processes it",
      p: [
        "Stripe handles payments and billing.",
        "Resend sends the emails you get from me.",
        "Google Sheets stores a record of sales and partner applications.",
        "Cal.com handles call booking.",
        "Vercel hosts the site. Vercel Web Analytics counts visits anonymously, sets no cookies, and doesn't follow you across other sites.",
        "Cloudflare Turnstile checks that form submissions come from a person, not a bot.",
      ],
    },
    {
      h: "What I don't do",
      p: ["I don't sell your data, and I don't share it with anyone except the services above, which need it to work. Partners only see that a sale happened with their code, not who you are."],
    },
    {
      h: "Deleting your data",
      p: ["Email contact@coachpetersing.com and ask. I'll delete your form responses and tell you when it's done. Stripe keeps payment records it's legally required to keep."],
    },
  ],
};
