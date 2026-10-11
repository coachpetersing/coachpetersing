/**
 * Every email the site sends. Each one has a subject and a list of paragraphs.
 * Every email is signed "Peter" automatically, so don't add a sign-off here.
 *
 * How to edit: change the text in quotes. Words in {curly braces} are filled in when the
 * email is sent; keep them. Lines that start with "?" only appear when that value is present
 * (for example the Opening Day line only shows for Opening Day picks).
 *
 * The Welcome email is required by California's Automatic Renewal Law. Keep the price,
 * renewal date, how to cancel, and refund policy in it.
 */

export const emails = {
  tryoutReply: {
    subject: "You're on the list",
    body: [
      "Got your tryout. I read every one.",
      "If a spot opens and you're a fit, you'll get a link to join. If not, you stay on the list.",
    ],
  },
  pick: {
    subject: "You made the roster",
    body: [
      "Watched your video. I want to work with you.",
      "?note:Quick note on it: {note}",
      "Your link to join {plan}: {link}",
      "Good for 72 hours. Then the spot goes to the next person.",
      "?openingDay:You're getting the Opening Day rate: ${discounted}/month for your first {months} months, then ${regular}.",
      "The plan renews monthly until you cancel, and you can cancel anytime online.",
    ],
  },
  pickExpired: {
    subject: "Your spot passed",
    body: ["The link expired, so the spot went to the next person. You're still on the list."],
  },
  welcome: {
    subject: "Welcome to the roster",
    body: [
      "You're on the {plan} plan at ${price}/month{openingDayNote}. It renews on the {day} of each month until you cancel. Cancel anytime here: {cancelUrl}",
      "Next: fill out your intake at {welcomeUrl}. Send your work at {submitUrl}.",
      "Your first review is a full audit of your page and last 3 videos, within 5 days. If it isn't useful, tell me within 7 days of getting it and I'll refund your first month.",
    ],
    openingDayNote: ", with the Opening Day rate of ${discounted}/month for your first {months} months",
  },
  canceled: {
    subject: "Your plan is canceled",
    body: [
      "Done. You have access through {date} and won't be charged again.",
      "Want back in later? Try out again.",
    ],
  },
  waitlist: {
    subject: "Still on the list",
    body: ["Roster's still full. You're still on the list. Nothing to do."],
    unsubscribe: "Don't want these? Take me off the list: {url}",
  },
  /** Footer line on member emails so billing is always one click away. */
  billingLine: "Manage or cancel your plan: {url}",

  // Notes to Peter. Plain text, not signed.
  peter: {
    tryout: "Tryout: {name} ({plan}, {range})",
    signing: "New signing: {email}, {plan}",
    spotOpened: "Spot opened: {plan}",
    paymentFailed: "Payment failed: {email}",
    pickExpired: "{email}'s pick expired. Run npm run pick for the next person.",
    intake: "Intake: {name} ({listing})",
    submission: "{type} from {email} ({n} of {limit} this month)",
    overLimit: " (OVER LIMIT)",
  },
};
