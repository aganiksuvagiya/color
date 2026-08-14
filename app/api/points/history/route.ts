import { NextResponse } from "next/server";
import { auth, supabase } from "@/lib/auth";

export async function GET() {
  const session = await auth();
  if (!session?.user?.email) return NextResponse.json({ history: [] });

  const { data: user } = await supabase
    .from("users")
    .select("id")
    .eq("email", session.user.email)
    .single()
    .overrideTypes<{ id: string }, { merge: false }>();
  if (!user) return NextResponse.json({ history: [] });

  const { data } = await supabase
    .from("point_history")
    .select("id, action, points, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(15)
    .overrideTypes<{ id: string; action: string; points: number; created_at: string }[], { merge: false }>();

  return NextResponse.json({ history: data ?? [] });
}
