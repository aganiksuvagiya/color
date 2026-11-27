export type ColorBlindType = "protanopia" | "deuteranopia" | "tritanopia";

// Machado, Oliveira & Fernandes (2009), "A Physiologically-based Model for Simulation of
// Color Vision Deficiency", severity 1.0 (full dichromacy). The matrices work on linear-light
// RGB, so colors are converted out of the sRGB gamma curve first and back afterwards.
const matrices: Record<ColorBlindType, number[][]> = {
  protanopia: [
    [0.152286, 1.052583, -0.204868],
    [0.114503, 0.786281, 0.099216],
    [-0.003882, -0.048116, 1.051998],
  ],
  deuteranopia: [
    [0.367322, 0.860646, -0.227968],
    [0.280085, 0.672501, 0.047413],
    [-0.01182, 0.04294, 0.968881],
  ],
  tritanopia: [
    [1.255528, -0.076749, -0.178779],
    [-0.078411, 0.930809, 0.147602],
    [0.004733, 0.691367, 0.3039],
  ],
};

const toLinear = (c: number) => {
  const v = c / 255;
  return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
};

const toSrgb = (v: number) => {
  const c = Math.min(1, Math.max(0, v));
  const s = c <= 0.0031308 ? c * 12.92 : 1.055 * c ** (1 / 2.4) - 0.055;
  return Math.round(s * 255);
};

export function simulateColorBlind(hex: string, type: ColorBlindType): string {
  const [r, g, b] = [1, 3, 5].map((i) => toLinear(parseInt(hex.slice(i, i + 2), 16)));
  const m = matrices[type];
  return (
    "#" +
    m
      .map((row) => toSrgb(row[0] * r + row[1] * g + row[2] * b).toString(16).padStart(2, "0"))
      .join("")
  );
}

export const colorBlindTypes: { key: ColorBlindType; label: string; desc: string }[] = [
  { key: "protanopia", label: "Protanopia", desc: "Red-blind · about 1% of males" },
  { key: "deuteranopia", label: "Deuteranopia", desc: "Green-blind · about 1% of males" },
  { key: "tritanopia", label: "Tritanopia", desc: "Blue-blind · very rare" },
];

/** Colors closer than this (CIE76 ΔE) are hard to tell apart in a chart or legend. */
export const SIMILAR_BELOW = 20;

function hexToLab(hex: string): [number, number, number] {
  const [r, g, b] = [1, 3, 5].map((i) => toLinear(parseInt(hex.slice(i, i + 2), 16)));
  const x = (0.4124564 * r + 0.3575761 * g + 0.1804375 * b) / 0.95047;
  const y = 0.2126729 * r + 0.7151522 * g + 0.072175 * b;
  const z = (0.0193339 * r + 0.119192 * g + 0.9503041 * b) / 1.08883;
  const f = (t: number) => (t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116);
  return [116 * f(y) - 16, 500 * (f(x) - f(y)), 200 * (f(y) - f(z))];
}

/** CIE76 color difference between two hex colors. */
export function deltaE(a: string, b: string) {
  const [l1, a1, b1] = hexToLab(a);
  const [l2, a2, b2] = hexToLab(b);
  return Math.sqrt((l1 - l2) ** 2 + (a1 - a2) ** 2 + (b1 - b2) ** 2);
}
