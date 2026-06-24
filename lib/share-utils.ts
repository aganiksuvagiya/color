import { getContrastText } from "./color-utils";
import type { Palette, PaletteColor, SemanticRole } from "./types";

const ROLES: SemanticRole[] = ["neutral", "primary", "success", "warning", "accent"];
const NAMES: Record<SemanticRole, string> = {
  neutral: "Neutral",
  primary: "Primary",
  success: "Success",
  warning: "Warning",
  accent: "Accent",
};

export function encodePalette(palette: Palette): string {
  const colors = palette.colors.map((c) => c.hex.slice(1)).join("-");
  const label = encodeURIComponent(palette.label);
  return `?label=${label}&c=${colors}`;
}

export function decodePalette(params: URLSearchParams): Palette | null {
  const colorsParam = params.get("c");
  const label = params.get("label") || "Shared palette";
  if (!colorsParam) return null;

  const hexes = colorsParam.split("-");
  if (hexes.length !== 5) return null;

  const colors: PaletteColor[] = hexes.map((h, i) => {
    const hex = `#${h}`;
    return {
      name: NAMES[ROLES[i]],
      hex,
      role: ROLES[i],
      text: getContrastText(hex),
    };
  });

  return { label: decodeURIComponent(label), colors };
}
