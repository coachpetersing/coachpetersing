import { tier1, restGroups } from "@/content/brands";
import { foldSubBrands } from "@/content/logos";
import { copy } from "@/content/copy";
import BrandMark from "./BrandMark";

/** The biggest names lead, then everything else grouped by category. Each brand appears once. */
export default function BrandWall() {
  const groups = restGroups
    .map((g) => ({ ...g, brands: foldSubBrands(g.brands) }))
    .filter((g) => g.brands.length > 0);
  return (
    <div className="text-ink">
      <div className="border-b border-ink/10 pb-12">
        <h3 className="font-body text-sm font-medium uppercase tracking-[0.18em] text-forest">{copy.work.tier1Heading}</h3>
        <ul className="mt-6 flex flex-wrap items-center gap-x-12 gap-y-8">
          {foldSubBrands(tier1).map((b) => (
            <li key={b} className="flex items-center">
              <BrandMark brand={b} />
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-12 grid gap-12 md:grid-cols-2">
        {groups.map((g) => (
          <div key={g.category}>
            <h3 className="font-body text-sm font-medium uppercase tracking-[0.18em] text-forest">{g.category}</h3>
            <ul className="mt-6 flex flex-wrap items-center gap-x-10 gap-y-6">
              {g.brands.map((b) => (
                <li key={b} className="flex items-center">
                  <BrandMark brand={b} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="mt-14 max-w-2xl font-body text-sm text-offblack/70">{copy.work.trademarkNote}</p>
    </div>
  );
}
