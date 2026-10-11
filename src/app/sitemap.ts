import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export const dynamic = "force-static";

// Member-only and utility pages (/welcome, /submit, /cancel, /unsubscribe) are noindex and left out.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { path: "", priority: 1, changeFrequency: "daily" as const },
    { path: "/tryouts", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/brands", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
  ].map((p) => ({ url: `${site.url}${p.path}`, lastModified: now, changeFrequency: p.changeFrequency, priority: p.priority }));
}
