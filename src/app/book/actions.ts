"use server";

import { z } from "zod";
import { formValues, type FormState } from "@/lib/schemas";
import { configured, findActiveMember } from "@/lib/stripe";
import { rateLimit, clientIp } from "@/lib/spam";
import { env } from "@/lib/env";
import { products } from "@/content/site";
import { copy } from "@/content/copy";

const schema = z.object({ email: z.string().trim().toLowerCase().email("Enter a valid email, like name@example.com.") });

/** Checks for an active monthly plan and hands back the member booking link. */
export async function lookupMember(_prev: FormState, fd: FormData): Promise<FormState> {
  const values = formValues(fd);
  if (values.company_website) return { status: "idle" };
  if (!rateLimit(`book:${await clientIp()}`, 20)) return { status: "error", message: "Too many tries. Wait a bit, or email contact@coachpetersing.com.", values };

  const parsed = schema.safeParse(values);
  if (!parsed.success) return { status: "error", message: "Check your email address.", errors: { email: parsed.error.issues[0]?.message ?? "" }, values };
  if (!configured()) return { status: "error", message: copy.book.notFound, errors: { email: copy.book.notFound }, values };

  try {
    const m = await findActiveMember(parsed.data.email);
    if (!m) return { status: "error", message: copy.book.notFound, errors: { email: copy.book.notFound }, values };
    return {
      status: "success",
      data: { url: env.calMemberUrl(), calls: products[m.product].callsPerMonth, email: m.customer.email ?? parsed.data.email, name: m.customer.name ?? "" },
    };
  } catch (err) {
    console.error("[book] Stripe lookup failed:", (err as Error).message);
    return { status: "error", message: "Something went wrong on my end. Try again in a minute, or email contact@coachpetersing.com.", values };
  }
}
