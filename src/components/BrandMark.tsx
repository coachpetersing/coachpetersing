"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { logos } from "@/content/logos";

/**
 * One brand in the marquee or brand wall.
 *
 * With a logo: a single-color mask in the current text color (cream on dark, ink on light),
 * about 22px tall on phones and 28px from md up, scaled optically so wordmarks and symbols
 * balance. The brand name sits in the same grid cell, so the slot is as wide as whichever is
 * wider and nothing shifts. Hover (mouse), keyboard focus, or a tap swaps the logo for the
 * name with a 200ms crossfade; tapping again or tapping elsewhere swaps back. Reduced motion
 * makes the swap instant (see globals.css). The swap styles live in globals.css under .brand-slot.
 *
 * Without a logo: the same text wordmark, always visible.
 *
 * `decorative` is for the marquee's duplicate track, which is hidden from assistive tech and
 * must not take keyboard focus.
 */
export default function BrandMark({ brand, decorative = false }: { brand: string; decorative?: boolean }) {
  const logo = logos[brand];
  const ref = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(false);

  // While a tap has the name showing, a tap anywhere else swaps back to the logo.
  useEffect(() => {
    if (!active) return;
    const onDown = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setActive(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [active]);

  const name = (
    <span className="brand-name whitespace-nowrap font-display text-[17px] font-bold uppercase leading-none tracking-wide md:text-[21px]">
      {brand}
    </span>
  );

  if (!logo) {
    return <span className="brand-slot inline-flex items-center">{name}</span>;
  }

  // Optical balance: square marks get taller, long wordmarks shorter, within limits.
  const optical = Math.min(1.35, Math.max(0.78, Math.pow(logo.ratio / 2.5, -0.3))) * (logo.scale ?? 1);
  const url = `url(/logos/${logo.file})`;
  const maskStyle = {
    "--logo-k": optical,
    aspectRatio: String(logo.ratio),
    backgroundColor: "currentColor",
    maskImage: url,
    WebkitMaskImage: url,
    maskRepeat: "no-repeat",
    WebkitMaskRepeat: "no-repeat",
    maskPosition: "center",
    WebkitMaskPosition: "center",
    maskSize: "contain",
    WebkitMaskSize: "contain",
  } as CSSProperties;

  return (
    <span
      ref={ref}
      className="brand-slot brand-swap inline-grid cursor-default place-items-center outline-offset-4 [grid-template-areas:'cell']"
      data-active={active || undefined}
      tabIndex={decorative ? -1 : 0}
      role="img"
      aria-label={brand}
      title={brand}
      onPointerUp={(e) => {
        if (e.pointerType !== "mouse") setActive((a) => !a);
      }}
      onBlur={() => setActive(false)}
    >
      <span
        aria-hidden
        className="brand-logo inline-block h-[calc(22px*var(--logo-k))] [grid-area:cell] md:h-[calc(28px*var(--logo-k))]"
        style={maskStyle}
      />
      <span aria-hidden className="[grid-area:cell]">
        {name}
      </span>
    </span>
  );
}
