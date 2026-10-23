import { ImageResponse } from "next/og";

import { OgFrame, OgSwatches, loadOgFonts, ogAccent, ogSize } from "@/components/seo/og-frame";
import { findEntry, getCollection } from "@/lib/seo/content";

// export const runtime = "edge";
export const alt = "Industry color palettes with hex codes on HueFlow";
export const size = ogSize;
export const contentType = "image/png";

// Prerender one image per industry page at build time instead of drawing it per request;
// unknown slugs 404 rather than rendering (and fetching fonts) on the Worker.
export const dynamicParams = false;

export function generateStaticParams() {
  return getCollection("bestColorsFor").map((entry) => ({ slug: entry.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = findEntry("bestColorsFor", slug);
  // "Best Colors for Healthcare Websites: 8 Medical Color Palettes" -> headline + orange subline.
  const [headline, subline] = (entry?.title ?? "Best Colors by Industry").split(": ");
  const palettes = entry?.palettes?.slice(0, 3) ?? [];

  return new ImageResponse(
    (
      <OgFrame eyebrow="Colors by industry">
        <div style={{ display: "flex", marginTop: 16, fontSize: 58, fontWeight: 700, letterSpacing: -2, lineHeight: 1.08 }}>{headline}</div>
        {subline && <div style={{ display: "flex", marginTop: 12, fontSize: 34, fontWeight: 700, color: ogAccent }}>{subline}</div>}
        <div style={{ display: "flex", marginTop: "auto", gap: 24 }}>
          {palettes.length > 0 ? (
            palettes.map((palette) => (
              <div key={palette.name} style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                <OgSwatches colors={palette.colors} height={104} />
                <div style={{ display: "flex", marginTop: 12, fontSize: 21, fontWeight: 400, color: "rgba(28,23,18,0.7)" }}>{palette.name}</div>
              </div>
            ))
          ) : (
            <OgSwatches colors={entry?.paletteColors ?? ["#264653", "#2A9D8F", "#E9C46A", "#F4A261", "#E76F51"]} height={120} />
          )}
        </div>
      </OgFrame>
    ),
    { ...size, fonts: await loadOgFonts() },
  );
}
