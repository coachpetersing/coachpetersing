import { z } from "zod";

const email = z.string().trim().toLowerCase().min(1, "Email is required.").email("Enter a valid email, like name@example.com.");

export const partnerSchema = z.object({
  name: z.string().trim().min(1, "Name is required.").max(120),
  email,
  handle: z.string().trim().max(200).optional().default(""),
  who: z.string().trim().min(1, "Tell me who you'd send.").max(1500),
});

export const waitlistSchema = z.object({
  email,
  message: z.string().trim().min(1, "Tell me a little about what you want help with.").max(2000),
});

export type FieldErrors = Record<string, string>;

export type FormState = {
  status: "idle" | "error" | "success";
  message?: string;
  errors?: FieldErrors;
  /** Echo of what was sent, so fields keep their values after a server error. */
  values?: Record<string, string>;
  /** Extra data a successful action hands back to the form. */
  data?: Record<string, string | number>;
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
