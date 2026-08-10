import type { Palette, PaletteColor, SemanticRole } from "./types";

export function hexToHsl(hex: string): { h: number; s: number; l: number } {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;

  if (max === min) return { h: 0, s: 0, l: Math.round(l * 100) };

  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

  let h = 0;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;

  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

export function hslToHex(h: number, s: number, l: number): string {
  const sNorm = s / 100;
  const lNorm = l / 100;
  const a = sNorm * Math.min(lNorm, 1 - lNorm);

  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = lNorm - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0");
  };

  return `#${f(0)}${f(8)}${f(4)}`;
}

const TAILWIND_STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;
const TAILWIND_LIGHTNESS_CURVE = [97, 94, 87, 78, 68, 58, 48, 39, 32, 26, 17];

export function generateTailwindScale(hex: string): { step: number; hex: string }[] {
  const { h, s, l } = hexToHsl(hex);

  let closestIndex = 0;
  let closestDiff = Infinity;
  TAILWIND_LIGHTNESS_CURVE.forEach((target, i) => {
    const diff = Math.abs(target - l);
    if (diff < closestDiff) {
      closestDiff = diff;
      closestIndex = i;
    }
  });

  return TAILWIND_STEPS.map((step, i) => ({
    step,
    hex: i === closestIndex ? hex.toLowerCase() : hslToHex(h, s, TAILWIND_LIGHTNESS_CURVE[i]),
  }));
}

export function getContrastText(hex: string): "light" | "dark" {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const toLinear = (c: number) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
  const luminance = 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);

  return luminance < 0.179 ? "light" : "dark";
}

export function isValidHex(hex: string): boolean {
  return /^#[0-9a-fA-F]{6}$/.test(hex);
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function wrapHue(hue: number): number {
  return ((hue % 360) + 360) % 360;
}

function shiftHue(hue: number, delta: number): number {
  return wrapHue(hue + delta);
}

function makeColor(name: string, role: SemanticRole, h: number, s: number, l: number): PaletteColor {
  const hex = hslToHex(h, s, l);
  return { name, hex, role, text: getContrastText(hex) };
}

// ── Human-curated color name pools ──────────────────────────────────────────

const NAME_POOLS: Record<string, string[]> = {
  red:    ["Crimson Dusk","Ember Glow","Dragon Blood","Scarlet Mist","Brick Lane","Rust Sunset","Cardinal","Vermillion","Rose Flame","Pomegranate"],
  orange: ["Amber Harvest","Copper Glaze","Bronze Dawn","Saffron Smoke","Burnt Sienna","Terracotta","Fox Tail","Cinnamon","Marmalade","Tangerine"],
  yellow: ["Honey Light","Gold Leaf","Solar Flare","Tuscan Sun","Buttercup","Goldenrod","Champagne","Citrine","Wheat Field","Lemon Drop"],
  lime:   ["Chartreuse Haze","Lime Frost","Fern Mist","Willow","Avocado","Sage Smoke","Moss Landing","Lichen","Verdant","Olive Glaze"],
  green:  ["Fern Valley","Jade Mist","Forest Breath","Shamrock","Spearmint","Celadon","Bottle Glass","Clover Field","Viridian","Old Growth"],
  teal:   ["Ocean Drift","Seafoam","Tidal Glass","Lagoon","Arctic Melt","Glacier","Marine Layer","Aquamarine","Patina","Jade Tide"],
  blue:   ["Cobalt Haze","Denim Sky","Steel Reserve","Prussian","Indigo Wash","Oxford","Wedgwood","Sapphire","Blueprint","Storm Blue"],
  purple: ["Violet Dusk","Grape Frost","Thistle","Mauve Smoke","Byzantium","Amethyst","Lavender Storm","Wisteria","Iris Field","Mulberry"],
  pink:   ["Blush Hour","Rose Quartz","Carnation","Orchid Smoke","Dusty Mauve","Fuchsia Dream","Raspberry Glaze","Peony","Flamingo","Petal"],
};

const NAMES_DARK    = ["Obsidian","Void","Onyx","Abyss","Midnight","Sable","Charcoal","Deep Space","Carbon","Iron"];
const NAMES_LIGHT   = ["Cloud Drift","Bone","Parchment","Ivory Veil","Linen","Pearl Mist","Alabaster","Ghost White","Cream","Whisper"];
const NAMES_NEUTRAL = ["Ash","Slate","Stone","Cement","Dusk","Smoke","Fog","Mineral","Pewter","Graphite"];

function hueBucket(h: number): string {
  if (h < 15 || h >= 345) return "red";
  if (h < 45)  return "orange";
  if (h < 65)  return "yellow";
  if (h < 90)  return "lime";
  if (h < 155) return "green";
  if (h < 195) return "teal";
  if (h < 250) return "blue";
  if (h < 290) return "purple";
  return "pink";
}

export function getColorName(hex: string): string {
  const { h, s, l } = hexToHsl(hex);
  if (l < 16) return NAMES_DARK[randomInt(0, NAMES_DARK.length - 1)];
  if (l > 82) return NAMES_LIGHT[randomInt(0, NAMES_LIGHT.length - 1)];
  if (s < 14) return NAMES_NEUTRAL[randomInt(0, NAMES_NEUTRAL.length - 1)];
  const pool = NAME_POOLS[hueBucket(h)];
  return pool[randomInt(0, pool.length - 1)];
}

// ── Palette labels ───────────────────────────────────────────────────────────

const PALETTE_LABELS = [
  "Studio Midnight","Iron & Ember","Dark Matter","Eclipse Edit","Shadow Workshop",
  "Golden Hour Kit","Terracotta Sessions","Sunday Warm","Copper & Sage","Desert Studio",
  "Nordic Blue","Coastal Edit","Pacific Dusk","Winter Glass","Blue Hour",
  "Sunday Paper","Morning Linen","Soft Minimalist","Open Sky","Fresh Canvas",
  "Electric Summer","Neon Garden","Vivid Tokyo","Bold Tropics","Color Rush",
  "Clay & Stone","Forest Floor","Earth Collective","Terrain","Soil & Bloom",
  "Concrete Jungle","Urban Matter","The Essentials","Base Camp","Gray District",
];

export function generateRandomPalette(): Palette {
  const baseHue = randomInt(0, 360);
  const family = randomInt(0, 3);

  const baseSat = randomInt(26, 42);
  const brandSat = clamp(baseSat + randomInt(26, 40), 58, 82);
  const brandLight = randomInt(44, 56);

  let supportHue = shiftHue(baseHue, randomInt(16, 38));
  let accentHue = shiftHue(baseHue, randomInt(138, 182));
  let warmHue = shiftHue(baseHue, randomInt(48, 76));

  if (family === 1) {
    supportHue = shiftHue(baseHue, randomInt(-36, -18));
    accentHue = shiftHue(baseHue, randomInt(150, 188));
    warmHue = shiftHue(baseHue, randomInt(62, 88));
  } else if (family === 2) {
    supportHue = shiftHue(baseHue, randomInt(82, 108));
    accentHue = shiftHue(baseHue, randomInt(168, 198));
    warmHue = shiftHue(baseHue, randomInt(34, 52));
  } else if (family === 3) {
    supportHue = shiftHue(baseHue, randomInt(24, 44));
    accentHue = shiftHue(baseHue, randomInt(-150, -118));
    warmHue = shiftHue(baseHue, randomInt(54, 84));
  }

  const baseH = baseHue, brandH = shiftHue(baseHue, randomInt(-6, 6));
  const colors: PaletteColor[] = [
    makeColor(getColorName(hslToHex(baseH, randomInt(24,40), randomInt(17,25))), "neutral", baseH, randomInt(24,40), randomInt(17,25)),
    makeColor(getColorName(hslToHex(brandH, brandSat, brandLight)), "primary", brandH, brandSat, brandLight),
    makeColor(getColorName(hslToHex(supportHue, randomInt(42,62), randomInt(42,52))), "success", supportHue, randomInt(42,62), randomInt(42,52)),
    makeColor(getColorName(hslToHex(warmHue, randomInt(72,88), randomInt(58,66))), "warning", warmHue, randomInt(72,88), randomInt(58,66)),
    makeColor(getColorName(hslToHex(accentHue, randomInt(58,76), randomInt(50,60))), "accent", accentHue, randomInt(58,76), randomInt(50,60)),
  ];

  return { label: PALETTE_LABELS[randomInt(0, PALETTE_LABELS.length - 1)], colors };
}

export function generateFromColor(seedHex: string): Palette {
  const { h, s, l } = hexToHsl(seedHex);
  const primaryH = h;
  const primaryS = clamp(s < 20 ? s + 30 : s, 45, 88);
  const primaryL = clamp(l < 35 ? 45 : l > 65 ? 55 : l, 38, 62);

  const neutralH = primaryH;
  const supportH = shiftHue(primaryH, 120);
  const warmH = shiftHue(primaryH, 38);
  const accentH = shiftHue(primaryH, 180);

  const colors: PaletteColor[] = [
    makeColor(getColorName(hslToHex(neutralH, clamp(s * 0.4, 8, 28), randomInt(14, 22))), "neutral", neutralH, clamp(s * 0.4, 8, 28), randomInt(14, 22)),
    makeColor(getColorName(seedHex), "primary", primaryH, primaryS, primaryL),
    makeColor(getColorName(hslToHex(supportH, randomInt(45, 62), randomInt(42, 52))), "success", supportH, randomInt(45, 62), randomInt(42, 52)),
    makeColor(getColorName(hslToHex(warmH, randomInt(72, 88), randomInt(58, 66))), "warning", warmH, randomInt(72, 88), randomInt(58, 66)),
    makeColor(getColorName(hslToHex(accentH, randomInt(55, 75), randomInt(50, 60))), "accent", accentH, randomInt(55, 75), randomInt(50, 60)),
  ];

  return { label: PALETTE_LABELS[randomInt(0, PALETTE_LABELS.length - 1)], colors };
}

type MoodProfile = {
  label: string;
  primaryHue: [number, number];
  primarySat: [number, number];
  primaryLight: [number, number];
  accentHue: [number, number];
  neutralLight: [number, number];
  neutralSat: [number, number];
  primaryName: string;
  accentName: string;
  neutralName: string;
};

const moodProfiles: Record<string, MoodProfile> = {
  luxury: {
    label: "Gilded Atelier",
    primaryHue: [35, 50], primarySat: [40, 65], primaryLight: [40, 55],
    accentHue: [280, 320], neutralLight: [5, 12], neutralSat: [5, 15],
    primaryName: "Gold Dust", accentName: "Violet Dusk", neutralName: "Obsidian",
  },
  skincare: {
    label: "Ritual Beauty",
    primaryHue: [15, 35], primarySat: [45, 70], primaryLight: [55, 70],
    accentHue: [330, 355], neutralLight: [6, 14], neutralSat: [8, 18],
    primaryName: "Peach Velvet", accentName: "Rose Quartz", neutralName: "Ash",
  },
  fintech: {
    label: "Capital Dark",
    primaryHue: [220, 255], primarySat: [65, 90], primaryLight: [45, 60],
    accentHue: [170, 195], neutralLight: [5, 12], neutralSat: [10, 20],
    primaryName: "Cobalt Haze", accentName: "Tidal Glass", neutralName: "Void",
  },
  saas: {
    label: "Product Studio",
    primaryHue: [250, 275], primarySat: [55, 80], primaryLight: [50, 62],
    accentHue: [15, 35], neutralLight: [6, 14], neutralSat: [5, 12],
    primaryName: "Amethyst", accentName: "Ember Glow", neutralName: "Carbon",
  },
  editorial: {
    label: "Ink & Paper",
    primaryHue: [0, 15], primarySat: [60, 85], primaryLight: [40, 55],
    accentHue: [35, 55], neutralLight: [4, 10], neutralSat: [5, 12],
    primaryName: "Vermillion", accentName: "Amber Harvest", neutralName: "Midnight",
  },
  health: {
    label: "Calm Practice",
    primaryHue: [155, 180], primarySat: [40, 65], primaryLight: [42, 58],
    accentHue: [200, 225], neutralLight: [8, 16], neutralSat: [5, 10],
    primaryName: "Sage Mist", accentName: "Ocean Drift", neutralName: "Stone",
  },
  food: {
    label: "Kitchen Table",
    primaryHue: [10, 30], primarySat: [70, 90], primaryLight: [45, 58],
    accentHue: [42, 60], neutralLight: [6, 14], neutralSat: [10, 20],
    primaryName: "Brick Lane", accentName: "Honey Light", neutralName: "Espresso",
  },
  gaming: {
    label: "Void Protocol",
    primaryHue: [260, 290], primarySat: [70, 95], primaryLight: [45, 58],
    accentHue: [50, 70], neutralLight: [4, 10], neutralSat: [8, 16],
    primaryName: "Grape Frost", accentName: "Solar Flare", neutralName: "Abyss",
  },
  nature: {
    label: "Old Growth",
    primaryHue: [85, 130], primarySat: [35, 60], primaryLight: [35, 50],
    accentHue: [25, 45], neutralLight: [8, 16], neutralSat: [8, 18],
    primaryName: "Fern Valley", accentName: "Fox Tail", neutralName: "Cement",
  },
  fashion: {
    label: "Maison Edit",
    primaryHue: [330, 355], primarySat: [50, 75], primaryLight: [45, 60],
    accentHue: [15, 40], neutralLight: [5, 12], neutralSat: [3, 10],
    primaryName: "Blush Hour", accentName: "Terracotta", neutralName: "Sable",
  },
  minimal: {
    label: "White Room",
    primaryHue: [210, 230], primarySat: [15, 35], primaryLight: [40, 55],
    accentHue: [195, 215], neutralLight: [6, 14], neutralSat: [3, 8],
    primaryName: "Mineral", accentName: "Fog", neutralName: "Iron",
  },
  playful: {
    label: "Candy Workshop",
    primaryHue: [170, 200], primarySat: [65, 90], primaryLight: [50, 62],
    accentHue: [310, 340], neutralLight: [8, 16], neutralSat: [5, 12],
    primaryName: "Aquamarine", accentName: "Fuchsia Dream", neutralName: "Denim Sky",
  },
  corporate: {
    label: "The Boardroom",
    primaryHue: [205, 225], primarySat: [50, 75], primaryLight: [38, 52],
    accentHue: [35, 55], neutralLight: [6, 14], neutralSat: [5, 12],
    primaryName: "Oxford", accentName: "Bronze Dawn", neutralName: "Graphite",
  },
  ecommerce: {
    label: "Conversion Kit",
    primaryHue: [15, 35], primarySat: [70, 90], primaryLight: [50, 62],
    accentHue: [195, 220], neutralLight: [5, 12], neutralSat: [5, 15],
    primaryName: "Copper Glaze", accentName: "Blueprint", neutralName: "Slate",
  },
  education: {
    label: "Campus Blue",
    primaryHue: [200, 230], primarySat: [55, 80], primaryLight: [48, 60],
    accentHue: [40, 60], neutralLight: [8, 16], neutralSat: [5, 10],
    primaryName: "Wedgwood", accentName: "Gold Leaf", neutralName: "Cement",
  },
};

const keywordMap: Record<string, string> = {
  luxury: "luxury", premium: "luxury", elegant: "luxury", gold: "luxury", rich: "luxury",
  skincare: "skincare", beauty: "skincare", cosmetic: "skincare", spa: "skincare", skin: "skincare",
  fintech: "fintech", finance: "fintech", bank: "fintech", crypto: "fintech", money: "fintech", payment: "fintech",
  saas: "saas", software: "saas", dashboard: "saas", tool: "saas", app: "saas", startup: "saas", tech: "saas",
  editorial: "editorial", magazine: "editorial", news: "editorial", blog: "editorial", media: "editorial", publish: "editorial",
  health: "health", wellness: "health", medical: "health", yoga: "health", fitness: "health", calm: "health", zen: "health",
  food: "food", restaurant: "food", cafe: "food", cooking: "food", recipe: "food", kitchen: "food",
  gaming: "gaming", game: "gaming", esport: "gaming", neon: "gaming", cyber: "gaming",
  nature: "nature", outdoor: "nature", eco: "nature", green: "nature", organic: "nature", earth: "nature", sustainable: "nature",
  fashion: "fashion", clothing: "fashion", apparel: "fashion", style: "fashion", runway: "fashion", boutique: "fashion",
  minimal: "minimal", clean: "minimal", simple: "minimal", modern: "minimal", mono: "minimal",
  playful: "playful", fun: "playful", kids: "playful", creative: "playful", colorful: "playful", bright: "playful", vibrant: "playful",
  corporate: "corporate", business: "corporate", enterprise: "corporate", professional: "corporate", office: "corporate",
  ecommerce: "ecommerce", shop: "ecommerce", store: "ecommerce", retail: "ecommerce", market: "ecommerce",
  education: "education", school: "education", learn: "education", university: "education", course: "education", study: "education",
};

function findMoodProfile(prompt: string): MoodProfile {
  const words = prompt.toLowerCase().split(/\s+/);
  for (const word of words) {
    for (const [keyword, mood] of Object.entries(keywordMap)) {
      if (word.includes(keyword)) {
        return moodProfiles[mood];
      }
    }
  }
  const keys = Object.keys(moodProfiles);
  return moodProfiles[keys[randomInt(0, keys.length - 1)]];
}

function randRange(range: [number, number]): number {
  return randomInt(range[0], range[1]);
}

export function generateFromPrompt(prompt: string): Palette {
  const profile = findMoodProfile(prompt);

  const successH = randomInt(120, 155), successS = randomInt(50, 75), successL = randomInt(40, 55);
  const warningH = randomInt(32, 48), warningS = randomInt(75, 95), warningL = randomInt(52, 62);

  const colors: PaletteColor[] = [
    makeColor(profile.neutralName, "neutral", randRange(profile.primaryHue), randRange(profile.neutralSat), randRange(profile.neutralLight)),
    makeColor(profile.primaryName, "primary", randRange(profile.primaryHue), randRange(profile.primarySat), randRange(profile.primaryLight)),
    makeColor(getColorName(hslToHex(successH, successS, successL)), "success", successH, successS, successL),
    makeColor(getColorName(hslToHex(warningH, warningS, warningL)), "warning", warningH, warningS, warningL),
    makeColor(profile.accentName, "accent", randRange(profile.accentHue), randomInt(50, 80), randomInt(48, 62)),
  ];

  return { label: profile.label, colors };
}
