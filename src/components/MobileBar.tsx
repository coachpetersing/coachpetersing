"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { copy, fill } from "@/content/copy";
import { products } from "@/content/site";

// Only on the home page, and never over the printable card or the pages after checkout.
const SHOW_ON = ["/"];

/** Mobile only. Appears once the hero is out of view, hides while the footer or the prices are on screen. */
export default function MobileBar() {
  const pathname = usePathname();
  const [pastHero, setPastHero] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    const footer = document.querySelector("footer");
    const prices = document.getElementById("prices");
    const observers: IntersectionObserver[] = [];
    if (hero) {
      const io = new IntersectionObserver(([e]) => setPastHero(!e.isIntersecting && e.boundingClientRect.top < 0));
      io.observe(hero);
      observers.push(io);
    }
    const visible = new Set<Element>();
    for (const el of [footer, prices]) {
      if (!el) continue;
      const io = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) visible.add(e.target);
        else visible.delete(e.target);
        setHidden(visible.size > 0);
      });
      io.observe(el);
      observers.push(io);
    }
    return () => observers.forEach((o) => o.disconnect());
  }, [pathname]);

  if (!SHOW_ON.includes(pathname)) return null;
  const show = pastHero && !hidden;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-forest-800 bg-forest-950/95 px-4 pb-[calc(12px+env(safe-area-inset-bottom))] pt-3 backdrop-blur transition-transform duration-200 md:hidden ${
        show ? "translate-y-0" : "pointer-events-none translate-y-full"
      }`}
      aria-hidden={!show}
      inert={!show}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium">{fill(copy.mobileBar.text, { call: products.call.price })}</p>
        <a href="#prices" className="btn-primary min-h-[44px] shrink-0 px-5">
          {copy.mobileBar.cta}
        </a>
      </div>
    </div>
  );
}
