"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { copy } from "@/content/copy";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenu(false), [pathname]);

  // Full-screen menu: lock scroll, close on Escape, keep focus inside.
  useEffect(() => {
    if (!menu) return;
    document.body.style.overflow = "hidden";
    const first = menuRef.current?.querySelector<HTMLElement>("a, button");
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenu(false);
        toggleRef.current?.focus();
      }
      if (e.key === "Tab" && menuRef.current) {
        const items = [toggleRef.current, ...Array.from(menuRef.current.querySelectorAll<HTMLElement>("a, button"))].filter(Boolean) as HTMLElement[];
        const i = items.indexOf(document.activeElement as HTMLElement);
        if (e.shiftKey && i <= 0) {
          e.preventDefault();
          items[items.length - 1].focus();
        } else if (!e.shiftKey && i === items.length - 1) {
          e.preventDefault();
          items[0].focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [menu]);

  const solid = scrolled || menu;

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-200 print:hidden ${
        solid ? "border-forest-800 bg-forest-950" : "border-transparent bg-forest-950/0"
      }`}
    >
      <div className="wrap flex h-[72px] items-center justify-between gap-3 px-4 sm:px-6">
        <Link href="/" className="flex shrink-0 items-baseline gap-2" aria-label="Peter Sing Coaching, home">
          <span className="font-display text-[28px] font-extrabold uppercase leading-none tracking-tight">Peter Sing</span>
          <span className="kicker hidden text-tan-400 min-[400px]:inline">Coaching</span>
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-7 text-base font-medium">
            {copy.nav.links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-cream-50/90 transition-colors hover:text-tan-400">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link href="/#prices" className="btn-primary min-h-[44px] px-5">
            {copy.nav.cta}
          </Link>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-forest-800 lg:hidden"
            aria-expanded={menu}
            aria-controls="mobile-menu"
            aria-label={menu ? copy.nav.close : copy.nav.menu}
            onClick={() => setMenu((m) => !m)}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {menu ? <path d="M4 4l12 12M16 4L4 16" /> : <path d="M3 6h14M3 14h14" />}
            </svg>
          </button>
        </div>
      </div>

      {menu && (
        <div
          id="mobile-menu"
          ref={menuRef}
          className="grain fixed inset-x-0 bottom-0 top-[72px] z-40 overflow-y-auto bg-forest-950 px-4 pb-10 pt-6 sm:px-6 lg:hidden"
        >
          <nav aria-label="Main">
            <ul className="space-y-1">
              {copy.nav.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setMenu(false)}
                    className="block py-3 font-display text-5xl font-extrabold uppercase leading-none tracking-tight hover:text-tan-400"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
