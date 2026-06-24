import { getContrastText } from "./color-utils";
import type { Palette, PaletteColor, SemanticRole } from "./types";

type RGB = [number, number, number];

function distance(a: RGB, b: RGB): number {
  return (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2;
}

function kMeans(pixels: RGB[], k: number, iterations = 10): RGB[] {
  const centroids: RGB[] = [];
  const step = Math.floor(pixels.length / k);
  for (let i = 0; i < k; i++) {
    centroids.push([...pixels[i * step]]);
  }

  for (let iter = 0; iter < iterations; iter++) {
    const clusters: RGB[][] = Array.from({ length: k }, () => []);

    for (const pixel of pixels) {
      let minDist = Infinity;
      let closest = 0;
      for (let c = 0; c < k; c++) {
        const d = distance(pixel, centroids[c]);
        if (d < minDist) {
          minDist = d;
          closest = c;
        }
      }
      clusters[closest].push(pixel);
    }

    for (let c = 0; c < k; c++) {
      if (clusters[c].length === 0) continue;
      const sum: RGB = [0, 0, 0];
      for (const p of clusters[c]) {
        sum[0] += p[0];
        sum[1] += p[1];
        sum[2] += p[2];
      }
      centroids[c] = [
        Math.round(sum[0] / clusters[c].length),
        Math.round(sum[1] / clusters[c].length),
        Math.round(sum[2] / clusters[c].length),
      ];
    }
  }

  return centroids;
}

function rgbToHex(r: number, g: number, b: number): string {
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

function luminance(r: number, g: number, b: number): number {
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

export function extractColorsFromImageData(imageData: ImageData, count: number = 5): Palette {
  const pixels: RGB[] = [];
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 16) {
    pixels.push([data[i], data[i + 1], data[i + 2]]);
  }

  const centroids = kMeans(pixels, count);

  centroids.sort((a, b) => luminance(...a) - luminance(...b));

  const roles: SemanticRole[] = ["neutral", "success", "primary", "warning", "accent"];
  const names = ["Dark Base", "Deep Tone", "Core", "Mid Tone", "Highlight"];

  const colors: PaletteColor[] = centroids.map((c, i) => {
    const hex = rgbToHex(c[0], c[1], c[2]);
    return {
      name: names[i],
      hex,
      role: roles[i],
      text: getContrastText(hex),
    };
  });

  return { label: "Extracted from image", colors };
}
