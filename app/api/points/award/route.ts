import { NextResponse } from "next/server";
import { auth, supabase } from "@/lib/auth";
import { awardPoints, type PointAction } from "@/lib/points";

// Only these client-triggered actions are allowed here. CREATE_PALETTE is awarded
// server-side on actual insert (see app/api/palettes/route.ts), and DAILY_CHALLENGE
// has its own dedicated endpoint — neither should be reachable from this one.
const ALLOWED_ACTIONS: PointAction[] = ["EXPORT_CSS", "SHARE_PALETTE", "DAILY_VISIT"];

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => null);
  const action = body?.action;
  if (typeof action !== "string" || !ALLOWED_ACTIONS.includes(action as PointAction)) {
    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  }

  const { data: user } = await supabase
    .from("users")
    .select("id")
    .eq("email", session.user.email)
    .single()
    .overrideTypes<{ id: string }, { merge: false }>();
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const total = await awardPoints(user.id, action as PointAction);
  return NextResponse.json({ total });
}
