"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Header } from "./header";
import { ToolPageSections } from "@/components/seo/tool-page-sections";
import { getContrastText } from "@/lib/color-utils";
import { findClosestColorName } from "@/lib/color-names";
import { toolPageContent } from "@/lib/seo/tool-pages";

const MAX_POINTS = 8;
const MIN_POINTS = 1;
const DEFAULT_POINTS = 5;

type Point = { id: number; x: number; y: number; hex: string };
type ToolMode = "eyedropper" | "grid";

const COLOR_MOODS = ["None", "Warm", "Cool", "Earthy", "Vivid", "Muted"];

const MOOD_FILTERS: Record<string, string> = {
  None: "none",
  Warm: "sepia(0.35) saturate(1.3) hue-rotate(-15deg)",
  Cool: "saturate(0.85) hue-rotate(20deg) brightness(1.08)",
  Earthy: "sepia(0.55) saturate(0.75) brightness(0.95)",
  Vivid: "saturate(1.6) contrast(1.08)",
  Muted: "saturate(0.35) brightness(1.08)",
};

function clamp01(n: number) { return Math.max(0, Math.min(1, n)); }

function defaultPosition(index: number): { x: number; y: number } {
  const angle = index * 2.399963;
  const radius = 0.14 + (index / Math.max(1, MAX_POINTS - 1)) * 0.3;
  return { x: clamp01(0.5 + radius * Math.cos(angle)), y: clamp01(0.5 + radius * Math.sin(angle)) };
}

function sampleColorAt(canvas: HTMLCanvasElement, xPct: number, yPct: number): string {
  const ctx = canvas.getContext("2d")!;
  const px = Math.min(canvas.width - 1, Math.max(0, Math.floor(xPct * canvas.width)));
  const py = Math.min(canvas.height - 1, Math.max(0, Math.floor(yPct * canvas.height)));
  const [r, g, b] = ctx.getImageData(px, py, 1, 1).data;
  return `#${[r, g, b].map((c) => c.toString(16).padStart(2, "0")).join("")}`;
}

export function ImageColorExtractor() {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState<string | null>("/demo-photo.svg");
  const [points, setPoints] = useState<Point[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [dragging, setDragging] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [paletteName, setPaletteName] = useState("My Color Theme");
  const [mood, setMood] = useState("None");
  const [toolMode, setToolMode] = useState<ToolMode>("eyedropper");
  const [showGrid, setShowGrid] = useState(false);

  // Undo/Redo history
  const [past, setPast] = useState<Point[][]>([]);
  const [future, setFuture] = useState<Point[][]>([]);

  const nextId = useRef(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Push current points to undo history before a mutating action
  const pushHistory = useCallback((current: Point[]) => {
    setPast((p) => [...p.slice(-30), current]);
    setFuture([]);
  }, []);

  const undo = useCallback(() => {
    if (past.length === 0) return;
    const prev = past[past.length - 1];
    setPast((p) => p.slice(0, -1));
    setFuture((f) => [points, ...f]);
    setPoints(prev);
    setSelectedId(prev[prev.length - 1]?.id ?? null);
  }, [past, points]);

  const redo = useCallback(() => {
    if (future.length === 0) return;
    const next = future[0];
    setFuture((f) => f.slice(1));
    setPast((p) => [...p, points]);
    setPoints(next);
    setSelectedId(next[next.length - 1]?.id ?? null);
  }, [future, points]);

  const seedPoints = useCallback((canvas: HTMLCanvasElement) => {
    nextId.current = 0;
    const seeded: Point[] = Array.from({ length: DEFAULT_POINTS }, () => {
      const id = nextId.current++;
      const { x, y } = defaultPosition(id);
      return { id, x, y, hex: sampleColorAt(canvas, x, y) };
    });
    setPoints(seeded);
    setPast([]);
    setFuture([]);
    setSelectedId(seeded[0].id);
  }, []);

  useEffect(() => {
    if (!imageUrl) return;
    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current!;
      const maxW = 800;
      const scale = Math.min(1, maxW / img.width);
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      seedPoints(canvas);
    };
    img.src = imageUrl;
  }, [imageUrl, seedPoints]);

  const processImage = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => setImageUrl(e.target?.result as string);
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) processImage(file);
  }, [processImage]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processImage(file);
  };

  const loadDemoPhoto = useCallback(() => setImageUrl("/demo-photo.svg"), []);

  function handleImageClick(e: React.MouseEvent<HTMLImageElement>) {
    if (toolMode !== "eyedropper" || selectedId === null || !canvasRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = clamp01((e.clientX - rect.left) / rect.width);
    const y = clamp01((e.clientY - rect.top) / rect.height);
    const hex = sampleColorAt(canvasRef.current, x, y);
    pushHistory(points);
    setPoints((prev) => prev.map((p) => (p.id === selectedId ? { ...p, x, y, hex } : p)));
  }

  function addPoint() {
    if (points.length >= MAX_POINTS || !canvasRef.current) return;
    pushHistory(points);
    const id = nextId.current++;
    const { x, y } = defaultPosition(points.length);
    const hex = sampleColorAt(canvasRef.current, x, y);
    setPoints((prev) => [...prev, { id, x, y, hex }]);
    setSelectedId(id);
  }

  function removePointById(id: number) {
    if (points.length <= MIN_POINTS) return;
    pushHistory(points);
    setPoints((prev) => {
      const next = prev.filter((p) => p.id !== id);
      if (selectedId === id) setSelectedId(next[next.length - 1]?.id ?? null);
      return next;
    });
  }

  async function handleCopy(hex: string) {
    await navigator.clipboard.writeText(hex);
    setCopied(hex);
    setTimeout(() => setCopied(null), 1600);
  }

  async function copyAll() {
    const text = points.map((p) => p.hex.toUpperCase()).join(", ");
    await navigator.clipboard.writeText(text);
    setCopied("__all__");
    setTimeout(() => setCopied(null), 1600);
  }

  async function sharePalette() {
    const hexes = points.map((p) => p.hex.slice(1)).join("-");
    const url = `${window.location.origin}/tools/image-colors?palette=${hexes}&name=${encodeURIComponent(paletteName)}`;
    await navigator.clipboard.writeText(url);
    setCopied("__share__");
    setTimeout(() => setCopied(null), 1600);
  }

  function downloadPalette() {
    const W = 480;
    const H = 100;
    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H * points.length;
    const ctx = canvas.getContext("2d")!;
    points.forEach((p, i) => {
      ctx.fillStyle = p.hex;
      ctx.fillRect(0, i * H, W, H);
      const textCol = getContrastText(p.hex) === "light" ? "#ffffff" : "#1c1712";
      ctx.fillStyle = textCol;
      ctx.font = "bold 15px monospace";
      ctx.fillText(p.hex.toUpperCase(), 22, i * H + H / 2 + 3);
      ctx.font = "13px sans-serif";
      ctx.globalAlpha = 0.6;
      ctx.fillText(findClosestColorName(p.hex), 22, i * H + H / 2 + 22);
      ctx.globalAlpha = 1;
    });
    const link = document.createElement("a");
    link.download = `${paletteName.replace(/\s+/g, "-").toLowerCase() || "palette"}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  function createWithPalette() {
    const hexes = points.map((p) => p.hex.slice(1)).join("-");
    router.push(`/?palette=${hexes}`);
  }

  const textColor = (hex: string) =>
    getContrastText(hex) === "light" ? "rgba(255,255,255,0.92)" : "rgba(28,23,18,0.80)";
  const iconColor = (hex: string) =>
    getContrastText(hex) === "light" ? "rgba(255,255,255,0.55)" : "rgba(28,23,18,0.35)";

  const canUndo = past.length > 0;
  const canRedo = future.length > 0;

  const iconBtn = "flex h-8 w-8 items-center justify-center rounded-full text-[#1c1712]/55 ring-1 ring-black/[0.12] transition hover:text-[#1c1712] hover:ring-black/25 disabled:cursor-not-allowed disabled:opacity-30";
  const iconOn = "bg-[#1c1712] text-white ring-[#1c1712] hover:text-white";

  return (
    <div className="min-h-screen bg-white text-[#1c1712]">
      <canvas ref={canvasRef} className="hidden" />
      <Header />

      {copied && (
        <div role="status" className="fixed bottom-8 left-1/2 z-[100] -translate-x-1/2 whitespace-nowrap rounded-full bg-[#1c1712] px-5 py-2.5 text-[13px] font-semibold text-white shadow-lg">
          {copied === "__all__" ? "✓ All colors copied" : copied === "__share__" ? "✓ Link copied" : `✓ Copied ${copied.toUpperCase()}`}
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
            <span className="text-[#1c1712]/60">Image Colors</span>
          </nav>
          <h1 className="mt-8 text-[2.6rem] font-bold leading-[1.05] tracking-[-0.035em] sm:text-[3.5rem]">Image Color Extractor</h1>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="flex -space-x-1.5" aria-hidden="true">
              {points.map((p) => (
                <span key={p.id} className="h-5 w-5 rounded-full ring-2 ring-white" style={{ backgroundColor: p.hex }} />
              ))}
            </span>
            <p className="text-[16px] text-[#1c1712]/55">
              <span className="font-semibold text-[#1c1712]/80">Free, no signup.</span> Upload a photo, move the dots, and pull a palette straight from its colors. Your image never leaves your browser.
            </p>
          </div>
        </section>

        {/* ── Workspace ── */}
        <section className="border-t border-black/[0.06]">
          <div className="w-full px-6 py-10 sm:px-8 lg:px-12">
            <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
              {/* Image panel */}
              <div className="flex flex-col overflow-hidden rounded-2xl ring-1 ring-black/[0.07]">
                {/* Toolbar */}
                <div className="flex flex-wrap items-center gap-2 border-b border-black/[0.07] px-4 py-3">
                  <label className="flex items-center gap-2 text-[12px] font-semibold text-[#1c1712]/55">
                    <span className="hidden sm:inline">Color mood</span>
                    <select
                      value={mood}
                      onChange={(e) => setMood(e.target.value)}
                      className="rounded-full bg-white px-3 py-1.5 text-[12px] font-semibold text-[#1c1712]/70 outline-none ring-1 ring-black/[0.12] transition hover:ring-black/25"
                    >
                      {COLOR_MOODS.map((m) => <option key={m}>{m}</option>)}
                    </select>
                  </label>

                  <div className="flex items-center gap-1.5">
                    <button
                      title="Eyedropper: click the image to move the selected dot"
                      aria-label="Eyedropper"
                      onClick={() => { setToolMode("eyedropper"); setShowGrid(false); }}
                      className={`${iconBtn} ${toolMode === "eyedropper" && !showGrid ? iconOn : ""}`}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>
                      </svg>
                    </button>
                    <button
                      title="Reseed: pick new colors from the image"
                      aria-label="Reseed colors"
                      onClick={() => { if (canvasRef.current) { pushHistory(points); seedPoints(canvasRef.current); } }}
                      className={iconBtn}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/>
                        <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/>
                      </svg>
                    </button>
                    <button
                      title="Toggle grid overlay"
                      aria-label="Toggle grid"
                      onClick={() => { setShowGrid((v) => !v); setToolMode("eyedropper"); }}
                      className={`${iconBtn} ${showGrid ? iconOn : ""}`}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                        <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
                      </svg>
                    </button>
                  </div>

                  <div className="flex-1" />

                  <button title="Undo" aria-label="Undo" onClick={undo} disabled={!canUndo} className={iconBtn}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 14 4 9 9 4"/><path d="M20 20v-7a4 4 0 00-4-4H4"/>
                    </svg>
                  </button>
                  <button title="Redo" aria-label="Redo" onClick={redo} disabled={!canRedo} className={iconBtn}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="15 14 20 9 15 4"/><path d="M4 20v-7a4 4 0 014-4h12"/>
                    </svg>
                  </button>

                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="rounded-full bg-[#1c1712] px-4 py-1.5 text-[12px] font-semibold text-white transition hover:bg-[#c2410c]"
                  >
                    Upload image
                  </button>
                  <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                </div>

                {/* Image area */}
                {imageUrl ? (
                  <div className="relative h-[280px] overflow-hidden bg-[#F5F5F5] sm:h-[360px] lg:h-auto lg:min-h-[360px] lg:flex-1">
                    <img
                      src={imageUrl}
                      alt="Your uploaded photo - click anywhere on it to pick a color"
                      onClick={handleImageClick}
                      style={{ filter: MOOD_FILTERS[mood] ?? "none" }}
                      className={`absolute inset-0 h-full w-full object-contain transition-[filter] duration-300 ${toolMode === "eyedropper" && selectedId !== null ? "cursor-crosshair" : "cursor-default"}`}
                    />
                    {showGrid && (
                      <div className="pointer-events-none absolute inset-0" style={{
                        backgroundImage: "linear-gradient(rgba(28,23,18,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(28,23,18,0.10) 1px, transparent 1px)",
                        backgroundSize: "10% 10%",
                      }} />
                    )}
                    {points.map((p) => (
                      <button
                        key={p.id}
                        onClick={(e) => { e.stopPropagation(); setSelectedId(p.id); }}
                        className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-[0_2px_8px_rgba(0,0,0,0.35)] transition-all ${
                          selectedId === p.id
                            ? "h-9 w-9 shadow-[0_0_0_3px_rgba(28,23,18,0.55),0_2px_12px_rgba(0,0,0,0.35)] sm:h-11 sm:w-11"
                            : "h-4 w-4 hover:h-7 hover:w-7 sm:h-5 sm:w-5 sm:hover:h-8 sm:hover:w-8"
                        }`}
                        style={{ left: `${p.x * 100}%`, top: `${p.y * 100}%`, backgroundColor: p.hex }}
                        title={p.hex}
                        aria-label={`Color ${p.hex.toUpperCase()}`}
                      />
                    ))}
                  </div>
                ) : (
                  <div
                    onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`flex h-[280px] cursor-pointer flex-col items-center justify-center p-8 text-center transition sm:h-[360px] lg:h-auto lg:min-h-[360px] lg:flex-1 ${
                      dragging ? "bg-[#c2410c]/5" : "bg-[#F5F5F5] hover:bg-[#efefef]"
                    }`}
                  >
                    <p className="text-[16px] font-semibold text-[#1c1712]/70">Drop an image or click to upload</p>
                    <p className="mt-1 text-[13px] text-[#1c1712]/40">PNG, JPG, WebP supported</p>
                    <button
                      onClick={(e) => { e.stopPropagation(); loadDemoPhoto(); }}
                      className="mt-5 rounded-full bg-white px-4 py-2 text-[12px] font-semibold text-[#1c1712]/70 ring-1 ring-black/[0.12] transition hover:text-[#1c1712]"
                    >
                      Try a demo photo
                    </button>
                  </div>
                )}
              </div>

              {/* Swatches */}
              <div className="flex gap-3 overflow-x-auto lg:flex-col lg:overflow-visible">
                {points.length === 0 ? (
                  <p className="py-8 text-center text-[14px] text-[#1c1712]/40 lg:flex-1">No colors yet</p>
                ) : (
                  points.map((p) => (
                    <div
                      key={p.id}
                      role="button"
                      tabIndex={0}
                      onClick={() => { setSelectedId(p.id); handleCopy(p.hex); }}
                      onKeyDown={(e) => { if (e.key === "Enter") { setSelectedId(p.id); handleCopy(p.hex); } }}
                      className={`group relative flex min-h-[64px] min-w-[150px] shrink-0 cursor-pointer flex-col justify-end rounded-2xl p-4 ring-1 transition hover:-translate-y-0.5 lg:min-w-0 lg:flex-1 ${
                        selectedId === p.id ? "ring-2 ring-[#1c1712]" : "ring-black/[0.07]"
                      }`}
                      style={{ backgroundColor: p.hex }}
                    >
                      <span className="font-mono text-[14px] font-bold tracking-wider" style={{ color: textColor(p.hex) }}>
                        {copied === p.hex ? "✓ Copied" : p.hex.toUpperCase()}
                      </span>
                      <span className="text-[12px]" style={{ color: iconColor(p.hex) }}>{findClosestColorName(p.hex)}</span>

                      <div className="absolute right-3 top-3 flex gap-1.5 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
                        <button
                          onClick={(e) => { e.stopPropagation(); handleCopy(p.hex); }}
                          title="Copy hex"
                          aria-label={`Copy ${p.hex.toUpperCase()}`}
                          className="flex h-7 w-7 items-center justify-center rounded-full transition hover:scale-110"
                          style={{ color: textColor(p.hex), backgroundColor: getContrastText(p.hex) === "light" ? "rgba(255,255,255,0.18)" : "rgba(28,23,18,0.10)" }}
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
                          </svg>
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); removePointById(p.id); }}
                          title="Remove"
                          aria-label={`Remove ${p.hex.toUpperCase()}`}
                          disabled={points.length <= MIN_POINTS}
                          className="flex h-7 w-7 items-center justify-center rounded-full transition hover:scale-110 disabled:pointer-events-none disabled:opacity-30"
                          style={{ color: textColor(p.hex), backgroundColor: getContrastText(p.hex) === "light" ? "rgba(255,255,255,0.18)" : "rgba(28,23,18,0.10)" }}
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))
                )}

                {points.length < MAX_POINTS && (
                  <button
                    onClick={addPoint}
                    className="flex min-h-[44px] min-w-[120px] shrink-0 items-center justify-center gap-1.5 rounded-2xl text-[13px] font-semibold text-[#1c1712]/55 ring-1 ring-black/[0.12] transition hover:text-[#1c1712] hover:ring-black/25 lg:min-w-0"
                  >
                    + Add color
                  </button>
                )}
              </div>
            </div>

            {/* ── Palette bar ── */}
            <div className="mt-6 flex flex-wrap items-center gap-3 rounded-2xl px-4 py-3.5 ring-1 ring-black/[0.07] sm:px-5">
              <div className="flex items-center gap-1.5">
                {points.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedId(p.id)}
                    aria-label={`Select ${p.hex.toUpperCase()}`}
                    className={`h-9 w-9 rounded-lg ring-1 transition ${selectedId === p.id ? "scale-110 ring-2 ring-[#1c1712]" : "ring-black/10 hover:scale-105"}`}
                    style={{ backgroundColor: p.hex }}
                    title={p.hex}
                  />
                ))}
              </div>

              <div className="hidden flex-1 sm:block" />

              <div className="flex items-center gap-2">
                <button onClick={sharePalette} className="rounded-full px-3.5 py-1.5 text-[12px] font-semibold text-[#1c1712]/70 ring-1 ring-black/[0.12] transition hover:text-[#1c1712] hover:ring-black/25">
                  Share link
                </button>
                <button onClick={downloadPalette} className="rounded-full px-3.5 py-1.5 text-[12px] font-semibold text-[#1c1712]/70 ring-1 ring-black/[0.12] transition hover:text-[#1c1712] hover:ring-black/25">
                  Download PNG
                </button>
                <button onClick={copyAll} className="rounded-full px-3.5 py-1.5 text-[12px] font-semibold text-[#1c1712]/70 ring-1 ring-black/[0.12] transition hover:text-[#1c1712] hover:ring-black/25">
                  Copy all
                </button>
              </div>

              <div className="flex w-full items-center gap-2 sm:w-auto">
                <input
                  type="text"
                  value={paletteName}
                  onChange={(e) => setPaletteName(e.target.value)}
                  aria-label="Palette name"
                  className="min-w-0 flex-1 rounded-full px-4 py-2 text-[13px] font-medium text-[#1c1712]/70 outline-none ring-1 ring-black/[0.12] transition placeholder:text-[#1c1712]/30 focus:ring-black/30 sm:w-44 sm:flex-none"
                  placeholder="Palette name"
                />
                <button
                  onClick={createWithPalette}
                  className="shrink-0 rounded-full bg-[#1c1712] px-5 py-2 text-[13px] font-semibold text-white transition hover:bg-[#c2410c]"
                >
                  Create with this palette →
                </button>
              </div>
            </div>
          </div>
        </section>

        <ToolPageSections config={toolPageContent["image-colors"]} variant="new" />
      </main>
    </div>
  );
}
