import type { Palette } from "./types";
import { hexToHsl } from "./color-utils";

// ── Color Psychology ────────────────────────────────────────────────────────

export type PsychologyTag = { label: string; emoji: string };

export function getColorPsychology(hex: string): PsychologyTag[] {
  const { h, s, l } = hexToHsl(hex);

  if (s < 12) {
    if (l < 25) return [{ label: "Sophisticated", emoji: "🖤" }, { label: "Premium", emoji: "✨" }];
    if (l > 75) return [{ label: "Clean", emoji: "🤍" }, { label: "Fresh", emoji: "🌿" }];
    return [{ label: "Neutral", emoji: "⚖️" }, { label: "Professional", emoji: "💼" }];
  }

  const tags: PsychologyTag[] = [];

  if (h < 15 || h >= 345) tags.push({ label: "Energy", emoji: "⚡" }, { label: "Passion", emoji: "❤️" });
  else if (h < 45) tags.push({ label: "Warmth", emoji: "🌅" }, { label: "Creativity", emoji: "🎨" });
  else if (h < 70) tags.push({ label: "Optimism", emoji: "☀️" }, { label: "Happiness", emoji: "😊" });
  else if (h < 155) tags.push({ label: "Growth", emoji: "🌱" }, { label: "Harmony", emoji: "🍃" });
  else if (h < 195) tags.push({ label: "Calm", emoji: "🌊" }, { label: "Trust", emoji: "🤝" });
  else if (h < 250) tags.push({ label: "Trust", emoji: "💙" }, { label: "Intelligence", emoji: "🔷" });
  else if (h < 290) tags.push({ label: "Luxury", emoji: "💜" }, { label: "Mystery", emoji: "🌙" });
  else tags.push({ label: "Romance", emoji: "🌸" }, { label: "Playfulness", emoji: "🎀" });

  if (s > 80) tags.push({ label: "Bold", emoji: "💥" });
  else if (s < 35) tags.push({ label: "Subtle", emoji: "🌫️" });

  if (l < 22) tags.push({ label: "Deep", emoji: "🌑" });
  else if (l > 75) tags.push({ label: "Light", emoji: "☁️" });

  return tags.slice(0, 3);
}

// ── Industry Fit Score ──────────────────────────────────────────────────────

type IndustryProfile = {
  name: string;
  emoji: string;
  preferredHues: [number, number][];
  satRange: [number, number];
  lightRange: [number, number];
  darkBaseBonus: boolean;
};

const INDUSTRIES: IndustryProfile[] = [
  { name: "Fintech", emoji: "💳", preferredHues: [[200, 260]], satRange: [55, 90], lightRange: [40, 65], darkBaseBonus: true },
  { name: "SaaS / Tech", emoji: "⚙️", preferredHues: [[245, 280], [200, 230]], satRange: [50, 85], lightRange: [45, 65], darkBaseBonus: true },
  { name: "Healthcare", emoji: "🏥", preferredHues: [[150, 210]], satRange: [35, 65], lightRange: [45, 70], darkBaseBonus: false },
  { name: "Food & Restaurant", emoji: "🍽️", preferredHues: [[5, 45]], satRange: [65, 95], lightRange: [40, 65], darkBaseBonus: false },
  { name: "Luxury / Fashion", emoji: "💎", preferredHues: [[280, 340], [30, 55]], satRange: [35, 70], lightRange: [35, 60], darkBaseBonus: true },
  { name: "Gaming", emoji: "🎮", preferredHues: [[260, 300], [170, 200]], satRange: [70, 100], lightRange: [40, 65], darkBaseBonus: true },
  { name: "E-commerce", emoji: "🛒", preferredHues: [[0, 30], [195, 230]], satRange: [65, 95], lightRange: [45, 65], darkBaseBonus: false },
  { name: "Education", emoji: "📚", preferredHues: [[200, 250]], satRange: [50, 80], lightRange: [45, 65], darkBaseBonus: false },
  { name: "Creative Agency", emoji: "🎨", preferredHues: [[0, 360]], satRange: [60, 100], lightRange: [45, 70], darkBaseBonus: false },
  { name: "Nature / Eco", emoji: "🌿", preferredHues: [[80, 165]], satRange: [35, 65], lightRange: [35, 60], darkBaseBonus: false },
];

function hueInRange(h: number, ranges: [number, number][]): boolean {
  return ranges.some(([min, max]) => {
    if (min === 0 && max === 360) return true;
    return h >= min && h <= max;
  });
}

function clamp01(v: number): number {
  return Math.max(0, Math.min(1, v));
}

export type IndustryScore = { name: string; emoji: string; score: number };

export function getIndustryFitScores(palette: Palette): IndustryScore[] {
  const hslColors = palette.colors.map(c => hexToHsl(c.hex));

  return INDUSTRIES.map(industry => {
    let total = 0;
    let count = 0;

    for (const hsl of hslColors) {
      const hueMatch = hueInRange(hsl.h, industry.preferredHues) ? 1 : 0.2;
      const sMid = (industry.satRange[0] + industry.satRange[1]) / 2;
      const sScore = clamp01(1 - Math.abs(hsl.s - sMid) / 40);
      const lMid = (industry.lightRange[0] + industry.lightRange[1]) / 2;
      const lScore = clamp01(1 - Math.abs(hsl.l - lMid) / 35);
      total += hueMatch * 0.5 + sScore * 0.25 + lScore * 0.25;
      count++;
    }

    if (industry.darkBaseBonus) {
      const hasDark = hslColors.some(c => c.l < 20);
      total += hasDark ? 0.5 : 0;
      count += 0.5;
    }

    const raw = count > 0 ? total / count : 0;
    return { name: industry.name, emoji: industry.emoji, score: Math.round(clamp01(raw) * 100) };
  }).sort((a, b) => b.score - a.score);
}

// ── Brand Matches ───────────────────────────────────────────────────────────

type BrandEntry = {
  name: string;
  hue: number;
  satMin: number;
  lightMid: number;
  description: string;
};

const BRANDS: BrandEntry[] = [
  { name: "Stripe", hue: 255, satMin: 50, lightMid: 55, description: "Payments infra" },
  { name: "Notion", hue: 225, satMin: 5, lightMid: 12, description: "Productivity" },
  { name: "Linear", hue: 248, satMin: 60, lightMid: 57, description: "Issue tracker" },
  { name: "Figma", hue: 265, satMin: 55, lightMid: 57, description: "Design tool" },
  { name: "Slack", hue: 267, satMin: 55, lightMid: 50, description: "Team messaging" },
  { name: "Twitter / X", hue: 205, satMin: 80, lightMid: 52, description: "Social platform" },
  { name: "Airbnb", hue: 350, satMin: 75, lightMid: 52, description: "Travel & stays" },
  { name: "Netflix", hue: 3, satMin: 85, lightMid: 49, description: "Streaming" },
  { name: "Spotify", hue: 141, satMin: 70, lightMid: 47, description: "Music streaming" },
  { name: "WhatsApp", hue: 142, satMin: 60, lightMid: 45, description: "Messaging" },
  { name: "Snapchat", hue: 52, satMin: 95, lightMid: 62, description: "Social camera" },
  { name: "LinkedIn", hue: 211, satMin: 75, lightMid: 45, description: "Professional network" },
  { name: "Dropbox", hue: 215, satMin: 75, lightMid: 55, description: "Cloud storage" },
  { name: "Vercel", hue: 0, satMin: 0, lightMid: 10, description: "Deployment" },
  { name: "Shopify", hue: 148, satMin: 50, lightMid: 46, description: "E-commerce" },
  { name: "HubSpot", hue: 18, satMin: 85, lightMid: 55, description: "CRM" },
  { name: "Mailchimp", hue: 48, satMin: 85, lightMid: 59, description: "Email marketing" },
  { name: "Asana", hue: 350, satMin: 75, lightMid: 57, description: "Project mgmt" },
  { name: "Intercom", hue: 225, satMin: 65, lightMid: 55, description: "Customer support" },
  { name: "Notion", hue: 225, satMin: 5, lightMid: 12, description: "Productivity" },
];

function hueDist(a: number, b: number): number {
  const d = Math.abs(a - b) % 360;
  return d > 180 ? 360 - d : d;
}

export type BrandMatch = { name: string; description: string; similarity: number };

export function getBrandMatches(palette: Palette): BrandMatch[] {
  const hslColors = palette.colors.map(c => hexToHsl(c.hex));
  const seen = new Set<string>();

  return BRANDS
    .map(brand => {
      if (seen.has(brand.name)) return null;
      seen.add(brand.name);

      let best = 0;
      for (const hsl of hslColors) {
        const hueSim = clamp01(1 - hueDist(hsl.h, brand.hue) / 60);
        const satSim = hsl.s >= brand.satMin ? 1 : clamp01(hsl.s / Math.max(brand.satMin, 1));
        const lSim = clamp01(1 - Math.abs(hsl.l - brand.lightMid) / 25);
        const sim = hueSim * 0.6 + satSim * 0.2 + lSim * 0.2;
        if (sim > best) best = sim;
      }
      return { name: brand.name, description: brand.description, similarity: Math.round(best * 100) };
    })
    .filter((b): b is BrandMatch => b !== null && b.similarity >= 45)
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, 4);
}

// ── Palette Story ───────────────────────────────────────────────────────────

export function getPaletteStory(palette: Palette): string {
  const hslColors = palette.colors.map(c => hexToHsl(c.hex));
  const avgSat = hslColors.reduce((s, c) => s + c.s, 0) / hslColors.length;
  const avgLight = hslColors.reduce((s, c) => s + c.l, 0) / hslColors.length;
  const hasDark = hslColors.some(c => c.l < 22);
  const hasWarm = hslColors.some(c => c.h < 60 || c.h > 330);
  const hasCool = hslColors.some(c => c.h >= 150 && c.h <= 280);
  const hasLight = hslColors.some(c => c.l > 78);
  const dominant = hslColors.reduce((a, b) => a.s > b.s ? a : b);
  const h = dominant.h;

  // Mood buckets
  const isBold = avgSat > 65 && hasDark;
  const isVibrant = avgSat > 65 && !hasDark;
  const isMinimal = avgSat < 22;
  const isWarm = hasWarm && avgSat > 40;
  const isCool = hasCool && avgLight > 48;
  const isEarthy = h >= 20 && h <= 90 && avgSat > 30 && avgSat < 62;

  if (isBold) {
    return `Dark base, saturated accents - this palette doesn't ask for attention, it commands it. Built for brands that mean business: tech, premium fashion, anything that needs to feel expensive and deliberate. The contrast is doing the work here.`;
  }
  if (isVibrant) {
    const warmNote = hasWarm ? " The warm tones push it toward energy and appetite - great for consumer products and campaigns." : " The cool edge keeps it from feeling chaotic - it's expressive without losing structure.";
    return `Unapologetically saturated. This palette has range - it can anchor a landing page or carry an entire brand identity without going flat.${warmNote}`;
  }
  if (isMinimal) {
    const lightNote = hasLight ? " The near-whites hold the composition open; nothing feels crowded." : " The midtones give it texture without noise.";
    return `Quiet confidence. This palette strips color back to its essentials - the kind of restraint that signals taste rather than timidity.${lightNote} Ideal for editorial work, luxury goods, or any design where silence is the loudest statement.`;
  }
  if (isEarthy) {
    return `Rooted in the natural spectrum - ochres, siennas, organic greens. This palette feels hand-mixed rather than algorithmically generated. It carries warmth without being loud, depth without being dark. Strong fit for food, wellness, and brands that want to feel handcrafted.`;
  }
  if (isCool) {
    return `Clean, considered, professional. The cool hues push this toward clarity and focus - the kind of palette a fintech company or a healthcare brand would trust. Pairs well with generous whitespace and minimal UI patterns.`;
  }
  if (isWarm) {
    return `There's heat in this palette - warm primaries with enough variation to keep it interesting. It reads as welcoming and high-energy without tipping into chaos. A natural fit for hospitality, food, and direct-to-consumer brands that need to feel human.`;
  }

  // Fallback: balanced
  return `A well-considered range - enough contrast to be functional, enough variety to carry a full brand system. This palette works across contexts: marketing, product, editorial. It's the kind of foundation a design system is built on.`;
}

// ── Font Pairings ───────────────────────────────────────────────────────────

export type FontPair = {
  heading: string;
  body: string;
  mono?: string;
  style: string;
};

const FONT_PAIRS: FontPair[] = [
  { heading: "Playfair Display", body: "Source Sans 3", style: "Editorial & Elegant" },
  { heading: "Inter", body: "Inter", mono: "JetBrains Mono", style: "Modern & Technical" },
  { heading: "Cormorant Garamond", body: "Raleway", style: "Luxury & Refined" },
  { heading: "Nunito", body: "Nunito", style: "Playful & Friendly" },
  { heading: "Roboto", body: "Roboto", style: "Corporate & Clean" },
  { heading: "DM Sans", body: "DM Sans", mono: "DM Mono", style: "Minimal & Sharp" },
  { heading: "Merriweather", body: "Lato", style: "Classic & Readable" },
  { heading: "Rajdhani", body: "Exo 2", style: "Gaming & Dynamic" },
  { heading: "Abril Fatface", body: "Lato", style: "Bold & Expressive" },
  { heading: "Fraunces", body: "Figtree", style: "Warm & Contemporary" },
];

export function getFontPairings(palette: Palette): FontPair[] {
  const hslColors = palette.colors.map(c => hexToHsl(c.hex));
  const avgSat = hslColors.reduce((s, c) => s + c.s, 0) / hslColors.length;
  const avgLight = hslColors.reduce((s, c) => s + c.l, 0) / hslColors.length;
  const hasDark = hslColors.some(c => c.l < 22);
  const dominant = hslColors.reduce((a, b) => a.s > b.s ? a : b);
  const h = dominant.h;

  const scores = FONT_PAIRS.map((_, i) => {
    let score = 0;
    if (i === 0 && (avgSat < 55 || (h > 280 && h < 340))) score += 3;  // Editorial
    if (i === 1 && h >= 200 && h <= 265 && avgSat > 55) score += 3;     // Modern tech
    if (i === 2 && hasDark && avgSat < 60) score += 3;                   // Luxury
    if (i === 3 && avgSat > 65 && avgLight > 50) score += 3;             // Playful
    if (i === 4 && avgSat > 50 && avgLight < 55 && h >= 200) score += 3; // Corporate
    if (i === 5 && avgSat < 40) score += 3;                              // Minimal
    if (i === 6 && h >= 80 && h <= 165) score += 3;                      // Nature/classic
    if (i === 7 && hasDark && avgSat > 65 && h >= 245 && h <= 300) score += 3; // Gaming
    if (i === 8 && avgSat > 70 && (h < 40 || h > 330)) score += 3;      // Bold
    if (i === 9 && avgSat > 45 && avgSat < 70 && avgLight > 45) score += 3; // Warm
    return score;
  });

  return FONT_PAIRS
    .map((pair, i) => ({ pair, score: scores[i] }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(x => x.pair);
}
