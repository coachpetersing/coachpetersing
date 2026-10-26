import type { Metadata } from "next";
import { copy, fill } from "@/content/copy";
import { products } from "@/content/site";
import { pageMeta, descriptions } from "@/lib/seo";
import { configured, sessionSummary } from "@/lib/stripe";
import { env } from "@/lib/env";
import CalEmbed from "@/components/CalEmbed";

export const metadata: Metadata = pageMeta("Thanks", descriptions.welcome, "/welcome", { noindex: true });
export const dynamic = "force-dynamic";

async function lookup(id?: string) {
  if (!id || !/^cs_[A-Za-z0-9_]+$/.test(id) || !configured()) return null;
  try {
    return await sessionSummary(id);
  } catch (err) {
    console.error("[welcome] session lookup failed:", (err as Error).message);
    return null;
  }
}

export default async function WelcomePage({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) {
  const q = await searchParams;
  const s = await lookup(q.session_id);
  const w = copy.welcome;

  if (!s || !s.product || !s.paid) {
    return (
      <section className="grain section pt-10">
        <div className="wrap max-w-[880px]">
          <h1 className="h1">{w.plainH1}</h1>
          <p className="mt-6 text-xl text-cream-50/90">{w.plainSub}</p>
        </div>
      </section>
    );
  }

  const named = (plain: string, withName: string) => (s.first ? fill(withName, { name: s.first }) : plain);

  if (s.product === "call") {
    return (
      <section className="grain section pt-10">
        <div className="wrap max-w-[880px]">
          <h1 className="h1">{named(w.callH1, w.callH1Named)}</h1>
          <p className="mt-6 text-xl text-cream-50/90">{w.callSub}</p>
          <div className="mt-12">
            <CalEmbed url={env.calCallUrl()} title="Book your call" email={s.email} name={s.name} />
          </div>
        </div>
      </section>
    );
  }

  const p = products[s.product];
  return (
    <section className="grain section pt-10">
      <div className="wrap max-w-[880px]">
        <h1 className="h1">{named(w.planH1, w.planH1Named)}</h1>
        <p className="mt-6 text-xl text-cream-50/90">{w.planSub}</p>
        <p className="mt-4 text-cream-50/80">{fill(copy.book.note, { calls: p.callsPerMonth })}</p>
        <div className="mt-12">
          <CalEmbed url={env.calMemberUrl()} title="Book a call" email={s.email} name={s.name} />
        </div>
        <p className="mt-12 rounded-card border border-forest-800 p-6 text-cream-50/90">{w.planNote}</p>
      </div>
    </section>
  );
}
