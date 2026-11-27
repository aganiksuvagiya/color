import { ImageResponse } from "next/og";

import { OgFrame, OgSwatches, loadOgFonts, ogAccent, ogSize } from "@/components/seo/og-frame";
import { getPaletteSheetSlugs, getPaletteSheetSource } from "@/lib/seo/palette-sheets";

export const alt = "Color combination palettes with hex codes on HueFlow";
export const size = ogSize;
export const contentType = "image/png";

// Prerendered at build time like the industry images; unknown slugs 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return getPaletteSheetSlugs("colorCombinations").map((slug) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const source = getPaletteSheetSource("colorCombinations", slug);
  // "Do Green and Purple Go Together? 4 Palettes" has no colon; split on it only when present.
  const [headline, subline] = (source?.title ?? "Color Combinations").split(": ");
  const palettes = source?.palettes.slice(0, 3) ?? [];

  return new ImageResponse(
    (
      <OgFrame eyebrow="Color combinations">
        <div style={{ display: "flex", marginTop: 16, fontSize: 58, fontWeight: 700, letterSpacing: -2, lineHeight: 1.08 }}>{headline}</div>
        {subline && <div style={{ display: "flex", marginTop: 12, fontSize: 34, fontWeight: 700, color: ogAccent }}>{subline}</div>}
        <div style={{ display: "flex", marginTop: "auto", gap: 24 }}>
          {palettes.map((palette) => (
            <div key={palette.name} style={{ display: "flex", flexDirection: "column", flex: 1 }}>
              <OgSwatches colors={palette.colors} height={104} />
              <div style={{ display: "flex", marginTop: 12, fontSize: 21, fontWeight: 400, color: "rgba(28,23,18,0.7)" }}>{palette.name}</div>
            </div>
          ))}
        </div>
      </OgFrame>
    ),
    { ...size, fonts: await loadOgFonts() },
  );
}
