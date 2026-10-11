/**
 * The public roster. Counts come from Stripe (see src/lib/roster.ts). This file only holds the
 * descriptions members have agreed to show, plus a fallback for when Stripe can't be reached.
 *
 * How to edit:
 * 1. A member fills out their intake on /welcome and picks "List me anonymously".
 * 2. Their wording lands in the Google Sheet tab "Intake" with status "Pending approval".
 * 3. Check it against the rules below, then add one line to `listed`. Mark the row "Approved".
 * 4. To take someone down, delete their line. Their spot still shows as a private "Roster member".
 *
 * Description rules (the intake form enforces these too):
 * - type: one of the `memberTypes` below.
 * - niche: a few words, 30 characters max. Can be "".
 * - range: one of the `followerRanges` below.
 * - region: optional, one of the `regions` below.
 * - No names, handles, exact follower numbers, or cities.
 *
 * `number` is the jersey number, 1 to 15. Keep each one unique.
 */

export const followerRanges = ["Under 10K", "10K to 25K", "25K to 100K", "100K to 500K", "500K+", "Local business"] as const;
export const memberTypes = ["Creator", "Comedy creator", "Actor", "Business owner", "Other"] as const;
export const regions = ["SoCal", "California", "West Coast", "US", "International"] as const;

export type RosterEntry = {
  number: number;
  type: string;
  niche: string;
  range: (typeof followerRanges)[number];
  region?: (typeof regions)[number] | "";
  plan: "notes" | "coaching";
};

// Example: { number: 1, type: "Comedy creator", niche: "", range: "25K to 100K", region: "SoCal", plan: "notes" },
export const listed: RosterEntry[] = [];

/**
 * Used only if Stripe can't be reached. Set these to the real numbers when you notice
 * Stripe is down, so the roster never shows something false.
 */
export const fallback = {
  filledOverride: 0,
  coachingOverride: 0,
  openingDayLeftOverride: 0,
};
