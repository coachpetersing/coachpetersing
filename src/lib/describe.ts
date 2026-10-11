/** Roster card text, e.g. "Comedy creator, parenting · 25K to 100K". */
export function describe(e: { type: string; niche: string; range: string }) {
  const lead = e.niche ? `${e.type}, ${e.niche}` : e.type;
  return e.range === "Local business" ? `${lead} · Local business` : `${lead} · ${e.range}`;
}
