import { emails } from "@/content/emails";
import { products, type ProductId } from "@/content/site";
import { render, sendEmail } from "./email";
import { env } from "./env";

const site = () => env.siteUrl();
const billingFooter = () => [emails.billingLine.replace("{url}", env.portalLoginUrl() || `${site()}/cancel`)];

/** After a one-time call is paid: the Cal.com link (or the welcome page if it isn't set yet). */
export async function sendCallPaid(to: string, sessionId: string) {
  const bookUrl = env.calCallUrl() || `${site()}/welcome?session_id=${sessionId}`;
  const { html, text } = render(emails.callPaid.body, { bookUrl });
  await sendEmail({ to, subject: emails.callPaid.subject, html, text });
}

/** After a monthly plan starts. Required by California law: price, renewal day, how to cancel, refunds. */
export async function sendPlanWelcome(to: string, o: { product: ProductId; renewDay: string }) {
  const p = products[o.product];
  const { html, text } = render(
    emails.planWelcome.body,
    { plan: p.name, price: p.price, day: o.renewDay, calls: p.callsPerMonth, cancelUrl: `${site()}/cancel`, bookUrl: `${site()}/book` },
    { footer: billingFooter() },
  );
  await sendEmail({ to, subject: emails.planWelcome.subject, html, text });
}

export async function sendCanceled(to: string, date: string) {
  const { html, text } = render(emails.canceled.body, { date }, { footer: billingFooter() });
  await sendEmail({ to, subject: emails.canceled.subject, html, text });
}
