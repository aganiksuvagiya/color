"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import { Header } from "./header";
import { ToolPageSections } from "@/components/seo/tool-page-sections";
import { isValidHex } from "@/lib/color-utils";
import {
  getContrastRatio,
  getWcagLevel,
  suggestAccessibleColor,
} from "@/lib/accessibility";
import { toolPageContent } from "@/lib/seo/tool-pages";

type TargetLevel = "AA" | "AAA";

const TARGET_RATIOS: Record<TargetLevel, number> = {
  AA: 4.5,
  AAA: 7,
};

function LevelBadge({ level }: { level: "AAA" | "AA" | "Fail" }) {
  const styles =
    level === "AAA"
      ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
      : level === "AA"
        ? "bg-amber-500/20 text-amber-400 border-amber-500/30"
        : "bg-red-500/20 text-red-400 border-red-500/30";
  return (
    <span
      className={`inline-flex items-center rounded-lg border px-3 py-1.5 text-sm font-bold ${styles}`}
    >
      {level}
    </span>
  );
}

function PreviewCard({
  label,
  fg,
  bg,
  delay = 0,
}: {
  label: string;
  fg: string;
  bg: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="flex-1 overflow-hidden rounded-2xl border border-white/10"
    >
      <div className="border-b border-white/10 bg-white/5 px-4 py-2">
        <p className="text-xs font-medium text-white/40">{label}</p>
      </div>
      <div className="space-y-2 p-5" style={{ backgroundColor: bg }}>
        <p style={{ color: fg }} className="text-2xl font-bold">
          Heading Text
        </p>
        <p style={{ color: fg }} className="text-sm leading-relaxed">
          Body text rendered on the background color. This preview shows how
          readable the combination looks at normal size.
        </p>
      </div>
    </motion.div>
  );
}

export function ContrastFixer() {
  const [fg, setFg] = useState("#777777");
  const [bg, setBg] = useState("#1A1A2E");
  const [targetLevel, setTargetLevel] = useState<TargetLevel>("AA");

  const valid = isValidHex(fg) && isValidHex(bg);
  const ratio = valid ? getContrastRatio(fg, bg) : 0;
  const level = getWcagLevel(ratio);
  const targetRatio = TARGET_RATIOS[targetLevel];
  const needsFix = ratio < targetRatio;

  const suggestedFg = useMemo(
    () => (valid && needsFix ? suggestAccessibleColor(fg, bg, targetRatio) : fg),
    [fg, bg, targetRatio, valid, needsFix]
  );

  const fixedRatio = valid && needsFix ? getContrastRatio(suggestedFg, bg) : ratio;
  const fixedLevel = getWcagLevel(fixedRatio);

  return (
    <main className="relative min-h-screen bg-[#160b05] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(0,0,0,0.95),transparent_18%),radial-gradient(circle_at_88%_0%,rgba(255,106,44,0.2),transparent_30%),linear-gradient(135deg,#1a0e06_0%,#160b05_50%,#1a0e06_100%)]" />
      <div className="noise absolute inset-0 opacity-20" />

      <Header />

      <div className="relative mx-auto max-w-3xl px-4 pt-24 pb-20 sm:px-6 sm:pt-40">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-10 text-center"
        >
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Smart Contrast Fixer
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/50">
            Auto-fix accessibility contrast issues while preserving your
            design&apos;s color intent.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="space-y-6"
        >
          {/* Target Level Selector */}
          <div className="flex items-center justify-center gap-2">
            <span className="mr-2 text-sm text-white/40">Target:</span>
            {(["AA", "AAA"] as TargetLevel[]).map((lv) => (
              <button
                key={lv}
                onClick={() => setTargetLevel(lv)}
                className={`rounded-xl border px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                  targetLevel === lv
                    ? "border-orange-500/60 bg-orange-500/20 text-orange-300"
                    : "border-white/10 bg-white/5 text-white/50 hover:bg-white/10"
                }`}
              >
                {lv}{" "}
                <span className="text-xs font-normal opacity-60">
                  ({lv === "AA" ? "4.5" : "7"}:1)
                </span>
              </button>
            ))}
          </div>

          {/* Color Inputs */}
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Foreground */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <label className="mb-2 block text-xs text-white/40">
                Foreground (text)
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={isValidHex(fg) ? fg : "#000000"}
                  onChange={(e) => setFg(e.target.value.toUpperCase())}
                  className="h-10 w-10 cursor-pointer rounded-lg border-0 bg-transparent"
                />
                <input
                  type="text"
                  value={fg}
                  onChange={(e) => setFg(e.target.value.toUpperCase())}
                  maxLength={7}
                  className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 font-mono text-sm text-white outline-none focus:border-orange-500/40"
                />
              </div>
            </div>

            {/* Background */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <label className="mb-2 block text-xs text-white/40">
                Background
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={isValidHex(bg) ? bg : "#000000"}
                  onChange={(e) => setBg(e.target.value.toUpperCase())}
                  className="h-10 w-10 cursor-pointer rounded-lg border-0 bg-transparent"
                />
                <input
                  type="text"
                  value={bg}
                  onChange={(e) => setBg(e.target.value.toUpperCase())}
                  maxLength={7}
                  className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 font-mono text-sm text-white outline-none focus:border-orange-500/40"
                />
              </div>
            </div>
          </div>

          {/* Current Contrast Ratio */}
          <motion.div
            layout
            className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center"
          >
            <p className="mb-1 text-xs uppercase tracking-widest text-white/30">
              Current Contrast
            </p>
            <motion.p
              key={ratio}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-5xl font-bold"
            >
              {ratio}:1
            </motion.p>
            <div className="mt-4 flex items-center justify-center gap-3">
              <LevelBadge level={level} />
              {needsFix && (
                <motion.span
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-sm text-red-400/80"
                >
                  Below {targetLevel} threshold
                </motion.span>
              )}
              {!needsFix && valid && (
                <motion.span
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-sm text-emerald-400/80"
                >
                  Passes {targetLevel}
                </motion.span>
              )}
            </div>
          </motion.div>

          {/* Suggested Fix */}
          <AnimatePresence mode="wait">
            {valid && needsFix && (
              <motion.div
                key="fix"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
                className="overflow-hidden"
              >
                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6">
                  <div className="mb-4 flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20">
                      <svg
                        className="h-3.5 w-3.5 text-emerald-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <h3 className="text-sm font-semibold text-emerald-400">
                      Suggested Fix
                    </h3>
                  </div>

                  <div className="flex items-center gap-4">
                    {/* Original color */}
                    <div className="flex items-center gap-2">
                      <div
                        className="h-10 w-10 rounded-lg border border-white/10"
                        style={{ backgroundColor: fg }}
                      />
                      <div>
                        <p className="font-mono text-xs text-white/40">
                          Original
                        </p>
                        <p className="font-mono text-sm">{fg}</p>
                      </div>
                    </div>

                    {/* Arrow */}
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.2, duration: 0.3 }}
                      className="origin-left"
                    >
                      <svg
                        className="h-5 w-8 text-white/30"
                        fill="none"
                        viewBox="0 0 32 20"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2 10h26m0 0l-6-6m6 6l-6 6"
                        />
                      </svg>
                    </motion.div>

                    {/* Suggested color */}
                    <div className="flex items-center gap-2">
                      <div
                        className="h-10 w-10 rounded-lg border border-emerald-500/30"
                        style={{ backgroundColor: suggestedFg }}
                      />
                      <div>
                        <p className="font-mono text-xs text-emerald-400/60">
                          Fixed
                        </p>
                        <p className="font-mono text-sm text-emerald-300">
                          {suggestedFg}
                        </p>
                      </div>
                    </div>

                    {/* Fixed ratio */}
                    <div className="ml-auto text-right">
                      <p className="text-2xl font-bold text-emerald-400">
                        {fixedRatio}:1
                      </p>
                      <LevelBadge level={fixedLevel} />
                    </div>
                  </div>

                  <button
                    onClick={() => setFg(suggestedFg)}
                    className="mt-4 w-full rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2.5 text-sm font-semibold text-emerald-300 transition-all duration-300 hover:bg-emerald-500/20"
                  >
                    Apply Suggested Color
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Before / After Preview */}
          {valid && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              <p className="mb-3 text-center text-xs uppercase tracking-widest text-white/30">
                {needsFix ? "Before & After" : "Preview"}
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <PreviewCard label="Current" fg={fg} bg={bg} delay={0} />
                {needsFix && (
                  <PreviewCard
                    label="With Fix Applied"
                    fg={suggestedFg}
                    bg={bg}
                    delay={0.1}
                  />
                )}
              </div>
            </motion.div>
          )}

          {/* Swap Button */}
          <button
            onClick={() => {
              const t = fg;
              setFg(bg);
              setBg(t);
            }}
            className="mx-auto flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm text-white/60 transition-all duration-300 hover:bg-white/10"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
              />
            </svg>
            Swap Colors
          </button>

          <ToolPageSections config={toolPageContent["contrast-fixer"]} />
        </motion.div>
      </div>
    </main>
  );
}
