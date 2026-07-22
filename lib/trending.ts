import { generateHarmony, type HarmonyMode } from "./harmony";
import { findClosestColorName } from "./color-names";
import { getContrastText, hslToHex } from "./color-utils";
import type { Palette, PaletteColor } from "./types";

export type PaletteCategory = "saas" | "ecommerce" | "mobile" | "branding" | "2026";

const CATEGORY_CONFIG: Record<Exclude<PaletteCategory, "2026">, { label: string; hueRanges: [number, number][] }> = {
  saas: { label: "SaaS", hueRanges: [[220, 260], [260, 300]] },
  ecommerce: { label: "Commerce", hueRanges: [[10, 40], [350, 380]] },
  mobile: { label: "Mobile", hueRanges: [[190, 230], [270, 320]] },
  branding: { label: "Brand", hueRanges: [[0, 30], [30, 60]] },
};

function makeColor(name: string, role: PaletteColor["role"], hex: string): PaletteColor {
  return { name, hex, role, text: getContrastText(hex) };
}

// Hand-curated, not procedurally generated: reflects real 2026 color-trend reporting
// (Pantone Color of the Year "Cloud Dancer", tech-inspired futuristic tones, nostalgic
// soft shades, and AI-inspired holographic pastels), not exact licensed Pantone hex specs.
export function getCuratedTrendPalettes(): (Palette & { category: PaletteCategory })[] {
  return [
    {
      label: "Cloud Dancer Neutral",
      category: "2026",
      colors: [
        makeColor("Cloud Dancer", "neutral", "#F0ECE4"),
        makeColor("Warm Stone", "primary", "#C9BEB0"),
        makeColor("Soft Clay", "accent", "#D8A98F"),
        makeColor("Muted Sage", "success", "#A9B79E"),
        makeColor("Charcoal Ink", "warning", "#39352F"),
      ],
    },
    {
      label: "Futuristic Tech",
      category: "2026",
      colors: [
        makeColor("Deep Space", "neutral", "#0E1024"),
        makeColor("Electric Indigo", "primary", "#5B3DF5"),
        makeColor("Holographic Cyan", "accent", "#4FE8E0"),
        makeColor("Signal Lime", "success", "#B6FF5C"),
        makeColor("Magenta Pulse", "warning", "#F23DA0"),
      ],
    },
    {
      label: "Nostalgic Pastel",
      category: "2026",
      colors: [
        makeColor("Vintage Cream", "neutral", "#F5EADB"),
        makeColor("Faded Denim", "primary", "#8FA6C4"),
        makeColor("Dusty Rose", "accent", "#E3A9A0"),
        makeColor("Sun-bleached Yellow", "success", "#EBD08A"),
        makeColor("Terracotta", "warning", "#C2694A"),
      ],
    },
  ];
}

const HARMONY_MODES: HarmonyMode[] = ["complementary", "analogous", "triadic", "split-complementary"];

function mulberry32(seed: number) {
  let state = seed;
  return function random() {
    state |= 0;
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function dayIndex(): number {
  return Math.floor(Date.now() / 86400000);
}

export function generateTrendingPalettes(seed: number = dayIndex(), perCategory = 2): (Palette & { category: PaletteCategory })[] {
  const random = mulberry32(seed);
  const categories = Object.keys(CATEGORY_CONFIG) as Exclude<PaletteCategory, "2026">[];
  const result: (Palette & { category: PaletteCategory })[] = [];

  for (const category of categories) {
    const { label, hueRanges } = CATEGORY_CONFIG[category];
    for (let i = 0; i < perCategory; i++) {
      const [min, max] = hueRanges[i % hueRanges.length];
      const hue = (min + random() * (max - min)) % 360;
      // Keep saturation/lightness in a band that stays vivid instead of drifting
      // toward muddy grays, which is the main failure mode of free-rolled HSL.
      const saturation = 60 + random() * 28;
      const lightness = 42 + random() * 16;
      const baseHex = hslToHex(hue, saturation, lightness);
      const mode = HARMONY_MODES[Math.floor(random() * HARMONY_MODES.length)];

      const palette = generateHarmony(baseHex, mode);
      const primary = palette.colors.find((c) => c.role === "primary") ?? palette.colors[0];
      const colorName = findClosestColorName(primary.hex);

      result.push({ ...palette, label: `${colorName} ${label}`, category });
    }
  }

  return result;
}
