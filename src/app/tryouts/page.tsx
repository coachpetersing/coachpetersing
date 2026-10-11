import type { Metadata } from "next";
import { copy } from "@/content/copy";
import { pageMeta, descriptions } from "@/lib/seo";
import { env } from "@/lib/env";
import { getRoster } from "@/lib/roster";
import { heroStatus } from "@/lib/status";
import TryoutForm from "./TryoutForm";

export const metadata: Metadata = pageMeta("Try out", descriptions.tryouts, "/tryouts");

const planFromQuery: Record<string, string> = { notes: "Notes", coaching: "Coaching" };

export default async function TryoutsPage({ searchParams }: { searchParams: Promise<{ plan?: string }> }) {
  const { plan } = await searchParams;
  const roster = await getRoster();
  return (
    <section className="grain section pt-10">
      <div className="wrap max-w-[760px]">
        <h1 className="h1">{copy.tryouts.h1}</h1>
        <p className="mt-6 text-lg text-cream-50/90">{copy.tryouts.intro}</p>
        <p className="mt-4 flex items-center gap-2 text-sm font-medium">
          <span aria-hidden="true" className={`h-2 w-2 rounded-full ${roster.open > 0 ? "bg-tan-400" : "bg-muted"}`} />
          {heroStatus(roster)}
        </p>
        <div className="mt-12">
          <TryoutForm plan={planFromQuery[plan ?? ""] ?? ""} siteKey={env.turnstileSiteKey()} />
        </div>
      </div>
    </section>
  );
}
