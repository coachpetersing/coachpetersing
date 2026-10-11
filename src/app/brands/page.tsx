import type { Metadata } from "next";
import { copy } from "@/content/copy";
import { site } from "@/content/site";
import { caseStudies, repeatLine } from "@/content/caseStudies";
import { pageMeta, descriptions } from "@/lib/seo";
import CaseStudyCard from "@/components/CaseStudyCard";

export const metadata: Metadata = pageMeta("Brands and agencies", descriptions.brands, "/brands");

export default function BrandsPage() {
  return (
    <section className="grain section pt-10">
      <div className="wrap">
        <h1 className="h1 max-w-[14ch]">{copy.brands.h1}</h1>
        <p className="mt-6 max-w-[60ch] text-lg text-cream-50/90">{copy.brands.body}</p>
        <h2 className="h2 mt-14">{copy.work.h2}</h2>
        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-6">
          {caseStudies.map((c) => (
            <CaseStudyCard key={c.url} c={c} />
          ))}
        </div>
        <p className="mt-10 text-lg text-cream-50/90">{repeatLine}</p>
        <a href={`mailto:${site.email}?subject=Brand%20inquiry`} className="btn-primary mt-10">
          {copy.brands.cta}
        </a>
      </div>
    </section>
  );
}
