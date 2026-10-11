import type { Metadata } from "next";
import { copy } from "@/content/copy";
import { site } from "@/content/site";
import { pageMeta, descriptions } from "@/lib/seo";
import { env } from "@/lib/env";
import CancelButton from "./CancelButton";

export const metadata: Metadata = pageMeta("Cancel your plan", descriptions.cancel, "/cancel", { noindex: true });

export default function CancelPage() {
  const portal = env.portalLoginUrl() || `mailto:${site.email}?subject=Cancel%20my%20plan`;
  return (
    <section className="grain section pt-10">
      <div className="wrap max-w-[760px]">
        <h1 className="h1">{copy.cancel.h1}</h1>
        <p className="mt-6 text-lg text-cream-50/90">{copy.cancel.body}</p>
        <div className="mt-10">
          <CancelButton href={portal} label={copy.cancel.button} />
        </div>
        <p className="mt-8 text-sm text-muted">{copy.cancel.fine}</p>
      </div>
    </section>
  );
}
