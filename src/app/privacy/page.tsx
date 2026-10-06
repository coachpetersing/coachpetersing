import type { Metadata } from "next";
import { copy } from "@/content/copy";
import { pageMeta, descriptions } from "@/lib/seo";
import Section from "@/components/Section";

export const metadata: Metadata = pageMeta(copy.privacy.title, descriptions.privacy, "/privacy");

export default function PrivacyPage() {
  const c = copy.privacy;
  return (
    <Section>
      <h1 className="font-display text-5xl font-extrabold tracking-tight text-ink md:text-7xl">{c.heading}</h1>
      <p className="mt-3 font-body text-base text-offblack/60">{c.updated}</p>
      <div className="mt-10 max-w-2xl space-y-6">
        {c.body.map((p, i) => (
          <p key={i} className="font-body text-lg text-offblack">
            {p}
          </p>
        ))}
      </div>
    </Section>
  );
}
