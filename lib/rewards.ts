// Client-safe reward thresholds — deliberately has no dependency on lib/auth.ts / supabase,
// so client components can import this without pulling server-only code into the bundle.
export const POINT_REWARDS = {
  UNLIMITED_SAVES: 50,
  BRAND_ANALYZER: 100,
  FIGMA_EXPORT: 200,
  PRO_ALL: 500,
} as const;

export type PointReward = keyof typeof POINT_REWARDS;

export function hasUnlocked(points: number, reward: PointReward): boolean {
  return points >= POINT_REWARDS[reward];
}

export const FREE_PALETTE_LIMIT = 10;
