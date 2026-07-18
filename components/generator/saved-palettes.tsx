"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { Palette } from "@/lib/types";
import type { SavedPalette } from "@/lib/storage";

type Props = {
  palettes: SavedPalette[];
  onLoad: (palette: Palette) => void;
  onDelete: (id: string) => void;
};

export function SavedPalettes({ palettes, onLoad, onDelete }: Props) {
  if (palettes.length === 0) {
    return (
      <div className="rounded-2xl border border-white/8 bg-white/3 p-8 text-center backdrop-blur-xl">
        <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/5">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" className="text-white/20">
            <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" />
            <path d="M17 21v-8H7v8M7 3v5h8" />
          </svg>
        </div>
        <p className="text-sm text-white/25">No saved palettes yet. Generate one and hit Save.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-white/8">
          <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="text-white/40">
            <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" />
          </svg>
        </div>
        <p className="text-sm font-medium text-white/50">Saved palettes ({palettes.length})</p>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <AnimatePresence>
          {palettes.map((p) => (
            <motion.div
              key={p.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="group rounded-2xl border border-white/10 bg-gradient-to-b from-white/8 to-white/3 p-4 shadow-lg shadow-black/10 backdrop-blur-xl transition-colors hover:border-white/15"
            >
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs font-semibold text-white/70">{p.label}</p>
                <p className="text-[10px] text-white/20">
                  {new Date(p.savedAt).toLocaleDateString()}
                </p>
              </div>

              <div className="mb-4 flex gap-1 overflow-hidden rounded-xl">
                {p.colors.map((c, i) => (
                  <div
                    key={i}
                    className="h-10 flex-1 transition-transform hover:scale-y-110"
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => onLoad(p)}
                  className="flex-1 rounded-xl bg-white/8 px-3 py-2 text-xs font-medium text-white/60 transition-all hover:bg-white/14 hover:text-white/80"
                >
                  Load
                </button>
                <button
                  onClick={() => onDelete(p.id)}
                  className="rounded-xl bg-white/5 px-3 py-2 text-xs font-medium text-red-400/50 transition-all hover:bg-red-500/10 hover:text-red-400"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
