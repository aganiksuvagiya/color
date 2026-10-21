import { formatHsl, formatRgb, parseHex, rgbToHex, type RGB } from "@/lib/color-convert";

export type PastelGroupKey = "pink" | "peach" | "yellow" | "green" | "aqua" | "blue" | "purple" | "neutral";

export type PastelColor = { name: string; hex: string; group: PastelGroupKey };

export const PASTEL_GROUPS: { key: PastelGroupKey; label: string; heading: string; intro: string }[] = [
  { key: "pink", label: "Pink", heading: "Pastel pink colors", intro: "Soft pinks from baby pink to cotton candy. Warm, gentle and friendly, they are a staple of baby, beauty and wedding design." },
  { key: "peach", label: "Peach & orange", heading: "Pastel peach, coral and orange colors", intro: "Pale oranges and warm pinks that feel sunny without the intensity of a full orange." },
  { key: "yellow", label: "Yellow", heading: "Pastel yellow colors", intro: "Buttery, creamy yellows. Pale enough to use as backgrounds, and warm enough to lift a cool palette." },
  { key: "green", label: "Green", heading: "Pastel green colors", intro: "Mint, tea and celadon greens. Fresh and calming, and they pair well with pink, cream and lavender." },
  { key: "aqua", label: "Aqua", heading: "Pastel aqua and turquoise colors", intro: "Pale turquoise and cyan tints that sit between green and blue." },
  { key: "blue", label: "Blue", heading: "Pastel blue colors", intro: "Baby blue, powder blue and periwinkle. Calm, clean and trustworthy, and easy to pair with almost any other pastel." },
  { key: "purple", label: "Purple", heading: "Pastel purple colors", intro: "Lavender, lilac and wisteria. Dreamy and creative, and they bridge pink and blue palettes." },
  { key: "neutral", label: "Neutral", heading: "Pastel neutrals", intro: "Ivory, beige and soft gray that calm a palette and give the pastels room to breathe." },
];

export const PASTEL_COLORS: PastelColor[] = [
  // Pink
  { name: "Pastel pink", hex: "#FFD1DC", group: "pink" },
  { name: "Baby pink", hex: "#F4C2C2", group: "pink" },
  { name: "Cotton candy", hex: "#FFBCD9", group: "pink" },
  { name: "Light pink", hex: "#FFB6C1", group: "pink" },
  { name: "Carnation pink", hex: "#FFA6C9", group: "pink" },
  { name: "Rose quartz", hex: "#F7CAC9", group: "pink" },
  { name: "Pale pink", hex: "#FADADD", group: "pink" },
  { name: "Pastel magenta", hex: "#F49AC2", group: "pink" },
  { name: "Bubblegum pink", hex: "#FFC1CC", group: "pink" },
  // Peach, coral, orange
  { name: "Pastel red", hex: "#FF6961", group: "peach" },
  { name: "Salmon pink", hex: "#FF91A4", group: "peach" },
  { name: "Melon", hex: "#FDBCB4", group: "peach" },
  { name: "Peach", hex: "#FFE5B4", group: "peach" },
  { name: "Apricot", hex: "#FBCEB1", group: "peach" },
  { name: "Pastel orange", hex: "#FFB347", group: "peach" },
  // Yellow
  { name: "Pastel yellow", hex: "#FDFD96", group: "yellow" },
  { name: "Lemon chiffon", hex: "#FFFACD", group: "yellow" },
  { name: "Cream", hex: "#FFFDD0", group: "yellow" },
  { name: "Buttermilk", hex: "#FFF1B5", group: "yellow" },
  { name: "Vanilla", hex: "#F3E5AB", group: "yellow" },
  // Green
  { name: "Pastel green", hex: "#77DD77", group: "green" },
  { name: "Mint green", hex: "#98FF98", group: "green" },
  { name: "Tea green", hex: "#D0F0C0", group: "green" },
  { name: "Celadon", hex: "#ACE1AF", group: "green" },
  { name: "Honeydew", hex: "#F0FFF0", group: "green" },
  // Aqua
  { name: "Pale turquoise", hex: "#AFEEEE", group: "aqua" },
  { name: "Light cyan", hex: "#E0FFFF", group: "aqua" },
  { name: "Celeste", hex: "#B2FFFF", group: "aqua" },
  // Blue
  { name: "Baby blue", hex: "#89CFF0", group: "blue" },
  { name: "Pastel blue", hex: "#AEC6CF", group: "blue" },
  { name: "Sky blue", hex: "#87CEEB", group: "blue" },
  { name: "Light blue", hex: "#ADD8E6", group: "blue" },
  { name: "Powder blue", hex: "#B0E0E6", group: "blue" },
  { name: "Columbia blue", hex: "#B9D9EB", group: "blue" },
  { name: "Periwinkle", hex: "#CCCCFF", group: "blue" },
  { name: "Alice blue", hex: "#F0F8FF", group: "blue" },
  // Purple
  { name: "Lavender", hex: "#E6E6FA", group: "purple" },
  { name: "Lilac", hex: "#C8A2C8", group: "purple" },
  { name: "Pastel purple", hex: "#B39EB5", group: "purple" },
  { name: "Mauve", hex: "#E0B0FF", group: "purple" },
  { name: "Wisteria", hex: "#C9A0DC", group: "purple" },
  { name: "Thistle", hex: "#D8BFD8", group: "purple" },
  { name: "Pastel violet", hex: "#CB99C9", group: "purple" },
  // Neutral
  { name: "Ivory", hex: "#FFFFF0", group: "neutral" },
  { name: "Beige", hex: "#F5F5DC", group: "neutral" },
  { name: "Eggshell", hex: "#F0EAD6", group: "neutral" },
  { name: "Pastel gray", hex: "#CFCFC4", group: "neutral" },
];

export type PastelView = PastelColor & { rgb: string; hsl: string };

export function toView(c: PastelColor): PastelView {
  const rgb = parseHex(c.hex)!;
  return { ...c, rgb: formatRgb(rgb), hsl: formatHsl(rgb) };
}

// ── WCAG contrast, to show which text colors work on pastel backgrounds ────────

function channel(v: number) {
  const s = v / 255;
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
}

export function luminance({ r, g, b }: RGB) {
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

export function contrastRatio(a: RGB, b: RGB) {
  const la = luminance(a);
  const lb = luminance(b);
  const [hi, lo] = la > lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
}

/** Mix a color toward white. amount 0 = unchanged, 100 = white. */
export function pastelize(rgb: RGB, amount: number): string {
  const t = Math.min(100, Math.max(0, amount)) / 100;
  return rgbToHex({ r: rgb.r + (255 - rgb.r) * t, g: rgb.g + (255 - rgb.g) * t, b: rgb.b + (255 - rgb.b) * t });
}
