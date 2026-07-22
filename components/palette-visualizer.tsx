"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Header } from "./header";
import { ToolPageSections } from "@/components/seo/tool-page-sections";
import { generateRandomPalette } from "@/lib/color-utils";
import { findClosestColorName } from "@/lib/color-names";
import { toolPageContent } from "@/lib/seo/tool-pages";
import type { Palette, SemanticRole } from "@/lib/types";

const ROLE_LABELS: Record<SemanticRole, string> = {
  neutral: "Neutral",
  primary: "Primary",
  success: "Success",
  warning: "Warning",
  accent: "Accent",
};

const DEFAULT_PALETTE: Palette = {
  label: "Default palette",
  colors: [
    { name: "Deep Base", hex: "#1c1e21", role: "neutral", text: "light" },
    { name: "Brand", hex: "#4f46e5", role: "primary", text: "light" },
    { name: "Growth", hex: "#22c55e", role: "success", text: "light" },
    { name: "Alert", hex: "#f59e0b", role: "warning", text: "dark" },
    { name: "Pop", hex: "#ec4899", role: "accent", text: "light" },
  ],
};

function getByRole(palette: Palette, role: SemanticRole) {
  return palette.colors.find((c) => c.role === role)?.hex ?? "#666666";
}

export function PaletteVisualizer() {
  const [palette, setPalette] = useState<Palette>(DEFAULT_PALETTE);

  function setRoleColor(role: SemanticRole, hex: string) {
    setPalette((prev) => ({
      ...prev,
      colors: prev.colors.map((c) => (c.role === role ? { ...c, hex, name: findClosestColorName(hex) } : c)),
    }));
  }

  function randomize() {
    setPalette(generateRandomPalette());
  }

  const neutral = getByRole(palette, "neutral");
  const primary = getByRole(palette, "primary");
  const success = getByRole(palette, "success");
  const warning = getByRole(palette, "warning");
  const accent = getByRole(palette, "accent");

  return (
    <main className="relative min-h-screen bg-[#160b05] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(0,0,0,0.95),transparent_18%),radial-gradient(circle_at_88%_0%,rgba(255,106,44,0.2),transparent_30%),linear-gradient(135deg,#1a0e06_0%,#160b05_50%,#1a0e06_100%)]" />
      <div className="noise absolute inset-0 opacity-20" />
      <Header />

      <div className="relative mx-auto max-w-6xl px-4 pt-24 pb-20 sm:px-6 sm:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">Palette Visualizer</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/50">
            See your palette applied to a real website layout before you commit to it.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6 flex flex-wrap items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4"
        >
          {palette.colors.map((color) => (
            <div key={color.role} className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/3 px-3 py-2">
              <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-lg border border-white/15" style={{ backgroundColor: color.hex }}>
                <input
                  type="color"
                  aria-label={`${ROLE_LABELS[color.role]} color`}
                  value={color.hex}
                  onChange={(e) => setRoleColor(color.role, e.target.value)}
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                />
              </div>
              <div>
                <p className="text-xs font-medium text-white/70">{ROLE_LABELS[color.role]}</p>
                <p className="font-mono text-[10px] uppercase text-white/30">{color.hex}</p>
              </div>
            </div>
          ))}
          <button
            onClick={randomize}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/70 transition-colors hover:bg-white/10"
          >
            Randomize palette
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="overflow-hidden rounded-2xl border border-white/10"
        >
          <div style={{ backgroundColor: neutral }}>
            {/* Nav */}
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 sm:px-10">
              <div className="flex items-center gap-2">
                <span className="h-6 w-6 rounded-md" style={{ backgroundColor: primary }} />
                <span className="text-lg font-bold text-white">Brandly</span>
              </div>
              <div className="hidden items-center gap-6 text-sm text-white/70 sm:flex">
                <span>Product</span>
                <span>Pricing</span>
                <span>About</span>
              </div>
              <button
                className="rounded-full px-4 py-2 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-[1.03]"
                style={{ backgroundColor: primary, boxShadow: `0 8px 24px -8px ${primary}99` }}
              >
                Get started
              </button>
            </div>

            {/* Hero */}
            <div
              className="relative overflow-hidden px-6 py-16 text-center sm:px-10 sm:py-24"
              style={{ backgroundImage: `radial-gradient(circle at 50% 0%, ${primary}26, transparent 60%)` }}
            >
              <span
                className="mb-4 inline-block rounded-full px-3 py-1 text-xs font-semibold text-white"
                style={{ backgroundColor: accent }}
              >
                New: v2.0 is here
              </span>
              <h2 className="mx-auto max-w-2xl text-3xl font-bold text-white sm:text-5xl">
                Build products people love to use
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-white/70">
                A complete toolkit for teams who want to ship faster without breaking their design system.
              </p>
              <div className="mt-8 flex items-center justify-center gap-3">
                <button
                  className="rounded-full px-6 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-[1.03]"
                  style={{ backgroundColor: primary, boxShadow: `0 10px 30px -8px ${primary}99` }}
                >
                  Start free trial
                </button>
                <button className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/80 transition-colors hover:bg-white/5">
                  Watch demo
                </button>
              </div>

              {/* Stats strip */}
              <div className="mx-auto mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-white/10 pt-8">
                <div>
                  <p className="text-2xl font-bold text-white">12k+</p>
                  <p className="mt-1 flex items-center justify-center gap-1 text-xs text-white/50">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: success }} />
                    Active teams
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">99.98%</p>
                  <p className="mt-1 flex items-center justify-center gap-1 text-xs text-white/50">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: success }} />
                    Uptime
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">4.9/5</p>
                  <p className="mt-1 flex items-center justify-center gap-1 text-xs text-white/50">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: warning }} />
                    Avg. rating
                  </p>
                </div>
              </div>
            </div>

            {/* Feature cards */}
            <div className="grid grid-cols-1 gap-4 px-6 pb-16 sm:grid-cols-3 sm:px-10">
              {[
                {
                  title: "Fast setup",
                  badge: "New",
                  badgeColor: accent,
                  body: "Connect your stack in minutes with guided onboarding and sensible defaults.",
                },
                {
                  title: "Team ready",
                  badge: "Popular",
                  badgeColor: success,
                  body: "Shared workspaces, roles, and comments keep everyone working from one source of truth.",
                },
                {
                  title: "Always secure",
                  badge: "Beta",
                  badgeColor: warning,
                  body: "SSO, audit logs, and encryption at rest come standard on every plan, not just enterprise.",
                },
              ].map((card) => (
                <div
                  key={card.title}
                  className="rounded-xl border border-white/10 bg-white/5 p-5 transition-transform hover:-translate-y-1"
                >
                  <div
                    className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg text-xs font-bold text-white"
                    style={{ backgroundColor: card.badgeColor }}
                  >
                    {card.badge[0]}
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-white">{card.title}</p>
                    <span
                      className="rounded-full px-2 py-0.5 text-[10px] font-bold text-white"
                      style={{ backgroundColor: card.badgeColor }}
                    >
                      {card.badge}
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm text-white/60">{card.body}</p>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-white/10 px-6 py-6 text-xs text-white/40 sm:px-10">
              <span>© Brandly, Inc.</span>
              <span>Privacy · Terms</span>
            </div>
          </div>
        </motion.div>

        <ToolPageSections config={toolPageContent["palette-visualizer"]} />
      </div>
    </main>
  );
}
