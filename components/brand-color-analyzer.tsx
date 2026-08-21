"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { Header } from "./header";
import { ToolPageSections } from "@/components/seo/tool-page-sections";
import { findClosestColorName } from "@/lib/color-names";
import { toolPageContent } from "@/lib/seo/tool-pages";

type ExtractedColor = { hex: string; name: string; percent: number };
type RGB = [number, number, number];

function kMeans(pixels: RGB[], k: number, iterations = 12): { centroid: RGB; count: number }[] {
  const centroids: RGB[] = [];
  const step = Math.max(1, Math.floor(pixels.length / k));
  for (let i = 0; i < k; i++) centroids.push([...pixels[i * step]]);
  const clusters: number[] = new Array(pixels.length);
  for (let iter = 0; iter < iterations; iter++) {
    for (let p = 0; p < pixels.length; p++) {
      let minDist = Infinity, closest = 0;
      for (let c = 0; c < k; c++) {
        const d = (pixels[p][0] - centroids[c][0]) ** 2 + (pixels[p][1] - centroids[c][1]) ** 2 + (pixels[p][2] - centroids[c][2]) ** 2;
        if (d < minDist) { minDist = d; closest = c; }
      }
      clusters[p] = closest;
    }
    for (let c = 0; c < k; c++) {
      let sr = 0, sg = 0, sb = 0, cnt = 0;
      for (let p = 0; p < pixels.length; p++) {
        if (clusters[p] === c) { sr += pixels[p][0]; sg += pixels[p][1]; sb += pixels[p][2]; cnt++; }
      }
      if (cnt > 0) centroids[c] = [Math.round(sr / cnt), Math.round(sg / cnt), Math.round(sb / cnt)];
    }
  }
  const counts = new Array(k).fill(0);
  for (let p = 0; p < pixels.length; p++) counts[clusters[p]]++;
  return centroids.map((centroid, i) => ({ centroid, count: counts[i] }));
}

function rgbToHex(r: number, g: number, b: number) {
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`.toUpperCase();
}

function getSaturation(r: number, g: number, b: number) {
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
  if (max === min) return 0;
  const l = (max + min) / 2;
  return l > 0.5 ? (max - min) / (2 - max - min) : (max - min) / (max + min);
}

function getLightness(r: number, g: number, b: number) {
  return (Math.max(r, g, b) + Math.min(r, g, b)) / 2 / 255;
}

function isBrandColor(r: number, g: number, b: number) {
  const s = getSaturation(r, g, b);
  const l = getLightness(r, g, b);
  return s > 0.15 && l > 0.1 && l < 0.9;
}

function colorDist(a: RGB, b: RGB) {
  return Math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2);
}

function getLuminance(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
}

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } } };

export function BrandColorAnalyzer() {
  const [url, setUrl] = useState("");
  const [colors, setColors] = useState<ExtractedColor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [analyzedUrl, setAnalyzedUrl] = useState("");
  const [screenshotSrc, setScreenshotSrc] = useState<string | null>(null);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [locked, setLocked] = useState<{ points: number; required: number } | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const extractColors = useCallback((imageSrc: string) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    const runExtraction = () => {
      const canvas = canvasRef.current!;
      const scale = Math.min(1, 400 / img.naturalWidth);
      canvas.width = img.naturalWidth * scale;
      canvas.height = img.naturalHeight * scale;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      const pixels: RGB[] = [];
      for (let i = 0; i < data.length; i += 8) pixels.push([data[i], data[i + 1], data[i + 2]]);
      const results = kMeans(pixels, 16);
      const total = results.reduce((s, r) => s + r.count, 0);
      const all = results.map((r) => {
        const [cr, cg, cb] = r.centroid;
        const hex = rgbToHex(cr, cg, cb);
        return { hex, name: findClosestColorName(hex), percent: Math.round((r.count / total) * 100), sat: getSaturation(cr, cg, cb), brand: isBrandColor(cr, cg, cb), centroid: r.centroid };
      });
      const brand = all.filter(c => c.brand).sort((a, b) => (b.sat * 100 + b.percent) - (a.sat * 100 + a.percent));
      const neutral = all.filter(c => !c.brand).sort((a, b) => b.percent - a.percent);
      const deduped: ExtractedColor[] = [];
      const used: RGB[] = [];
      for (const c of [...brand, ...neutral]) {
        if (deduped.length >= 8) break;
        if (used.some(u => colorDist(u, c.centroid) < 35)) continue;
        used.push(c.centroid);
        deduped.push({ hex: c.hex, name: c.name, percent: c.percent });
      }
      setColors(deduped);
      setLoading(false);
    };
    img.onload = () => { img.decode ? img.decode().then(runExtraction).catch(runExtraction) : runExtraction(); };
    img.onerror = () => { setError("Failed to process screenshot"); setLoading(false); };
    img.src = imageSrc;
  }, []);

  async function handleAnalyze() {
    if (!url.trim()) return;
    setLoading(true);
    setError("");
    setColors([]);
    setScreenshotSrc(null);
    setLocked(null);
    try {
      const res = await fetch("/api/brand-colors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });
      const data = await res.json();
      if (data.locked) {
        setLocked({ points: data.points ?? 0, required: data.required ?? 100 });
        setLoading(false);
      } else if (data.error) {
        setError(data.error);
        setLoading(false);
      } else {
        setAnalyzedUrl(data.url);
        setScreenshotSrc(data.screenshot);
        extractColors(data.screenshot);
      }
    } catch {
      setError("Failed to analyze. Check the URL and try again.");
      setLoading(false);
    }
  }

  async function handleCopy(hex: string) {
    await navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1500);
  }

  return (
    <div className="min-h-screen bg-[#faf7f2] text-[#1c1712]">
      <Header />
      <canvas ref={canvasRef} className="hidden" />

      <main className="mx-auto max-w-5xl px-4 pt-24 pb-24 sm:px-6">
        <motion.div initial="hidden" animate="show" variants={stagger}>

          {/* ── Hero ── */}
          <motion.div variants={fadeUp} className="mb-12 text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.24em] text-[#1c1712]/45 shadow-[0_1px_4px_rgba(28,23,18,0.06)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#e8531f]" />
              Screenshot · Extract · Analyze
            </span>
            <h1 className="mt-4 font-display text-[2.6rem] font-bold leading-[1.04] tracking-[-0.05em] text-[#1c1712] sm:text-[3.4rem]">
              Brand Color Analyzer
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-[#1c1712]/50">
              Enter any website URL — we screenshot it and extract the actual visible brand colors instantly.
            </p>
          </motion.div>

          {/* ── URL Input ── */}
          <motion.div variants={fadeUp} className="mb-8">
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1c1712]/30" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
                </svg>
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
                  placeholder="Enter website URL (e.g. stripe.com)"
                  className="h-13 w-full rounded-2xl border border-black/[0.10] bg-white py-3.5 pl-11 pr-5 text-base text-[#1c1712] placeholder-[#1c1712]/35 shadow-[0_1px_4px_rgba(28,23,18,0.06)] outline-none transition focus:border-black/20 focus:shadow-[0_2px_12px_rgba(28,23,18,0.08)]"
                />
              </div>
              <button
                onClick={handleAnalyze}
                disabled={loading || !url.trim()}
                className="flex items-center justify-center gap-2 rounded-2xl px-8 py-3.5 text-base font-semibold text-white shadow-[0_6px_20px_rgba(232,83,31,0.28)] transition-all hover:scale-[1.02] hover:shadow-[0_8px_28px_rgba(232,83,31,0.36)] disabled:cursor-not-allowed disabled:opacity-40"
                style={{ background: "linear-gradient(135deg, #ff7a45, #e8531f)" }}
              >
                {loading ? (
                  <>
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" opacity="0.25" /><path d="M12 2a10 10 0 0 1 10 10" />
                    </svg>
                    Analyzing…
                  </>
                ) : "Analyze"}
              </button>
            </div>

            <AnimatePresence>
              {error && (
                <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-3 text-sm text-red-500">
                  {error}
                </motion.p>
              )}
              {locked && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  className="mt-4 rounded-2xl border border-[#e8531f]/15 bg-[#e8531f]/6 p-5"
                >
                  <p className="text-sm font-semibold text-[#e8531f]">
                    🔒 Unlock Brand Analyzer at {locked.required} points
                  </p>
                  <p className="mt-1 text-sm text-[#1c1712]/50">
                    You have {locked.points} points. Try the Daily Challenge or save/share palettes to earn more.
                  </p>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-black/[0.06]">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${Math.min(100, Math.round((locked.points / locked.required) * 100))}%`, background: "linear-gradient(90deg, #ff7a45, #e8531f)" }}
                    />
                  </div>
                  <Link href="/" className="mt-3 inline-block text-xs font-semibold text-[#e8531f] hover:underline">
                    Go earn points →
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* ── Loading state ── */}
          <AnimatePresence>
            {loading && (
              <motion.div
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-black/[0.08] bg-white py-20 text-center shadow-[0_1px_6px_rgba(28,23,18,0.06)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-black/[0.08] bg-[#faf7f2]">
                  <svg className="h-5 w-5 animate-spin text-[#e8531f]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" opacity="0.25" /><path d="M12 2a10 10 0 0 1 10 10" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1c1712]">Capturing screenshot…</p>
                  <p className="mt-1 text-xs text-[#1c1712]/45">Extracting brand colors from the live page</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Results ── */}
          <AnimatePresence>
            {!loading && colors.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>

                {/* Screenshot + palette strip */}
                {screenshotSrc && (
                  <div className="mb-6 overflow-hidden rounded-[24px] border border-black/[0.08] bg-white shadow-[0_4px_24px_rgba(28,23,18,0.08)]">
                    <div className="relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={screenshotSrc} alt={`Screenshot of ${analyzedUrl}`} className="w-full" />
                      <div className="absolute bottom-0 left-0 right-0 flex h-10">
                        {colors.map((color, i) => (
                          <motion.div
                            key={i}
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: 1 }}
                            transition={{ duration: 0.35, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                            className="origin-bottom"
                            style={{ backgroundColor: color.hex, flex: color.percent }}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between px-4 py-3">
                      <p className="text-xs font-medium text-[#1c1712]/45">{analyzedUrl}</p>
                      <span className="rounded-full border border-black/[0.08] bg-[#faf7f2] px-2.5 py-0.5 text-[10px] font-semibold text-[#1c1712]/50">
                        {colors.length} colors extracted
                      </span>
                    </div>
                  </div>
                )}

                {/* Color cards */}
                <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {colors.map((color, i) => {
                    const fg = getLuminance(color.hex) > 0.5 ? "#1c1712" : "#ffffff";
                    return (
                      <motion.button
                        key={color.hex + i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.05 }}
                        onClick={() => handleCopy(color.hex)}
                        className="group relative overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-[0_1px_6px_rgba(28,23,18,0.06)] text-left transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(28,23,18,0.10)]"
                      >
                        {/* Swatch */}
                        <div className="relative h-24 w-full" style={{ backgroundColor: color.hex }}>
                          <span
                            className="absolute bottom-2 left-2 font-mono text-[10px] font-bold opacity-70"
                            style={{ color: fg }}
                          >
                            {color.hex}
                          </span>
                        </div>
                        {/* Info */}
                        <div className="p-3">
                          <p className="truncate text-[12px] font-semibold text-[#1c1712]">{color.name}</p>
                          <div className="mt-2 flex items-center gap-2">
                            <div className="h-1 flex-1 overflow-hidden rounded-full bg-black/[0.06]">
                              <div className="h-full rounded-full bg-[#e8531f]/50" style={{ width: `${color.percent}%` }} />
                            </div>
                            <span className="font-mono text-[10px] text-[#1c1712]/40">{color.percent}%</span>
                          </div>
                        </div>

                        {/* Copied overlay */}
                        <AnimatePresence>
                          {copiedHex === color.hex && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="absolute inset-0 flex items-center justify-center rounded-2xl bg-white/90 backdrop-blur-sm"
                            >
                              <span className="text-sm font-bold text-[#e8531f]">✓ Copied!</span>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <ToolPageSections config={toolPageContent["brand-analyzer"]} />
        </motion.div>
      </main>
    </div>
  );
}
