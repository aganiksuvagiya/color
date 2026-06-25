import { NextRequest, NextResponse } from "next/server";
import { findClosestColorName } from "@/lib/color-names";

function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
}

function getCategory(h: number, s: number, l: number): string {
  if (l >= 95) return "White";
  if (l <= 8) return "Black";
  if (s <= 10) return "Gray";
  if (s <= 20 && l <= 40) return "Brown";
  if (h < 15 || h >= 345) return "Red";
  if (h < 40) return "Orange";
  if (h < 50 && s <= 40) return "Brown";
  if (h < 65) return "Yellow";
  if (h < 160) return "Green";
  if (h < 195) return "Cyan";
  if (h < 260) return "Blue";
  if (h < 300) return "Purple";
  return "Pink";
}

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

type GeneratedColor = {
  name: string;
  hex: string;
  category: string;
  hsl: { h: number; s: number; l: number };
  rgb: { r: number; g: number; b: number };
};

function generateBatch(page: number, limit: number, category?: string): GeneratedColor[] {
  const colors: GeneratedColor[] = [];
  const rand = seededRandom(page * 7919 + 104729);
  let attempts = 0;

  while (colors.length < limit && attempts < limit * 20) {
    attempts++;
    const h = Math.floor(rand() * 360);
    const s = Math.floor(rand() * 80) + 20;
    const l = Math.floor(rand() * 70) + 15;

    const hex = hslToHex(h, s, l);
    const cat = getCategory(h, s, l);

    if (category && cat.toLowerCase() !== category.toLowerCase()) continue;

    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    colors.push({
      name: findClosestColorName(hex),
      hex,
      category: cat,
      hsl: { h, s, l },
      rgb: { r, g, b },
    });
  }

  return colors;
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "24")));
  const category = searchParams.get("category") || "";
  const search = searchParams.get("search") || "";
  const hex = searchParams.get("hex") || "";

  if (hex) {
    const normalized = hex.startsWith("#") ? hex.toUpperCase() : `#${hex.toUpperCase()}`;
    const r = parseInt(normalized.slice(1, 3), 16);
    const g = parseInt(normalized.slice(3, 5), 16);
    const b = parseInt(normalized.slice(5, 7), 16);
    return NextResponse.json({
      color: {
        name: findClosestColorName(normalized),
        hex: normalized,
        category: "Custom",
        rgb: { r, g, b },
      },
    });
  }

  let colors = generateBatch(page, search ? limit * 3 : limit, category || undefined);

  if (search) {
    const q = search.toLowerCase();
    colors = colors
      .filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.hex.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q)
      )
      .slice(0, limit);
  }

  return NextResponse.json({
    colors,
    pagination: {
      page,
      limit,
      hasNext: true,
    },
    categories: [
      "Red", "Orange", "Brown", "Yellow", "Green",
      "Cyan", "Blue", "Purple", "Pink", "White", "Gray", "Black",
    ],
  });
}
