"use client";

import Link from "next/link";
import { useState, useCallback } from "react";
import { hexToHsl, hslToHex, isValidHex } from "@/lib/color-utils";
import { Header } from "@/components/header";
import { Faq, RelatedLinks, eyebrow } from "@/components/seo/page-ui";
import { converterPairSpecs } from "@/lib/seo/converter-specs";

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const clean = hex.replace("#", "");
  if (clean.length !== 6) return null;
  return {
    r: parseInt(clean.slice(0, 2), 16),
    g: parseInt(clean.slice(2, 4), 16),
    b: parseInt(clean.slice(4, 6), 16),
  };
}

function rgbToHex(r: number, g: number, b: number): string {
  return "#" + [r, g, b].map((v) => Math.min(255, Math.max(0, v)).toString(16).padStart(2, "0")).join("");
}

function getContrastColor(hex: string): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return "#ffffff";
  const lum = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
  return lum > 0.5 ? "#1c1712" : "#ffffff";
}

type Tab = "hex-to-rgb" | "rgb-to-hex" | "hex-to-hsl" | "hsl-to-hex";

const FAQ = [
  { question: "How do I convert HEX to RGB?", answer: "Enter any HEX code above and it instantly shows the RGB equivalent. Click Copy to grab it." },
  { question: "How do I convert RGB to HEX?", answer: 'Switch to the "RGB → HEX" tab, enter your R, G, B values (0–255), and get the HEX code instantly.' },
  { question: "What is HSL color format?", answer: "HSL = Hue (0–360°), Saturation (0–100%), Lightness (0–100%). Easier to adjust in code than HEX or RGB." },
  { question: "Which format should I use in CSS?", answer: "HEX for most cases. rgba() when you need transparency. HSL when adjusting brightness programmatically." },
];

const label = "text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1c1712]/45";
const inputCls = "mt-1.5 h-11 w-full min-w-0 rounded-xl px-4 font-mono text-[14px] font-semibold text-[#1c1712] outline-none ring-1 ring-black/[0.12] transition placeholder:text-[#1c1712]/35 focus:ring-2 focus:ring-[#1c1712]";

function CopyIcon() {
  return (
    <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
    </svg>
  );
}

export function ColorConverter() {
  const [tab, setTab] = useState<Tab>("hex-to-rgb");
  const [hex, setHex] = useState("#3B82F6");
  const [hexInput, setHexInput] = useState("#3B82F6");
  const [rgb, setRgb] = useState({ r: 59, g: 130, b: 246 });
  const [hsl, setHsl] = useState({ h: 217, s: 91, l: 60 });
  const [copied, setCopied] = useState<string | null>(null);

  const copy = useCallback((text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied((c) => (c === key ? null : c)), 1500);
  }, []);

  function handleHexChange(val: string) {
    setHexInput(val);
    const norm = val.startsWith("#") ? val : `#${val}`;
    if (isValidHex(norm)) {
      setHex(norm);
      const r = hexToRgb(norm);
      if (r) setRgb(r);
      const h = hexToHsl(norm);
      setHsl({ h: h.h, s: h.s, l: h.l });
    }
  }

  function handleRgbChange(key: "r" | "g" | "b", val: string) {
    const num = Math.min(255, Math.max(0, parseInt(val) || 0));
    const next = { ...rgb, [key]: num };
    setRgb(next);
    const h = rgbToHex(next.r, next.g, next.b);
    setHex(h);
    setHexInput(h);
    const hslVal = hexToHsl(h);
    setHsl({ h: hslVal.h, s: hslVal.s, l: hslVal.l });
  }

  function handleHslChange(key: "h" | "s" | "l", val: string) {
    const max = key === "h" ? 360 : 100;
    const num = Math.min(max, Math.max(0, parseInt(val) || 0));
    const next = { ...hsl, [key]: num };
    setHsl(next);
    const h = hslToHex(next.h, next.s, next.l);
    setHex(h);
    setHexInput(h);
    const r = hexToRgb(h);
    if (r) setRgb(r);
  }

  const rgbStr = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  const hslStr = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
  const hexUpper = hex.toUpperCase();
  const fg = getContrastColor(hex);
  const resultText = tab === "hex-to-rgb" ? rgbStr : tab === "hex-to-hsl" ? hslStr : hexUpper;

  const tabs: { key: Tab; label: string }[] = [
    { key: "hex-to-rgb", label: "HEX → RGB" },
    { key: "rgb-to-hex", label: "RGB → HEX" },
    { key: "hex-to-hsl", label: "HEX → HSL" },
    { key: "hsl-to-hex", label: "HSL → HEX" },
  ];

  const rows = [
    { label: "HEX", value: hexUpper },
    { label: "RGB", value: rgbStr },
    { label: "HSL", value: hslStr },
    { label: "R", value: String(rgb.r) },
    { label: "G", value: String(rgb.g) },
    { label: "B", value: String(rgb.b) },
  ];

  return (
    <div className="min-h-screen bg-white text-[#1c1712]">
      <Header />

      <main>
        {/* ── Header ── */}
        <section className="w-full px-6 pb-8 pt-28 sm:px-8 lg:px-12">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[12px] text-[#1c1712]/40">
            <Link href="/" className="transition hover:text-[#1c1712]/70">Home</Link>
            <span className="text-[#1c1712]/20">/</span>
            <span className="text-[#1c1712]/60">Color Converter</span>
          </nav>
          <h1 className="mt-8 text-[2.6rem] font-bold leading-[1.05] tracking-[-0.035em] sm:text-[3.5rem]">Color Converter</h1>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="flex -space-x-1.5" aria-hidden="true">
              {["#3B82F6", hex, "#10B981"].map((c, i) => (
                <span key={i} className="h-5 w-5 rounded-full ring-2 ring-white" style={{ backgroundColor: c }} />
              ))}
            </span>
            <p className="text-[16px] text-[#1c1712]/55">
              <span className="font-semibold text-[#1c1712]/80">Instant, free, copy with one click.</span> Convert HEX to RGB, RGB to HEX and HEX to HSL.
            </p>
          </div>
        </section>

        {/* ── Workspace ── */}
        <section className="border-t border-black/[0.06]">
          <div className="grid w-full items-start gap-6 px-6 py-10 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:px-12">
            {/* Convert */}
            <div className="min-w-0 rounded-2xl ring-1 ring-black/[0.07]">
              <div className="p-5 sm:p-6">
                <div className="flex flex-wrap gap-2" role="group" aria-label="Conversion">
                  {tabs.map((t) => (
                    <button
                      key={t.key}
                      onClick={() => setTab(t.key)}
                      aria-pressed={tab === t.key}
                      className={`rounded-full px-4 py-1.5 text-[13px] font-semibold transition ${
                        tab === t.key ? "bg-[#1c1712] text-white" : "text-[#1c1712]/65 ring-1 ring-black/[0.12] hover:text-[#1c1712] hover:ring-black/25"
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>

                <div className="mt-6">
                  {(tab === "hex-to-rgb" || tab === "hex-to-hsl") && (
                    <div>
                      <label htmlFor="conv-hex" className={label}>HEX color code</label>
                      <div className="flex items-center gap-3">
                        <label className="relative mt-1.5 h-11 w-11 shrink-0 cursor-pointer overflow-hidden rounded-xl ring-1 ring-black/10 transition hover:ring-black/30" title="Open your system color picker">
                          <input type="color" value={hex.toLowerCase()} onChange={(e) => handleHexChange(e.target.value)} className="absolute inset-0 h-full w-full cursor-pointer opacity-0" aria-label="Pick a color" />
                          <span className="block h-full w-full" style={{ backgroundColor: hex }} />
                        </label>
                        <input id="conv-hex" type="text" value={hexInput} onChange={(e) => handleHexChange(e.target.value)} placeholder="#3B82F6" className={inputCls} maxLength={7} spellCheck={false} />
                      </div>
                    </div>
                  )}

                  {tab === "rgb-to-hex" && (
                    <div className="grid grid-cols-3 gap-3">
                      {(["r", "g", "b"] as const).map((ch) => (
                        <div key={ch}>
                          <label htmlFor={`conv-${ch}`} className={label}>{ch.toUpperCase()} (0–255)</label>
                          <input id={`conv-${ch}`} type="number" min={0} max={255} value={rgb[ch]} onChange={(e) => handleRgbChange(ch, e.target.value)} className={inputCls} />
                        </div>
                      ))}
                    </div>
                  )}

                  {tab === "hsl-to-hex" && (
                    <div className="grid grid-cols-3 gap-3">
                      {(["h", "s", "l"] as const).map((ch) => (
                        <div key={ch}>
                          <label htmlFor={`conv-${ch}`} className={label}>{ch.toUpperCase()} {ch === "h" ? "(0–360)" : "(0–100)"}</label>
                          <input id={`conv-${ch}`} type="number" min={0} max={ch === "h" ? 360 : 100} value={hsl[ch]} onChange={(e) => handleHslChange(ch, e.target.value)} className={inputCls} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="border-t border-black/[0.06] p-5 sm:p-6">
                <p className={label}>Result</p>
                <div className="mt-2.5 flex items-center justify-between gap-3 rounded-xl bg-[#1c1712]/[0.04] px-4 py-3.5">
                  <span className="min-w-0 truncate font-mono text-[18px] font-semibold">{resultText}</span>
                  <button
                    onClick={() => copy(resultText, "result")}
                    className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#1c1712] px-4 py-2 text-[13px] font-semibold text-white transition hover:bg-[#c2410c]"
                  >
                    <CopyIcon />
                    {copied === "result" ? "✓ Copied" : "Copy"}
                  </button>
                </div>
              </div>
            </div>

            {/* The color and every format */}
            <div className="min-w-0 overflow-hidden rounded-2xl bg-white ring-1 ring-black/[0.07]">
              <div className="flex min-h-[10rem] items-end p-5 transition-colors duration-300 sm:p-6" style={{ backgroundColor: hex, color: fg }}>
                <span className="font-mono text-3xl font-semibold tracking-[0.06em]">{hexUpper}</span>
              </div>
              <ul className="divide-y divide-black/[0.06]">
                {rows.map(({ label: l, value }) => (
                  <li key={l}>
                    <button onClick={() => copy(value, l)} className="group flex w-full items-center gap-4 px-5 py-3 text-left transition hover:bg-[#fafafa] sm:px-6">
                      <span className="w-8 shrink-0 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#c2410c]">{l}</span>
                      <span className="min-w-0 flex-1 truncate font-mono text-[13px] font-semibold text-[#1c1712]/85">{copied === l ? "✓ Copied" : value}</span>
                      <span className="text-[#1c1712]/25 transition group-hover:text-[#1c1712]/70"><CopyIcon /></span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="border-t border-black/[0.06]">
          <div className="w-full px-6 py-14 sm:px-8 lg:px-12">
            <p className={eyebrow}>FAQ</p>
            <h2 className="mt-2 text-[1.75rem] font-semibold tracking-[-0.03em]">Common questions</h2>
            <div className="mt-6 max-w-4xl">
              <Faq items={FAQ} />
            </div>
          </div>
        </section>

        <section className="border-t border-black/[0.06]">
          <div className="w-full px-6 py-14 sm:px-8 lg:px-12">
            <p className={eyebrow}>Dedicated converters</p>
            <h2 className="mt-2 text-[1.75rem] font-semibold tracking-[-0.03em]">Convert between HEX, RGB, HSL, CMYK and OKLCH</h2>
            <p className="mt-3 max-w-3xl text-[15px] leading-7 text-[#1c1712]/60">
              Each page has a live converter, the formula with a worked example, a table of common colors and answers to the usual questions.
            </p>
            <div className="mt-6">
              <RelatedLinks
                links={converterPairSpecs.map(([from, to]) => ({
                  title: `${from.toUpperCase()} to ${to.toUpperCase()}`,
                  href: `/${from}-to-${to}`,
                }))}
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
