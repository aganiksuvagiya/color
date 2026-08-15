import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { supabase } from "@/lib/auth";
import { awardPoints, getUserPoints } from "@/lib/points";
import { hasUnlocked, FREE_PALETTE_LIMIT } from "@/lib/rewards";

export async function GET() {
  const session = await auth();
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: user } = await supabase.from("users").select("id").eq("email", session.user.email).single().overrideTypes<{ id: string }, { merge: false }>();
  if (!user) return NextResponse.json({ palettes: [] });

  const { data } = await supabase
    .from("palettes")
    .select("id, name, colors, created_at, is_public")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return NextResponse.json({ palettes: data ?? [] });
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { name, colors } = body;
  if (!colors) return NextResponse.json({ error: "colors required" }, { status: 400 });

  const { data: user } = await supabase.from("users").select("id").eq("email", session.user.email).single().overrideTypes<{ id: string }, { merge: false }>();
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const points = await getUserPoints(user.id);
  if (!hasUnlocked(points, "UNLIMITED_SAVES")) {
    const { count } = await supabase.from("palettes").select("id", { count: "exact", head: true }).eq("user_id", user.id);
    if ((count ?? 0) >= FREE_PALETTE_LIMIT) {
      return NextResponse.json(
        {
          error: `Free plan is limited to ${FREE_PALETTE_LIMIT} saved palettes. Earn more points to unlock unlimited saves.`,
          locked: true,
          points,
          required: 50,
        },
        { status: 403 }
      );
    }
  }

  const { data, error } = await supabase
    .from("palettes")
    .insert({ user_id: user.id, email: session.user.email, name: name ?? "Untitled", colors } as never)
    .select()
    .single();

  if (error) {
    console.error("[palettes] insert error:", error);
    return NextResponse.json({ error: "Failed to save palette" }, { status: 500 });
  }

  await awardPoints(user.id, "CREATE_PALETTE");
  return NextResponse.json({ palette: data });
}

export async function PATCH(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => null);
  const id = typeof body?.id === "string" ? body.id : "";
  const isPublic = typeof body?.isPublic === "boolean" ? body.isPublic : null;
  if (!id || isPublic === null) return NextResponse.json({ error: "id and isPublic required" }, { status: 400 });

  const { data: user } = await supabase.from("users").select("id").eq("email", session.user.email).single().overrideTypes<{ id: string }, { merge: false }>();
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const { error } = await supabase
    .from("palettes")
    .update({ is_public: isPublic } as never)
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    console.error("[palettes] update error:", error);
    return NextResponse.json({ error: "Failed to update palette" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

  const { data: user } = await supabase.from("users").select("id").eq("email", session.user.email).single().overrideTypes<{ id: string }, { merge: false }>();
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  await supabase.from("palettes").delete().eq("id", id).eq("user_id", user.id);
  return NextResponse.json({ success: true });
}
