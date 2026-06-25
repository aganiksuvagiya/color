import { NextRequest, NextResponse } from "next/server";

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

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

const MOOD_NAMES = [
  "Sunset", "Ocean", "Aurora", "Dusk", "Dawn", "Twilight", "Ember",
  "Frost", "Coral", "Lagoon", "Blush", "Storm", "Meadow", "Velvet",
  "Neon", "Mystic", "Haze", "Glow", "Mist", "Flame", "Arctic",
  "Tropics", "Lava", "Mint", "Rose", "Indigo", "Copper", "Jade",
  "Peach", "Plum", "Sky", "Forest", "Berry", "Wine", "Sand",
  "Honey", "Sapphire", "Ruby", "Emerald", "Amethyst", "Topaz",
  "Pearl", "Onyx", "Ivory", "Slate", "Crimson", "Teal", "Bronze",
  "Orchid", "Cobalt", "Marigold", "Lavender", "Cinnamon", "Charcoal",
  "Serenity", "Passion", "Breeze", "Horizon", "Eclipse", "Solstice",
];

const STYLE_NAMES = [
  "Dream", "Pulse", "Wave", "Shift", "Fade", "Bloom", "Drift",
  "Flash", "Surge", "Glow", "Kiss", "Touch", "Spark", "Vibe",
  "Rush", "Flow", "Haze", "Bliss", "Fire", "Chill", "Burst",
  "Gleam", "Shine", "Dew", "Ray", "Beam", "Silk", "Smoke",
  "Dust", "Rain", "Snow", "Heat", "Cool", "Warm", "Soft",
];

type GeneratedGradient = {
  name: string;
  colors: string[];
  positions: number[];
  angle: number;
  category: string;
};

function getCategory(h: number): string {
  if (h < 30) return "Warm";
  if (h < 60) return "Yellow";
  if (h < 150) return "Green";
  if (h < 210) return "Cool";
  if (h < 270) return "Blue";
  if (h < 330) return "Purple";
  return "Warm";
}

function generateBatch(page: number, limit: number, category?: string): GeneratedGradient[] {
  const gradients: GeneratedGradient[] = [];
  const rand = seededRandom(page * 6971 + 89213);
  let attempts = 0;

  while (gradients.length < limit && attempts < limit * 20) {
    attempts++;

    const colorCount = rand() < 0.3 ? 3 : 2;
    const baseHue = Math.floor(rand() * 360);
    const baseSat = Math.floor(rand() * 40) + 60;
    const baseLit = Math.floor(rand() * 30) + 40;

    const hueShift = Math.floor(rand() * 120) + 30;
    const direction = rand() < 0.5 ? 1 : -1;

    const colors: string[] = [];
    const positions: number[] = [];

    for (let i = 0; i < colorCount; i++) {
      const h = (baseHue + hueShift * i * direction + 360) % 360;
      const s = Math.min(100, baseSat + Math.floor((rand() - 0.5) * 20));
      const l = Math.min(85, Math.max(25, baseLit + Math.floor((rand() - 0.5) * 30)));
      colors.push(hslToHex(h, s, l));
      positions.push(Math.round((i / (colorCount - 1)) * 100));
    }

    const cat = getCategory(baseHue);
    if (category && cat.toLowerCase() !== category.toLowerCase()) continue;

    const angle = [0, 45, 90, 135, 180, 225, 270, 315][Math.floor(rand() * 8)];

    const moodIdx = Math.floor(rand() * MOOD_NAMES.length);
    const styleIdx = Math.floor(rand() * STYLE_NAMES.length);
    const name = `${MOOD_NAMES[moodIdx]} ${STYLE_NAMES[styleIdx]}`;

    gradients.push({ name, colors, positions, angle, category: cat });
  }

  return gradients;
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "12")));
  const category = searchParams.get("category") || "";
  const search = searchParams.get("search") || "";

  let gradients = generateBatch(page, search ? limit * 3 : limit, category || undefined);

  if (search) {
    const q = search.toLowerCase();
    gradients = gradients
      .filter((g) => g.name.toLowerCase().includes(q) || g.category.toLowerCase().includes(q))
      .slice(0, limit);
  }

  return NextResponse.json({
    gradients,
    pagination: {
      page,
      limit,
      hasNext: true,
    },
    categories: ["Warm", "Yellow", "Green", "Cool", "Blue", "Purple"],
  });
}
