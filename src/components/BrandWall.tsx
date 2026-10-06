import { tier1, restGroups } from "@/content/brands";
import { copy } from "@/content/copy";

/** The biggest names lead, then everything else grouped by category. Each brand appears once. */
export default function BrandWall() {
  return (
    <div>
      <div className="border-b border-ink/10 pb-10">
        <h3 className="font-body text-sm font-medium uppercase tracking-[0.18em] text-forest">{copy.work.tier1Heading}</h3>
        <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
          {tier1.map((b) => (
            <li key={b} className="font-display text-2xl font-extrabold uppercase tracking-wide text-ink md:text-4xl">
              {b}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-10 grid gap-10 md:grid-cols-2">
        {restGroups.map((g) => (
          <div key={g.category}>
            <h3 className="font-body text-sm font-medium uppercase tracking-[0.18em] text-forest">{g.category}</h3>
            <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
              {g.brands.map((b) => (
                <li key={b} className="font-display text-xl font-bold uppercase tracking-wide text-ink md:text-2xl">
                  {b}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
