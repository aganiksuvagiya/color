"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import { Header } from "@/components/header";
import { ToolPageSections } from "@/components/seo/tool-page-sections";
import { Dots, eyebrow } from "@/components/seo/page-ui";
import { useCopy } from "@/components/seo/swatch-strip";
import { FORMAT_LABEL, formatters, hslToRgb, parseHex, rgbToHex, type ColorFormat, type RGB } from "@/lib/color-convert";
import { findClosestColorName } from "@/lib/color-names";
import { toolPageContent } from "@/lib/seo/tool-pages";

type Style = "any" | "pastel" | "vivid" | "muted" | "dark" | "light";

// Saturation and lightness ranges (HSL, percent) for each style. "any" is a uniform random RGB.
const RANGES: Record<Exclude<Style, "any">, { s: [number, number]; l: [number, number] }> = {
  pastel: { s: [55, 85], l: [78, 90] },
  vivid: { s: [80, 100], l: [45, 60] },
  muted: { s: [15, 40], l: [35, 65] },
  dark: { s: [25, 80], l: [10, 28] },
  light: { s: [35, 90], l: [85, 95] },
};

const STYLES: { key: Style; label: string }[] = [
  { key: "any", label: "Any" },
  { key: "pastel", label: "Pastel" },
  { key: "vivid", label: "Vivid" },
  { key: "muted", label: "Muted" },
  { key: "dark", label: "Dark" },
  { key: "light", label: "Light" },
];

const FORMATS: ColorFormat[] = ["hex", "rgb", "hsl", "cmyk", "oklch"];
const START = ["#E8531F"];
const HISTORY_MAX = 12;

const between = (min: number, max: number) => min + Math.random() * (max - min);

function randomColor(style: Style): string {
  if (style === "any") {
    return rgbToHex({ r: Math.floor(Math.random() * 256), g: Math.floor(Math.random() * 256), b: Math.floor(Math.random() * 256) });
  }
  const r = RANGES[style];
  return rgbToHex(hslToRgb({ h: Math.random() * 360, s: between(...r.s), l: between(...r.l) }));
}

function textOn(hex: string) {
  const c = parseHex(hex);
  return c && (0.299 * c.r + 0.587 * c.g + 0.114 * c.b) / 255 > 0.58 ? "#1c1712" : "#ffffff";
}

function LockIcon({ locked }: { locked: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="11" width="16" height="10" rx="2" />
      {locked ? <path d="M8 11V7a4 4 0 018 0v4" /> : <path d="M8 11V7a4 4 0 017.5-2" />}
    </svg>
  );
}

export function RandomColorGenerator() {
  const [colors, setColors] = useState<string[]>(START);
  const [locked, setLocked] = useState<boolean[]>([false]);
  const [selected, setSelected] = useState(0);
  const [style, setStyle] = useState<Style>("any");
  const [history, setHistory] = useState<string[][]>([]);
  const { copied, copy } = useCopy();

  const generate = useCallback(() => {
    setHistory((h) => [colors, ...h].slice(0, HISTORY_MAX));
    setColors(colors.map((c, i) => (locked[i] ? c : randomColor(style))));
  }, [colors, locked, style]);

  const setCount = (n: 1 | 5) => {
    if (colors.length === n) return;
    const next = n === 1 ? [colors[selected] ?? colors[0]] : Array.from({ length: 5 }, (_, i) => (i === 0 ? colors[0] : randomColor(style)));
    setColors(next);
    setLocked(next.map(() => false));
    setSelected(0);
  };

  // Space generates a new color, unless focus is on something that uses Space itself.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code !== "Space" || e.repeat) return;
      const el = e.target;
      if (el instanceof HTMLElement && (el.closest("input, textarea, select, button, a, [contenteditable]") || el.isContentEditable)) return;
      e.preventDefault();
      generate();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [generate]);

  const hex = colors[selected] ?? colors[0];
  const rgb = parseHex(hex) as RGB;
  const name = findClosestColorName(hex);
  const isPalette = colors.length > 1;
  const generatorHref = `/generator?label=${encodeURIComponent("Random palette")}&c=${colors.map((c) => c.slice(1)).join("-")}`;

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
            <span className="text-[#1c1712]/60">Random Color Generator</span>
          </nav>
          <h1 className="mt-8 text-[2.6rem] font-bold leading-[1.05] tracking-[-0.035em] sm:text-[3.5rem]">Random Color Generator</h1>
          <div className="mt-5 flex max-w-4xl flex-wrap items-start gap-3">
            <span className="mt-1.5"><Dots colors={colors.length > 1 ? colors : ["#E8531F", "#3B82F6", "#0F766E", "#7C3AED", "#FDE68A"]} /></span>
            <p className="hub-description min-w-0 flex-1 basis-80 text-[16px] leading-7 text-[#1c1712]/55">
              <span className="font-semibold text-[#1c1712]/80">Press the space bar for a new color.</span> Get a random HEX, RGB and HSL color code, or a random color palette you can lock, copy and open in the generator.
            </p>
          </div>
        </section>

        {/* ── Stage ── */}
        <section className="border-t border-black/[0.06]">
          <div className="grid w-full gap-6 px-6 py-10 sm:px-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:px-12">
            <div className="min-w-0">
              <div className="flex h-[22rem] overflow-hidden rounded-2xl ring-1 ring-black/[0.07] sm:h-[26rem]" role="group" aria-label="Generated colors">
                {colors.map((c, i) => (
                  <div
                    key={i}
                    onClick={() => setSelected(i)}
                    className="relative flex min-w-0 flex-1 cursor-pointer flex-col justify-between p-3 transition-colors duration-300 sm:p-4"
                    style={{ backgroundColor: c, color: textOn(c) }}
                  >
                    <div className="flex justify-end">
                      {isPalette && (
                        <button
                          onClick={(e) => { e.stopPropagation(); setLocked((l) => l.map((v, j) => (j === i ? !v : v))); }}
                          aria-pressed={locked[i]}
                          aria-label={locked[i] ? `Unlock ${c}` : `Lock ${c}`}
                          className={`flex h-8 w-8 items-center justify-center rounded-full transition ${locked[i] ? "bg-black/60 text-white" : "bg-black/10 hover:bg-black/20"}`}
                          style={locked[i] ? undefined : { color: textOn(c) }}
                        >
                          <LockIcon locked={locked[i]} />
                        </button>
                      )}
                    </div>
                    <div className="min-w-0">
                      {selected === i && isPalette && <span className="mb-2 block h-1 w-6 rounded-full bg-current opacity-70" aria-hidden="true" />}
                      <p className="truncate font-mono text-[15px] font-bold tracking-tight sm:text-[1.15rem]">{c}</p>
                      {!isPalette && <p className="mt-0.5 truncate text-[14px] font-medium opacity-80">{findClosestColorName(c)}</p>}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <button onClick={generate} className="rounded-full bg-[#1c1712] px-7 py-3 text-[15px] font-semibold text-white transition hover:bg-[#c2410c]">
                  Generate {isPalette ? "palette" : "color"}
                </button>
                <span className="hidden text-[13px] text-[#1c1712]/50 sm:inline">or press <kbd className="rounded-md px-1.5 py-0.5 font-mono text-[12px] ring-1 ring-black/[0.15]">Space</kbd></span>
                <div className="ml-auto flex gap-2" role="group" aria-label="Number of colors">
                  {([1, 5] as const).map((n) => (
                    <button
                      key={n}
                      onClick={() => setCount(n)}
                      aria-pressed={colors.length === n}
                      className={`rounded-full px-4 py-2 text-[13px] font-semibold transition ${colors.length === n ? "bg-[#1c1712] text-white" : "text-[#1c1712]/65 ring-1 ring-black/[0.12] hover:text-[#1c1712] hover:ring-black/25"}`}
                    >
                      {n === 1 ? "Single color" : "Palette of 5"}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Color style">
                {STYLES.map((s) => (
                  <button
                    key={s.key}
                    onClick={() => setStyle(s.key)}
                    aria-pressed={style === s.key}
                    className={`rounded-full px-3.5 py-1.5 text-[13px] font-medium transition ${style === s.key ? "bg-[#c2410c] text-white" : "text-[#1c1712]/65 ring-1 ring-black/[0.12] hover:text-[#1c1712] hover:ring-black/25"}`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Details */}
            <div className="min-w-0 rounded-2xl p-5 ring-1 ring-black/[0.07] sm:p-6">
              <div className="flex items-center gap-3">
                <span className="h-10 w-10 shrink-0 rounded-full ring-1 ring-black/15" style={{ backgroundColor: hex }} aria-hidden="true" />
                <div className="min-w-0">
                  <p className="truncate text-[17px] font-semibold tracking-[-0.01em]">{name}</p>
                  <p className="font-mono text-[13px] text-[#1c1712]/50">{hex}</p>
                </div>
              </div>
              <dl className="mt-4 divide-y divide-black/[0.06] border-t border-black/[0.06]">
                {FORMATS.map((f) => {
                  const v = formatters[f](rgb);
                  return (
                    <div key={f} className="flex items-center justify-between gap-3 py-2.5">
                      <dt className="w-14 shrink-0 text-[12px] font-semibold uppercase tracking-[0.1em] text-[#1c1712]/45">{FORMAT_LABEL[f]}</dt>
                      <dd className="min-w-0 flex-1 break-all font-mono text-[13px] font-medium text-[#1c1712]/80">{v}</dd>
                      <button
                        onClick={() => copy(v)}
                        aria-label={`Copy ${FORMAT_LABEL[f]} value`}
                        className="shrink-0 rounded-full px-3 py-1 text-[12px] font-semibold text-[#1c1712]/60 ring-1 ring-black/[0.1] transition hover:text-[#1c1712] hover:ring-black/25"
                      >
                        {copied === v ? "Copied" : "Copy"}
                      </button>
                    </div>
                  );
                })}
              </dl>
              <div className="mt-5 flex flex-wrap gap-2.5">
                {isPalette && (
                  <button onClick={() => copy(colors.join(", "))} className="rounded-full px-4 py-2 text-[13px] font-semibold text-[#1c1712]/70 ring-1 ring-black/[0.12] transition hover:text-[#1c1712] hover:ring-black/25">
                    {copied === colors.join(", ") ? "Copied ✓" : "Copy all HEX"}
                  </button>
                )}
                {isPalette ? (
                  <Link href={generatorHref} className="rounded-full bg-[#1c1712] px-4 py-2 text-[13px] font-semibold text-white transition hover:bg-[#c2410c]">Open in generator →</Link>
                ) : (
                  <Link href="/color-name-finder" className="rounded-full px-4 py-2 text-[13px] font-semibold text-[#1c1712]/70 ring-1 ring-black/[0.12] transition hover:text-[#1c1712] hover:ring-black/25">Name any color</Link>
                )}
              </div>
            </div>
          </div>

          {history.length > 0 && (
            <div className="w-full px-6 pb-12 sm:px-8 lg:px-12">
              <p className={eyebrow}>Previous results</p>
              <div className="mt-3 flex gap-2.5 overflow-x-auto pb-2">
                {history.map((h, i) => (
                  <button
                    key={`${h.join("")}-${i}`}
                    onClick={() => { setColors(h); setLocked(h.map(() => false)); setSelected(0); }}
                    aria-label={`Restore ${h.join(", ")}`}
                    className="flex h-12 w-24 shrink-0 overflow-hidden rounded-lg ring-1 ring-black/[0.1] transition hover:ring-black/40"
                  >
                    {h.map((c) => <span key={c} className="flex-1" style={{ backgroundColor: c }} />)}
                  </button>
                ))}
              </div>
            </div>
          )}
        </section>

        <ToolPageSections config={toolPageContent["random-color-generator"]} variant="new" />
      </main>
    </div>
  );
}
