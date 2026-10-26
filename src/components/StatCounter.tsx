"use client";

import { useEffect, useRef, useState } from "react";

/** Counts up once when it scrolls into view. Renders the final value first, and stays there with reduced motion or no JS. */
export default function StatCounter({ value, decimals, suffix, label }: { value: number; decimals: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const fmt = (n: number) => n.toFixed(decimals);
  const [display, setDisplay] = useState(fmt(value));

  useEffect(() => {
    const el = ref.current;
    // Counting 0 to 1 looks broken ("0B+"), so small numbers just show.
    if (!el || (value < 10 && decimals === 0) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - t0) / 1200);
          setDisplay(fmt((1 - Math.pow(1 - p, 3)) * value));
          if (p < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div ref={ref}>
      {/* Screen readers get the final number, not every frame of the count. */}
      <p className="sr-only">
        {fmt(value)}
        {suffix} {label}
      </p>
      <div aria-hidden="true">
        <p className="font-display text-[48px] font-extrabold leading-none tabular-nums text-tan-400 sm:text-[60px] xl:text-[72px]">
          {display}
          {suffix}
        </p>
        <p className="mt-2 text-sm font-medium uppercase tracking-[0.12em] text-muted sm:text-base sm:normal-case sm:tracking-normal">{label}</p>
      </div>
    </div>
  );
}
