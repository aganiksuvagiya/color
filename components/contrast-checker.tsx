"use client";

import { motion } from "framer-motion";
import { useState, useCallback } from "react";
import { Header } from "./header";
import { ToolPageSections } from "@/components/seo/tool-page-sections";
import { isValidHex } from "@/lib/color-utils";
import { getContrastRatio, getWcagLevel, suggestAccessibleColor } from "@/lib/accessibility";
import { findClosestColorName } from "@/lib/color-names";
import { toolPageContent } from "@/lib/seo/tool-pages";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } } };

function getLuminance(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
}
function adaptiveFg(hex: string) {
  return getLuminance(hex) > 0.5 ? "#1c1712" : "#ffffff";
}

type Level = "AAA" | "AA" | "Fail";

const LEVEL_STYLES: Record<Level, { card: string; dot: string; text: string; icon: string }> = {
  AAA:  { card: "border-emerald-200/80 bg-emerald-50/80", dot: "bg-emerald-500", text: "text-emerald-700", icon: "✓" },
  AA:   { card: "border-amber-200/80  bg-amber-50/70",   dot: "bg-amber-500",   text: "text-amber-700",   icon: "✓" },
  Fail: { card: "border-red-200/70    bg-red-50/60",      dot: "bg-red-400",     text: "text-red-600",     icon: "✗" },
};

function WcagBadge({ label, level }: { label: string; level: Level }) {
  const s = LEVEL_STYLES[level];
  return (
    <div className={`flex flex-1 flex-col items-center gap-2 rounded-2xl border py-5 ${s.card}`}>
      <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white ${s.dot.replace("bg-", "bg-")}`}
        style={{ backgroundColor: level === "AAA" ? "#10b981" : level === "AA" ? "#f59e0b" : "#f87171" }}>
        {s.icon}
      </span>
      <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#1c1712]/40">{label}</span>
      <span className={`text-2xl font-bold ${s.text}`}>{level}</span>
    </div>
  );
}

export function ContrastChecker() {
  const [fg, setFg] = useState("#FFFFFF");
  const [bg, setBg] = useState("#4F46E5");
  const [fgInput, setFgInput] = useState("#FFFFFF");
  const [bgInput, setBgInput] = useState("#4F46E5");
  const [justFixed, setJustFixed] = useState(false);

  const ratio = isValidHex(fg) && isValidHex(bg) ? getContrastRatio(fg, bg) : 0;
  const level = getWcagLevel(ratio) as Level;
  const large: Level = ratio >= 4.5 ? "AAA" : ratio >= 3 ? "AA" : "Fail";
  const overallPass = level !== "Fail";

  const handleFgText = (v: string) => {
    setFgInput(v);
    const n = v.startsWith("#") ? v : `#${v}`;
    if (isValidHex(n) && n.length === 7) setFg(n);
  };
  const handleBgText = (v: string) => {
    setBgInput(v);
    const n = v.startsWith("#") ? v : `#${v}`;
    if (isValidHex(n) && n.length === 7) setBg(n);
  };

  const swap = useCallback(() => {
    setFg(bg); setFgInput(bg);
    setBg(fg); setBgInput(fg);
    setJustFixed(false);
  }, [fg, bg]);

  const autoFix = useCallback(() => {
    // Try AAA (7:1) first, fall back to AA (4.5:1) if impossible
    let result = suggestAccessibleColor(fg, bg, 7);
    if (result === fg) result = suggestAccessibleColor(fg, bg, 4.5);
    if (!result || result === fg) return;
    setFg(result);
    setFgInput(result);
    setJustFixed(true);
    setTimeout(() => setJustFixed(false), 1500);
  }, [fg, bg]);

  const fgA = adaptiveFg(fg);
  const bgA = adaptiveFg(bg);
  const gaugeColor = ratio >= 7 ? "#10b981" : ratio >= 4.5 ? "#f59e0b" : ratio >= 3 ? "#f97316" : "#ef4444";
  const gaugePct = Math.min((ratio / 21) * 100, 100);

  return (
    <div className="min-h-screen bg-[#faf7f2] text-[#1c1712]">
      <Header />

      <main className="mx-auto max-w-4xl px-4 pb-24 pt-24 sm:px-6 sm:pt-32">
        <motion.div initial="hidden" animate="show" variants={stagger}>

          {/* ── HERO ── */}
          <motion.div variants={fadeUp} className="mb-8 flex flex-col items-center gap-3 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.24em] text-[#1c1712]/45 shadow-[0_1px_4px_rgba(28,23,18,0.06)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#e8531f]" />
              WCAG 2.1 · AA &amp; AAA · Free
            </span>
            <h1 className="font-display text-[2.8rem] font-bold leading-[1.04] tracking-[-0.05em] text-[#1c1712] sm:text-[3.6rem]">
              Contrast Checker
            </h1>
            <p className="max-w-md text-base leading-7 text-[#1c1712]/45">
              Pick two colors and instantly see if they pass WCAG accessibility standards.
            </p>
          </motion.div>

          {/* ── MAIN CARD ── */}
          <motion.div
            variants={fadeUp}
            className="mb-4 overflow-hidden rounded-[28px] border border-black/[0.08] bg-white shadow-[0_8px_40px_rgba(28,23,18,0.10)]"
          >
            {/* Split swatches */}
            <div className="relative flex" style={{ height: "17rem" }}>
              {/* FG swatch */}
              <label
                className="relative flex flex-1 cursor-pointer flex-col justify-end p-6"
                style={{ backgroundColor: fg }}
              >
                <input
                  type="color"
                  value={fg}
                  onChange={(e) => { setFg(e.target.value); setFgInput(e.target.value); }}
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                />
                {/* Pick hint */}
                <div
                  className="pointer-events-none absolute right-3 top-3 rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.14em]"
                  style={{
                    backgroundColor: fgA === "#ffffff" ? "rgba(255,255,255,0.15)" : "rgba(28,23,18,0.07)",
                    color: fgA,
                    opacity: 0.55,
                  }}
                >
                  Click to pick
                </div>
                <div className="pointer-events-none space-y-1">
                  <p className="text-[9px] font-bold uppercase tracking-[0.22em]" style={{ color: fgA, opacity: 0.45 }}>Foreground (text)</p>
                  <p className="font-mono text-[15px] font-bold" style={{ color: fgA }}>{fg.toUpperCase()}</p>
                  <p className="text-[11px]" style={{ color: fgA, opacity: 0.45 }}>{findClosestColorName(fg)}</p>
                </div>
              </label>

              {/* Center ratio badge */}
              <div className="absolute inset-y-0 left-1/2 z-10 flex -translate-x-1/2 items-center">
                <motion.div
                  key={ratio}
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center gap-0.5 rounded-[18px] border border-black/[0.09] bg-white px-4 py-3.5 shadow-[0_4px_20px_rgba(28,23,18,0.14)]"
                >
                  <span className="font-mono text-[22px] font-bold leading-none text-[#1c1712]">{ratio}:1</span>
                  <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#1c1712]/35">ratio</span>
                </motion.div>
              </div>

              {/* BG swatch */}
              <label
                className="relative flex flex-1 cursor-pointer flex-col items-end justify-end p-6"
                style={{ backgroundColor: bg }}
              >
                <input
                  type="color"
                  value={bg}
                  onChange={(e) => { setBg(e.target.value); setBgInput(e.target.value); }}
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                />
                <div
                  className="pointer-events-none absolute left-3 top-3 rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.14em]"
                  style={{
                    backgroundColor: bgA === "#ffffff" ? "rgba(255,255,255,0.15)" : "rgba(28,23,18,0.07)",
                    color: bgA,
                    opacity: 0.55,
                  }}
                >
                  Click to pick
                </div>
                <div className="pointer-events-none space-y-1 text-right">
                  <p className="text-[9px] font-bold uppercase tracking-[0.22em]" style={{ color: bgA, opacity: 0.45 }}>Background</p>
                  <p className="font-mono text-[15px] font-bold" style={{ color: bgA }}>{bg.toUpperCase()}</p>
                  <p className="text-[11px]" style={{ color: bgA, opacity: 0.45 }}>{findClosestColorName(bg)}</p>
                </div>
              </label>
            </div>

            {/* Hex inputs row */}
            <div className="flex items-center gap-2 border-t border-black/[0.07] px-5 py-3.5">
              <div className="flex flex-1 flex-col gap-1">
                <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#1c1712]/35">Foreground</span>
                <input
                  type="text"
                  value={fgInput}
                  onChange={(e) => handleFgText(e.target.value)}
                  maxLength={7}
                  spellCheck={false}
                  placeholder="#000000"
                  className="h-10 w-full rounded-xl border border-black/[0.10] bg-[#faf7f2] px-3 font-mono text-[13px] text-[#1c1712] outline-none transition focus:border-black/20"
                />
              </div>
              <div className="flex flex-col items-center gap-1 pt-4">
                <button
                  onClick={swap}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-black/[0.08] bg-[#faf7f2] text-[15px] text-[#1c1712]/45 transition hover:bg-[#f0ebe4] hover:text-[#1c1712]"
                  title="Swap"
                >
                  ⇅
                </button>
              </div>
              <div className="flex flex-1 flex-col gap-1">
                <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#1c1712]/35">Background</span>
                <input
                  type="text"
                  value={bgInput}
                  onChange={(e) => handleBgText(e.target.value)}
                  maxLength={7}
                  spellCheck={false}
                  placeholder="#000000"
                  className="h-10 w-full rounded-xl border border-black/[0.10] bg-[#faf7f2] px-3 font-mono text-[13px] text-[#1c1712] outline-none transition focus:border-black/20"
                />
              </div>
            </div>

            {/* Gauge bar */}
            <div className="px-5 pb-2 pt-1">
              <div className="relative h-3 overflow-hidden rounded-full bg-black/[0.06]">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{ backgroundColor: gaugeColor }}
                  animate={{ width: `${gaugePct}%` }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                />
                {[3, 4.5, 7].map((m) => (
                  <div
                    key={m}
                    className="absolute top-0 h-full w-0.5 bg-white/60"
                    style={{ left: `${(m / 21) * 100}%` }}
                  />
                ))}
              </div>
              <div className="relative h-5 mt-0.5">
                {[{ v: 3, l: "3:1" }, { v: 4.5, l: "4.5:1" }, { v: 7, l: "7:1" }, { v: 21, l: "21:1" }].map((m) => (
                  <span
                    key={m.v}
                    className="absolute font-mono text-[8px] text-[#1c1712]/25"
                    style={{ left: `${(m.v / 21) * 100}%`, transform: "translateX(-50%)" }}
                  >
                    {m.l}
                  </span>
                ))}
              </div>
            </div>

            {/* WCAG badges */}
            <div className="flex gap-3 px-5 pb-4">
              <WcagBadge label="Normal text" level={level} />
              <WcagBadge label="Large text"  level={large} />
            </div>

            {/* Summary banner */}
            <div className={`mx-5 mb-5 flex items-center gap-3 rounded-2xl border px-5 py-3.5 ${overallPass ? "border-emerald-200/60 bg-emerald-50/70" : "border-red-200/60 bg-red-50/60"}`}>
              <span className={`shrink-0 text-xl font-bold ${overallPass ? "text-emerald-600" : "text-red-500"}`}>
                {overallPass ? "✓" : "✗"}
              </span>
              <p className={`flex-1 text-sm font-semibold ${overallPass ? "text-emerald-800" : "text-red-700"}`}>
                {overallPass
                  ? `Passes WCAG AA — ${ratio}:1 meets the 4.5:1 minimum.`
                  : `Fails WCAG AA — ${ratio}:1 is below the 4.5:1 minimum.`}
              </p>
              {!overallPass && (
                <button
                  onClick={autoFix}
                  className="flex shrink-0 items-center gap-1.5 rounded-xl border border-[#e8531f]/25 bg-[#e8531f]/10 px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#e8531f] transition hover:bg-[#e8531f]/18"
                >
                  {justFixed ? "✓ Fixed!" : "⚡ Auto-fix"}
                </button>
              )}
            </div>
          </motion.div>

          {/* ── LIVE PREVIEW ── */}
          <motion.div variants={fadeUp} className="mb-4 overflow-hidden rounded-[20px] border border-black/[0.08] shadow-[0_2px_12px_rgba(28,23,18,0.07)]">
            <div className="border-b border-black/[0.07] bg-white px-5 py-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.20em] text-[#1c1712]/35">Live preview</p>
            </div>
            <div className="space-y-3 px-7 py-7" style={{ backgroundColor: bg }}>
              <p style={{ color: fg }} className="text-2xl font-bold leading-tight tracking-[-0.03em]">Large heading text</p>
              <p style={{ color: fg }} className="text-base leading-7">Body text at 16px — WCAG AA requires 4.5:1 for text this size.</p>
              <p style={{ color: fg }} className="text-sm opacity-80">Small text at 14px needs higher contrast — at least 4.5:1 for AA.</p>
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="rounded-lg px-4 py-2 text-sm font-semibold" style={{ backgroundColor: fg, color: bg }}>Button</span>
                <span className="rounded-lg border px-4 py-2 text-sm font-semibold" style={{ color: fg, borderColor: fg }}>Outline</span>
                <span className="px-2 py-2 text-sm font-medium underline underline-offset-2" style={{ color: fg }}>Link text</span>
              </div>
            </div>
          </motion.div>

          {/* ── WCAG THRESHOLDS ── */}
          <motion.div variants={fadeUp} className="mb-8 overflow-hidden rounded-[20px] border border-black/[0.08] bg-white shadow-[0_1px_6px_rgba(28,23,18,0.06)]">
            <div className="border-b border-black/[0.07] px-5 py-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.20em] text-[#1c1712]/35">WCAG thresholds</p>
            </div>
            <div className="divide-y divide-black/[0.05]">
              {[
                { req: 3,   label: "Large text",   standard: "AA",  pass: ratio >= 3 },
                { req: 4.5, label: "Normal text",  standard: "AA",  pass: ratio >= 4.5 },
                { req: 7,   label: "Normal text",  standard: "AAA", pass: ratio >= 7 },
              ].map((row) => (
                <div key={row.req} className="flex items-center gap-4 px-5 py-4">
                  <span className={`flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold ${row.pass ? "bg-emerald-100 text-emerald-600" : "bg-red-100/80 text-red-500"}`}>
                    {row.pass ? "✓" : "✗"}
                  </span>
                  <div className="flex flex-1 items-center gap-2">
                    <span className="font-mono text-sm font-semibold text-[#1c1712]/70">{row.req}:1</span>
                    <span className="text-sm text-[#1c1712]/40">{row.label}</span>
                  </div>
                  <span className={`rounded-lg border px-3 py-1 text-[11px] font-bold ${row.pass ? "border-emerald-200/70 bg-emerald-50 text-emerald-700" : "border-red-200/60 bg-red-50 text-red-600"}`}>
                    WCAG {row.standard}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <ToolPageSections config={toolPageContent.contrast} />
        </motion.div>
      </main>
    </div>
  );
}
