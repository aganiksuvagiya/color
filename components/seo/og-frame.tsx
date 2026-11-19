import type { ReactNode } from "react";

import { siteConfig } from "@/lib/seo/site-config";

// Shared 1200x630 frame for the share images (next/og), in the site's light design:
// white page, near-black wordmark, orange eyebrow. Satori needs `display: "flex"` on
// every element with more than one child.

export const ogSize = { width: 1200, height: 630 };
export const ogInk = "#1c1712";
export const ogAccent = "#c2410c";

async function loadInter(weight: 400 | 700) {
  // Google Fonts serves TrueType (which Satori can read) to a plain fetch with no browser user agent.
  const css = await (await fetch(`https://fonts.googleapis.com/css2?family=Inter:wght@${weight}`)).text();
  const url = /src: url\((.+?)\) format\('(?:opentype|truetype)'\)/.exec(css)?.[1];
  if (!url) throw new Error(`No TrueType Inter ${weight} in the Google Fonts response`);
  return { name: "Inter", data: await (await fetch(url)).arrayBuffer(), weight, style: "normal" as const };
}

/**
 * Inter regular + bold (the site's fallback font; its first choice, Avenir Next, is a system
 * font). The images are prerendered, so this runs at build time; if the fetch fails they fall
 * back to the default next/og font instead of failing the build.
 */
export async function loadOgFonts() {
  try {
    return await Promise.all([loadInter(400), loadInter(700)]);
  } catch {
    return [];
  }
}

export function OgFrame({ eyebrow, children }: { eyebrow: string; children: ReactNode }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "56px 72px 60px",
        backgroundColor: "#ffffff",
        color: ogInk,
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", fontSize: 36, fontWeight: 700, letterSpacing: -1 }}>{siteConfig.name}</div>
        <div style={{ display: "flex", fontSize: 22, color: "rgba(28,23,18,0.5)" }}>{siteConfig.domain.replace("https://", "")}</div>
      </div>
      <div style={{ display: "flex", marginTop: 44, fontSize: 18, fontWeight: 700, letterSpacing: 4, color: ogAccent, textTransform: "uppercase" }}>
        {eyebrow}
      </div>
      {children}
    </div>
  );
}

/** A rounded strip of swatches, like the palette strips on the site. */
export function OgSwatches({ colors, height }: { colors: string[]; height: number }) {
  return (
    <div style={{ display: "flex", width: "100%", height, borderRadius: 20, overflow: "hidden", border: "1px solid rgba(28,23,18,0.08)" }}>
      {colors.map((hex, i) => (
        <div key={`${hex}-${i}`} style={{ display: "flex", flex: 1, backgroundColor: hex }} />
      ))}
    </div>
  );
}
