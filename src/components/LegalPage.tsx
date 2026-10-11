type Section = { h: string; p: string[] };

export default function LegalPage({ title, updated, intro, sections }: { title: string; updated: string; intro?: string; sections: Section[] }) {
  return (
    <section className="on-cream section bg-cream-50 pt-12 text-ink">
      <div className="wrap max-w-[760px]">
        <h1 className="h1">{title}</h1>
        <p className="mt-4 text-sm text-ink/80">{updated}</p>
        {intro && <p className="mt-8 text-lg">{intro}</p>}
        <div className="mt-10 space-y-10">
          {sections.map((s) => (
            <section key={s.h} aria-labelledby={`s-${s.h}`}>
              <h2 id={`s-${s.h}`} className="font-display text-3xl font-extrabold uppercase leading-none">
                {s.h}
              </h2>
              <div className="mt-4 space-y-4">
                {s.p.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
