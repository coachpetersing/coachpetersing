import { ImageResponse } from "next/og";
import { products } from "@/content/site";

export const dynamic = "force-static";
export const alt = "Peter Sing, content coaching";
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
          <div style={{ fontSize: 24, letterSpacing: 4, color: "#C8A97E" }}>CONTENT COACHING</div>
          <div style={{ fontSize: 80, fontWeight: 800, lineHeight: 1, letterSpacing: -2, marginTop: 18, textTransform: "uppercase", maxWidth: 1000 }}>
            Your videos aren&apos;t bad. They&apos;re forgettable.
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 28 }}>
          <div style={{ width: 16, height: 16, borderRadius: 8, background: "#C8A97E" }} />
          <div>{`Book an hour, $${products.call.price}. Bring what isn't working. Leave with a plan.`}</div>
        </div>
      </div>
    ),
    size,
  );
}
