import { ImageResponse } from "next/og";
import { site } from "@/content/site";
import { stats } from "@/content/stats";

export const dynamic = "force-static";
export const alt = "Coach Peter Sing";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: site.colors.ink,
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 28, letterSpacing: 6, color: site.colors.tan, textTransform: "uppercase" }}>
            Content Creator Coaching
          </div>
          <div style={{ fontSize: 88, fontWeight: 800, letterSpacing: -3, marginTop: 16, lineHeight: 1 }}>
            {site.name}
          </div>
        </div>
        <div style={{ display: "flex", gap: 56 }}>
          {stats.map((s) => (
            <div key={s.label} style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 72, fontWeight: 800, color: site.colors.tan, lineHeight: 1 }}>
                {`${s.value}${s.suffix}`}
              </div>
              <div style={{ fontSize: 24, color: "rgba(255,255,255,0.7)", marginTop: 10 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
