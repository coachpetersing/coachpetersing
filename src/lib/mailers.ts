import { emails } from "@/content/emails";
import { plans, openingDay, type PlanId } from "@/content/site";
import { render, sendEmail } from "./email";
import { env } from "./env";
import { signEmail } from "./sign";

const site = () => env.siteUrl();
const billingFooter = () => {
  const url = env.portalLoginUrl() || `${site()}/cancel`;
  return [emails.billingLine.replace("{url}", url)];
};

export async function sendTryoutReply(to: string) {
  const { html, text } = render(emails.tryoutReply.body);
  await sendEmail({ to, subject: emails.tryoutReply.subject, html, text });
}

export async function sendPick(to: string, o: { plan: PlanId; link: string; note?: string; openingDay?: boolean }) {
  const p = plans[o.plan];
  const { html, text } = render(emails.pick.body, {
    note: o.note || "",
    plan: p.name,
    link: o.link,
    openingDay: o.openingDay ? "yes" : "",
    discounted: p.openingDayPrice,
    regular: p.price,
    months: openingDay.months,
  });
  await sendEmail({ to, subject: emails.pick.subject, html, text });
}

export async function sendPickExpired(to: string) {
  const { html, text } = render(emails.pickExpired.body);
  await sendEmail({ to, subject: emails.pickExpired.subject, html, text });
}

export async function sendWelcome(to: string, o: { plan: PlanId; renewDay: string; openingDay: boolean; sessionId?: string }) {
  const p = plans[o.plan];
  const odNote = o.openingDay
    ? emails.welcome.openingDayNote.replace("{discounted}", String(p.openingDayPrice)).replace("{months}", String(openingDay.months))
    : "";
  const welcomeUrl = `${site()}/welcome?plan=${o.plan}${o.sessionId ? `&session_id=${o.sessionId}` : ""}`;
  const { html, text } = render(
    emails.welcome.body,
    {
      plan: p.name,
      price: p.price,
      openingDayNote: odNote,
      day: o.renewDay,
      cancelUrl: `${site()}/cancel`,
      welcomeUrl,
      submitUrl: `${site()}/submit`,
    },
    { footer: billingFooter() },
  );
  await sendEmail({ to, subject: emails.welcome.subject, html, text });
}

export async function sendCanceled(to: string, date: string) {
  const { html, text } = render(emails.canceled.body, { date }, { footer: billingFooter() });
  await sendEmail({ to, subject: emails.canceled.subject, html, text });
}

export async function sendWaitlist(to: string) {
  const url = `${site()}/unsubscribe?e=${encodeURIComponent(to)}&t=${signEmail(to)}`;
  const { html, text } = render(emails.waitlist.body, { url }, { footer: [emails.waitlist.unsubscribe] });
  await sendEmail({ to, subject: emails.waitlist.subject, html, text });
}
