"use client";

import { motion } from "framer-motion";
import { useState, useRef, useCallback } from "react";
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
      let minDist = Infinity;
      let closest = 0;
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

function rgbToHex(r: number, g: number, b: number): string {
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`.toUpperCase();
}

function getSaturation(r: number, g: number, b: number): number {
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
  if (max === min) return 0;
  const l = (max + min) / 2;
  return l > 0.5 ? (max - min) / (2 - max - min) : (max - min) / (max + min);
}

function getLightness(r: number, g: number, b: number): number {
  return (Math.max(r, g, b) + Math.min(r, g, b)) / 2 / 255;
}

function isBrandColor(r: number, g: number, b: number): boolean {
  const s = getSaturation(r, g, b);
  const l = getLightness(r, g, b);
  return s > 0.15 && l > 0.1 && l < 0.9;
}

function colorDist(a: RGB, b: RGB): number {
  return Math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2);
}

export function BrandColorAnalyzer() {
  const [url, setUrl] = useState("");
  const [colors, setColors] = useState<ExtractedColor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [analyzedUrl, setAnalyzedUrl] = useState("");
  const [screenshotSrc, setScreenshotSrc] = useState<string | null>(null);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
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
      for (let i = 0; i < data.length; i += 8) {
        pixels.push([data[i], data[i + 1], data[i + 2]]);
      }

      const results = kMeans(pixels, 16);
      const total = results.reduce((sum, r) => sum + r.count, 0);

      const all = results.map((r) => {
        const [cr, cg, cb] = r.centroid;
        const hex = rgbToHex(cr, cg, cb);
        const sat = getSaturation(cr, cg, cb);
        const brand = isBrandColor(cr, cg, cb);
        return {
          hex,
          name: findClosestColorName(hex),
          percent: Math.round((r.count / total) * 100),
          sat,
          brand,
          centroid: r.centroid,
        };
      });

      const brandColors = all.filter((c) => c.brand).sort((a, b) => {
        const scoreA = a.sat * 100 + a.percent;
        const scoreB = b.sat * 100 + b.percent;
        return scoreB - scoreA;
      });

      const neutralColors = all.filter((c) => !c.brand).sort((a, b) => b.percent - a.percent);

      const deduped: ExtractedColor[] = [];
      const used: RGB[] = [];

      for (const c of [...brandColors, ...neutralColors]) {
        if (deduped.length >= 8) break;
        if (used.some((u) => colorDist(u, c.centroid) < 35)) continue;
        used.push(c.centroid);
        deduped.push({ hex: c.hex, name: c.name, percent: c.percent });
      }

      setColors(deduped);
      setLoading(false);
    };

    img.onload = () => {
      // decode() guarantees the full image is decoded and ready to read pixel
      // data from — onload alone can fire before decode finishes for large
      // screenshots, which was causing extraction to run on partial/blank data.
      if (img.decode) {
        img.decode().then(runExtraction).catch(runExtraction);
      } else {
        runExtraction();
      }
    };
    img.onerror = () => {
      setError("Failed to process screenshot");
      setLoading(false);
    };
    img.src = imageSrc;
  }, []);

  async function handleAnalyze() {
    if (!url.trim()) return;
    setLoading(true);
    setError("");
    setColors([]);
    setScreenshotSrc(null);

    try {
      const res = await fetch("/api/brand-colors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });
      const data = await res.json();
      if (data.error) {
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
    <main className="relative min-h-screen bg-[#160b05] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(0,0,0,0.95),transparent_18%),radial-gradient(circle_at_88%_0%,rgba(255,106,44,0.2),transparent_30%),linear-gradient(135deg,#1a0e06_0%,#160b05_50%,#1a0e06_100%)]" />
      <div className="noise absolute inset-0 opacity-20" />
      <Header />
      <canvas ref={canvasRef} className="hidden" />

      <div className="relative mx-auto max-w-5xl px-4 pt-24 pb-20 sm:px-6 sm:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">Brand Color Analyzer</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/50">
            Enter any website URL — we screenshot it and extract the actual visible brand colors.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10"
        >
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
              placeholder="Enter website URL (e.g. thepdftools.site)"
              className="flex-1 rounded-xl border border-white/10 bg-white/5 px-5 py-3.5 text-base text-white placeholder-white/30 outline-none transition-colors focus:border-white/25 focus:bg-white/8"
            />
            <button
              onClick={handleAnalyze}
              disabled={loading || !url.trim()}
              className="rounded-xl bg-white px-8 py-3.5 text-base font-semibold text-[#160b05] transition-opacity hover:opacity-90 disabled:opacity-40"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" opacity="0.3" /><path d="M12 2a10 10 0 0 1 10 10" /></svg>
                  Analyzing...
                </span>
              ) : "Analyze"}
            </button>
          </div>
          {error && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 text-sm text-red-400">{error}</motion.p>
          )}
        </motion.div>

        {loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-white/10 bg-white/5 py-20 text-center"
          >
            <svg className="h-8 w-8 animate-spin text-white/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" opacity="0.25" />
              <path d="M12 2a10 10 0 0 1 10 10" />
            </svg>
            <p className="text-sm text-white/50">Capturing screenshot and extracting colors…</p>
          </motion.div>
        )}

        {!loading && colors.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>

            <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr]">
              {screenshotSrc && (
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                  <p className="mb-2 text-xs font-medium text-white/40">Screenshot of {analyzedUrl}</p>
                  <img src={screenshotSrc} alt="Website screenshot" className="w-full rounded-xl" />
                </div>
              )}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="mb-3 text-xs font-medium text-white/40">Extracted Palette</p>
                <div className="mb-4 flex h-14 overflow-hidden rounded-xl">
                  {colors.map((color, i) => (
                    <motion.div
                      key={i}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.4, delay: i * 0.08 }}
                      className="origin-left"
                      style={{ backgroundColor: color.hex, flex: color.percent }}
                    />
                  ))}
                </div>
                <div className="space-y-1.5">
                  {colors.map((color, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="h-4 w-4 shrink-0 rounded" style={{ backgroundColor: color.hex }} />
                      <span className="flex-1 truncate text-sm text-white/70">{color.name}</span>
                      <span className="font-mono text-xs text-white/40">{color.hex}</span>
                      <span className="text-xs text-white/30">{color.percent}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {colors.map((color, i) => (
                <motion.button
                  key={color.hex + i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  onClick={() => handleCopy(color.hex)}
                  className="group relative cursor-pointer rounded-2xl border border-white/10 bg-white/5 p-3 text-left transition-all hover:border-white/20 hover:bg-white/8"
                >
                  <div className="mb-3 aspect-square w-full rounded-xl" style={{ backgroundColor: color.hex }} />
                  <p className="truncate text-sm font-medium text-white">{color.name}</p>
                  <p className="mt-0.5 font-mono text-xs text-white/40 uppercase">{color.hex}</p>
                  <p className="mt-1 text-xs text-white/30">{color.percent}% of page</p>

                  {copiedHex === color.hex && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/70 backdrop-blur-sm"
                    >
                      <span className="text-sm font-semibold text-white">Copied!</span>
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        <ToolPageSections config={toolPageContent["brand-analyzer"]} />
      </div>
    </main>
  );
}
