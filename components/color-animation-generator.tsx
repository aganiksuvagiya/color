"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback, useMemo, useId, useEffect, useRef } from "react";
import { Header } from "./header";
import { ToolPageSections } from "@/components/seo/tool-page-sections";
import { toolPageContent } from "@/lib/seo/tool-pages";

/* ── Types ── */
interface ColorStop { id: number; color: string; }
type AnimationType = "gradient-shift" | "color-pulse" | "hue-rotate";
type Direction = "normal" | "alternate" | "reverse";
type Easing = "linear" | "ease" | "ease-in-out";
interface PresetAnimation {
  name: string; colors: string[]; type: AnimationType;
  duration: number; direction: Direction; easing: Easing;
}

/* ── Constants ── */
const ANIMATION_TYPES: { value: AnimationType; label: string; icon: string }[] = [
  { value: "gradient-shift", label: "Gradient Shift", icon: "⇄" },
  { value: "color-pulse",    label: "Color Pulse",    icon: "◉" },
  { value: "hue-rotate",     label: "Hue Rotate",     icon: "↻" },
];
const DIRECTIONS: { value: Direction; label: string }[] = [
  { value: "normal", label: "Normal" },
  { value: "alternate", label: "Alternate" },
  { value: "reverse", label: "Reverse" },
];
const EASINGS: { value: Easing; label: string }[] = [
  { value: "linear", label: "Linear" },
  { value: "ease", label: "Ease" },
  { value: "ease-in-out", label: "Ease In-Out" },
];
const PRESETS: PresetAnimation[] = [
  { name: "Aurora",       colors: ["#00c9ff","#92fe9d","#00b09b","#96c93d"], type: "gradient-shift", duration: 6,  direction: "alternate", easing: "ease-in-out" },
  { name: "Sunset",       colors: ["#ff512f","#f09819","#ff6b6b","#ee0979"], type: "color-pulse",    duration: 4,  direction: "alternate", easing: "ease-in-out" },
  { name: "Ocean",        colors: ["#0052d4","#4facfe","#00f2fe","#43e97b"], type: "gradient-shift", duration: 8,  direction: "alternate", easing: "ease" },
  { name: "Neon",         colors: ["#f953c6","#b91d73","#8e2de2","#4a00e0"], type: "hue-rotate",     duration: 5,  direction: "normal",    easing: "linear" },
  { name: "Fire",         colors: ["#f12711","#f5af19","#ff6b35","#ffd700"], type: "gradient-shift", duration: 5,  direction: "alternate", easing: "ease-in-out" },
  { name: "Mint",         colors: ["#00b09b","#96c93d","#11998e","#38ef7d"], type: "gradient-shift", duration: 7,  direction: "alternate", easing: "ease" },
  { name: "Lavender",     colors: ["#a18cd1","#fbc2eb","#fddb92","#d1fdff"], type: "gradient-shift", duration: 9,  direction: "alternate", easing: "ease-in-out" },
  { name: "Deep Sea",     colors: ["#0f0c29","#302b63","#24243e","#006eff"], type: "color-pulse",    duration: 6,  direction: "normal",    easing: "linear" },
];

let nextId = 3;

/* ── CSS generation ── */
function buildKeyframesAndStyle(
  animName: string, type: AnimationType, colors: string[],
  duration: number, direction: Direction, easing: Easing,
): { keyframes: string; elementCss: string } {
  const colorsStr = colors.join(", ");
  switch (type) {
    case "gradient-shift":
      return {
        keyframes: `@keyframes ${animName} {\n  0% { background-position: 0% 50%; }\n  50% { background-position: 100% 50%; }\n  100% { background-position: 0% 50%; }\n}`,
        elementCss: `.animated-element {\n  background: linear-gradient(270deg, ${colorsStr});\n  background-size: ${colors.length * 100}% ${colors.length * 100}%;\n  animation: ${animName} ${duration}s ${easing} infinite ${direction};\n}`,
      };
    case "color-pulse": {
      const steps = colors.map((c, i) => `  ${Math.round((i/(colors.length-1))*100)}% { background-color: ${c}; }`).join("\n");
      return {
        keyframes: `@keyframes ${animName} {\n${steps}\n}`,
        elementCss: `.animated-element {\n  background-color: ${colors[0]};\n  animation: ${animName} ${duration}s ${easing} infinite ${direction};\n}`,
      };
    }
    case "hue-rotate":
      return {
        keyframes: `@keyframes ${animName} {\n  0% { filter: hue-rotate(0deg); }\n  100% { filter: hue-rotate(360deg); }\n}`,
        elementCss: `.animated-element {\n  background: linear-gradient(135deg, ${colorsStr});\n  animation: ${animName} ${duration}s ${easing} infinite ${direction};\n}`,
      };
  }
}

/* ── Animated Preset Chip ── */
function PresetChip({ preset, active, onClick }: { preset: PresetAnimation; active: boolean; onClick: () => void }) {
  const id = useId().replace(/:/g,"");
  const anim = `pc_${id}`;
  const { keyframes, elementCss } = buildKeyframesAndStyle(anim, preset.type, preset.colors, preset.duration, preset.direction, preset.easing);
  return (
    <button onClick={onClick}
      className={`group relative shrink-0 overflow-hidden rounded-xl border transition-all ${
        active ? "border-[#e8531f]/50 shadow-[0_0_0_2px_rgba(232,83,31,0.25)]" : "border-black/[0.07] hover:border-black/[0.14] hover:shadow-md"
      }`} style={{ width: 88 }}>
      <style>{`${keyframes}\n${elementCss.replace(".animated-element","#"+id)}`}</style>
      <div id={id} style={{ height: 52 }}/>
      <div className={`px-2 py-1.5 text-left ${active ? "bg-[#e8531f]/[0.06]" : "bg-white"}`}>
        <p className={`text-[10px] font-bold leading-tight ${active ? "text-[#e8531f]" : "text-[#1c1712]"}`}>{preset.name}</p>
      </div>
    </button>
  );
}

/* ── Mini toggle group ── */
function ToggleGroup<T extends string>({
  options, value, onChange,
}: { options: { value: T; label: string }[]; value: T; onChange: (v: T) => void }) {
  return (
    <div className="flex gap-1">
      {options.map(o => (
        <button key={o.value} onClick={() => onChange(o.value)}
          className={`flex-1 rounded-lg border py-1.5 text-[10px] font-semibold transition-all ${
            value===o.value ? "border-[#e8531f]/20 bg-[#e8531f] text-white shadow-[0_2px_8px_rgba(232,83,31,0.28)]" : "border-black/[0.06] bg-[#faf7f2] text-[#1c1712]/40 hover:bg-[#f0ede8]"
          }`}>
          {o.label}
        </button>
      ))}
    </div>
  );
}

/* ── Component ── */
export function ColorAnimationGenerator() {
  const uid = useId().replace(/:/g, "");
  const animName = `hf_${uid}`;

  const [colors, setColors] = useState<ColorStop[]>([
    { id: 1, color: "#6366f1" },
    { id: 2, color: "#ec4899" },
  ]);
  const [animType, setAnimType] = useState<AnimationType>("gradient-shift");
  const [duration, setDuration] = useState(4);
  const [direction, setDirection] = useState<Direction>("alternate");
  const [easing, setEasing] = useState<Easing>("ease-in-out");
  const [copied, setCopied] = useState(false);
  const [activePreset, setActivePreset] = useState<string | null>(null);

  /* Preset preview modal */
  const [previewPreset, setPreviewPreset] = useState<PresetAnimation | null>(null);
  const [previewColors, setPreviewColors] = useState<ColorStop[]>([]);
  const [previewType, setPreviewType] = useState<AnimationType>("gradient-shift");
  const [previewDuration, setPreviewDuration] = useState(4);
  const [previewDirection, setPreviewDirection] = useState<Direction>("alternate");
  const [previewEasing, setPreviewEasing] = useState<Easing>("ease-in-out");
  const [previewCopied, setPreviewCopied] = useState(false);
  const previewAnimName = `${animName}_m`;

  useEffect(() => {
    if (!previewPreset) return;
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") setPreviewPreset(null); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [previewPreset]);

  const openPreview = useCallback((preset: PresetAnimation) => {
    nextId = preset.colors.length + 1;
    setPreviewColors(preset.colors.map((c,i) => ({ id:i+1, color:c })));
    setPreviewType(preset.type); setPreviewDuration(preset.duration);
    setPreviewDirection(preset.direction); setPreviewEasing(preset.easing);
    setPreviewPreset(preset);
  }, []);

  const previewHexColors = useMemo(() => previewColors.map(c => c.color), [previewColors]);

  const previewModalStyleTag = useMemo(() => {
    if (!previewPreset) return "";
    const { keyframes, elementCss } = buildKeyframesAndStyle(previewAnimName, previewType, previewHexColors, previewDuration, previewDirection, previewEasing);
    return `${keyframes}\n${elementCss.replace(".animated-element", `#pm_${uid}`)}`;
  }, [previewPreset, previewAnimName, previewType, previewHexColors, previewDuration, previewDirection, previewEasing, uid]);

  const handleUsePreview = useCallback(() => {
    nextId = previewColors.length + 1;
    setColors(previewColors.map((c,i) => ({ id:i+1, color:c.color })));
    setAnimType(previewType); setDuration(previewDuration);
    setDirection(previewDirection); setEasing(previewEasing);
    setPreviewPreset(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [previewColors, previewType, previewDuration, previewDirection, previewEasing]);

  const handleCopyPreviewCss = useCallback(() => {
    const { keyframes, elementCss } = buildKeyframesAndStyle(previewAnimName, previewType, previewHexColors, previewDuration, previewDirection, previewEasing);
    navigator.clipboard.writeText(`${keyframes}\n\n${elementCss}`).then(() => {
      setPreviewCopied(true); setTimeout(() => setPreviewCopied(false), 2000);
    });
  }, [previewAnimName, previewType, previewHexColors, previewDuration, previewDirection, previewEasing]);

  /* More animations */
  const [morePresets, setMorePresets] = useState<PresetAnimation[]>([]);
  const [morePage, setMorePage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMorePresets, setHasMorePresets] = useState(true);
  const moreLoaderRef = useRef<HTMLDivElement>(null);

  const fetchMorePresets = useCallback(async (pageNum: number, append: boolean) => {
    setLoadingMore(true);
    try {
      const res = await fetch(`/api/animation-presets?page=${pageNum}&limit=8`);
      const data = await res.json();
      setMorePresets(prev => append ? [...prev, ...data.presets] : data.presets);
      setHasMorePresets(data.pagination.hasNext);
    } catch { /* silently fail */ } finally { setLoadingMore(false); }
  }, []);

  useEffect(() => { const t = setTimeout(() => fetchMorePresets(1, false), 0); return () => clearTimeout(t); }, [fetchMorePresets]);

  const loadMorePresets = useCallback(() => {
    if (!hasMorePresets || loadingMore) return;
    const next = morePage+1; setMorePage(next); fetchMorePresets(next, true);
  }, [hasMorePresets, loadingMore, morePage, fetchMorePresets]);

  useEffect(() => {
    const loader = moreLoaderRef.current; if (!loader) return;
    const obs = new IntersectionObserver(e => { if (e[0].isIntersecting) loadMorePresets(); }, { threshold: 0.1 });
    obs.observe(loader); return () => obs.disconnect();
  }, [loadMorePresets]);

  /* Color management */
  const addColor = useCallback(() => {
    if (colors.length >= 6) return;
    const r = `#${Math.floor(Math.random()*16777215).toString(16).padStart(6,"0")}`;
    setColors(prev => [...prev, { id:nextId++, color:r }]);
  }, [colors.length]);

  const removeColor = useCallback((id: number) => {
    if (colors.length <= 2) return;
    setColors(prev => prev.filter(c => c.id !== id));
  }, [colors.length]);

  const updateColor = useCallback((id: number, hex: string) => {
    setColors(prev => prev.map(c => c.id===id ? {...c,color:hex} : c));
  }, []);

  const applyPreset = useCallback((preset: PresetAnimation) => {
    nextId = preset.colors.length + 1;
    setColors(preset.colors.map((c,i) => ({ id:i+1, color:c })));
    setAnimType(preset.type); setDuration(preset.duration);
    setDirection(preset.direction); setEasing(preset.easing);
    setActivePreset(preset.name);
  }, []);

  /* CSS */
  const hexColors = useMemo(() => colors.map(c => c.color), [colors]);
  const { keyframes: kf, elementCss: elCss } = useMemo(
    () => buildKeyframesAndStyle(animName, animType, hexColors, duration, direction, easing),
    [animName, animType, hexColors, duration, direction, easing],
  );
  const fullCss = `${kf}\n\n${elCss}`;

  const previewStyleTag = useMemo(() => {
    const { keyframes, elementCss } = buildKeyframesAndStyle(animName, animType, hexColors, duration, direction, easing);
    return `${keyframes}\n${elementCss.replace(".animated-element", `#canvas_${uid}`)}`;
  }, [animName, animType, hexColors, duration, direction, easing, uid]);

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(fullCss).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  }, [fullCss]);

  const typeLabel = ANIMATION_TYPES.find(t => t.value === animType)?.label ?? "";
  const typeIcon  = ANIMATION_TYPES.find(t => t.value === animType)?.icon ?? "";

  return (
    <div className="flex min-h-screen flex-col bg-[#f0ede8] text-[#1c1712]">
      <Header />

      <main className="mx-auto w-full max-w-[1040px] flex-1 px-4 pb-20 pt-20 sm:px-6 sm:pt-24 lg:pt-28">

        {/* ── Inline hero ── */}
        <motion.div initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.35 }}
          className="mb-6 flex flex-col items-start gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="mb-2 inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#1c1712]/40 shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#e8531f]"/>Animation Tool
            </span>
            <h1 className="font-display text-[2rem] font-black leading-none tracking-[-0.04em] sm:text-[2.6rem]">
              Color Animation Generator
            </h1>
          </div>
          <p className="hidden text-[13px] text-[#1c1712]/40 sm:block sm:text-right sm:max-w-[220px]">
            Live CSS gradient animations with instant export
          </p>
        </motion.div>

        <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.4, delay:0.05 }}>

          {/* ── Split layout: canvas left, controls right ── */}
          <div className="flex min-w-0 flex-col gap-4 lg:flex-row lg:items-start">

            {/* ═══ LEFT — Stage (canvas + info) ═══ */}
            <div className="flex min-w-0 flex-col gap-4 lg:w-[56%] lg:flex-shrink-0">

              {/* Canvas card */}
              <div className="overflow-hidden rounded-3xl border border-black/[0.08] bg-white shadow-sm">
                <style>{previewStyleTag}</style>

                {/* Animated canvas */}
                <div id={`canvas_${uid}`} className="h-48 w-full sm:h-64 lg:h-[360px]"/>

                {/* Swatch strip */}
                <div className="flex overflow-hidden border-t border-black/[0.06]">
                  {hexColors.map((hex, i) => (
                    <div key={i} className="group/sw relative flex-1 transition-[flex] duration-300 hover:flex-[3]"
                      style={{ backgroundColor: hex, height: 36 }}>
                      <div className="absolute inset-x-0 bottom-0 flex justify-center pb-1 opacity-0 transition-opacity duration-150 group-hover/sw:opacity-100">
                        <span className="rounded-full bg-black/55 px-2 py-0.5 font-mono text-[8px] text-white">{hex.toUpperCase()}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Status + copy bar */}
                <div className="flex items-center gap-2 overflow-x-auto bg-[#faf7f2] px-4 py-2.5" style={{ scrollbarWidth:"none" }}>
                  <span className="flex shrink-0 items-center gap-1 rounded-full bg-[#1c1712]/[0.06] px-2.5 py-1 text-[10px] font-bold whitespace-nowrap text-[#1c1712]/55">
                    <span>{typeIcon}</span>{typeLabel}
                  </span>
                  <span className="shrink-0 whitespace-nowrap text-[10px] text-[#1c1712]/25">{duration}s · {direction}</span>
                  <div className="ml-auto shrink-0">
                    <button onClick={copyToClipboard}
                      className={`flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-[11px] font-semibold whitespace-nowrap transition ${
                        copied ? "border-green-200 bg-green-50 text-green-600" : "border-black/[0.07] bg-white text-[#1c1712]/50 hover:bg-white/60"
                      }`}>
                      {copied
                        ? <><svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>Copied!</>
                        : <><svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>Copy CSS</>
                      }
                    </button>
                  </div>
                </div>
              </div>

              {/* CSS output */}
              <div className="overflow-hidden rounded-3xl border border-black/[0.08] bg-white shadow-sm">
                <div className="border-b border-black/[0.06] px-4 py-3">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1c1712]/35">Generated CSS</p>
                </div>
                <pre className="max-h-44 overflow-y-auto px-4 py-3.5 font-mono text-[10px] leading-relaxed text-[#1c1712]/50">
                  <code>{fullCss}</code>
                </pre>
              </div>
            </div>

            {/* ═══ RIGHT — Controls ═══ */}
            <div className="flex min-w-0 flex-1 flex-col gap-3">

              {/* Preset chips */}
              <div className="overflow-hidden rounded-3xl border border-black/[0.08] bg-white shadow-sm">
                <div className="border-b border-black/[0.06] px-4 py-3">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1c1712]/35">Presets</p>
                </div>
                <div className="flex gap-2 overflow-x-auto px-4 py-3" style={{ scrollbarWidth:"none" }}>
                  {PRESETS.map(p => (
                    <PresetChip key={p.name} preset={p} active={activePreset===p.name} onClick={() => applyPreset(p)}/>
                  ))}
                </div>
              </div>

              {/* Color stops */}
              <div className="overflow-hidden rounded-3xl border border-black/[0.08] bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-black/[0.06] px-4 py-3">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1c1712]/35">Colors</p>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[9px] text-[#1c1712]/20">{colors.length}/6</span>
                    <button onClick={addColor} disabled={colors.length >= 6}
                      className="flex items-center gap-1 rounded-lg border border-black/[0.06] bg-[#faf7f2] px-2.5 py-1 text-[10px] font-semibold text-[#1c1712]/40 transition hover:bg-[#f0ede8] disabled:opacity-25">
                      <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/></svg>
                      Add
                    </button>
                  </div>
                </div>
                <div className="px-4 pt-3 pb-1">
                  {/* Gradient preview bar */}
                  <div className="mb-3 h-2 overflow-hidden rounded-full"
                    style={{ background:`linear-gradient(90deg, ${hexColors.join(",")})` }}/>
                  <AnimatePresence mode="popLayout">
                    {colors.map(stop => (
                      <motion.div key={stop.id} layout
                        initial={{ opacity:0, x:-8 }} animate={{ opacity:1, x:0 }}
                        exit={{ opacity:0, x:8 }} transition={{ duration:0.12 }}
                        className="mb-2 flex items-center gap-2">
                        <label className="relative h-8 w-8 shrink-0 cursor-pointer overflow-hidden rounded-lg border border-black/[0.09] shadow-sm"
                          style={{ backgroundColor: stop.color }}>
                          <input type="color" value={stop.color}
                            onChange={e => updateColor(stop.id, e.target.value)}
                            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"/>
                        </label>
                        <input type="text" value={stop.color} maxLength={7}
                          onChange={e => { const v=e.target.value; if(/^#[0-9A-Fa-f]{0,6}$/.test(v)) updateColor(stop.id,v); }}
                          className="w-20 rounded-lg border border-black/[0.06] bg-[#faf7f2] px-2.5 py-1.5 font-mono text-[11px] text-[#1c1712] outline-none transition focus:border-black/14 focus:bg-white"/>
                        <div className="flex-1"/>
                        <button onClick={() => removeColor(stop.id)} disabled={colors.length <= 2}
                          className="flex h-6 w-6 items-center justify-center rounded-lg text-[#1c1712]/20 transition hover:bg-[#faf7f2] hover:text-[#1c1712]/50 disabled:opacity-15">
                          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              {/* Animation type */}
              <div className="overflow-hidden rounded-3xl border border-black/[0.08] bg-white shadow-sm">
                <div className="border-b border-black/[0.06] px-4 py-3">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1c1712]/35">Type</p>
                </div>
                <div className="grid grid-cols-3 gap-2 px-4 py-3">
                  {ANIMATION_TYPES.map(t => (
                    <button key={t.value} onClick={() => setAnimType(t.value)}
                      className={`flex flex-col items-center gap-1 rounded-2xl border py-3 transition-all ${
                        animType===t.value ? "border-[#e8531f]/20 bg-[#e8531f] text-white shadow-[0_2px_10px_rgba(232,83,31,0.28)]" : "border-black/[0.06] bg-[#faf7f2] text-[#1c1712]/45 hover:bg-[#f0ede8]"
                      }`}>
                      <span className="text-[16px] leading-none">{t.icon}</span>
                      <span className="text-[9px] font-bold leading-tight text-center">{t.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Timing controls */}
              <div className="overflow-hidden rounded-3xl border border-black/[0.08] bg-white shadow-sm">
                <div className="border-b border-black/[0.06] px-4 py-3">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1c1712]/35">Timing</p>
                </div>
                <div className="space-y-4 px-4 py-3.5">
                  {/* Duration */}
                  <div>
                    <div className="mb-1.5 flex items-center justify-between">
                      <span className="text-[10px] font-semibold text-[#1c1712]/40">Duration</span>
                      <span className="font-mono text-[11px] font-bold text-[#1c1712]">{duration}s</span>
                    </div>
                    <div className="relative h-3">
                      <div className="absolute inset-y-0 left-0 right-0 my-auto h-1.5 overflow-hidden rounded-full bg-black/[0.06]">
                        <div className="h-full rounded-full bg-[#e8531f]" style={{ width:`${((duration-1)/9)*100}%` }}/>
                      </div>
                      <input type="range" min={1} max={10} step={0.5} value={duration}
                        onChange={e => setDuration(parseFloat(e.target.value))}
                        className="relative h-3 w-full cursor-pointer opacity-0"/>
                    </div>
                  </div>
                  {/* Direction */}
                  <div>
                    <span className="mb-1.5 block text-[10px] font-semibold text-[#1c1712]/40">Direction</span>
                    <ToggleGroup options={DIRECTIONS} value={direction} onChange={setDirection}/>
                  </div>
                  {/* Easing */}
                  <div>
                    <span className="mb-1.5 block text-[10px] font-semibold text-[#1c1712]/40">Easing</span>
                    <ToggleGroup options={EASINGS} value={easing} onChange={setEasing}/>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── More Animations ── */}
          {(morePresets.length > 0 || loadingMore) && (
            <div className="mt-4 overflow-hidden rounded-3xl border border-black/[0.08] bg-white shadow-sm">
              <div className="border-b border-black/[0.06] px-5 py-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1c1712]/35">More Animations</p>
              </div>
              <div className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-4">
                {morePresets.map((preset, i) => (
                  <motion.button key={`${preset.name}-${i}`}
                    initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }}
                    transition={{ duration:0.3, delay:(i%8)*0.04 }}
                    onClick={() => openPreview(preset)}
                    className="group overflow-hidden rounded-2xl border border-black/[0.07] bg-[#faf7f2] text-left transition-all hover:-translate-y-0.5 hover:shadow-md">
                    <div className="h-14 w-full" style={{ background:`linear-gradient(135deg, ${preset.colors.join(",")})` }}/>
                    <div className="px-3 py-2.5">
                      <p className="text-[12px] font-semibold text-[#1c1712]">{preset.name}</p>
                      <p className="text-[10px] text-[#1c1712]/35">
                        {preset.type==="gradient-shift"?"Gradient Shift":preset.type==="color-pulse"?"Color Pulse":"Hue Rotate"}
                      </p>
                    </div>
                  </motion.button>
                ))}
              </div>
              {hasMorePresets && (
                <div ref={moreLoaderRef} className="flex justify-center pb-6">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-black/10 border-t-[#e8531f]"/>
                </div>
              )}
            </div>
          )}

        </motion.div>
        <ToolPageSections config={toolPageContent.animation}/>
      </main>

      {/* ── Preset Preview Modal ── */}
      <AnimatePresence>
        {previewPreset && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
            onClick={() => setPreviewPreset(null)}>
            <motion.div initial={{ opacity:0, y:16, scale:0.97 }} animate={{ opacity:1, y:0, scale:1 }}
              exit={{ opacity:0, y:16, scale:0.97 }} transition={{ duration:0.2 }}
              onClick={e => e.stopPropagation()}
              className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-3xl border border-black/[0.08] bg-white shadow-2xl">

              <div className="flex items-center justify-between border-b border-black/[0.06] px-6 py-5">
                <div>
                  <p className="text-[16px] font-bold text-[#1c1712]">{previewPreset.name}</p>
                  <p className="text-[11px] text-[#1c1712]/40">Customize and use this animation</p>
                </div>
                <button onClick={() => setPreviewPreset(null)}
                  className="flex h-8 w-8 items-center justify-center rounded-xl border border-black/[0.07] bg-[#faf7f2] text-[#1c1712]/40 transition hover:bg-[#f0ede8]">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>

              <style>{previewModalStyleTag}</style>
              <div id={`pm_${uid}`} className="w-full" style={{ height: 180 }}/>

              <div className="grid grid-cols-1 gap-5 px-6 py-5 sm:grid-cols-2">
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#1c1712]/35">Colors</p>
                    <button onClick={() => setPreviewColors(prev => { if(prev.length>=6) return prev; return [...prev,{id:nextId++,color:`#${Math.floor(Math.random()*16777215).toString(16).padStart(6,"0")}`}]; })}
                      disabled={previewColors.length>=6}
                      className="rounded-lg border border-black/[0.06] bg-[#faf7f2] px-2.5 py-1 text-[10px] font-semibold text-[#1c1712]/40 hover:bg-[#f0ede8] disabled:opacity-25">
                      + Add
                    </button>
                  </div>
                  <div className="mb-3 h-2 overflow-hidden rounded-full"
                    style={{ background:`linear-gradient(90deg, ${previewHexColors.join(",")})` }}/>
                  <div className="space-y-2">
                    {previewColors.map(stop => (
                      <div key={stop.id} className="flex items-center gap-2">
                        <label className="relative h-7 w-7 shrink-0 cursor-pointer overflow-hidden rounded-lg border border-black/[0.09]" style={{ backgroundColor: stop.color }}>
                          <input type="color" value={stop.color}
                            onChange={e => setPreviewColors(prev => prev.map(c => c.id===stop.id?{...c,color:e.target.value}:c))}
                            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"/>
                        </label>
                        <input type="text" value={stop.color} maxLength={7}
                          onChange={e => { const v=e.target.value; if(/^#[0-9A-Fa-f]{0,6}$/.test(v)) setPreviewColors(prev => prev.map(c => c.id===stop.id?{...c,color:v}:c)); }}
                          className="w-20 rounded-lg border border-black/[0.06] bg-[#faf7f2] px-2 py-1 font-mono text-[10px] text-[#1c1712] outline-none focus:border-black/14"/>
                        {previewColors.length>2 && (
                          <button onClick={() => setPreviewColors(prev => prev.filter(c => c.id!==stop.id))}
                            className="ml-auto flex h-5.5 w-5.5 items-center justify-center rounded text-[#1c1712]/20 hover:text-[#1c1712]/50">
                            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#1c1712]/35">Settings</p>
                  <div className="mb-3 grid grid-cols-3 gap-1.5">
                    {ANIMATION_TYPES.map(t => (
                      <button key={t.value} onClick={() => setPreviewType(t.value)}
                        className={`flex flex-col items-center gap-0.5 rounded-xl border py-2 text-[9px] font-bold transition-all ${previewType===t.value?"border-[#e8531f]/20 bg-[#e8531f] text-white shadow-[0_2px_8px_rgba(232,83,31,0.28)]":"border-black/[0.06] bg-[#faf7f2] text-[#1c1712]/40 hover:bg-[#f0ede8]"}`}>
                        <span className="text-[13px]">{t.icon}</span>{t.label}
                      </button>
                    ))}
                  </div>
                  <div className="mb-3">
                    <div className="mb-1.5 flex justify-between text-[10px]">
                      <span className="font-semibold text-[#1c1712]/40">Duration</span>
                      <span className="font-mono font-bold text-[#1c1712]">{previewDuration}s</span>
                    </div>
                    <div className="relative h-3">
                      <div className="absolute inset-y-0 left-0 right-0 my-auto h-1.5 overflow-hidden rounded-full bg-black/[0.06]">
                        <div className="h-full rounded-full bg-[#e8531f]" style={{ width:`${((previewDuration-1)/9)*100}%` }}/>
                      </div>
                      <input type="range" min={1} max={10} step={0.5} value={previewDuration}
                        onChange={e => setPreviewDuration(parseFloat(e.target.value))}
                        className="relative h-3 w-full cursor-pointer opacity-0"/>
                    </div>
                  </div>
                  <div className="mb-2.5">
                    <span className="mb-1.5 block text-[10px] font-semibold text-[#1c1712]/40">Direction</span>
                    <ToggleGroup options={DIRECTIONS} value={previewDirection} onChange={setPreviewDirection}/>
                  </div>
                  <div>
                    <span className="mb-1.5 block text-[10px] font-semibold text-[#1c1712]/40">Easing</span>
                    <ToggleGroup options={EASINGS} value={previewEasing} onChange={setPreviewEasing}/>
                  </div>
                </div>
              </div>

              <div className="flex gap-2.5 border-t border-black/[0.06] px-6 py-4">
                <button onClick={handleUsePreview}
                  className="flex-1 rounded-2xl bg-[#e8531f] py-2.5 text-[13px] font-bold text-white shadow-[0_4px_14px_rgba(232,83,31,0.28)] transition hover:bg-[#c94518]">
                  Use this animation
                </button>
                <button onClick={handleCopyPreviewCss}
                  className={`rounded-2xl border px-5 py-2.5 text-[13px] font-semibold transition ${previewCopied?"border-green-200 bg-green-50 text-green-600":"border-black/[0.07] bg-[#faf7f2] text-[#1c1712]/55 hover:bg-[#f0ede8]"}`}>
                  {previewCopied?"Copied!":"Copy CSS"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
