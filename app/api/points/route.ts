import { NextResponse } from "next/server";
import { auth, supabase } from "@/lib/auth";
import { getUserPoints } from "@/lib/points";

export async function GET() {
  const session = await auth();
  if (!session?.user?.email) return NextResponse.json({ signedIn: false, total: 0 });

  const { data: user } = await supabase
    .from("users")
    .select("id")
    .eq("email", session.user.email)
    .single()
    .overrideTypes<{ id: string }, { merge: false }>();
  if (!user) return NextResponse.json({ signedIn: true, total: 0 });

  const total = await getUserPoints(user.id);
  return NextResponse.json({ signedIn: true, total });
}
