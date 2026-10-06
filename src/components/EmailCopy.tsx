"use client";

import { useState } from "react";
import { site } from "@/content/site";
import { copy } from "@/content/copy";

export default function EmailCopy() {
  const [done, setDone] = useState(false);
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setDone(true);
      setTimeout(() => setDone(false), 1800);
    } catch {
      /* clipboard blocked; the mailto link still works */
    }
  };
  return (
    <div className="flex flex-wrap items-baseline gap-x-5 gap-y-3">
      <a
        href={`mailto:${site.email}`}
        className="break-all font-display text-3xl font-extrabold tracking-tight text-ink underline decoration-tan decoration-4 underline-offset-8 hover:text-forest sm:text-4xl md:text-6xl"
      >
        {site.email}
      </a>
      <button
        type="button"
        onClick={onCopy}
        className="rounded-full border border-ink/20 px-4 py-2 font-body text-base text-ink transition-colors hover:border-ink"
        aria-live="polite"
      >
        {done ? copy.contact.copied : copy.contact.copyEmail}
      </button>
    </div>
  );
}
