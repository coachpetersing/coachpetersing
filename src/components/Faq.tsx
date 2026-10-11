"use client";

import { faq } from "@/content/faq";
import { track } from "@/lib/track";

/** Native <details> disclosure: keyboard and screen reader support for free. */
export default function Faq() {
  return (
    <div className="divide-y divide-cream-200 border-y border-cream-200">
      {faq.map((f) => (
        <details
          key={f.q}
          className="group"
          onToggle={(e) => {
            if ((e.currentTarget as HTMLDetailsElement).open) track("faq_open", { question: f.q });
          }}
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-semibold text-ink [&::-webkit-details-marker]:hidden">
            <span>{f.q}</span>
            <span
              aria-hidden="true"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ink/25 text-xl leading-none transition-transform duration-200 group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="max-w-3xl pb-6 pr-12 text-ink/85">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
