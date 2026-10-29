"use server";

import { waitlistSchema, toFieldErrors, formValues, type FormState } from "@/lib/schemas";
import { notifyPeter, render, sendEmail } from "@/lib/email";
import { rateLimit, clientIp } from "@/lib/spam";
import { emails } from "@/content/emails";
import { copy, fill } from "@/content/copy";
import { products, site } from "@/content/site";
import { isProductId } from "@/lib/stripe";
import { formspree } from "@/lib/formspree";

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
