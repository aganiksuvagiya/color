"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Header } from "../header";
import { generateFromPrompt, generateRandomPalette, getContrastText } from "@/lib/color-utils";
import { deletePalette, getSavedPalettes, savePalette, type SavedPalette } from "@/lib/storage";
import { encodePalette, decodePalette } from "@/lib/share-utils";
import type { Palette } from "@/lib/types";
import { PromptBar } from "./prompt-bar";
import { PaletteDisplay } from "./palette-display";
import { ExportPanel } from "./export-panel";
import { SavedPalettes } from "./saved-palettes";
import { AccessibilityPanel } from "./accessibility-panel";
import { UIPreview } from "./ui-preview";
import { GradientPanel } from "./gradient-panel";
import { ColorBlindPanel } from "./colorblind-panel";
import { ImageUpload } from "./image-upload";
import { HarmonyPicker } from "./harmony-picker";

const MAX_HISTORY = 30;

export function GeneratorPage() {
  const [palette, setPalette] = useState<Palette | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState<SavedPalette[]>([]);
  const [mounted, setMounted] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [shareMessage, setShareMessage] = useState<string | null>(null);
  const [lockedIndices, setLockedIndices] = useState<Set<number>>(new Set());
  const [lightMode, setLightMode] = useState(false);
  const [comparePalette, setComparePalette] = useState<Palette | null>(null);

  const historyRef = useRef<Palette[]>([]);
  const historyIndexRef = useRef(-1);

  useEffect(() => {
    const loadData = () => {
      setSaved(getSavedPalettes());
      setMounted(true);
      const params = new URLSearchParams(window.location.search);
      const shared = decodePalette(params);
      if (shared) {
        setPalette(shared);
        pushHistory(shared);
      }
    };
    loadData();
  }, []);

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
      const p = historyRef.current[historyIndexRef.current];
      setPalette(p);
      updateUrl(p);
    }
  }

  function redo() {
    if (historyIndexRef.current < historyRef.current.length - 1) {
      historyIndexRef.current++;
      const p = historyRef.current[historyIndexRef.current];
      setPalette(p);
      updateUrl(p);
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

  function handleGenerate(prompt: string) {
    setError(null);
    setAndTrack(generateFromPrompt(prompt));
  }

  function handleRandom() {
    setError(null);
    if (!palette || lockedIndices.size === 0) {
      setAndTrack(generateRandomPalette());
      return;
    }
    const newPalette = generateRandomPalette();
    const merged: Palette = {
      label: newPalette.label,
      colors: newPalette.colors.map((c, i) => lockedIndices.has(i) ? palette.colors[i] : c),
    };
    setAndTrack(merged);
  }

  function handlePaletteSet(p: Palette) {
    setError(null);
    setAndTrack(p);
  }

  function handleColorChange(index: number, hex: string) {
    if (!palette) return;
    const updated = { ...palette, colors: palette.colors.map((c, i) =>
      i === index ? { ...c, hex, text: getContrastText(hex) } : c
    )};
    setPalette(updated);
    updateUrl(updated);
  }

  function handleToggleLock(index: number) {
    setLockedIndices((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index); else next.add(index);
      return next;
    });
  }

  function handleSave() {
    if (!palette) return;
    savePalette(palette);
    setSaved(getSavedPalettes());
    setSaveMessage("Saved!");
    setTimeout(() => setSaveMessage(null), 2000);
  }

  async function handleShare() {
    if (!palette) return;
    const url = `${window.location.origin}/generator${encodePalette(palette)}`;
    await navigator.clipboard.writeText(url);
    setShareMessage("Link copied!");
    setTimeout(() => setShareMessage(null), 2000);
  }

  function handleLoad(p: Palette) {
    const loaded = { label: p.label, colors: p.colors };
    setAndTrack(loaded);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleDelete(id: string) {
    deletePalette(id);
    setSaved(getSavedPalettes());
  }

  function handleCompare() {
    if (!palette) return;
    setComparePalette(comparePalette ? null : palette);
  }

  const bg = lightMode ? "bg-[#f5f3f0] text-[#1a1a1a]" : "bg-[#160b05] text-white";
  const cardBg = lightMode ? "border-black/8 bg-black/5" : "border-white/10 bg-white/5";
  const textMuted = lightMode ? "text-black/50" : "text-white/50";
  const textFaint = lightMode ? "text-black/30" : "text-white/30";

  return (
    <main className={`relative min-h-screen ${bg}`}>
      {!lightMode && (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(0,0,0,0.95),transparent_18%),radial-gradient(circle_at_88%_0%,rgba(255,106,44,0.2),transparent_30%),linear-gradient(135deg,#1a0e06_0%,#160b05_50%,#1a0e06_100%)]" />
          <div className="noise absolute inset-0 opacity-20" />
        </>
      )}

      <Header />

      <div className="relative mx-auto max-w-5xl px-4 pb-20 pt-24 sm:px-6 sm:pt-40">

        <div className="mb-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`text-4xl font-bold tracking-tight sm:text-5xl ${lightMode ? "text-black" : "text-white"}`}
          >
            Generate your palette
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`mx-auto mt-4 max-w-2xl text-lg ${textMuted}`}
          >
            Describe a mood, brand, or industry and get a production-ready color system.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`mt-2 text-[11px] ${textFaint}`}
          >
            Space/R = random · S = save · C = share · ⌘Z = undo · ⌘⇧Z = redo
          </motion.p>
        </div>

        <div className="space-y-4">
          <PromptBar onGenerate={handleGenerate} onRandom={handleRandom} isLoading={false} />

          <div className="grid gap-3 sm:grid-cols-2">
            <ImageUpload onExtract={handlePaletteSet} />
            <HarmonyPicker onGenerate={handlePaletteSet} />
          </div>

          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2.5 text-center text-sm text-red-400"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {palette && (
              <motion.div
                key={palette.colors.map(c => c.hex).join("")}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <PaletteDisplay
                  palette={palette}
                  lockedIndices={lockedIndices}
                  onColorChange={handleColorChange}
                  onToggleLock={handleToggleLock}
                />

                {comparePalette && comparePalette !== palette && (
                  <div className={`rounded-2xl border p-4 ${cardBg}`}>
                    <p className={`mb-2 text-xs font-medium ${textMuted}`}>Comparing with: {comparePalette.label}</p>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className={`mb-1 text-[10px] ${textFaint}`}>Current</p>
                        <div className="flex gap-0.5">
                          {palette.colors.map((c, i) => (
                            <div key={i} className="h-10 flex-1 first:rounded-l-lg last:rounded-r-lg" style={{ backgroundColor: c.hex }} />
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className={`mb-1 text-[10px] ${textFaint}`}>Saved snapshot</p>
                        <div className="flex gap-0.5">
                          {comparePalette.colors.map((c, i) => (
                            <div key={i} className="h-10 flex-1 first:rounded-l-lg last:rounded-r-lg" style={{ backgroundColor: c.hex }} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-center gap-2">
                  <button onClick={undo} className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-medium text-white/50 transition-all hover:border-white/20 hover:bg-white/10 hover:text-white/70">↩ Undo</button>
                  <button onClick={redo} className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-medium text-white/50 transition-all hover:border-white/20 hover:bg-white/10 hover:text-white/70">↪ Redo</button>
                  <button onClick={handleSave} className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-xs font-medium text-white/50 transition-all hover:border-white/20 hover:bg-white/10 hover:text-white/70">
                    <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" /><path d="M17 21v-8H7v8M7 3v5h8" /></svg>
                    Save
                  </button>
                  <button onClick={handleShare} className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-xs font-medium text-white/50 transition-all hover:border-white/20 hover:bg-white/10 hover:text-white/70">
                    <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" /></svg>
                    Share
                  </button>
                  <button onClick={handleCompare} className="rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-xs font-medium text-white/50 transition-all hover:border-white/20 hover:bg-white/10 hover:text-white/70">
                    {comparePalette ? "✕ Close Compare" : "⇔ Compare"}
                  </button>
                  <AnimatePresence>
                    {(saveMessage || shareMessage) && (
                      <motion.span initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="rounded-lg bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-400">
                        {saveMessage || shareMessage}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>

                <AccessibilityPanel palette={palette} />
                <UIPreview palette={palette} />
                <ColorBlindPanel palette={palette} />
                <GradientPanel palette={palette} />
                <ExportPanel palette={palette} />
              </motion.div>
            )}
          </AnimatePresence>

          {mounted && (
            <SavedPalettes palettes={saved} onLoad={handleLoad} onDelete={handleDelete} />
          )}
        </div>
      </div>
    </main>
  );
}
