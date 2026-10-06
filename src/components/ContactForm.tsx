"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/content/site";
import { copy } from "@/content/copy";

const field =
  "w-full rounded-2xl border border-ink/20 bg-white px-5 py-4 font-body text-base text-offblack outline-none focus:border-forest";

/**
 * Posts to Formspree with fetch and shows the result inline. The form also has a real
 * action and method, so it still submits with JavaScript off.
 */
export default function ContactForm({ formId }: { formId: string }) {
  const c = copy.contact;
  const endpoint = `https://formspree.io/f/${formId}`;
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <p role="status" className="rounded-2xl bg-white px-6 py-8 font-display text-2xl font-bold tracking-tight text-ink md:text-3xl">
        {c.success}
      </p>
    );
  }

  return (
    <form action={endpoint} method="POST" onSubmit={onSubmit} className="grid gap-5">
      <input type="hidden" name="_subject" value="New note from coachpetersing.com" />
      {/* Honeypot. Real people never see or fill this; Formspree drops anything that does. */}
      <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 font-body text-base font-medium text-ink">
          {c.fields.name}
          <input className={field} type="text" name="name" required autoComplete="name" />
        </label>
        <label className="grid gap-2 font-body text-base font-medium text-ink">
          {c.fields.email}
          <input className={field} type="email" name="email" required autoComplete="email" />
        </label>
      </div>

      <label className="grid gap-2 font-body text-base font-medium text-ink">
        {c.fields.role}
        <select className={field} name="role" defaultValue="">
          <option value="" disabled>
            {c.pickOne}
          </option>
          {c.roles.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </label>

      <label className="grid gap-2 font-body text-base font-medium text-ink">
        {c.fields.message}
        <textarea className={field} name="message" rows={6} required />
      </label>

      {status === "error" && (
        <p role="alert" className="font-body text-base text-offblack">
          {c.errorBefore}{" "}
          <a href={`mailto:${site.email}`} className="font-medium text-forest underline underline-offset-4 hover:text-ink">
            {site.email}
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="justify-self-start rounded-full bg-ink px-8 py-4 font-body text-lg font-medium text-white transition-colors hover:bg-forest disabled:opacity-60"
      >
        {status === "sending" ? c.sending : c.fields.submit}
      </button>
    </form>
  );
}
