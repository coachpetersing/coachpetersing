/**
 * Creates the tabs in the "Coaching Sales" Google Sheet and writes the header rows.
 * Safe to run again. Share the sheet with the service account email first.
 *
 *   npm run sheet:setup
 */
import { setupSheet } from "@/lib/sheets";

setupSheet()
  .then((added) => console.log(added.length ? `Added tabs: ${added.join(", ")}. Headers written.` : "All tabs exist. Headers written."))
  .catch((err) => {
    console.error(err.message);
    process.exit(1);
  });
