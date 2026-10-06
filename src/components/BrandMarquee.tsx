import { tier1, restBrands } from "@/content/brands";

function Row({ brands, reverse }: { brands: string[]; reverse?: boolean }) {
  const Track = ({ hidden }: { hidden?: boolean }) => (
    <ul
      aria-hidden={hidden || undefined}
      className={`flex shrink-0 items-center gap-10 pr-10 md:gap-14 md:pr-14 ${
        hidden ? "motion-reduce:hidden" : "motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-y-4"
      }`}
    >
      {brands.map((b) => (
        <li
          key={b}
          className="whitespace-nowrap font-display text-2xl font-bold uppercase tracking-wide text-cream/90 md:text-4xl"
        >
          {b}
        </li>
      ))}
    </ul>
  );
  return (
    <div className="overflow-hidden">
      <div
        className={`flex w-max ${reverse ? "animate-marquee-reverse" : "animate-marquee"} motion-reduce:w-full motion-reduce:animate-none`}
        // Scale duration with length so both rows drift at the same speed.
        style={{ animationDuration: `${brands.length * 3}s` }}
      >
        <Track />
        <Track hidden />
      </div>
    </div>
  );
}

/** Row one is the tier1 list in order. Row two is every other brand, in category order. */
export default function BrandMarquee({ heading }: { heading: string }) {
  return (
    <section className="bg-ink py-16 text-white md:py-24" aria-label={heading}>
      <h2 className="mx-auto mb-10 w-full max-w-site px-5 font-body text-sm font-medium uppercase tracking-[0.18em] text-tan md:px-8">
        {heading}
      </h2>
      <div className="space-y-6 md:space-y-8">
        <Row brands={tier1} />
        <Row brands={restBrands} reverse />
      </div>
    </section>
  );
}
