"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useCallback, useEffect, useRef } from "react";
import { Header } from "./header";

interface ColorStop {
  color: string;
  position: number;
  id: number;
}

type GradientType = "linear" | "radial" | "conic";

interface PresetGradient {
  name: string;
  colors: string[];
  positions?: number[];
}

const PRESETS: PresetGradient[] = [
  { name: "Sunset", colors: ["#FF512F", "#F09819"] },
  { name: "Ocean", colors: ["#2E3192", "#1BFFFF"] },
  { name: "Purple Haze", colors: ["#7B4397", "#DC2430"] },
  { name: "Fresh Mint", colors: ["#00B09B", "#96C93D"] },
  { name: "Peach", colors: ["#ED4264", "#FFEDBC"] },
  { name: "Night Sky", colors: ["#0F2027", "#203A43", "#2C5364"], positions: [0, 50, 100] },
  { name: "Warm Flame", colors: ["#ff9a9e", "#fecfef"] },
  { name: "Juicy Peach", colors: ["#ffecd2", "#fcb69f"] },
  { name: "Lady Lips", colors: ["#ff9a9e", "#fad0c4"] },
  { name: "Winter Neva", colors: ["#a1c4fd", "#c2e9fb"] },
  { name: "Plum Plate", colors: ["#667eea", "#764ba2"] },
  { name: "Everlasting Sky", colors: ["#fdfcfb", "#e2d1c3"] },
];

const ANGLE_PRESETS = [0, 45, 90, 135, 180];

const RANDOM_COLORS = [
  "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7",
  "#DDA0DD", "#98D8C8", "#F7DC6F", "#BB8FCE", "#85C1E9",
  "#F1948A", "#82E0AA", "#F8C471", "#AED6F1", "#D7BDE2",
  "#A3E4D7", "#FAD7A0", "#F5B7B1", "#ABEBC6", "#D6EAF8",
  "#FF9A76", "#679B9B", "#FFB740", "#FF6F91", "#845EC2",
];

let nextId = 3;

function generateCss(type: GradientType, angle: number, stops: ColorStop[]): string {
  const sorted = [...stops].sort((a, b) => a.position - b.position);
  const stopsStr = sorted.map((s) => `${s.color} ${s.position}%`).join(", ");

  switch (type) {
    case "linear":
      return `background: linear-gradient(${angle}deg, ${stopsStr});`;
    case "radial":
      return `background: radial-gradient(circle, ${stopsStr});`;
    case "conic":
      return `background: conic-gradient(from ${angle}deg, ${stopsStr});`;
  }
}

function generateGradientStyle(type: GradientType, angle: number, stops: ColorStop[]): string {
  const sorted = [...stops].sort((a, b) => a.position - b.position);
  const stopsStr = sorted.map((s) => `${s.color} ${s.position}%`).join(", ");

  switch (type) {
    case "linear":
      return `linear-gradient(${angle}deg, ${stopsStr})`;
    case "radial":
      return `radial-gradient(circle, ${stopsStr})`;
    case "conic":
      return `conic-gradient(from ${angle}deg, ${stopsStr})`;
  }
}

function presetToStyle(preset: PresetGradient): string {
  const stops = preset.colors.map((c, i) => {
    const pos = preset.positions
      ? preset.positions[i]
      : Math.round((i / (preset.colors.length - 1)) * 100);
    return `${c} ${pos}%`;
  });
  return `linear-gradient(135deg, ${stops.join(", ")})`;
}

export function GradientGenerator() {
  const [gradientType, setGradientType] = useState<GradientType>("linear");
  const [angle, setAngle] = useState(90);
  const [stops, setStops] = useState<ColorStop[]>([
    { color: "#667eea", position: 0, id: 1 },
    { color: "#764ba2", position: 100, id: 2 },
  ]);
  const [copied, setCopied] = useState(false);
  const [apiGradients, setApiGradients] = useState<PresetGradient[]>([]);
  const [gradientPage, setGradientPage] = useState(1);
  const [loadingGradients, setLoadingGradients] = useState(false);
  const [hasMoreGradients, setHasMoreGradients] = useState(true);
  const gradientLoaderRef = useRef<HTMLDivElement>(null);

  const fetchGradients = useCallback(async (pageNum: number, append: boolean) => {
    setLoadingGradients(true);
    try {
      const res = await fetch(`/api/gradients?page=${pageNum}&limit=12`);
      const data = await res.json();
      const mapped: PresetGradient[] = data.gradients.map((g: { name: string; colors: string[]; positions: number[] }) => ({
        name: g.name,
        colors: g.colors,
        positions: g.positions,
      }));
      setApiGradients((prev) => append ? [...prev, ...mapped] : mapped);
      setHasMoreGradients(data.pagination.hasNext);
    } catch {
      // silently fail
    } finally {
      setLoadingGradients(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => fetchGradients(1, false), 0);
    return () => clearTimeout(timer);
  }, [fetchGradients]);

  const loadMoreGradients = useCallback(() => {
    if (!hasMoreGradients || loadingGradients) return;
    const next = gradientPage + 1;
    setGradientPage(next);
    fetchGradients(next, true);
  }, [hasMoreGradients, loadingGradients, gradientPage, fetchGradients]);

  useEffect(() => {
    const loader = gradientLoaderRef.current;
    if (!loader) return;
    const observer = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) loadMoreGradients(); },
      { threshold: 0.1 }
    );
    observer.observe(loader);
    return () => observer.disconnect();
  }, [loadMoreGradients]);

  const cssOutput = generateCss(gradientType, angle, stops);
  const gradientStyle = generateGradientStyle(gradientType, angle, stops);

  const updateStop = useCallback((id: number, updates: Partial<ColorStop>) => {
    setStops((prev) => prev.map((s) => (s.id === id ? { ...s, ...updates } : s)));
  }, []);

  const removeStop = useCallback((id: number) => {
    setStops((prev) => (prev.length <= 2 ? prev : prev.filter((s) => s.id !== id)));
  }, []);

  const addStop = useCallback(() => {
    if (stops.length >= 5) return;
    const newPos = 50;
    const newColor = RANDOM_COLORS[Math.floor(Math.random() * RANDOM_COLORS.length)];
    setStops((prev) => [...prev, { color: newColor, position: newPos, id: nextId++ }]);
  }, [stops.length]);

  const randomize = useCallback(() => {
    const count = Math.random() < 0.5 ? 2 : 3;
    const shuffled = [...RANDOM_COLORS].sort(() => Math.random() - 0.5);
    const newStops: ColorStop[] = [];
    for (let i = 0; i < count; i++) {
      newStops.push({
        color: shuffled[i],
        position: Math.round((i / (count - 1)) * 100),
        id: nextId++,
      });
    }
    setStops(newStops);
    setAngle(Math.floor(Math.random() * 360));
  }, []);

  const loadPreset = useCallback((preset: PresetGradient) => {
    const newStops = preset.colors.map((color, i) => ({
      color,
      position: preset.positions
        ? preset.positions[i]
        : Math.round((i / (preset.colors.length - 1)) * 100),
      id: nextId++,
    }));
    setStops(newStops);
    setGradientType("linear");
    setAngle(135);
  }, []);

  const copyCSS = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(cssOutput);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const textarea = document.createElement("textarea");
      textarea.value = cssOutput;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [cssOutput]);

  const cardClass =
    "rounded-2xl border border-white/10 bg-gradient-to-b from-white/8 to-white/3 p-5 shadow-lg shadow-black/10 backdrop-blur-xl";

  return (
    <div className="min-h-screen bg-[#160b05] text-white">
      <Header />

      {/* Content */}
      <div className="mx-auto max-w-5xl px-4 pt-24 pb-20 sm:px-6 sm:pt-40">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-10 text-center"
        >
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Gradient Generator
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/50">
            Create beautiful CSS gradients with multiple color stops. Copy the code instantly.
          </p>
        </motion.div>

        {/* Preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className={`${cardClass} mb-8`}
        >
          <div
            className="h-[300px] w-full rounded-xl"
            style={{ background: gradientStyle }}
          />
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-8 grid gap-6 md:grid-cols-2"
        >
          {/* Gradient Type + Angle */}
          <div className={cardClass}>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/50">
              Gradient Type
            </h3>
            <div className="mb-5 flex gap-2">
              {(["linear", "radial", "conic"] as GradientType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => setGradientType(type)}
                  className={`rounded-xl px-4 py-2.5 text-sm font-medium capitalize transition-all ${
                    gradientType === type
                      ? "bg-white text-[#160b05] shadow-lg"
                      : "bg-white/8 text-white/70 hover:bg-white/15"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            {(gradientType === "linear" || gradientType === "conic") && (
              <>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white/50">
                  Angle: {angle}°
                </h3>
                <input
                  type="range"
                  min={0}
                  max={360}
                  value={angle}
                  onChange={(e) => setAngle(Number(e.target.value))}
                  className="mb-3 w-full accent-white"
                />
                {gradientType === "linear" && (
                  <div className="flex flex-wrap gap-2">
                    {ANGLE_PRESETS.map((a) => (
                      <button
                        key={a}
                        onClick={() => setAngle(a)}
                        className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                          angle === a
                            ? "bg-white text-[#160b05]"
                            : "bg-white/8 text-white/60 hover:bg-white/15"
                        }`}
                      >
                        {a}°
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Color Stops */}
          <div className={cardClass}>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white/50">
                Color Stops
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={randomize}
                  className="rounded-lg bg-white/8 px-3 py-1.5 text-xs font-medium text-white/70 transition-all hover:bg-white/15"
                >
                  Randomize
                </button>
                {stops.length < 5 && (
                  <button
                    onClick={addStop}
                    className="rounded-lg bg-white/8 px-3 py-1.5 text-xs font-medium text-white/70 transition-all hover:bg-white/15"
                  >
                    + Add Stop
                  </button>
                )}
              </div>
            </div>

            <div className="space-y-3">
              {stops.map((stop) => (
                <div key={stop.id} className="flex flex-wrap items-center gap-2 sm:flex-nowrap sm:gap-3">
                  <div className="relative">
                    <input
                      type="color"
                      value={stop.color}
                      onChange={(e) => updateStop(stop.id, { color: e.target.value })}
                      className="h-9 w-9 cursor-pointer appearance-none rounded-lg border border-white/10 bg-transparent [&::-webkit-color-swatch-wrapper]:p-0.5 [&::-webkit-color-swatch]:rounded-md [&::-webkit-color-swatch]:border-none"
                    />
                  </div>
                  <input
                    type="text"
                    value={stop.color}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (/^#[0-9A-Fa-f]{0,6}$/.test(val)) {
                        updateStop(stop.id, { color: val });
                      }
                    }}
                    className="w-[75px] rounded-lg border border-white/10 bg-white/5 px-2 py-2 text-xs font-mono text-white/90 outline-none focus:border-white/30 sm:w-[90px] sm:px-3"
                    maxLength={7}
                  />
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={stop.position}
                    onChange={(e) => updateStop(stop.id, { position: Number(e.target.value) })}
                    className="flex-1 accent-white"
                  />
                  <span className="w-10 text-right text-xs text-white/50">
                    {stop.position}%
                  </span>
                  {stops.length > 2 && (
                    <button
                      onClick={() => removeStop(stop.id)}
                      className="flex h-7 w-7 items-center justify-center rounded-lg text-white/40 transition-colors hover:bg-white/10 hover:text-white/80"
                      aria-label="Remove stop"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CSS Output */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className={`${cardClass} mb-12`}
        >
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/50">
              CSS Code
            </h3>
            <button
              onClick={copyCSS}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                copied
                  ? "bg-green-500/20 text-green-400"
                  : "bg-white/8 text-white/70 hover:bg-white/15"
              }`}
            >
              {copied ? "Copied!" : "Copy CSS"}
            </button>
          </div>
          <div className="rounded-xl bg-black/30 p-4">
            <code className="block break-all font-mono text-sm text-white/80">
              {cssOutput}
            </code>
          </div>
        </motion.div>

        {/* Preset Gradients */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="mb-6 text-center text-2xl font-bold">Preset Gradients</h2>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {apiGradients.map((preset, i) => (
              <motion.button
                key={`${preset.name}-${i}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: (i % 12) * 0.04 }}
                onClick={() => loadPreset(preset)}
                className={`${cardClass} group cursor-pointer text-left transition-all hover:scale-[1.02] hover:border-white/20`}
              >
                <div
                  className="mb-3 h-24 w-full rounded-xl"
                  style={{ background: presetToStyle(preset) }}
                />
                <p className="text-sm font-semibold text-white/90">{preset.name}</p>
                <p className="mt-1 text-xs text-white/40">
                  {preset.colors.join(" → ")}
                </p>
              </motion.button>
            ))}
          </div>
          {hasMoreGradients && (
            <div ref={gradientLoaderRef} className="flex justify-center py-12">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white/60" />
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
