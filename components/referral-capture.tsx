"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

const REF_COOKIE = "hueflow_ref";

export function ReferralCapture() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const ref = searchParams.get("ref");
    if (!ref) return;
    if (document.cookie.includes(`${REF_COOKIE}=`)) return;
    const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = `${REF_COOKIE}=${encodeURIComponent(ref)}; expires=${expires}; path=/; SameSite=Lax`;
  }, [searchParams]);

  return null;
}
