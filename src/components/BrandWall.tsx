import { tier1, restGroups } from "@/content/brands";
import { foldSubBrands } from "@/content/logos";
import BrandMark from "./BrandMark";

/** Every brand once: the biggest names first, then the rest grouped by category. */
export default function BrandWall() {
  const groups = restGroups.map((g) => ({ ...g, brands: foldSubBrands(g.brands) })).filter((g) => g.brands.length > 0);
  return (
    <div className="text-cream-50">
      <ul className="flex flex-wrap items-center gap-x-12 gap-y-8 border-b border-forest-800 pb-12">
        {foldSubBrands(tier1).map((b) => (
          <li key={b} className="flex items-center">
            <BrandMark brand={b} />
          </li>
        ))}
      </ul>
      <div className="mt-12 grid gap-12 md:grid-cols-2">
        {groups.map((g) => (
          <div key={g.category}>
            <h3 className="kicker text-muted">{g.category}</h3>
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
      <p className="mt-12 max-w-2xl text-sm text-muted">Logos belong to their owners and mean I made content for them, not that they endorse this site.</p>
    </div>
  );
}
