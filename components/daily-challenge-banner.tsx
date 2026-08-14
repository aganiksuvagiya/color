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
    <div className="mx-auto mt-16 max-w-[1560px] rounded-[28px] border border-orange-500/25 bg-gradient-to-r from-orange-500/10 via-orange-500/5 to-transparent p-6 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-5">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-orange-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-orange-300">
            Today&apos;s Challenge
          </div>
          <div className="mt-2.5 text-xl font-semibold text-white sm:text-2xl">{data.theme}</div>
          <div className="mt-1.5 text-sm text-white/55">
            {data.todayCount} {data.todayCount === 1 ? "person has" : "people have"} tried it today
            {data.signedIn && data.streak > 0 && <> · 🔥 {data.streak}-day streak</>}
          </div>
        </div>
        <Link
          href={`/generator?theme=${encodeURIComponent(data.theme)}`}
          onClick={handleTryClick}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#F15B2A] to-[#C94B1A] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(241,91,42,0.3)] transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          Try it in Generator
        </Link>
      </div>
    </div>
  );
}
