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
];

const STYLE_NAMES = [
  "Dream", "Pulse", "Wave", "Shift", "Fade", "Bloom", "Drift",
  "Flash", "Surge", "Glow", "Spark", "Vibe", "Rush", "Flow",
  "Bliss", "Fire", "Chill", "Burst", "Gleam", "Shine",
];

const ANIMATION_TYPES = ["gradient-shift", "color-pulse", "hue-rotate"] as const;
const DIRECTIONS = ["normal", "alternate", "reverse"] as const;
const EASINGS = ["linear", "ease", "ease-in-out"] as const;

type GeneratedPreset = {
  name: string;
  colors: string[];
  type: (typeof ANIMATION_TYPES)[number];
  duration: number;
  direction: (typeof DIRECTIONS)[number];
  easing: (typeof EASINGS)[number];
};

function generateBatch(page: number, limit: number): GeneratedPreset[] {
  const presets: GeneratedPreset[] = [];
  const rand = seededRandom(page * 7919 + 40507);

  for (let i = 0; i < limit; i++) {
    const colorCount = rand() < 0.5 ? 3 : 4;
    const baseHue = Math.floor(rand() * 360);
    const baseSat = Math.floor(rand() * 35) + 55;
    const baseLit = Math.floor(rand() * 25) + 45;
    const hueShift = Math.floor(rand() * 100) + 40;
    const direction = rand() < 0.5 ? 1 : -1;

    const colors: string[] = [];
    for (let c = 0; c < colorCount; c++) {
      const h = (baseHue + hueShift * c * direction + 360) % 360;
      const s = Math.min(100, baseSat + Math.floor((rand() - 0.5) * 20));
      const l = Math.min(80, Math.max(35, baseLit + Math.floor((rand() - 0.5) * 25)));
      colors.push(hslToHex(h, s, l));
    }

    const moodIdx = Math.floor(rand() * MOOD_NAMES.length);
    const styleIdx = Math.floor(rand() * STYLE_NAMES.length);
    const name = `${MOOD_NAMES[moodIdx]} ${STYLE_NAMES[styleIdx]}`;

    presets.push({
      name,
      colors,
      type: ANIMATION_TYPES[Math.floor(rand() * ANIMATION_TYPES.length)],
      duration: Math.round((3 + rand() * 6) * 2) / 2,
      direction: DIRECTIONS[Math.floor(rand() * DIRECTIONS.length)],
      easing: EASINGS[Math.floor(rand() * EASINGS.length)],
    });
  }

  return presets;
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
  const limit = Math.min(48, Math.max(1, parseInt(searchParams.get("limit") || "8")));

  return NextResponse.json({
    presets: generateBatch(page, limit),
    pagination: { page, limit, hasNext: true },
  });
}
