import { ImageResponse } from "next/og";

import { OgFrame, loadOgFonts, ogInk, ogSize } from "@/components/seo/og-frame";
import { getContrastRatio } from "@/lib/accessibility";
import { formatHsl, formatRgb, parseHex } from "@/lib/color-convert";
import { getIndexableColorPageSlugs } from "@/lib/seo/content";
import { getProgrammaticColorDescriptor } from "@/lib/seo/programmatic";

export const alt = "Color codes on HueFlow";
export const size = ogSize;
export const contentType = "image/png";

// One image per indexable color page (its meaning page shares it), prerendered at build time.
// Other slugs 404 instead of being drawn on the Worker; their pages use the site image.
export const dynamicParams = false;

export function generateStaticParams() {
  return getIndexableColorPageSlugs()
    .filter((slug) => getProgrammaticColorDescriptor(slug))
    .map((slug) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const descriptor = getProgrammaticColorDescriptor(slug);
  const hex = (descriptor?.hex ?? "#C2410C").toUpperCase();
  const name = descriptor?.displayName ?? "Color";
  const rgb = parseHex(hex);
  const onWhite = getContrastRatio(hex, "#FFFFFF");
  const onBlack = getContrastRatio(hex, "#000000");
  const ink = onWhite >= getContrastRatio(hex, ogInk) ? "#FFFFFF" : ogInk;
  const rows = [
    ["HEX", hex],
    ["RGB", rgb ? formatRgb(rgb) : ""],
    ["HSL", rgb ? formatHsl(rgb) : ""],
    ["Contrast", `${onWhite}:1 on white · ${onBlack}:1 on black`],
  ];

  return new ImageResponse(
    (
      <OgFrame eyebrow="Color codes">
        <div style={{ display: "flex", marginTop: 28, gap: 44, flex: 1 }}>
          <div
            style={{ display: "flex", width: 380, borderRadius: 24, alignItems: "flex-end", padding: 28, backgroundColor: hex, color: ink, border: "1px solid rgba(28,23,18,0.08)", fontSize: 34, fontWeight: 700 }}
          >
            {hex}
          </div>
          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <div style={{ display: "flex", fontSize: 64, fontWeight: 700, letterSpacing: -2, lineHeight: 1.05 }}>{name}</div>
            <div style={{ display: "flex", flexDirection: "column", marginTop: "auto", gap: 14 }}>
              {rows.map(([label, value]) => (
                <div key={label} style={{ display: "flex", fontSize: 26 }}>
                  <div style={{ display: "flex", width: 150, fontWeight: 700 }}>{label}</div>
                  <div style={{ display: "flex", color: "rgba(28,23,18,0.7)" }}>{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </OgFrame>
    ),
    { ...size, fonts: await loadOgFonts() },
  );
}
