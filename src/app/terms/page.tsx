import type { Metadata } from "next";
import { terms } from "@/content/legal";
import { pageMeta, descriptions } from "@/lib/seo";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = pageMeta("Terms", descriptions.terms, "/terms");

export default function TermsPage() {
  return <LegalPage {...terms} />;
}
