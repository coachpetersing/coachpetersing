import type { Metadata } from "next";
import Link from "next/link";
import { copy } from "@/content/copy";
import { pageMeta, descriptions } from "@/lib/seo";
import Section from "@/components/Section";
import SocialLinks from "@/components/SocialLinks";

export const metadata: Metadata = { ...pageMeta(copy.thanks.title, descriptions.thanks, "/thanks"), robots: { index: false } };

export default function ThanksPage() {
  const c = copy.thanks;
  return (
    <Section className="min-h-[60vh]">
      <h1 className="font-display text-6xl font-extrabold tracking-tight text-ink md:text-9xl">{c.heading}</h1>
      <p className="mt-6 font-body text-xl text-offblack md:text-2xl">{c.body}</p>
      <Link href="/" className="mt-10 inline-block font-body text-lg font-medium text-forest underline underline-offset-4 hover:text-ink">
        {c.back}
      </Link>
      <SocialLinks dark={false} className="mt-14" />
    </Section>
  );
}
