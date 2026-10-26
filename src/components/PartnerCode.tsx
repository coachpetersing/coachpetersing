"use client";

import { useActionState, useEffect, useState } from "react";
import { applyCode, type CodeState } from "@/app/checkout/actions";
import { findPartner } from "@/content/partners";
import { copy, fill } from "@/content/copy";

export const PARTNER_EVENT = "partner-code";

export function readPartnerCode(): string | null {
  try {
    const m = document.cookie.match(/(?:^|;\s*)ref=([a-z0-9]+)/);
    return findPartner(m?.[1])?.code ?? null;
  } catch {
    return null;
  }
}

/** The one public piece of the partner program: a code box under the prices. */
export default function PartnerCode() {
  const [state, action, pending] = useActionState<CodeState, FormData>(applyCode, { status: "idle" });
  const [current, setCurrent] = useState<string | null>(null);

  useEffect(() => setCurrent(readPartnerCode()), []);
  useEffect(() => {
    if (state.status === "ok" || state.status === "removed") {
      setCurrent(state.status === "ok" ? (state.code ?? null) : null);
      window.dispatchEvent(new Event(PARTNER_EVENT));
    }
  }, [state]);

  const partner = findPartner(current);
  const t = copy.partner;

  return (
    <div className="mt-10 rounded-card border border-cream-200 bg-white/40 p-5 sm:p-6">
      <p className="font-medium">{t.line}</p>
      {partner ? (
        <form action={action} className="mt-3 flex flex-wrap items-center gap-3">
          <input type="hidden" name="remove" value="1" />
          <p className="text-forest-600">{fill(t.applied, { name: partner.name })}</p>
          <button type="submit" disabled={pending} className="link text-sm font-semibold">
            {t.remove}
          </button>
        </form>
      ) : (
        <form action={action} className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-end">
          <div className="flex-1 sm:max-w-xs">
            <label htmlFor="partner-code" className="sr-only">
              {t.label}
            </label>
            <input
              id="partner-code"
              name="code"
              type="text"
              inputMode="text"
              autoCapitalize="none"
              autoComplete="off"
              placeholder={t.placeholder}
              defaultValue={state.status === "unknown" ? state.code : ""}
              aria-invalid={state.status === "unknown"}
              className="block w-full rounded-xl border border-cream-200 bg-white px-4 py-3 font-body text-base text-ink placeholder:text-ink/40 focus:border-forest-600 focus:outline-none focus:ring-2 focus:ring-forest-600/40 aria-[invalid=true]:border-[#B4532A]"
            />
          </div>
          <button type="submit" disabled={pending} className="btn-dark min-h-[48px] px-6 disabled:opacity-70">
            {pending ? t.applying : t.apply}
          </button>
        </form>
      )}
      {state.status === "unknown" && <p className="mt-2 text-sm font-medium text-[#B4532A]">{t.unknown}</p>}
      <p className="mt-3 text-sm text-ink/70">{t.fine}</p>
    </div>
  );
}
