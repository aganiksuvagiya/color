"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

type ChallengeData = {
  theme: string;
  dateKey: string;
  todayCount: number;
  completedToday: boolean;
  streak: number;
  signedIn: boolean;
};

const TRIED_KEY_PREFIX = "hueflow-challenge-tried-";

export function DailyChallengeBanner() {
  const { status } = useSession();
  const [data, setData] = useState<ChallengeData | null>(null);

  useEffect(() => {
    fetch("/api/daily-challenge")
      .then((r) => r.json())
      .then(setData)
      .catch(() => {});
  }, [status]);

  function handleTryClick() {
    if (!data) return;
    const key = TRIED_KEY_PREFIX + data.dateKey;
    if (typeof window !== "undefined" && localStorage.getItem(key)) return;
    fetch("/api/daily-challenge", { method: "POST" })
      .then((res) => {
        if (res.ok && typeof window !== "undefined") localStorage.setItem(key, "1");
      })
      .catch(() => {});
  }

  if (!data) return null;

  return (
    <div className="mx-auto mt-6 max-w-[1400px] rounded-[24px] border border-black/8 bg-white p-5 shadow-[0_2px_16px_rgba(28,23,18,0.04)] sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-5">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#e8531f]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#e8531f]">
            Today&apos;s Challenge
          </div>
          <div className="mt-2.5 text-lg font-semibold text-[#1c1712] sm:text-xl">{data.theme}</div>
          <div className="mt-1.5 text-sm text-[#1c1712]/50">
            {data.todayCount} {data.todayCount === 1 ? "person has" : "people have"} tried it today
            {data.signedIn && data.streak > 0 && <> · 🔥 {data.streak}-day streak</>}
          </div>
        </div>
        <Link
          href={`/generator?theme=${encodeURIComponent(data.theme)}`}
          onClick={handleTryClick}
          className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-[0_6px_18px_rgba(232,83,31,0.25)] transition-transform hover:scale-[1.02] active:scale-[0.98]"
          style={{ background: "linear-gradient(135deg, #ff7a45, #e8531f)" }}
        >
          Try it in Generator
        </Link>
      </div>
    </div>
  );
}
