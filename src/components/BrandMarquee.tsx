import { tier1, restBrands } from "@/content/brands";
import { foldSubBrands } from "@/content/logos";
import { copy } from "@/content/copy";
import BrandMark from "./BrandMark";

function Row({ brands, reverse }: { brands: string[]; reverse?: boolean }) {
  const Track = ({ hidden }: { hidden?: boolean }) => (
    <ul
      aria-hidden={hidden || undefined}
      className={`flex shrink-0 items-center gap-12 pr-12 md:gap-16 md:pr-16 ${
        hidden ? "motion-reduce:hidden" : "motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-y-4 motion-reduce:px-4"
      }`}
    >
      {brands.map((b) => (
        <li key={b} className="flex items-center text-cream-50">
          <BrandMark brand={b} decorative={hidden} />
        </li>
      ))}
    </ul>
  );
  return (
    <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)] motion-reduce:[mask-image:none]">
      <div
        className={`marquee-track flex w-max ${reverse ? "animate-marquee-reverse" : "animate-marquee"} motion-reduce:w-full motion-reduce:animate-none`}
        // Scale duration with length so both rows drift at the same speed.
        style={{ animationDuration: `${brands.length * 3}s` }}
      >
        <Track />
        <Track hidden />
      </div>
    </div>
  );
}

/**
 * Every brand's official logo, two rows drifting in opposite directions. Row one is the biggest
 * names in order; row two is everyone else. Hover or tap a logo to see the name.
 */
export default function BrandMarquee() {
  return (
    <section aria-label={copy.logos.heading} className="grain border-b border-forest-800 pb-12 pt-4 sm:pb-16 sm:pt-6">
      <p className="kicker wrap mb-8 px-4 text-muted sm:px-6">{copy.logos.heading}</p>
      <div className="space-y-8 md:space-y-10">
        <Row brands={foldSubBrands(tier1)} />
        <Row brands={foldSubBrands(restBrands)} reverse />
      </div>
    </section>
  );
}
