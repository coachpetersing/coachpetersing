"use server";

import { intakeSchema, toFieldErrors, formValues, type FormState } from "@/lib/schemas";
import { appendRow, nowStamp } from "@/lib/sheets";
import { notifyPeter } from "@/lib/email";
import { rateLimit, clientIp } from "@/lib/spam";
import { emails } from "@/content/emails";
import { fill } from "@/content/copy";
import { describe } from "@/lib/describe";

export async function submitIntake(_prev: FormState, fd: FormData): Promise<FormState> {
  const values = formValues(fd);
  if (values.company_website) return { status: "success" };
  if (!rateLimit(`intake:${await clientIp()}`, 10)) return { status: "error", message: "Too many tries. Wait a bit, or email contact@coachpetersing.com.", values };

  const parsed = intakeSchema.safeParse(values);
  if (!parsed.success) return { status: "error", message: "A few things need fixing.", errors: toFieldErrors(parsed.error), values };
  const i = parsed.data;
  const listed = i.listing === "listed";

  const row = {
    Timestamp: nowStamp(),
    Status: listed ? "Pending approval" : "Private",
    Name: i.name,
    Email: i.email,
    Handles: i.handles,
    "3-month goal": i.goal,
    "Last 3 videos": i.videos,
    "Anything else": i.notes,
    Listing: listed ? "List me anonymously" : "Keep me private",
    Type: listed ? i.type : "",
    Niche: listed ? i.niche : "",
    "Follower range": listed ? i.range : "",
    Region: listed ? i.region : "",
    Preview: listed ? [describe(i), i.region].filter(Boolean).join(" / ") : "",
  };

  let sheetError = "";
  try {
    await appendRow("Intake", row);
  } catch (err) {
    sheetError = (err as Error).message;
    console.error("[intake] Sheet write failed:", sheetError);
  }

  const notified = await notifyPeter(
    fill(emails.peter.intake, { name: i.name, listing: listed ? "listing pending approval" : "private" }),
    {
      ...row,
      Plan: i.plan,
      ...(listed
        ? { "To approve": `Add to src/content/roster.ts: { number: ?, type: "${i.type}", niche: "${i.niche}", range: "${i.range}", region: "${i.region}", plan: "${i.plan}" }` }
        : {}),
      ...(sheetError ? { "SHEET WRITE FAILED": sheetError } : {}),
    },
    i.email,
  );
  if (sheetError && !notified) return { status: "error", message: "Something broke on my end and your form didn't go through. Email it to contact@coachpetersing.com instead." };

  return { status: "success" };
}
