"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useSession, signOut, signIn } from "next-auth/react";
import { Header } from "./header";
import { encodePalette } from "@/lib/share-utils";
import {
  deleteGradient,
  getSavedGradients,
  type SavedGradient,
  type SavedPalette,
} from "@/lib/storage";
import { usePaletteStorage } from "@/hooks/use-palette-storage";

type Tab = "palettes" | "gradients";

export function ProfilePage() {
  const { data: session } = useSession();
  const [tab, setTab] = useState<Tab>("palettes");
  const [palettes, setPalettes] = useState<SavedPalette[]>([]);
  const [gradients, setGradients] = useState<SavedGradient[]>([]);
  const [mounted, setMounted] = useState(false);
  const [signOutModal, setSignOutModal] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const { getPalettes, deletePalette } = usePaletteStorage();

  useEffect(() => {
    getPalettes().then(setPalettes);
    setGradients(getSavedGradients());
    setMounted(true);
  }, [getPalettes]);

  async function handleDeletePalette(id: string) {
    await deletePalette(id);
    setPalettes(await getPalettes());
  }

  function handleDeleteGradient(id: string) {
    deleteGradient(id);
    setGradients(getSavedGradients());
  }

  function handleCopyLink(p: SavedPalette) {
    navigator.clipboard.writeText(`${window.location.origin}/generator${encodePalette(p)}`);
    setCopiedId(p.id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  const user = session?.user;
  const initials = user?.name?.split(" ").map((n) => n[0]).join("").toUpperCase() ?? "?";

  return (
    <main className="relative min-h-screen bg-[#160b05] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_-10%,rgba(249,115,22,0.18),transparent_55%)]" />
      <Header />

      <div className="relative mx-auto max-w-6xl px-4 pb-24 pt-24 sm:px-6 sm:pt-32">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">

          {/* ── Sidebar ── */}
          <aside className="w-full shrink-0 lg:w-56 xl:w-64">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#1c0d06]/80 backdrop-blur-xl">

              {/* Avatar header */}
              <div className="relative px-5 pb-4 pt-6 text-center">
                <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-orange-500/10 to-transparent" />
                <div className="relative mx-auto mb-3 inline-block">
                  {user?.image ? (
                    <Image
                      src={user.image}
                      alt="avatar"
                      width={72}
                      height={72}
                      className="rounded-full ring-2 ring-orange-500/30 ring-offset-2 ring-offset-[#1c0d06]"
                    />
                  ) : (
                    <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-orange-600 text-2xl font-bold text-white ring-2 ring-orange-500/30 ring-offset-2 ring-offset-[#1c0d06]">
                      {initials}
                    </div>
                  )}
                  <span className="absolute bottom-0.5 right-0.5 h-3 w-3 rounded-full border-2 border-[#1c0d06] bg-green-400" />
                </div>
                <p className="text-sm font-semibold text-white leading-tight">{user?.name ?? "Guest"}</p>
                <p className="mt-0.5 break-all text-[11px] leading-tight text-white/35">
                  {user?.email ?? "Not signed in"}
                </p>
                <span className="mt-2.5 inline-flex items-center gap-1.5 rounded-full border border-orange-500/25 bg-orange-500/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-orange-400">
                  <span className="h-1 w-1 rounded-full bg-orange-400" />
                  Free Member
                </span>
              </div>

              {/* Stats */}
              <div className="mx-4 mb-4 grid grid-cols-2 gap-2">
                <div className="rounded-xl bg-white/4 px-3 py-2.5 text-center">
                  <p className="text-lg font-bold tabular-nums text-white">
                    {mounted ? palettes.length : "–"}
                  </p>
                  <p className="mt-0.5 text-[10px] text-white/35">Palettes</p>
                </div>
                <div className="rounded-xl bg-white/4 px-3 py-2.5 text-center">
                  <p className="text-lg font-bold tabular-nums text-white">
                    {mounted ? gradients.length : "–"}
                  </p>
                  <p className="mt-0.5 text-[10px] text-white/35">Gradients</p>
                </div>
              </div>

              <div className="mx-4 border-t border-white/8" />

              {/* Nav */}
              <nav className="flex flex-col gap-0.5 p-2">
                {(
                  [
                    { key: "palettes", label: "Saved Palettes", count: palettes.length },
                    { key: "gradients", label: "Saved Gradients", count: gradients.length },
                  ] as const
                ).map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setTab(item.key)}
                    className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-all ${
                      tab === item.key
                        ? "bg-orange-500/15 text-orange-300"
                        : "text-white/45 hover:bg-white/5 hover:text-white/75"
                    }`}
                  >
                    {item.key === "palettes" ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="7" height="7" rx="1" />
                        <rect x="14" y="3" width="7" height="7" rx="1" />
                        <rect x="3" y="14" width="7" height="7" rx="1" />
                        <rect x="14" y="14" width="7" height="7" rx="1" />
                      </svg>
                    ) : (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 2a10 10 0 010 20" />
                      </svg>
                    )}
                    {item.label}
                    <span className={`ml-auto text-[11px] font-semibold tabular-nums ${tab === item.key ? "text-orange-400" : "text-white/20"}`}>
                      {mounted ? item.count : ""}
                    </span>
                  </button>
                ))}
              </nav>

              <div className="mx-4 border-t border-white/8" />

              {/* Actions */}
              <div className="flex flex-col gap-2 p-3">
                <Link
                  href="/generator"
                  className="flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                  Generate Palette
                </Link>
                {user ? (
                  <button
                    onClick={() => setSignOutModal(true)}
                    className="rounded-xl border border-white/8 px-4 py-2.5 text-sm font-medium text-white/35 transition-colors hover:border-red-500/25 hover:text-red-400/80"
                  >
                    Sign out
                  </button>
                ) : (
                  <button
                    onClick={() => signIn("google")}
                    className="rounded-xl border border-white/8 px-4 py-2.5 text-sm font-medium text-white/45 transition-colors hover:bg-white/5 hover:text-white"
                  >
                    Sign in with Google
                  </button>
                )}
              </div>
            </div>
          </aside>

          {/* ── Main content ── */}
          <div className="min-w-0 flex-1">

            {/* Header */}
            <div className="mb-5">
              <p className="mb-1 text-[11px] font-semibold uppercase tracking-widest text-orange-400/60">
                My Library
              </p>
              <h1 className="text-2xl font-bold text-white">
                {tab === "palettes" ? "Saved Palettes" : "Saved Gradients"}
              </h1>
            </div>

            {/* Tab switcher */}
            <div className="mb-5 flex w-fit items-center gap-1 rounded-xl border border-white/8 bg-white/3 p-1">
              {(["palettes", "gradients"] as Tab[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`relative rounded-lg px-4 py-1.5 text-sm font-medium capitalize transition-colors ${
                    tab === t ? "text-white" : "text-white/40 hover:text-white/65"
                  }`}
                >
                  {tab === t && (
                    <motion.span
                      layoutId="tab-bg"
                      className="absolute inset-0 rounded-lg bg-white/10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.35 }}
                    />
                  )}
                  <span className="relative">{t}</span>
                </button>
              ))}
            </div>

            {/* Content with animated transitions */}
            <AnimatePresence mode="wait">
              {!mounted ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center py-24 text-sm text-white/20"
                >
                  Loading...
                </motion.div>
              ) : tab === "palettes" ? (
                <motion.div
                  key="palettes"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                >
                  {palettes.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 py-24 text-center">
                      <div className="mb-4 flex gap-2">
                        {["#C94B1A", "#7FBE6B", "#F4B93F", "#F15B2A", "#241008"].map((c) => (
                          <div key={c} className="h-8 w-8 rounded-full border border-white/10" style={{ backgroundColor: c }} />
                        ))}
                      </div>
                      <p className="text-sm font-medium text-white/40">No saved palettes yet</p>
                      <p className="mt-1 text-xs text-white/22">Save one from the generator to see it here.</p>
                      <Link
                        href="/generator"
                        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-orange-500/80 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-500"
                      >
                        Open Generator
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                          <path d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                      </Link>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {palettes.map((p) => (
                        <motion.div
                          key={p.id}
                          layout
                          exit={{ opacity: 0, scale: 0.97 }}
                          className="group overflow-hidden rounded-2xl border border-white/10 bg-[#1c0d06]/60 transition-all duration-200 hover:border-white/16"
                        >
                          {/* Color swatch strip — click individual color to copy hex */}
                          <div className="flex h-28">
                            {p.colors.map((c, i) => (
                              <div
                                key={i}
                                className="relative flex-1 cursor-pointer overflow-hidden"
                                style={{ backgroundColor: c.hex }}
                                title={`Click to copy ${c.hex}`}
                                onClick={() => navigator.clipboard.writeText(c.hex)}
                              >
                                <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
                                  <span
                                    className="text-[8px] font-mono font-bold"
                                    style={{ color: c.text === "light" ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.7)" }}
                                  >
                                    {c.hex.toUpperCase()}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Card footer */}
                          <div className="px-4 py-3.5">
                            <div className="mb-3 flex items-center justify-between gap-2">
                              <p className="truncate text-sm font-semibold leading-tight text-white">{p.label}</p>
                              <p className="shrink-0 tabular-nums text-[10px] text-white/22">
                                {new Date(p.savedAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "2-digit" })}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Link
                                href={`/generator${encodePalette(p)}`}
                                className="flex items-center gap-1.5 rounded-lg bg-white/8 px-3 py-1.5 text-xs font-medium text-white/65 transition-colors hover:bg-white/13 hover:text-white"
                              >
                                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                                </svg>
                                Open
                              </Link>
                              <button
                                onClick={() => handleCopyLink(p)}
                                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                                  copiedId === p.id
                                    ? "bg-green-500/15 text-green-400"
                                    : "bg-white/5 text-white/45 hover:bg-white/10 hover:text-white/70"
                                }`}
                              >
                                {copiedId === p.id ? (
                                  <>
                                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                      <path d="M20 6L9 17l-5-5" />
                                    </svg>
                                    Copied
                                  </>
                                ) : (
                                  <>
                                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                      <rect x="9" y="9" width="13" height="13" rx="2" />
                                      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                                    </svg>
                                    Copy link
                                  </>
                                )}
                              </button>
                              <button
                                onClick={() => handleDeletePalette(p.id)}
                                className="ml-auto rounded-lg p-1.5 text-white/25 transition-colors hover:bg-red-500/10 hover:text-red-400"
                                title="Delete"
                              >
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="3 6 5 6 21 6" />
                                  <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6M10 11v6M14 11v6M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="gradients"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                >
                  {gradients.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 py-24 text-center">
                      <div className="mb-4 h-12 w-32 rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 opacity-50" />
                      <p className="text-sm font-medium text-white/40">No saved gradients yet</p>
                      <p className="mt-1 text-xs text-white/22">Save one from the gradient generator.</p>
                      <Link
                        href="/tools/gradient"
                        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-orange-500/80 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-500"
                      >
                        Gradient Generator
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                          <path d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                      </Link>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {gradients.map((g) => (
                        <div
                          key={g.id}
                          className="overflow-hidden rounded-2xl border border-white/10 bg-[#1c0d06]/60 transition-all duration-200 hover:border-white/16"
                        >
                          <div className="h-24 w-full" style={{ background: g.preview }} />
                          <div className="p-3.5">
                            <p className="mb-3 truncate text-sm font-medium text-white/70">{g.name}</p>
                            <div className="flex gap-2">
                              <button
                                onClick={() => navigator.clipboard.writeText(g.css)}
                                className="flex-1 rounded-lg bg-white/8 px-3 py-1.5 text-xs font-medium text-white/55 transition-colors hover:bg-white/13 hover:text-white"
                              >
                                Copy CSS
                              </button>
                              <button
                                onClick={() => handleDeleteGradient(g.id)}
                                className="rounded-lg p-1.5 text-white/25 transition-colors hover:bg-red-500/10 hover:text-red-400"
                                title="Delete"
                              >
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="3 6 5 6 21 6" />
                                  <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6M10 11v6M14 11v6M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Centered sign-out confirmation modal */}
      <AnimatePresence>
        {signOutModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[200] flex items-center justify-center px-4"
            onClick={() => setSignOutModal(false)}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 8 }}
              transition={{ duration: 0.15 }}
              className="relative w-full max-w-sm rounded-2xl border border-white/15 bg-[#1a0e06]/98 p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-red-500/15">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-red-400">
                  <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
                </svg>
              </div>
              <h3 className="mt-3 text-center text-base font-semibold text-white">Sign out?</h3>
              <p className="mt-1.5 text-center text-sm text-white/45">
                Are you sure you want to sign out of your account?
              </p>
              <div className="mt-5 flex gap-3">
                <button
                  onClick={() => setSignOutModal(false)}
                  className="flex-1 rounded-xl border border-white/10 py-2.5 text-sm font-medium text-white/50 transition-colors hover:text-white/80"
                >
                  Cancel
                </button>
                <button
                  onClick={() => { setSignOutModal(false); signOut(); }}
                  className="flex-1 rounded-xl bg-red-500 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-600"
                >
                  Sign out
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
