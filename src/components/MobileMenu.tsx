"use client";

import { useRef } from "react";
import Link from "next/link";
import { nav } from "@/content/site";
import { copy } from "@/content/copy";

/** A details element so the menu works with JavaScript off. With JS it closes after a tap. */
export default function MobileMenu() {
  const ref = useRef<HTMLDetailsElement>(null);
  const close = () => ref.current?.removeAttribute("open");
  return (
    <details ref={ref} className="relative md:hidden">
      <summary className="cursor-pointer list-none rounded-full border border-white/40 px-4 py-2 font-body text-base [&::-webkit-details-marker]:hidden">
        {copy.nav.menu}
      </summary>
      <ul className="absolute right-0 mt-3 w-56 rounded-2xl border border-white/10 bg-ink p-3 shadow-2xl">
        {nav.map((item) => (
          <li key={item.href}>
            <Link href={item.href} onClick={close} className="block rounded-xl px-4 py-3 font-body text-lg hover:bg-white/10">
              {item.label}
            </Link>
          </li>
        ))}
        <li>
          <Link href="/contact" onClick={close} className="mt-2 block rounded-xl bg-tan px-4 py-3 text-center font-body text-lg font-medium text-ink">
            {copy.nav.cta}
          </Link>
        </li>
      </ul>
    </details>
  );
}
