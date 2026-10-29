/**
 * Every email the site sends. Each one has a subject and a list of paragraphs.
 * Every email is signed "Peter" automatically, so don't add a sign-off here.
 *
 * How to edit: change the text in quotes. Words in {curly braces} are filled in when the
 * email is sent; keep them. Lines that start with "?key:" only appear when that value is present.
 *
 * The plan welcome email is required by California's Automatic Renewal Law. Keep the price,
 * renewal date, how to cancel, and the refund policy in it.
 */

export const emails = {
  /** After a one-time Call is paid. */
  callPaid: {
    subject: "Paid. Pick a time for your call.",
    body: [
      "Thanks. Book your hour here: {bookUrl}",
      "It's one hour on video. Bring videos, a pitch, a contract, your page, whatever you want to work on. You'll get a one-pager from me afterwards.",
      "Reschedule up to 24 hours before from the booking confirmation. Inside 24 hours the call is used.",
    ],
  },
  /** After a monthly plan is started. Required by California law; keep price, renewal, cancel, refunds. */
  planWelcome: {
    subject: "Welcome. Here's how your plan works.",
    body: [
      "You're on {plan} at ${price}/month. It renews on the {day} of each month until you cancel. Cancel anytime here: {cancelUrl}",
      "Book your calls here whenever you want: {bookUrl} (use this email address). You get {calls} calls a month. They don't roll over.",
      "Reschedule a call up to 24 hours before from its confirmation email. Inside 24 hours the call is used. Payments aren't refunded, including for unused calls.",
    ],
  },
  canceled: {
    subject: "Your plan is canceled",
    body: ["Done. You keep your calls through {date} and won't be charged again.", "Want back in later? The prices are on the site."],
  },
  /** Copy of a waitlist sign-up, sent to the person who joined. */
  waitlistCopy: {
    subject: "You're on the {plan} waitlist",
    body: [
      "Thanks for joining the waitlist for {plan}. I'll email you when a spot opens.",
      "Here's what you sent:",
      "{message}",
      "Want to start sooner? You can book a single call anytime: {callUrl}",
    ],
  },
  /** Footer line on plan emails so billing is always one click away. */
  billingLine: "Manage or cancel your plan: {url}",

  // Notes to Peter. Plain text, not signed.
  peter: {
    sale: "Sale: {product} ${amount} from {email}{ref}",
    renewal: "Renewal: {product} ${amount} from {email}{ref}",
    refTag: " (rep: {code})",
    refund: "Refund: {product} ${amount} to {email}{ref}",
    returning: " RETURNING CUSTOMER USED A CODE",
    partnerApply: "Partner application: {name}",
    waitlist: "Waitlist: {plan} from {email}",
    question: "Question from {email}",
    cancelScheduled: "Cancel scheduled: {email}, {product}",
    planEnded: "Plan ended: {email}, {product}",
    paymentFailed: "Payment failed: {email}",
    unknownProduct: "Payment with unknown product",
  },
};
