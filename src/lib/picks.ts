import { readRows, setCell } from "./sheets";

/** Sets Status on the Picks row for a Payment Link, if there is one. Never throws. */
export async function markPick(linkId: string | null | undefined, status: string) {
  if (!linkId) return;
  try {
    const rows = await readRows("Picks");
    const row = rows.find((r) => r["Link ID"] === linkId);
    if (row) await setCell("Picks", row._row, "Status", status);
  } catch (err) {
    console.error("[picks] status update failed:", (err as Error).message);
  }
}

/** Sets Status on every Tryouts row for an email. Never throws. */
export async function markTryout(email: string, status: string) {
  try {
    const rows = await readRows("Tryouts");
    for (const r of rows.filter((r) => r.Email.toLowerCase() === email.toLowerCase())) await setCell("Tryouts", r._row, "Status", status);
  } catch (err) {
    console.error("[tryouts] status update failed:", (err as Error).message);
  }
}
