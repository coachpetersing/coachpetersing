"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Fades content in when it scrolls into view. The hidden state only applies once
 * the inline script in layout.tsx adds `js` to <html>, so with JavaScript off everything is visible.
 */
export default function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("is-in");
          io.disconnect();
        }
      },
      { rootMargin: "-60px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} data-reveal className={className} style={{ transitionDelay: `${delay}s` }}>
      {children}
    </div>
  );
}
