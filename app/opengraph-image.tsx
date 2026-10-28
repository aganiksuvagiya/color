import { ImageResponse } from "next/og";

import { OgFrame, OgSwatches, loadOgFonts, ogSize } from "@/components/seo/og-frame";
import { siteConfig } from "@/lib/seo/site-config";

// export const runtime = "edge";
export const alt = `${siteConfig.name} - Free color palette generator and color tools`;
export const size = ogSize;
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <OgFrame eyebrow="Free color palette generator">
        <div style={{ display: "flex", flexDirection: "column", marginTop: 18 }}>
          <div style={{ display: "flex", fontSize: 84, fontWeight: 700, letterSpacing: -3, lineHeight: 1.05 }}>
            Find colors that&nbsp;<span style={{ color: "#e8531f" }}>feel right.</span>
          </div>
          <div style={{ display: "flex", marginTop: 22, fontSize: 30, color: "rgba(28,23,18,0.6)" }}>
            Palettes, shades, converters and contrast checks in one place.
          </div>
        </div>
        <div style={{ display: "flex", marginTop: "auto" }}>
          <OgSwatches colors={["#264653", "#2A9D8F", "#E9C46A", "#F4A261", "#E76F51"]} height={120} />
        </div>
      </OgFrame>
    ),
    { ...size, fonts: await loadOgFonts() },
  );
}
