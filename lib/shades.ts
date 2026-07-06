import { hexToHsl, hslToHex, getContrastText } from "./color-utils";
import type { Palette, PaletteColor, SemanticRole } from "./types";

export type Shade = { label: string; hex: string; text: "light" | "dark" };

const TINT_STEPS = [95, 85, 70, 55, 40, 25, 12];

export function generateShades(hex: string): Shade[] {
  const { h, s } = hexToHsl(hex);
  return TINT_STEPS.map((l) => {
    const shadeHex = hslToHex(h, s, l);
    return { label: `${l}`, hex: shadeHex, text: getContrastText(shadeHex) };
  });
}

export function shiftLightness(hex: string, delta: number): string {
  const { h, s, l } = hexToHsl(hex);
  const next = Math.max(4, Math.min(96, l + delta));
  return hslToHex(h, s, next);
}

const EXTRA_SOURCES: { role: SemanticRole; suffix: string; delta: number }[] = [
  { role: "primary", suffix: "Light", delta: 18 },
  { role: "accent", suffix: "Light", delta: 18 },
  { role: "primary", suffix: "Dark", delta: -18 },
  { role: "accent", suffix: "Dark", delta: -18 },
  { role: "neutral", suffix: "Mid", delta: 25 },
];

export function withExtraColors(palette: Palette, count: number): Palette {
  if (count <= 0) return palette;
  const base = palette.colors;
  const extras: PaletteColor[] = [];
  for (let i = 0; i < count && i < EXTRA_SOURCES.length; i++) {
    const sourceConfig = EXTRA_SOURCES[i];
    const source = base.find((c) => c.role === sourceConfig.role) ?? base[0];
    const hex = shiftLightness(source.hex, sourceConfig.delta);
    extras.push({ name: `${source.name} ${sourceConfig.suffix}`, hex, role: sourceConfig.role, text: getContrastText(hex) });
  }
  return { ...palette, colors: [...base, ...extras] };
}
