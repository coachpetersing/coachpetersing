"use server";

import { partnerSchema, toFieldErrors, formValues, type FormState } from "@/lib/schemas";
import { appendRow, nowStamp } from "@/lib/sheets";
import { notifyPeter } from "@/lib/email";
import { rateLimit, clientIp } from "@/lib/spam";
import { emails } from "@/content/emails";
import { fill } from "@/content/copy";

/** A partner application. Lands in the Partners tab and in Peter's inbox; Peter adds the code by hand. */
export async function applyPartner(_prev: FormState, fd: FormData): Promise<FormState> {
  const values = formValues(fd);
  if (values.company_website) return { status: "success" };
  if (!rateLimit(`partner:${await clientIp()}`, 5)) return { status: "error", message: "Too many tries. Wait a bit, or email contact@coachpetersing.com.", values };

  const parsed = partnerSchema.safeParse(values);
  if (!parsed.success) return { status: "error", message: "A few things need fixing.", errors: toFieldErrors(parsed.error), values };
  const a = parsed.data;

  const row = { Timestamp: nowStamp(), Status: "New", Name: a.name, Email: a.email, Handle: a.handle, "Who they'd send": a.who, Code: "" };
  let sheetError = "";
  try {
    await appendRow("Partners", row);
  } catch (err) {
    sheetError = (err as Error).message;
    console.error("[partners] Sheet write failed:", sheetError);
  }

  const notified = await notifyPeter(
    fill(emails.peter.partnerApply, { name: a.name }),
    { ...row, "To add": `src/content/partners.ts: { code: "${a.name.split(" ")[0].toLowerCase().replace(/[^a-z0-9]/g, "")}", name: "${a.name.split(" ")[0]}" }`, ...(sheetError ? { "SHEET WRITE FAILED": sheetError } : {}) },
    a.email,
  );
  if (sheetError && !notified) return { status: "error", message: "Something broke on my end and your form didn't go through. Email it to contact@coachpetersing.com instead.", values };
  return { status: "success" };
}
