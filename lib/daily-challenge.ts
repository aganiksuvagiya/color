export const THEMES = [
  "Sunset over the ocean",
  "Cozy coffee shop",
  "Midnight cyberpunk city",
  "Spring garden bloom",
  "Desert dunes at dawn",
  "Retro 80s arcade",
  "Nordic winter cabin",
  "Tropical rainforest",
  "Vintage bookstore",
  "Neon night market",
  "Autumn forest walk",
  "Lavender fields",
  "Deep sea exploration",
  "Golden hour beach",
  "Mountain sunrise",
  "Candy shop",
  "Japanese zen garden",
  "Urban street art",
  "Cherry blossom festival",
  "Starry night sky",
  "Citrus orchard",
  "Arctic aurora",
  "Vintage circus",
  "Botanical greenhouse",
  "Sandy savanna",
  "Moody jazz lounge",
  "Coral reef",
  "Autumn harvest",
  "Cotton candy clouds",
  "Volcanic landscape",
] as const;

/** Calendar day key (UTC) — always real-time, used for streak/completion tracking regardless of who set the theme. */
export function getDateKey(date: Date = new Date()) {
  return date.toISOString().slice(0, 10);
}

/** Deterministic fallback theme (rotates daily) used only if the admin hasn't set one. */
export function getRotatingTheme(date: Date = new Date()) {
  const startOfYear = Date.UTC(date.getUTCFullYear(), 0, 0);
  const today = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
  const dayOfYear = Math.floor((today - startOfYear) / 86400000);
  return THEMES[dayOfYear % THEMES.length];
}
