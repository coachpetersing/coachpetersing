"use server";

import { tryoutSchema, toFieldErrors, formValues, type FormState } from "@/lib/schemas";
import { appendRow, nowStamp } from "@/lib/sheets";
import { notifyPeter } from "@/lib/email";
import { sendTryoutReply } from "@/lib/mailers";
import { verifyTurnstile, rateLimit, clientIp } from "@/lib/spam";
import { emails } from "@/content/emails";
import { fill } from "@/content/copy";

export async function submitTryout(_prev: FormState, fd: FormData): Promise<FormState> {
  const values = formValues(fd);

  // Bots fill the honeypot. Pretend it worked so they don't retry.
  if (values.company_website) return { status: "success" };

  const ip = await clientIp();
  if (!rateLimit(`tryout:${ip}`, 5)) {
    return { status: "error", message: "That's a lot of tryouts from one place. Try again in an hour, or email contact@coachpetersing.com.", values };
  }
  if (!(await verifyTurnstile(fd.get("cf-turnstile-response") as string | null, ip))) {
    return { status: "error", message: "The spam check didn't go through. Reload the page and try again.", values };
  }

  const parsed = tryoutSchema.safeParse(values);
  if (!parsed.success) return { status: "error", message: "A few things need fixing.", errors: toFieldErrors(parsed.error), values };
  const t = parsed.data;

  const row = {
    Timestamp: nowStamp(),
    Status: "New",
    Name: t.name,
    Email: t.email,
    "What you do": t.role,
    "Handle or website": t.handle,
    Platform: t.platform,
    "Follower range": t.range,
    Video: t.video,
    "Help with": t.help,
    Plan: t.plan,
    "Found me via": t.source,
  };

  let sheetError = "";
  try {
    await appendRow("Tryouts", row);
  } catch (err) {
    sheetError = (err as Error).message;
    console.error("[tryout] Sheet write failed:", sheetError);
  }

  // Peter always gets the email, even if the Sheet write failed.
  const notified = await notifyPeter(
    fill(emails.peter.tryout, { name: t.name, plan: t.plan, range: t.range }),
    { ...row, ...(sheetError ? { "SHEET WRITE FAILED": `${sheetError}. Add this row by hand.` } : {}) },
    t.email,
  );

  // If neither the Sheet nor the email worked, the tryout would be lost. Say so.
  if (sheetError && !notified) return { status: "error", message: "Something broke on my end and your form didn't go through. Email it to contact@coachpetersing.com instead.", values };

  try {
    await sendTryoutReply(t.email);
  } catch (err) {
    console.error("[tryout] auto-reply failed:", (err as Error).message);
  }

  return { status: "success" };
}
