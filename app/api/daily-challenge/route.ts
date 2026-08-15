import { NextResponse } from "next/server";
import { auth, supabase } from "@/lib/auth";
import { awardPoints, getStreakInfo } from "@/lib/points";
import { getDateKey, getRotatingTheme } from "@/lib/daily-challenge";
import { getClientIp, isRateLimited } from "@/lib/rate-limit";

async function getCurrentTheme() {
  const { data } = await supabase
    .from("daily_challenge")
    .select("theme")
    .eq("id", 1)
    .maybeSingle()
    .overrideTypes<{ theme: string } | null, { merge: false }>();
  return data?.theme ?? getRotatingTheme();
}

async function getTodayCount(dateKey: string) {
  const { data } = await supabase
    .from("daily_challenge_tries")
    .select("count")
    .eq("try_date", dateKey)
    .maybeSingle()
    .overrideTypes<{ count: number } | null, { merge: false }>();
  return data?.count ?? 0;
}

async function getUser(email: string) {
  const { data } = await supabase
    .from("users")
    .select("id")
    .eq("email", email)
    .single()
    .overrideTypes<{ id: string }, { merge: false }>();
  return data;
}

export async function GET() {
  const dateKey = getDateKey();
  const [theme, todayCount] = await Promise.all([getCurrentTheme(), getTodayCount(dateKey)]);

  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ theme, dateKey, todayCount, completedToday: false, streak: 0, signedIn: false });
  }

  const user = await getUser(session.user.email);
  if (!user) {
    return NextResponse.json({ theme, dateKey, todayCount, completedToday: false, streak: 0, signedIn: true });
  }

  const { streak, streakDate } = await getStreakInfo(user.id);
  return NextResponse.json({ theme, dateKey, todayCount, completedToday: streakDate === dateKey, streak, signedIn: true });
}

/** Registers a "try" — works with or without a session. Counter always moves; points/streak only apply if signed in. */
export async function POST(req: Request) {
  if (isRateLimited(`daily-challenge:${getClientIp(req)}`, 20, 60_000)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const dateKey = getDateKey();

  await supabase.rpc("increment_challenge_tries" as never, { d: dateKey } as never);

  const session = await auth();
  if (session?.user?.email) {
    const user = await getUser(session.user.email);
    if (user) {
      const { streakDate } = await getStreakInfo(user.id);
      if (streakDate !== dateKey) await awardPoints(user.id, "DAILY_CHALLENGE");
    }
  }

  return NextResponse.json({ ok: true });
}
