// All dates on the site and in emails are shown in Pacific time.
const TZ = "America/Los_Angeles";

/** "Oct 10" */
export function shortDate(d: Date) {
  return d.toLocaleDateString("en-US", { timeZone: TZ, month: "short", day: "numeric" });
}

/** "November 1, 2026" */
export function longDate(d: Date) {
  return d.toLocaleDateString("en-US", { timeZone: TZ, month: "long", day: "numeric", year: "numeric" });
}

/** Pacific calendar parts for a date. */
export function pacificParts(d: Date) {
  const parts = new Intl.DateTimeFormat("en-US", { timeZone: TZ, year: "numeric", month: "numeric", day: "numeric" })
    .formatToParts(d)
    .reduce<Record<string, number>>((acc, p) => (p.type === "literal" ? acc : { ...acc, [p.type]: Number(p.value) }), {});
  return { year: parts.year, month: parts.month, day: parts.day };
}

/** The 1st of next month, Pacific. Returned as a noon-UTC date so formatting never slips a day. */
export function nextDraftDay(now = new Date()) {
  const { year, month } = pacificParts(now);
  return new Date(Date.UTC(month === 12 ? year + 1 : year, month % 12, 1, 12));
}

/** "2026-10" in Pacific time, for counting submissions per calendar month. */
export function monthKey(d = new Date()) {
  const { year, month } = pacificParts(d);
  return `${year}-${String(month).padStart(2, "0")}`;
}

/** 1 -> "1st", 22 -> "22nd" */
export function ordinal(n: number) {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}
