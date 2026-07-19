import { ImageResponse } from "next/og";

import { getProgrammaticColorDescriptor } from "@/lib/seo/programmatic";
import { getContrastText } from "@/lib/color-utils";
import { siteConfig } from "@/lib/seo/site-config";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const descriptor = getProgrammaticColorDescriptor(slug);
  const hex = descriptor?.hex ?? "#4F46E5";
  const name = descriptor?.displayName ?? "Color";
  const textColor = getContrastText(hex) === "light" ? "#ffffff" : "#111111";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            width: 420,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: hex,
            color: textColor,
          }}
        >
          <div style={{ display: "flex", fontSize: 48, fontWeight: 700 }}>{name}</div>
          <div style={{ display: "flex", fontSize: 32, opacity: 0.85, marginTop: 12 }}>{hex.toUpperCase()}</div>
        </div>
        <div
          style={{
            flex: 1,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "72px",
            backgroundColor: "#160b05",
            backgroundImage:
              "radial-gradient(circle at 90% 0%, rgba(255,106,44,0.35), transparent 45%)",
          }}
        >
          <div style={{ display: "flex", fontSize: 36, fontWeight: 700, color: "#ffffff" }}>
            {siteConfig.name}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", fontSize: 52, fontWeight: 700, color: "#ffffff", lineHeight: 1.15 }}>
              {name} Color Guide
            </div>
            <div style={{ display: "flex", fontSize: 26, color: "rgba(255,255,255,0.6)" }}>
              Meaning, hex codes, contrast, and pairing ideas
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
