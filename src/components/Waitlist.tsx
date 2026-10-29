"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { joinWaitlist } from "@/app/waitlist/actions";
import { copy, fill } from "@/content/copy";
import { products, type ProductId } from "@/content/site";
import type { FormState } from "@/lib/schemas";
import { track } from "@/lib/track";

const field =
  "mt-2 block w-full rounded-xl border border-cream-200 bg-white px-4 py-3 font-body text-base text-ink transition-colors duration-150 focus:border-forest-600 focus:outline-none focus:ring-2 focus:ring-forest-600/40 aria-[invalid=true]:border-[#C2410C]";

/** The waitlist button on a price card. Opens a short form in place: email and one box. */
export default function Waitlist({ product }: { product: ProductId }) {
  const p = products[product];
  const [open, setOpen] = useState(false);
  const [state, action, pending] = useActionState<FormState, FormData>(joinWaitlist.bind(null, product), { status: "idle" });
  const emailRef = useRef<HTMLInputElement>(null);
  const doneRef = useRef<HTMLDivElement>(null);
  const w = copy.waitlist;
  const v = state.values ?? {};
  const err = state.errors ?? {};

  useEffect(() => {
    if (open) emailRef.current?.focus();
  }, [open]);
  useEffect(() => {
    if (state.status === "success") {
      track("waitlist_join", { product });
      doneRef.current?.focus();
    }
  }, [state, product]);

  if (state.status === "success") {
    return (
      <div ref={doneRef} tabIndex={-1} role="status" className="rounded-xl bg-forest-600/15 p-4 text-forest-600 focus:outline-none">
        <p className="font-semibold">{fill(w.done, { plan: p.name })}</p>
        {state.data?.copied ? <p className="mt-1 text-sm">{w.doneCopy}</p> : null}
      </div>
    );
  }

  if (!open) {
    return (
      <button type="button" className="btn-dark w-full" onClick={() => setOpen(true)} aria-expanded={false}>
        {p.cta}
        <span className="sr-only">: {p.name}</span>
      </button>
    );
  }

  const id = (k: string) => `w-${product}-${k}`;
  return (
    <form action={action} noValidate className="relative space-y-4">
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
        <label htmlFor={id("email")} className="block text-sm font-semibold text-ink">
          {w.email}
        </label>
        <input
          ref={emailRef}
          id={id("email")}
          name="email"
          type="email"
          required
          autoComplete="email"
          defaultValue={v.email}
          aria-invalid={Boolean(err.email)}
          aria-describedby={err.email ? id("email-e") : undefined}
          className={field}
        />
        {err.email && (
          <p id={id("email-e")} className="mt-1 text-sm font-medium text-[#C2410C]">
            {err.email}
          </p>
        )}
      </div>
      <div>
        <label htmlFor={id("message")} className="block text-sm font-semibold text-ink">
          {w.message}
        </label>
        <textarea
          id={id("message")}
          name="message"
          required
          rows={4}
          maxLength={2000}
          defaultValue={v.message}
          aria-invalid={Boolean(err.message)}
          aria-describedby={[id("message-h"), err.message ? id("message-e") : ""].filter(Boolean).join(" ")}
          className={`${field} resize-y`}
        />
        <p id={id("message-h")} className="mt-1 text-sm text-ink/70">
          {w.messageHint}
        </p>
        {err.message && (
          <p id={id("message-e")} className="mt-1 text-sm font-medium text-[#C2410C]">
            {err.message}
          </p>
        )}
      </div>
      <button type="submit" disabled={pending} aria-disabled={pending} className="btn-dark w-full disabled:cursor-wait disabled:opacity-70">
        {pending ? w.sending : w.submit}
      </button>
      <button type="button" onClick={() => setOpen(false)} className="link w-full text-center text-sm text-ink/80">
        {w.cancel}
      </button>
    </form>
  );
}
