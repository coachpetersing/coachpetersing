import { stripe } from "./stripe";
import { notifyPeter } from "./email";
import { sendPickExpired, sendWaitlist } from "./mailers";
import { markPick } from "./picks";
import { readRows } from "./sheets";
import { fetchRoster } from "./rosterCore";
import { emails } from "@/content/emails";
import { fill } from "@/content/copy";

/**
 * Deactivates pick links past their 72 hours that were never paid, emails the person, and tells Peter.
 * Shared by the hourly cron route and safe to run by hand.
 */
export async function expirePicks(now = Date.now()) {
  const s = stripe();
  const expired: string[] = [];
  for await (const link of s.paymentLinks.list({ active: true, limit: 100 })) {
    const exp = Number(link.metadata?.expires_at);
    const email = link.metadata?.pick_email;
    if (!exp || !email || exp * 1000 > now) continue;
    const paid = await s.checkout.sessions.list({ payment_link: link.id, status: "complete", limit: 1 });
    if (paid.data.length) continue;

    await s.paymentLinks.update(link.id, { active: false });
    expired.push(email);
    try {
      await sendPickExpired(email);
    } catch (err) {
      console.error("[expire] email failed:", email, (err as Error).message);
    }
    await notifyPeter(fill(emails.peter.pickExpired, { email }), { Email: email, Plan: link.metadata?.plan, Link: link.url });
    await markPick(link.id, "Expired");
  }
  return expired;
}

/**
 * Monthly "still on the list" email to Tryouts rows marked Waiting. Only sent when the roster
 * is actually full, so the copy stays true. Pass force to send anyway.
 */
export async function emailWaitlist({ force = false } = {}) {
  const roster = await fetchRoster();
  if (roster.open > 0 && !force) return { sent: 0, skipped: `roster has ${roster.open} open spots` };
  const rows = await readRows("Tryouts");
  const seen = new Set<string>();
  let sent = 0;
  for (const r of rows) {
    const email = r.Email.trim().toLowerCase();
    if (r.Status !== "Waiting" || !email || seen.has(email)) continue;
    seen.add(email);
    try {
      await sendWaitlist(email);
      sent++;
    } catch (err) {
      console.error("[waitlist] failed:", email, (err as Error).message);
    }
  }
  return { sent, skipped: "" };
}
