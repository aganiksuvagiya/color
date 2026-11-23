import { getContrastText, hexToHsl, hslToHex } from "./color-utils";
import type { Palette, PaletteColor } from "./types";

export type HarmonyMode = "complementary" | "analogous" | "triadic" | "split-complementary" | "tetradic" | "monochromatic";

function make(name: string, role: PaletteColor["role"], h: number, s: number, l: number): PaletteColor {
  const hex = hslToHex(((h % 360) + 360) % 360, Math.max(0, Math.min(100, s)), Math.max(0, Math.min(100, l)));
  return { name, hex, role, text: getContrastText(hex) };
}

export function generateHarmony(baseHex: string, mode: HarmonyMode): Palette {
  const { h, s, l } = hexToHsl(baseHex);

  const labels: Record<HarmonyMode, string> = {
    complementary: "Complementary harmony",
    analogous: "Analogous harmony",
    triadic: "Triadic harmony",
    "split-complementary": "Split-complementary harmony",
    tetradic: "Tetradic harmony",
    monochromatic: "Monochromatic harmony",
  };

  let colors: PaletteColor[];

  switch (mode) {
    case "complementary": {
      // Two hues only: h and h+180. Fill 5 slots with shades of each.
      const c = (h + 180) % 360;
      colors = [
        make("Primary Dark",    "neutral", h, s,                    Math.max(8,  l - 28)),
        make("Primary",         "primary", h, s,                    l),
        make("Primary Tint",    "success", h, Math.max(15, s - 20), Math.min(88, l + 22)),
        make("Complement",      "warning", c, s,                    l),
        make("Complement Tint", "accent",  c, Math.max(15, s - 20), Math.min(88, l + 22)),
      ];
      break;
    }
    case "analogous": {
      // Five adjacent hues spanning ±60° around base
      colors = [
        make("Far Left",   "neutral", (h - 60 + 360) % 360, s, l),
        make("Near Left",  "primary", (h - 30 + 360) % 360, s, Math.min(88, l + 5)),
        make("Base",       "success", h,                     s, l),
        make("Near Right", "warning", (h + 30) % 360,        s, Math.max(12, l - 5)),
        make("Far Right",  "accent",  (h + 60) % 360,        s, l),
      ];
      break;
    }
    case "triadic": {
      // Three hues exactly 120° apart; add a tint of each to fill 5 slots
      const t1 = (h + 120) % 360;
      const t2 = (h + 240) % 360;
      colors = [
        make("Primary",      "neutral", h,  s,                    l),
        make("Primary Tint", "primary", h,  Math.max(15, s - 18), Math.min(88, l + 20)),
        make("Triad A",      "success", t1, s,                    l),
        make("Triad A Tint", "warning", t1, Math.max(15, s - 18), Math.min(88, l + 20)),
        make("Triad B",      "accent",  t2, s,                    l),
      ];
      break;
    }
    case "split-complementary": {
      // Base + two colors flanking its complement (h+150 and h+210)
      const s1 = (h + 150) % 360;
      const s2 = (h + 210) % 360;
      colors = [
        make("Primary",       "neutral", h,  s,                    l),
        make("Primary Tint",  "primary", h,  Math.max(15, s - 18), Math.min(88, l + 22)),
        make("Split A",       "success", s1, s,                    l),
        make("Split B",       "warning", s2, s,                    l),
        make("Split B Tint",  "accent",  s2, Math.max(15, s - 18), Math.min(88, l + 22)),
      ];
      break;
    }
    case "tetradic": {
      // Four hues exactly 90° apart — all four kept, drop the dark filler
      colors = [
        make("Primary",  "neutral", h,               s, l),
        make("Tetrad A", "primary", (h + 90)  % 360, s, l),
        make("Tetrad B", "success", (h + 180) % 360, s, l),
        make("Tetrad C", "warning", (h + 270) % 360, s, l),
        make("Tint",     "accent",  h,               Math.max(15, s - 20), Math.min(88, l + 24)),
      ];
      break;
    }
    case "monochromatic": {
      // Single hue, five lightness steps — saturation held constant
      colors = [
        make("Darkest",  "neutral", h, s, Math.max(8,  l - 32)),
        make("Dark",     "primary", h, s, Math.max(20, l - 16)),
        make("Base",     "success", h, s, l),
        make("Light",    "warning", h, s, Math.min(82, l + 16)),
        make("Lightest", "accent",  h, s, Math.min(92, l + 32)),
      ];
      break;
    }
  }

  return { label: labels[mode], colors };
}
