"use client";

import Link from "next/link";
import { useState, useMemo, useCallback } from "react";
import { Header } from "./header";
import { ToolPageSections } from "@/components/seo/tool-page-sections";
import { isValidHex } from "@/lib/color-utils";
import { getContrastRatio, getWcagLevel, suggestAccessibleColor } from "@/lib/accessibility";
import { findClosestColorName } from "@/lib/color-names";
import { toolPageContent } from "@/lib/seo/tool-pages";

type Level = "AAA" | "AA" | "Fail";
type TargetLevel = "AA" | "AAA";
const TARGET_RATIOS: Record<TargetLevel, number> = { AA: 4.5, AAA: 7 };

const BADGE_STYLES: Record<Level, string> = {
  AAA: "bg-emerald-600 text-white",
  AA: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20",
  Fail: "bg-red-50 text-red-700 ring-1 ring-red-600/20",
};

const FAILING_PAIRS = [
  { name: "Gray on white", fg: "#9CA3AF", bg: "#FFFFFF" },
  { name: "White on amber", fg: "#FFFFFF", bg: "#F59E0B" },
  { name: "Sky on white", fg: "#38BDF8", bg: "#FFFFFF" },
  { name: "Yellow on white", fg: "#FACC15", bg: "#FFFFFF" },
];

const labelCls = "text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1c1712]/45";
const inputCls = "h-10 min-w-0 flex-1 rounded-xl px-3 font-mono text-[13px] text-[#1c1712] outline-none ring-1 ring-black/[0.12] transition focus:ring-2 focus:ring-[#1c1712]";

function LevelBadge({ level }: { level: Level }) {
  return <span className={`inline-flex shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-bold ${BADGE_STYLES[level]}`}>{level === "Fail" ? "Fails" : level}</span>;
}

function SwapIcon() {
  return (
    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 7h13M16 3l4 4-4 4M17 17H4M8 13l-4 4 4 4" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
    </svg>
  );
}

function ColorField({
  id,
  label,
  value,
  text,
  onText,
  onPick,
}: {
  id: string;
  label: string;
  value: string;
  text: string;
  onText: (v: string) => void;
  onPick: (v: string) => void;
}) {
  return (
    <div className="min-w-0">
      <label className={labelCls} htmlFor={id}>{label}</label>
      <div className="mt-1.5 flex items-center gap-2.5">
        <label
          className="relative h-10 w-10 shrink-0 cursor-pointer overflow-hidden rounded-xl ring-1 ring-black/10 transition hover:ring-black/30"
          title="Open your system color picker"
        >
          <input
            type="color"
            value={value.toLowerCase()}
            onChange={(e) => onPick(e.target.value.toUpperCase())}
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
            aria-label={`Pick ${label.toLowerCase()} color`}
          />
          <span className="block h-full w-full" style={{ backgroundColor: value }} />
        </label>
        <input id={id} type="text" value={text} onChange={(e) => onText(e.target.value)} maxLength={7} spellCheck={false} placeholder="#000000" className={inputCls} />
      </div>
      <p className="mt-1.5 truncate text-[12px] text-[#1c1712]/45">{findClosestColorName(value)}</p>
    </div>
  );
}

function Stage({ label, tone, bg, fg, ratio, level }: { label: string; tone: "before" | "after"; bg: string; fg: string; ratio: number; level: Level }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl ring-1 ring-black/[0.07]">
      <div className="relative flex min-h-[16rem] flex-1 flex-col justify-end gap-2 p-6 pt-16 transition-colors duration-150" style={{ backgroundColor: bg, color: fg }}>
        <span
          className={`absolute left-4 top-4 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${
            tone === "after" ? "bg-emerald-600 text-white" : "bg-white/90 text-[#1c1712]/70 ring-1 ring-black/10"
          }`}
        >
          {label}
        </span>
        <p className="text-[1.9rem] font-bold leading-[1.1] tracking-[-0.03em]">Heading text</p>
        <p className="max-w-sm text-[15px] leading-6">Body text in this color. Check that it stays easy to read at a normal size.</p>
        <p className="text-[12px] leading-5">Small text needs the same ratio to pass.</p>
      </div>
      <div className="flex items-center gap-3 bg-white px-4 py-3">
        <span className="h-7 w-7 shrink-0 rounded-lg ring-1 ring-black/10" style={{ backgroundColor: fg }} />
        <span className="font-mono text-[13px] font-semibold">{fg.toUpperCase()}</span>
        <span className="font-mono text-[13px] text-[#1c1712]/50">{ratio.toFixed(2)}:1</span>
        <span className="ml-auto">
          <LevelBadge level={level} />
        </span>
      </div>
    </div>
  );
}

export function ContrastFixer() {
  const [fg, setFg] = useState("#777777");
  const [bg, setBg] = useState("#FFFFFF");
  const [fgInput, setFgInput] = useState("#777777");
  const [bgInput, setBgInput] = useState("#FFFFFF");
  const [targetLevel, setTargetLevel] = useState<TargetLevel>("AA");
  const [applied, setApplied] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const ratio = getContrastRatio(fg, bg);
  const level = getWcagLevel(ratio) as Level;
  const targetRatio = TARGET_RATIOS[targetLevel];
  const needsFix = ratio < targetRatio;

  const suggestedFg = useMemo(
    () => (needsFix ? suggestAccessibleColor(fg, bg, targetRatio) : fg),
    [fg, bg, targetRatio, needsFix]
  );
  const fixedRatio = needsFix ? getContrastRatio(suggestedFg, bg) : ratio;
  const fixedLevel = getWcagLevel(fixedRatio) as Level;

  const handleFgText = (v: string) => {
    const up = v.toUpperCase();
    setFgInput(up);
    const n = up.startsWith("#") ? up : `#${up}`;
    if (isValidHex(n) && n.length === 7) { setFg(n); setApplied(false); }
  };
  const handleBgText = (v: string) => {
    const up = v.toUpperCase();
    setBgInput(up);
    const n = up.startsWith("#") ? up : `#${up}`;
    if (isValidHex(n) && n.length === 7) { setBg(n); setApplied(false); }
  };
  const pickFg = (v: string) => { setFg(v); setFgInput(v); setApplied(false); };
  const pickBg = (v: string) => { setBg(v); setBgInput(v); setApplied(false); };
  const applyFix = () => { setFg(suggestedFg); setFgInput(suggestedFg); setApplied(true); };
  const swapColors = () => { setFg(bg); setFgInput(bg); setBg(fg); setBgInput(fg); setApplied(false); };
  const loadPair = (p: { fg: string; bg: string }) => { pickFg(p.fg); pickBg(p.bg); };

  const copyHex = useCallback(async (hex: string) => {
    await navigator.clipboard.writeText(hex);
    setCopied(hex);
    setTimeout(() => setCopied((c) => (c === hex ? null : c)), 1400);
  }, []);

  const gaugeColor = ratio >= 7 ? "#10b981" : ratio >= 4.5 ? "#f59e0b" : ratio >= 3 ? "#f97316" : "#ef4444";
  const gaugeW = Math.min(100, (ratio / 21) * 100);

  return (
    <div className="min-h-screen bg-white text-[#1c1712]">
      <Header />

      {copied && (
        <div role="status" className="fixed bottom-8 left-1/2 z-[100] -translate-x-1/2 whitespace-nowrap rounded-full bg-[#1c1712] px-5 py-2.5 text-[13px] font-semibold text-white shadow-lg">
          ✓ Copied {copied.toUpperCase()}
        </div>
      )}

      <main>
        {/* ── Header ── */}
        <section className="w-full px-6 pb-8 pt-28 sm:px-8 lg:px-12">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[12px] text-[#1c1712]/40">
            <Link href="/" className="transition hover:text-[#1c1712]/70">Home</Link>
            <span className="text-[#1c1712]/20">/</span>
            <Link href="/tools" className="transition hover:text-[#1c1712]/70">Tools</Link>
            <span className="text-[#1c1712]/20">/</span>
            <span className="text-[#1c1712]/60">Contrast Fixer</span>
          </nav>
          <h1 className="mt-8 text-[2.6rem] font-bold leading-[1.05] tracking-[-0.035em] sm:text-[3.5rem]">Smart Contrast Fixer</h1>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="flex -space-x-1.5" aria-hidden="true">
              <span className="h-5 w-5 rounded-full ring-2 ring-white" style={{ backgroundColor: fg }} />
              <span className="h-5 w-5 rounded-full ring-2 ring-white" style={{ backgroundColor: needsFix ? suggestedFg : bg }} />
              <span className="h-5 w-5 rounded-full ring-2 ring-white" style={{ backgroundColor: bg }} />
            </span>
            <p className="text-[16px] text-[#1c1712]/55">
              <span className="font-semibold text-[#1c1712]/80">WCAG AA and AAA, free.</span> Auto-fix a failing text color while keeping the shade as close to your design as possible.
            </p>
          </div>
        </section>

        {/* ── Workspace ── */}
        <section className="border-t border-black/[0.06]">
          <div className="grid w-full gap-6 px-6 py-10 sm:px-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:px-12">
            {/* Before / after, then the controls */}
            <div className="flex flex-col gap-6">
              <div className={`grid flex-1 gap-4 ${needsFix ? "sm:grid-cols-2" : ""}`}>
                <Stage label={needsFix ? "Before" : "Your colors"} tone="before" bg={bg} fg={fg} ratio={ratio} level={level} />
                {needsFix && <Stage label="After fix" tone="after" bg={bg} fg={suggestedFg} ratio={fixedRatio} level={fixedLevel} />}
              </div>

              <div className="rounded-2xl p-5 ring-1 ring-black/[0.07] sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className={labelCls}>Target level</p>
                  <div className="flex gap-2" role="group" aria-label="Target WCAG level">
                    {(["AA", "AAA"] as TargetLevel[]).map((lv) => (
                      <button
                        key={lv}
                        onClick={() => { setTargetLevel(lv); setApplied(false); }}
                        aria-pressed={targetLevel === lv}
                        className={`rounded-full px-4 py-1.5 text-[13px] font-semibold transition ${
                          targetLevel === lv ? "bg-[#1c1712] text-white" : "text-[#1c1712]/65 ring-1 ring-black/[0.12] hover:text-[#1c1712] hover:ring-black/25"
                        }`}
                      >
                        {lv} <span className="font-normal opacity-70">{TARGET_RATIOS[lv]}:1</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-5 grid items-start gap-4 sm:grid-cols-[1fr_auto_1fr] sm:gap-3">
                  <ColorField id="fix-fg" label="Text color" value={fg} text={fgInput} onText={handleFgText} onPick={pickFg} />
                  <button
                    onClick={swapColors}
                    className="flex h-10 w-10 shrink-0 items-center justify-center justify-self-center rounded-xl text-[#1c1712]/60 ring-1 ring-black/[0.12] transition hover:text-[#1c1712] hover:ring-black/25 max-sm:rotate-90 sm:mt-[22px]"
                    title="Swap colors"
                    aria-label="Swap text and background colors"
                  >
                    <SwapIcon />
                  </button>
                  <ColorField id="fix-bg" label="Background" value={bg} text={bgInput} onText={handleBgText} onPick={pickBg} />
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-black/[0.06] pt-4">
                  <span className="mr-1 text-[13px] text-[#1c1712]/50">Try a failing pair</span>
                  {FAILING_PAIRS.map((p) => (
                    <button
                      key={p.name}
                      onClick={() => loadPair(p)}
                      className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white py-1 pl-1 pr-3 text-[13px] font-semibold text-[#1c1712]/75 transition hover:border-black/25 hover:text-[#1c1712]"
                    >
                      <span className="flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold ring-1 ring-black/10" style={{ backgroundColor: p.bg, color: p.fg }}>
                        A
                      </span>
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Result */}
            <div className="flex flex-col divide-y divide-black/[0.06] rounded-2xl ring-1 ring-black/[0.07]">
              <div className="p-6">
                <div className="flex items-center justify-between gap-3">
                  <p className={labelCls}>Contrast ratio</p>
                  <LevelBadge level={level} />
                </div>
                <p className="mt-2 font-mono text-[3.5rem] font-bold leading-none tracking-[-0.03em]">
                  {ratio.toFixed(2)}
                  <span className="text-[#1c1712]/30">:1</span>
                </p>
                <div className="relative mt-5 h-2.5 overflow-hidden rounded-full bg-black/[0.06]">
                  <div className="absolute inset-y-0 left-0 rounded-full transition-[width] duration-500" style={{ width: `${gaugeW}%`, backgroundColor: gaugeColor }} />
                  {[3, 4.5, 7].map((m) => (
                    <div key={m} className="absolute top-0 h-full w-0.5 bg-white/70" style={{ left: `${(m / 21) * 100}%` }} />
                  ))}
                </div>
                <div className="relative mt-1 h-4">
                  {[{ v: 3, l: "3:1" }, { v: 4.5, l: "4.5:1" }, { v: 7, l: "7:1" }].map((m) => (
                    <span key={m.v} className="absolute font-mono text-[10px] text-[#1c1712]/35" style={{ left: `${(m.v / 21) * 100}%`, transform: "translateX(-50%)" }}>
                      {m.l}
                    </span>
                  ))}
                </div>
                <p className={`mt-3 text-[14px] font-semibold ${needsFix ? "text-red-700" : "text-emerald-700"}`}>
                  {needsFix ? `Needs ${targetRatio}:1 for ${targetLevel}.` : `✓ Passes ${targetLevel}.`}
                </p>
              </div>

              {needsFix ? (
                <div className="p-6">
                  <p className={labelCls}>Suggested fix</p>
                  <div className="mt-3 flex items-center gap-3">
                    <div className="min-w-0">
                      <span className="block h-10 w-10 rounded-xl ring-1 ring-black/10" style={{ backgroundColor: fg }} />
                      <p className="mt-1.5 font-mono text-[11px] text-[#1c1712]/50">{fg.toUpperCase()}</p>
                    </div>
                    <span className="text-[#1c1712]/30" aria-hidden="true">→</span>
                    <div className="min-w-0">
                      <span className="block h-10 w-10 rounded-xl ring-2 ring-emerald-500" style={{ backgroundColor: suggestedFg }} />
                      <p className="mt-1.5 font-mono text-[11px] font-semibold text-emerald-700">{suggestedFg.toUpperCase()}</p>
                    </div>
                    <p className="ml-auto font-mono text-xl font-bold text-emerald-700">{fixedRatio.toFixed(2)}:1</p>
                  </div>
                  <button onClick={applyFix} className="mt-4 w-full rounded-full bg-[#1c1712] py-2.5 text-[14px] font-semibold text-white transition hover:bg-[#c2410c]">
                    Apply suggested color
                  </button>
                </div>
              ) : (
                <div className="p-6">
                  <p className="rounded-xl bg-emerald-50 px-4 py-3 text-[14px] font-semibold text-emerald-800">
                    {applied ? `✓ Fix applied. Your colors now pass ${targetLevel}.` : `✓ Already passes ${targetLevel}. No fix needed.`}
                  </p>
                </div>
              )}

              <div className="p-6">
                <p className={labelCls}>Copy</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {[
                    { label: "Text", hex: fg },
                    { label: "Background", hex: bg },
                    ...(needsFix ? [{ label: "Fixed text", hex: suggestedFg }] : []),
                  ].map((c) => (
                    <button
                      key={c.label}
                      onClick={() => copyHex(c.hex)}
                      className="inline-flex items-center gap-2 rounded-full py-1.5 pl-2 pr-3.5 text-[13px] font-semibold text-[#1c1712]/70 ring-1 ring-black/[0.12] transition hover:text-[#1c1712] hover:ring-black/25"
                    >
                      <span className="h-4 w-4 rounded-full ring-1 ring-black/10" style={{ backgroundColor: c.hex }} />
                      {c.label}
                      <CopyIcon />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <ToolPageSections config={toolPageContent["contrast-fixer"]} variant="new" />
      </main>
    </div>
  );
}
