import { brandGroups } from "@/content/brands";

export default function BrandWall() {
  return (
    <div className="grid gap-10 md:grid-cols-2">
      {brandGroups.map((g) => (
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
  );
}
