"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { track, type EventName } from "@/lib/track";

/** Fires an analytics event the first time its children are at least half on screen. */
export default function ViewTracker({ event, children }: { event: EventName; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          track(event);
          io.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [event]);
  return <div ref={ref}>{children}</div>;
}
