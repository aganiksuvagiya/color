export type ColorBlindType = "protanopia" | "deuteranopia" | "tritanopia";

const matrices: Record<ColorBlindType, number[][]> = {
  protanopia: [
    [0.567, 0.433, 0.0],
    [0.558, 0.442, 0.0],
    [0.0, 0.242, 0.758],
  ],
  deuteranopia: [
    [0.625, 0.375, 0.0],
    [0.7, 0.3, 0.0],
    [0.0, 0.3, 0.7],
  ],
  tritanopia: [
    [0.95, 0.05, 0.0],
    [0.0, 0.433, 0.567],
    [0.0, 0.475, 0.525],
  ],
};

export function simulateColorBlind(hex: string, type: ColorBlindType): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  const m = matrices[type];
  const nr = Math.min(255, Math.round(m[0][0] * r + m[0][1] * g + m[0][2] * b));
  const ng = Math.min(255, Math.round(m[1][0] * r + m[1][1] * g + m[1][2] * b));
  const nb = Math.min(255, Math.round(m[2][0] * r + m[2][1] * g + m[2][2] * b));

  return `#${nr.toString(16).padStart(2, "0")}${ng.toString(16).padStart(2, "0")}${nb.toString(16).padStart(2, "0")}`;
}
