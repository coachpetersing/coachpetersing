import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export const dynamic = "force-static";

// Pages after checkout and utility pages (/welcome, /book, /cancel, /qr, /card, /r) are noindex and left out.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { path: "", priority: 1, changeFrequency: "weekly" as const },
    { path: "/brands", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
  ].map((p) => ({ url: `${site.url}${p.path}`, lastModified: now, changeFrequency: p.changeFrequency, priority: p.priority }));
}
