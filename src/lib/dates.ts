// All dates on the site and in emails are shown in Pacific time.
const TZ = "America/Los_Angeles";

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

/** 1 -> "1st", 22 -> "22nd" */
export function ordinal(n: number) {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}
