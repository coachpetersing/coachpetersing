import { faq } from "@/content/faq";

export default function FAQ({ items = faq }: { items?: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-ink/10 border-y border-ink/10">
      {items.map((item) => (
        <details key={item.q} className="group py-5">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 [&::-webkit-details-marker]:hidden">
            <h3 className="font-display text-xl font-bold tracking-tight text-ink md:text-2xl">{item.q}</h3>
            <span
              aria-hidden
              className="mt-1 shrink-0 font-body text-2xl font-light leading-none text-forest transition-transform group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="mt-3 max-w-2xl font-body text-base text-offblack md:text-lg">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
