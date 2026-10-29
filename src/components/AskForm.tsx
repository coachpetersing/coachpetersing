"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { askQuestion } from "@/app/contact/actions";
import { copy } from "@/content/copy";
import type { FormState } from "@/lib/schemas";
import { track } from "@/lib/track";

const field =
  "mt-2 block w-full rounded-xl border border-cream-200 bg-white px-4 py-3 font-body text-base text-ink transition-colors duration-150 focus:border-forest-600 focus:outline-none focus:ring-2 focus:ring-forest-600/40 aria-[invalid=true]:border-[#C2410C]";

/** "Ask me a question": a button that opens email + one box in place. For light (cream) sections. */
export default function AskForm() {
  const [open, setOpen] = useState(false);
  const [state, action, pending] = useActionState<FormState, FormData>(askQuestion, { status: "idle" });
  const emailRef = useRef<HTMLInputElement>(null);
  const doneRef = useRef<HTMLDivElement>(null);
  const a = copy.ask;
  const v = state.values ?? {};
  const err = state.errors ?? {};

  useEffect(() => {
    if (open) emailRef.current?.focus();
  }, [open]);
  useEffect(() => {
    if (state.status === "success") {
      track("question_sent");
      doneRef.current?.focus();
    }
  }, [state]);

  if (state.status === "success") {
    return (
      <div ref={doneRef} tabIndex={-1} role="status" className="max-w-xl rounded-xl bg-forest-600/15 p-4 font-semibold text-forest-600 focus:outline-none">
        {a.done}
      </div>
    );
  }

  if (!open) {
    return (
      <button type="button" className="btn-dark" onClick={() => setOpen(true)} aria-expanded={false}>
        {a.button}
      </button>
    );
  }

  return (
    <form action={action} noValidate className="relative max-w-xl space-y-4">
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Leave this empty
          <input type="text" name="company_website" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>
      {state.status === "error" && !Object.keys(err).length && (
        <p role="alert" className="text-sm font-medium text-[#C2410C]">
          {state.message}
        </p>
      )}
      <div>
        <label htmlFor="ask-email" className="block text-sm font-semibold text-ink">
          {a.email}
        </label>
        <input
          ref={emailRef}
          id="ask-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          defaultValue={v.email}
          aria-invalid={Boolean(err.email)}
          aria-describedby={err.email ? "ask-email-e" : undefined}
          className={field}
        />
        {err.email && (
          <p id="ask-email-e" className="mt-1 text-sm font-medium text-[#C2410C]">
            {err.email}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="ask-message" className="block text-sm font-semibold text-ink">
          {a.message}
        </label>
        <textarea
          id="ask-message"
          name="message"
          required
          rows={4}
          maxLength={2000}
          defaultValue={v.message}
          aria-invalid={Boolean(err.message)}
          aria-describedby={err.message ? "ask-message-e" : undefined}
          className={`${field} resize-y`}
        />
        {err.message && (
          <p id="ask-message-e" className="mt-1 text-sm font-medium text-[#C2410C]">
            {err.message}
          </p>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" disabled={pending} aria-disabled={pending} className="btn-dark disabled:cursor-wait disabled:opacity-70">
          {pending ? a.sending : a.submit}
        </button>
        <button type="button" onClick={() => setOpen(false)} className="link text-sm text-ink/80">
          {a.cancel}
        </button>
      </div>
    </form>
  );
}
