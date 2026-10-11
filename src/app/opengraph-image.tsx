import { ImageResponse } from "next/og";
import { getRoster } from "@/lib/roster";
import { heroStatus } from "@/lib/status";

export const revalidate = 3600;
export const alt = "Peter Sing coaching roster";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const roster = await getRoster();
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0E1A12",
          color: "#F6F0E4",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: 18 }}>
          <div style={{ fontSize: 44, fontWeight: 800, letterSpacing: -1 }}>PETER SING</div>
          <div style={{ fontSize: 22, letterSpacing: 4, color: "#C8A97E" }}>COACHING</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 24, letterSpacing: 4, color: "#C8A97E" }}>COACHING ROSTER · 15 SPOTS</div>
          <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1, letterSpacing: -2, marginTop: 18, textTransform: "uppercase", maxWidth: 1000 }}>
            Notes on your content from someone who makes it for a living.
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 28 }}>
          <div style={{ width: 16, height: 16, borderRadius: 8, background: roster.open > 0 ? "#C8A97E" : "#A7B3A3" }} />
          <div>{heroStatus(roster)}</div>
        </div>
      </div>
    ),
    size,
  );
}
