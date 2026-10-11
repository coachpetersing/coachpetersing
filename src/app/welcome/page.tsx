import type { Metadata } from "next";
import Link from "next/link";
import { copy, fill } from "@/content/copy";
import { pageMeta, descriptions } from "@/lib/seo";
import { stripe } from "@/lib/stripe";
import { env } from "@/lib/env";
import IntakeForm from "./IntakeForm";

export const metadata: Metadata = pageMeta("Welcome", descriptions.welcome, "/welcome", { noindex: true });
export const dynamic = "force-dynamic";

async function sessionDetails(id?: string) {
  if (!id || !/^cs_[A-Za-z0-9_]+$/.test(id)) return null;
  try {
    const s = await stripe().checkout.sessions.retrieve(id);
    if (s.status !== "complete") return null;
    const name = s.customer_details?.name ?? "";
    return { name, first: name.split(" ")[0] ?? "", email: s.customer_details?.email ?? "", plan: s.metadata?.plan };
  } catch (err) {
    console.error("[welcome] session lookup failed:", (err as Error).message);
    return null;
  }
}

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <li className="grid gap-4 border-t border-forest-800 pt-10 md:grid-cols-[96px_1fr]">
      <span aria-hidden="true" className="font-display text-[72px] font-extrabold leading-none text-tan-400">
        {n}
      </span>
      <div>
        <h2 className="font-display text-4xl font-extrabold uppercase leading-none">{title}</h2>
        <div className="mt-6">{children}</div>
      </div>
    </li>
  );
}

export default async function WelcomePage({ searchParams }: { searchParams: Promise<{ plan?: string; session_id?: string }> }) {
  const q = await searchParams;
  const session = await sessionDetails(q.session_id);
  const planParam = session?.plan ?? q.plan;
  const plan: "notes" | "coaching" = planParam === "coaching" ? "coaching" : "notes";
  const calUrl = env.calCoachingUrl();

  return (
    <section className="grain section pt-10">
      <div className="wrap max-w-[880px]">
        <h1 className="h1">{session?.first ? fill(copy.welcome.h1Named, { name: session.first }) : copy.welcome.h1}</h1>
        <p className="mt-6 text-xl text-cream-50/90">{copy.welcome.sub}</p>

        <ol className="mt-14 space-y-14">
          <Step n={1} title={copy.welcome.step1}>
            <IntakeForm name={session?.name ?? ""} email={session?.email ?? ""} plan={plan} />
          </Step>

          <Step n={2} title={copy.welcome.step2}>
            <p className="text-cream-50/90">{copy.welcome.step2Body}</p>
            <Link href="/submit" className="btn-primary mt-6 min-h-[56px] px-8 text-lg">
              {copy.welcome.step2Button} →
            </Link>
          </Step>

          {plan === "coaching" && (
            <Step n={3} title={copy.welcome.step3}>
              {calUrl ? (
                <>
                  <iframe
                    src={`${calUrl}${calUrl.includes("?") ? "&" : "?"}embed=true&theme=dark`}
                    title="Book your first Coaching call"
                    className="h-[720px] w-full rounded-card border border-forest-800 bg-forest-900"
                    loading="lazy"
                  />
                  <a href={calUrl} target="_blank" rel="noopener noreferrer" className="link mt-4 inline-block text-sm">
                    {copy.welcome.step3Fallback}
                  </a>
                </>
              ) : (
                <p className="text-muted">I&apos;ll email you a link to book your first call.</p>
              )}
            </Step>
          )}
        </ol>

        <p className="mt-16 rounded-card border border-forest-800 p-6 text-cream-50/90">{copy.welcome.footer}</p>
      </div>
    </section>
  );
}
