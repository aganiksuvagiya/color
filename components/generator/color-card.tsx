"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ColorPicker } from "./color-picker";
import type { PaletteColor } from "@/lib/types";

type Props = {
  color: PaletteColor;
  index: number;
  total: number;
  locked: boolean;
  dragging: boolean;
  dragOver: boolean;
  onColorChange: (hex: string) => void;
  onToggleLock: () => void;
  onDragStart: () => void;
  onDragOverIndex: (index: number) => void;
  onDragEnd: () => void;
};

export function ColorCard({ color, index, total, locked, dragging, dragOver, onColorChange, onToggleLock, onDragStart, onDragOverIndex, onDragEnd }: Props) {
  const [pickerOpen, setPickerOpen] = useState(false);

  const isFirst = index === 0;
  const isLast = index === total - 1;
  const radius = `${isFirst ? "12px" : "0"} ${isLast ? "12px" : "0"} ${isLast ? "12px" : "0"} ${isFirst ? "12px" : "0"}`;

  function handlePointerDown(e: React.PointerEvent<HTMLSpanElement>) {
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // pointer already released or invalid — safe to ignore
    }
    onDragStart();
  }

  function handlePointerMove(e: React.PointerEvent<HTMLSpanElement>) {
    const target = document.elementFromPoint(e.clientX, e.clientY);
    const cardEl = target?.closest<HTMLElement>("[data-card-index]");
    if (cardEl) onDragOverIndex(Number(cardEl.dataset.cardIndex));
  }

  function handlePointerUp(e: React.PointerEvent<HTMLSpanElement>) {
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // already released — safe to ignore
    }
    onDragEnd();
  }

  return (
    <div data-card-index={index}>
    <motion.div
      layout
      animate={{ backgroundColor: color.hex, opacity: dragging ? 0.4 : 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`relative flex min-h-[320px] cursor-pointer flex-col justify-between p-5 sm:min-h-[380px] ${
        dragOver ? "ring-2 ring-white/60 ring-inset" : ""
      }`}
      style={{ borderRadius: radius }}
      onClick={() => setPickerOpen(!pickerOpen)}
    >
      <div>
        <div className="flex items-center justify-between">
          <p className={`text-[11px] font-medium uppercase tracking-wider ${color.text === "light" ? "text-white/40" : "text-black/35"}`}>
            {color.role}
          </p>
          <div className="flex items-center gap-1">
            <span
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              onClick={(e) => e.stopPropagation()}
              style={{ touchAction: "none" }}
              className={`cursor-grab select-none rounded-md p-1 active:cursor-grabbing ${color.text === "light" ? "text-white/25" : "text-black/20"}`}
              aria-label="Drag to reorder"
            >
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="6" r="1.2" /><circle cx="15" cy="6" r="1.2" />
                <circle cx="9" cy="12" r="1.2" /><circle cx="15" cy="12" r="1.2" />
                <circle cx="9" cy="18" r="1.2" /><circle cx="15" cy="18" r="1.2" />
              </svg>
            </span>
            <button
              onClick={(e) => { e.stopPropagation(); onToggleLock(); }}
              className={`rounded-md p-1 transition-colors ${locked ? (color.text === "light" ? "bg-white/20 text-white" : "bg-black/15 text-black/70") : (color.text === "light" ? "text-white/25 hover:text-white/50" : "text-black/20 hover:text-black/40")}`}
            >
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                {locked ? (
                  <><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></>
                ) : (
                  <><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 019.9-1" /></>
                )}
              </svg>
            </button>
          </div>
        </div>
        <p className={`mt-1 text-base font-semibold tracking-[-0.02em] ${color.text === "light" ? "text-white/90" : "text-black/75"}`}>
          {color.name}
        </p>
      </div>

      <p className={`font-mono text-xs ${color.text === "light" ? "text-white/50" : "text-black/40"}`}>
        {color.hex}
      </p>

      <AnimatePresence>
        {pickerOpen && (
          <ColorPicker
            hex={color.hex}
            onChange={onColorChange}
            onClose={() => setPickerOpen(false)}
          />
        )}
      </AnimatePresence>
    </motion.div>
    </div>
  );
}
