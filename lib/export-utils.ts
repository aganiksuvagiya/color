import type { Palette } from "./types";

export function exportAsTailwind(palette: Palette): string {
  const entries = palette.colors
    .map((c) => `        "${c.role}": "${c.hex}",`)
    .join("\n");

  return `// ${palette.label}
export default {
  theme: {
    extend: {
      colors: {
${entries}
      },
    },
  },
};`;
}

export function exportAsCssVariables(palette: Palette): string {
  const vars = palette.colors
    .map((c) => `  --color-${c.role}: ${c.hex};`)
    .join("\n");

  return `/* ${palette.label} */
:root {
${vars}
}`;
}

export function exportAsJson(palette: Palette): string {
  return JSON.stringify(palette, null, 2);
}

export function exportAsScss(palette: Palette): string {
  const vars = palette.colors
    .map((c) => `$color-${c.role}: ${c.hex};`)
    .join("\n");
  return `// ${palette.label}\n${vars}`;
}

export function exportAsSwift(palette: Palette): string {
  const lines = palette.colors.map((c) => {
    const r = parseInt(c.hex.slice(1, 3), 16) / 255;
    const g = parseInt(c.hex.slice(3, 5), 16) / 255;
    const b = parseInt(c.hex.slice(5, 7), 16) / 255;
    return `static let ${c.role} = UIColor(red: ${r.toFixed(3)}, green: ${g.toFixed(3)}, blue: ${b.toFixed(3)}, alpha: 1.0)`;
  });
  return `// ${palette.label}\nimport UIKit\n\nextension UIColor {\n${lines.map((l) => `    ${l}`).join("\n")}\n}`;
}

export function exportAsAndroid(palette: Palette): string {
  const items = palette.colors
    .map((c) => `    <color name="color_${c.role}">${c.hex}</color>`)
    .join("\n");
  return `<?xml version="1.0" encoding="utf-8"?>\n<!-- ${palette.label} -->\n<resources>\n${items}\n</resources>`;
}

export function exportAsFigmaTokens(palette: Palette): string {
  const tokens: Record<string, { value: string; type: string }> = {};
  for (const c of palette.colors) {
    tokens[c.role] = { value: c.hex, type: "color" };
  }
  return JSON.stringify({ color: tokens }, null, 2);
}

export function generatePngDataUrl(palette: Palette): string {
  const canvas = document.createElement("canvas");
  const w = 500;
  const h = 120;
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;
  const colW = w / palette.colors.length;

  palette.colors.forEach((c, i) => {
    ctx.fillStyle = c.hex;
    ctx.fillRect(i * colW, 0, colW, h);
    ctx.fillStyle = c.text === "light" ? "#ffffff" : "#000000";
    ctx.font = "bold 11px system-ui";
    ctx.fillText(c.role, i * colW + 8, h - 28);
    ctx.font = "11px monospace";
    ctx.fillText(c.hex, i * colW + 8, h - 12);
  });

  return canvas.toDataURL("image/png");
}
