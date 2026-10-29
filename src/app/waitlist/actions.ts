"use server";

import { waitlistSchema, toFieldErrors, formValues, type FormState } from "@/lib/schemas";
import { notifyPeter, render, sendEmail } from "@/lib/email";
import { rateLimit, clientIp } from "@/lib/spam";
import { emails } from "@/content/emails";
import { copy, fill } from "@/content/copy";
import { products, site } from "@/content/site";
import { isProductId } from "@/lib/stripe";

/**
 * Backup delivery to Peter through Formspree, used only when the email service (Resend) isn't set
 * up or fails, so a sign-up is never lost.
 */
async function formspree(fields: Record<string, string>) {
  const id = process.env.NEXT_PUBLIC_FORMSPREE_ID;
  if (!id) return false;
  try {
    const res = await fetch(`https://formspree.io/f/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(fields),
      cache: "no-store",
    });
    if (!res.ok) console.error("[waitlist] Formspree returned", res.status);
    return res.ok;
  } catch (err) {
    console.error("[waitlist] Formspree failed:", (err as Error).message);
    return false;
  }
}

/** A monthly-plan waitlist sign-up. Peter gets the note; the person gets a copy of what they sent. */
export async function joinWaitlist(product: string, _prev: FormState, fd: FormData): Promise<FormState> {
  const values = formValues(fd);
  if (values.company_website) return { status: "success" };
  if (!isProductId(product)) return { status: "error", message: copy.waitlist.failed, values };
  if (!rateLimit(`waitlist:${await clientIp()}`, 5)) return { status: "error", message: "Too many tries. Wait a bit, or email contact@coachpetersing.com.", values };

  const parsed = waitlistSchema.safeParse(values);
  if (!parsed.success) return { status: "error", message: "A couple of things need fixing.", errors: toFieldErrors(parsed.error), values };
  const { email, message } = parsed.data;
  const plan = products[product].longName;

  const subject = fill(emails.peter.waitlist, { plan, email });
  let delivered = await notifyPeter(subject, { Plan: plan, Email: email, Message: message }, email);
  if (!delivered) delivered = await formspree({ _subject: subject, plan, email, message, _replyto: email });
  if (!delivered) return { status: "error", message: copy.waitlist.failed, values };

  let copied = false;
  try {
    const { html, text } = render(emails.waitlistCopy.body, { plan, message, callUrl: `${site.url.replace(/\/$/, "")}/#prices` });
    await sendEmail({ to: email, subject: fill(emails.waitlistCopy.subject, { plan }), html, text });
    copied = true;
  } catch (err) {
    console.error("[waitlist] copy to joiner failed:", (err as Error).message);
  }
  return { status: "success", data: { copied: copied ? 1 : 0 } };
}
