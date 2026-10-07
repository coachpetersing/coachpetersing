import Link from "next/link";
import Section from "@/components/Section";

export default function NotFound() {
  return (
    <Section className="min-h-[60vh]">
      <h1 className="font-display text-6xl font-extrabold tracking-tight text-ink md:text-9xl">Page not found</h1>
      <p className="mt-6 font-body text-xl text-offblack">Sorry, that page doesn&apos;t exist.</p>
      <Link href="/" className="mt-10 inline-block font-body text-lg font-medium text-forest underline underline-offset-4 hover:text-ink">
        Back home
      </Link>
    </Section>
  );
}
