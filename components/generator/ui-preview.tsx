"use client";

import { motion } from "framer-motion";
import type { Palette } from "@/lib/types";

type Props = { palette: Palette };

function getByRole(palette: Palette, role: string) {
  return palette.colors.find((c) => c.role === role)?.hex ?? "#666";
}

export function UIPreview({ palette }: Props) {
  const neutral = getByRole(palette, "neutral");
  const primary = getByRole(palette, "primary");
  const success = getByRole(palette, "success");
  const warning = getByRole(palette, "warning");
  const accent = getByRole(palette, "accent");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl"
    >
      <p className="mb-3 text-sm font-medium text-white/50">Live UI Preview</p>

      <div className="overflow-hidden rounded-xl border border-white/10" style={{ backgroundColor: neutral }}>
        <div className="flex items-center justify-between px-4 py-2.5" style={{ backgroundColor: primary }}>
          <span className="text-sm font-semibold text-white">Dashboard</span>
          <div className="flex gap-2">
            <div className="rounded-md px-3 py-1 text-xs font-medium text-white/80" style={{ backgroundColor: accent }}>Profile</div>
            <div className="rounded-md bg-white/20 px-3 py-1 text-xs text-white/70">Settings</div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-3">
          <div className="rounded-lg bg-white/10 p-3">
            <p className="text-[10px] uppercase tracking-wider text-white/40">Revenue</p>
            <p className="mt-1 text-lg font-bold text-white">$12,450</p>
            <div className="mt-2 flex items-center gap-1">
              <span className="rounded px-1.5 py-0.5 text-[10px] font-bold text-white" style={{ backgroundColor: success }}>+12%</span>
            </div>
          </div>
          <div className="rounded-lg bg-white/10 p-3">
            <p className="text-[10px] uppercase tracking-wider text-white/40">Users</p>
            <p className="mt-1 text-lg font-bold text-white">3,281</p>
            <div className="mt-2 flex items-center gap-1">
              <span className="rounded px-1.5 py-0.5 text-[10px] font-bold text-white" style={{ backgroundColor: accent }}>Active</span>
            </div>
          </div>
          <div className="rounded-lg bg-white/10 p-3">
            <p className="text-[10px] uppercase tracking-wider text-white/40">Alerts</p>
            <p className="mt-1 text-lg font-bold text-white">7</p>
            <div className="mt-2 flex items-center gap-1">
              <span className="rounded px-1.5 py-0.5 text-[10px] font-bold text-white" style={{ backgroundColor: warning }}>Pending</span>
            </div>
          </div>
        </div>

        <div className="flex gap-2 px-4 pb-4">
          <button className="rounded-lg px-4 py-2 text-xs font-semibold text-white" style={{ backgroundColor: primary }}>Primary Action</button>
          <button className="rounded-lg px-4 py-2 text-xs font-semibold text-white" style={{ backgroundColor: success }}>Confirm</button>
          <button className="rounded-lg px-4 py-2 text-xs font-semibold text-white" style={{ backgroundColor: warning }}>Warning</button>
        </div>
      </div>
    </motion.div>
  );
}
