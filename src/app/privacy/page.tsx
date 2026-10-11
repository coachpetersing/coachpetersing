import type { Metadata } from "next";
import { privacy } from "@/content/legal";
import { pageMeta, descriptions } from "@/lib/seo";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = pageMeta("Privacy", descriptions.privacy, "/privacy");

export default function PrivacyPage() {
  return <LegalPage {...privacy} />;
}
