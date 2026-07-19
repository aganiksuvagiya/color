import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/seo/site-config";

export const runtime = "edge";
export const alt = `${siteConfig.name} — Colors, Palettes, Gradients, and Brand Color Strategy`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          backgroundColor: "#160b05",
          backgroundImage:
            "radial-gradient(circle at 10% 0%, rgba(0,0,0,0.95), transparent 30%), radial-gradient(circle at 90% 100%, rgba(255,106,44,0.35), transparent 45%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 40, fontWeight: 700, color: "#ffffff" }}>
          {siteConfig.name}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", fontSize: 64, fontWeight: 700, color: "#ffffff", lineHeight: 1.15, maxWidth: 920 }}>
            Colors, Palettes, Gradients, and Brand Color Strategy
          </div>
          <div style={{ display: "flex", fontSize: 28, color: "rgba(255,255,255,0.6)", maxWidth: 880 }}>
            {siteConfig.description}
          </div>
        </div>

        <div style={{ display: "flex", gap: 16 }}>
          {["#4F46E5", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"].map((hex) => (
            <div key={hex} style={{ display: "flex", width: 88, height: 88, borderRadius: 16, backgroundColor: hex }} />
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
