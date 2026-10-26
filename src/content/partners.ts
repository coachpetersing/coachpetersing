/**
 * Referral partners: people who send you clients. Each one has a code. A customer types the code
 * in the box under the prices (or arrives through the partner's link or QR code), gets the
 * first-payment discount, and the code is recorded on the sale and on every renewal.
 *
 *   Link:  https://coachpetersing.com/r/CODE
 *   QR:    https://coachpetersing.com/qr?code=CODE   (download the image from there)
 *   Card:  https://coachpetersing.com/card/CODE      (print it)
 *
 * None of those pages are linked from the site. Only people you give the URL to will find them.
 *
 * How to add a partner: add a line below, push. Codes are lowercase letters and numbers only,
 * no spaces. Use their first name unless two partners share one. The name is what the customer
 * sees ("Jess's code applied").
 *
 * Payouts: every sale and renewal with a code lands in the Google Sheet "Sales" tab with the
 * code, the month number, and the payout for that row (from site.ts: $30 once on a Call, 15% of
 * full price each month on a plan, for 12 months). Pay on the 1st via Melio after a 30-day hold,
 * $100 minimum or it rolls over. A refund shows up as a Refund row with a negative payout.
 * The 15% is what the site math uses. Anything you offer a manager or agency privately is
 * between you and them; adjust the Sheet by hand.
 */

export type Partner = { code: string; name: string };

export const partners: Partner[] = [
  { code: "peter", name: "Peter" }, // your own test code; use it to see what a referred customer sees
  // { code: "jess", name: "Jess" },
];

export function findPartner(code: string | null | undefined): Partner | null {
  if (!code) return null;
  const c = code.trim().toLowerCase();
  return partners.find((p) => p.code === c) ?? null;
}

export const isValidCode = (code: string) => /^[a-z0-9]{2,24}$/.test(code);
