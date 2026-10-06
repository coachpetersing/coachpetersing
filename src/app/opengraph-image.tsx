import { ImageResponse } from "next/og";
import fs from "node:fs";
import path from "node:path";
import { site } from "@/content/site";
import { stats } from "@/content/stats";

export const dynamic = "force-static";
export const alt = "Coach Peter Sing";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  // Pre-cropped 600x630 face crop of public/images/peter-headshot.jpg, read at build time.
  const photo = fs.readFileSync(path.join(process.cwd(), "src/app/og-headshot.jpg"));
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: site.colors.ink, color: "white", fontFamily: "sans-serif" }}>
        <div style={{ width: 600, height: 630, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 60 }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 22, letterSpacing: 5, color: site.colors.tan, textTransform: "uppercase" }}>
              Content Creator Coaching
            </div>
            <div style={{ fontSize: 68, fontWeight: 800, letterSpacing: -2, marginTop: 14, lineHeight: 1 }}>{site.name}</div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", rowGap: 28 }}>
            {stats.map((s) => (
              <div key={s.label} style={{ width: "50%", display: "flex", flexDirection: "column" }}>
                <div style={{ fontSize: 60, fontWeight: 800, color: site.colors.tan, lineHeight: 1 }}>{`${s.value}${s.suffix}`}</div>
                <div style={{ fontSize: 22, color: "rgba(255,255,255,0.75)", marginTop: 8 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
        <img src={photoSrc} width={600} height={630} style={{ width: 600, height: 630, objectFit: "cover" }} />
      </div>
    ),
    size,
  );
}
