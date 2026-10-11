import type { Metadata } from "next";
import { copy } from "@/content/copy";
import { pageMeta, descriptions } from "@/lib/seo";
import SubmitForm from "./SubmitForm";

export const metadata: Metadata = pageMeta("Send your work", descriptions.submit, "/submit", { noindex: true });

export default function SubmitPage() {
  return (
    <section className="grain section pt-10">
      <div className="wrap max-w-[760px]">
        <h1 className="h1">{copy.submit.h1}</h1>
        <p className="mt-6 text-lg text-cream-50/90">{copy.submit.intro}</p>
        <div className="mt-12">
          <SubmitForm />
        </div>
      </div>
    </section>
  );
}
