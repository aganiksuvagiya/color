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

function themeToColors(theme: string): string[] {
  let hash = 0;
  for (let i = 0; i < theme.length; i++) {
    hash = Math.imul(31, hash) + theme.charCodeAt(i);
    hash |= 0;
  }
  const abs = Math.abs(hash);
  return Array.from({ length: 5 }, (_, i) => {
    const h = (abs * (i * 47 + 13)) % 360;
    const s = 48 + ((abs * (i + 3)) % 28);
    const l = 42 + ((abs * (i + 7)) % 22);
    return `hsl(${h}, ${s}%, ${l}%)`;
  });
}

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

  const swatches = themeToColors(data.theme);

  return (
    <div className="mx-auto mt-8 max-w-[1400px] overflow-hidden rounded-[24px] border border-black/8 bg-white shadow-[0_2px_16px_rgba(28,23,18,0.04)]">
      <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:gap-6 sm:p-6">

        {/* Left — badge + title + count */}
        <div className="min-w-0 flex-1">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#e8531f]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#e8531f]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#e8531f]" />
            Today&apos;s Challenge
          </div>
          <p className="mt-2 text-lg font-semibold tracking-[-0.02em] text-[#1c1712] sm:text-xl">
            {data.theme}
          </p>
          <p className="mt-1 text-sm text-[#1c1712]/45">
            {data.todayCount === 0
              ? "Be the first to try it today"
              : `${data.todayCount} ${data.todayCount === 1 ? "person has" : "people have"} tried it today`}
            {data.signedIn && data.streak > 0 && (
              <span className="ml-2 inline-flex items-center gap-1 font-medium text-[#e8531f]/80">
                · 🔥 {data.streak}-day streak
              </span>
            )}
          </p>
        </div>

        {/* Middle — color swatches */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {swatches.map((color, i) => (
            <div
              key={i}
              className="h-10 w-10 rounded-xl sm:h-12 sm:w-12"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>

        {/* Right — CTA */}
        <Link
          href={`/generator?theme=${encodeURIComponent(data.theme)}`}
          onClick={handleTryClick}
          className="inline-flex shrink-0 items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-[0_6px_18px_rgba(232,83,31,0.25)] transition-transform hover:scale-[1.02] active:scale-[0.98]"
          style={{ background: "linear-gradient(135deg, #ff7a45, #e8531f)" }}
        >
          Try it in Generator
        </Link>
      </div>
    </div>
  );
}
