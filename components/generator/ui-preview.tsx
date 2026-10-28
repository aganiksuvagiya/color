"use client";

import { motion } from "framer-motion";
import { getContrastRatio } from "@/lib/accessibility";
import type { Palette } from "@/lib/types";

type Props = { palette: Palette };

function getByRole(palette: Palette, role: string) {
  return palette.colors.find((c) => c.role === role)?.hex ?? "#666";
}

/** Whichever of white, near-black or the palette's neutral reads best on a surface. */
function textOn(surface: string, neutral: string) {
  return ["#FFFFFF", "#111111", neutral].reduce((best, candidate) =>
    getContrastRatio(surface, candidate) > getContrastRatio(surface, best) ? candidate : best,
  );
}

// Same scale as the industry palette cards.
function wcagLevel(ratio: number) {
  if (ratio >= 7) return { label: "AAA", className: "bg-emerald-100 text-emerald-800" };
  if (ratio >= 4.5) return { label: "AA", className: "bg-emerald-50 text-emerald-700" };
  if (ratio >= 3) return { label: "AA large", className: "bg-amber-50 text-amber-800" };
  return { label: "Fail", className: "bg-red-50 text-red-700" };
}

export function UIPreview({ palette }: Props) {
  const neutral = getByRole(palette, "neutral");
  const primary = getByRole(palette, "primary");
  const success = getByRole(palette, "success");
  const warning = getByRole(palette, "warning");
  const accent = getByRole(palette, "accent");

  const ink = textOn(neutral, neutral);
  const inkIsLight = getContrastRatio(ink, "#FFFFFF") < getContrastRatio(ink, "#000000");
  const label = (surface: string) => textOn(surface, neutral);
  const card = inkIsLight ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.05)";

  const checks = [
    { label: "Body text on background", ratio: getContrastRatio(ink, neutral) },
    { label: "Button label on primary", ratio: getContrastRatio(label(primary), primary) },
    { label: "Links on background", ratio: getContrastRatio(primary, neutral) },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-black/[0.08] bg-white p-4 shadow-[0_1px_6px_rgba(28,23,18,0.06)]"
    >
      <p className="mb-3 text-sm font-medium text-[#1c1712]/55">Live UI Preview</p>

      <div className="overflow-hidden rounded-xl border border-black/[0.07]" style={{ backgroundColor: neutral, color: ink }}>
        <div className="flex items-center justify-between px-4 py-2.5" style={{ backgroundColor: primary, color: label(primary) }}>
          <span className="text-sm font-semibold">Dashboard</span>
          <div className="flex gap-2">
            <div className="rounded-md px-3 py-1 text-xs font-medium" style={{ backgroundColor: accent, color: label(accent) }}>Profile</div>
            <div className="rounded-md px-3 py-1 text-xs opacity-80">Settings</div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-3">
          {[
            { title: "Revenue", value: "$12,450", badge: "+12%", color: success },
            { title: "Users", value: "3,281", badge: "Active", color: accent },
            { title: "Alerts", value: "7", badge: "Pending", color: warning },
          ].map((stat) => (
            <div key={stat.title} className="min-w-0 rounded-lg p-3" style={{ backgroundColor: card }}>
              <p className="text-[10px] uppercase tracking-wider opacity-60">{stat.title}</p>
              <p className="mt-1 truncate text-base font-bold">{stat.value}</p>
              <div className="mt-2 flex items-center gap-1">
                <span className="rounded px-1.5 py-0.5 text-[10px] font-bold" style={{ backgroundColor: stat.color, color: label(stat.color) }}>{stat.badge}</span>
              </div>
            </div>
          ))}
        </div>

        <p className="px-4 pb-3 text-xs leading-5">
          Body text sits on the background.{" "}
          <span className="font-semibold underline underline-offset-2" style={{ color: primary }}>This is a link</span> in the primary color.
        </p>

        <div className="flex flex-wrap gap-2 px-4 pb-4">
          {[
            { text: "Primary Action", color: primary },
            { text: "Confirm", color: success },
            { text: "Warning", color: warning },
          ].map((button) => (
            <button key={button.text} className="rounded-lg px-4 py-2 text-xs font-semibold" style={{ backgroundColor: button.color, color: label(button.color) }}>
              {button.text}
            </button>
          ))}
        </div>
      </div>

      <ul className="mt-4 space-y-2">
        {checks.map((check) => {
          const level = wcagLevel(check.ratio);
          return (
            <li key={check.label} className="flex items-center justify-between gap-3 text-xs">
              <span className="text-[#1c1712]/65">{check.label}</span>
              <span className="flex shrink-0 items-center gap-2">
                {/* Rounded down so a 4.47:1 pair never shows as "4.5:1" next to a non-AA badge */}
                <span className="font-mono text-[#1c1712]/70">{(Math.floor(check.ratio * 10) / 10).toFixed(1)}:1</span>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${level.className}`}>{level.label}</span>
              </span>
            </li>
          );
        })}
      </ul>
    </motion.div>
  );
}
