import type { CSSProperties } from "react";
import { logos } from "@/content/logos";

/**
 * One brand in the marquee or brand wall. With a logo: a single-color mask in the current text
 * color (cream on dark, ink on light), about 22px tall on phones and 28px from md up, scaled
 * optically so wide wordmarks and square symbols look balanced. Without one: a text wordmark
 * sized to sit at the same visual height.
 */
export default function BrandMark({ brand }: { brand: string }) {
  const logo = logos[brand];
  const base = "opacity-75 transition-opacity duration-200 hover:opacity-100";

  if (!logo) {
    return (
      <span className={`${base} whitespace-nowrap font-display text-[17px] font-bold uppercase leading-none tracking-wide md:text-[21px]`}>
        {brand}
      </span>
    );
  }

  // Optical balance: square marks get taller, long wordmarks shorter, within limits.
  const optical = Math.min(1.35, Math.max(0.78, Math.pow(logo.ratio / 2.5, -0.3))) * (logo.scale ?? 1);
  const url = `url(/logos/${logo.file})`;
  const style = {
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
      role="img"
      aria-label={brand}
      title={brand}
      className={`${base} inline-block h-[calc(22px*var(--logo-k))] shrink-0 md:h-[calc(28px*var(--logo-k))]`}
      style={style}
    />
  );
}
