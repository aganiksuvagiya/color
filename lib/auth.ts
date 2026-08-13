import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET,
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
        },
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
