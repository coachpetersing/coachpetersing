import Link from "next/link";
import { copy } from "@/content/copy";
import Reveal from "./Reveal";

export default function AudienceCards() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {copy.home.who.map((w, i) => (
        <Reveal key={w.title} delay={i * 0.08} className="h-full">
          <div className="flex h-full flex-col rounded-3xl bg-white p-7 md:p-9">
            <h3 className="font-display text-2xl font-extrabold tracking-tight text-ink md:text-3xl">{w.title}</h3>
            <p className="mt-4 flex-1 font-body text-base text-offblack md:text-lg">{w.body}</p>
            <Link
              href={w.href}
              className="mt-6 inline-block font-body text-base font-medium text-forest underline underline-offset-4 hover:text-ink"
            >
              {w.cta}
            </Link>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
