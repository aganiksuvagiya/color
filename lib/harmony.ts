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
    case "complementary":
      colors = [
        make("Base Dark", "neutral", h, Math.min(s, 15), 8),
        make("Primary", "primary", h, s, l),
        make("Fresh", "success", (h + 150) % 360, 55, 48),
        make("Warm", "warning", (h + 60) % 360, 75, 58),
        make("Complement", "accent", (h + 180) % 360, s, l),
      ];
      break;
    case "analogous":
      colors = [
        make("Base Dark", "neutral", h, Math.min(s, 15), 8),
        make("Primary", "primary", h, s, l),
        make("Near Left", "success", (h - 30 + 360) % 360, s, l + 5),
        make("Near Right", "warning", (h + 30) % 360, s, l - 5),
        make("Far Right", "accent", (h + 60) % 360, s, l),
      ];
      break;
    case "triadic":
      colors = [
        make("Base Dark", "neutral", h, Math.min(s, 15), 8),
        make("Primary", "primary", h, s, l),
        make("Triad A", "success", (h + 120) % 360, s, l),
        make("Warm", "warning", (h + 60) % 360, 70, 58),
        make("Triad B", "accent", (h + 240) % 360, s, l),
      ];
      break;
    case "split-complementary":
      colors = [
        make("Base Dark", "neutral", h, Math.min(s, 15), 8),
        make("Primary", "primary", h, s, l),
        make("Split A", "success", (h + 150) % 360, s, l),
        make("Warm", "warning", (h + 60) % 360, 70, 58),
        make("Split B", "accent", (h + 210) % 360, s, l),
      ];
      break;
    case "tetradic":
      colors = [
        make("Base Dark", "neutral", h, Math.min(s, 15), 8),
        make("Primary", "primary", h, s, l),
        make("Tetrad A", "success", (h + 90) % 360, s, l),
        make("Tetrad B", "warning", (h + 180) % 360, s, l),
        make("Tetrad C", "accent", (h + 270) % 360, s, l),
      ];
      break;
    case "monochromatic":
      colors = [
        make("Darkest", "neutral", h, s, Math.max(8, l - 32)),
        make("Primary", "primary", h, s, l),
        make("Lighter", "success", h, Math.max(20, s - 15), Math.min(85, l + 15)),
        make("Muted", "warning", h, Math.max(10, s - 35), Math.max(20, l - 12)),
        make("Lightest", "accent", h, Math.max(15, s - 25), Math.min(92, l + 30)),
      ];
      break;
  }

  return { label: labels[mode], colors };
}
