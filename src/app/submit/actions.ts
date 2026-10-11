"use server";

import { submitSchema, toFieldErrors, formValues, type FormState } from "@/lib/schemas";
import { appendRow, readRows, nowStamp } from "@/lib/sheets";
import { notifyPeter } from "@/lib/email";
import { findActiveMember } from "@/lib/stripe";
import { rateLimit, clientIp } from "@/lib/spam";
import { monthKey } from "@/lib/dates";
import { plans } from "@/content/site";
import { emails } from "@/content/emails";
import { copy, fill } from "@/content/copy";

export async function submitWork(_prev: FormState, fd: FormData): Promise<FormState> {
  const values = formValues(fd);
  if (values.company_website) return { status: "success" };
  if (!rateLimit(`submit:${await clientIp()}`, 20)) return { status: "error", message: "Too many tries. Wait a bit, or email contact@coachpetersing.com.", values };

  const parsed = submitSchema.safeParse(values);
  if (!parsed.success) return { status: "error", message: "A few things need fixing.", errors: toFieldErrors(parsed.error), values };
  const s = parsed.data;

  let member: Awaited<ReturnType<typeof findActiveMember>>;
  try {
    member = await findActiveMember(s.email);
  } catch (err) {
    console.error("[submit] Stripe lookup failed:", (err as Error).message);
    return { status: "error", message: "Something went wrong on my end. Try again in a minute, or email contact@coachpetersing.com.", values };
  }
  if (!member) return { status: "error", message: copy.submit.notFound, errors: { email: copy.submit.notFound }, values };

  const limit = plans[member.plan].monthlyLimit;
  const month = monthKey();

  // Count this month's earlier submissions. If the Sheet can't be read, don't block the member.
  let before: number | null = null;
  try {
    const rows = await readRows("Submissions");
    before = rows.filter((r) => r.Email.toLowerCase() === s.email && r.Month === month).length;
  } catch (err) {
    console.error("[submit] Sheet read failed:", (err as Error).message);
  }
  const n = before === null ? null : before + 1;
  const over = n !== null && n > limit;

  const row = {
    Timestamp: nowStamp(),
    Month: month,
    Email: s.email,
    Plan: plans[member.plan].name,
    Type: s.type,
    Links: s.links,
    "Look at": s.lookAt,
    Goal: s.goal,
    "Product or idea": s.product,
    "Can't do": s.cantDo,
    "Count this month": n === null ? "?" : String(n),
    Limit: String(limit),
  };

  let sheetError = "";
  try {
    await appendRow("Submissions", row);
  } catch (err) {
    sheetError = (err as Error).message;
    console.error("[submit] Sheet write failed:", sheetError);
  }

  const subject = fill(emails.peter.submission, { type: s.type, email: s.email, n: n ?? "?", limit }) + (over ? emails.peter.overLimit : "");
  const notified = await notifyPeter(subject, { ...row, ...(sheetError ? { "SHEET WRITE FAILED": sheetError } : {}) }, s.email);
  if (sheetError && !notified) return { status: "error", message: "Something broke on my end and your form didn't go through. Email it to contact@coachpetersing.com instead." };

  return { status: "success", flag: over ? "over" : undefined };
}
