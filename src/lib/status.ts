import { copy, fill } from "@/content/copy";
import { isOpeningDay, type RosterData } from "./rosterCore";
import { shortDate } from "./dates";

/** The one-line roster status under the hero (and on the OG image). */
export function heroStatus(r: RosterData) {
  if (isOpeningDay(r)) return fill(copy.hero.statusOpeningDay, { size: r.size });
  if (r.open > 0) return fill(copy.hero.statusOpen, { open: r.open, size: r.size });
  return fill(copy.hero.statusFull, { draftDay: shortDate(new Date(r.nextDraftDay)) });
}
