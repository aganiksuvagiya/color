"use client";

import Link from "next/link";
import { useState, useCallback, useEffect, useRef } from "react";
import { Header } from "./header";
import { ToolPageSections } from "@/components/seo/tool-page-sections";
import { SwatchStrip } from "@/components/seo/swatch-strip";
import { toolPageContent } from "@/lib/seo/tool-pages";
import { type SavedGradient } from "@/lib/storage";
import { useGradientStorage } from "@/hooks/use-gradient-storage";

interface ColorStop {
  color: string;
  position: number;
  id: number;
}

type GradientType = "linear" | "radial" | "conic";
type ExportTab = "css" | "tailwind" | "svg" | "inline";

interface PresetGradient {
  name: string;
  colors: string[];
  positions?: number[];
}

const COMPASS: Array<[number | null, string]> = [
  [315, "↖"], [0, "↑"], [45, "↗"],
  [270, "←"], [null, ""], [90, "→"],
  [225, "↙"], [180, "↓"], [135, "↘"],
];

const RANDOM_COLORS = [
  "#FF6B6B","#4ECDC4","#45B7D1","#96CEB4","#FFEAA7","#DDA0DD","#98D8C8",
  "#F7DC6F","#BB8FCE","#85C1E9","#F1948A","#82E0AA","#F8C471","#AED6F1",
  "#D7BDE2","#A3E4D7","#FAD7A0","#F5B7B1","#ABEBC6","#D6EAF8","#FF9A76",
  "#679B9B","#FFB740","#FF6F91","#845EC2",
];

let nextId = 3;

// ── Color math ────────────────────────────────────────────────────────────────

function mixHex(a: string, b: string, t: number): string {
  if (!/^#[0-9a-fA-F]{6}$/.test(a) || !/^#[0-9a-fA-F]{6}$/.test(b)) return a;
  const ar=parseInt(a.slice(1,3),16), ag=parseInt(a.slice(3,5),16), ab=parseInt(a.slice(5,7),16);
  const br=parseInt(b.slice(1,3),16), bg=parseInt(b.slice(3,5),16), bb=parseInt(b.slice(5,7),16);
  const r=Math.round(ar+(br-ar)*t), g=Math.round(ag+(bg-ag)*t), bv=Math.round(ab+(bb-ab)*t);
  return `#${r.toString(16).padStart(2,"0")}${g.toString(16).padStart(2,"0")}${bv.toString(16).padStart(2,"0")}`;
}

function sampleGradientColors(stops: ColorStop[], count: number): string[] {
  const sorted = [...stops].sort((a,b) => a.position - b.position);
  return Array.from({ length: count }, (_, i) => {
    const pos = count === 1 ? 50 : (i / (count-1)) * 100;
    if (pos <= sorted[0].position) return sorted[0].color;
    if (pos >= sorted[sorted.length-1].position) return sorted[sorted.length-1].color;
    for (let j = 0; j < sorted.length-1; j++) {
      const s1=sorted[j], s2=sorted[j+1];
      if (pos >= s1.position && pos <= s2.position) {
        const t = s2.position===s1.position ? 0 : (pos-s1.position)/(s2.position-s1.position);
        return mixHex(s1.color, s2.color, t);
      }
    }
    return sorted[0].color;
  });
}

// ── CSS generators ────────────────────────────────────────────────────────────

function stopsStr(stops: ColorStop[]): string {
  return [...stops].sort((a,b)=>a.position-b.position).map(s=>`${s.color} ${s.position}%`).join(", ");
}

function generateGradientStyle(type: GradientType, angle: number, stops: ColorStop[]): string {
  const s = stopsStr(stops);
  if (type==="linear") return `linear-gradient(${angle}deg, ${s})`;
  if (type==="radial") return `radial-gradient(circle, ${s})`;
  return `conic-gradient(from ${angle}deg, ${s})`;
}

function generateCss(type: GradientType, angle: number, stops: ColorStop[]): string {
  return `background: ${generateGradientStyle(type, angle, stops)};`;
}

function generateTailwindClass(type: GradientType, angle: number, stops: ColorStop[]): string {
  const s = [...stops].sort((a,b)=>a.position-b.position).map(st=>`${st.color}_${st.position}%`).join(",");
  if (type==="linear") return `bg-[linear-gradient(${angle}deg,${s})]`;
  if (type==="radial") return `bg-[radial-gradient(circle,${s})]`;
  return `bg-[conic-gradient(from_${angle}deg,${s})]`;
}

function generateSvg(type: GradientType, angle: number, stops: ColorStop[]): string {
  const sorted = [...stops].sort((a,b)=>a.position-b.position);
  const stopTags = sorted.map(s=>`    <stop offset="${s.position}%" stop-color="${s.color}"/>`).join("\n");
  if (type==="radial") {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400">\n  <defs>\n    <radialGradient id="grad" cx="50%" cy="50%" r="50%">\n${stopTags}\n    </radialGradient>\n  </defs>\n  <rect width="100%" height="100%" fill="url(#grad)"/>\n</svg>`;
  }
  const rad=(angle*Math.PI)/180;
  const x2=+(0.5+0.5*Math.sin(rad)).toFixed(3), y2=+(0.5-0.5*Math.cos(rad)).toFixed(3);
  const x1=+(1-x2).toFixed(3), y1=+(1-y2).toFixed(3);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400">\n  <defs>\n    <linearGradient id="grad" x1="${(x1*100).toFixed(1)}%" y1="${(y1*100).toFixed(1)}%" x2="${(x2*100).toFixed(1)}%" y2="${(y2*100).toFixed(1)}%">\n${stopTags}\n    </linearGradient>\n  </defs>\n  <rect width="100%" height="100%" fill="url(#grad)"/>\n</svg>`;
}

function generateInline(type: GradientType, angle: number, stops: ColorStop[]): string {
  return `style={{ background: '${generateGradientStyle(type, angle, stops)}' }}`;
}

function presetToStyle(preset: PresetGradient): string {
  const s = preset.colors.map((c,i) => {
    const pos = preset.positions ? preset.positions[i] : Math.round((i/(preset.colors.length-1))*100);
    return `${c} ${pos}%`;
  });
  return `linear-gradient(135deg, ${s.join(", ")})`;
}

// ── Component ─────────────────────────────────────────────────────────────────

export function GradientGenerator() {
  const { saveGradient, getGradients, deleteGradient } = useGradientStorage();

  const [gradientType, setGradientType] = useState<GradientType>("linear");
  const [angle, setAngle] = useState(90);
  const [stops, setStops] = useState<ColorStop[]>([
    { color: "#667eea", position: 0, id: 1 },
    { color: "#764ba2", position: 100, id: 2 },
  ]);
  const [copied, setCopied] = useState<string | null>(null);
  const [exportTab, setExportTab] = useState<ExportTab>("css");

  const [apiGradients, setApiGradients] = useState<PresetGradient[]>([]);
  const [gradientPage, setGradientPage] = useState(1);
  const [loadingGradients, setLoadingGradients] = useState(false);
  const [hasMoreGradients, setHasMoreGradients] = useState(true);

  const [savedGradients, setSavedGradients] = useState<SavedGradient[]>([]);
  const [gradientsMounted, setGradientsMounted] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  const [previewPreset, setPreviewPreset] = useState<PresetGradient | null>(null);
  const [previewType, setPreviewType] = useState<GradientType>("linear");
  const [previewAngle, setPreviewAngle] = useState(135);
  const [previewStops, setPreviewStops] = useState<ColorStop[]>([]);
  const [previewCopied, setPreviewCopied] = useState(false);

  const [draggingId, setDraggingId] = useState<number | null>(null);
  const stopBarRef = useRef<HTMLDivElement>(null);
  const gradientLoaderRef = useRef<HTMLDivElement>(null);

  // ── Derived ───────────────────────────────────────────────────────────────

  const gradientStyle = generateGradientStyle(gradientType, angle, stops);
  const swatchColors = sampleGradientColors(stops, 12);
  const barStyle = `linear-gradient(to right, ${[...stops].sort((a,b)=>a.position-b.position).map(s=>`${s.color} ${s.position}%`).join(",")})`;

  const exportCode: Record<ExportTab, string> = {
    css: generateCss(gradientType, angle, stops),
    tailwind: generateTailwindClass(gradientType, angle, stops),
    svg: generateSvg(gradientType, angle, stops),
    inline: generateInline(gradientType, angle, stops),
  };

  // ── Stop bar drag ─────────────────────────────────────────────────────────

  function getBarPct(clientX: number): number {
    if (!stopBarRef.current) return 0;
    const rect = stopBarRef.current.getBoundingClientRect();
    return Math.round(Math.max(0, Math.min(100, ((clientX-rect.left)/rect.width)*100)));
  }

  function handleBarMarkerDown(e: React.PointerEvent, id: number) {
    e.stopPropagation();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    setDraggingId(id);
  }

  function handleBarPointerMove(e: React.PointerEvent) {
    if (draggingId === null) return;
    updateStop(draggingId, { position: getBarPct(e.clientX) });
  }

  function handleBarPointerUp() { setDraggingId(null); }

  function handleBarClick(e: React.MouseEvent) {
    if (draggingId !== null || stops.length >= 5) return;
    const color = RANDOM_COLORS[Math.floor(Math.random()*RANDOM_COLORS.length)];
    setStops(prev => [...prev, { color, position: getBarPct(e.clientX), id: nextId++ }]);
  }

  // ── Stop mutations ────────────────────────────────────────────────────────

  const updateStop = useCallback((id: number, updates: Partial<ColorStop>) => {
    setStops(prev => prev.map(s => s.id===id ? {...s,...updates} : s));
  }, []);

  const removeStop = useCallback((id: number) => {
    setStops(prev => prev.length<=2 ? prev : prev.filter(s => s.id!==id));
  }, []);

  const addStop = useCallback(() => {
    if (stops.length >= 5) return;
    setStops(prev => [...prev, {
      color: RANDOM_COLORS[Math.floor(Math.random()*RANDOM_COLORS.length)],
      position: 50, id: nextId++,
    }]);
  }, [stops.length]);

  const randomize = useCallback(() => {
    const count = Math.random()<0.5 ? 2 : 3;
    const sh = [...RANDOM_COLORS].sort(()=>Math.random()-0.5);
    setStops(Array.from({length:count},(_,i)=>({
      color: sh[i], position: Math.round((i/(count-1))*100), id: nextId++,
    })));
    setAngle(Math.floor(Math.random()*360));
  }, []);

  // ── Copy / Save ───────────────────────────────────────────────────────────

  const copy = useCallback(async (text: string) => {
    try { await navigator.clipboard.writeText(text); } catch {
      const t=document.createElement("textarea"); t.value=text;
      document.body.appendChild(t); t.select();
      document.execCommand("copy"); document.body.removeChild(t);
    }
    setCopied(text);
    setTimeout(()=>setCopied(c=>c===text?null:c), 2000);
  }, []);

  const handleSaveGradient = useCallback(async () => {
    const saved = await saveGradient({
      name: `${gradientType[0].toUpperCase()}${gradientType.slice(1)} ${angle}°`,
      css: exportCode.css,
      preview: gradientStyle,
    });
    setSavedGradients(prev=>[saved,...prev]);
    setSaveMessage("Saved!"); setTimeout(()=>setSaveMessage(null), 2000);
  }, [gradientType, angle, exportCode.css, gradientStyle, saveGradient]);

  const handleDeleteGradient = useCallback(async (id: string) => {
    await deleteGradient(id);
    setSavedGradients(prev=>prev.filter(g=>g.id!==id));
  }, [deleteGradient]);

  // ── Preset preview ────────────────────────────────────────────────────────

  const openPreview = useCallback((preset: PresetGradient) => {
    setPreviewType("linear"); setPreviewAngle(135);
    setPreviewStops(preset.colors.map((color,i)=>({
      color,
      position: preset.positions ? preset.positions[i] : Math.round((i/(preset.colors.length-1))*100),
      id: nextId++,
    })));
    setPreviewPreset(preset);
  }, []);

  const handleUsePreview = useCallback(() => {
    setGradientType(previewType); setAngle(previewAngle); setStops(previewStops);
    setPreviewPreset(null);
    window.scrollTo({top:0,behavior:"smooth"});
  }, [previewType, previewAngle, previewStops]);

  const handleCopyPreviewCss = useCallback(async () => {
    await navigator.clipboard.writeText(generateCss(previewType, previewAngle, previewStops));
    setPreviewCopied(true); setTimeout(()=>setPreviewCopied(false), 2000);
  }, [previewType, previewAngle, previewStops]);

  const updatePreviewStop = useCallback((id: number, updates: Partial<ColorStop>) => {
    setPreviewStops(prev=>prev.map(s=>s.id===id?{...s,...updates}:s));
  }, []);

  const removePreviewStop = useCallback((id: number) => {
    setPreviewStops(prev=>prev.length<=2?prev:prev.filter(s=>s.id!==id));
  }, []);

  const addPreviewStop = useCallback(() => {
    setPreviewStops(prev=>prev.length>=5?prev:[...prev,{
      color: RANDOM_COLORS[Math.floor(Math.random()*RANDOM_COLORS.length)],
      position: 50, id: nextId++,
    }]);
  }, []);

  const randomizePreview = useCallback(() => {
    const count=Math.random()<0.5?2:3;
    const sh=[...RANDOM_COLORS].sort(()=>Math.random()-0.5);
    setPreviewStops(Array.from({length:count},(_,i)=>({
      color: sh[i], position: Math.round((i/(count-1))*100), id: nextId++,
    })));
    setPreviewAngle(Math.floor(Math.random()*360));
  }, []);

  // ── API data ──────────────────────────────────────────────────────────────

  useEffect(()=>{
    getGradients().then(g=>{setSavedGradients(g);setGradientsMounted(true);});
  }, [getGradients]);

  const fetchGradients = useCallback(async (pageNum: number, append: boolean) => {
    setLoadingGradients(true);
    try {
      const res = await fetch(`/api/gradients?page=${pageNum}&limit=12`);
      const data = await res.json();
      const mapped: PresetGradient[] = data.gradients.map((g:{name:string;colors:string[];positions:number[]})=>({
        name: g.name, colors: g.colors, positions: g.positions,
      }));
      setApiGradients(prev=>append?[...prev,...mapped]:mapped);
      setHasMoreGradients(data.pagination.hasNext);
    } catch {/* ignore */} finally { setLoadingGradients(false); }
  }, []);

  useEffect(()=>{ fetchGradients(1,false); },[fetchGradients]);

  const loadMoreGradients = useCallback(()=>{
    if (!hasMoreGradients||loadingGradients) return;
    const next=gradientPage+1; setGradientPage(next); fetchGradients(next,true);
  },[hasMoreGradients,loadingGradients,gradientPage,fetchGradients]);

  useEffect(()=>{
    const loader=gradientLoaderRef.current; if (!loader) return;
    const obs=new IntersectionObserver(entries=>{if(entries[0].isIntersecting)loadMoreGradients();},{threshold:0.1});
    obs.observe(loader); return ()=>obs.disconnect();
  },[loadMoreGradients]);

  useEffect(()=>{
    if (!previewPreset) return;
    const fn=(e:KeyboardEvent)=>{if(e.key==="Escape")setPreviewPreset(null);};
    window.addEventListener("keydown",fn); return ()=>window.removeEventListener("keydown",fn);
  },[previewPreset]);

  const label = "text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1c1712]/45";
  const pill = (on: boolean) =>
    `rounded-full px-3.5 py-1.5 text-[13px] font-semibold capitalize transition ${
      on ? "bg-[#1c1712] text-white" : "bg-white text-[#1c1712]/60 ring-1 ring-black/[0.1] hover:text-[#1c1712] hover:ring-black/20"
    }`;
  const ghostBtn = "rounded-full px-3.5 py-1.5 text-[12px] font-semibold text-[#1c1712]/70 ring-1 ring-black/[0.12] transition hover:text-[#1c1712] hover:ring-black/25";
  const textInput = "rounded-lg px-2 py-1.5 font-mono text-[12px] font-semibold uppercase outline-none ring-1 ring-black/[0.12] transition focus:ring-black/30";
  const sortedStops = [...stops].sort((a, b) => a.position - b.position);

  // ─────────────────────────────────────────────────────────────────────────
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
            <span className="text-[#1c1712]/60">Gradient Generator</span>
          </nav>
          <h1 className="mt-8 text-[2.6rem] font-bold leading-[1.05] tracking-[-0.035em] sm:text-[3.5rem]">CSS Gradient Generator</h1>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="flex -space-x-1.5" aria-hidden="true">
              {sortedStops.map((st) => (
                <span key={st.id} className="h-5 w-5 rounded-full ring-2 ring-white" style={{ backgroundColor: st.color }} />
              ))}
            </span>
            <p className="text-[16px] text-[#1c1712]/55">
              <span className="font-semibold text-[#1c1712]/80">Linear, radial and conic gradients.</span> Drag the stops, tune the angle and copy CSS, Tailwind or SVG code.
            </p>
          </div>
        </section>

        {/* ── Preview + stop bar ── */}
        <section className="border-t border-black/[0.06]">
          <div className="w-full px-6 py-10 sm:px-8 lg:px-12">
            <div className="overflow-hidden rounded-2xl ring-1 ring-black/[0.07]">
              <div className="h-[260px] w-full sm:h-[320px]" style={{ background: gradientStyle }} />

              <div className="flex items-center justify-between border-t border-black/[0.06] px-4 py-2 text-[12px] text-[#1c1712]/45">
                <span>↔ Drag stops to reposition</span>
                {stops.length < 5 && <span>Click the bar to add a stop ({stops.length}/5)</span>}
              </div>

              <div
                ref={stopBarRef}
                className="relative h-11 cursor-crosshair select-none"
                style={{ background: barStyle }}
                onClick={handleBarClick}
                onPointerMove={handleBarPointerMove}
                onPointerUp={handleBarPointerUp}
              >
                {stops.map((stop) => (
                  <div
                    key={stop.id}
                    className="absolute top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 touch-none"
                    style={{ left: `${stop.position}%` }}
                    onPointerDown={(e) => handleBarMarkerDown(e, stop.id)}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div
                      className="flex h-7 w-7 cursor-grab items-center justify-center rounded-full border-[2.5px] border-white shadow-[0_2px_8px_rgba(0,0,0,0.45)] transition-transform hover:scale-110 active:scale-95 active:cursor-grabbing"
                      style={{ backgroundColor: stop.color }}
                    />
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3 border-t border-black/[0.06] px-5 py-3.5">
                <code className="min-w-0 flex-1 truncate font-mono text-[12px] text-[#1c1712]/55">{exportCode.css}</code>
                <div className="flex shrink-0 items-center gap-2">
                  {saveMessage && <span className="text-[12px] font-semibold text-emerald-600">{saveMessage}</span>}
                  <button onClick={handleSaveGradient} className={ghostBtn}>Save</button>
                  <button onClick={() => copy(exportCode.css)} className="rounded-full bg-[#1c1712] px-4 py-1.5 text-[12px] font-semibold text-white transition hover:bg-[#c2410c]">
                    {copied === exportCode.css ? "✓ Copied" : "Copy CSS"}
                  </button>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-2xl p-6 ring-1 ring-black/[0.07]">
                <p className={label}>Gradient type</p>
                <div role="tablist" aria-label="Gradient type" className="mt-3 flex flex-wrap gap-2">
                  {(["linear", "radial", "conic"] as GradientType[]).map((type) => (
                    <button key={type} role="tab" aria-selected={gradientType === type} onClick={() => setGradientType(type)} className={pill(gradientType === type)}>
                      {type}
                    </button>
                  ))}
                </div>

                {(gradientType === "linear" || gradientType === "conic") && (
                  <div className="mt-6">
                    <p className={label}>Direction</p>
                    <div className="mt-3 flex items-center gap-6">
                      <div className="grid grid-cols-3 gap-1.5">
                        {COMPASS.map(([a, arrow], i) =>
                          a === null ? (
                            <div key={i} className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1c1712]/[0.04]">
                              <span className="font-mono text-[10px] font-bold text-[#1c1712]/55">{angle}°</span>
                            </div>
                          ) : (
                            <button
                              key={i}
                              onClick={() => setAngle(a)}
                              aria-label={`Angle ${a} degrees`}
                              className={`h-9 w-9 rounded-lg text-[16px] transition ${
                                angle === a ? "bg-[#1c1712] text-white" : "bg-white text-[#1c1712]/60 ring-1 ring-black/[0.1] hover:text-[#1c1712]"
                              }`}
                            >
                              {arrow}
                            </button>
                          ),
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <input
                          type="range"
                          min={0}
                          max={360}
                          value={angle}
                          onChange={(e) => setAngle(Number(e.target.value))}
                          aria-label="Angle"
                          className="h-2 w-full cursor-pointer accent-[#1c1712]"
                        />
                        <p className="mt-1 font-mono text-[12px] text-[#1c1712]/50">{angle}°</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="rounded-2xl p-6 ring-1 ring-black/[0.07]">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className={label}>
                    Color stops <span className="ml-1 normal-case tracking-normal text-[#1c1712]/35">({stops.length}/5)</span>
                  </p>
                  <div className="flex gap-2">
                    <button onClick={randomize} className={ghostBtn}>🎲 Randomize</button>
                    {stops.length < 5 && <button onClick={addStop} className={ghostBtn}>+ Add</button>}
                  </div>
                </div>

                <div className="mt-4 space-y-3">
                  {sortedStops.map((stop) => (
                    <div key={stop.id} className="flex items-center gap-2.5">
                      <label className="relative h-9 w-9 shrink-0 cursor-pointer overflow-hidden rounded-lg ring-1 ring-black/10" style={{ backgroundColor: stop.color }}>
                        <input
                          type="color"
                          value={stop.color}
                          onChange={(e) => updateStop(stop.id, { color: e.target.value })}
                          aria-label="Stop color"
                          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                        />
                      </label>
                      <input
                        type="text"
                        value={stop.color}
                        maxLength={7}
                        onChange={(e) => { const v = e.target.value; if (/^#[0-9A-Fa-f]{0,6}$/.test(v)) updateStop(stop.id, { color: v }); }}
                        aria-label="Stop HEX"
                        className={`w-24 ${textInput}`}
                      />
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={stop.position}
                        onChange={(e) => updateStop(stop.id, { position: Number(e.target.value) })}
                        aria-label="Stop position"
                        className="h-2 min-w-0 flex-1 cursor-pointer accent-[#1c1712]"
                      />
                      <span className="w-9 shrink-0 text-right font-mono text-[12px] text-[#1c1712]/50">{stop.position}%</span>
                      {stops.length > 2 && (
                        <button
                          onClick={() => removeStop(stop.id)}
                          aria-label="Remove stop"
                          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[#1c1712]/40 transition hover:bg-[#1c1712]/[0.06] hover:text-[#1c1712]"
                        >
                          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Gradient swatches ── */}
        <section className="border-t border-black/[0.06]">
          <div className="w-full px-6 py-14 sm:px-8 lg:px-12">
            <h2 className="mb-5 flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#1c1712]/40">
              Colors along the gradient
              <span className="h-px flex-1 bg-black/[0.06]" />
            </h2>
            <SwatchStrip colors={swatchColors.map((c) => c.toUpperCase())} height="h-24" copied={copied} onCopy={copy} className="rounded-2xl ring-1 ring-black/[0.07]" />
            <p className="mt-3 text-[13px] text-[#1c1712]/45">12 evenly spaced samples. Hover for the HEX, click to copy.</p>
          </div>
        </section>

        {/* ── Export ── */}
        <section className="border-t border-black/[0.06]">
          <div className="w-full px-6 py-14 sm:px-8 lg:px-12">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#c2410c]">Export</p>
                <h2 className="mt-2 text-[1.75rem] font-semibold tracking-[-0.03em]">Use it in your project</h2>
              </div>
              <div role="tablist" aria-label="Export format" className="flex flex-wrap gap-2">
                {(["css", "tailwind", "svg", "inline"] as ExportTab[]).map((t) => (
                  <button key={t} role="tab" aria-selected={exportTab === t} onClick={() => setExportTab(t)} className={`${pill(exportTab === t)} uppercase`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div className="relative mt-6 rounded-2xl bg-[#F5F5F5] ring-1 ring-black/[0.07]">
              <pre className="max-h-60 overflow-auto whitespace-pre-wrap break-all px-5 py-5 pr-24 font-mono text-[12px] leading-relaxed text-[#1c1712]/75">{exportCode[exportTab]}</pre>
              <button
                onClick={() => copy(exportCode[exportTab])}
                className="absolute right-4 top-4 rounded-full bg-[#1c1712] px-3.5 py-1.5 text-[12px] font-semibold text-white transition hover:bg-[#c2410c]"
              >
                {copied === exportCode[exportTab] ? "✓ Copied" : "Copy"}
              </button>
            </div>
          </div>
        </section>

        {/* ── Saved gradients ── */}
        {gradientsMounted && savedGradients.length > 0 && (
          <section className="border-t border-black/[0.06]">
            <div className="w-full px-6 py-14 sm:px-8 lg:px-12">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#c2410c]">Yours</p>
              <h2 className="mt-2 text-[1.75rem] font-semibold tracking-[-0.03em]">Saved gradients</h2>
              <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                {savedGradients.map((g) => (
                  <div key={g.id} className="overflow-hidden rounded-2xl ring-1 ring-black/[0.07]">
                    <button className="block h-24 w-full transition hover:opacity-90" style={{ background: g.preview }} onClick={() => copy(g.css)} aria-label={`Copy CSS for ${g.name}`} />
                    <div className="p-3.5">
                      <p className="truncate text-[13px] font-semibold">{g.name}</p>
                      <div className="mt-2.5 flex gap-1.5">
                        <button onClick={() => copy(g.css)} className="flex-1 rounded-full py-1 text-[11px] font-semibold text-[#1c1712]/70 ring-1 ring-black/[0.12] transition hover:text-[#1c1712]">
                          {copied === g.css ? "✓" : "Copy CSS"}
                        </button>
                        <button onClick={() => handleDeleteGradient(g.id)} className="rounded-full px-2.5 py-1 text-[11px] font-semibold text-red-600 ring-1 ring-red-200 transition hover:bg-red-50">
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Preset gradients ── */}
        <section className="border-t border-black/[0.06]">
          <div className="w-full px-6 py-14 sm:px-8 lg:px-12">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#c2410c]">Presets</p>
            <h2 className="mt-2 text-[1.75rem] font-semibold tracking-[-0.03em]">Preset gradients</h2>
            <p className="mt-2 text-[15px] leading-7 text-[#1c1712]/55">Click one to preview and tweak it, then use it as your gradient.</p>
            <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
              {apiGradients.map((preset, i) => (
                <button
                  key={`${preset.name}-${i}`}
                  onClick={() => openPreview(preset)}
                  className="overflow-hidden rounded-2xl text-left ring-1 ring-black/[0.07] transition hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-18px_rgba(28,23,18,0.35)]"
                >
                  <div className="h-28 w-full" style={{ background: presetToStyle(preset) }} />
                  <div className="p-3.5">
                    <p className="truncate text-[14px] font-semibold">{preset.name}</p>
                    <p className="mt-0.5 truncate font-mono text-[11px] uppercase text-[#1c1712]/45">{preset.colors.map((c) => c.replace("#", "")).join(" · ")}</p>
                  </div>
                </button>
              ))}
            </div>
            {hasMoreGradients && (
              <div ref={gradientLoaderRef} className="flex justify-center py-10">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-black/10 border-t-black/40" />
              </div>
            )}
          </div>
        </section>

        <ToolPageSections config={toolPageContent.gradient} variant="new" />
      </main>

      {/* ── Preset preview modal ── */}
      {previewPreset && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${previewPreset.name} gradient preview`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
          onClick={() => setPreviewPreset(null)}
        >
          <div onClick={(e) => e.stopPropagation()} className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl ring-1 ring-black/[0.07]">
            <div className="h-52 w-full rounded-t-2xl sm:h-64" style={{ background: generateGradientStyle(previewType, previewAngle, previewStops) }} />

            <div className="p-6">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-[18px] font-semibold tracking-[-0.02em]">{previewPreset.name}</h2>
                <button
                  onClick={() => setPreviewPreset(null)}
                  aria-label="Close preview"
                  className="flex h-8 w-8 items-center justify-center rounded-full text-[#1c1712]/55 ring-1 ring-black/[0.12] transition hover:text-[#1c1712]"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <p className={label}>Type</p>
                  <div className="mt-2.5 flex flex-wrap gap-2">
                    {(["linear", "radial", "conic"] as GradientType[]).map((type) => (
                      <button key={type} onClick={() => setPreviewType(type)} className={pill(previewType === type)}>{type}</button>
                    ))}
                  </div>
                  {(previewType === "linear" || previewType === "conic") && (
                    <div className="mt-5">
                      <p className={label}>Direction</p>
                      <div className="mt-2.5 grid w-fit grid-cols-3 gap-1.5">
                        {COMPASS.map(([a, arrow], i) =>
                          a === null ? (
                            <div key={i} className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1c1712]/[0.04]">
                              <span className="font-mono text-[9px] font-bold text-[#1c1712]/55">{previewAngle}°</span>
                            </div>
                          ) : (
                            <button
                              key={i}
                              onClick={() => setPreviewAngle(a)}
                              aria-label={`Angle ${a} degrees`}
                              className={`h-8 w-8 rounded-lg text-[15px] transition ${
                                previewAngle === a ? "bg-[#1c1712] text-white" : "bg-white text-[#1c1712]/60 ring-1 ring-black/[0.1] hover:text-[#1c1712]"
                              }`}
                            >
                              {arrow}
                            </button>
                          ),
                        )}
                      </div>
                      <div className="mt-3 flex items-center gap-2">
                        <input type="range" min={0} max={360} value={previewAngle} onChange={(e) => setPreviewAngle(Number(e.target.value))} aria-label="Angle" className="h-2 flex-1 accent-[#1c1712]" />
                        <span className="w-9 text-right font-mono text-[11px] text-[#1c1712]/50">{previewAngle}°</span>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <p className={label}>Stops</p>
                    <div className="flex gap-1.5">
                      <button onClick={randomizePreview} className={ghostBtn}>Randomize</button>
                      {previewStops.length < 5 && <button onClick={addPreviewStop} className={ghostBtn}>+ Add</button>}
                    </div>
                  </div>
                  <div className="mt-3 space-y-2.5">
                    {previewStops.map((stop) => (
                      <div key={stop.id} className="flex items-center gap-2">
                        <label className="relative h-8 w-8 shrink-0 cursor-pointer overflow-hidden rounded-lg ring-1 ring-black/10" style={{ backgroundColor: stop.color }}>
                          <input type="color" value={stop.color} onChange={(e) => updatePreviewStop(stop.id, { color: e.target.value })} aria-label="Stop color" className="absolute inset-0 h-full w-full cursor-pointer opacity-0" />
                        </label>
                        <input
                          type="text"
                          value={stop.color}
                          maxLength={7}
                          onChange={(e) => { const v = e.target.value; if (/^#[0-9A-Fa-f]{0,6}$/.test(v)) updatePreviewStop(stop.id, { color: v }); }}
                          aria-label="Stop HEX"
                          className={`w-20 ${textInput} text-[11px]`}
                        />
                        <input type="range" min={0} max={100} value={stop.position} onChange={(e) => updatePreviewStop(stop.id, { position: Number(e.target.value) })} aria-label="Stop position" className="h-2 min-w-0 flex-1 accent-[#1c1712]" />
                        <span className="w-8 text-right font-mono text-[11px] text-[#1c1712]/45">{stop.position}%</span>
                        {previewStops.length > 2 && (
                          <button onClick={() => removePreviewStop(stop.id)} aria-label="Remove stop" className="flex h-6 w-6 items-center justify-center rounded-full text-[#1c1712]/40 hover:text-[#1c1712]">
                            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button onClick={handleUsePreview} className="flex-1 rounded-full bg-[#1c1712] py-2.5 text-[13px] font-semibold text-white transition hover:bg-[#c2410c]">
                  Use this gradient
                </button>
                <button onClick={handleCopyPreviewCss} className="rounded-full px-5 py-2.5 text-[13px] font-semibold text-[#1c1712]/70 ring-1 ring-black/[0.12] transition hover:text-[#1c1712] hover:ring-black/25">
                  {previewCopied ? "✓ Copied" : "Copy CSS"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
