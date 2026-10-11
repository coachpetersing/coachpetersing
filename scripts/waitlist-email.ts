/**
 * Sends "Still on the list" to every Tryouts row with status Waiting. Only runs when the roster
 * is full (so the email is true). The same job runs automatically on the 1st via Vercel Cron.
 *
 *   npm run waitlist-email
 *   npm run waitlist-email -- --force     (send even if spots are open)
 */
import { emailWaitlist } from "@/lib/jobs";

emailWaitlist({ force: process.argv.includes("--force") })
  .then((r) => console.log(r.skipped ? `Nothing sent: ${r.skipped}.` : `Sent ${r.sent} emails.`))
  .catch((err) => {
    console.error(err.message);
    process.exit(1);
  });
