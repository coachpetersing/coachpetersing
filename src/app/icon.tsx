import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const dynamic = "force-static";
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: site.colors.ink,
          color: site.colors.tan,
          fontSize: 36,
          fontWeight: 800,
          fontFamily: "sans-serif",
          borderRadius: 14,
        }}
      >
        PS
      </div>
    ),
    size,
  );
}
