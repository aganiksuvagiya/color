import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createClient } from "@supabase/supabase-js";
import type { NextRequest } from "next/server";

let _supabase: ReturnType<typeof createClient> | undefined;
function getSupabase() {
  // Lazily created: on Cloudflare Workers, secrets aren't guaranteed to be
  // populated into process.env yet at module top-level evaluation time.
  _supabase ??= createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  return _supabase;
}
export const supabase = new Proxy({} as ReturnType<typeof createClient>, {
  get(_target, prop, _receiver) {
    const client = getSupabase();
    const value = Reflect.get(client, prop, client);
    return typeof value === "function" ? value.bind(client) : value;
  },
});

function createNextAuth() {
  return NextAuth({
    secret: process.env.AUTH_SECRET,
    trustHost: true,
    providers: [
      Google({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      }),
    ],
    callbacks: {
      async signIn({ user, profile }) {
        if (!user.email) return false;
        const { error } = await supabase.from("users").upsert(
          {
            email: user.email,
            name: user.name ?? profile?.name ?? null,
            image: user.image ?? (profile?.picture as string) ?? null,
            emailVerified: new Date().toISOString(),
          } as never,
          { onConflict: "email" }
        );
        if (error) console.error("[auth] supabase upsert error:", error);
        return true;
      },
      async session({ session, token }) {
        if (token.sub) session.user.id = token.sub;
        return session;
      },
      async jwt({ token, user }) {
        if (user) token.sub = user.id;
        return token;
      },
    },
  });
}

// Lazily created for the same reason as `supabase` above: secrets may not be
// populated into process.env yet at module top-level evaluation time.
let _nextAuth: ReturnType<typeof createNextAuth> | undefined;
function nextAuth() {
  _nextAuth ??= createNextAuth();
  return _nextAuth;
}

export const handlers = {
  GET: (req: NextRequest) => nextAuth().handlers.GET(req),
  POST: (req: NextRequest) => nextAuth().handlers.POST(req),
};
export const auth: ReturnType<typeof createNextAuth>["auth"] =
  ((...args: Parameters<ReturnType<typeof createNextAuth>["auth"]>) =>
    (nextAuth().auth as (...a: typeof args) => ReturnType<ReturnType<typeof createNextAuth>["auth"]>)(...args)) as ReturnType<typeof createNextAuth>["auth"];
export const signIn: ReturnType<typeof createNextAuth>["signIn"] =
  ((...args: Parameters<ReturnType<typeof createNextAuth>["signIn"]>) =>
    (nextAuth().signIn as (...a: typeof args) => ReturnType<ReturnType<typeof createNextAuth>["signIn"]>)(...args)) as ReturnType<typeof createNextAuth>["signIn"];
export const signOut: ReturnType<typeof createNextAuth>["signOut"] =
  ((...args: Parameters<ReturnType<typeof createNextAuth>["signOut"]>) =>
    (nextAuth().signOut as (...a: typeof args) => ReturnType<ReturnType<typeof createNextAuth>["signOut"]>)(...args)) as ReturnType<typeof createNextAuth>["signOut"];
