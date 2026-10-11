"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { copy, fill } from "@/content/copy";
import TryoutLink from "./TryoutLink";

// No tryout prompt on the tryout form itself or on member pages.
const HIDDEN_ON = ["/tryouts", "/welcome", "/submit", "/cancel", "/unsubscribe"];

/** Mobile only. Appears once the hero is out of view, hides while the footer is on screen. */
export default function MobileBar({ open, size }: { open: number; size: number }) {
  const pathname = usePathname();
  const [pastHero, setPastHero] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    const footer = document.querySelector("footer");
    const observers: IntersectionObserver[] = [];
    if (hero) {
      const io = new IntersectionObserver(([e]) => setPastHero(!e.isIntersecting && e.boundingClientRect.top < 0));
      io.observe(hero);
      observers.push(io);
    } else {
      const onScroll = () => setPastHero(window.scrollY > 400);
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      observers.push({ disconnect: () => window.removeEventListener("scroll", onScroll) } as IntersectionObserver);
    }
    if (footer) {
      const io = new IntersectionObserver(([e]) => setFooterVisible(e.isIntersecting));
      io.observe(footer);
      observers.push(io);
    }
    return () => observers.forEach((o) => o.disconnect());
  }, [pathname]);

  if (HIDDEN_ON.some((p) => pathname.startsWith(p))) return null;
  const show = pastHero && !footerVisible;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-forest-800 bg-forest-950/95 px-4 pb-[calc(12px+env(safe-area-inset-bottom))] pt-3 backdrop-blur transition-transform duration-200 md:hidden ${
        show ? "translate-y-0" : "pointer-events-none translate-y-full"
      }`}
      aria-hidden={!show}
      inert={!show}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium">{open > 0 ? fill(copy.mobileBar.open, { open, size }) : copy.mobileBar.full}</p>
        <TryoutLink location="mobile_bar" className="btn-primary min-h-[44px] shrink-0 px-5">
          {copy.mobileBar.cta}
        </TryoutLink>
      </div>
    </div>
  );
}
