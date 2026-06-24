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

function makeColor(name: string, role: SemanticRole, h: number, s: number, l: number): PaletteColor {
  const hex = hslToHex(h, s, l);
  return { name, hex, role, text: getContrastText(hex) };
}

export function generateRandomPalette(): Palette {
  const baseHue = randomInt(0, 360);

  const colors: PaletteColor[] = [
    makeColor("Deep Base", "neutral", baseHue, randomInt(8, 15), randomInt(6, 12)),
    makeColor("Brand", "primary", baseHue, randomInt(55, 85), randomInt(45, 60)),
    makeColor("Growth", "success", randomInt(110, 155), randomInt(55, 80), randomInt(42, 55)),
    makeColor("Alert", "warning", randomInt(30, 48), randomInt(80, 95), randomInt(55, 65)),
    makeColor("Pop", "accent", (baseHue + randomInt(120, 200)) % 360, randomInt(55, 80), randomInt(50, 65)),
  ];

  const labels = [
    "Bold digital brand",
    "Modern product palette",
    "Creative studio tones",
    "Fresh interface kit",
    "Vibrant app system",
    "Clean design tokens",
  ];

  return { label: labels[randomInt(0, labels.length - 1)], colors };
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
    label: "Luxury brand",
    primaryHue: [35, 50], primarySat: [40, 65], primaryLight: [40, 55],
    accentHue: [280, 320], neutralLight: [5, 12], neutralSat: [5, 15],
    primaryName: "Golden Hour", accentName: "Royal Plum", neutralName: "Onyx",
  },
  skincare: {
    label: "Skincare line",
    primaryHue: [15, 35], primarySat: [45, 70], primaryLight: [55, 70],
    accentHue: [330, 355], neutralLight: [6, 14], neutralSat: [8, 18],
    primaryName: "Warm Peach", accentName: "Soft Rose", neutralName: "Charcoal",
  },
  fintech: {
    label: "Fintech app",
    primaryHue: [220, 255], primarySat: [65, 90], primaryLight: [45, 60],
    accentHue: [170, 195], neutralLight: [5, 12], neutralSat: [10, 20],
    primaryName: "Deep Indigo", accentName: "Teal Mint", neutralName: "Slate",
  },
  saas: {
    label: "SaaS platform",
    primaryHue: [250, 275], primarySat: [55, 80], primaryLight: [50, 62],
    accentHue: [15, 35], neutralLight: [6, 14], neutralSat: [5, 12],
    primaryName: "Vivid Purple", accentName: "Warm Coral", neutralName: "Dark Ink",
  },
  editorial: {
    label: "Editorial design",
    primaryHue: [0, 15], primarySat: [60, 85], primaryLight: [40, 55],
    accentHue: [35, 55], neutralLight: [4, 10], neutralSat: [5, 12],
    primaryName: "Crimson Red", accentName: "Burnt Gold", neutralName: "Rich Black",
  },
  health: {
    label: "Health & wellness",
    primaryHue: [155, 180], primarySat: [40, 65], primaryLight: [42, 58],
    accentHue: [200, 225], neutralLight: [8, 16], neutralSat: [5, 10],
    primaryName: "Calm Sage", accentName: "Sky Blue", neutralName: "Deep Forest",
  },
  food: {
    label: "Food & restaurant",
    primaryHue: [10, 30], primarySat: [70, 90], primaryLight: [45, 58],
    accentHue: [42, 60], neutralLight: [6, 14], neutralSat: [10, 20],
    primaryName: "Tomato Red", accentName: "Mustard Gold", neutralName: "Espresso",
  },
  gaming: {
    label: "Gaming studio",
    primaryHue: [260, 290], primarySat: [70, 95], primaryLight: [45, 58],
    accentHue: [50, 70], neutralLight: [4, 10], neutralSat: [8, 16],
    primaryName: "Neon Violet", accentName: "Electric Yellow", neutralName: "Void Black",
  },
  nature: {
    label: "Nature & outdoor",
    primaryHue: [85, 130], primarySat: [35, 60], primaryLight: [35, 50],
    accentHue: [25, 45], neutralLight: [8, 16], neutralSat: [8, 18],
    primaryName: "Forest Green", accentName: "Earth Brown", neutralName: "Bark",
  },
  fashion: {
    label: "Fashion brand",
    primaryHue: [330, 355], primarySat: [50, 75], primaryLight: [45, 60],
    accentHue: [15, 40], neutralLight: [5, 12], neutralSat: [3, 10],
    primaryName: "Blush Pink", accentName: "Warm Sand", neutralName: "Jet Black",
  },
  minimal: {
    label: "Minimal design",
    primaryHue: [210, 230], primarySat: [15, 35], primaryLight: [40, 55],
    accentHue: [195, 215], neutralLight: [6, 14], neutralSat: [3, 8],
    primaryName: "Muted Steel", accentName: "Cool Gray", neutralName: "Near Black",
  },
  playful: {
    label: "Playful brand",
    primaryHue: [170, 200], primarySat: [65, 90], primaryLight: [50, 62],
    accentHue: [310, 340], neutralLight: [8, 16], neutralSat: [5, 12],
    primaryName: "Bright Cyan", accentName: "Hot Pink", neutralName: "Deep Navy",
  },
  corporate: {
    label: "Corporate identity",
    primaryHue: [205, 225], primarySat: [50, 75], primaryLight: [38, 52],
    accentHue: [35, 55], neutralLight: [6, 14], neutralSat: [5, 12],
    primaryName: "Trust Blue", accentName: "Warm Amber", neutralName: "Graphite",
  },
  ecommerce: {
    label: "E-commerce store",
    primaryHue: [15, 35], primarySat: [70, 90], primaryLight: [50, 62],
    accentHue: [195, 220], neutralLight: [5, 12], neutralSat: [5, 15],
    primaryName: "Action Orange", accentName: "Cool Steel", neutralName: "Dark Slate",
  },
  education: {
    label: "Education platform",
    primaryHue: [200, 230], primarySat: [55, 80], primaryLight: [48, 60],
    accentHue: [40, 60], neutralLight: [8, 16], neutralSat: [5, 10],
    primaryName: "Scholar Blue", accentName: "Pencil Gold", neutralName: "Chalkboard",
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

  const colors: PaletteColor[] = [
    makeColor(profile.neutralName, "neutral", randRange(profile.primaryHue), randRange(profile.neutralSat), randRange(profile.neutralLight)),
    makeColor(profile.primaryName, "primary", randRange(profile.primaryHue), randRange(profile.primarySat), randRange(profile.primaryLight)),
    makeColor("Fresh Green", "success", randomInt(120, 155), randomInt(50, 75), randomInt(40, 55)),
    makeColor("Warm Amber", "warning", randomInt(32, 48), randomInt(75, 95), randomInt(52, 62)),
    makeColor(profile.accentName, "accent", randRange(profile.accentHue), randomInt(50, 80), randomInt(48, 62)),
  ];

  return { label: profile.label, colors };
}
