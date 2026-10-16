"use client";

import Link from "next/link";
import { useState, useCallback, useRef } from "react";
import { Header } from "./header";
import { ToolPageSections } from "@/components/seo/tool-page-sections";
import { isValidHex } from "@/lib/color-utils";
import { getContrastRatio, getWcagLevel, suggestAccessibleColor } from "@/lib/accessibility";
import { findClosestColorName } from "@/lib/color-names";
import { toolPageContent } from "@/lib/seo/tool-pages";

type Level = "AAA" | "AA" | "Fail";

const VERDICT_STYLES: Record<Level, string> = {
  AAA: "bg-emerald-600 text-white",
  AA: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20",
  Fail: "bg-red-50 text-red-700 ring-1 ring-red-600/20",
};

const CHECKS = [
  { label: "Normal text", note: "Under 18pt, or 14pt bold", std: "AA", min: 4.5 },
  { label: "Normal text", note: "Under 18pt, or 14pt bold", std: "AAA", min: 7 },
  { label: "Large text", note: "18pt and up, or 14pt bold", std: "AA", min: 3 },
  { label: "Large text", note: "18pt and up, or 14pt bold", std: "AAA", min: 4.5 },
  { label: "UI components", note: "Icons, borders, form fields", std: "AA", min: 3 },
];

const PAIRS = [
  { name: "Ink on white", fg: "#1C1712", bg: "#FFFFFF" },
  { name: "White on indigo", fg: "#FFFFFF", bg: "#4F46E5" },
  { name: "White on ink", fg: "#FFFFFF", bg: "#1C1712" },
  { name: "Forest on mint", fg: "#14532D", bg: "#DCFCE7" },
  { name: "Navy on sky", fg: "#1E3A8A", bg: "#DBEAFE" },
  { name: "Rust on peach", fg: "#7C2D12", bg: "#FFEDD5" },
  { name: "White on amber", fg: "#FFFFFF", bg: "#F59E0B" },
  { name: "Gray on white", fg: "#9CA3AF", bg: "#FFFFFF" },
];

const labelCls = "text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1c1712]/45";
const inputCls = "h-10 min-w-0 flex-1 rounded-xl px-3 font-mono text-[13px] text-[#1c1712] outline-none ring-1 ring-black/[0.12] transition focus:ring-2 focus:ring-[#1c1712]";

function SwapIcon() {
  return (
    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 7h13M16 3l4 4-4 4M17 17H4M8 13l-4 4 4 4" />
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
            onChange={(e) => onPick(e.target.value)}
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

export function ContrastChecker() {
  const [fg, setFg] = useState("#FFFFFF");
  const [bg, setBg] = useState("#4F46E5");
  const [fgInput, setFgInput] = useState("#FFFFFF");
  const [bgInput, setBgInput] = useState("#4F46E5");
  const [justFixed, setJustFixed] = useState(false);
  const workspaceRef = useRef<HTMLElement>(null);

  const ratio = isValidHex(fg) && isValidHex(bg) ? getContrastRatio(fg, bg) : 0;
  const level = getWcagLevel(ratio) as Level;
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
  const pickFg = (v: string) => { setFg(v); setFgInput(v); };
  const pickBg = (v: string) => { setBg(v); setBgInput(v); };

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

  const loadPair = (pair: { fg: string; bg: string }) => {
    pickFg(pair.fg);
    pickBg(pair.bg);
    setJustFixed(false);
    workspaceRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const gaugeColor = ratio >= 7 ? "#10b981" : ratio >= 4.5 ? "#f59e0b" : ratio >= 3 ? "#f97316" : "#ef4444";
  const gaugePct = Math.min((ratio / 21) * 100, 100);
  const chipStyle = { color: fg, borderColor: fg };

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
        <section ref={workspaceRef} className="scroll-mt-24 border-t border-black/[0.06]">
          <div className="grid w-full gap-6 px-6 py-10 sm:px-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:px-12">
            {/* Stage: the pair, shown the way people will read it */}
            <div className="flex flex-col overflow-hidden rounded-2xl ring-1 ring-black/[0.07]">
              <div className="flex min-h-[20rem] flex-1 flex-col justify-center gap-4 p-6 transition-colors duration-150 sm:p-10" style={{ backgroundColor: bg, color: fg }}>
                <span
                  className="w-fit rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em]"
                  style={{ borderColor: fg, opacity: 0.8 }}
                >
                  Live preview
                </span>
                <p className="text-3xl font-bold leading-[1.1] tracking-[-0.03em] sm:text-[2.6rem]">Large heading text</p>
                <p className="max-w-xl text-base leading-7">Body text at 16px. WCAG AA asks for 4.5:1 on text this size, so this is the line to judge.</p>
                <p className="max-w-xl text-sm leading-6">Small text at 14px needs the same 4.5:1 for AA, and 7:1 for AAA.</p>
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  <span className="rounded-lg px-4 py-2 text-sm font-semibold" style={{ backgroundColor: fg, color: bg }}>Button</span>
                  <span className="rounded-lg border px-4 py-2 text-sm font-semibold" style={chipStyle}>Outline</span>
                  <span className="px-2 py-2 text-sm font-medium underline underline-offset-2">Link text</span>
                </div>
              </div>

              <div className="grid items-start gap-4 border-t border-black/[0.07] bg-white p-5 sm:grid-cols-[1fr_auto_1fr] sm:gap-3 sm:p-6">
                <ColorField id="fg-hex" label="Text color" value={fg} text={fgInput} onText={handleFgText} onPick={pickFg} />
                <button
                  onClick={swap}
                  className="flex h-10 w-10 shrink-0 items-center justify-center justify-self-center rounded-xl text-[#1c1712]/60 ring-1 ring-black/[0.12] transition hover:text-[#1c1712] hover:ring-black/25 max-sm:rotate-90 sm:mt-[22px]"
                  title="Swap colors"
                  aria-label="Swap text and background colors"
                >
                  <SwapIcon />
                </button>
                <ColorField id="bg-hex" label="Background" value={bg} text={bgInput} onText={handleBgText} onPick={pickBg} />
              </div>
            </div>

            {/* Result */}
            <div className="flex flex-col rounded-2xl p-6 ring-1 ring-black/[0.07]">
              <div className="flex items-center justify-between gap-3">
                <p className={labelCls}>Contrast ratio</p>
                <span className={`rounded-full px-3 py-1 text-[12px] font-bold ${VERDICT_STYLES[level]}`}>{level === "Fail" ? "Fails AA" : level}</span>
              </div>
              <p className="mt-2 font-mono text-[3.5rem] font-bold leading-none tracking-[-0.03em]">
                {ratio.toFixed(2)}
                <span className="text-[#1c1712]/30">:1</span>
              </p>

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

              <ul className="mt-5 divide-y divide-black/[0.06] border-y border-black/[0.06]">
                {CHECKS.map((row) => {
                  const pass = ratio >= row.min;
                  return (
                    <li key={`${row.label}-${row.std}`} className="flex items-center gap-3 py-3">
                      <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[12px] font-bold ${pass ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-600"}`} aria-hidden="true">
                        {pass ? "✓" : "✕"}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-[14px] font-semibold leading-5">
                          {row.label} <span className="font-medium text-[#1c1712]/45">· WCAG {row.std}</span>
                        </p>
                        <p className="text-[12px] text-[#1c1712]/45">{row.note}</p>
                      </div>
                      <span className="shrink-0 font-mono text-[12px] font-semibold text-[#1c1712]/55">{row.min}:1</span>
                      <span className={`w-11 shrink-0 text-right text-[12px] font-bold ${pass ? "text-emerald-700" : "text-red-600"}`}>{pass ? "Pass" : "Fail"}</span>
                    </li>
                  );
                })}
              </ul>

              <div className={`mt-5 flex flex-wrap items-center gap-3 rounded-xl px-4 py-3.5 ${overallPass ? "bg-emerald-50" : "bg-red-50"}`}>
                <p className={`min-w-0 flex-1 text-[14px] font-semibold ${overallPass ? "text-emerald-800" : "text-red-700"}`}>
                  {overallPass
                    ? `Passes WCAG AA: ${ratio.toFixed(2)}:1 meets the 4.5:1 minimum.`
                    : `Fails WCAG AA: ${ratio.toFixed(2)}:1 is below the 4.5:1 minimum.`}
                </p>
                {!overallPass && (
                  <button onClick={autoFix} className="shrink-0 rounded-full bg-[#1c1712] px-4 py-1.5 text-[12px] font-semibold text-white transition hover:bg-[#c2410c]">
                    {justFixed ? "✓ Fixed" : "Auto-fix text color"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ── Try a pair ── */}
        <section className="border-t border-black/[0.06]">
          <div className="w-full px-6 py-14 sm:px-8 lg:px-12">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="max-w-2xl">
                <h2 className="text-[1.75rem] font-semibold tracking-[-0.03em]">Try a pair</h2>
                <p className="mt-2 text-[15px] leading-7 text-[#1c1712]/55">Click any pair to load it into the checker. Six pass, two fail on purpose, so you can see the difference.</p>
              </div>
              <Link href="/tools/contrast-fixer" className="rounded-full px-4 py-2 text-[13px] font-semibold text-[#1c1712]/70 ring-1 ring-black/[0.12] transition hover:text-[#1c1712] hover:ring-black/25">
                Try the smart contrast fixer →
              </Link>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {PAIRS.map((p) => {
                const r = getContrastRatio(p.fg, p.bg);
                const l = getWcagLevel(r) as Level;
                const active = p.fg.toLowerCase() === fg.toLowerCase() && p.bg.toLowerCase() === bg.toLowerCase();
                return (
                  <button
                    key={p.name}
                    onClick={() => loadPair(p)}
                    className={`group overflow-hidden rounded-2xl text-left ring-1 transition hover:-translate-y-0.5 ${active ? "ring-2 ring-[#1c1712]" : "ring-black/[0.07] hover:ring-black/25"}`}
                    aria-label={`Load ${p.name}, contrast ${r.toFixed(2)} to 1`}
                  >
                    <div className="flex h-24 items-end justify-between p-4" style={{ backgroundColor: p.bg, color: p.fg }}>
                      <span className="text-3xl font-bold leading-none tracking-[-0.03em]">Aa</span>
                      <span className="font-mono text-[11px] font-semibold">{p.fg.slice(1)} / {p.bg.slice(1)}</span>
                    </div>
                    <div className="flex items-center justify-between gap-2 bg-white px-4 py-3">
                      <div className="min-w-0">
                        <p className="truncate text-[14px] font-semibold">{p.name}</p>
                        <p className="font-mono text-[12px] text-[#1c1712]/50">{r.toFixed(2)}:1</p>
                      </div>
                      <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-bold ${VERDICT_STYLES[l]}`}>{l === "Fail" ? "✕ Fail" : `✓ ${l}`}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <ToolPageSections config={toolPageContent.contrast} variant="new" />
      </main>
    </div>
  );
}
