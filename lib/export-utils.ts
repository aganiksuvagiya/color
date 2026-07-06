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

export function exportAsKotlin(palette: Palette): string {
  const lines = palette.colors.map((c) => {
    const hex = c.hex.slice(1).toUpperCase();
    return `    val ${c.role} = Color(0xFF${hex})`;
  });
  return `// ${palette.label}\nimport androidx.compose.ui.graphics.Color\n\nobject AppColors {\n${lines.join("\n")}\n}`;
}

export function exportAsFlutter(palette: Palette): string {
  const lines = palette.colors.map((c) => {
    const hex = c.hex.slice(1).toUpperCase();
    return `  static const ${c.role} = Color(0xFF${hex});`;
  });
  return `// ${palette.label}\nimport 'package:flutter/material.dart';\n\nclass AppColors {\n${lines.join("\n")}\n}`;
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

export function exportAsSvg(palette: Palette): string {
  const w = 500;
  const h = 120;
  const colW = w / palette.colors.length;

  const rects = palette.colors
    .map((c, i) => `  <rect x="${(i * colW).toFixed(1)}" y="0" width="${colW.toFixed(1)}" height="${h}" fill="${c.hex}"/>`)
    .join("\n");
  const labels = palette.colors
    .map((c, i) => {
      const fill = c.text === "light" ? "#ffffff" : "#000000";
      return `  <text x="${(i * colW + 8).toFixed(1)}" y="${h - 12}" font-family="monospace" font-size="11" fill="${fill}">${c.hex}</text>`;
    })
    .join("\n");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">\n  <title>${palette.label}</title>\n${rects}\n${labels}\n</svg>`;
}

export function exportAsGpl(palette: Palette): string {
  const lines = palette.colors.map((c) => {
    const r = parseInt(c.hex.slice(1, 3), 16);
    const g = parseInt(c.hex.slice(3, 5), 16);
    const b = parseInt(c.hex.slice(5, 7), 16);
    return `${String(r).padStart(3, " ")} ${String(g).padStart(3, " ")} ${String(b).padStart(3, " ")}\t${c.name}`;
  });
  return `GIMP Palette\nName: ${palette.label}\nColumns: ${palette.colors.length}\n#\n${lines.join("\n")}`;
}

function utf16beWithNull(str: string): Uint8Array {
  const withNull = `${str}\0`;
  const bytes = new Uint8Array(withNull.length * 2);
  for (let i = 0; i < withNull.length; i++) {
    const code = withNull.charCodeAt(i);
    bytes[i * 2] = (code >> 8) & 0xff;
    bytes[i * 2 + 1] = code & 0xff;
  }
  return bytes;
}

export function generateAseBlob(palette: Palette): Blob {
  const blocks: Uint8Array[] = palette.colors.map((c) => {
    const nameBytes = utf16beWithNull(c.name);
    const nameLen = nameBytes.length / 2;
    const r = parseInt(c.hex.slice(1, 3), 16) / 255;
    const g = parseInt(c.hex.slice(3, 5), 16) / 255;
    const b = parseInt(c.hex.slice(5, 7), 16) / 255;

    const blockDataLen = 2 + nameBytes.length + 4 + 12 + 2;
    const buf = new ArrayBuffer(2 + 4 + blockDataLen);
    const view = new DataView(buf);
    let offset = 0;
    view.setUint16(offset, 0xc001); offset += 2; // color entry block
    view.setUint32(offset, blockDataLen); offset += 4;
    view.setUint16(offset, nameLen); offset += 2;
    new Uint8Array(buf, offset, nameBytes.length).set(nameBytes); offset += nameBytes.length;
    "RGB ".split("").forEach((ch, i) => view.setUint8(offset + i, ch.charCodeAt(0)));
    offset += 4;
    view.setFloat32(offset, r); offset += 4;
    view.setFloat32(offset, g); offset += 4;
    view.setFloat32(offset, b); offset += 4;
    view.setUint16(offset, 2); // color type: normal
    return new Uint8Array(buf);
  });

  const headerBuf = new ArrayBuffer(12);
  const headerView = new DataView(headerBuf);
  "ASEF".split("").forEach((ch, i) => headerView.setUint8(i, ch.charCodeAt(0)));
  headerView.setUint16(4, 1);
  headerView.setUint16(6, 0);
  headerView.setUint32(8, blocks.length);

  const totalLen = 12 + blocks.reduce((sum, b) => sum + b.length, 0);
  const result = new Uint8Array(totalLen);
  result.set(new Uint8Array(headerBuf), 0);
  let pos = 12;
  for (const b of blocks) {
    result.set(b, pos);
    pos += b.length;
  }

  return new Blob([result], { type: "application/octet-stream" });
}

export function generatePdfBlob(palette: Palette): Blob {
  const width = 500;
  const height = 130;
  const colW = width / palette.colors.length;

  let content = "";
  palette.colors.forEach((c, i) => {
    const r = parseInt(c.hex.slice(1, 3), 16) / 255;
    const g = parseInt(c.hex.slice(3, 5), 16) / 255;
    const b = parseInt(c.hex.slice(5, 7), 16) / 255;
    const x = i * colW;
    content += `${r.toFixed(3)} ${g.toFixed(3)} ${b.toFixed(3)} rg\n${x.toFixed(1)} 0 ${colW.toFixed(1)} ${height} re f\n`;
    const textFill = c.text === "light" ? "1 1 1" : "0 0 0";
    content += `${textFill} rg\nBT /F1 9 Tf ${(x + 8).toFixed(1)} 28 Td (${c.role}) Tj ET\n`;
    content += `BT /F1 10 Tf ${(x + 8).toFixed(1)} 14 Td (${c.hex}) Tj ET\n`;
  });

  const objects = [
    `<< /Type /Catalog /Pages 2 0 R >>`,
    `<< /Type /Pages /Kids [3 0 R] /Count 1 >>`,
    `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${width} ${height}] /Resources << /Font << /F1 5 0 R >> >> /Contents 4 0 R >>`,
    `<< /Length ${content.length} >>\nstream\n${content}endstream`,
    `<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>`,
  ];

  let pdf = "%PDF-1.4\n";
  const offsets: number[] = [0];
  objects.forEach((obj, idx) => {
    offsets.push(pdf.length);
    pdf += `${idx + 1} 0 obj\n${obj}\nendobj\n`;
  });

  const xrefStart = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (let i = 1; i <= objects.length; i++) {
    pdf += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;

  return new Blob([pdf], { type: "application/pdf" });
}
