"use server";

import { contactSchema, toFieldErrors, formValues, type FormState } from "@/lib/schemas";
import { notifyPeter } from "@/lib/email";
import { formspree } from "@/lib/formspree";
import { rateLimit, clientIp } from "@/lib/spam";
import { emails } from "@/content/emails";
import { copy, fill } from "@/content/copy";

/** A question from the "Ask me a question" form. Lands in Peter's inbox with Reply going to the asker. */
export async function askQuestion(_prev: FormState, fd: FormData): Promise<FormState> {
  const values = formValues(fd);
  if (values.company_website) return { status: "success" };
  if (!rateLimit(`contact:${await clientIp()}`, 5)) return { status: "error", message: "Too many tries. Wait a bit, or email contact@coachpetersing.com.", values };

  const parsed = contactSchema.safeParse(values);
  if (!parsed.success) return { status: "error", message: "A couple of things need fixing.", errors: toFieldErrors(parsed.error), values };
  const { email, message } = parsed.data;

  const subject = fill(emails.peter.question, { email });
  let delivered = await notifyPeter(subject, { Email: email, Question: message }, email);
  if (!delivered) delivered = await formspree({ _subject: subject, email, message, _replyto: email });
  if (!delivered) return { status: "error", message: copy.ask.failed, values };
  return { status: "success" };
}
