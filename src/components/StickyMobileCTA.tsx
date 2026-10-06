"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { copy } from "@/content/copy";
import { site } from "@/content/site";

export default function StickyMobileCTA() {
  const [show, setShow] = useState(false);
  const path = usePathname();

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) {
      setShow(true);
      return;
    }
    const io = new IntersectionObserver(([e]) => setShow(!e.isIntersecting), { threshold: 0.1 });
    io.observe(hero);
    return () => io.disconnect();
  }, [path]);

  if (path === "/contact" || path === "/thanks") return null;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 p-3 transition-transform duration-300 lg:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <a
        href={site.workWithMeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-full items-center justify-center rounded-full bg-tan px-6 py-4 font-body text-lg font-medium text-ink shadow-xl"
      >
        {copy.nav.cta}
      </a>
    </div>
  );
}
