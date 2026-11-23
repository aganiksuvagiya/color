"use client";

import { SessionProvider } from "next-auth/react";

// refetchOnWindowFocus off: by default every return to the tab re-fetches /api/auth/session,
// and on the Workers free plan (100,000 requests a day) each of those counts. Sign-in and
// sign-out still update the session, because next-auth broadcasts those between tabs.
export function Providers({ children }: { children: React.ReactNode }) {
  return <SessionProvider refetchOnWindowFocus={false}>{children}</SessionProvider>;
}
