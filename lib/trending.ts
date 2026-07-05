import { generateHarmony, type HarmonyMode } from "./harmony";
import { findClosestColorName } from "./color-names";
import { hslToHex } from "./color-utils";
import type { Palette } from "./types";

export type PaletteCategory = "saas" | "ecommerce" | "mobile" | "branding";

const CATEGORY_CONFIG: Record<PaletteCategory, { label: string; hueRanges: [number, number][] }> = {
  saas: { label: "SaaS", hueRanges: [[220, 260], [260, 300]] },
  ecommerce: { label: "Commerce", hueRanges: [[10, 40], [350, 380]] },
  mobile: { label: "Mobile", hueRanges: [[190, 230], [270, 320]] },
  branding: { label: "Brand", hueRanges: [[0, 30], [30, 60]] },
};

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
  const categories = Object.keys(CATEGORY_CONFIG) as PaletteCategory[];
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
