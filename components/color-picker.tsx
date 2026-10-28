"use client";

import { useState, useCallback, useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import Link from "next/link";
import { Header } from "./header";
import { SwatchStrip } from "@/components/seo/swatch-strip";
import { ToolPageSections } from "@/components/seo/tool-page-sections";
import { hexToHsl, hslToHex, isValidHex } from "@/lib/color-utils";
import { findClosestColorName } from "@/lib/color-names";
import { generateHarmony, type HarmonyMode } from "@/lib/harmony";
import { toolPageContent } from "@/lib/seo/tool-pages";

type Rgb = { r: number; g: number; b: number };
type Hsl = { h: number; s: number; l: number };

function hexToRgb(hex: string): Rgb {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

function rgbToHsb({ r, g, b }: Rgb, hue: number) {
  const max = Math.max(r, g, b) / 255;
  const min = Math.min(r, g, b) / 255;
  return { h: hue, s: max === 0 ? 0 : Math.round(((max - min) / max) * 100), b: Math.round(max * 100) };
}

function rgbToCmyk({ r, g, b }: Rgb) {
  const rr = r / 255;
  const gg = g / 255;
  const bb = b / 255;
  const k = 1 - Math.max(rr, gg, bb);
  if (k >= 1) return { c: 0, m: 0, y: 0, k: 100 };
  const f = (v: number) => Math.round(((1 - v - k) / (1 - k)) * 100);
  return { c: f(rr), m: f(gg), y: f(bb), k: Math.round(k * 100) };
}

function generateShades(hex: string, count = 9): string[] {
  const { h, s } = hexToHsl(hex);
  return Array.from({ length: count }, (_, i) => {
    const l = Math.round(10 + (i / (count - 1)) * 40);
    return hslToHex(h, s, l);
  });
}

function generateTints(hex: string, count = 9): string[] {
  const { h, s } = hexToHsl(hex);
  return Array.from({ length: count }, (_, i) => {
    const l = Math.round(55 + (i / (count - 1)) * 38);
    return hslToHex(h, s, l);
  });
}

function getLuminance(hex: string) {
  const { r, g, b } = hexToRgb(hex);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
}

function relLuminance(hex: string) {
  const { r, g, b } = hexToRgb(hex);
  const lin = [r, g, b].map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * lin[0] + 0.7152 * lin[1] + 0.0722 * lin[2];
}

function contrastRatio(a: string, b: string) {
  const [hi, lo] = [relLuminance(a), relLuminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

const HARMONIES: { mode: HarmonyMode; label: string }[] = [
  { mode: "complementary", label: "Complementary" },
  { mode: "analogous", label: "Analogous" },
  { mode: "triadic", label: "Triadic" },
  { mode: "split-complementary", label: "Split complementary" },
  { mode: "tetradic", label: "Tetradic" },
  { mode: "monochromatic", label: "Monochromatic" },
];

const RECENT_KEY = "hueflow-picker-recent";
const HUE_TRACK = `linear-gradient(to right, ${[0, 60, 120, 180, 240, 300, 360].map((h) => `hsl(${h} 100% 50%)`).join(", ")})`;

type EyeDropperCtor = new () => { open: () => Promise<{ sRGBHex: string }> };

function getContrast(hex: string) {
  return getLuminance(hex) > 0.5 ? "#1c1712" : "#ffffff";
}

function Icon({ children }: { children: ReactNode }) {
  return (
    <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  );
}

const CopyIcon = () => (
  <Icon>
    <rect x="9" y="9" width="13" height="13" rx="2" />
    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
  </Icon>
);
const DiceIcon = () => (
  <Icon>
    <rect x="3" y="3" width="18" height="18" rx="4" />
    <circle cx="8.5" cy="8.5" r="1" fill="currentColor" />
    <circle cx="12" cy="12" r="1" fill="currentColor" />
    <circle cx="15.5" cy="15.5" r="1" fill="currentColor" />
  </Icon>
);
const CrosshairIcon = () => (
  <Icon>
    <circle cx="12" cy="12" r="8" />
    <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
  </Icon>
);
const LinkIcon = () => (
  <Icon>
    <path d="M10 13a5 5 0 007.07 0l3-3a5 5 0 00-7.07-7.07l-1 1" />
    <path d="M14 11a5 5 0 00-7.07 0l-3 3a5 5 0 007.07 7.07l1-1" />
  </Icon>
);

function SmallTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="mb-5 flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#1c1712]/40">
      {children}
      <span className="h-px flex-1 bg-black/[0.06]" />
    </h2>
  );
}

const THUMB =
  "[&::-webkit-slider-runnable-track]:bg-transparent [&::-moz-range-track]:bg-transparent " +
  "[&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full " +
  "[&::-webkit-slider-thumb]:border-[3px] [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-(--thumb) [&::-webkit-slider-thumb]:shadow-[0_1px_5px_rgba(0,0,0,0.4)] " +
  "[&::-moz-range-thumb]:box-border [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full " +
  "[&::-moz-range-thumb]:border-[3px] [&::-moz-range-thumb]:border-solid [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-(--thumb) [&::-moz-range-thumb]:shadow-[0_1px_5px_rgba(0,0,0,0.4)]";

function ColorSlider({
  label,
  unit,
  value,
  max,
  track,
  thumb,
  onChange,
}: {
  label: string;
  unit: string;
  value: number;
  max: number;
  track: string;
  thumb: string;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between">
        <span className="text-[12px] font-semibold text-[#1c1712]/60">{label}</span>
        <span className="font-mono text-[12px] font-semibold text-[#1c1712]/80">
          {value}
          {unit}
        </span>
      </div>
      <div className="relative h-5">
        <div className="absolute inset-x-0 top-1/2 h-3 -translate-y-1/2 rounded-full ring-1 ring-black/[0.08]" style={{ background: track }} />
        <input
          type="range"
          min={0}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          aria-label={label}
          className={`absolute inset-0 h-5 w-full cursor-pointer appearance-none bg-transparent focus-visible:outline-none focus-visible:[&::-webkit-slider-thumb]:ring-2 focus-visible:[&::-webkit-slider-thumb]:ring-[#1c1712] ${THUMB}`}
          style={{ "--thumb": thumb } as CSSProperties}
        />
      </div>
    </div>
  );
}

export function ColorPicker() {
  const [hex, setHex] = useState("#6366f1");
  const [inputValue, setInputValue] = useState("#6366f1");
  const [hsl, setHsl] = useState<Hsl>(() => hexToHsl("#6366f1"));
  const [copied, setCopied] = useState<string | null>(null);
  const [recent, setRecent] = useState<string[]>([]);
  const [canEyeDrop, setCanEyeDrop] = useState(false);
  const touched = useRef(false);

  const colorName = findClosestColorName(hex);
  const hslOut = hexToHsl(hex);
  const rgb = hexToRgb(hex);
  const hsb = rgbToHsb(rgb, hslOut.h);
  const cmyk = rgbToCmyk(rgb);
  const shades = generateShades(hex);
  const tints = generateTints(hex);
  const fg = getContrast(hex);
  const isFgDark = fg === "#1c1712";

  const copy = useCallback((text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
  }, []);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(null), 1600);
    return () => clearTimeout(t);
  }, [copied]);

  // Mount: shared ?c=hex link, recent colors, EyeDropper support.
  useEffect(() => {
    try {
      const c = new URLSearchParams(window.location.search).get("c");
      const n = c ? (c.startsWith("#") ? c : `#${c}`) : null;
      if (n && n.length === 7 && isValidHex(n)) {
        setHex(n.toLowerCase());
        setInputValue(n.toLowerCase());
        setHsl(hexToHsl(n.toLowerCase()));
      }
      const saved = JSON.parse(localStorage.getItem(RECENT_KEY) ?? "[]");
      if (Array.isArray(saved)) setRecent(saved.filter((v) => typeof v === "string" && isValidHex(v)).slice(0, 10));
    } catch {
      // storage or URL unavailable; defaults are fine
    }
    setCanEyeDrop("EyeDropper" in window);
  }, []);

  // After the user changes the color: keep the URL shareable and remember it (debounced).
  useEffect(() => {
    if (!touched.current) return;
    const t = setTimeout(() => {
      try {
        window.history.replaceState(null, "", `?c=${hex.slice(1)}`);
        setRecent((prev) => {
          const next = [hex, ...prev.filter((c) => c !== hex)].slice(0, 10);
          localStorage.setItem(RECENT_KEY, JSON.stringify(next));
          return next;
        });
      } catch {
        // ignore
      }
    }, 600);
    return () => clearTimeout(t);
  }, [hex]);

  const commit = (c: string) => {
    const v = c.toLowerCase();
    touched.current = true;
    setHex(v);
    setInputValue(v);
    setHsl(hexToHsl(v));
  };

  // Sliders own the HSL state while dragging, so the hue survives grey colors and rounding.
  const commitHsl = (next: Hsl) => {
    const v = hslToHex(next.h, next.s, next.l);
    touched.current = true;
    setHsl(next);
    setHex(v);
    setInputValue(v);
  };

  const handleHexInput = (val: string) => {
    setInputValue(val);
    const n = val.startsWith("#") ? val : `#${val}`;
    if (isValidHex(n) && n.length === 7) {
      touched.current = true;
      setHex(n.toLowerCase());
      setHsl(hexToHsl(n.toLowerCase()));
    }
  };

  const selectColor = (c: string) => {
    commit(c);
    copy(c.toUpperCase());
  };

  const surprise = () => {
    const h = Math.floor(Math.random() * 360);
    commit(hslToHex(h, 55 + Math.floor(Math.random() * 40), 35 + Math.floor(Math.random() * 35)));
  };

  const eyeDrop = async () => {
    const Ctor = (window as unknown as { EyeDropper?: EyeDropperCtor }).EyeDropper;
    if (!Ctor) return;
    try {
      const res = await new Ctor().open();
      selectColor(res.sRGBHex);
    } catch {
      // user cancelled
    }
  };

  const copyLink = () => copy(`${window.location.origin}/color-picker?c=${hex.slice(1)}`);

  const contrastCards = [
    { label: "White text", text: "#ffffff", ratio: contrastRatio(hex, "#ffffff") },
    { label: "Black text", text: "#000000", ratio: contrastRatio(hex, "#000000") },
  ];

  const values = [
    { label: "HEX", value: hex.toUpperCase() },
    { label: "RGB", value: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` },
    { label: "HSL", value: `hsl(${hslOut.h}, ${hslOut.s}%, ${hslOut.l}%)` },
    { label: "HSB", value: `hsb(${hsb.h}, ${hsb.s}%, ${hsb.b}%)` },
    { label: "CMYK", value: `cmyk(${cmyk.c}, ${cmyk.m}, ${cmyk.y}, ${cmyk.k})` },
    { label: "Name", value: colorName },
  ];

  const generatorHref = `/generator?label=${encodeURIComponent(colorName)}&c=${[...shades.slice(1, 4), hex, ...tints.slice(2, 4)].map((c) => c.replace("#", "")).join("-")}`;
  const dots = [shades[2], shades[5], hex, tints[3], tints[6]];
  const muted = isFgDark ? "rgba(28,23,18,0.6)" : "rgba(255,255,255,0.72)";
  const barBorder = isFgDark ? "rgba(28,23,18,0.16)" : "rgba(255,255,255,0.3)";
  const barBg = isFgDark ? "rgba(28,23,18,0.06)" : "rgba(255,255,255,0.14)";

  const ghostBtn =
    "inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold text-[#1c1712]/70 ring-1 ring-black/[0.12] transition hover:text-[#1c1712] hover:ring-black/25";

  return (
    <div className="min-h-screen bg-white text-[#1c1712]">
      <Header />

      {copied && (
        <div role="status" className="fixed bottom-8 left-1/2 z-[100] -translate-x-1/2 rounded-full bg-[#1c1712] px-5 py-2.5 text-[13px] font-semibold text-white shadow-lg">
          ✓ Copied
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
            <span className="text-[#1c1712]/60">Color Picker</span>
          </nav>
          <h1 className="mt-8 text-[2.6rem] font-bold leading-[1.05] tracking-[-0.035em] sm:text-[3.5rem]">Color Picker</h1>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="flex -space-x-1.5" aria-hidden="true">
              {dots.map((c, i) => (
                <span key={i} className="h-5 w-5 rounded-full ring-2 ring-white" style={{ backgroundColor: c }} />
              ))}
            </span>
            <p className="text-[16px] text-[#1c1712]/55">
              <span className="font-semibold text-[#1c1712]/80">Free, no signup.</span> Pick any color and get its HEX, RGB, HSL, HSB and CMYK values with matching shades and tints.
            </p>
          </div>
        </section>

        {/* ── Workspace ── */}
        <section className="border-t border-black/[0.06]">
          <div className="w-full px-6 py-10 sm:px-8 lg:px-12">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)]">
              {/* Preview */}
              <div
                className="relative flex min-h-[17rem] flex-col justify-between overflow-hidden rounded-2xl p-5 ring-1 ring-black/[0.07] transition-colors duration-150 sm:p-8 lg:min-h-[27rem]"
                style={{ backgroundColor: hex }}
              >
                <div className="flex items-start justify-between gap-3">
                  <span
                    className="rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em]"
                    style={{ color: muted, backgroundColor: barBg, border: `1px solid ${barBorder}` }}
                  >
                    Selected color
                  </span>
                  <button
                    onClick={() => copy(hex.toUpperCase())}
                    className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold transition hover:opacity-80"
                    style={{ color: fg, backgroundColor: barBg, border: `1px solid ${barBorder}` }}
                  >
                    <CopyIcon />
                    {copied === hex.toUpperCase() ? "✓ Copied" : "Copy HEX"}
                  </button>
                </div>
                <div>
                  <p className="text-4xl font-bold leading-[1.05] tracking-[-0.035em] sm:text-5xl" style={{ color: fg }}>{colorName}</p>
                  <p className="mt-2 font-mono text-xl font-semibold tracking-[0.08em]" style={{ color: muted }}>{hex.toUpperCase()}</p>
                </div>
              </div>

              {/* Controls */}
              <div className="flex flex-col gap-6 rounded-2xl p-5 ring-1 ring-black/[0.07] sm:p-6">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#c2410c]">HEX code</p>
                  <div className="mt-2.5 flex items-center gap-3">
                    <label
                      className="relative h-11 w-11 shrink-0 cursor-pointer overflow-hidden rounded-xl ring-1 ring-black/10 transition hover:ring-black/30"
                      title="Open your system color picker"
                    >
                      <input
                        type="color"
                        value={hex}
                        onChange={(e) => commit(e.target.value)}
                        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                        aria-label="Pick a color"
                      />
                      <span className="block h-full w-full" style={{ backgroundColor: hex }} />
                    </label>
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => handleHexInput(e.target.value)}
                      spellCheck={false}
                      maxLength={7}
                      placeholder="#000000"
                      aria-label="HEX value"
                      className="h-11 min-w-0 flex-1 rounded-xl px-4 font-mono text-sm font-semibold ring-1 ring-black/[0.12] outline-none transition focus:ring-2 focus:ring-[#1c1712]"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-5">
                  <ColorSlider
                    label="Hue"
                    unit="°"
                    value={hsl.h}
                    max={360}
                    track={HUE_TRACK}
                    thumb={`hsl(${hsl.h} 100% 50%)`}
                    onChange={(h) => commitHsl({ ...hsl, h })}
                  />
                  <ColorSlider
                    label="Saturation"
                    unit="%"
                    value={hsl.s}
                    max={100}
                    track={`linear-gradient(to right, hsl(${hsl.h} 0% ${hsl.l}%), hsl(${hsl.h} 100% ${hsl.l}%))`}
                    thumb={hex}
                    onChange={(s) => commitHsl({ ...hsl, s })}
                  />
                  <ColorSlider
                    label="Lightness"
                    unit="%"
                    value={hsl.l}
                    max={100}
                    track={`linear-gradient(to right, hsl(${hsl.h} ${hsl.s}% 0%), hsl(${hsl.h} ${hsl.s}% 50%), hsl(${hsl.h} ${hsl.s}% 100%))`}
                    thumb={hex}
                    onChange={(l) => commitHsl({ ...hsl, l })}
                  />
                </div>

                <div className="mt-auto flex flex-wrap items-center gap-2 border-t border-black/[0.06] pt-5">
                  <button onClick={surprise} className="inline-flex items-center gap-2 rounded-full bg-[#1c1712] px-4 py-2 text-[13px] font-semibold text-white transition hover:bg-[#c2410c]">
                    <DiceIcon />
                    Surprise me
                  </button>
                  {canEyeDrop && (
                    <button onClick={eyeDrop} className={ghostBtn}>
                      <CrosshairIcon />
                      Pick from screen
                    </button>
                  )}
                  <button onClick={copyLink} className={ghostBtn}>
                    <LinkIcon />
                    {copied?.includes("/color-picker?c=") ? "✓ Link copied" : "Copy share link"}
                  </button>
                </div>
              </div>
            </div>

            {/* Values */}
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-6">
              {values.map(({ label, value }) => (
                <button
                  key={label}
                  onClick={() => copy(value)}
                  className="group relative flex flex-col items-start gap-1 rounded-xl p-4 text-left ring-1 ring-black/[0.07] transition hover:-translate-y-0.5 hover:ring-black/20"
                >
                  <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#c2410c]">{label}</span>
                  <span className="w-full truncate font-mono text-[13px] font-semibold text-[#1c1712]/80 group-hover:text-[#1c1712]">
                    {copied === value ? "✓ Copied" : value}
                  </span>
                  <span className="absolute right-3 top-3.5 text-[#1c1712]/30 opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100">
                    <CopyIcon />
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ── Contrast + recent ── */}
        <section className="border-t border-black/[0.06]">
          <div className="grid w-full gap-10 px-6 py-14 sm:px-8 lg:grid-cols-2 lg:gap-12 lg:px-12">
            <div>
              <SmallTitle>Text contrast</SmallTitle>
              <div className="grid grid-cols-2 gap-4">
                {contrastCards.map((c) => (
                  <div key={c.label} className="overflow-hidden rounded-xl ring-1 ring-black/[0.07]">
                    <div className="flex items-end justify-between px-4 py-5 transition-colors duration-150" style={{ backgroundColor: hex, color: c.text }}>
                      <span className="text-3xl font-bold leading-none tracking-[-0.03em]">Aa</span>
                      <span className="text-[12px] font-semibold opacity-90">{c.label}</span>
                    </div>
                    <div className="px-4 py-3.5">
                      <p className="font-mono text-[18px] font-semibold">
                        {c.ratio.toFixed(2)}
                        <span className="text-[#1c1712]/35">:1</span>
                      </p>
                      <div className="mt-2.5 flex flex-wrap gap-1.5">
                        {[
                          { label: "AA", pass: c.ratio >= 4.5 },
                          { label: "AA Large", pass: c.ratio >= 3 },
                          { label: "AAA", pass: c.ratio >= 7 },
                        ].map((chip) => (
                          <span
                            key={chip.label}
                            className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${chip.pass ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}
                          >
                            {chip.pass ? "✓" : "✕"} {chip.label}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <SmallTitle>Recent colors</SmallTitle>
              {recent.length === 0 ? (
                <div>
                  <div className="flex flex-wrap gap-2.5" aria-hidden="true">
                    {Array.from({ length: 6 }, (_, i) => (
                      <span key={i} className="h-12 w-12 rounded-xl border border-dashed border-black/15" />
                    ))}
                  </div>
                  <p className="mt-3 text-[14px] text-[#1c1712]/50">Colors you pick show up here, so you can jump back to them.</p>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2.5">
                  {recent.map((c) => (
                    <button
                      key={c}
                      onClick={() => commit(c)}
                      className="group flex flex-col items-center gap-1.5"
                      aria-label={`Use ${c.toUpperCase()}`}
                    >
                      <span className={`h-12 w-12 rounded-xl ring-1 ring-black/10 transition group-hover:-translate-y-0.5 ${c === hex ? "outline outline-2 outline-offset-2 outline-[#1c1712]" : ""}`} style={{ backgroundColor: c }} />
                      <span className="font-mono text-[10px] uppercase text-[#1c1712]/45">{c.slice(1)}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ── Harmonies ── */}
        <section className="border-t border-black/[0.06]">
          <div className="w-full px-6 py-14 sm:px-8 lg:px-12">
            <h2 className="text-[1.75rem] font-semibold tracking-[-0.03em]">Matching palettes</h2>
            <p className="mt-2 text-[15px] leading-7 text-[#1c1712]/55">Color harmonies built from {hex.toUpperCase()}. Click a swatch to pick it, or open the palette in the generator.</p>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {HARMONIES.map((h) => {
                const colors = generateHarmony(hex, h.mode).colors.map((c) => c.hex.toUpperCase());
                return (
                  <article key={h.mode} className="overflow-hidden rounded-2xl ring-1 ring-black/[0.07]">
                    <SwatchStrip colors={colors} height="h-24" copied={copied} onCopy={selectColor} className="" />
                    <div className="flex items-center justify-between gap-3 px-4 py-3.5">
                      <div className="min-w-0">
                        <h3 className="truncate text-[15px] font-semibold">{h.label}</h3>
                        <p className="truncate font-mono text-[11px] uppercase text-[#1c1712]/45">{colors.map((c) => c.slice(1)).join(" · ")}</p>
                      </div>
                      <Link
                        href={`/generator?label=${encodeURIComponent(`${colorName} ${h.label}`)}&c=${colors.map((c) => c.slice(1)).join("-")}`}
                        className="shrink-0 rounded-full bg-[#1c1712] px-3 py-1.5 text-[12px] font-semibold text-white transition hover:bg-[#c2410c]"
                      >
                        Open →
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Shades + tints ── */}
        <section className="border-t border-black/[0.06]">
          <div className="grid w-full gap-10 px-6 py-14 sm:px-8 lg:grid-cols-2 lg:gap-12 lg:px-12">
            {[
              { title: "Shades", note: "Darker variations. Click to pick and copy.", list: shades },
              { title: "Tints", note: "Lighter variations. Click to pick and copy.", list: tints },
            ].map((g) => (
              <div key={g.title}>
                <SmallTitle>{g.title}</SmallTitle>
                <SwatchStrip colors={g.list.map((c) => c.toUpperCase())} height="h-28" copied={copied} onCopy={selectColor} className="rounded-2xl ring-1 ring-black/[0.07]" />
                <p className="mt-3 text-[13px] text-[#1c1712]/45">{g.note}</p>
              </div>
            ))}
            <div className="lg:col-span-2">
              <Link href={generatorHref} className="inline-block rounded-full bg-[#1c1712] px-5 py-2 text-[13px] font-semibold text-white transition hover:bg-[#c2410c]">
                Open this color in the generator →
              </Link>
            </div>
          </div>
        </section>

        <ToolPageSections config={toolPageContent.picker} variant="new" />
      </main>
    </div>
  );
}
