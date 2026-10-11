import Image from "next/image";
import type { CaseStudy } from "@/content/caseStudies";
import { copy } from "@/content/copy";

export default function CaseStudyCard({ c }: { c: CaseStudy }) {
  return (
    <article className="group flex flex-col">
      <a
        href={c.url}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block aspect-[9/16] overflow-hidden rounded-card border border-forest-800 bg-forest-900 transition-transform duration-200 group-hover:-translate-y-1 motion-reduce:group-hover:translate-y-0"
        tabIndex={-1}
        aria-hidden="true"
      >
        {c.poster ? (
          <Image src={c.poster} alt={c.alt} fill sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 50vw" className="object-cover" />
        ) : (
          <span className="absolute inset-x-4 bottom-4 font-display text-3xl font-extrabold uppercase">{c.brand}</span>
        )}
      </a>
      <p className="kicker mt-4 text-tan-400">{c.brand}</p>
      <h3 className="mt-1 text-lg font-semibold leading-snug">{c.title}</h3>
      <ul className="mt-2 space-y-1">
        {c.stats.map((s) => (
          <li key={s} className="font-display text-xl font-bold uppercase leading-tight tabular-nums sm:text-2xl">
            {s}
          </li>
        ))}
      </ul>
      <a href={c.url} target="_blank" rel="noopener noreferrer" className="link mt-3 text-sm font-medium text-cream-50/90">
        {copy.work.view}
        <span className="sr-only">: {c.brand} (opens in a new tab)</span>
      </a>
    </article>
  );
}
