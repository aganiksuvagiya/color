"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import { ColorPicker } from "./color-picker";
import type { PaletteColor } from "@/lib/types";

type Props = {
  color: PaletteColor;
  index: number;
  total: number;
  locked: boolean;
  dragging: boolean;
  dragOver: boolean;
  displayFormat: "HEX" | "RGB" | "HSL";
  animDelay: number;
  onColorChange: (hex: string) => void;
  onToggleLock: () => void;
  onDelete: () => void;
  onRename: (name: string) => void;
  onDragStart: () => void;
  onDragOverIndex: (index: number) => void;
  onDragEnd: () => void;
};

function formatColor(hex: string, format: "HEX" | "RGB" | "HSL"): string {
  if (format === "HEX") return hex.toUpperCase();
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  if (format === "RGB") return `${r}, ${g}, ${b}`;
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  let h = 0, s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === rn) h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6;
    else if (max === gn) h = ((bn - rn) / d + 2) / 6;
    else h = ((rn - gn) / d + 4) / 6;
  }
  return `${Math.round(h * 360)}°, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%`;
}

function contrastBadge(hex: string, textIsLight: boolean): "AAA" | "AA" | null {
  const toLinear = (c: number) => c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const bgL = 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
  const txtL = textIsLight ? 1 : 0;
  const [l1, l2] = bgL > txtL ? [bgL, txtL] : [txtL, bgL];
  const ratio = (l1 + 0.05) / (l2 + 0.05);
  if (ratio >= 7) return "AAA";
  if (ratio >= 4.5) return "AA";
  return null;
}

export function ColorCard({
  color, index, total, locked, dragging, dragOver, displayFormat, animDelay,
  onColorChange, onToggleLock, onDelete, onRename,
  onDragStart, onDragOverIndex, onDragEnd,
}: Props) {
  const [pickerOpen, setPickerOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [nameValue, setNameValue] = useState(color.name);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const isLight = color.text === "dark";
  const fgStrong = isLight ? "rgba(0,0,0,0.82)" : "rgba(255,255,255,0.90)";
  const fgMid = isLight ? "rgba(0,0,0,0.50)" : "rgba(255,255,255,0.50)";
  const iconCls = `flex h-10 w-10 items-center justify-center rounded-2xl transition-all duration-150 active:scale-95 ${
    isLight
      ? "text-black/45 hover:bg-black/12 hover:text-black/80"
      : "text-white/45 hover:bg-white/12 hover:text-white/85"
  }`;

  const badge = contrastBadge(color.hex, !isLight);

  async function copy() {
    try { await navigator.clipboard.writeText(color.hex.toUpperCase()); }
    catch {
      const ta = document.createElement("textarea");
      ta.value = color.hex.toUpperCase();
      document.body.appendChild(ta); ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  function startEdit() {
    setNameValue(color.name);
    setEditingName(true);
    setTimeout(() => nameInputRef.current?.select(), 10);
  }

  function commitEdit() {
    const trimmed = nameValue.trim();
    if (trimmed && trimmed !== color.name) onRename(trimmed);
    setEditingName(false);
  }

  return (
    <motion.div
      data-card-index={index}
      className="group relative flex min-h-[80px] flex-1 flex-col overflow-hidden sm:min-h-0"
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: animDelay, ease: [0.22, 1, 0.36, 1] }}
      style={{
        outline: dragOver ? "3px solid rgba(255,255,255,0.55)" : undefined,
        outlineOffset: "-3px",
      }}
    >
      {/* Background color */}
      <motion.div
        className="absolute inset-0"
        animate={{ backgroundColor: color.hex, opacity: dragging ? 0.35 : 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Bottom gradient for readability */}
      <div
        className="absolute inset-x-0 bottom-0 h-32 z-10"
        style={{
          background: isLight
            ? "linear-gradient(to top, rgba(255,255,255,0.22), transparent)"
            : "linear-gradient(to top, rgba(0,0,0,0.28), transparent)",
        }}
      />

      {/* Lock indicator */}
      {locked && (
        <div
          className="absolute right-3 top-3 z-20 rounded-xl p-1.5"
          style={{ background: isLight ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.12)" }}
        >
          <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" style={{ color: fgMid }}>
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0110 0v4" />
          </svg>
        </div>
      )}

      {/* Center hover actions */}
      <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto">
        <div className="flex flex-row sm:flex-col gap-1">
          {/* Drag */}
          <button
            className={`${iconCls} cursor-grab active:cursor-grabbing`}
            aria-label="Drag to reorder"
            style={{ touchAction: "none" }}
            onPointerDown={(e) => {
              try { e.currentTarget.setPointerCapture(e.pointerId); } catch {}
              onDragStart();
            }}
            onPointerMove={(e) => {
              const el = document.elementFromPoint(e.clientX, e.clientY)?.closest<HTMLElement>("[data-card-index]");
              if (el) onDragOverIndex(Number(el.dataset.cardIndex));
            }}
            onPointerUp={(e) => {
              try { e.currentTarget.releasePointerCapture(e.pointerId); } catch {}
              onDragEnd();
            }}
            onPointerCancel={(e) => {
              try { e.currentTarget.releasePointerCapture(e.pointerId); } catch {}
              onDragEnd();
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="9" cy="5" r="1.5" /><circle cx="15" cy="5" r="1.5" />
              <circle cx="9" cy="12" r="1.5" /><circle cx="15" cy="12" r="1.5" />
              <circle cx="9" cy="19" r="1.5" /><circle cx="15" cy="19" r="1.5" />
            </svg>
          </button>

          {/* Lock / unlock */}
          <button className={iconCls} onClick={onToggleLock} aria-label={locked ? "Unlock" : "Lock"}>
            <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              {locked
                ? <><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></>
                : <><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 019.9-1" /></>
              }
            </svg>
          </button>

          {/* Edit color */}
          <button className={iconCls} onClick={() => setPickerOpen(true)} aria-label="Edit color">
            <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="M12 22a7 7 0 007-7c0-2-1-3.9-2.5-5.6L12 4l-4.5 5.4C6 11.1 5 13 5 15a7 7 0 007 7z" />
            </svg>
          </button>

          {/* Copy */}
          <button className={iconCls} onClick={copy} aria-label="Copy">
            {copied
              ? <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
              : <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></svg>
            }
          </button>

          {/* Delete */}
          {total > 2 && (
            <button className={iconCls} onClick={onDelete} aria-label="Delete color">
              <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                <path d="M10 11v6M14 11v6M9 6V4h6v2" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Bottom: name + color value + contrast badge */}
      <div className="absolute bottom-0 left-0 right-0 z-20 px-2 pb-3 sm:px-4 sm:pb-6">
        {/* Contrast badge */}
        {badge && (
          <div className="mb-2">
            <span
              className="rounded-md px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider"
              style={{
                background: isLight ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.14)",
                color: badge === "AAA"
                  ? (isLight ? "rgba(0,0,0,0.65)" : "rgba(255,255,255,0.75)")
                  : (isLight ? "rgba(0,0,0,0.55)" : "rgba(255,255,255,0.55)"),
              }}
            >
              {badge}
            </span>
          </div>
        )}

        {/* Editable color name */}
        {editingName ? (
          <input
            ref={nameInputRef}
            autoFocus
            value={nameValue}
            onChange={(e) => setNameValue(e.target.value)}
            onBlur={commitEdit}
            onKeyDown={(e) => {
              if (e.key === "Enter") commitEdit();
              if (e.key === "Escape") setEditingName(false);
            }}
            className="mb-0.5 w-full truncate bg-transparent text-sm font-bold tracking-[-0.01em] outline-none"
            style={{ color: fgStrong }}
            maxLength={24}
          />
        ) : (
          <p
            className="mb-0.5 cursor-text truncate text-sm font-bold tracking-[-0.01em] transition-opacity hover:opacity-70"
            style={{ color: fgStrong }}
            onClick={startEdit}
            title="Click to rename"
          >
            {color.name}
          </p>
        )}

        <p className="font-mono text-[11px] uppercase" style={{ color: fgMid }}>
          {formatColor(color.hex, displayFormat)}
        </p>
      </div>

      <AnimatePresence>
        {pickerOpen && (
          <ColorPicker hex={color.hex} onChange={onColorChange} onClose={() => setPickerOpen(false)} cardIndex={index} cardTotal={total} />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
