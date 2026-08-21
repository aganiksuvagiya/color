"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/header";
import { generateFromPrompt, generateRandomPalette, getContrastText } from "@/lib/color-utils";
import { withExtraColors } from "@/lib/shades";
import { type SavedPalette } from "@/lib/storage";
import { usePaletteStorage, PaletteLimitError } from "@/hooks/use-palette-storage";
import { encodePalette, decodePalette } from "@/lib/share-utils";
import { awardPointsClient } from "@/lib/award-points-client";
import type { Palette } from "@/lib/types";
import { PaletteDisplay } from "./palette-display";
import { ExportPanel } from "./export-panel";
import { SavedPalettes } from "./saved-palettes";
import { AccessibilityPanel } from "./accessibility-panel";
import { UIPreview } from "./ui-preview";
import { GradientPanel } from "./gradient-panel";
import { ColorBlindPanel } from "./colorblind-panel";
import { PaletteVariations } from "./palette-variations";
import { ImageUpload } from "./image-upload";
import { HarmonyPicker } from "./harmony-picker";
import { InsightsPanel } from "./insights-panel";

const MAX_HISTORY = 30;
const BASE_COLOR_COUNT = 5;
const MAX_COLOR_COUNT = 10;
const EMPTY_SUBSCRIBE = () => () => {};

type PanelTab = "accessibility" | "variations" | "preview" | "colorblind" | "gradient" | "export" | "saved" | "tools" | "insights";

const PANEL_LABELS: Record<PanelTab, string> = {
  accessibility: "Accessibility",
  variations: "Variations",
  preview: "UI Preview",
  colorblind: "Color Blind",
  gradient: "Gradient",
  export: "Export",
  saved: "Library",
  tools: "More Tools",
  insights: "Insights",
};

const MOOD_CHIPS = [
  { key: "luxury", label: "Luxury" },
  { key: "fintech", label: "Fintech" },
  { key: "editorial", label: "Editorial" },
  { key: "gaming", label: "Gaming" },
  { key: "skincare", label: "Skincare" },
  { key: "saas", label: "SaaS" },
  { key: "food", label: "Food" },
  { key: "health", label: "Health" },
  { key: "nature", label: "Nature" },
];

export function GeneratorPage() {
  const mounted = useSyncExternalStore(EMPTY_SUBSCRIBE, () => true, () => false);
  const [palette, setPalette] = useState<Palette | null>(null);
  const [savedVersion, setSavedVersion] = useState(0);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [shareMessage, setShareMessage] = useState<string | null>(null);
  const [lockedIndices, setLockedIndices] = useState<Set<number>>(new Set());
  const [activePanel, setActivePanel] = useState<PanelTab | null>(null);
  const [promptOpen, setPromptOpen] = useState(false);
  const [promptText, setPromptText] = useState("");
  const [viewFormat, setViewFormat] = useState<"HEX" | "RGB" | "HSL">("HEX");
  const [generationKey, setGenerationKey] = useState(0);
  const [editingLabel, setEditingLabel] = useState(false);
  const [labelValue, setLabelValue] = useState("");
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const labelInputRef = useRef<HTMLInputElement>(null);

  const historyRef = useRef<Palette[]>([]);
  const historyIndexRef = useRef(-1);
  const searchParams = useSearchParams();
  const initialPalette = useMemo(() => {
    if (!mounted) return null;
    return decodePalette(searchParams) ?? generateRandomPalette();
  }, [mounted, searchParams]);
  const activePalette = palette ?? initialPalette;

  const { savePalette, getPalettes, deletePalette } = usePaletteStorage();
  const [saved, setSaved] = useState<SavedPalette[]>([]);

  useEffect(() => {
    if (!mounted) return;
    getPalettes().then(setSaved);
  }, [mounted, savedVersion, getPalettes]);

  if (activePalette && historyIndexRef.current === -1) {
    historyRef.current = [activePalette];
    historyIndexRef.current = 0;
  }

  function pushHistory(p: Palette) {
    const idx = historyIndexRef.current;
    historyRef.current = historyRef.current.slice(0, idx + 1);
    historyRef.current.push(p);
    if (historyRef.current.length > MAX_HISTORY) historyRef.current.shift();
    historyIndexRef.current = historyRef.current.length - 1;
  }

  function undo() {
    if (historyIndexRef.current > 0) {
      historyIndexRef.current--;
      setPalette(historyRef.current[historyIndexRef.current]);
      updateUrl(historyRef.current[historyIndexRef.current]);
    }
  }

  function redo() {
    if (historyIndexRef.current < historyRef.current.length - 1) {
      historyIndexRef.current++;
      setPalette(historyRef.current[historyIndexRef.current]);
      updateUrl(historyRef.current[historyIndexRef.current]);
    }
  }

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if ((e.key === "r" || e.key === " ") && !e.metaKey && !e.ctrlKey) { e.preventDefault(); handleRandom(); }
      if (e.key === "s" && !e.metaKey && !e.ctrlKey) { e.preventDefault(); handleSave(); }
      if (e.key === "c" && !e.metaKey && !e.ctrlKey) { handleShare(); }
      if (e.key === "z" && (e.metaKey || e.ctrlKey) && !e.shiftKey) { e.preventDefault(); undo(); }
      if (e.key === "z" && (e.metaKey || e.ctrlKey) && e.shiftKey) { e.preventDefault(); redo(); }
      if (e.key === "Escape") { setPromptOpen(false); setActivePanel(null); setEditingLabel(false); setShortcutsOpen(false); }
      if (e.key === "?") { setShortcutsOpen(prev => !prev); }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  function updateUrl(p: Palette) {
    const qs = encodePalette(p);
    window.history.replaceState(null, "", `/generator${qs}`);
  }

  function setAndTrack(p: Palette) {
    setPalette(p);
    pushHistory(p);
    updateUrl(p);
  }

  function freshGeneration(p: Palette) {
    setAndTrack(p);
    setGenerationKey(k => k + 1);
  }

  function handleGenerate(prompt: string) {
    const count = activePalette?.colors.length ?? BASE_COLOR_COUNT;
    freshGeneration(withExtraColors(generateFromPrompt(prompt), count - BASE_COLOR_COUNT));
    setPromptOpen(false);
    setPromptText("");
  }

  function handleRandom() {
    const count = activePalette?.colors.length ?? BASE_COLOR_COUNT;
    if (!activePalette || lockedIndices.size === 0) {
      freshGeneration(withExtraColors(generateRandomPalette(), count - BASE_COLOR_COUNT));
      return;
    }
    const next = generateRandomPalette();
    const merged: Palette = {
      label: next.label,
      colors: next.colors.map((c, i) => lockedIndices.has(i) ? activePalette.colors[i] : c),
    };
    freshGeneration(withExtraColors(merged, count - BASE_COLOR_COUNT));
  }

  function handleAddColor() {
    if (!activePalette || activePalette.colors.length >= MAX_COLOR_COUNT) return;
    setAndTrack(withExtraColors(activePalette, 1));
  }

  function handleDeleteColor(index: number) {
    if (!activePalette || activePalette.colors.length <= 2) return;
    const colors = activePalette.colors.filter((_, i) => i !== index);
    setLockedIndices(prev => {
      const next = new Set<number>();
      prev.forEach(i => { if (i < index) next.add(i); else if (i > index) next.add(i - 1); });
      return next;
    });
    setAndTrack({ ...activePalette, colors });
  }

  function handleColorChange(index: number, hex: string) {
    if (!activePalette) return;
    const updated = {
      ...activePalette,
      colors: activePalette.colors.map((c, i) =>
        i === index ? { ...c, hex, text: getContrastText(hex) } : c
      ),
    };
    setPalette(updated);
    updateUrl(updated);
  }

  function handleRenameColor(index: number, name: string) {
    if (!activePalette) return;
    const updated = { ...activePalette, colors: activePalette.colors.map((c, i) => i === index ? { ...c, name } : c) };
    setPalette(updated);
    updateUrl(updated);
  }

  function handleRenamePalette(name: string) {
    if (!activePalette || !name.trim()) return;
    const updated = { ...activePalette, label: name.trim() };
    setPalette(updated);
    updateUrl(updated);
  }

  function handleToggleLock(index: number) {
    setLockedIndices(prev => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index); else next.add(index);
      return next;
    });
  }

  function handleReorderColors(from: number, to: number) {
    if (!activePalette || from === to) return;
    const colors = [...activePalette.colors];
    const [moved] = colors.splice(from, 1);
    colors.splice(to, 0, moved);
    const lockFlags = activePalette.colors.map((_, i) => lockedIndices.has(i));
    const [movedLock] = lockFlags.splice(from, 1);
    lockFlags.splice(to, 0, movedLock);
    const nextLocked = new Set<number>();
    lockFlags.forEach((locked, i) => { if (locked) nextLocked.add(i); });
    setLockedIndices(nextLocked);
    setAndTrack({ ...activePalette, colors });
  }

  async function handleSave() {
    if (!activePalette) return;
    let message = "Saved!";
    try {
      await savePalette(activePalette);
      setSavedVersion(version => version + 1);
    } catch (err) {
      message =
        err instanceof PaletteLimitError
          ? `Free limit reached (${err.points}/${err.required} pts to unlock unlimited saves)`
          : "Couldn't save — try again.";
    }
    setSaveMessage(message);
    setTimeout(() => setSaveMessage(null), 3000);
  }

  async function handleShare() {
    if (!activePalette) return;
    const url = `${window.location.origin}/generator${encodePalette(activePalette)}`;
    await navigator.clipboard.writeText(url);
    setShareMessage("Link copied!");
    awardPointsClient("SHARE_PALETTE");
    setTimeout(() => setShareMessage(null), 2000);
  }

  async function handleCopyAll() {
    if (!activePalette) return;
    const text = activePalette.colors.map(c => c.hex.toUpperCase()).join(", ");
    await navigator.clipboard.writeText(text);
    setShareMessage("All hex copied!");
    setTimeout(() => setShareMessage(null), 2000);
  }

  function handleLoad(p: Palette) {
    freshGeneration({ label: p.label, colors: p.colors });
    setActivePanel(null);
  }

  async function handleDeleteSaved(id: string) {
    await deletePalette(id);
    setSavedVersion(version => version + 1);
  }

  function togglePanel(panel: PanelTab) {
    setActivePanel(prev => prev === panel ? null : panel);
  }

  function startEditLabel() {
    setLabelValue(activePalette?.label ?? "");
    setEditingLabel(true);
    setTimeout(() => labelInputRef.current?.select(), 10);
  }

  function commitLabel() {
    handleRenamePalette(labelValue);
    setEditingLabel(false);
  }

  const tbBtn = (active = false) =>
    `inline-flex items-center gap-1.5 rounded-full px-3.5 h-8 text-[11px] font-semibold whitespace-nowrap transition-all duration-150 ${
      active
        ? "bg-[#1c1712] text-white shadow-[0_2px_8px_rgba(28,23,18,0.18)]"
        : "text-[#1c1712]/50 hover:bg-[#1c1712]/7 hover:text-[#1c1712]"
    }`;

  const iconBtn = "flex h-8 w-8 items-center justify-center rounded-full text-[#1c1712]/38 transition-all duration-150 hover:bg-[#1c1712]/7 hover:text-[#1c1712]";

  return (
    <main className="flex h-screen flex-col overflow-hidden bg-[#faf7f2] text-[#1c1712]">
      <Header />

      {/* Palette swatches */}
      <div className="relative flex flex-1 overflow-hidden">
        {/* Loading */}
        <AnimatePresence>
          {!mounted && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-20 flex items-center justify-center bg-[#faf7f2]"
            >
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-black/10 border-t-black/40" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Swatches */}
        {activePalette && mounted && (
          <PaletteDisplay
            palette={activePalette}
            lockedIndices={lockedIndices}
            displayFormat={viewFormat}
            generationKey={generationKey}
            onColorChange={handleColorChange}
            onToggleLock={handleToggleLock}
            onReorder={handleReorderColors}
            onDelete={handleDeleteColor}
            onRename={handleRenameColor}
          />
        )}


        {/* Side panel - full-screen fixed overlay */}
        <AnimatePresence>
          {activePanel && activePalette && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-[60] bg-black/50"
                onClick={() => setActivePanel(null)}
              />
              {/* Panel */}
              <motion.div
                initial={{ x: 340, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 340, opacity: 0 }}
                transition={{ type: "spring", damping: 28, stiffness: 300 }}
                className="fixed bottom-0 right-0 top-0 z-[61] flex w-80 flex-col border-l border-black/[0.07] bg-white shadow-2xl"
              >
                <div className="flex shrink-0 items-center justify-between border-b border-black/[0.07] px-4 py-3">
                  <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#1c1712]/38">
                    {PANEL_LABELS[activePanel]}
                  </span>
                  <button
                    onClick={() => setActivePanel(null)}
                    className="flex h-7 w-7 items-center justify-center rounded-lg text-[#1c1712]/35 hover:bg-[#1c1712]/6 hover:text-[#1c1712]"
                  >
                    <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto p-4">
                  {activePanel === "accessibility" && <AccessibilityPanel palette={activePalette} />}
                  {activePanel === "variations" && <PaletteVariations palette={activePalette} />}
                  {activePanel === "preview" && <UIPreview palette={activePalette} />}
                  {activePanel === "colorblind" && <ColorBlindPanel palette={activePalette} />}
                  {activePanel === "gradient" && <GradientPanel palette={activePalette} />}
                  {activePanel === "export" && <ExportPanel palette={activePalette} />}
                  {activePanel === "saved" && mounted && (
                    <SavedPalettes palettes={saved} onLoad={handleLoad} onDelete={handleDeleteSaved} />
                  )}
                  {activePanel === "tools" && (
                    <div className="space-y-4">
                      <ImageUpload onExtract={(p) => { freshGeneration(p); }} />
                      <HarmonyPicker onGenerate={(p) => { freshGeneration(p); }} />
                    </div>
                  )}
                  {activePanel === "insights" && <InsightsPanel palette={activePalette} />}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* ── Mobile toolbar (< sm) - 2 rows ── */}
      <div className="flex sm:hidden shrink-0 flex-col border-t border-black/[0.07] bg-white">
        {/* Row 1: main actions */}
        <div className="flex h-12 items-center justify-around px-2 border-b border-black/[0.05]">
          <button onClick={undo} className={iconBtn} title="Undo"><svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M3 7v6h6" /><path d="M21 17a9 9 0 00-9-9 9 9 0 00-6 2.3L3 13" /></svg></button>
          <button onClick={redo} className={iconBtn} title="Redo"><svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M21 7v6h-6" /><path d="M3 17a9 9 0 019-9 9 9 0 016 2.3L21 13" /></svg></button>
          <div className="h-5 w-px bg-black/[0.08]" />
          <button onClick={handleRandom} className={`${iconBtn} gap-1.5 w-auto px-2`} title="Shuffle">
            <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><polyline points="16 3 21 3 21 8" /><line x1="4" y1="20" x2="21" y2="3" /><polyline points="21 16 21 21 16 21" /><line x1="15" y1="15" x2="21" y2="21" /><line x1="4" y1="4" x2="9" y2="9" /></svg>
            <span className="text-xs">Shuffle</span>
          </button>
          {activePalette && activePalette.colors.length < MAX_COLOR_COUNT && (
            <button onClick={handleAddColor} className={iconBtn} title="Add Color"><svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14" /></svg></button>
          )}
          <button onClick={() => setPromptOpen(p => !p)} className={`${iconBtn} gap-1.5 w-auto px-2 ${promptOpen ? "text-[#1c1712] bg-[#1c1712]/8" : ""}`} title="Generate">
            <svg width="13" height="13" fill="none" viewBox="0 0 24 24"><path d="M12 2l2.2 6.6L21 11l-6.8 2.4L12 20l-2.2-6.6L3 11l6.8-2.4z" fill="currentColor" /></svg>
            <span className="text-xs">Generate</span>
          </button>
          <div className="h-5 w-px bg-black/[0.08]" />
          <button onClick={handleSave} className="inline-flex h-9 items-center gap-1.5 rounded-xl bg-[#F15B2A] px-3 text-xs font-semibold text-white">
            <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" /><path d="M17 21v-8H7v8M7 3v5h8" /></svg>
            Save
          </button>
        </div>
        {/* Row 2: secondary */}
        <div className="flex h-10 items-center justify-around px-2">
          <button onClick={() => setViewFormat(f => f === "HEX" ? "RGB" : f === "RGB" ? "HSL" : "HEX")} className={`${iconBtn} text-[10px] font-bold w-auto px-2`}>{viewFormat}</button>
          <button onClick={() => togglePanel("insights")} className={`${iconBtn} text-[10px] font-bold w-auto px-2 ${activePanel === "insights" ? "text-[#1c1712] bg-[#1c1712]/8" : ""}`}>Info</button>
          <button onClick={() => togglePanel("accessibility")} className={`${iconBtn} text-[10px] font-bold w-auto px-2 ${activePanel === "accessibility" ? "text-[#1c1712] bg-[#1c1712]/8" : ""}`}>A11y</button>
          <button onClick={() => togglePanel("tools")} className={`${iconBtn} ${activePanel === "tools" ? "text-[#1c1712] bg-[#1c1712]/8" : ""}`} title="Tools"><svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" /></svg></button>
          <button onClick={() => togglePanel("export")} className={`${iconBtn} ${activePanel === "export" ? "text-[#1c1712] bg-[#1c1712]/8" : ""}`} title="Export"><svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg></button>
          <button onClick={() => togglePanel("saved")} className={`${iconBtn} ${activePanel === "saved" ? "text-[#1c1712] bg-[#1c1712]/8" : ""}`} title="Library"><svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" /></svg></button>
          <button onClick={handleShare} className={iconBtn} title="Share"><svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" /></svg></button>
        </div>
      </div>

      {/* ── Desktop toolbar (sm+) ── */}
      <div className="hidden sm:flex h-[52px] shrink-0 items-center gap-1.5 border-t border-black/[0.07] bg-white px-4 shadow-[0_-1px_0_rgba(28,23,18,0.04)]">

        {/* Left: undo/redo + palette name */}
        <div className="flex items-center gap-0.5">
          <button onClick={undo} className={iconBtn} title="Undo (⌘Z)">
            <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
              <path d="M3 7v6h6" /><path d="M21 17a9 9 0 00-9-9 9 9 0 00-6 2.3L3 13" />
            </svg>
          </button>
          <button onClick={redo} className={iconBtn} title="Redo (⌘⇧Z)">
            <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
              <path d="M21 7v6h-6" /><path d="M3 17a9 9 0 019-9 9 9 0 016 2.3L21 13" />
            </svg>
          </button>
        </div>

        <div className="mx-1 h-4 w-px bg-black/[0.08]" />

        {/* Palette name */}
        <div className="hidden lg:block">
          {editingLabel ? (
            <input
              ref={labelInputRef}
              autoFocus
              value={labelValue}
              onChange={(e) => setLabelValue(e.target.value)}
              onBlur={commitLabel}
              onKeyDown={(e) => {
                if (e.key === "Enter") commitLabel();
                if (e.key === "Escape") setEditingLabel(false);
              }}
              className="rounded-full bg-[#1c1712]/6 px-3 py-1 text-[11px] font-semibold text-[#1c1712] outline-none"
              style={{ width: Math.max(100, labelValue.length * 7) + "px" }}
              maxLength={40}
            />
          ) : (
            <button
              onClick={startEditLabel}
              className="max-w-[160px] truncate rounded-full px-3 py-1 text-[11px] font-semibold text-[#1c1712]/45 transition-all hover:bg-[#1c1712]/6 hover:text-[#1c1712]/75"
              title="Rename palette"
            >
              {activePalette?.label ?? ""}
            </button>
          )}
        </div>

        <div className="mx-1 hidden lg:block h-4 w-px bg-black/[0.08]" />

        {/* Center: primary actions pill group */}
        <div className="flex flex-1 items-center justify-center">
          <div className="flex items-center gap-0.5 rounded-full border border-black/[0.08] bg-[#faf7f2] p-1">
            <button onClick={handleRandom} className={tbBtn()} title="Shuffle (Space)">
              <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                <polyline points="16 3 21 3 21 8" />
                <line x1="4" y1="20" x2="21" y2="3" />
                <polyline points="21 16 21 21 16 21" />
                <line x1="15" y1="15" x2="21" y2="21" />
                <line x1="4" y1="4" x2="9" y2="9" />
              </svg>
              Shuffle
              <kbd className="hidden lg:inline rounded-md border border-black/[0.08] bg-white px-1 py-0.5 font-mono text-[8px] text-[#1c1712]/30">Space</kbd>
            </button>

            {activePalette && activePalette.colors.length < MAX_COLOR_COUNT && (
              <button onClick={handleAddColor} className={tbBtn()} title="Add a color">
                <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 5v14M5 12h14" />
                </svg>
                <span className="hidden lg:inline">Add Color</span>
              </button>
            )}

            <button onClick={() => setPromptOpen(p => !p)} className={tbBtn(promptOpen)} title="Generate with AI prompt">
              <svg width="11" height="11" fill="none" viewBox="0 0 24 24">
                <path d="M12 2l2.2 6.6L21 11l-6.8 2.4L12 20l-2.2-6.6L3 11l6.8-2.4z" fill="currentColor" />
              </svg>
              Generate
            </button>

            <button onClick={() => togglePanel("tools")} className={tbBtn(activePanel === "tools")} title="Image extract · Harmony">
              <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                <circle cx="12" cy="12" r="3" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
              Tools
            </button>
          </div>
        </div>

        {/* Right: secondary actions */}
        <div className="flex items-center gap-0.5">
          <button
            onClick={() => setViewFormat(f => f === "HEX" ? "RGB" : f === "RGB" ? "HSL" : "HEX")}
            className={`${tbBtn()} hidden md:inline-flex font-mono`}
            title="Toggle color format"
          >
            {viewFormat}
          </button>

          <div className="mx-1 hidden md:block h-4 w-px bg-black/[0.08]" />

          <button onClick={() => togglePanel("insights")} className={`${tbBtn(activePanel === "insights")} hidden md:inline-flex`}>
            <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
              <circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" />
            </svg>
            Insights
          </button>
          <button onClick={() => togglePanel("accessibility")} className={`${tbBtn(activePanel === "accessibility")} hidden lg:inline-flex`}>
            A11y
          </button>
          <button onClick={() => togglePanel("export")} className={`${tbBtn(activePanel === "export")} hidden md:inline-flex`}>
            <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Export
          </button>
          <button onClick={() => togglePanel("saved")} className={`${tbBtn(activePanel === "saved")} hidden lg:inline-flex`}>
            <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
              <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
            </svg>
            {saved.length > 0 ? `Library (${saved.length})` : "Library"}
          </button>

          <div className="mx-1 h-4 w-px bg-black/[0.08]" />

          {/* Copy all */}
          <button onClick={handleCopyAll} className={`${iconBtn} hidden lg:flex`} title="Copy all hex codes">
            <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="9" width="13" height="13" rx="2" />
              <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
            </svg>
          </button>

          {/* Save */}
          <button
            onClick={handleSave}
            className="inline-flex h-8 items-center gap-1.5 rounded-full px-4 text-[11px] font-semibold text-white shadow-[0_4px_14px_rgba(232,83,31,0.30)] transition-all hover:shadow-[0_6px_18px_rgba(232,83,31,0.38)] hover:scale-[1.02] active:scale-[0.98]"
            style={{ background: "linear-gradient(135deg, #ff7a45, #e8531f)" }}
            title="Save palette (S)"
          >
            <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
              <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" />
              <path d="M17 21v-8H7v8M7 3v5h8" />
            </svg>
            Save
          </button>

          {/* Share */}
          <button onClick={handleShare} className={`${iconBtn} hidden lg:flex`} title="Copy share link (C)">
            <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
              <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" />
            </svg>
          </button>

          {/* Toast */}
          <AnimatePresence>
            {(saveMessage || shareMessage) && (
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="rounded-xl border border-[#e8531f]/20 bg-[#e8531f]/8 px-3 py-1 text-xs font-medium text-[#e8531f]"
              >
                {saveMessage || shareMessage}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* AI Prompt modal */}
      <AnimatePresence>
        {promptOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-40 flex items-end justify-center px-4 pb-16"
            onClick={(e) => e.target === e.currentTarget && setPromptOpen(false)}
          >
            <motion.div
              initial={{ y: 32, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 32, opacity: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 340 }}
              className="w-full max-w-2xl overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-2xl"
            >
              {/* Input row */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (promptText.trim()) handleGenerate(promptText.trim());
                }}
                className="flex items-center gap-3 px-5 py-4"
              >
                <svg width="15" height="15" fill="none" viewBox="0 0 24 24" className="shrink-0 text-[#F97A45]">
                  <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" fill="currentColor" />
                </svg>
                <input
                  type="text"
                  autoFocus
                  value={promptText}
                  onChange={(e) => setPromptText(e.target.value)}
                  placeholder="Describe a mood, brand, or industry…"
                  className="flex-1 bg-transparent text-sm text-[#1c1712] outline-none placeholder:text-[#1c1712]/30"
                  maxLength={200}
                />
                <button
                  type="submit"
                  disabled={!promptText.trim()}
                  className="rounded-xl bg-[#F15B2A] px-5 py-2 text-xs font-semibold text-white transition-all hover:bg-[#F97A45] disabled:opacity-30"
                >
                  Generate
                </button>
                <button
                  type="button"
                  onClick={() => setPromptOpen(false)}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-[#1c1712]/35 hover:bg-[#1c1712]/6 hover:text-[#1c1712]"
                >
                  <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </form>

              {/* Mood chips */}
              <div className="flex flex-wrap gap-2 border-t border-black/[0.06] px-5 py-3">
                {MOOD_CHIPS.map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => handleGenerate(key)}
                    className="rounded-full border border-black/10 bg-[#faf7f2] px-3 py-1 text-xs font-medium text-[#1c1712]/55 transition-all hover:border-black/20 hover:bg-[#f0ebe4] hover:text-[#1c1712]"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Keyboard Shortcuts Modal */}
      <AnimatePresence>
        {shortcutsOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={() => setShortcutsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm rounded-2xl border border-black/[0.08] bg-white p-6 shadow-2xl mx-4"
            >
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-base font-semibold text-[#1c1712]">Keyboard Shortcuts</h2>
                <button onClick={() => setShortcutsOpen(false)} className="text-[#1c1712]/35 hover:text-[#1c1712]/70">
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="space-y-2.5">
                {[
                  { keys: ["Space", "R"], label: "Shuffle palette" },
                  { keys: ["S"], label: "Save palette" },
                  { keys: ["C"], label: "Copy share link" },
                  { keys: ["⌘Z"], label: "Undo" },
                  { keys: ["⌘⇧Z"], label: "Redo" },
                  { keys: ["Esc"], label: "Close panel / dialog" },
                  { keys: ["?"], label: "Show this guide" },
                ].map(({ keys, label }) => (
                  <div key={label} className="flex items-center justify-between">
                    <span className="text-sm text-[#1c1712]/55">{label}</span>
                    <div className="flex gap-1">
                      {keys.map((k) => (
                        <kbd key={k} className="rounded-md border border-black/10 bg-[#faf7f2] px-2 py-0.5 font-mono text-[11px] text-[#1c1712]/65">{k}</kbd>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-[11px] text-[#1c1712]/30 text-center">Press <kbd className="rounded border border-black/10 bg-[#faf7f2] px-1 font-mono text-[10px]">?</kbd> anytime to toggle</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
