import { supabase } from "@/lib/auth";

export const POINT_ACTIONS = {
  DAILY_VISIT: 3,
  CREATE_PALETTE: 5,
  EXPORT_CSS: 5,
  SHARE_PALETTE: 15,
  SAVE_COLOR: 2,
  REFER_FRIEND: 50,
  DAILY_CHALLENGE: 10,
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
    .single()
    .overrideTypes<{ total: number }, { merge: false }>();
  return data?.total ?? 0;
}

export async function getStreakInfo(userId: string): Promise<{ streak: number; streakDate: string | null }> {
  const { data } = await supabase
    .from("user_points")
    .select("streak, streak_date")
    .eq("user_id", userId)
    .maybeSingle()
    .overrideTypes<{ streak: number; streak_date: string | null } | null, { merge: false }>();
  return { streak: data?.streak ?? 0, streakDate: data?.streak_date ?? null };
}

async function bumpStreak(userId: string): Promise<void> {
  const today = new Date().toISOString().slice(0, 10);
  const { streak, streakDate } = await getStreakInfo(userId);
  if (streakDate === today) return; // already bumped today

  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  const nextStreak = streakDate === yesterday ? streak + 1 : 1;

  await supabase
    .from("user_points")
    .upsert({ user_id: userId, streak: nextStreak, streak_date: today } as never, { onConflict: "user_id" });
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
      .single()
      .overrideTypes<{ id: string }, { merge: false }>();
    if (existing) return await getUserPoints(userId);
  }

  await supabase.from("point_history").insert({ user_id: userId, action, points: pts } as never);

  const { data } = await supabase
    .from("user_points")
    .upsert({ user_id: userId, total: pts } as never, { onConflict: "user_id", ignoreDuplicates: false })
    .select("total")
    .single()
    .overrideTypes<{ total: number }, { merge: false }>();

  // If row already existed, increment
  await supabase.rpc("increment_points" as never, { uid: userId, delta: pts } as never);

  if (action === "DAILY_CHALLENGE") await bumpStreak(userId);

  return await getUserPoints(userId);
}

export function hasUnlocked(points: number, reward: PointReward): boolean {
  return points >= POINT_REWARDS[reward];
}
