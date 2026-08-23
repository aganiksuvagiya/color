"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo, useCallback } from "react";
import { Header } from "./header";
import { ToolPageSections } from "@/components/seo/tool-page-sections";
import { isValidHex } from "@/lib/color-utils";
import { getContrastRatio, getWcagLevel, suggestAccessibleColor } from "@/lib/accessibility";
import { toolPageContent } from "@/lib/seo/tool-pages";

// v2
type TargetLevel = "AA" | "AAA";
const TARGET_RATIOS: Record<TargetLevel, number> = { AA: 4.5, AAA: 7 };

function LevelBadge({ level, size = "sm" }: { level: "AAA" | "AA" | "Fail"; size?: "sm" | "xs" }) {
  const c = level === "AAA" ? "bg-emerald-50 text-emerald-700 border-emerald-200"
    : level === "AA" ? "bg-amber-50 text-amber-700 border-amber-200"
    : "bg-red-50 text-red-600 border-red-200";
  const s = size === "xs" ? "px-1.5 py-0.5 text-[9px]" : "px-2.5 py-1 text-[10px]";
  return <span className={`inline-flex items-center rounded-md border font-bold uppercase tracking-wide ${c} ${s}`}>{level}</span>;
}

export function ContrastFixer() {
  const [fg, setFg] = useState("#777777");
  const [bg, setBg] = useState("#FFFFFF");
  const [fgInput, setFgInput] = useState("#777777");
  const [bgInput, setBgInput] = useState("#FFFFFF");
  const [targetLevel, setTargetLevel] = useState<TargetLevel>("AA");
  const [applied, setApplied] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

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

  const commitFg = (v: string) => { if (isValidHex(v)) { setFg(v); setApplied(false); } };
  const commitBg = (v: string) => { if (isValidHex(v)) { setBg(v); setApplied(false); } };
  function applyFix() { setFg(suggestedFg); setFgInput(suggestedFg); setApplied(true); }
  function swapColors() { setFg(bg); setFgInput(bg); setBg(fg); setBgInput(fg); setApplied(false); }
  const copyHex = useCallback(async (hex: string) => {
    await navigator.clipboard.writeText(hex);
    setCopied(hex); setTimeout(() => setCopied(null), 1400);
  }, []);

  const gaugeColor = ratio >= 7 ? "#10b981" : ratio >= 4.5 ? "#f59e0b" : ratio >= 3 ? "#f97316" : "#ef4444";
  const gaugeW = Math.min(100, (ratio / 21) * 100);

  return (
    <div className="flex min-h-screen flex-col bg-[#f0ede8] text-[#1c1712]">
      <Header />

      <AnimatePresence>
        {copied && (
          <motion.div key="t" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 left-1/2 z-[100] -translate-x-1/2 rounded-full border border-[#e8531f]/20 bg-[#e8531f]/10 px-5 py-2.5 text-sm font-semibold text-[#e8531f] shadow-[0_4px_20px_rgba(232,83,31,0.12)] whitespace-nowrap">
            ✓ Copied {copied.toUpperCase()}
          </motion.div>
        )}
      </AnimatePresence>

      <main className="mx-auto flex w-full max-w-[1200px] flex-1 flex-col px-4 pb-8 pt-20 sm:px-6 sm:pt-24 lg:pt-28">

        {/* Hero */}
        <div className="mb-5 flex flex-col items-center gap-2 text-center sm:mb-7">
          <span className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.24em] text-[#1c1712]/45 shadow-[0_1px_4px_rgba(28,23,18,0.06)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#e8531f]" />
            WCAG Accessibility
          </span>
          <h1 className="font-display text-[2rem] font-bold leading-tight tracking-[-0.04em] text-[#1c1712] sm:text-[2.6rem]">
            Smart Contrast Fixer
          </h1>
          <p className="max-w-md text-sm leading-6 text-[#1c1712]/45 sm:text-[15px]">
            Auto-fix accessibility contrast issues while preserving your design&apos;s color intent.
          </p>
        </div>

        {/* ── MAIN SPLIT ── */}
        <div className="flex min-h-[600px] flex-1 flex-col overflow-hidden rounded-2xl border border-black/[0.08] shadow-[0_8px_40px_rgba(28,23,18,0.10)] lg:flex-row">

          {/* ── RIGHT (controls) on mobile first, LEFT on desktop ── */}
          {/* Controls panel */}
          <div className="flex w-full shrink-0 flex-col border-b border-black/[0.07] bg-white lg:order-2 lg:w-[320px] lg:overflow-y-auto lg:border-b-0 lg:border-l xl:w-[360px]">

            {/* Target level */}
            <div className="border-b border-black/[0.07] bg-[#faf7f2] px-5 py-4">
              <p className="mb-2.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#1c1712]/35">Target Level</p>
              <div className="flex gap-2">
                {(["AA", "AAA"] as TargetLevel[]).map((lv) => (
                  <button key={lv} onClick={() => setTargetLevel(lv)}
                    className={`flex-1 rounded-xl border py-2 text-[12px] font-bold transition-all ${
                      targetLevel === lv
                        ? "border-[#e8531f]/30 bg-[#e8531f]/10 text-[#e8531f]"
                        : "border-black/[0.08] bg-white text-[#1c1712]/40 hover:text-[#1c1712]/60"
                    }`}>
                    {lv} <span className="text-[10px] font-normal opacity-60">({lv === "AA" ? "4.5" : "7"}:1)</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Color inputs */}
            <div className="border-b border-black/[0.07] bg-white px-5 py-4">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#1c1712]/35">Colors</p>
              <div className="space-y-3">
                {[
                  { label: "Foreground (text)", val: fgInput, color: fg, setInput: setFgInput, setColor: setFg, commit: commitFg },
                  { label: "Background", val: bgInput, color: bg, setInput: setBgInput, setColor: setBg, commit: commitBg },
                ].map(({ label, val, color, setInput, setColor, commit }) => (
                  <div key={label}>
                    <label className="mb-1.5 block text-[10px] font-semibold text-[#1c1712]/40">{label}</label>
                    <div className="flex items-center gap-2">
                      <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-lg border border-black/[0.10]">
                        <div className="absolute inset-0" style={{ backgroundColor: isValidHex(color) ? color : "#ccc" }} />
                        <input type="color" value={isValidHex(color) ? color : "#cccccc"}
                          onChange={(e) => { const v = e.target.value.toUpperCase(); setInput(v); setColor(v); setApplied(false); }}
                          className="absolute inset-0 h-full w-full cursor-pointer opacity-0" />
                      </div>
                      <input type="text" value={val}
                        onChange={(e) => { setInput(e.target.value.toUpperCase()); commit(e.target.value); }}
                        maxLength={7}
                        className="flex-1 rounded-lg border border-black/[0.08] bg-[#faf7f2] px-3 py-2 font-mono text-[12px] text-[#1c1712] outline-none focus:border-[#e8531f]/30 focus:bg-white" />
                      <button onClick={() => copyHex(color)}
                        className="shrink-0 rounded-lg border border-black/[0.08] bg-[#faf7f2] p-2 text-[#1c1712]/30 transition hover:text-[#1c1712]/55">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={swapColors}
                className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl border border-black/[0.07] bg-[#faf7f2] py-2 text-[11px] font-semibold text-[#1c1712]/40 transition hover:text-[#1c1712]/60">
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"/>
                </svg>
                Swap Colors
              </button>
            </div>

            {/* Ratio */}
            <div className="border-b border-black/[0.07] bg-[#faf7f2] px-5 py-4">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#1c1712]/35">Contrast Ratio</p>
                <LevelBadge level={level} />
              </div>
              <div className="mb-3 flex items-baseline gap-1.5">
                <motion.span key={ratio} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                  className="font-mono text-[2.2rem] font-bold leading-none tracking-[-0.04em] text-[#1c1712]">
                  {ratio}
                </motion.span>
                <span className="font-mono text-sm text-[#1c1712]/30">:1</span>
              </div>
              <div className="relative h-2 w-full overflow-hidden rounded-full bg-black/[0.06]">
                <motion.div className="absolute left-0 top-0 h-full rounded-full" style={{ backgroundColor: gaugeColor }}
                  animate={{ width: `${gaugeW}%` }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }} />
              </div>
              <div className="relative mt-1 h-4">
                {[{ v: 3, l: "3:1" }, { v: 4.5, l: "AA" }, { v: 7, l: "AAA" }].map(({ v, l }) => (
                  <span key={v} className="absolute -translate-x-1/2 text-[9px] text-[#1c1712]/28" style={{ left: `${(v / 21) * 100}%` }}>{l}</span>
                ))}
              </div>
              <p className="mt-1.5 text-[11px]">
                {needsFix
                  ? <span className="text-red-500/80">Needs {targetRatio}:1 for {targetLevel}</span>
                  : valid ? <span className="text-emerald-600">✓ Passes {targetLevel}</span> : null}
              </p>
            </div>

            {/* Suggested fix */}
            <AnimatePresence>
              {valid && needsFix && (
                <motion.div key="fix" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="border-b border-black/[0.07] bg-white px-5 py-4">
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#1c1712]/35">Suggested Fix</p>
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2">
                      <div className="h-10 w-10 rounded-xl border border-black/[0.10]" style={{ backgroundColor: fg }} />
                      <div>
                        <p className="font-mono text-[10px] text-[#1c1712]/40">{fg.toUpperCase()}</p>
                        <LevelBadge level={level} size="xs" />
                      </div>
                    </div>
                    <svg className="h-4 w-5 shrink-0 text-[#1c1712]/20" fill="none" viewBox="0 0 20 16" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2 8h14m0 0l-5-5m5 5l-5 5"/>
                    </svg>
                    <div className="flex items-center gap-2">
                      <div className="h-10 w-10 rounded-xl border border-emerald-200" style={{ backgroundColor: suggestedFg }} />
                      <div>
                        <p className="font-mono text-[10px] text-emerald-600">{suggestedFg.toUpperCase()}</p>
                        <LevelBadge level={fixedLevel} size="xs" />
                      </div>
                    </div>
                    <div className="ml-auto">
                      <p className="font-mono text-lg font-bold text-emerald-700">{fixedRatio}:1</p>
                    </div>
                  </div>
                  <button onClick={applyFix}
                    className="mt-3 w-full rounded-xl border border-emerald-200/70 bg-emerald-50 py-2.5 text-[12px] font-bold text-emerald-700 transition hover:bg-emerald-100 active:scale-[0.99]">
                    Apply Suggested Color
                  </button>
                </motion.div>
              )}

              {valid && !needsFix && (
                <motion.div key="pass" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="border-b border-black/[0.07] bg-emerald-50/50 px-5 py-4 text-center">
                  <p className="text-[12px] font-semibold text-emerald-700">
                    {applied ? "✓ Fix applied — passes " : "✓ Already passes "}{targetLevel}!
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Copy buttons */}
            {valid && (
              <div className="bg-[#faf7f2] px-5 py-4">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#1c1712]/35">Copy</p>
                <div className="flex flex-wrap gap-2">
                  <button onClick={() => copyHex(fg)}
                    className="flex flex-1 items-center justify-center gap-1 rounded-xl border border-black/[0.08] bg-white py-2 text-[11px] font-semibold text-[#1c1712]/50 transition hover:text-[#1c1712]/70">
                    <span className="h-3 w-3 rounded" style={{ backgroundColor: fg }} />FG
                  </button>
                  <button onClick={() => copyHex(bg)}
                    className="flex flex-1 items-center justify-center gap-1 rounded-xl border border-black/[0.08] bg-white py-2 text-[11px] font-semibold text-[#1c1712]/50 transition hover:text-[#1c1712]/70">
                    <span className="h-3 w-3 rounded border border-black/[0.10]" style={{ backgroundColor: bg }} />BG
                  </button>
                  {needsFix && (
                    <button onClick={() => copyHex(suggestedFg)}
                      className="flex flex-1 items-center justify-center gap-1 rounded-xl border border-emerald-200/70 bg-emerald-50 py-2 text-[11px] font-semibold text-emerald-700 transition hover:bg-emerald-100">
                      <span className="h-3 w-3 rounded" style={{ backgroundColor: suggestedFg }} />Fix
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* ── Preview panel (left on desktop) ── */}
          <div className="flex min-h-[400px] flex-1 flex-col lg:order-1 lg:min-h-0">

            {/* Header bar */}
            <div className="flex shrink-0 items-center justify-between border-b border-black/[0.07] bg-white/60 px-5 py-3 backdrop-blur-sm">
              <p className="text-[10px] font-bold uppercase tracking-[0.20em] text-[#1c1712]/35">Live Preview</p>
              <p className="font-mono text-[10px] text-[#1c1712]/28">
                {fg.toUpperCase()} <span className="opacity-50">on</span> {bg.toUpperCase()}
              </p>
            </div>

            {/* Before + After panels */}
            <div className="flex flex-1 flex-col sm:flex-row lg:flex-col">

              {/* BEFORE */}
              <div className="relative flex flex-1 flex-col justify-center px-8 py-8 sm:py-10" style={{ backgroundColor: bg }}>
                <div className="absolute left-4 top-4">
                  <span className="rounded-md border border-black/[0.10] bg-white/80 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-[#1c1712]/45 backdrop-blur-sm">
                    Before
                  </span>
                </div>
                <div className="max-w-sm">
                  <p style={{ color: fg }} className="mb-2.5 text-[1.8rem] font-bold leading-tight">Heading Text</p>
                  <p style={{ color: fg }} className="text-[13px] leading-relaxed">
                    Body text with the original foreground color. Check readability at this size.
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <div className="h-7 w-7 rounded-lg border border-black/[0.08]" style={{ backgroundColor: fg }} />
                    <span style={{ color: fg }} className="font-mono text-[11px] font-semibold">{fg.toUpperCase()}</span>
                    <LevelBadge level={level} size="xs" />
                    <span className="font-mono text-[11px] text-[#1c1712]/40">{ratio}:1</span>
                  </div>
                </div>
              </div>

              {/* Divider (only when needs fix) */}
              {needsFix && (
                <div className="flex shrink-0 items-center gap-3 px-6 py-2">
                  <div className="h-px flex-1 bg-black/[0.07]" />
                  <span className="shrink-0 rounded-full border border-black/[0.08] bg-[#faf7f2] px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-[#1c1712]/35">
                    Fixed
                  </span>
                  <div className="h-px flex-1 bg-black/[0.07]" />
                </div>
              )}

              {/* AFTER (only when fix needed) */}
              <AnimatePresence>
                {needsFix && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="relative flex flex-1 flex-col justify-center px-8 py-8 sm:py-10"
                    style={{ backgroundColor: bg }}>
                    <div className="absolute left-4 top-4">
                      <span className="rounded-md border border-emerald-200 bg-emerald-50/90 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-emerald-700 backdrop-blur-sm">
                        After Fix
                      </span>
                    </div>
                    <div className="max-w-sm">
                      <p style={{ color: suggestedFg }} className="mb-2.5 text-[1.8rem] font-bold leading-tight">Heading Text</p>
                      <p style={{ color: suggestedFg }} className="text-[13px] leading-relaxed">
                        Body text with the fixed foreground color. Much more readable at this size.
                      </p>
                      <div className="mt-4 flex flex-wrap items-center gap-2">
                        <div className="h-7 w-7 rounded-lg border border-emerald-200/60" style={{ backgroundColor: suggestedFg }} />
                        <span style={{ color: suggestedFg }} className="font-mono text-[11px] font-semibold">{suggestedFg.toUpperCase()}</span>
                        <LevelBadge level={fixedLevel} size="xs" />
                        <span className="font-mono text-[11px] text-[#1c1712]/40">{fixedRatio}:1</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Passing state */}
              {!needsFix && valid && (
                <div className="flex flex-1 flex-col items-center justify-center gap-3 border-t border-emerald-100/70 bg-emerald-50/30 p-8 sm:border-l sm:border-t-0 lg:border-l-0 lg:border-t">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                    <svg className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <p className="text-[13px] font-semibold text-emerald-700">
                    {applied ? "Fixed & passes " : "Already passes "}{targetLevel}!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8">
          <ToolPageSections config={toolPageContent["contrast-fixer"]} />
        </div>
      </main>
    </div>
  );
}
