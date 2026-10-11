import { unstable_cache, revalidateTag } from "next/cache";
import { fetchRoster } from "./rosterCore";

export const ROSTER_TAG = "roster";
const revalidate = 3600;

/** Cached for an hour. The Stripe webhook calls refreshRoster() after every signing and cancellation. */
export const getRoster = unstable_cache(fetchRoster, ["roster-v1"], { revalidate, tags: [ROSTER_TAG] });

export function refreshRoster() {
  revalidateTag(ROSTER_TAG);
}

export type { RosterData, Slot } from "./rosterCore";
export { buildSlots, isOpeningDay } from "./rosterCore";
