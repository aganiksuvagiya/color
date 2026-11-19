// Data and helpers for the /color-wheel page: a 12-color artist (RYB) wheel, a 12-color screen (RGB)
// wheel, and the color-scheme relationships between wheel positions.

import { hslToRgb, rgbToHex, rgbToHsl, type RGB } from "@/lib/color-convert";

export type WheelModel = "artist" | "screen";
export type WheelType = "primary" | "secondary" | "tertiary";

export type WheelColor = {
  name: string;
  hex: string;
  type: WheelType;
  temperature: "warm" | "cool";
};

// Artist wheel, clockwise from yellow at the top. Primaries are red, yellow and blue.
export const ARTIST_WHEEL: WheelColor[] = [
  { name: "Yellow", hex: "#FFE600", type: "primary", temperature: "warm" },
  { name: "Yellow-orange", hex: "#FFBF00", type: "tertiary", temperature: "warm" },
  { name: "Orange", hex: "#FF8000", type: "secondary", temperature: "warm" },
  { name: "Red-orange", hex: "#FF4D00", type: "tertiary", temperature: "warm" },
  { name: "Red", hex: "#E31B23", type: "primary", temperature: "warm" },
  { name: "Red-violet", hex: "#B5177F", type: "tertiary", temperature: "warm" },
  { name: "Violet", hex: "#6F2DA8", type: "secondary", temperature: "cool" },
  { name: "Blue-violet", hex: "#4B44B8", type: "tertiary", temperature: "cool" },
  { name: "Blue", hex: "#1F5FBF", type: "primary", temperature: "cool" },
  { name: "Blue-green", hex: "#0E8A9F", type: "tertiary", temperature: "cool" },
  { name: "Green", hex: "#2E9E3F", type: "secondary", temperature: "cool" },
  { name: "Yellow-green", hex: "#9ACD32", type: "tertiary", temperature: "cool" },
];

// Screen wheel: the same 12 steps of hue (30 degrees each) in RGB light, clockwise from red at the top.
// Primaries are red, green and blue; the secondaries are yellow, cyan and magenta.
export const SCREEN_WHEEL: WheelColor[] = [
  { name: "Red", hex: "#FF0000", type: "primary", temperature: "warm" },
  { name: "Orange", hex: "#FF8000", type: "tertiary", temperature: "warm" },
  { name: "Yellow", hex: "#FFFF00", type: "secondary", temperature: "warm" },
  { name: "Chartreuse", hex: "#80FF00", type: "tertiary", temperature: "cool" },
  { name: "Green", hex: "#00FF00", type: "primary", temperature: "cool" },
  { name: "Spring green", hex: "#00FF80", type: "tertiary", temperature: "cool" },
  { name: "Cyan", hex: "#00FFFF", type: "secondary", temperature: "cool" },
  { name: "Azure", hex: "#0080FF", type: "tertiary", temperature: "cool" },
  { name: "Blue", hex: "#0000FF", type: "primary", temperature: "cool" },
  { name: "Violet", hex: "#8000FF", type: "tertiary", temperature: "cool" },
  { name: "Magenta", hex: "#FF00FF", type: "secondary", temperature: "warm" },
  { name: "Rose", hex: "#FF0080", type: "tertiary", temperature: "warm" },
];

export const WHEELS: Record<WheelModel, WheelColor[]> = { artist: ARTIST_WHEEL, screen: SCREEN_WHEEL };

export type SchemeKey = "complementary" | "split" | "analogous" | "triadic" | "tetradic" | "rectangle";

/** Offsets in wheel steps (one step = 30 degrees) from the selected color. */
export const SCHEMES: { key: SchemeKey; label: string; offsets: number[]; body: string }[] = [
  { key: "complementary", label: "Complementary", offsets: [0, 6], body: "Two colors directly opposite each other. Maximum contrast and energy, best used with one color dominant and the other as an accent." },
  { key: "split", label: "Split-complementary", offsets: [0, 5, 7], body: "A base color plus the two neighbors of its complement. Strong contrast with less tension than a straight complementary pair." },
  { key: "analogous", label: "Analogous", offsets: [-1, 0, 1], body: "Three neighboring colors. Calm and cohesive, common in nature, with little contrast between them." },
  { key: "triadic", label: "Triadic", offsets: [0, 4, 8], body: "Three colors evenly spaced around the wheel. Vibrant and balanced, even when the colors are softened." },
  { key: "tetradic", label: "Tetradic (square)", offsets: [0, 3, 6, 9], body: "Four colors evenly spaced, forming a square. Rich and varied, so let one color lead and keep the others supporting." },
  { key: "rectangle", label: "Tetradic (rectangle)", offsets: [0, 2, 6, 8], body: "Two complementary pairs forming a rectangle. A full palette with a clear warm and cool balance." },
];

export function schemeIndexes(selected: number, key: SchemeKey): number[] {
  const scheme = SCHEMES.find((s) => s.key === key) ?? SCHEMES[0];
  return scheme.offsets.map((o) => (((selected + o) % 12) + 12) % 12);
}

// ── Any color: hue rotation in HSL (the screen/RGB wheel) ─────────────────────

const rotate = (rgb: RGB, degrees: number): string => {
  const { h, s, l } = rgbToHsl(rgb);
  return rgbToHex(hslToRgb({ h: (((h + degrees) % 360) + 360) % 360, s, l }));
};

export type SchemeRow = { key: string; label: string; detail: string; colors: string[] };

export function schemesFromColor(rgb: RGB): SchemeRow[] {
  const base = rgbToHex(rgb);
  const { h, s, l } = rgbToHsl(rgb);
  const mono = [0.2, 0.35, 0.5, 0.65, 0.8].map((light) => rgbToHex(hslToRgb({ h, s, l: Math.round(light * 100) })));
  return [
    { key: "complementary", label: "Complementary", detail: "Opposite hue, +180°", colors: [base, rotate(rgb, 180)] },
    { key: "split", label: "Split-complementary", detail: "Hue +150° and +210°", colors: [base, rotate(rgb, 150), rotate(rgb, 210)] },
    { key: "analogous", label: "Analogous", detail: "Neighbors, −30° and +30°", colors: [rotate(rgb, -30), base, rotate(rgb, 30)] },
    { key: "triadic", label: "Triadic", detail: "Evenly spaced, +120° and +240°", colors: [base, rotate(rgb, 120), rotate(rgb, 240)] },
    { key: "tetradic", label: "Tetradic (square)", detail: "Hue +90°, +180° and +270°", colors: [base, rotate(rgb, 90), rotate(rgb, 180), rotate(rgb, 270)] },
    { key: "rectangle", label: "Tetradic (rectangle)", detail: "Hue +60°, +180° and +240°", colors: [base, rotate(rgb, 60), rotate(rgb, 180), rotate(rgb, 240)] },
    { key: "mono", label: "Monochromatic", detail: "Same hue, 5 lightness steps", colors: mono },
  ];
}
