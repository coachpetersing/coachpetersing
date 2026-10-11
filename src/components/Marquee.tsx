import { marqueeBrands } from "@/content/site";
import { copy } from "@/content/copy";

/**
 * The brand list is in the markup once, as a real list. The moving copy is drawn by a second,
 * aria-hidden list so the loop is seamless. With reduced motion the row stops and wraps.
 */
export default function Marquee() {
  const Item = ({ b }: { b: string }) => <li className="whitespace-nowrap text-xl font-semibold text-cream-50/85 sm:text-2xl">{b}</li>;
  return (
    <section aria-labelledby="marquee-label" className="grain border-y border-forest-800 py-10 sm:py-12">
      <p id="marquee-label" className="kicker wrap mb-6 px-4 text-muted sm:px-6">
        {copy.marquee.label}
      </p>
      <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)] motion-reduce:[mask-image:none]">
        <div className="marquee-track flex w-max animate-marquee motion-reduce:w-full motion-reduce:animate-none">
          <ul className="flex shrink-0 items-center gap-12 pr-12 motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-x-10 motion-reduce:gap-y-3 motion-reduce:px-4">
            {marqueeBrands.map((b) => (
              <Item key={b} b={b} />
            ))}
          </ul>
          <ul aria-hidden="true" className="flex shrink-0 items-center gap-12 pr-12 motion-reduce:hidden">
            {marqueeBrands.map((b) => (
              <Item key={b} b={b} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
