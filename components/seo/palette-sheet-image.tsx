import { ImageResponse } from "next/og";

import { getContrastRatio } from "@/lib/accessibility";
import type { ReadyPalette } from "@/lib/seo/content";
import { loadOgFonts, ogAccent, ogInk } from "@/components/seo/og-frame";
import { siteConfig } from "@/lib/seo/site-config";

// A tall image of every palette on a page, each swatch labeled with its hex code. It's shown
// on industry and color-combination pages for people to save or pin, and gives image search
// something to index. 2:3 is the shape Pinterest shows best. Prerendered at build time.

export const paletteSheetSize = { width: 1000, height: 1500 };

// Same rule as the swatch labels on the pages: whichever of white or near-black reads better.
function labelInk(hex: string) {
  return getContrastRatio("#FFFFFF", hex) >= getContrastRatio(ogInk, hex) ? "#FFFFFF" : ogInk;
}

/** "Best Colors for Travel Websites: 6 Travel & Tourism Palettes" -> headline + subline. */
function splitTitle(title: string) {
  const [headline, ...rest] = title.split(": ");
  return { headline, subline: rest.join(": ") };
}

export async function renderPaletteSheet({
  eyebrow,
  title,
  palettes,
  path,
}: {
  eyebrow: string;
  title: string;
  palettes: ReadyPalette[];
  path: string;
}) {
  const { headline, subline } = splitTitle(title);
  const shown = palettes.slice(0, 6);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "52px 56px 44px",
          backgroundColor: "#ffffff",
          color: ogInk,
          fontFamily: "Inter, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", fontSize: 34, fontWeight: 700, letterSpacing: -1 }}>{siteConfig.name}</div>
          <div style={{ display: "flex", fontSize: 17, fontWeight: 700, letterSpacing: 3, color: ogAccent, textTransform: "uppercase" }}>{eyebrow}</div>
        </div>
        <div style={{ display: "flex", marginTop: 34, fontSize: 50, fontWeight: 700, letterSpacing: -1.5, lineHeight: 1.08 }}>{headline}</div>
        {subline && <div style={{ display: "flex", marginTop: 10, fontSize: 28, fontWeight: 700, color: ogAccent }}>{subline}</div>}

        <div style={{ display: "flex", flexDirection: "column", flex: 1, marginTop: 34, gap: 22 }}>
          {shown.map((palette) => (
            <div key={palette.name} style={{ display: "flex", flexDirection: "column", flex: 1 }}>
              <div style={{ display: "flex", fontSize: 24, fontWeight: 700 }}>{palette.name}</div>
              <div style={{ display: "flex", flex: 1, marginTop: 8, borderRadius: 16, overflow: "hidden", border: "1px solid rgba(28,23,18,0.08)" }}>
                {palette.colors.map((hex, i) => (
                  <div
                    key={`${hex}-${i}`}
                    style={{ display: "flex", flex: 1, alignItems: "flex-end", padding: "0 12px 10px", backgroundColor: hex, color: labelInk(hex), fontSize: 17, fontWeight: 700, letterSpacing: 0.5 }}
                  >
                    {hex.toUpperCase()}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", marginTop: 26, fontSize: 19, color: "rgba(28,23,18,0.6)" }}>
          {`${siteConfig.domain.replace("https://", "")}${path}`}
        </div>
      </div>
    ),
    { ...paletteSheetSize, fonts: await loadOgFonts() },
  );
}
