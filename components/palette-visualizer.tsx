"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { Header } from "./header";
import { ToolPageSections } from "@/components/seo/tool-page-sections";
import { generateRandomPalette } from "@/lib/color-utils";
import { findClosestColorName } from "@/lib/color-names";
import { toolPageContent } from "@/lib/seo/tool-pages";
import type { Palette, SemanticRole } from "@/lib/types";

// v3 — enhanced live previews

const ROLE_LABELS: Record<SemanticRole, string> = {
  neutral: "Neutral", primary: "Primary", success: "Success", warning: "Warning", accent: "Accent",
};

const DEFAULT_PALETTE: Palette = {
  label: "Default palette",
  colors: [
    { name: "Deep Base", hex: "#1c1e21", role: "neutral", text: "light" },
    { name: "Brand",     hex: "#4f46e5", role: "primary", text: "light" },
    { name: "Growth",    hex: "#22c55e", role: "success", text: "light" },
    { name: "Alert",     hex: "#f59e0b", role: "warning", text: "dark"  },
    { name: "Pop",       hex: "#ec4899", role: "accent",  text: "light" },
  ],
};


function getByRole(palette: Palette, role: SemanticRole) {
  return palette.colors.find((c) => c.role === role)?.hex ?? "#666666";
}
function getTextColor(palette: Palette, role: SemanticRole) {
  return (palette.colors.find((c) => c.role === role)?.text ?? "light") === "light" ? "#ffffff" : "#111111";
}
function lighten(hex: string, amount = 0.85): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgb(${Math.round(r + (255 - r) * amount)},${Math.round(g + (255 - g) * amount)},${Math.round(b + (255 - b) * amount)})`;
}
function hexToRgba(hex: string, a: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${a})`;
}

// ── Marketing Preview — Numerique-inspired HueFlow layout ────────────────────
function MarketingPreview({ neutral, primary, success, warning, accent, primaryText }: {
  neutral: string; primary: string; success: string; warning: string; accent: string; primaryText: string;
}) {
  const border  = "rgba(0,0,0,0.07)";
  const muted   = "rgba(0,0,0,0.40)";
  const txt     = "#111111";
  const heroBg  = lighten(primary, 0.88);

  return (
    <div className="h-full w-full overflow-y-auto" style={{ backgroundColor: "#ffffff", color: txt, fontFamily: "system-ui,sans-serif" }}>

      {/* ── Top banner ── */}
      <div className="flex items-center justify-center gap-2 px-4 py-2 text-[9px] font-semibold text-white"
        style={{ backgroundColor: neutral }}>
        <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: accent }} />
        Free forever · 8 professional color tools available →
      </div>

      {/* ── Nav ── */}
      <div className="flex items-center justify-between border-b bg-white px-5 py-3" style={{ borderColor: border }}>
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg font-black text-white text-[10px]"
            style={{ backgroundColor: neutral }}>HF</div>
          <span className="text-[13px] font-black tracking-tight uppercase">HueFlow</span>
        </div>
        <div className="hidden items-center gap-5 text-[10px] font-medium sm:flex" style={{ color: muted }}>
          {["Colors", "Palettes", "Tools", "Community"].map((n) => <span key={n} className="cursor-pointer hover:opacity-60">{n}</span>)}
        </div>
        <button className="rounded-full px-4 py-1.5 text-[10px] font-bold"
          style={{ backgroundColor: primary, color: primaryText, boxShadow: `0 4px 12px ${hexToRgba(primary, 0.4)}` }}>
          Generate palette
        </button>
      </div>

      {/* ── Hero ── */}
      <div className="relative overflow-hidden px-6 pb-8 pt-8" style={{ backgroundColor: heroBg }}>
        {/* Decorative blobs using palette colors */}
        <div className="pointer-events-none absolute right-4 top-4 flex gap-2 opacity-70">
          <div className="h-14 w-14 rounded-2xl rotate-12 shadow-lg" style={{ backgroundColor: accent }} />
          <div className="h-10 w-10 rounded-full shadow-md self-end" style={{ backgroundColor: warning }} />
        </div>
        <div className="pointer-events-none absolute bottom-4 right-20 h-8 w-8 rounded-full opacity-50" style={{ backgroundColor: success }} />

        <div className="relative max-w-[55%]">
          <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.2em]" style={{ color: primary }}>
            ✦ Your Color Workspace
          </p>
          <h2 className="text-[2rem] font-black leading-[1.08] tracking-tight">
            Color workspaces<br />for modern teams
          </h2>
          <p className="mt-3 max-w-xs text-[11px] leading-relaxed" style={{ color: muted }}>
            Generate, test, and export accessible palettes. Free tools for designers who care about craft.
          </p>
          <div className="mt-4 flex items-center gap-2">
            <button className="rounded-full px-5 py-2.5 text-[11px] font-bold shadow-md"
              style={{ backgroundColor: primary, color: primaryText, boxShadow: `0 8px 24px ${hexToRgba(primary, 0.45)}` }}>
              Start for free →
            </button>
            <button className="rounded-full border bg-white px-5 py-2.5 text-[11px] font-semibold"
              style={{ borderColor: border, color: muted }}>
              Explore palettes
            </button>
          </div>
        </div>

        {/* Stats row */}
        <div className="mt-6 flex gap-4 border-t pt-5" style={{ borderColor: hexToRgba(primary, 0.15) }}>
          {[
            { val: "50k+",         sub: "Palettes created" },
            { val: "2.1M",         sub: "Colors explored"  },
            { val: "100% Free",    sub: "No paywalls"      },
            { val: "4.9★",         sub: "Community rating" },
          ].map((s, i) => (
            <div key={s.sub} className="text-center">
              <p className="text-[15px] font-black">{s.val}</p>
              <p className="text-[8px] mt-0.5" style={{ color: muted }}>{s.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── We solve X section ── */}
      <div className="flex gap-6 border-b px-6 py-6" style={{ borderColor: border }}>
        <div className="w-[42%] shrink-0">
          <p className="mb-1.5 text-[8px] font-bold uppercase tracking-widest" style={{ color: primary }}>Why HueFlow</p>
          <h3 className="text-[1.2rem] font-black leading-tight tracking-tight">We solve color<br />design challenges</h3>
          <p className="mt-2 text-[9px] leading-relaxed" style={{ color: muted }}>
            From palette generation to accessibility checks — everything you need in one free workspace.
          </p>
          <button className="mt-3 text-[10px] font-bold underline underline-offset-2" style={{ color: primary }}>
            Learn more →
          </button>
        </div>
        <div className="grid flex-1 grid-cols-3 gap-3">
          {[
            { title: "Better palettes",   desc: "Built-in harmony rules that actually look good.", color: primary },
            { title: "Better contrast",   desc: "WCAG AA/AAA checks built right in.",            color: success },
            { title: "Better exports",    desc: "CSS vars, JSON tokens, Figma & more.",          color: accent  },
          ].map((f) => (
            <div key={f.title} className="rounded-xl border p-3" style={{ borderColor: border }}>
              <div className="mb-2 h-1 w-8 rounded-full" style={{ backgroundColor: f.color }} />
              <p className="text-[10px] font-bold">{f.title}</p>
              <p className="mt-1 text-[8px] leading-relaxed" style={{ color: muted }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Services / Tools grid ── */}
      <div className="border-b px-6 py-5" style={{ borderColor: border }}>
        <p className="mb-1 text-[8px] font-bold uppercase tracking-widest" style={{ color: muted }}>Our capabilities</p>
        <h3 className="mb-4 text-[1.1rem] font-black tracking-tight">Powerful tools, zero cost</h3>
        <div className="grid grid-cols-4 gap-2.5">
          {[
            { icon: "🎨", title: "Palette Generator",  desc: "Create harmonious palettes instantly.",     color: primary  },
            { icon: "⚖️", title: "Contrast Checker",   desc: "WCAG AA/AAA accessibility testing.",        color: success  },
            { icon: "💧", title: "Color Extractor",    desc: "Pull palettes from any image.",             color: accent   },
            { icon: "👁",  title: "UI Visualizer",     desc: "Preview your palette on real UI.",          color: warning  },
          ].map((t) => (
            <div key={t.title} className="cursor-pointer rounded-xl border p-3 transition hover:-translate-y-0.5 hover:shadow-sm"
              style={{ borderColor: border }}>
              <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl text-[18px]"
                style={{ backgroundColor: hexToRgba(t.color, 0.12) }}>
                {t.icon}
              </div>
              <p className="text-[10px] font-bold">{t.title}</p>
              <p className="mt-1 text-[8px] leading-relaxed" style={{ color: muted }}>{t.desc}</p>
              <p className="mt-2 text-[8px] font-bold" style={{ color: t.color }}>Learn more →</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Numbers proof ── */}
      <div className="flex items-center gap-4 border-b px-6 py-5" style={{ borderColor: border, backgroundColor: heroBg }}>
        <div className="flex-1">
          <p className="text-[8px] font-bold uppercase tracking-widest" style={{ color: primary }}>The proof is in the numbers</p>
          <h3 className="mt-1 text-[1.1rem] font-black tracking-tight">Trusted by<br />designers worldwide</h3>
        </div>
        <div className="flex flex-1 gap-4">
          {[
            { num: "50k+",   sub: "Palettes",      color: primary },
            { num: "100%",   sub: "Free tools",    color: success },
            { num: "WCAG",   sub: "Compliant",     color: accent  },
            { num: "4.9★",   sub: "User rating",   color: warning },
          ].map((s) => (
            <div key={s.sub} className="rounded-2xl border bg-white p-3 text-center" style={{ borderColor: border }}>
              <p className="text-[17px] font-black" style={{ color: s.color }}>{s.num}</p>
              <p className="text-[8px] mt-0.5" style={{ color: muted }}>{s.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Testimonial ── */}
      <div className="border-b px-6 py-5" style={{ borderColor: border }}>
        <div className="flex items-start gap-2">
          <span className="text-[2rem] leading-none font-serif" style={{ color: primary }}>&ldquo;</span>
          <div>
            <p className="text-[11px] leading-relaxed" style={{ color: muted }}>
              HueFlow is the only tool that makes color work feel effortless. The contrast checker alone has saved us hours of back-and-forth with developers.
            </p>
            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-full font-bold text-[9px] text-white flex items-center justify-center" style={{ backgroundColor: accent }}>LC</div>
                <div>
                  <p className="text-[9px] font-bold">Lisa Chen</p>
                  <p className="text-[8px]" style={{ color: muted }}>Lead Designer · Figma</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[11px]" style={{ color: warning }}>★★★★★</p>
                <p className="text-[8px]" style={{ color: muted }}>5,000+ reviews</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── CTA banner ── */}
      <div className="px-6 py-6">
        <div className="flex items-center gap-4 overflow-hidden rounded-2xl px-6 py-5"
          style={{ background: `linear-gradient(135deg, ${neutral} 0%, ${primary} 100%)` }}>
          <div className="flex-1">
            <h3 className="text-[1rem] font-black leading-tight text-white">
              See how HueFlow can help<br />your team design with color.
            </h3>
            <p className="mt-1 text-[9px] text-white/55">Free forever · No signup needed</p>
          </div>
          <button className="shrink-0 rounded-full bg-white px-5 py-2.5 text-[10px] font-bold" style={{ color: primary }}>
            Get started →
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Dashboard Preview ────────────────────────────────────────────────────────
function DashboardPreview({ neutral, primary, success, warning, accent, primaryText }: {
  neutral: string; primary: string; success: string; warning: string; accent: string; primaryText: string;
}) {
  const chartVals = [30, 52, 38, 65, 55, 78, 62, 85, 70, 90, 75, 98];
  const chartW = 300;
  const chartH = 64;
  const pts = chartVals.map((v, i) => `${(i / 11) * chartW},${chartH - (v / 100) * chartH}`).join(" ");
  const area = `0,${chartH} ${pts} ${chartW},${chartH}`;

  return (
    <div className="flex h-full w-full overflow-hidden text-white" style={{ backgroundColor: neutral }}>
      {/* Sidebar */}
      <div className="hidden w-[175px] shrink-0 flex-col border-r sm:flex" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
        <div className="flex items-center gap-2 border-b px-4 py-3.5" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
          <div className="flex h-6 w-6 items-center justify-center rounded" style={{ backgroundColor: primary }}>
            <div className="h-2 w-2 rounded-sm bg-white/80" />
          </div>
          <span className="text-[12px] font-bold">Brandly</span>
        </div>
        <nav className="flex flex-col gap-0.5 p-2.5 pt-3">
          {[
            { icon: "▦", label: "Overview",  active: true },
            { icon: "↗", label: "Analytics", active: false },
            { icon: "♟", label: "Projects",  active: false },
            { icon: "👤", label: "Customers", active: false },
            { icon: "⚙", label: "Settings",  active: false },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[11px] cursor-pointer"
              style={{
                backgroundColor: item.active ? hexToRgba(primary, 0.18) : "transparent",
                color: item.active ? primary : "rgba(255,255,255,0.40)",
              }}>
              <span className="text-[10px]">{item.icon}</span>
              {item.label}
              {item.active && <span className="ml-auto h-1.5 w-1.5 rounded-full" style={{ backgroundColor: primary }} />}
            </div>
          ))}
        </nav>
        <div className="mt-auto border-t p-3" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
          <div className="flex items-center gap-2 rounded-lg p-2" style={{ backgroundColor: "rgba(255,255,255,0.04)" }}>
            <div className="flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold"
              style={{ backgroundColor: accent }}>SC</div>
            <div>
              <p className="text-[10px] font-semibold">Sarah Chen</p>
              <p className="text-[8px] text-white/30">Pro plan</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-y-auto">
        {/* Top bar */}
        <div className="flex shrink-0 items-center justify-between border-b px-4 py-2.5" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
          <div>
            <p className="text-[12px] font-semibold">Overview</p>
            <p className="text-[9px] text-white/30">Aug 2026 · compared to Jul</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="rounded-lg border px-2.5 py-1.5 text-[9px] text-white/40" style={{ borderColor: "rgba(255,255,255,0.10)" }}>
              Last 30 days ▾
            </div>
            <button className="rounded-lg px-3 py-1.5 text-[9px] font-semibold"
              style={{ backgroundColor: primary, color: primaryText }}>
              + New
            </button>
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid shrink-0 grid-cols-2 gap-2 p-3 sm:grid-cols-4">
          {[
            { label: "Revenue",   val: "$48,260", delta: "+12.4%", color: success, neg: false },
            { label: "New users", val: "3,842",   delta: "+8.1%",  color: primary, neg: false },
            { label: "Orders",    val: "928",      delta: "+5.2%",  color: accent,  neg: false },
            { label: "Churn",     val: "2.1%",     delta: "-0.4%",  color: warning, neg: true  },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border p-3" style={{ borderColor: "rgba(255,255,255,0.07)", backgroundColor: "rgba(255,255,255,0.03)" }}>
              <div className="flex items-start justify-between">
                <p className="text-[8px] uppercase tracking-wider text-white/30">{s.label}</p>
                <div className="h-2 w-2 rounded-full" style={{ backgroundColor: s.color }} />
              </div>
              <p className="mt-1.5 text-[17px] font-bold">{s.val}</p>
              <p className="mt-0.5 text-[9px]" style={{ color: s.neg ? warning : success }}>{s.delta} vs last mo</p>
              {/* Mini sparkline */}
              <div className="mt-2 flex items-end gap-px" style={{ height: 16 }}>
                {[4,6,5,8,7,9,8,10].map((h, i) => (
                  <div key={i} className="flex-1 rounded-t-px"
                    style={{ height: `${h * 10}%`, backgroundColor: i === 7 ? s.color : hexToRgba(s.color, 0.3) }} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Chart + activity */}
        <div className="flex flex-1 gap-2 px-3 pb-3">
          {/* Area chart */}
          <div className="flex flex-1 flex-col rounded-xl border p-3" style={{ borderColor: "rgba(255,255,255,0.07)", backgroundColor: "rgba(255,255,255,0.03)" }}>
            <div className="mb-2 flex items-center justify-between">
              <p className="text-[10px] font-semibold">Revenue</p>
              <div className="flex gap-2">
                {["1W", "1M", "3M"].map((t, i) => (
                  <span key={t} className="cursor-pointer rounded px-2 py-0.5 text-[8px]"
                    style={{ backgroundColor: i === 1 ? hexToRgba(primary, 0.25) : "transparent", color: i === 1 ? primary : "rgba(255,255,255,0.3)" }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-1 items-end">
              <svg viewBox={`0 0 ${chartW} ${chartH + 4}`} preserveAspectRatio="none" className="h-full w-full">
                <defs>
                  <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={primary} stopOpacity="0.35" />
                    <stop offset="100%" stopColor={primary} stopOpacity="0.02" />
                  </linearGradient>
                </defs>
                <polyline points={pts} fill="none" stroke={primary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
                <polygon points={area} fill="url(#cg)" />
              </svg>
            </div>
            <div className="mt-1 flex justify-between">
              {["Jan","Mar","May","Jul","Sep","Nov"].map((m) => (
                <span key={m} className="text-[7px] text-white/20">{m}</span>
              ))}
            </div>
          </div>

          {/* Activity feed */}
          <div className="hidden w-[150px] shrink-0 flex-col rounded-xl border p-3 sm:flex" style={{ borderColor: "rgba(255,255,255,0.07)", backgroundColor: "rgba(255,255,255,0.03)" }}>
            <p className="mb-2.5 text-[10px] font-semibold">Activity</p>
            <div className="space-y-3">
              {[
                { dot: success, title: "Order paid",       sub: "Order #392 · $240",  time: "2m" },
                { dot: primary, title: "New signup",        sub: "lisa@example.com",  time: "8m" },
                { dot: accent,  title: "Export done",       sub: "palette-v3.svg",    time: "15m" },
                { dot: warning, title: "Server at 82%",     sub: "us-east-1 · spike", time: "1h" },
                { dot: success, title: "Deploy success",    sub: "main → prod",       time: "2h" },
              ].map((a, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="mt-0.5 h-4 w-4 shrink-0 flex items-center justify-center rounded-full" style={{ backgroundColor: hexToRgba(a.dot, 0.2) }}>
                    <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: a.dot }} />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-[9px] font-semibold text-white/70">{a.title}</p>
                    <p className="truncate text-[8px] text-white/30">{a.sub}</p>
                  </div>
                  <span className="ml-auto shrink-0 text-[7px] text-white/20">{a.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="mx-3 mb-3 overflow-hidden rounded-xl border" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
          <div className="flex items-center justify-between border-b px-3 py-2.5" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
            <p className="text-[10px] font-semibold">Recent transactions</p>
            <span className="text-[9px] cursor-pointer" style={{ color: primary }}>View all →</span>
          </div>
          <div className="divide-y divide-white/[0.05]">
            {[
              { name: "Acme Corp",     amt: "+$2,400", status: "Paid",    color: success },
              { name: "TechFlow Ltd",  amt: "+$980",   status: "Paid",    color: success },
              { name: "Nova Studio",   amt: "$1,200",   status: "Pending", color: warning },
              { name: "Stack Media",   amt: "+$3,100", status: "Paid",    color: success },
            ].map((row, i) => (
              <div key={i} className="flex items-center gap-3 px-3 py-2" style={{ borderTop: i > 0 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                <div className="flex h-6 w-6 items-center justify-center rounded-full text-[8px] font-bold"
                  style={{ backgroundColor: hexToRgba(primary, 0.2), color: primary }}>
                  {row.name[0]}
                </div>
                <p className="flex-1 text-[9px] text-white/60">{row.name}</p>
                <span className="rounded-full px-2 py-0.5 text-[7px] font-semibold" style={{ backgroundColor: hexToRgba(row.color, 0.15), color: row.color }}>
                  {row.status}
                </span>
                <p className="text-[9px] font-semibold" style={{ color: row.color === success ? success : "rgba(255,255,255,0.6)" }}>{row.amt}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Product UI Preview ───────────────────────────────────────────────────────
function ProductPreview({ neutral, primary, success, warning, accent, primaryText }: {
  neutral: string; primary: string; success: string; warning: string; accent: string; primaryText: string;
}) {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden text-white" style={{ backgroundColor: neutral }}>
      {/* Header */}
      <div className="flex shrink-0 items-center gap-2 border-b px-4 py-2.5" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
        <div className="flex h-5 w-5 items-center justify-center rounded text-[8px]" style={{ backgroundColor: primary }}>
          <div className="h-1.5 w-1.5 rounded-sm bg-white/80" />
        </div>
        <span className="text-[11px] font-bold mr-3">Brandly</span>
        <div className="flex gap-1">
          {["Design", "Prototype", "Share"].map((t, i) => (
            <span key={t} className="rounded px-2.5 py-1 text-[10px] font-medium cursor-pointer"
              style={{ backgroundColor: i === 0 ? hexToRgba(primary, 0.25) : "transparent", color: i === 0 ? primary : "rgba(255,255,255,0.35)" }}>
              {t}
            </span>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-2">
          <div className="flex -space-x-1.5">
            {[accent, success, warning].map((c, i) => (
              <div key={i} className="h-5 w-5 rounded-full border border-white/20 text-[7px] flex items-center justify-center font-bold"
                style={{ backgroundColor: c }}>
                {["S","M","T"][i]}
              </div>
            ))}
          </div>
          <button className="rounded-lg px-3 py-1.5 text-[10px] font-semibold"
            style={{ backgroundColor: primary, color: primaryText }}>
            Publish
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left panel */}
        <div className="hidden w-[150px] shrink-0 flex-col border-r p-2.5 sm:flex" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
          <p className="mb-1.5 text-[8px] uppercase tracking-wider text-white/25">Layers</p>
          {[
            { label: "Hero Section",   depth: 0, active: true },
            { label: "Nav Bar",        depth: 1, active: false },
            { label: "Heading",        depth: 1, active: false },
            { label: "CTA Buttons",    depth: 2, active: false },
            { label: "Feature Grid",   depth: 0, active: false },
            { label: "Card 1",         depth: 1, active: false },
            { label: "Card 2",         depth: 1, active: false },
          ].map((l, i) => (
            <div key={i} className="flex items-center gap-1.5 rounded px-1.5 py-1 text-[9px] cursor-pointer"
              style={{ paddingLeft: `${6 + l.depth * 10}px`, backgroundColor: l.active ? hexToRgba(primary, 0.18) : "transparent", color: l.active ? primary : "rgba(255,255,255,0.35)" }}>
              <div className="h-2 w-2 rounded-sm border" style={{ borderColor: l.active ? primary : "rgba(255,255,255,0.15)", backgroundColor: l.active ? hexToRgba(primary, 0.3) : "transparent" }} />
              <span className="truncate">{l.label}</span>
            </div>
          ))}
          <div className="mt-3 border-t pt-3" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
            <p className="mb-1.5 text-[8px] uppercase tracking-wider text-white/25">Assets</p>
            {["Colors", "Typography", "Icons"].map((a) => (
              <div key={a} className="flex items-center gap-1.5 rounded px-2 py-1.5 text-[9px] cursor-pointer text-white/35 hover:text-white/55">
                <div className="h-2 w-2 rounded-full" style={{ backgroundColor: a === "Colors" ? primary : "rgba(255,255,255,0.2)" }} />
                {a}
              </div>
            ))}
          </div>
        </div>

        {/* Canvas */}
        <div className="flex flex-1 flex-col items-center justify-center gap-4 overflow-auto p-5" style={{ backgroundColor: "rgba(0,0,0,0.15)" }}>
          {/* Buttons showcase */}
          <div className="w-full max-w-xs rounded-2xl border p-4" style={{ borderColor: "rgba(255,255,255,0.08)", backgroundColor: hexToRgba(neutral, 0.8) }}>
            <p className="mb-3 text-[9px] uppercase tracking-wider text-white/25">Buttons</p>
            <div className="flex flex-wrap gap-2">
              {[
                { label: "Primary",   bg: primary,  color: primaryText },
                { label: "Success",   bg: success,  color: "#fff" },
                { label: "Warning",   bg: warning,  color: "#111" },
                { label: "Accent",    bg: accent,   color: "#fff" },
              ].map((b) => (
                <button key={b.label} className="rounded-lg px-3 py-1.5 text-[10px] font-semibold"
                  style={{ backgroundColor: b.bg, color: b.color }}>
                  {b.label}
                </button>
              ))}
              <button className="rounded-lg border px-3 py-1.5 text-[10px] font-semibold text-white/50"
                style={{ borderColor: "rgba(255,255,255,0.15)" }}>
                Ghost
              </button>
            </div>
          </div>

          {/* Badges */}
          <div className="w-full max-w-xs rounded-2xl border p-4" style={{ borderColor: "rgba(255,255,255,0.08)", backgroundColor: hexToRgba(neutral, 0.8) }}>
            <p className="mb-3 text-[9px] uppercase tracking-wider text-white/25">Badges & Status</p>
            <div className="flex flex-wrap gap-2">
              {[
                { label: "New",     color: accent   },
                { label: "Live",    color: success  },
                { label: "Beta",    color: primary  },
                { label: "Caution", color: warning  },
                { label: "Draft",   color: "rgba(255,255,255,0.2)" },
              ].map((b) => (
                <span key={b.label} className="flex items-center gap-1 rounded-full px-2.5 py-1 text-[9px] font-semibold"
                  style={{ backgroundColor: hexToRgba(b.color, 0.18), color: b.color, border: `1px solid ${hexToRgba(b.color, 0.3)}` }}>
                  <span className="h-1 w-1 rounded-full" style={{ backgroundColor: b.color }} />
                  {b.label}
                </span>
              ))}
            </div>
          </div>

          {/* Color tokens */}
          <div className="w-full max-w-xs rounded-2xl border p-4" style={{ borderColor: "rgba(255,255,255,0.08)", backgroundColor: hexToRgba(neutral, 0.8) }}>
            <p className="mb-3 text-[9px] uppercase tracking-wider text-white/25">Color Tokens</p>
            <div className="flex gap-1.5">
              {[neutral, primary, success, warning, accent].map((c, i) => (
                <div key={i} className="group flex flex-1 flex-col items-center gap-1">
                  <div className="h-10 w-full rounded-lg" style={{ backgroundColor: c }} />
                  <p className="text-[7px] text-white/30">{["Neu","Pri","Suc","War","Acc"][i]}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="hidden w-[155px] shrink-0 flex-col border-l p-3 sm:flex" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
          <p className="mb-2 text-[8px] uppercase tracking-wider text-white/25">Properties</p>
          <div className="space-y-3">
            <div>
              <p className="mb-1 text-[8px] text-white/25">Fill</p>
              <div className="flex items-center gap-1.5 rounded-lg border px-2 py-1.5" style={{ borderColor: "rgba(255,255,255,0.10)" }}>
                <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: primary }} />
                <p className="text-[9px] text-white/50">{primary.toUpperCase()}</p>
              </div>
            </div>
            <div>
              <p className="mb-1 text-[8px] text-white/25">Stroke</p>
              <div className="flex items-center gap-1.5 rounded-lg border px-2 py-1.5" style={{ borderColor: "rgba(255,255,255,0.10)" }}>
                <div className="h-3 w-3 rounded-sm border border-dashed border-white/30" />
                <p className="text-[9px] text-white/30">None</p>
              </div>
            </div>
            <div>
              <p className="mb-1 text-[8px] text-white/25">Border radius</p>
              <div className="flex items-center justify-between gap-1">
                {[8,8,8,8].map((v, i) => (
                  <div key={i} className="flex-1 rounded border px-1 py-1 text-center text-[9px] text-white/40" style={{ borderColor: "rgba(255,255,255,0.10)" }}>{v}</div>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-1 text-[8px] text-white/25">Spacing</p>
              <div className="grid grid-cols-2 gap-1">
                {[["T","12"],["R","16"],["B","12"],["L","16"]].map(([d,v]) => (
                  <div key={d} className="rounded border px-1.5 py-1 text-[8px] text-white/40" style={{ borderColor: "rgba(255,255,255,0.10)" }}>
                    <span className="text-white/20">{d} </span>{v}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-1.5 text-[8px] text-white/25">Typography</p>
              <div className="space-y-1.5">
                <div className="rounded-lg border px-2 py-1.5" style={{ borderColor: "rgba(255,255,255,0.10)" }}>
                  <p className="text-[9px] text-white/50">Inter · Semi Bold</p>
                  <p className="text-[8px] text-white/25">13px · 1.4 lh</p>
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-4 w-4 rounded border flex items-center justify-center text-[9px] text-white/40" style={{ borderColor: "rgba(255,255,255,0.10)" }}>B</div>
                  <div className="h-4 w-4 rounded border flex items-center justify-center text-[9px] italic text-white/40" style={{ borderColor: "rgba(255,255,255,0.10)" }}>I</div>
                  <div className="h-4 w-4 rounded border flex items-center justify-center text-[9px] underline text-white/40" style={{ borderColor: "rgba(255,255,255,0.10)" }}>U</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Component Showcase ───────────────────────────────────────────────────────
function ComponentShowcase({ neutral, primary, success, warning, accent, primaryText }: {
  neutral: string; primary: string; success: string; warning: string; accent: string; primaryText: string;
}) {
  const bd  = "rgba(0,0,0,0.07)";
  const mut = "rgba(0,0,0,0.38)";
  const C   = `overflow-hidden rounded-2xl border bg-white`;
  const LBL = `border-b px-4 py-2.5 text-[9px] font-bold uppercase tracking-[0.18em]`;

  return (
    <div className="space-y-4">

      {/* ── Row 1: Buttons + Badges ── */}
      <div className={C} style={{ borderColor: bd }}>
        <p className={LBL} style={{ borderColor: bd, color: mut }}>Buttons & Badges</p>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-4 px-5 py-4">
          <div className="flex flex-wrap items-center gap-2">
            <button className="rounded-xl px-4 py-2 text-[11px] font-bold"
              style={{ backgroundColor: primary, color: primaryText, boxShadow: `0 4px 12px ${hexToRgba(primary, 0.35)}` }}>
              Primary
            </button>
            <button className="rounded-xl px-4 py-2 text-[11px] font-semibold"
              style={{ backgroundColor: hexToRgba(primary, 0.10), color: primary }}>
              Secondary
            </button>
            <button className="rounded-xl border px-4 py-2 text-[11px] font-semibold"
              style={{ borderColor: primary, color: primary }}>
              Outline
            </button>
            <button className="rounded-xl px-4 py-2 text-[11px] font-semibold"
              style={{ color: primary }}>
              Ghost →
            </button>
            <button className="rounded-xl px-4 py-2 text-[11px] font-bold text-white"
              style={{ backgroundColor: neutral }}>
              Dark
            </button>
            <button className="cursor-not-allowed rounded-xl px-4 py-2 text-[11px] font-semibold opacity-40"
              style={{ backgroundColor: hexToRgba(neutral, 0.10), color: neutral }}>
              Disabled
            </button>
          </div>
          <div className="hidden h-8 w-px sm:block" style={{ backgroundColor: bd }} />
          <div className="flex flex-wrap items-center gap-1.5">
            {([
              { label: "Primary", c: primary },
              { label: "Success", c: success },
              { label: "Warning", c: warning },
              { label: "Accent",  c: accent  },
              { label: "Neutral", c: neutral },
            ] as const).map((b) => (
              <span key={b.label} className="rounded-full px-2.5 py-1 text-[9px] font-bold"
                style={{ backgroundColor: hexToRgba(b.c, 0.12), color: b.c }}>
                {b.label}
              </span>
            ))}
            <span className="rounded-full border px-2.5 py-1 text-[9px] font-bold"
              style={{ borderColor: bd, color: mut }}>Outline</span>
          </div>
        </div>
      </div>

      {/* ── Row 2: Nav + Stats ── */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-5">

        <div className={`${C} sm:col-span-3`} style={{ borderColor: bd }}>
          <p className={LBL} style={{ borderColor: bd, color: mut }}>Navigation Bar</p>
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[9px] font-black text-white"
              style={{ backgroundColor: neutral }}>HF</div>
            <div className="flex min-w-0 flex-1 gap-3 overflow-hidden">
              {["Home","Palettes","Tools","Pricing"].map((n) => (
                <span key={n} className="shrink-0 text-[10px] font-medium" style={{ color: mut }}>{n}</span>
              ))}
            </div>
            <button className="shrink-0 whitespace-nowrap rounded-full px-3 py-1.5 text-[9px] font-bold"
              style={{ backgroundColor: primary, color: primaryText }}>
              Get started
            </button>
          </div>
          <div className="flex items-center gap-2 border-t px-4 py-2" style={{ borderColor: bd }}>
            {["Overview","Analytics","Settings"].map((n, i) => (
              <span key={n} className="rounded-lg px-2.5 py-1 text-[9px] font-semibold"
                style={i === 0 ? { backgroundColor: primary, color: primaryText } : { color: mut }}>
                {n}
              </span>
            ))}
          </div>
        </div>

        <div className={`${C} sm:col-span-2`} style={{ borderColor: bd }}>
          <p className={LBL} style={{ borderColor: bd, color: mut }}>KPI Stats</p>
          <div className="divide-y" style={{ borderColor: bd }}>
            {([
              { label: "Palettes created", val: "12,482", delta: "+18%", c: success },
              { label: "Contrast checks",  val: "4,310",  delta: "+7%",  c: primary },
              { label: "CSS exports",      val: "891",    delta: "+12%", c: accent  },
            ] as const).map((s) => (
              <div key={s.label} className="flex items-center justify-between px-4 py-2.5">
                <div>
                  <p className="text-[9px]" style={{ color: mut }}>{s.label}</p>
                  <p className="text-[13px] font-black">{s.val}</p>
                </div>
                <span className="rounded-full px-2 py-0.5 text-[9px] font-bold"
                  style={{ backgroundColor: hexToRgba(s.c, 0.12), color: s.c }}>{s.delta}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Row 3: Alerts + Form + Notifications ── */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">

        <div className={C} style={{ borderColor: bd }}>
          <p className={LBL} style={{ borderColor: bd, color: mut }}>Alert Banners</p>
          <div className="space-y-2 px-4 py-3">
            {([
              { icon: "✓", label: "Palette saved successfully!", c: success },
              { icon: "⚠", label: "Low contrast detected.",      c: warning },
              { icon: "✕", label: "Export failed. Try again.",   c: accent  },
            ] as const).map((a) => (
              <div key={a.label} className="flex items-center gap-2 rounded-xl px-3 py-2.5"
                style={{ backgroundColor: hexToRgba(a.c, 0.10) }}>
                <span className="shrink-0 text-[11px] font-bold" style={{ color: a.c }}>{a.icon}</span>
                <p className="text-[9px] font-medium leading-tight" style={{ color: a.c }}>{a.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={C} style={{ borderColor: bd }}>
          <p className={LBL} style={{ borderColor: bd, color: mut }}>Form Inputs</p>
          <div className="space-y-3 px-4 py-3">
            <div>
              <label className="mb-1 block text-[9px] font-semibold" style={{ color: mut }}>Palette name</label>
              <div className="flex items-center rounded-xl border px-3 py-2"
                style={{ borderColor: primary, boxShadow: "0 0 0 3px " + hexToRgba(primary, 0.12) }}>
                <span className="flex-1 text-[10px]">Sunset Vibes</span>
                <span className="h-3.5 w-0.5 animate-pulse rounded-full" style={{ backgroundColor: primary }} />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-[9px] font-semibold" style={{ color: mut }}>Category</label>
              <div className="flex items-center justify-between rounded-xl border px-3 py-2" style={{ borderColor: bd }}>
                <span className="text-[10px]" style={{ color: mut }}>Brand colors</span>
                <span className="text-[9px]" style={{ color: mut }}>▾</span>
              </div>
            </div>
            <button className="w-full rounded-xl py-2 text-[10px] font-bold"
              style={{ backgroundColor: primary, color: primaryText }}>
              Save palette
            </button>
          </div>
        </div>

        <div className={C} style={{ borderColor: bd }}>
          <p className={LBL} style={{ borderColor: bd, color: mut }}>Notifications</p>
          <div className="space-y-2 px-4 py-3">
            {([
              { title: "New palette shared", sub: "2 min ago",  c: primary, dot: true  },
              { title: "WCAG check passed",  sub: "15 min ago", c: success, dot: true  },
              { title: "Export ready",       sub: "1 hr ago",   c: accent,  dot: false },
            ] as const).map((n) => (
              <div key={n.title} className="flex items-start gap-2.5">
                <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
                  style={{ backgroundColor: n.dot ? n.c : bd }} />
                <div className="flex-1 min-w-0">
                  <p className="truncate text-[10px] font-semibold">{n.title}</p>
                  <p className="text-[8px]" style={{ color: mut }}>{n.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Row 4: Data Table + Controls ── */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">

        <div className={`${C} sm:col-span-2`} style={{ borderColor: bd }}>
          <p className={LBL} style={{ borderColor: bd, color: mut }}>Data Table</p>
          <table className="w-full text-[9px]">
            <thead>
              <tr className="border-b" style={{ borderColor: bd }}>
                {["Palette","Role","Hex","Contrast"].map((h) => (
                  <th key={h} className="px-4 py-2 text-left font-bold uppercase tracking-wide" style={{ color: mut }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {([
                { name: "Brand Blue", role: "Primary", hex: primary, c: primary },
                { name: "Leaf Green", role: "Success", hex: success, c: success },
                { name: "Amber",      role: "Warning", hex: warning, c: warning },
                { name: "Pop Pink",   role: "Accent",  hex: accent,  c: accent  },
              ] as const).map((r) => (
                <tr key={r.name} className="border-b transition hover:bg-black/[0.02]" style={{ borderColor: bd }}>
                  <td className="px-4 py-2.5 font-semibold">{r.name}</td>
                  <td className="px-4 py-2.5">
                    <span className="rounded-full px-2 py-0.5 font-bold"
                      style={{ backgroundColor: hexToRgba(r.c, 0.10), color: r.c }}>{r.role}</span>
                  </td>
                  <td className="px-4 py-2.5 font-mono text-[8px]">{r.hex.toUpperCase()}</td>
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-1.5">
                      <div className="h-1.5 w-16 overflow-hidden rounded-full" style={{ backgroundColor: hexToRgba(r.c, 0.15) }}>
                        <div className="h-full rounded-full" style={{ width: "72%", backgroundColor: r.c }} />
                      </div>
                      <span style={{ color: mut }}>AA</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={C} style={{ borderColor: bd }}>
          <p className={LBL} style={{ borderColor: bd, color: mut }}>Controls</p>
          <div className="space-y-4 px-4 py-3">
            <div className="space-y-3">
              {([
                { label: "WCAG AA check",    on: true,  c: success },
                { label: "Dark mode export", on: true,  c: primary },
                { label: "Auto-name colors", on: false, c: neutral },
              ] as const).map((t) => (
                <div key={t.label} className="flex items-center justify-between gap-2">
                  <span className="text-[9px] font-medium">{t.label}</span>
                  <div className="relative flex h-5 w-9 items-center rounded-full p-0.5"
                    style={{ backgroundColor: t.on ? t.c : "rgba(0,0,0,0.15)" }}>
                    <div className="h-4 w-4 rounded-full bg-white shadow"
                      style={{ transform: t.on ? "translateX(16px)" : "translateX(0)" }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-2 border-t pt-3" style={{ borderColor: bd }}>
              {([
                { label: "Palette coverage", pct: 80, c: primary },
                { label: "Contrast score",   pct: 65, c: success },
                { label: "Export quality",   pct: 92, c: accent  },
              ] as const).map((p) => (
                <div key={p.label}>
                  <div className="mb-1 flex justify-between">
                    <span className="text-[8px]" style={{ color: mut }}>{p.label}</span>
                    <span className="text-[8px] font-bold" style={{ color: p.c }}>{p.pct}%</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full" style={{ backgroundColor: hexToRgba(p.c, 0.14) }}>
                    <div className="h-full rounded-full" style={{ width: p.pct + "%", backgroundColor: p.c }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

// ── Main Component ───────────────────────────────────────────────────────────
type View = "website" | "dashboard" | "app" | "components";

const VIEWS: { id: View; label: string; url: string }[] = [
  { id: "website", label: "Website", url: "hueflow.site" },
  { id: "dashboard", label: "Dashboard", url: "brandly.app/overview" },
  { id: "app", label: "App UI", url: "brandly.app/design" },
  { id: "components", label: "Components", url: "brandly.app/ui-kit" },
];

function PaletteIcon({ children }: { children: ReactNode }) {
  return (
    <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  );
}

export function PaletteVisualizer() {
  const [palette, setPalette] = useState<Palette>(DEFAULT_PALETTE);
  const [view, setView] = useState<View>("website");
  const [copied, setCopied] = useState<"css" | "json" | null>(null);

  function setRoleColor(role: SemanticRole, hex: string) {
    setPalette((prev) => ({
      ...prev,
      colors: prev.colors.map((c) =>
        c.role === role ? { ...c, hex, name: findClosestColorName(hex) } : c
      ),
    }));
  }

  function randomize() { setPalette(generateRandomPalette()); }

  async function copyAs(kind: "css" | "json") {
    const text =
      kind === "css"
        ? `:root {\n${palette.colors.map((c) => `  --color-${c.role}: ${c.hex};`).join("\n")}\n}`
        : JSON.stringify(Object.fromEntries(palette.colors.map((c) => [`color-${c.role}`, c.hex])), null, 2);
    await navigator.clipboard.writeText(text);
    setCopied(kind);
    setTimeout(() => setCopied((c) => (c === kind ? null : c)), 1500);
  }

  const neutral     = getByRole(palette, "neutral");
  const primary     = getByRole(palette, "primary");
  const success     = getByRole(palette, "success");
  const warning     = getByRole(palette, "warning");
  const accent      = getByRole(palette, "accent");
  const primaryText = getTextColor(palette, "primary");

  const previewProps = { neutral, primary, success, warning, accent, primaryText };
  const current = VIEWS.find((v) => v.id === view) ?? VIEWS[0];

  const label = "text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1c1712]/45";
  const actionBtn = "inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold text-[#1c1712]/70 ring-1 ring-black/[0.12] transition hover:text-[#1c1712] hover:ring-black/25";

  return (
    <div className="min-h-screen bg-white text-[#1c1712]">
      <Header />

      {copied && (
        <div role="status" className="fixed bottom-8 left-1/2 z-[100] -translate-x-1/2 whitespace-nowrap rounded-full bg-[#1c1712] px-5 py-2.5 text-[13px] font-semibold text-white shadow-lg">
          {copied === "json" ? "✓ JSON tokens copied" : "✓ CSS variables copied"}
        </div>
      )}

      <main>
        {/* ── Header ── */}
        <section className="w-full px-6 pb-8 pt-28 sm:px-8 lg:px-12">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[12px] text-[#1c1712]/40">
            <Link href="/" className="transition hover:text-[#1c1712]/70">Home</Link>
            <span className="text-[#1c1712]/20">/</span>
            <Link href="/tools" className="transition hover:text-[#1c1712]/70">Tools</Link>
            <span className="text-[#1c1712]/20">/</span>
            <span className="text-[#1c1712]/60">Palette Visualizer</span>
          </nav>
          <h1 className="mt-8 text-[2.6rem] font-bold leading-[1.05] tracking-[-0.035em] sm:text-[3.5rem]">Palette Visualizer</h1>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="flex -space-x-1.5" aria-hidden="true">
              {palette.colors.map((c) => (
                <span key={c.role} className="h-5 w-5 rounded-full ring-2 ring-white" style={{ backgroundColor: c.hex }} />
              ))}
            </span>
            <p className="text-[16px] text-[#1c1712]/55">
              <span className="font-semibold text-[#1c1712]/80">See your palette on real UI.</span> Edit the five role colors and watch a website, dashboard, app screen and UI kit update live, then copy CSS or JSON tokens.
            </p>
          </div>
        </section>

        {/* ── Workspace: palette on the left, live preview on the right ── */}
        <section className="border-t border-black/[0.06]">
          <div className="grid w-full gap-6 px-6 py-10 sm:px-8 lg:grid-cols-[320px_minmax(0,1fr)] lg:px-12">
            {/* Palette roles */}
            <aside className="flex flex-col rounded-2xl ring-1 ring-black/[0.07] lg:sticky lg:top-24 lg:self-start">
              <div className="px-5 pb-3 pt-5">
                <p className={label}>Palette roles</p>
                <p className="mt-1 text-[13px] text-[#1c1712]/50">Click a swatch to change it.</p>
              </div>
              <ul className="divide-y divide-black/[0.06] border-t border-black/[0.06]">
                {palette.colors.map((color) => (
                  <li key={color.role} className="flex items-center gap-3 px-5 py-3">
                    <label
                      className="relative h-12 w-12 shrink-0 cursor-pointer overflow-hidden rounded-xl ring-1 ring-black/10 transition hover:ring-black/30"
                      title="Open your system color picker"
                    >
                      <input
                        type="color"
                        aria-label={`${ROLE_LABELS[color.role]} color`}
                        value={color.hex}
                        onChange={(e) => setRoleColor(color.role, e.target.value.toUpperCase())}
                        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                      />
                      <span className="block h-full w-full" style={{ backgroundColor: color.hex }} />
                    </label>
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#c2410c]">{ROLE_LABELS[color.role]}</p>
                      <p className="truncate text-[14px] font-semibold leading-5">{color.name}</p>
                    </div>
                    <p className="font-mono text-[12px] uppercase text-[#1c1712]/50">{color.hex}</p>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2 border-t border-black/[0.06] p-4">
                <button onClick={randomize} className="inline-flex items-center gap-2 rounded-full bg-[#1c1712] px-4 py-2 text-[13px] font-semibold text-white transition hover:bg-[#c2410c]">
                  <PaletteIcon>
                    <rect x="3" y="3" width="18" height="18" rx="4" />
                    <circle cx="8.5" cy="8.5" r="1" fill="currentColor" />
                    <circle cx="12" cy="12" r="1" fill="currentColor" />
                    <circle cx="15.5" cy="15.5" r="1" fill="currentColor" />
                  </PaletteIcon>
                  Randomize
                </button>
                <button onClick={() => copyAs("css")} className={actionBtn}>{copied === "css" ? "✓ Copied" : "Copy CSS"}</button>
                <button onClick={() => copyAs("json")} className={actionBtn}>{copied === "json" ? "✓ Copied" : "Copy JSON"}</button>
              </div>
            </aside>

            {/* Live preview */}
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Preview type">
                {VIEWS.map((v) => (
                  <button
                    key={v.id}
                    role="tab"
                    aria-selected={view === v.id}
                    onClick={() => setView(v.id)}
                    className={`rounded-full px-4 py-1.5 text-[13px] font-semibold transition ${
                      view === v.id ? "bg-[#1c1712] text-white" : "text-[#1c1712]/65 ring-1 ring-black/[0.12] hover:text-[#1c1712] hover:ring-black/25"
                    }`}
                  >
                    {v.label}
                  </button>
                ))}
                <span className="ml-auto text-[13px] text-[#1c1712]/45">Updates live as you edit</span>
              </div>

              <div className="mt-4 overflow-hidden rounded-2xl ring-1 ring-black/[0.1]">
                <div className="flex items-center gap-3 border-b border-black/[0.07] bg-[#f5f5f5] px-4 py-2.5" aria-hidden="true">
                  <span className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-black/15" />
                    <span className="h-2.5 w-2.5 rounded-full bg-black/15" />
                    <span className="h-2.5 w-2.5 rounded-full bg-black/15" />
                  </span>
                  <span className="mx-auto w-full max-w-xs truncate rounded-full bg-white px-4 py-1 text-center text-[11px] text-[#1c1712]/50 ring-1 ring-black/[0.06]">
                    {current.url}
                  </span>
                  <span className="w-10" />
                </div>
                <div role="tabpanel" className={view === "components" ? "h-[34rem] overflow-y-auto bg-[#f5f5f5] p-4 sm:p-5 lg:h-[40rem]" : "h-[34rem] lg:h-[40rem]"}>
                  {view === "website" && <MarketingPreview {...previewProps} />}
                  {view === "dashboard" && <DashboardPreview {...previewProps} />}
                  {view === "app" && <ProductPreview {...previewProps} />}
                  {view === "components" && <ComponentShowcase {...previewProps} />}
                </div>
              </div>
            </div>
          </div>
        </section>

        <ToolPageSections config={toolPageContent["palette-visualizer"]} variant="new" />
      </main>
    </div>
  );
}
