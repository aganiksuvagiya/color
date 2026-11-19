// Color mixing models for the color mixing chart: paint (RYB), light (RGB) and print (CMYK).
// Pure functions with no imports besides the converter, so they run on the server and in the browser.

import { cmykToRgb, rgbToHex, type RGB } from "@/lib/color-convert";

// ── Paint (RYB, the artist's color model) ─────────────────────────────────────
// Gosset & Chen's trilinear model: each corner of a red/yellow/blue cube has an RGB color.
// A mix is a point inside the cube (how much of each primary pigment is present).
// Corner order is (r, y, b) as 0/1 bits.
const RYB_CORNERS: Record<string, [number, number, number]> = {
  "000": [1, 1, 1], // white
  "100": [1, 0, 0], // red
  "010": [1, 1, 0], // yellow
  "001": [0.163, 0.373, 0.6], // blue
  "110": [1, 0.5, 0], // orange
  "011": [0, 0.66, 0.2], // green
  "101": [0.5, 0, 0.5], // purple
  "111": [0.2, 0.094, 0], // black / brown mud
};

export function rybToRgb(r: number, y: number, b: number): RGB {
  const out = [0, 0, 0];
  for (const key of Object.keys(RYB_CORNERS)) {
    const wr = key[0] === "1" ? r : 1 - r;
    const wy = key[1] === "1" ? y : 1 - y;
    const wb = key[2] === "1" ? b : 1 - b;
    const w = wr * wy * wb;
    const c = RYB_CORNERS[key];
    out[0] += w * c[0];
    out[1] += w * c[1];
    out[2] += w * c[2];
  }
  return { r: Math.round(out[0] * 255), g: Math.round(out[1] * 255), b: Math.round(out[2] * 255) };
}

/** Parts of each paint: red, yellow, blue, white, black (any non-negative numbers). */
export type PaintParts = { red: number; yellow: number; blue: number; white: number; black: number };

export const PAINT_KEYS: (keyof PaintParts)[] = ["red", "yellow", "blue", "white", "black"];

export function mixPaint(parts: PaintParts): RGB {
  const { red, yellow, blue, white, black } = parts;
  const chroma = red + yellow + blue;
  const total = chroma + white + black;
  if (total <= 0) return { r: 255, g: 255, b: 255 };

  // The three primaries set the hue: scale so the strongest one is fully present.
  let base: RGB = { r: 128, g: 128, b: 128 };
  if (chroma > 0) {
    const m = Math.max(red, yellow, blue);
    base = rybToRgb(red / m, yellow / m, blue / m);
  }
  // White and black dilute that color, weighted by how many parts of each were added.
  const wBase = chroma;
  const mixed = (a: number, b: number, c: number) => (a * wBase + b * white + c * black) / total;
  if (chroma === 0) {
    const g = (255 * white) / total;
    return { r: Math.round(g), g: Math.round(g), b: Math.round(g) };
  }
  return {
    r: Math.round(mixed(base.r, 255, 0)),
    g: Math.round(mixed(base.g, 255, 0)),
    b: Math.round(mixed(base.b, 255, 0)),
  };
}

// ── Light (additive RGB) ──────────────────────────────────────────────────────

/** Lights add together: full red + full green light makes yellow. Intensities 0-100. */
export function mixLight(red: number, green: number, blue: number): RGB {
  const to255 = (v: number) => Math.round(Math.min(100, Math.max(0, v)) * 2.55);
  return { r: to255(red), g: to255(green), b: to255(blue) };
}

// ── Print (subtractive CMYK) ──────────────────────────────────────────────────

/** Inks 0-100%. Uses the standard CMYK to RGB formula. */
export function mixInk(c: number, m: number, y: number, k: number): RGB {
  return cmykToRgb({ c, m, y, k });
}

// ── Recipes shown on the page and loadable into the calculator ────────────────

export type PaintRecipe = {
  slug: string;
  name: string;
  /** Plain-English recipe, e.g. "2 parts orange + 1 part blue". */
  recipe: string;
  parts: PaintParts;
  note: string;
};

const p = (red: number, yellow: number, blue: number, white = 0, black = 0): PaintParts => ({ red, yellow, blue, white, black });

export const PAINT_RECIPES: PaintRecipe[] = [
  { slug: "orange", name: "Orange", recipe: "1 part red + 1 part yellow", parts: p(1, 1, 0), note: "Add more yellow for a lighter, sunnier orange; more red for a deeper one." },
  { slug: "green", name: "Green", recipe: "1 part yellow + 1 part blue", parts: p(0, 1, 1), note: "Use extra yellow for lime and spring greens, extra blue for forest green." },
  { slug: "purple", name: "Purple", recipe: "1 part red + 1 part blue", parts: p(1, 0, 1), note: "More red gives plum and magenta, more blue gives violet and indigo." },
  { slug: "brown", name: "Brown", recipe: "2 parts orange (red + yellow) + 1 part blue", parts: p(2, 2, 1), note: "Brown is a primary mixed with its complement. Red + green, yellow + purple and blue + orange all work." },
  { slug: "pink", name: "Pink", recipe: "1 part red + 2 parts white", parts: p(1, 0, 0, 2), note: "Use less white for hot pink, and a touch of blue for a cooler rose." },
  { slug: "gray", name: "Gray", recipe: "1 part black + 4 parts white", parts: p(0, 0, 0, 4, 1), note: "Mixing a color with its complement and white also gives a softer, warmer gray." },
  { slug: "turquoise", name: "Turquoise", recipe: "3 parts blue + 1 part yellow + 1 part white", parts: p(0, 1, 3, 1), note: "A blue-green with white to lighten it. Use more yellow for a greener turquoise." },
  { slug: "teal", name: "Teal", recipe: "2 parts blue + 1 part yellow", parts: p(0, 1, 2), note: "A deep blue-green. Add a little black to darken it, or more yellow to shift it toward green." },
  { slug: "maroon", name: "Maroon", recipe: "4 parts red + 1 part black + 1 part blue", parts: p(4, 0, 1, 0, 1), note: "Dark red. Black deepens it, a touch of blue stops it turning orange." },
  { slug: "burgundy", name: "Burgundy", recipe: "3 parts red + 1 part blue + 1 part black", parts: p(3, 0, 1, 0, 1), note: "Like maroon with more blue, so it leans toward wine and purple." },
  { slug: "navy", name: "Navy blue", recipe: "3 parts blue + 1 part black", parts: p(0, 0, 3, 0, 1), note: "Add black slowly, because a little goes a long way." },
  { slug: "sky-blue", name: "Sky blue", recipe: "2 parts blue + 3 parts white", parts: p(0, 0, 2, 3), note: "Blue plus white is a tint. More white gives baby blue." },
  { slug: "lavender", name: "Lavender", recipe: "1 part red + 2 parts blue + 4 parts white", parts: p(1, 0, 2, 4), note: "A pale purple. Keep blue higher than red for a cooler lavender." },
  { slug: "peach", name: "Peach", recipe: "1 part red + 1 part yellow + 3 parts white", parts: p(1, 1, 0, 3), note: "A pale orange. Add a little more red for a pinker peach." },
  { slug: "coral", name: "Coral", recipe: "3 parts red + 1 part yellow + 2 parts white", parts: p(3, 1, 0, 2), note: "Between pink and orange: red-heavy, with white to lighten it." },
  { slug: "mint", name: "Mint green", recipe: "1 part yellow + 1 part blue + 4 parts white", parts: p(0, 1, 1, 4), note: "A pale green. Use more yellow for a fresher, warmer mint." },
  { slug: "olive", name: "Olive green", recipe: "2 parts yellow + 1 part blue + 1 part red", parts: p(1, 2, 1), note: "Green plus a little red, which dulls it toward brown." },
  { slug: "lime", name: "Lime green", recipe: "3 parts yellow + 1 part blue", parts: p(0, 3, 1), note: "Yellow-heavy green. Add white for a pastel lime." },
  { slug: "gold", name: "Gold", recipe: "3 parts yellow + 1 part red", parts: p(1, 3, 0), note: "Yellow warmed with red. Add a tiny bit of blue or brown to deepen it." },
  { slug: "beige", name: "Beige", recipe: "1 part brown (2 red + 2 yellow + 1 blue) + 2 parts white", parts: p(2, 2, 1, 10), note: "Brown lightened with white gives beige and tan. More white makes it paler." },
];

export function recipeHex(r: PaintRecipe): string {
  return rgbToHex(mixPaint(r.parts));
}

// Mixing with light and ink: the classic results, as RGB and CMY.
export type LightRecipe = { name: string; recipe: string; rgb: RGB };

export const LIGHT_RECIPES: LightRecipe[] = [
  { name: "Yellow", recipe: "red light + green light", rgb: mixLight(100, 100, 0) },
  { name: "Cyan", recipe: "green light + blue light", rgb: mixLight(0, 100, 100) },
  { name: "Magenta", recipe: "red light + blue light", rgb: mixLight(100, 0, 100) },
  { name: "White", recipe: "red + green + blue light", rgb: mixLight(100, 100, 100) },
];

export const INK_RECIPES: LightRecipe[] = [
  { name: "Red", recipe: "magenta ink + yellow ink", rgb: mixInk(0, 100, 100, 0) },
  { name: "Green", recipe: "cyan ink + yellow ink", rgb: mixInk(100, 0, 100, 0) },
  { name: "Blue", recipe: "cyan ink + magenta ink", rgb: mixInk(100, 100, 0, 0) },
  { name: "Black", recipe: "cyan + magenta + yellow ink (plus black ink)", rgb: mixInk(0, 0, 0, 100) },
];
