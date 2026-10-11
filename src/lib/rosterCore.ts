import { ROSTER_SIZE, COACHING_CAP, openingDay } from "@/content/site";
import { listed, fallback, type RosterEntry } from "@/content/roster";
import { stripe, priceId, SPOT_STATUSES } from "./stripe";
import { env } from "./env";
import { nextDraftDay } from "./dates";

export type RosterData = {
  size: number;
  filled: number;
  open: number;
  activeNotes: number;
  activeCoaching: number;
  coachingOpen: number;
  openingDayLeft: number;
  openingDayMax: number;
  nextDraftDay: string; // ISO
  updatedAt: string; // ISO
  source: "stripe" | "fallback";
};

export type Slot =
  | { kind: "listed"; number: number; entry: RosterEntry }
  | { kind: "private"; number: number }
  | { kind: "open"; number: number };

async function countActive(price: string) {
  let n = 0;
  for (const status of SPOT_STATUSES) {
    for await (const _ of stripe().subscriptions.list({ price, status, limit: 100 })) n++;
  }
  return n;
}

async function openingDayRemaining(): Promise<{ left: number; max: number }> {
  const id = env.couponOpeningDay();
  if (!id) return { left: 0, max: 0 };
  try {
    const c = await stripe().coupons.retrieve(id);
    if (!c.valid || !c.max_redemptions) return { left: 0, max: c.max_redemptions ?? 0 };
    return { left: Math.max(0, c.max_redemptions - c.times_redeemed), max: c.max_redemptions };
  } catch {
    return { left: 0, max: 0 };
  }
}

function build(activeNotes: number, activeCoaching: number, od: { left: number; max: number }, source: RosterData["source"]): RosterData {
  const filled = Math.min(ROSTER_SIZE, activeNotes + activeCoaching);
  const open = ROSTER_SIZE - filled;
  const now = new Date();
  return {
    size: ROSTER_SIZE,
    filled,
    open,
    activeNotes,
    activeCoaching,
    coachingOpen: Math.max(0, Math.min(COACHING_CAP - activeCoaching, open)),
    openingDayLeft: od.left,
    openingDayMax: od.max,
    nextDraftDay: nextDraftDay(now).toISOString(),
    updatedAt: now.toISOString(),
    source,
  };
}

/** Live counts from Stripe. Never throws: on any error it logs and uses content/roster.ts. */
export async function fetchRoster(): Promise<RosterData> {
  try {
    const [notes, coaching, od] = await Promise.all([
      countActive(priceId("notes")),
      countActive(priceId("coaching")),
      openingDayRemaining(),
    ]);
    return build(notes, coaching, od, "stripe");
  } catch (err) {
    console.error("[roster] Stripe fetch failed, using fallback:", (err as Error).message);
    const coaching = fallback.coachingOverride;
    return build(Math.max(0, fallback.filledOverride - coaching), coaching, { left: fallback.openingDayLeftOverride, max: openingDay.spots }, "fallback");
  }
}

/** Listed entries first, then private members, then open spots. Numbers are unique, 1 to size. */
export function buildSlots(r: Pick<RosterData, "filled" | "size">): Slot[] {
  const shown = listed.slice(0, r.filled);
  const used = new Set(shown.map((e) => e.number));
  const free = Array.from({ length: r.size }, (_, i) => i + 1).filter((n) => !used.has(n));
  const slots: Slot[] = shown.map((entry) => ({ kind: "listed", number: entry.number, entry }));
  for (let i = 0; i < r.filled - shown.length; i++) slots.push({ kind: "private", number: free.shift()! });
  while (free.length) slots.push({ kind: "open", number: free.shift()! });
  return slots;
}

export const isOpeningDay = (r: RosterData) => r.open === r.size && r.openingDayLeft > 0;
