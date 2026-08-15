import { NextRequest, NextResponse } from "next/server";
import { auth, supabase } from "@/lib/auth";
import { awardPoints } from "@/lib/points";

const REF_COOKIE = "hueflow_ref";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.email) return NextResponse.json({ claimed: false });

  const refId = req.cookies.get(REF_COOKIE)?.value;
  if (!refId) return NextResponse.json({ claimed: false });

  const { data: user } = await supabase
    .from("users")
    .select("id, referred_by")
    .eq("email", session.user.email)
    .single()
    .overrideTypes<{ id: string; referred_by: string | null }, { merge: false }>();
  if (!user) return NextResponse.json({ claimed: false });

  // Already claimed (or self-referral) — no-op either way.
  if (user.referred_by || refId === user.id) {
    const res = NextResponse.json({ claimed: false });
    res.cookies.delete(REF_COOKIE);
    return res;
  }

  // Referrer must be a real user.
  const { data: referrer } = await supabase
    .from("users")
    .select("id")
    .eq("id", refId)
    .single()
    .overrideTypes<{ id: string }, { merge: false }>();
  if (!referrer) {
    const res = NextResponse.json({ claimed: false });
    res.cookies.delete(REF_COOKIE);
    return res;
  }

  await supabase.from("users").update({ referred_by: refId } as never).eq("id", user.id);
  await awardPoints(refId, "REFER_FRIEND");

  const res = NextResponse.json({ claimed: true });
  res.cookies.delete(REF_COOKIE);
  return res;
}
