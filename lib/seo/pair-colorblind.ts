import { SIMILAR_BELOW, colorBlindTypes, deltaE, simulateColorBlind, type ColorBlindType } from "@/lib/colorblind";
import type { ReadyPalette } from "./content";
import { getProgrammaticColorDescriptor } from "./programmatic";

// How a /color-combinations pair and the page's palettes look to people with full red-, green-
// or blue-blindness. Computed when the page is built, with the same simulation and "too close"
// line (ΔE under 20) as the colorblind simulator tool.

/** At or above this ΔE two colors are clearly different to people with normal color vision. */
export const CLEARLY_DIFFERENT = 40;

export type PairVisionRow = {
  key: ColorBlindType | "normal";
  label: string;
  desc: string;
  /** The two pair colors as seen with this vision type. */
  a: string;
  b: string;
  /** CIE76 ΔE between them, rounded. */
  difference: number;
  verdict: "reference" | "easy" | "closer" | "hard";
};

/** Two palette colors that are clearly different normally but run together for these vision types. */
export type PaletteVisionClash = { a: string; b: string; types: string[] };

export type PairColorBlindCheck = {
  a: { name: string; hex: string };
  b: { name: string; hex: string };
  rows: PairVisionRow[];
  palettes: { name: string; colors: string[]; clashes: PaletteVisionClash[] }[];
};

const upper = (hex: string) => hex.toUpperCase();

// Shades of one hue (two dark purples, say) are close for everyone, so only pairs that look
// clearly different with normal vision and collapse in a simulation are reported.
function paletteClashes(colors: string[]): PaletteVisionClash[] {
  const hexes = [...new Set(colors.map(upper))];
  const clashes: PaletteVisionClash[] = [];
  for (let i = 0; i < hexes.length; i++) {
    for (let j = i + 1; j < hexes.length; j++) {
      if (deltaE(hexes[i], hexes[j]) < CLEARLY_DIFFERENT) continue;
      const types = colorBlindTypes
        .filter(({ key }) => deltaE(simulateColorBlind(hexes[i], key), simulateColorBlind(hexes[j], key)) < SIMILAR_BELOW)
        .map(({ label }) => label);
      if (types.length) clashes.push({ a: hexes[i], b: hexes[j], types });
    }
  }
  return clashes;
}

export function getPairColorBlindCheck(slug: string, palettes: ReadyPalette[] = []): PairColorBlindCheck | undefined {
  const parts = slug.split("-and-");
  if (parts.length !== 2) return undefined;
  const [first, second] = parts.map((part) => getProgrammaticColorDescriptor(part));
  if (!first || !second) return undefined;

  const a = { name: first.displayName, hex: upper(first.hex) };
  const b = { name: second.displayName, hex: upper(second.hex) };
  const row = (key: PairVisionRow["key"], label: string, desc: string): PairVisionRow => {
    const simA = key === "normal" ? a.hex : upper(simulateColorBlind(a.hex, key));
    const simB = key === "normal" ? b.hex : upper(simulateColorBlind(b.hex, key));
    const difference = deltaE(simA, simB);
    const verdict =
      key === "normal" ? "reference" : difference < SIMILAR_BELOW ? "hard" : difference < CLEARLY_DIFFERENT ? "closer" : "easy";
    return { key, label, desc, a: simA, b: simB, difference: Math.round(difference), verdict };
  };

  return {
    a,
    b,
    rows: [row("normal", "Normal vision", "Full color vision"), ...colorBlindTypes.map((t) => row(t.key, t.label, t.desc))],
    palettes: palettes.map((palette) => ({ name: palette.name, colors: palette.colors, clashes: paletteClashes(palette.colors) })),
  };
}
