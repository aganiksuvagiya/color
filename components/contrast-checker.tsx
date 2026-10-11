"use client";

import Link from "next/link";
import { useState, useCallback } from "react";
import { Header } from "./header";
import { ToolPageSections } from "@/components/seo/tool-page-sections";
import { isValidHex } from "@/lib/color-utils";
import { getContrastRatio, getWcagLevel, suggestAccessibleColor } from "@/lib/accessibility";
import { findClosestColorName } from "@/lib/color-names";
import { toolPageContent } from "@/lib/seo/tool-pages";

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

const LEVEL_STYLES: Record<Level, { pill: string; label: string }> = {
  AAA: { pill: "bg-emerald-50 text-emerald-700", label: "AAA" },
  AA: { pill: "bg-amber-50 text-amber-700", label: "AA" },
  Fail: { pill: "bg-red-50 text-red-700", label: "Fail" },
};

function LevelCard({ label, level }: { label: string; level: Level }) {
  const s = LEVEL_STYLES[level];
  return (
    <div className="rounded-xl p-4 ring-1 ring-black/[0.07]">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#c2410c]">{label}</p>
      <p className="mt-2">
        <span className={`rounded-full px-3 py-1 text-[15px] font-bold ${s.pill}`}>{level === "Fail" ? "Fails" : s.label}</span>
      </p>
    </div>
  );
}

const labelCls = "text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1c1712]/45";
const inputCls = "mt-1.5 h-10 w-full rounded-xl px-3 font-mono text-[13px] text-[#1c1712] outline-none ring-1 ring-black/[0.12] transition focus:ring-black/30";

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
    <div className="min-h-screen bg-white text-[#1c1712]">
      <Header />

      <main>
        {/* ── Header ── */}
        <section className="w-full px-6 pb-8 pt-28 sm:px-8 lg:px-12">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[12px] text-[#1c1712]/40">
            <Link href="/" className="transition hover:text-[#1c1712]/70">Home</Link>
            <span className="text-[#1c1712]/20">/</span>
            <Link href="/tools" className="transition hover:text-[#1c1712]/70">Tools</Link>
            <span className="text-[#1c1712]/20">/</span>
            <span className="text-[#1c1712]/60">Contrast Checker</span>
          </nav>
          <h1 className="mt-8 text-[2.6rem] font-bold leading-[1.05] tracking-[-0.035em] sm:text-[3.5rem]">Color Contrast Checker</h1>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="flex -space-x-1.5" aria-hidden="true">
              <span className="h-5 w-5 rounded-full ring-2 ring-white" style={{ backgroundColor: fg }} />
              <span className="h-5 w-5 rounded-full ring-2 ring-white" style={{ backgroundColor: bg }} />
            </span>
            <p className="text-[16px] text-[#1c1712]/55">
              <span className="font-semibold text-[#1c1712]/80">WCAG 2.1 AA and AAA, free.</span> Pick a text and a background color to see if they pass accessibility standards.
            </p>
          </div>
        </section>

        {/* ── Workspace ── */}
        <section className="border-t border-black/[0.06]">
          <div className="grid w-full gap-8 px-6 py-10 sm:px-8 lg:grid-cols-[1.4fr_1fr] lg:px-12">
            {/* Colors */}
            <div>
              <div className="relative flex h-72 overflow-hidden rounded-2xl ring-1 ring-black/[0.07]">
                <label className="relative flex flex-1 cursor-pointer flex-col justify-end p-6" style={{ backgroundColor: fg }}>
                  <input
                    type="color"
                    value={fg}
                    onChange={(e) => { setFg(e.target.value); setFgInput(e.target.value); }}
                    className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                    aria-label="Pick foreground color"
                  />
                  <div className="pointer-events-none space-y-1">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em]" style={{ color: fgA, opacity: 0.6 }}>Foreground (text)</p>
                    <p className="font-mono text-[16px] font-bold" style={{ color: fgA }}>{fg.toUpperCase()}</p>
                    <p className="text-[12px]" style={{ color: fgA, opacity: 0.6 }}>{findClosestColorName(fg)}</p>
                  </div>
                </label>
                <label className="relative flex flex-1 cursor-pointer flex-col items-end justify-end p-6" style={{ backgroundColor: bg }}>
                  <input
                    type="color"
                    value={bg}
                    onChange={(e) => { setBg(e.target.value); setBgInput(e.target.value); }}
                    className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                    aria-label="Pick background color"
                  />
                  <div className="pointer-events-none space-y-1 text-right">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em]" style={{ color: bgA, opacity: 0.6 }}>Background</p>
                    <p className="font-mono text-[16px] font-bold" style={{ color: bgA }}>{bg.toUpperCase()}</p>
                    <p className="text-[12px]" style={{ color: bgA, opacity: 0.6 }}>{findClosestColorName(bg)}</p>
                  </div>
                </label>
                <div className="pointer-events-none absolute inset-y-0 left-1/2 flex -translate-x-1/2 items-center">
                  <div className="rounded-xl bg-white px-4 py-3 text-center shadow-lg ring-1 ring-black/[0.08]">
                    <p className="font-mono text-[22px] font-bold leading-none">{ratio}:1</p>
                    <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#1c1712]/40">ratio</p>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex items-end gap-3">
                <div className="flex-1">
                  <label className={labelCls} htmlFor="fg-hex">Foreground</label>
                  <input id="fg-hex" type="text" value={fgInput} onChange={(e) => handleFgText(e.target.value)} maxLength={7} spellCheck={false} placeholder="#000000" className={inputCls} />
                </div>
                <button
                  onClick={swap}
                  className="mb-0 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-[15px] text-[#1c1712]/60 ring-1 ring-black/[0.12] transition hover:text-[#1c1712] hover:ring-black/25"
                  title="Swap colors"
                  aria-label="Swap foreground and background"
                >
                  ⇅
                </button>
                <div className="flex-1">
                  <label className={labelCls} htmlFor="bg-hex">Background</label>
                  <input id="bg-hex" type="text" value={bgInput} onChange={(e) => handleBgText(e.target.value)} maxLength={7} spellCheck={false} placeholder="#000000" className={inputCls} />
                </div>
              </div>
            </div>

            {/* Result */}
            <div className="rounded-2xl p-6 ring-1 ring-black/[0.07]">
              <p className={labelCls}>Contrast ratio</p>
              <p className="mt-1 font-mono text-[3rem] font-bold leading-none tracking-[-0.03em]">{ratio}<span className="text-[#1c1712]/30">:1</span></p>

              <div className="relative mt-5 h-2.5 overflow-hidden rounded-full bg-black/[0.06]">
                <div className="absolute inset-y-0 left-0 rounded-full transition-[width] duration-500" style={{ width: `${gaugePct}%`, backgroundColor: gaugeColor }} />
                {[3, 4.5, 7].map((m) => (
                  <div key={m} className="absolute top-0 h-full w-0.5 bg-white/70" style={{ left: `${(m / 21) * 100}%` }} />
                ))}
              </div>
              <div className="relative mt-1 h-4">
                {[{ v: 3, l: "3:1" }, { v: 4.5, l: "4.5:1" }, { v: 7, l: "7:1" }, { v: 21, l: "21:1" }].map((m) => (
                  <span key={m.v} className="absolute font-mono text-[10px] text-[#1c1712]/35" style={{ left: `${(m.v / 21) * 100}%`, transform: "translateX(-50%)" }}>
                    {m.l}
                  </span>
                ))}
              </div>

              <div className="mt-5 grid grid-cols-2 gap-4">
                <LevelCard label="Normal text" level={level} />
                <LevelCard label="Large text" level={large} />
              </div>

              <div className={`mt-5 flex flex-wrap items-center gap-3 rounded-xl px-4 py-3.5 ${overallPass ? "bg-emerald-50" : "bg-red-50"}`}>
                <p className={`min-w-0 flex-1 text-[14px] font-semibold ${overallPass ? "text-emerald-800" : "text-red-700"}`}>
                  {overallPass
                    ? `Passes WCAG AA: ${ratio}:1 meets the 4.5:1 minimum.`
                    : `Fails WCAG AA: ${ratio}:1 is below the 4.5:1 minimum.`}
                </p>
                {!overallPass && (
                  <button onClick={autoFix} className="shrink-0 rounded-full bg-[#1c1712] px-4 py-1.5 text-[12px] font-semibold text-white transition hover:bg-[#c2410c]">
                    {justFixed ? "✓ Fixed" : "⚡ Auto-fix"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ── Preview + thresholds ── */}
        <section className="border-t border-black/[0.06]">
          <div className="grid w-full gap-10 px-6 py-14 sm:px-8 lg:grid-cols-[1.4fr_1fr] lg:gap-12 lg:px-12">
            <div>
              <h2 className="mb-5 flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#1c1712]/40">
                Live preview
                <span className="h-px flex-1 bg-black/[0.06]" />
              </h2>
              <div className="space-y-3 rounded-2xl px-7 py-8 ring-1 ring-black/[0.07]" style={{ backgroundColor: bg }}>
                <p style={{ color: fg }} className="text-2xl font-bold leading-tight tracking-[-0.03em]">Large heading text</p>
                <p style={{ color: fg }} className="text-base leading-7">Body text at 16px. WCAG AA requires 4.5:1 for text this size.</p>
                <p style={{ color: fg }} className="text-sm opacity-80">Small text at 14px needs at least 4.5:1 for AA.</p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="rounded-lg px-4 py-2 text-sm font-semibold" style={{ backgroundColor: fg, color: bg }}>Button</span>
                  <span className="rounded-lg border px-4 py-2 text-sm font-semibold" style={{ color: fg, borderColor: fg }}>Outline</span>
                  <span className="px-2 py-2 text-sm font-medium underline underline-offset-2" style={{ color: fg }}>Link text</span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="mb-5 flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#1c1712]/40">
                WCAG thresholds
                <span className="h-px flex-1 bg-black/[0.06]" />
              </h2>
              <div className="divide-y divide-black/[0.07] rounded-2xl ring-1 ring-black/[0.07]">
                {[
                  { req: 3, label: "Large text", standard: "AA", pass: ratio >= 3 },
                  { req: 4.5, label: "Normal text", standard: "AA", pass: ratio >= 4.5 },
                  { req: 7, label: "Normal text", standard: "AAA", pass: ratio >= 7 },
                ].map((row) => (
                  <div key={`${row.req}-${row.standard}`} className="flex items-center gap-4 px-5 py-4">
                    <span className={`flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold ${row.pass ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-600"}`}>
                      {row.pass ? "✓" : "✗"}
                    </span>
                    <div className="flex flex-1 items-center gap-2">
                      <span className="font-mono text-sm font-semibold text-[#1c1712]/75">{row.req}:1</span>
                      <span className="text-sm text-[#1c1712]/50">{row.label}</span>
                    </div>
                    <span className="text-[12px] font-semibold text-[#1c1712]/60">WCAG {row.standard}</span>
                  </div>
                ))}
              </div>
              <Link href="/tools/contrast-fixer" className="mt-5 inline-block rounded-full px-4 py-2 text-[13px] font-semibold text-[#1c1712]/70 ring-1 ring-black/[0.12] transition hover:text-[#1c1712] hover:ring-black/25">
                Try the smart contrast fixer →
              </Link>
            </div>
          </div>
        </section>

        <ToolPageSections config={toolPageContent.contrast} variant="new" />
      </main>
    </div>
  );
}
