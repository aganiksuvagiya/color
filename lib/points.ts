import { supabase } from "@/lib/auth";

export const POINT_ACTIONS = {
  DAILY_VISIT: 3,
  CREATE_PALETTE: 5,
  EXPORT_CSS: 5,
  SHARE_PALETTE: 15,
  SAVE_COLOR: 2,
  REFER_FRIEND: 50,
} as const;

export const POINT_REWARDS = {
  UNLIMITED_SAVES: 50,
  BRAND_ANALYZER: 100,
  FIGMA_EXPORT: 200,
  PRO_ALL: 500,
} as const;

export type PointAction = keyof typeof POINT_ACTIONS;
export type PointReward = keyof typeof POINT_REWARDS;

export async function getUserPoints(userId: string): Promise<number> {
  const { data } = await supabase
    .from("user_points")
    .select("total")
    .eq("user_id", userId)
    .single();
  return data?.total ?? 0;
}

export async function awardPoints(userId: string, action: PointAction): Promise<number> {
  const pts = POINT_ACTIONS[action];

  // Prevent duplicate daily visit points
  if (action === "DAILY_VISIT") {
    const today = new Date().toISOString().slice(0, 10);
    const { data: existing } = await supabase
      .from("point_history")
      .select("id")
      .eq("user_id", userId)
      .eq("action", action)
      .gte("created_at", today)
      .single();
    if (existing) return await getUserPoints(userId);
  }

  await supabase.from("point_history").insert({ user_id: userId, action, points: pts });

  const { data } = await supabase
    .from("user_points")
    .upsert({ user_id: userId, total: pts }, { onConflict: "user_id", ignoreDuplicates: false })
    .select("total")
    .single();

  // If row already existed, increment
  await supabase.rpc("increment_points", { uid: userId, delta: pts });

  return await getUserPoints(userId);
}

export function hasUnlocked(points: number, reward: PointReward): boolean {
  return points >= POINT_REWARDS[reward];
}
