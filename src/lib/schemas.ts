import { z } from "zod";
import { followerRanges, memberTypes, regions } from "@/content/roster";

const req = (label: string) => z.string().trim().min(1, `${label} is required.`);
const email = z.string().trim().toLowerCase().min(1, "Email is required.").email("Enter a valid email, like name@example.com.");
const url = (label: string) =>
  z
    .string()
    .trim()
    .min(1, `${label} is required.`)
    .transform((v) => (/^https?:\/\//i.test(v) ? v : `https://${v}`))
    .pipe(z.string().url(`${label} must be a link, like https://www.tiktok.com/@you/video/123.`));

export const HELP_MAX = 500;
export const NICHE_MAX = 30;

export const tryoutSchema = z.object({
  name: req("Name"),
  email,
  role: z.enum(["Creator", "Actor", "Business owner", "Other"], { message: "Choose what you do." }),
  handle: req("Main handle or website").max(200),
  platform: z.enum(["TikTok", "Instagram", "YouTube", "Other"], { message: "Choose your main platform." }),
  range: z.enum(followerRanges, { message: "Choose a follower range." }),
  video: url("Video link"),
  help: req("What you want help with").max(HELP_MAX, `Keep it to ${HELP_MAX} characters.`),
  plan: z.enum(["Notes", "Coaching", "Not sure"], { message: "Choose a plan, or Not sure." }),
  source: z.string().trim().max(200).optional().default(""),
  consent: z.literal("yes", { message: "Check the box so I can email you about your tryout." }),
});

export const intakeSchema = z
  .object({
    name: req("Name"),
    email,
    handles: req("Your handles").max(500),
    goal: req("Your goal for the next 3 months").max(1000),
    videos: req("Links to your last 3 videos").max(1000),
    notes: z.string().trim().max(2000).optional().default(""),
    listing: z.enum(["listed", "private"], { message: "Choose how you'd like to appear on the roster." }),
    type: z.string().trim().optional().default(""),
    niche: z.string().trim().max(NICHE_MAX, `Keep the niche to ${NICHE_MAX} characters.`).optional().default(""),
    range: z.string().trim().optional().default(""),
    region: z.string().trim().optional().default(""),
    plan: z.enum(["notes", "coaching"]).catch("notes"),
  })
  .superRefine((v, ctx) => {
    if (v.listing !== "listed") return;
    if (!(memberTypes as readonly string[]).includes(v.type)) ctx.addIssue({ code: "custom", path: ["type"], message: "Choose a type." });
    if (!(followerRanges as readonly string[]).includes(v.range)) ctx.addIssue({ code: "custom", path: ["range"], message: "Choose a follower range." });
    if (v.region && !(regions as readonly string[]).includes(v.region)) ctx.addIssue({ code: "custom", path: ["region"], message: "Choose a region from the list." });
    // Keep listings anonymous: no handles, links, or exact numbers.
    if (/[@#]|https?:|\.com|\d/.test(v.niche))
      ctx.addIssue({ code: "custom", path: ["niche"], message: "Leave out handles, links and numbers. A few words like \"parenting comedy\" is perfect." });
  });

export const submitSchema = z
  .object({
    email,
    type: z.enum(["Review", "Brief"], { message: "Choose Review or Brief." }),
    links: z.string().trim().max(1000).optional().default(""),
    lookAt: z.string().trim().max(2000).optional().default(""),
    goal: z.string().trim().max(2000).optional().default(""),
    product: z.string().trim().max(1000).optional().default(""),
    cantDo: z.string().trim().max(1000).optional().default(""),
  })
  .superRefine((v, ctx) => {
    if (v.type === "Review") {
      if (!v.links) ctx.addIssue({ code: "custom", path: ["links"], message: "Add at least one link." });
      if (!v.lookAt) ctx.addIssue({ code: "custom", path: ["lookAt"], message: "Tell me what you want me to look at." });
    } else if (!v.goal) ctx.addIssue({ code: "custom", path: ["goal"], message: "Tell me the goal." });
  });

export type FieldErrors = Record<string, string>;

export type FormState = {
  status: "idle" | "error" | "success";
  message?: string;
  errors?: FieldErrors;
  /** Echo of what was sent, so fields keep their values after a server error. */
  values?: Record<string, string>;
  flag?: string;
};

export function toFieldErrors(error: z.ZodError): FieldErrors {
  const out: FieldErrors = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}

export function formValues(fd: FormData) {
  const v: Record<string, string> = {};
  fd.forEach((value, key) => {
    if (typeof value === "string" && !key.startsWith("$") && key !== "cf-turnstile-response") v[key] = value;
  });
  return v;
}
