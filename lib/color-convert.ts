// Pure color-format conversions (HEX, RGB, HSL, CMYK, OKLCH) shared by the converter pages.
// No imports, so it runs in server components, client components and plain Node.

export type RGB = { r: number; g: number; b: number };
export type HSL = { h: number; s: number; l: number };
export type CMYK = { c: number; m: number; y: number; k: number };
export type OKLCH = { l: number; c: number; h: number };

export type ColorFormat = "hex" | "rgb" | "hsl" | "cmyk" | "oklch";

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));
const round = (v: number, digits = 0) => {
  const f = 10 ** digits;
  return Math.round(v * f) / f;
};

export const FORMAT_LABEL: Record<ColorFormat, string> = {
  hex: "HEX",
  rgb: "RGB",
  hsl: "HSL",
  cmyk: "CMYK",
  oklch: "OKLCH",
};

export const FORMAT_PLACEHOLDER: Record<ColorFormat, string> = {
  hex: "#3B82F6",
  rgb: "59, 130, 246",
  hsl: "217, 91%, 60%",
  cmyk: "76, 47, 0, 4",
  oklch: "62.3% 0.188 259.8",
};

// ── HEX ───────────────────────────────────────────────────────────────────────

export function parseHex(input: string): RGB | null {
  let hex = input.trim().replace(/^#/, "");
  if (/^[0-9a-f]{3}$/i.test(hex)) hex = hex.split("").map((c) => c + c).join("");
  if (!/^[0-9a-f]{6}$/i.test(hex)) return null;
  return { r: parseInt(hex.slice(0, 2), 16), g: parseInt(hex.slice(2, 4), 16), b: parseInt(hex.slice(4, 6), 16) };
}

export function rgbToHex({ r, g, b }: RGB): string {
  return "#" + [r, g, b].map((v) => clamp(Math.round(v), 0, 255).toString(16).padStart(2, "0")).join("").toUpperCase();
}

// ── HSL ───────────────────────────────────────────────────────────────────────

export function rgbToHsl({ r, g, b }: RGB): HSL {
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  const d = max - min;
  let h = 0;
  let s = 0;
  if (d !== 0) {
    s = d / (1 - Math.abs(2 * l - 1));
    if (max === rn) h = ((gn - bn) / d) % 6;
    else if (max === gn) h = (bn - rn) / d + 2;
    else h = (rn - gn) / d + 4;
    h *= 60;
    if (h < 0) h += 360;
  }
  return { h: round(h), s: round(s * 100), l: round(l * 100) };
}

export function hslToRgb({ h, s, l }: HSL): RGB {
  const sn = clamp(s, 0, 100) / 100, ln = clamp(l, 0, 100) / 100;
  const hh = ((h % 360) + 360) % 360;
  const c = (1 - Math.abs(2 * ln - 1)) * sn;
  const x = c * (1 - Math.abs(((hh / 60) % 2) - 1));
  const m = ln - c / 2;
  let rgb: [number, number, number];
  if (hh < 60) rgb = [c, x, 0];
  else if (hh < 120) rgb = [x, c, 0];
  else if (hh < 180) rgb = [0, c, x];
  else if (hh < 240) rgb = [0, x, c];
  else if (hh < 300) rgb = [x, 0, c];
  else rgb = [c, 0, x];
  return { r: Math.round((rgb[0] + m) * 255), g: Math.round((rgb[1] + m) * 255), b: Math.round((rgb[2] + m) * 255) };
}

// ── CMYK (simple device-independent formula, not an ICC print profile) ─────────

export function rgbToCmyk({ r, g, b }: RGB): CMYK {
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const k = 1 - Math.max(rn, gn, bn);
  if (k >= 1) return { c: 0, m: 0, y: 0, k: 100 };
  return {
    c: round(((1 - rn - k) / (1 - k)) * 100),
    m: round(((1 - gn - k) / (1 - k)) * 100),
    y: round(((1 - bn - k) / (1 - k)) * 100),
    k: round(k * 100),
  };
}

export function cmykToRgb({ c, m, y, k }: CMYK): RGB {
  const cn = clamp(c, 0, 100) / 100, mn = clamp(m, 0, 100) / 100, yn = clamp(y, 0, 100) / 100, kn = clamp(k, 0, 100) / 100;
  return {
    r: Math.round(255 * (1 - cn) * (1 - kn)),
    g: Math.round(255 * (1 - mn) * (1 - kn)),
    b: Math.round(255 * (1 - yn) * (1 - kn)),
  };
}

// ── OKLCH (Björn Ottosson's OKLab, as used by CSS Color 4) ────────────────────

const toLinear = (c: number) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const fromLinear = (c: number) => (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055);

export function rgbToOklab({ r, g, b }: RGB): { L: number; a: number; b: number } {
  const lr = toLinear(r / 255), lg = toLinear(g / 255), lb = toLinear(b / 255);
  const l_ = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
  const m_ = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
  const s_ = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);
  return {
    L: 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_,
    a: 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_,
    b: 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_,
  };
}

export function rgbToOklch(rgb: RGB): OKLCH {
  const { L, a, b } = rgbToOklab(rgb);
  const C = Math.sqrt(a * a + b * b);
  let h = (Math.atan2(b, a) * 180) / Math.PI;
  if (h < 0) h += 360;
  // Achromatic colors have no meaningful hue.
  if (C < 0.0004) h = 0;
  return { l: round(L, 4), c: round(C, 4), h: round(h, 2) };
}

export function oklchToRgb({ l, c, h }: OKLCH): RGB {
  const hr = (h * Math.PI) / 180;
  const a = c * Math.cos(hr), b = c * Math.sin(hr);
  const l_ = l + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = l - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = l - 0.0894841775 * a - 1.291485548 * b;
  const L = l_ ** 3, M = m_ ** 3, S = s_ ** 3;
  const lr = 4.0767416621 * L - 3.3077115913 * M + 0.2309699292 * S;
  const lg = -1.2684380046 * L + 2.6097574011 * M - 0.3413193965 * S;
  const lb = -0.0041960863 * L - 0.7034186147 * M + 1.707614701 * S;
  const to255 = (v: number) => Math.round(clamp(fromLinear(clamp(v, 0, 1)), 0, 1) * 255);
  return { r: to255(lr), g: to255(lg), b: to255(lb) };
}

// ── Formatting ────────────────────────────────────────────────────────────────

export const formatHex = (rgb: RGB) => rgbToHex(rgb);
export const formatRgb = ({ r, g, b }: RGB) => `rgb(${r}, ${g}, ${b})`;
export const formatHsl = (rgb: RGB) => {
  const { h, s, l } = rgbToHsl(rgb);
  return `hsl(${h}, ${s}%, ${l}%)`;
};
export const formatCmyk = (rgb: RGB) => {
  const { c, m, y, k } = rgbToCmyk(rgb);
  return `cmyk(${c}%, ${m}%, ${y}%, ${k}%)`;
};
export const formatOklch = (rgb: RGB) => {
  const { l, c, h } = rgbToOklch(rgb);
  return `oklch(${round(l * 100, 2)}% ${c} ${h})`;
};

export const formatters: Record<ColorFormat, (rgb: RGB) => string> = {
  hex: formatHex,
  rgb: formatRgb,
  hsl: formatHsl,
  cmyk: formatCmyk,
  oklch: formatOklch,
};

// ── Parsing free-form input for each source format ────────────────────────────

function numbers(input: string): number[] | null {
  const matches = input.replace(/^[a-z]+\(/i, "").replace(/\)/, "").match(/-?\d*\.?\d+/g);
  return matches ? matches.map(Number) : null;
}

export function parseRgb(input: string): RGB | null {
  const n = numbers(input);
  if (!n || n.length < 3) return null;
  const [r, g, b] = n;
  if ([r, g, b].some((v) => v < 0 || v > 255)) return null;
  return { r: Math.round(r), g: Math.round(g), b: Math.round(b) };
}

export function parseHsl(input: string): RGB | null {
  const n = numbers(input);
  if (!n || n.length < 3) return null;
  const [h, s, l] = n;
  if (s < 0 || s > 100 || l < 0 || l > 100 || h < -360 || h > 720) return null;
  return hslToRgb({ h, s, l });
}

export function parseCmyk(input: string): RGB | null {
  const n = numbers(input);
  if (!n || n.length < 4) return null;
  const [c, m, y, k] = n;
  if ([c, m, y, k].some((v) => v < 0 || v > 100)) return null;
  return cmykToRgb({ c, m, y, k });
}

export function parseOklch(input: string): RGB | null {
  const n = numbers(input);
  if (!n || n.length < 3) return null;
  let [l, c, h] = n;
  // Lightness may be written as a percentage ("62%") or as 0-1.
  if (/%/.test(input.split(/[\s,/]+/).filter(Boolean).find((t) => /\d/.test(t)) ?? "") || l > 1) l /= 100;
  if (l < 0 || l > 1 || c < 0 || c > 0.5) return null;
  h = ((h % 360) + 360) % 360;
  return oklchToRgb({ l, c, h });
}

export const parsers: Record<ColorFormat, (input: string) => RGB | null> = {
  hex: parseHex,
  rgb: parseRgb,
  hsl: parseHsl,
  cmyk: parseCmyk,
  oklch: parseOklch,
};
