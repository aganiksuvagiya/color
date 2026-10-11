"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { Header } from "./header";
import { SwatchStrip } from "@/components/seo/swatch-strip";
import { ToolPageSections } from "@/components/seo/tool-page-sections";
import { hexToHsl, hslToHex, isValidHex } from "@/lib/color-utils";
import { findClosestColorName } from "@/lib/color-names";
import { generateHarmony, type HarmonyMode } from "@/lib/harmony";
import { toolPageContent } from "@/lib/seo/tool-pages";

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
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

function wcagLevel(ratio: number, large = false) {
  if (ratio >= (large ? 4.5 : 7)) return "AAA";
  if (ratio >= (large ? 3 : 4.5)) return "AA";
  return "Fail";
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

type EyeDropperCtor = new () => { open: () => Promise<{ sRGBHex: string }> };

function getContrast(hex: string) {
  return getLuminance(hex) > 0.5 ? "#1c1712" : "#ffffff";
}

export function ColorPicker() {
  const [hex, setHex] = useState("#6366f1");
  const [inputValue, setInputValue] = useState("#6366f1");
  const [copied, setCopied] = useState<string | null>(null);
  const [recent, setRecent] = useState<string[]>([]);
  const [canEyeDrop, setCanEyeDrop] = useState(false);
  const touched = useRef(false);

  const colorName = findClosestColorName(hex);
  const hsl = hexToHsl(hex);
  const rgb = hexToRgb(hex);
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
  };

  const handleHexInput = (val: string) => {
    setInputValue(val);
    const n = val.startsWith("#") ? val : `#${val}`;
    if (isValidHex(n) && n.length === 7) {
      touched.current = true;
      setHex(n.toLowerCase());
    }
  };

  const handleNativeChange = (val: string) => commit(val);

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

  const copyLink = () => copy(`${window.location.origin}/tools/picker?c=${hex.slice(1)}`);

  const onWhite = contrastRatio(hex, "#ffffff");
  const onBlack = contrastRatio(hex, "#000000");

  const values = [
    { label: "HEX", value: hex.toUpperCase() },
    { label: "RGB", value: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` },
    { label: "HSL", value: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` },
    { label: "Name", value: colorName },
  ];

  const generatorHref = `/generator?label=${encodeURIComponent(colorName)}&c=${[...shades.slice(1, 4), hex, ...tints.slice(2, 4)].map((c) => c.replace("#", "")).join("-")}`;
  const dots = [shades[2], shades[5], hex, tints[3], tints[6]];
  const muted = isFgDark ? "rgba(28,23,18,0.55)" : "rgba(255,255,255,0.65)";
  const barBorder = isFgDark ? "rgba(28,23,18,0.14)" : "rgba(255,255,255,0.25)";
  const barBg = isFgDark ? "rgba(28,23,18,0.06)" : "rgba(255,255,255,0.14)";

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
              <span className="font-semibold text-[#1c1712]/80">Free, no signup.</span> Pick any color and get its HEX, RGB and HSL values with matching shades and tints.
            </p>
          </div>
        </section>

        {/* ── Workspace ── */}
        <section className="border-t border-black/[0.06]">
          <div className="w-full px-6 py-10 sm:px-8 lg:px-12">
            <div className="overflow-hidden rounded-2xl ring-1 ring-black/[0.07]" style={{ backgroundColor: hex }}>
              <div className="flex h-64 flex-col items-center justify-center gap-2 px-6 text-center sm:h-80">
                <p className="text-3xl font-bold tracking-[-0.03em] sm:text-4xl" style={{ color: fg }}>{colorName}</p>
                <p className="font-mono text-lg font-semibold tracking-[0.08em]" style={{ color: muted }}>{hex.toUpperCase()}</p>
              </div>
              <div className="flex flex-wrap items-center gap-3 px-5 py-4" style={{ backgroundColor: barBg, borderTop: `1px solid ${barBorder}` }}>
                <label className="relative flex h-10 w-10 shrink-0 cursor-pointer overflow-hidden rounded-xl border" style={{ borderColor: barBorder }}>
                  <input
                    type="color"
                    value={hex}
                    onChange={(e) => handleNativeChange(e.target.value)}
                    className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                    aria-label="Pick a color"
                  />
                  <span className="h-full w-full" style={{ backgroundColor: hex }} />
                </label>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => handleHexInput(e.target.value)}
                  spellCheck={false}
                  maxLength={7}
                  placeholder="#000000"
                  aria-label="HEX value"
                  className="h-10 min-w-0 flex-1 rounded-xl border px-4 font-mono text-sm outline-none"
                  style={{ backgroundColor: barBg, borderColor: barBorder, color: fg }}
                />
                <button
                  onClick={() => copy(hex.toUpperCase())}
                  className="h-10 rounded-xl border px-4 text-sm font-semibold transition hover:opacity-80"
                  style={{ backgroundColor: barBg, borderColor: barBorder, color: fg }}
                >
                  {copied === hex.toUpperCase() ? "✓ Copied" : "Copy HEX"}
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <button onClick={surprise} className="rounded-full bg-[#1c1712] px-4 py-2 text-[13px] font-semibold text-white transition hover:bg-[#c2410c]">
                🎲 Surprise me
              </button>
              {canEyeDrop && (
                <button onClick={eyeDrop} className="rounded-full px-4 py-2 text-[13px] font-semibold text-[#1c1712]/70 ring-1 ring-black/[0.12] transition hover:text-[#1c1712] hover:ring-black/25">
                  Pick from screen
                </button>
              )}
              <button onClick={copyLink} className="rounded-full px-4 py-2 text-[13px] font-semibold text-[#1c1712]/70 ring-1 ring-black/[0.12] transition hover:text-[#1c1712] hover:ring-black/25">
                Copy share link
              </button>
            </div>

            {/* Values */}
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {values.map(({ label, value }) => (
                <button
                  key={label}
                  onClick={() => copy(value)}
                  className="group flex flex-col items-start gap-1 rounded-xl p-4 text-left ring-1 ring-black/[0.07] transition hover:-translate-y-0.5 hover:ring-black/20"
                >
                  <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#c2410c]">{label}</span>
                  <span className="w-full truncate font-mono text-[13px] font-semibold text-[#1c1712]/80 group-hover:text-[#1c1712]">
                    {copied === value ? "✓ Copied" : value}
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
              <h2 className="mb-5 flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#1c1712]/40">
                Text contrast
                <span className="h-px flex-1 bg-black/[0.06]" />
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "White text", text: "#ffffff", ratio: onWhite },
                  { label: "Black text", text: "#000000", ratio: onBlack },
                ].map((c) => {
                  const level = wcagLevel(c.ratio);
                  return (
                    <div key={c.label} className="overflow-hidden rounded-xl ring-1 ring-black/[0.07]">
                      <div className="px-4 py-5 text-[15px] font-semibold" style={{ backgroundColor: hex, color: c.text }}>
                        {c.label}: Aa
                      </div>
                      <div className="flex items-center justify-between px-4 py-3">
                        <span className="font-mono text-[13px] text-[#1c1712]/70">{c.ratio.toFixed(2)}:1</span>
                        <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${level === "Fail" ? "bg-red-50 text-red-700" : "bg-emerald-50 text-emerald-700"}`}>
                          {level === "Fail" ? "Fails AA" : `Passes ${level}`}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              <h2 className="mb-5 flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#1c1712]/40">
                Recent colors
                <span className="h-px flex-1 bg-black/[0.06]" />
              </h2>
              {recent.length === 0 ? (
                <p className="text-[14px] text-[#1c1712]/50">Colors you pick show up here, so you can jump back to them.</p>
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
                <h2 className="mb-5 flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#1c1712]/40">
                  {g.title}
                  <span className="h-px flex-1 bg-black/[0.06]" />
                </h2>
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
