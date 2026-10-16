"use client";

import { useState, useRef, useCallback, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import { Header } from "./header";
import { SwatchStrip } from "@/components/seo/swatch-strip";
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

const EXAMPLES = [
  { host: "thepdftools.site", color: "#0F766E" },
  { host: "stripe.com", color: "#635BFF" },
  { host: "airbnb.com", color: "#FF5A5F" },
  { host: "spotify.com", color: "#1DB954" },
  { host: "notion.so", color: "#1C1712" },
  { host: "figma.com", color: "#F24E1E" },
];
// Shown in the header and the idle state before any analysis: the brand colors of the examples above.
const SAMPLE_DOTS = EXAMPLES.map((e) => e.color);

function Icon({ children, size = 16 }: { children: ReactNode; size?: number }) {
  return (
    <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  );
}
const SearchIcon = () => (
  <Icon size={18}>
    <circle cx="11" cy="11" r="8" />
    <path d="M21 21l-4.35-4.35" />
  </Icon>
);
const CopyIcon = () => (
  <Icon size={15}>
    <rect x="9" y="9" width="13" height="13" rx="2" />
    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
  </Icon>
);
const LockIcon = () => (
  <Icon>
    <rect x="4" y="11" width="16" height="10" rx="2" />
    <path d="M8 11V7a4 4 0 018 0v4" />
  </Icon>
);
const Spinner = () => (
  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <circle cx="12" cy="12" r="10" opacity="0.25" />
    <path d="M12 2a10 10 0 0 1 10 10" />
  </svg>
);

function SmallTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="mb-4 flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#1c1712]/40">
      {children}
      <span className="h-px flex-1 bg-black/[0.06]" />
    </h2>
  );
}

const layout = "grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]";

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
  const inputRef = useRef<HTMLInputElement>(null);

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

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!url.trim()) {
      inputRef.current?.focus();
      return;
    }
    void handleAnalyze();
  }

  async function handleCopy(text: string) {
    await navigator.clipboard.writeText(text);
    setCopiedHex(text);
    setTimeout(() => setCopiedHex((c) => (c === text ? null : c)), 1500);
  }

  const hexes = colors.map((c) => c.hex);
  const allHex = hexes.join(", ");
  const generatorHref = `/generator?label=${encodeURIComponent(analyzedUrl ? `${analyzedUrl} brand colors` : "Brand colors")}&c=${hexes.slice(0, 6).map((h) => h.slice(1)).join("-")}`;
  const dots = hexes.length >= 5 ? hexes.slice(0, 5) : SAMPLE_DOTS;
  const showResults = !loading && colors.length > 0;

  return (
    <div className="min-h-screen bg-white text-[#1c1712]">
      <Header />
      <canvas ref={canvasRef} className="hidden" />

      <main>
        {/* ── Header ── */}
        <section className="w-full px-6 pb-8 pt-28 sm:px-8 lg:px-12">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[12px] text-[#1c1712]/40">
            <Link href="/" className="transition hover:text-[#1c1712]/70">Home</Link>
            <span className="text-[#1c1712]/20">/</span>
            <Link href="/tools" className="transition hover:text-[#1c1712]/70">Tools</Link>
            <span className="text-[#1c1712]/20">/</span>
            <span className="text-[#1c1712]/60">Brand Color Analyzer</span>
          </nav>
          <h1 className="mt-8 text-[2.6rem] font-bold leading-[1.05] tracking-[-0.035em] sm:text-[3.5rem]">Brand Color Analyzer</h1>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="flex -space-x-1.5" aria-hidden="true">
              {dots.map((c, i) => (
                <span key={i} className="h-5 w-5 rounded-full ring-2 ring-white" style={{ backgroundColor: c }} />
              ))}
            </span>
            <p className="text-[16px] text-[#1c1712]/55">
              <span className="font-semibold text-[#1c1712]/80">Screenshot, extract, analyze.</span> Enter any website URL and we capture the live page and pull out its real brand colors.
            </p>
          </div>
        </section>

        {/* ── Search ── */}
        <section className="border-t border-black/[0.06]">
          <div className={`w-full px-6 pt-8 sm:px-8 lg:px-12 ${loading || showResults ? "pb-2" : "pb-12"}`}>
            <form
              onSubmit={onSubmit}
              className="flex items-center gap-2 rounded-full border border-black/[0.12] bg-white p-2 pl-6 text-[#1c1712]/50 shadow-[0_2px_16px_rgba(28,23,18,0.06)] transition focus-within:border-[#1c1712] focus-within:shadow-[0_4px_24px_rgba(28,23,18,0.12)]"
            >
              <SearchIcon />
              <input
                ref={inputRef}
                type="text"
                inputMode="url"
                autoCapitalize="none"
                spellCheck={false}
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="e.g. stripe.com"
                aria-label="Website URL"
                className="h-12 min-w-0 flex-1 bg-transparent px-1 text-[17px] text-[#1c1712] outline-none placeholder:text-[#1c1712]/40"
              />
              <button
                type="submit"
                disabled={loading}
                className="inline-flex h-12 shrink-0 items-center gap-2 rounded-full bg-[#1c1712] px-8 text-[15px] font-semibold text-white transition hover:bg-[#c2410c] disabled:cursor-wait disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <Spinner />
                    Analyzing
                  </>
                ) : (
                  "Analyze"
                )}
              </button>
            </form>

            <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-2.5 pl-2">
              <span className="mr-1 text-[13px] text-[#1c1712]/50">Try</span>
              {EXAMPLES.map((ex) => (
                <button
                  key={ex.host}
                  type="button"
                  onClick={() => { setUrl(ex.host); inputRef.current?.focus(); }}
                  className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3.5 py-1.5 text-[13px] font-semibold text-[#1c1712]/75 transition hover:border-black/25 hover:text-[#1c1712]"
                >
                  <span className="h-2.5 w-2.5 rounded-full ring-1 ring-black/10" style={{ backgroundColor: ex.color }} aria-hidden="true" />
                  {ex.host}
                </button>
              ))}
              <p className="text-[13px] text-[#1c1712]/45 lg:ml-auto">We load the page like a visitor and pull out its dominant colors.</p>
            </div>

            {error && (
              <p role="alert" className="mt-5 max-w-3xl rounded-xl bg-red-50 px-4 py-3 text-[14px] font-semibold text-red-700">
                {error}
              </p>
            )}
            {locked && (
              <div role="status" className="mt-5 max-w-3xl rounded-2xl bg-[#c2410c]/[0.04] p-5 ring-1 ring-[#c2410c]/25">
                <p className="flex items-center gap-2 text-[14px] font-semibold text-[#c2410c]">
                  <LockIcon />
                  Unlock Brand Analyzer at {locked.required} points
                </p>
                <p className="mt-1.5 text-[14px] leading-6 text-[#1c1712]/60">
                  You have {locked.points} points. Try the Daily Challenge or save and share palettes to earn more.
                </p>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-black/[0.07]">
                  <div className="h-full rounded-full bg-[#c2410c]" style={{ width: `${Math.min(100, Math.round((locked.points / locked.required) * 100))}%` }} />
                </div>
                <Link href="/" className="mt-3 inline-block text-[13px] font-semibold text-[#c2410c] hover:underline">
                  Go earn points →
                </Link>
              </div>
            )}
          </div>
        </section>

        {(loading || showResults) && (
        <section>
          <div className="w-full px-6 pb-14 pt-8 sm:px-8 lg:px-12">
            {/* Loading */}
            {loading && (
              <div className={layout} aria-live="polite">
                <div className="overflow-hidden rounded-2xl ring-1 ring-black/[0.07]">
                  <div className="aspect-[16/10] animate-pulse bg-black/[0.05]" />
                  <p className="flex items-center gap-2 px-4 py-3 text-[13px] text-[#1c1712]/55">
                    <Spinner />
                    Capturing a screenshot of the live page…
                  </p>
                </div>
                <div className="overflow-hidden rounded-2xl ring-1 ring-black/[0.07]">
                  <div className="h-24 animate-pulse bg-black/[0.05]" />
                  <div className="divide-y divide-black/[0.06]">
                    {Array.from({ length: 6 }, (_, i) => (
                      <div key={i} className="flex items-center gap-3 px-4 py-3">
                        <span className="h-9 w-9 animate-pulse rounded-lg bg-black/[0.06]" />
                        <span className="h-3 flex-1 animate-pulse rounded-full bg-black/[0.05]" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Results */}
            {showResults && (
              <div className={layout}>
                <div className="lg:sticky lg:top-28 lg:self-start">
                  <SmallTitle>Page screenshot</SmallTitle>
                  {screenshotSrc && (
                    <div className="overflow-hidden rounded-2xl ring-1 ring-black/[0.07]">
                      <div className="relative bg-[#f5f5f5]">
                        <img src={screenshotSrc} alt={`Screenshot of ${analyzedUrl}`} className="max-h-[34rem] w-full object-cover object-top" />
                        <div className="absolute inset-x-0 bottom-0 flex h-10" aria-hidden="true">
                          {colors.map((color, i) => (
                            <div key={i} style={{ backgroundColor: color.hex, flex: Math.max(color.percent, 3) }} />
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center justify-between gap-3 px-4 py-3">
                        <p className="min-w-0 truncate text-[13px] text-[#1c1712]/55">{analyzedUrl}</p>
                        <span className="shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-semibold text-[#1c1712]/60 ring-1 ring-black/[0.1]">
                          {colors.length} colors extracted
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-col">
                  <SmallTitle>Brand palette</SmallTitle>
                  <div className="flex flex-1 flex-col overflow-hidden rounded-2xl ring-1 ring-black/[0.07]">
                    <SwatchStrip colors={hexes} height="h-24" copied={copiedHex} onCopy={handleCopy} className="" />
                    <ul className="divide-y divide-black/[0.06]">
                      {colors.map((color) => (
                        <li key={color.hex}>
                          <button
                            onClick={() => handleCopy(color.hex)}
                            className="group flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-[#fafafa]"
                            aria-label={`Copy ${color.hex}, ${color.name}, ${color.percent}% of the page`}
                          >
                            <span className="h-9 w-9 shrink-0 rounded-lg ring-1 ring-black/10" style={{ backgroundColor: color.hex }} />
                            <span className="min-w-0 flex-1">
                              <span className="block truncate text-[14px] font-semibold">{color.name}</span>
                              <span className="block font-mono text-[12px] text-[#1c1712]/50">
                                {copiedHex === color.hex ? "✓ Copied" : color.hex}
                              </span>
                            </span>
                            <span className="flex w-24 shrink-0 items-center gap-2">
                              <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-black/[0.07]">
                                <span className="block h-full rounded-full bg-[#c2410c]" style={{ width: `${Math.max(color.percent, 3)}%` }} />
                              </span>
                              <span className="w-8 text-right font-mono text-[11px] text-[#1c1712]/50">{color.percent}%</span>
                            </span>
                            <span className="text-[#1c1712]/25 transition group-hover:text-[#1c1712]/70">
                              <CopyIcon />
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto flex flex-wrap items-center gap-2 border-t border-black/[0.06] p-4">
                      <button
                        onClick={() => handleCopy(allHex)}
                        className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold text-[#1c1712]/70 ring-1 ring-black/[0.12] transition hover:text-[#1c1712] hover:ring-black/25"
                      >
                        <CopyIcon />
                        {copiedHex === allHex ? "✓ Copied" : "Copy all HEX"}
                      </button>
                      <Link
                        href={generatorHref}
                        className="rounded-full bg-[#1c1712] px-4 py-2 text-[13px] font-semibold text-white transition hover:bg-[#c2410c]"
                      >
                        Open in generator →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
        )}

        <ToolPageSections config={toolPageContent["brand-analyzer"]} variant="new" />
      </main>
    </div>
  );
}
