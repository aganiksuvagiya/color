"use client";

import { Fragment, useEffect, useMemo, useState, type ComponentType, type SVGProps } from "react";
import Link from "next/link";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { THEMES } from "@/lib/daily-challenge";

/* ─── Icons (inline SVG, no icon library) ───────────────────────────────── */

type IconProps = SVGProps<SVGSVGElement>;
const iconBase = { fill: "none", stroke: "currentColor", strokeWidth: 1.75, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

function IconOverview(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...iconBase} {...props}>
      <rect x="3" y="3" width="7" height="9" rx="1.5" />
      <rect x="14" y="3" width="7" height="5" rx="1.5" />
      <rect x="14" y="12" width="7" height="9" rx="1.5" />
      <rect x="3" y="16" width="7" height="5" rx="1.5" />
    </svg>
  );
}

function IconUsers(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...iconBase} {...props}>
      <circle cx="9" cy="8" r="3.25" />
      <path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" />
      <circle cx="17.5" cy="8.5" r="2.5" />
      <path d="M15.5 14.2c2.9.4 5 2.5 5 5.8" />
    </svg>
  );
}

function IconPalette(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...iconBase} {...props}>
      <path d="M12 3a9 9 0 1 0 0 18c1.1 0 2-.9 2-2 0-.5-.2-1-.5-1.3-.3-.4-.5-.8-.5-1.2 0-1.1.9-2 2-2h2a4.5 4.5 0 0 0 4.5-4.5C21 6.9 17 3 12 3Z" />
      <circle cx="7.5" cy="10.5" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="11" cy="7" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="15.5" cy="8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconActivity(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...iconBase} {...props}>
      <path d="M3 12h4l2.5-7 4.5 14 2.5-7H21" />
    </svg>
  );
}

function IconSettings(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...iconBase} {...props}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 13.5a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1.04 1.56V19.5a2 2 0 1 1-4 0v-.09a1.7 1.7 0 0 0-1.04-1.56 1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.7 1.7 0 0 0 .34-1.87 1.7 1.7 0 0 0-1.56-1.04H4.5a2 2 0 1 1 0-4h.09a1.7 1.7 0 0 0 1.56-1.04 1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.7 1.7 0 0 0 1.87.34H10.5a1.7 1.7 0 0 0 1.04-1.56V4.5a2 2 0 1 1 4 0v.09a1.7 1.7 0 0 0 1.04 1.56 1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.7 1.7 0 0 0-.34 1.87v.09c.16.7.75 1.22 1.56 1.04H19.5a2 2 0 1 1 0 4h-.09c-.7-.16-1.4.34-1.56 1.04Z" />
    </svg>
  );
}

function IconUser(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...iconBase} {...props}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M4.5 20c0-4.1 3.4-7 7.5-7s7.5 2.9 7.5 7" />
    </svg>
  );
}

function IconPulse(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...iconBase} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5v4.5l3 2" />
    </svg>
  );
}

function IconCalendar(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...iconBase} {...props}>
      <rect x="3.5" y="5" width="17" height="16" rx="2" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </svg>
  );
}

function IconSpark(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...iconBase} {...props}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.8 2.8M15.2 15.2 18 18M18 6l-2.8 2.8M8.8 15.2 6 18" />
    </svg>
  );
}

function IconFlag(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...iconBase} {...props}>
      <path d="M5 21V4" />
      <path d="M5 4h13l-3 4.5L18 13H5" />
    </svg>
  );
}

export type AdminUser = {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  emailVerified: string | null;
};

export type AdminPalette = {
  id: string;
  user_id: string;
  email: string | null;
  name: string;
  colors: { hex: string; name?: string }[];
  created_at: string;
};

export type AdminPointHistory = {
  id: string;
  user_id: string;
  action: string;
  points: number;
  created_at: string;
};

type Props = {
  adminUser: { name: string | null; email: string; image: string | null };
  users: AdminUser[];
  palettes: AdminPalette[];
  points: { user_id: string; total: number; streak: number }[];
  history: AdminPointHistory[];
  challenge: { theme: string; updatedAt: string | null; updatedBy: string | null };
};

/* ─── Helpers ────────────────────────────────────────────────────────── */

function formatDate(value: string | null) {
  if (!value) return "—";
  return new Date(value).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });
}

function isWithinDays(value: string | null, days: number) {
  if (!value) return false;
  return Date.now() - new Date(value).getTime() <= days * 24 * 60 * 60 * 1000;
}

function lastNDays(n: number) {
  return Array.from({ length: n }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (n - 1 - i));
    return d.toISOString().slice(0, 10);
  });
}

function dayLabel(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
}

function bucketByDay<T>(items: T[], getDate: (item: T) => string, days: string[]) {
  const counts = new Map(days.map((d) => [d, 0]));
  for (const item of items) {
    const day = getDate(item).slice(0, 10);
    if (counts.has(day)) counts.set(day, (counts.get(day) ?? 0) + 1);
  }
  return days.map((d) => ({ label: dayLabel(d), value: counts.get(d) ?? 0 }));
}

const PAGE_SIZE = 20;
const CHART_COLORS = ["#f97316", "#fb923c", "#fbbf24", "#f472b6", "#a78bfa", "#60a5fa", "#34d399"];

/* ─── Small chart primitives (no chart library — kept intentionally light) ─ */

function MiniBarChart({ data, color = "#f97316" }: { data: { label: string; value: number }[]; color?: string }) {
  const max = Math.max(1, ...data.map((d) => d.value));
  return (
    <div className="flex h-28 items-end gap-1">
      {data.map((d, i) => (
        <div key={i} className="group relative flex-1">
          <div className="pointer-events-none absolute -top-6 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded bg-black px-1.5 py-0.5 text-[10px] text-white group-hover:block">
            {d.label}: {d.value}
          </div>
          <div
            className="w-full rounded-t transition-opacity group-hover:opacity-100"
            style={{ height: `${Math.max(3, (d.value / max) * 100)}%`, backgroundColor: color, opacity: d.value === 0 ? 0.12 : 0.75 }}
          />
        </div>
      ))}
    </div>
  );
}

function DonutChart({ data }: { data: { label: string; value: number; color: string }[] }) {
  const total = data.reduce((a, d) => a + d.value, 0);
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  let cumulative = 0;

  return (
    <div className="flex flex-wrap items-center gap-6">
      <svg viewBox="0 0 100 100" className="h-28 w-28 shrink-0 -rotate-90">
        <circle cx="50" cy="50" r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="14" />
        {total > 0 &&
          data.map((d) => {
            const fraction = d.value / total;
            const dash = fraction * circumference;
            const offset = -cumulative * circumference;
            cumulative += fraction;
            return (
              <circle
                key={d.label}
                cx="50"
                cy="50"
                r={radius}
                fill="none"
                stroke={d.color}
                strokeWidth="14"
                strokeDasharray={`${dash} ${circumference - dash}`}
                strokeDashoffset={offset}
              />
            );
          })}
      </svg>
      <ul className="space-y-1.5 text-sm">
        {data.length === 0 && <li className="text-white/30">No data yet.</li>}
        {data.map((d) => (
          <li key={d.label} className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: d.color }} />
            <span className="text-white/70">{d.label}</span>
            <span className="text-white/40">{d.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Pager({ page, pageCount, onChange }: { page: number; pageCount: number; onChange: (page: number) => void }) {
  if (pageCount <= 1) return null;
  return (
    <div className="flex items-center justify-between gap-3 border-t border-white/10 px-4 py-3 text-sm">
      <span className="text-white/40">
        Page {page + 1} of {pageCount}
      </span>
      <div className="flex gap-2">
        <button
          onClick={() => onChange(Math.max(0, page - 1))}
          disabled={page === 0}
          className="rounded-lg border border-white/10 px-3 py-1 text-white/70 hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-30"
        >
          Prev
        </button>
        <button
          onClick={() => onChange(Math.min(pageCount - 1, page + 1))}
          disabled={page >= pageCount - 1}
          className="rounded-lg border border-white/10 px-3 py-1 text-white/70 hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-30"
        >
          Next
        </button>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon: Icon }: { label: string; value: number | string; icon: ComponentType<IconProps> }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3.5">
      <div className="flex items-center justify-between">
        <div className="text-2xl font-semibold">{value}</div>
        <Icon className="h-5 w-5 text-white/40" />
      </div>
      <div className="mt-0.5 text-xs text-white/50">{label}</div>
    </div>
  );
}

function UserPointsEditor({
  userId,
  total,
  streak,
  onSave,
}: {
  userId: string;
  total: number;
  streak: number;
  onSave: (userId: string, total: number, streak: number) => Promise<boolean>;
}) {
  const [totalInput, setTotalInput] = useState(String(total));
  const [streakInput, setStreakInput] = useState(String(streak));
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => setTotalInput(String(total)), [total]);
  useEffect(() => setStreakInput(String(streak)), [streak]);

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    const ok = await onSave(userId, Math.max(0, Math.trunc(Number(totalInput)) || 0), Math.max(0, Math.trunc(Number(streakInput)) || 0));
    setSaving(false);
    setSaved(ok);
  }

  return (
    <div>
      <div className="mb-2 text-xs font-medium uppercase tracking-wide text-white/40">Edit points / streak</div>
      <div className="flex flex-wrap items-end gap-2">
        <div>
          <label className="block text-[11px] text-white/40">Points</label>
          <input
            type="number"
            min={0}
            value={totalInput}
            onChange={(e) => {
              setTotalInput(e.target.value);
              setSaved(false);
            }}
            className="mt-1 w-24 rounded-lg border border-white/10 bg-white/5 px-2 py-1.5 text-sm outline-none focus:border-white/30"
          />
        </div>
        <div>
          <label className="block text-[11px] text-white/40">Streak</label>
          <input
            type="number"
            min={0}
            value={streakInput}
            onChange={(e) => {
              setStreakInput(e.target.value);
              setSaved(false);
            }}
            className="mt-1 w-24 rounded-lg border border-white/10 bg-white/5 px-2 py-1.5 text-sm outline-none focus:border-white/30"
          />
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="rounded-lg bg-orange-500 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-orange-400 disabled:opacity-50"
        >
          {saving ? "Saving…" : "Save"}
        </button>
        {saved && <span className="text-xs text-green-300">✓ Updated</span>}
      </div>
    </div>
  );
}

/* ─── Sections ───────────────────────────────────────────────────────── */

const NAV = [
  { id: "overview", label: "Overview", icon: IconOverview },
  { id: "users", label: "Users", icon: IconUsers },
  { id: "palettes", label: "Palettes", icon: IconPalette },
  { id: "activity", label: "Activity", icon: IconActivity },
  { id: "challenge", label: "Challenge", icon: IconFlag },
  { id: "profile", label: "Profile", icon: IconSettings },
] as const;
type Section = (typeof NAV)[number]["id"];

export function AdminDashboard({ adminUser, users, palettes, points, history, challenge }: Props) {
  const [section, setSection] = useState<Section>("overview");
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [usersPage, setUsersPage] = useState(0);
  const [palettesPage, setPalettesPage] = useState(0);
  const [historyPage, setHistoryPage] = useState(0);
  const [currentTheme, setCurrentTheme] = useState(challenge.theme);
  const [themePreset, setThemePreset] = useState(THEMES.includes(challenge.theme as (typeof THEMES)[number]) ? challenge.theme : "custom");
  const [customTheme, setCustomTheme] = useState(THEMES.includes(challenge.theme as (typeof THEMES)[number]) ? "" : challenge.theme);
  const [savingTheme, setSavingTheme] = useState(false);
  const [themeSaved, setThemeSaved] = useState(false);

  async function saveTheme() {
    const theme = themePreset === "custom" ? customTheme.trim() : themePreset;
    if (!theme) return;
    setSavingTheme(true);
    setThemeSaved(false);
    try {
      const res = await fetch("/api/admin/daily-challenge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ theme }),
      });
      if (res.ok) {
        setCurrentTheme(theme);
        setThemeSaved(true);
      }
    } finally {
      setSavingTheme(false);
    }
  }

  const [pointsOverride, setPointsOverride] = useState<Map<string, number>>(new Map());
  const [streakOverride, setStreakOverride] = useState<Map<string, number>>(new Map());
  const pointsByUser = useMemo(() => {
    const map = new Map(points.map((p) => [p.user_id, p.total]));
    for (const [id, v] of pointsOverride) map.set(id, v);
    return map;
  }, [points, pointsOverride]);
  const rawStreakByUser = useMemo(() => new Map(points.map((p) => [p.user_id, p.streak])), [points]);
  const palettesByUser = useMemo(() => {
    const map = new Map<string, AdminPalette[]>();
    for (const p of palettes) {
      if (!map.has(p.user_id)) map.set(p.user_id, []);
      map.get(p.user_id)!.push(p);
    }
    return map;
  }, [palettes]);
  const historyByUser = useMemo(() => {
    const map = new Map<string, AdminPointHistory[]>();
    for (const h of history) {
      if (!map.has(h.user_id)) map.set(h.user_id, []);
      map.get(h.user_id)!.push(h);
    }
    return map;
  }, [history]);
  const emailByUser = useMemo(() => new Map(users.map((u) => [u.id, u.email])), [users]);
  const streakByUser = useMemo(() => {
    const map = new Map(rawStreakByUser);
    for (const [id, v] of streakOverride) map.set(id, v);
    return map;
  }, [rawStreakByUser, streakOverride]);

  async function saveUserPoints(userId: string, total: number, streak: number) {
    const res = await fetch("/api/admin/user-points", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, total, streak }),
    });
    if (res.ok) {
      setPointsOverride((m) => new Map(m).set(userId, total));
      setStreakOverride((m) => new Map(m).set(userId, streak));
      return true;
    }
    return false;
  }

  const filteredUsers = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return users;
    return users.filter((u) => u.email.toLowerCase().includes(q) || (u.name ?? "").toLowerCase().includes(q));
  }, [users, search]);

  const usersPageCount = Math.max(1, Math.ceil(filteredUsers.length / PAGE_SIZE));
  const usersPageClamped = Math.min(usersPage, usersPageCount - 1);
  const pagedUsers = filteredUsers.slice(usersPageClamped * PAGE_SIZE, usersPageClamped * PAGE_SIZE + PAGE_SIZE);

  const palettesPageCount = Math.max(1, Math.ceil(palettes.length / PAGE_SIZE));
  const palettesPageClamped = Math.min(palettesPage, palettesPageCount - 1);
  const pagedPalettes = palettes.slice(palettesPageClamped * PAGE_SIZE, palettesPageClamped * PAGE_SIZE + PAGE_SIZE);

  const historyPageCount = Math.max(1, Math.ceil(history.length / PAGE_SIZE));
  const historyPageClamped = Math.min(historyPage, historyPageCount - 1);
  const pagedHistory = history.slice(historyPageClamped * PAGE_SIZE, historyPageClamped * PAGE_SIZE + PAGE_SIZE);

  const totalPointsIssued = useMemo(() => [...pointsByUser.values()].reduce((a, b) => a + b, 0), [pointsByUser]);
  const activeToday = useMemo(() => users.filter((u) => isWithinDays(u.emailVerified, 1)).length, [users]);
  const activeThisWeek = useMemo(() => users.filter((u) => isWithinDays(u.emailVerified, 7)).length, [users]);

  const days14 = useMemo(() => lastNDays(14), []);
  const signupsByDay = useMemo(() => bucketByDay(users, (u) => u.emailVerified ?? "", days14), [users, days14]);
  const palettesByDay = useMemo(() => bucketByDay(palettes, (p) => p.created_at, days14), [palettes, days14]);
  const pointsByAction = useMemo(() => {
    const map = new Map<string, number>();
    for (const h of history) map.set(h.action, (map.get(h.action) ?? 0) + h.points);
    return [...map.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([label, value], i) => ({ label, value, color: CHART_COLORS[i % CHART_COLORS.length] }));
  }, [history]);

  const stats = [
    { label: "Total users", value: users.length, icon: IconUser },
    { label: "Active today", value: activeToday, icon: IconPulse },
    { label: "Active this week", value: activeThisWeek, icon: IconCalendar },
    { label: "Total palettes", value: palettes.length, icon: IconPalette },
    { label: "Points issued", value: totalPointsIssued, icon: IconSpark },
    { label: "Point events", value: history.length, icon: IconActivity },
  ];

  return (
    <div className="min-h-screen bg-[#160b05] text-white">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-4 sm:px-6 lg:px-8">
        <span className="text-lg font-semibold">HueFlow Admin</span>
        <Link href="/" className="text-sm text-white/50 hover:text-white">
          ← Back to site
        </Link>
      </div>
      <div className="mx-auto flex max-w-[1500px] gap-8 px-4 py-8 sm:px-6 lg:px-8">
        {/* Sidebar */}
        <aside className="hidden w-60 shrink-0 md:block">
          <div className="sticky top-8 rounded-2xl border border-white/10 bg-white/[0.03] p-3">
            <div className="px-2 pb-2 pt-1 text-[11px] font-medium uppercase tracking-wider text-white/30">Menu</div>
            <nav className="space-y-1">
              {NAV.map((n) => {
                const isActive = section === n.id;
                return (
                  <button
                    key={n.id}
                    onClick={() => setSection(n.id)}
                    className={`group relative flex w-full items-center gap-3 rounded-xl px-2.5 py-2 text-left text-sm font-medium transition-colors ${
                      isActive ? "bg-orange-500/10 text-orange-300" : "text-white/60 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span
                      className={`absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-full transition-opacity ${
                        isActive ? "bg-orange-400 opacity-100" : "opacity-0"
                      }`}
                    />
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors ${
                        isActive ? "bg-orange-500/20" : "bg-white/5 group-hover:bg-white/10"
                      }`}
                    >
                      <n.icon className="h-4 w-4" />
                    </span>
                    {n.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        <main className="min-w-0 flex-1">
          {/* Mobile section tabs */}
          <div className="mb-6 flex gap-2 overflow-x-auto md:hidden">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => setSection(n.id)}
                className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm ${
                  section === n.id ? "bg-orange-500/15 text-orange-300" : "bg-white/5 text-white/60"
                }`}
              >
                <n.icon className="h-3.5 w-3.5" />
                {n.label}
              </button>
            ))}
          </div>

          {section === "overview" && (
            <>
              <h2 className="hidden text-2xl font-semibold md:block">Overview</h2>
              <p className="mt-1 hidden text-sm text-white/60 md:block">
                Sign-in tracks last sign-in (not original join date) since that&apos;s all the schema records.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                {stats.map((s) => (
                  <StatCard key={s.label} {...s} />
                ))}
              </div>

              <div className="mt-8 grid gap-4 lg:grid-cols-2">
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="text-sm font-medium text-white/80">Sign-ins — last 14 days</div>
                  <div className="mt-4">
                    <MiniBarChart data={signupsByDay} color="#f97316" />
                  </div>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="text-sm font-medium text-white/80">Palettes saved — last 14 days</div>
                  <div className="mt-4">
                    <MiniBarChart data={palettesByDay} color="#60a5fa" />
                  </div>
                </div>
              </div>

              <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="text-sm font-medium text-white/80">Points by action</div>
                <div className="mt-4">
                  <DonutChart data={pointsByAction} />
                </div>
              </div>
            </>
          )}

          {section === "users" && (
            <section>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-xl font-medium">Users</h2>
                <input
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setUsersPage(0);
                  }}
                  placeholder="Search by name or email…"
                  className="w-full max-w-xs rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none placeholder:text-white/30 focus:border-white/30"
                />
              </div>
              <div className="mt-4 overflow-x-auto rounded-xl border border-white/10">
                <table className="w-full min-w-[920px] text-left text-sm">
                  <thead className="bg-white/5 text-white/60">
                    <tr>
                      <th className="px-4 py-3 font-medium">User</th>
                      <th className="px-4 py-3 font-medium">Email</th>
                      <th className="px-4 py-3 font-medium">Palettes</th>
                      <th className="px-4 py-3 font-medium">Points</th>
                      <th className="px-4 py-3 font-medium">Streak</th>
                      <th className="px-4 py-3 font-medium">Last sign-in</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pagedUsers.map((u) => {
                      const isOpen = expandedId === u.id;
                      const userPalettes = palettesByUser.get(u.id) ?? [];
                      const userHistory = historyByUser.get(u.id) ?? [];
                      return (
                        <Fragment key={u.id}>
                          <tr
                            onClick={() => setExpandedId(isOpen ? null : u.id)}
                            className="cursor-pointer border-t border-white/10 hover:bg-white/5"
                          >
                            <td className="px-4 py-3">
                              <span className="mr-2 inline-block w-3 text-white/30">{isOpen ? "▾" : "▸"}</span>
                              {u.name ?? "—"}
                            </td>
                            <td className="px-4 py-3 text-white/70">{u.email}</td>
                            <td className="px-4 py-3">{userPalettes.length}</td>
                            <td className="px-4 py-3">{pointsByUser.get(u.id) ?? 0}</td>
                            <td className="px-4 py-3">
                              {(streakByUser.get(u.id) ?? 0) > 0 ? `🔥 ${streakByUser.get(u.id)}` : "—"}
                            </td>
                            <td className="px-4 py-3 text-white/50">{formatDate(u.emailVerified)}</td>
                          </tr>
                          {isOpen && (
                            <tr className="border-t border-white/10 bg-white/[0.03]">
                              <td colSpan={6} className="px-4 py-4">
                                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                  <div>
                                    <div className="mb-2 text-xs font-medium uppercase tracking-wide text-white/40">
                                      Palettes ({userPalettes.length})
                                    </div>
                                    {userPalettes.length === 0 ? (
                                      <div className="text-sm text-white/30">None saved.</div>
                                    ) : (
                                      <ul className="space-y-2">
                                        {userPalettes.map((p) => (
                                          <li key={p.id} className="flex items-center gap-2 text-sm">
                                            <div className="flex gap-0.5">
                                              {(p.colors ?? []).map((c, i) => (
                                                <span
                                                  key={i}
                                                  className="h-4 w-4 rounded-full border border-white/20"
                                                  style={{ backgroundColor: c.hex }}
                                                  title={c.hex}
                                                />
                                              ))}
                                            </div>
                                            <span>{p.name}</span>
                                            <span className="text-white/40">· {formatDate(p.created_at)}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    )}
                                  </div>
                                  <div>
                                    <div className="mb-2 text-xs font-medium uppercase tracking-wide text-white/40">
                                      Point history ({userHistory.length})
                                    </div>
                                    {userHistory.length === 0 ? (
                                      <div className="text-sm text-white/30">None yet.</div>
                                    ) : (
                                      <ul className="space-y-1.5">
                                        {userHistory.map((h) => (
                                          <li key={h.id} className="flex justify-between text-sm">
                                            <span className="text-white/70">{h.action}</span>
                                            <span className="text-white/40">
                                              +{h.points} · {formatDate(h.created_at)}
                                            </span>
                                          </li>
                                        ))}
                                      </ul>
                                    )}
                                  </div>
                                  <div>
                                    <UserPointsEditor
                                      userId={u.id}
                                      total={pointsByUser.get(u.id) ?? 0}
                                      streak={streakByUser.get(u.id) ?? 0}
                                      onSave={saveUserPoints}
                                    />
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}
                        </Fragment>
                      );
                    })}
                    {filteredUsers.length === 0 && (
                      <tr>
                        <td colSpan={6} className="px-4 py-6 text-center text-white/40">
                          No matching users.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
                <Pager page={usersPageClamped} pageCount={usersPageCount} onChange={setUsersPage} />
              </div>
            </section>
          )}

          {section === "palettes" && (
            <section>
              <h2 className="text-xl font-medium">All palettes</h2>
              <div className="mt-4 overflow-x-auto rounded-xl border border-white/10">
                <table className="w-full min-w-[720px] text-left text-sm">
                  <thead className="bg-white/5 text-white/60">
                    <tr>
                      <th className="px-4 py-3 font-medium">Name</th>
                      <th className="px-4 py-3 font-medium">Owner</th>
                      <th className="px-4 py-3 font-medium">Colors</th>
                      <th className="px-4 py-3 font-medium">Saved</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pagedPalettes.map((p) => (
                      <tr key={p.id} className="border-t border-white/10">
                        <td className="px-4 py-3">{p.name}</td>
                        <td className="px-4 py-3 text-white/70">{p.email ?? emailByUser.get(p.user_id) ?? p.user_id}</td>
                        <td className="px-4 py-3">
                          <div className="flex gap-1">
                            {(p.colors ?? []).map((c, i) => (
                              <span
                                key={i}
                                className="h-5 w-5 rounded-full border border-white/20"
                                style={{ backgroundColor: c.hex }}
                                title={c.hex}
                              />
                            ))}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-white/50">{formatDate(p.created_at)}</td>
                      </tr>
                    ))}
                    {palettes.length === 0 && (
                      <tr>
                        <td colSpan={4} className="px-4 py-6 text-center text-white/40">
                          No palettes saved yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
                <Pager page={palettesPageClamped} pageCount={palettesPageCount} onChange={setPalettesPage} />
              </div>
            </section>
          )}

          {section === "activity" && (
            <section>
              <h2 className="text-xl font-medium">Recent point activity</h2>
              <div className="mt-4 overflow-x-auto rounded-xl border border-white/10">
                <table className="w-full min-w-[720px] text-left text-sm">
                  <thead className="bg-white/5 text-white/60">
                    <tr>
                      <th className="px-4 py-3 font-medium">User</th>
                      <th className="px-4 py-3 font-medium">Action</th>
                      <th className="px-4 py-3 font-medium">Points</th>
                      <th className="px-4 py-3 font-medium">When</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pagedHistory.map((h) => (
                      <tr key={h.id} className="border-t border-white/10">
                        <td className="px-4 py-3 text-white/70">{emailByUser.get(h.user_id) ?? h.user_id}</td>
                        <td className="px-4 py-3">{h.action}</td>
                        <td className="px-4 py-3">+{h.points}</td>
                        <td className="px-4 py-3 text-white/50">{formatDate(h.created_at)}</td>
                      </tr>
                    ))}
                    {history.length === 0 && (
                      <tr>
                        <td colSpan={4} className="px-4 py-6 text-center text-white/40">
                          No point activity yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
                <Pager page={historyPageClamped} pageCount={historyPageCount} onChange={setHistoryPage} />
              </div>
            </section>
          )}

          {section === "challenge" && (
            <section className="max-w-lg">
              <h2 className="text-xl font-medium">Daily Challenge</h2>
              <p className="mt-1 text-sm text-white/60">
                The theme shown on the homepage banner. Users complete it for points and a streak.
              </p>

              <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-5">
                <div className="text-xs font-medium uppercase tracking-wide text-white/40">Currently live</div>
                <div className="mt-1.5 text-lg font-semibold text-orange-300">{currentTheme}</div>
                {challenge.updatedAt && (
                  <div className="mt-1 text-xs text-white/40">
                    Last set {formatDate(challenge.updatedAt)}
                    {challenge.updatedBy ? ` by ${challenge.updatedBy}` : ""}
                  </div>
                )}

                <div className="mt-5 border-t border-white/10 pt-5">
                  <label className="text-xs font-medium uppercase tracking-wide text-white/40">Pick a new theme</label>
                  <select
                    value={themePreset}
                    onChange={(e) => setThemePreset(e.target.value)}
                    className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-white/30"
                  >
                    {THEMES.map((t) => (
                      <option key={t} value={t} className="bg-[#1a0f08]">
                        {t}
                      </option>
                    ))}
                    <option value="custom" className="bg-[#1a0f08]">
                      Custom…
                    </option>
                  </select>

                  {themePreset === "custom" && (
                    <input
                      value={customTheme}
                      onChange={(e) => setCustomTheme(e.target.value)}
                      placeholder="Type a custom theme…"
                      className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none placeholder:text-white/30 focus:border-white/30"
                    />
                  )}

                  <button
                    onClick={saveTheme}
                    disabled={savingTheme || (themePreset === "custom" && !customTheme.trim())}
                    className="mt-4 w-full rounded-lg bg-gradient-to-r from-[#F15B2A] to-[#C94B1A] px-4 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.01] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {savingTheme ? "Saving…" : "Set as today's challenge"}
                  </button>
                  {themeSaved && <div className="mt-2 text-center text-xs text-green-300">✓ Updated — live on the homepage now.</div>}
                </div>
              </div>
            </section>
          )}

          {section === "profile" && (
            <section className="max-w-md">
              <h2 className="text-xl font-medium">Profile</h2>
              <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-5">
                <div className="flex items-center gap-4">
                  {adminUser.image ? (
                    <Image
                      src={adminUser.image}
                      alt={adminUser.name ?? adminUser.email}
                      width={56}
                      height={56}
                      className="h-14 w-14 rounded-full"
                    />
                  ) : (
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-500/20 text-lg font-semibold text-orange-300">
                      {(adminUser.name ?? adminUser.email)[0]?.toUpperCase()}
                    </div>
                  )}
                  <div>
                    <div className="font-medium">{adminUser.name ?? "Admin"}</div>
                    <div className="text-sm text-white/50">{adminUser.email}</div>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 rounded-lg bg-orange-500/10 px-3 py-2 text-xs text-orange-300">
                  <IconSpark className="h-3.5 w-3.5" /> Full admin access
                </div>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="mt-5 w-full rounded-lg border border-white/10 px-4 py-2 text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white"
                >
                  Sign out
                </button>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
