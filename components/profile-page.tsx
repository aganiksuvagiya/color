"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession, signOut, signIn } from "next-auth/react";
import { Header } from "./header";
import { Breadcrumbs, Dots, eyebrow } from "@/components/seo/page-ui";
import { encodePalette } from "@/lib/share-utils";
import { awardPointsClient } from "@/lib/award-points-client";
import { findClosestColorName } from "@/lib/color-names";
import {
  type SavedGradient,
  type SavedPalette,
  type Collection,
  getCollections,
  createCollection,
  deleteCollection,
  addPaletteToCollection,
  removePaletteFromCollection,
} from "@/lib/storage";
import { usePaletteStorage } from "@/hooks/use-palette-storage";
import { useGradientStorage } from "@/hooks/use-gradient-storage";

type Tab = "palettes" | "gradients" | "collections";
type Sort = "newest" | "oldest" | "name";

const DEFAULT_STRIP = ["#e8531f", "#f97316", "#eab308", "#22c55e", "#3b82f6", "#8b5cf6"];
const LEVEL_SIZE = 100;
const TABS: Tab[] = ["palettes", "gradients", "collections"];

const iconBtn = "rounded-full p-2 text-[#1c1712]/40 transition hover:bg-black/[0.05] hover:text-[#1c1712]";
const ringBtn = "rounded-full px-4 py-2 text-[13px] font-semibold text-[#1c1712]/70 ring-1 ring-black/[0.12] transition hover:text-[#1c1712] hover:ring-black/25";
const darkBtn = "rounded-full bg-[#1c1712] px-5 py-2.5 text-[14px] font-semibold text-white transition hover:bg-[#c2410c]";

function Svg({ size = 14, sw = 2, children }: { size?: number; sw?: number; children: ReactNode }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  );
}

const TrashIcon = (
  <Svg size={15}>
    <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6M10 11v6M14 11v6M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
  </Svg>
);

function Stat({ label, value, accent, children }: { label: string; value: ReactNode; accent?: boolean; children?: ReactNode }) {
  return (
    <div className="rounded-xl p-4 ring-1 ring-black/[0.07]">
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1c1712]/40">{label}</p>
      <p className={`mt-2 text-[1.9rem] font-bold leading-none tracking-[-0.03em] tabular-nums ${accent ? "text-[#c2410c]" : ""}`}>{value}</p>
      {children}
    </div>
  );
}

function Empty({ strip, title, body, cta }: { strip: string[]; title: string; body: string; cta?: { href: string; label: string } }) {
  return (
    <div className="flex flex-col items-center px-4 py-20 text-center">
      <div className="flex h-3 w-44 overflow-hidden rounded-full" aria-hidden="true">
        {strip.map((c) => <div key={c} className="flex-1" style={{ backgroundColor: c }} />)}
      </div>
      <p className="mt-6 text-[18px] font-semibold tracking-[-0.02em]">{title}</p>
      <p className="mt-1.5 max-w-sm text-[14px] leading-6 text-[#1c1712]/55">{body}</p>
      {cta && <Link href={cta.href} className={`mt-6 ${darkBtn}`}>{cta.label}</Link>}
    </div>
  );
}

export function ProfilePage() {
  const { data: session } = useSession();
  const [tab, setTab] = useState<Tab>("palettes");
  const [palettes, setPalettes] = useState<SavedPalette[]>([]);
  const [gradients, setGradients] = useState<SavedGradient[]>([]);
  const [mounted, setMounted] = useState(false);
  const [signOutModal, setSignOutModal] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [points, setPoints] = useState(0);
  const [streak, setStreak] = useState(0);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>("newest");
  const [collections, setCollections] = useState<Collection[]>([]);
  const [activeCollectionId, setActiveCollectionId] = useState<string | null>(null);
  const [newCollectionName, setNewCollectionName] = useState("");
  const [addToCollectionMenuId, setAddToCollectionMenuId] = useState<string | null>(null);
  const [copiedReferral, setCopiedReferral] = useState(false);

  const { getPalettes, deletePalette, setPalettePublic } = usePaletteStorage();
  const { getGradients, deleteGradient } = useGradientStorage();

  useEffect(() => {
    Promise.all([getPalettes(), getGradients()]).then(([p, g]) => {
      setPalettes(p);
      setGradients(g);
      setCollections(getCollections());
      setMounted(true);
    });
  }, [getPalettes, getGradients]);

  useEffect(() => {
    if (!session?.user) return;
    fetch("/api/points").then((r) => r.json()).then((d) => setPoints(d.total ?? 0)).catch(() => {});
    fetch("/api/daily-challenge").then((r) => r.json()).then((d) => setStreak(d.streak ?? 0)).catch(() => {});
  }, [session?.user]);

  async function handleDeletePalette(id: string) {
    await deletePalette(id);
    setPalettes(await getPalettes());
  }

  async function handleTogglePublic(p: SavedPalette) {
    const next = !p.isPublic;
    setPalettes((prev) => prev.map((x) => (x.id === p.id ? { ...x, isPublic: next } : x)));
    await setPalettePublic(p.id, next);
  }

  function handleCreateCollection() {
    const name = newCollectionName.trim();
    if (!name) return;
    createCollection(name);
    setCollections(getCollections());
    setNewCollectionName("");
  }

  function handleDeleteCollection(id: string) {
    deleteCollection(id);
    setCollections(getCollections());
    setActiveCollectionId((cur) => (cur === id ? null : cur));
  }

  function toggleCollectionMembership(collectionId: string, paletteId: string, inCollection: boolean) {
    if (inCollection) removePaletteFromCollection(collectionId, paletteId);
    else addPaletteToCollection(collectionId, paletteId);
    setCollections(getCollections());
  }

  async function handleDeleteGradient(id: string) {
    await deleteGradient(id);
    setGradients(await getGradients());
  }

  function handleCopyLink(p: SavedPalette) {
    navigator.clipboard.writeText(`${window.location.origin}/generator${encodePalette(p)}`);
    setCopiedId(p.id);
    awardPointsClient("SHARE_PALETTE");
    setTimeout(() => setCopiedId(null), 2000);
  }

  const user = session?.user;
  const firstName = user?.name?.split(" ")[0] ?? "there";
  const initials = user?.name?.split(" ").map((n) => n[0]).join("").toUpperCase() ?? "?";
  const referralLink = mounted && user?.id ? `${window.location.origin}/?ref=${user.id}` : "";
  const level = Math.floor(points / LEVEL_SIZE) + 1;
  const levelProgress = points % LEVEL_SIZE;

  // Accent colors: from the latest saved palette, or the defaults
  const stripColors = mounted && palettes.length > 0
    ? [...palettes].sort((a, b) => b.savedAt - a.savedAt)[0].colors.map((c) => c.hex)
    : DEFAULT_STRIP;

  function handleCopyReferral() {
    if (!referralLink) return;
    navigator.clipboard.writeText(referralLink);
    setCopiedReferral(true);
    setTimeout(() => setCopiedReferral(false), 2000);
  }

  const q = query.trim().toLowerCase();
  const visiblePalettes = useMemo(() => {
    const filtered = palettes.filter((p) => p.label.toLowerCase().includes(q));
    if (sort === "newest") return filtered.sort((a, b) => b.savedAt - a.savedAt);
    if (sort === "oldest") return filtered.sort((a, b) => a.savedAt - b.savedAt);
    return filtered.sort((a, b) => a.label.localeCompare(b.label));
  }, [palettes, q, sort]);
  const visibleGradients = useMemo(() => {
    const filtered = gradients.filter((g) => g.name.toLowerCase().includes(q));
    if (sort === "newest") return filtered.sort((a, b) => b.savedAt - a.savedAt);
    if (sort === "oldest") return filtered.sort((a, b) => a.savedAt - b.savedAt);
    return filtered.sort((a, b) => a.name.localeCompare(b.name));
  }, [gradients, q, sort]);
  const paletteById = useMemo(() => new Map(palettes.map((p) => [p.id, p])), [palettes]);
  const activeCollection = collections.find((c) => c.id === activeCollectionId) ?? null;
  const activeCollectionPalettes = useMemo(
    () => (activeCollection ? activeCollection.paletteIds.map((id) => paletteById.get(id)).filter((p): p is SavedPalette => !!p) : []),
    [activeCollection, paletteById]
  );

  const counts: Record<Tab, number> = { palettes: palettes.length, gradients: gradients.length, collections: collections.length };
  const sectionTitle = tab === "palettes" ? "Saved palettes" : tab === "gradients" ? "Saved gradients" : activeCollection ? activeCollection.name : "Collections";
  const sectionCount = tab === "palettes" ? visiblePalettes.length : tab === "gradients" ? visibleGradients.length : activeCollection ? activeCollectionPalettes.length : collections.length;

  return (
    <main className="min-h-screen bg-white text-[#1c1712]">
      <Header />

      {/* ── Header ── */}
      <section className="w-full px-6 pb-12 pt-28 sm:px-8 lg:px-12">
        <Breadcrumbs items={[{ title: "Home", href: "/" }, { title: "Profile", href: "/profile" }]} />
        <h1 className="mt-8 text-[2.6rem] font-bold leading-[1.05] tracking-[-0.035em] sm:text-[3.5rem]">Your library</h1>
        <div className="mt-5 flex max-w-3xl flex-wrap items-start gap-3">
          <span className="mt-1.5"><Dots colors={stripColors} /></span>
          <p className="hub-description min-w-0 flex-1 basis-72 text-[16px] leading-7 text-[#1c1712]/55">
            <span className="font-semibold text-[#1c1712]/80">Hey {firstName}.</span> Your saved palettes, gradients and collections live here.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {/* Identity */}
          <div className="rounded-2xl p-5 ring-1 ring-black/[0.07] sm:p-6">
            <div className="flex items-center gap-4">
              {user?.image ? (
                <Image src={user.image} alt={user.name ?? "Your profile photo"} width={64} height={64} className="h-16 w-16 shrink-0 rounded-full" />
              ) : (
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#1c1712] text-xl font-bold text-white">{initials}</div>
              )}
              <div className="min-w-0">
                <p className="truncate text-[18px] font-semibold tracking-[-0.02em]">{user?.name ?? "Guest"}</p>
                <p className="break-all text-[13px] text-[#1c1712]/50">{user?.email ?? "Not signed in"}</p>
                <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[#c2410c]/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#c2410c]">
                  <span className="h-1 w-1 rounded-full bg-[#c2410c]" />Free member
                </span>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-2.5">
              <Link href="/generator" className={darkBtn}>Generate palette</Link>
              <Link href="/tools/daily-challenge" className={`${ringBtn} flex items-center gap-2 py-2.5 text-[14px]`}>
                Daily challenge
                {streak > 0 && <span className="rounded-full bg-[#c2410c]/10 px-1.5 py-0.5 text-[11px] font-bold text-[#c2410c]">🔥 {streak}</span>}
              </Link>
              {user ? (
                <button onClick={() => setSignOutModal(true)} className={`${ringBtn} py-2.5 text-[14px] !text-[#1c1712]/55 hover:!text-red-600 hover:!ring-red-300`}>
                  Sign out
                </button>
              ) : (
                <button onClick={() => signIn("google")} className={`${ringBtn} py-2.5 text-[14px]`}>Sign in with Google</button>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 content-start gap-3">
            <Stat label="Palettes" value={mounted ? palettes.length : "–"} />
            <Stat label="Gradients" value={mounted ? gradients.length : "–"} />
            {user && (
              <>
                <Stat label="Score" value={mounted ? points : "–"} accent>
                  {mounted && (
                    <>
                      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-black/[0.07]">
                        <div className="h-full rounded-full bg-[#c2410c] transition-all duration-700" style={{ width: `${(levelProgress / LEVEL_SIZE) * 100}%` }} />
                      </div>
                      <p className="mt-1.5 text-[11px] text-[#1c1712]/45">Level {level} · {levelProgress}/{LEVEL_SIZE} pts to next</p>
                    </>
                  )}
                </Stat>
                <Stat label="Day streak" value={mounted ? <>🔥 {streak}</> : "–"} accent />
              </>
            )}
          </div>
        </div>

        {/* Referral */}
        {user && referralLink && (
          <div className="mt-5 flex flex-wrap items-center justify-between gap-x-8 gap-y-4 rounded-2xl p-5 ring-1 ring-black/[0.07] sm:px-6">
            <div>
              <p className={eyebrow}>Invite friends</p>
              <p className="mt-1 text-[15px] font-semibold">Earn +50 points for each friend you invite.</p>
            </div>
            <div className="flex min-w-0 flex-1 basis-96 flex-wrap items-center justify-end gap-2">
              <input
                readOnly
                value={referralLink}
                aria-label="Your invite link"
                onFocus={(e) => e.target.select()}
                className="min-w-0 flex-1 basis-48 truncate rounded-full bg-[#f5f5f5] px-4 py-2.5 text-[13px] text-[#1c1712]/60 outline-none ring-1 ring-transparent focus:ring-black/25"
              />
              <button onClick={handleCopyReferral} className={`shrink-0 rounded-full px-5 py-2.5 text-[13px] font-semibold text-white transition ${copiedReferral ? "bg-emerald-600" : "bg-[#1c1712] hover:bg-[#c2410c]"}`}>
                {copiedReferral ? "Copied!" : "Copy link"}
              </button>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`Join me on HueFlow — the best color palette tool! ${referralLink}`)}`}
                target="_blank" rel="noopener noreferrer"
                className={`shrink-0 ${ringBtn} py-2.5`}
              >
                WhatsApp
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent("Creating beautiful color palettes with @HueFlow ✨")}&url=${encodeURIComponent(referralLink)}`}
                target="_blank" rel="noopener noreferrer"
                className={`shrink-0 ${ringBtn} py-2.5`}
              >
                Twitter
              </a>
            </div>
          </div>
        )}
      </section>

      {/* ── Library ── */}
      <section className="border-t border-black/[0.06]">
        {/* Toolbar */}
        <div className="z-30 border-b border-black/[0.06] bg-white/95 backdrop-blur lg:sticky lg:top-[86px]">
          <div className="flex w-full flex-wrap items-center gap-3 px-6 py-3 sm:px-8 lg:px-12">
            <div className="flex flex-wrap gap-2">
              {TABS.map((t) => (
                <button
                  key={t}
                  onClick={() => { setTab(t); setQuery(""); setActiveCollectionId(null); }}
                  aria-pressed={tab === t}
                  className={`flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold capitalize transition ${
                    tab === t ? "bg-[#1c1712] text-white" : "text-[#1c1712]/65 ring-1 ring-black/[0.12] hover:text-[#1c1712] hover:ring-black/25"
                  }`}
                >
                  {t}
                  <span className={`text-[11px] font-bold tabular-nums ${tab === t ? "text-white/60" : "text-[#1c1712]/35"}`}>{mounted ? counts[t] : "·"}</span>
                </button>
              ))}
            </div>
            {tab !== "collections" && (
              <div className="flex min-w-0 flex-1 basis-64 items-center justify-end gap-2">
                <div className="relative min-w-0 flex-1 sm:max-w-xs">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1c1712]/35">
                    <circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" />
                  </svg>
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={`Search ${tab}…`}
                    aria-label={`Search ${tab}`}
                    className="w-full rounded-full bg-white py-2 pl-9 pr-4 text-[13px] outline-none ring-1 ring-black/[0.12] transition placeholder:text-[#1c1712]/35 focus:ring-black/40"
                  />
                </div>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as Sort)}
                  aria-label="Sort"
                  className="shrink-0 rounded-full bg-white px-3.5 py-2 text-[13px] font-medium text-[#1c1712]/70 outline-none ring-1 ring-black/[0.12] transition focus:ring-black/40"
                >
                  <option value="newest">Newest first</option>
                  <option value="oldest">Oldest first</option>
                  <option value="name">Name A–Z</option>
                </select>
              </div>
            )}
          </div>
        </div>

        <div className="w-full px-6 pb-20 pt-10 sm:px-8 lg:px-12">
          <div className="mb-6 flex items-baseline gap-3">
            <h2 className="text-[1.75rem] font-semibold tracking-[-0.03em]">{sectionTitle}</h2>
            {mounted && <span className="text-[15px] font-medium tabular-nums text-[#1c1712]/35">{sectionCount}</span>}
          </div>

          {!mounted ? (
            <p className="py-24 text-center text-[14px] text-[#1c1712]/40">Loading…</p>
          ) : tab === "palettes" ? (
            palettes.length === 0 ? (
              <Empty strip={DEFAULT_STRIP} title={`Hey ${firstName}, start your first palette`} body="Save a palette from the generator to see it here." cta={{ href: "/generator", label: "Open generator" }} />
            ) : visiblePalettes.length === 0 ? (
              <div className="py-20 text-center">
                <p className="text-[15px] font-medium text-[#1c1712]/55">No palettes match &quot;{query}&quot;</p>
                <button onClick={() => setQuery("")} className="mt-3 text-[13px] font-semibold text-[#c2410c] hover:underline">Clear search</button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {visiblePalettes.map((p) => (
                  <div key={p.id} className="group rounded-2xl ring-1 ring-black/[0.07] transition hover:ring-black/25">
                    {/* Color strip — names show on hover */}
                    <div className="flex h-32 overflow-hidden rounded-t-2xl">
                      {p.colors.map((c, i) => (
                        <div
                          key={i}
                          className="relative flex-1 cursor-pointer overflow-hidden"
                          style={{ backgroundColor: c.hex }}
                          title={`Click to copy ${c.hex}`}
                          onClick={() => navigator.clipboard.writeText(c.hex)}
                        >
                          <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5 bg-black/25 px-0.5 text-center opacity-0 transition-opacity group-hover:opacity-100">
                            <span className="text-[9px] font-bold leading-tight" style={{ color: c.text === "light" ? "rgba(255,255,255,0.95)" : "rgba(0,0,0,0.8)" }}>
                              {findClosestColorName(c.hex)}
                            </span>
                            <span className="font-mono text-[8px]" style={{ color: c.text === "light" ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.55)" }}>
                              {c.hex.toUpperCase()}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="px-4 py-3.5">
                      <div className="flex items-center justify-between gap-2">
                        <p className="truncate text-[15px] font-semibold tracking-[-0.01em]">{p.label}</p>
                        <p className="shrink-0 text-[11px] tabular-nums text-[#1c1712]/40">
                          {new Date(p.savedAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "2-digit" })}
                        </p>
                      </div>
                      <div className="mt-3 flex items-center gap-1.5">
                        <Link href={`/generator${encodePalette(p)}`} className="rounded-full px-3.5 py-1.5 text-[12px] font-semibold text-[#1c1712]/70 ring-1 ring-black/[0.12] transition hover:text-[#1c1712] hover:ring-black/25">
                          Open
                        </Link>
                        <button
                          onClick={() => handleCopyLink(p)}
                          className={`rounded-full px-3.5 py-1.5 text-[12px] font-semibold ring-1 transition ${
                            copiedId === p.id ? "bg-emerald-50 text-emerald-700 ring-emerald-200" : "text-[#1c1712]/70 ring-black/[0.12] hover:text-[#1c1712] hover:ring-black/25"
                          }`}
                        >
                          {copiedId === p.id ? "Copied" : "Share"}
                        </button>
                        <button
                          onClick={() => handleTogglePublic(p)}
                          className={`ml-auto ${iconBtn} ${p.isPublic ? "!text-[#c2410c]" : ""}`}
                          title={p.isPublic ? "Public" : "Make public"}
                          aria-label={p.isPublic ? "Public — click to make private" : "Make public"}
                        >
                          <Svg size={15}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18" /></Svg>
                        </button>
                        <div className="relative">
                          <button
                            onClick={() => setAddToCollectionMenuId((cur) => (cur === p.id ? null : p.id))}
                            className={iconBtn}
                            title="Add to collection"
                            aria-label="Add to collection"
                          >
                            <Svg size={15}><path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" /><path d="M12 11v4M10 13h4" /></Svg>
                          </button>
                          {addToCollectionMenuId === p.id && (
                            <div className="absolute right-0 top-full z-20 mt-1.5 w-52 rounded-xl bg-white p-1.5 shadow-xl ring-1 ring-black/[0.1]">
                              {collections.length === 0 ? (
                                <p className="px-2.5 py-2 text-[12px] text-[#1c1712]/50">No collections yet.</p>
                              ) : (
                                collections.map((c) => {
                                  const inCollection = c.paletteIds.includes(p.id);
                                  return (
                                    <button
                                      key={c.id}
                                      onClick={() => toggleCollectionMembership(c.id, p.id, inCollection)}
                                      className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-[13px] font-medium text-[#1c1712]/70 transition hover:bg-black/[0.04] hover:text-[#1c1712]"
                                    >
                                      <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${inCollection ? "border-[#c2410c] bg-[#c2410c]/10 text-[#c2410c]" : "border-black/[0.2]"}`}>
                                        {inCollection && <Svg size={10} sw={3}><path d="M20 6L9 17l-5-5" /></Svg>}
                                      </span>
                                      <span className="truncate">{c.name}</span>
                                    </button>
                                  );
                                })
                              )}
                            </div>
                          )}
                        </div>
                        <button onClick={() => handleDeletePalette(p.id)} className={`${iconBtn} hover:!bg-red-50 hover:!text-red-500`} title="Delete" aria-label="Delete palette">
                          {TrashIcon}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : tab === "gradients" ? (
            gradients.length === 0 ? (
              <Empty strip={["#8b5cf6", "#ec4899", "#e8531f", "#eab308"]} title={`Hey ${firstName}, create your first gradient`} body="Save a gradient from the gradient generator to see it here." cta={{ href: "/tools/gradient", label: "Gradient generator" }} />
            ) : visibleGradients.length === 0 ? (
              <div className="py-20 text-center">
                <p className="text-[15px] font-medium text-[#1c1712]/55">No gradients match &quot;{query}&quot;</p>
                <button onClick={() => setQuery("")} className="mt-3 text-[13px] font-semibold text-[#c2410c] hover:underline">Clear search</button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {visibleGradients.map((g) => (
                  <div key={g.id} className="overflow-hidden rounded-2xl ring-1 ring-black/[0.07] transition hover:ring-black/25">
                    <div className="h-32 w-full" style={{ background: g.preview }} />
                    <div className="px-4 py-3.5">
                      <p className="truncate text-[15px] font-semibold tracking-[-0.01em]">{g.name}</p>
                      <div className="mt-3 flex items-center gap-1.5">
                        <button
                          onClick={() => navigator.clipboard.writeText(g.css)}
                          className="rounded-full px-3.5 py-1.5 text-[12px] font-semibold text-[#1c1712]/70 ring-1 ring-black/[0.12] transition hover:text-[#1c1712] hover:ring-black/25"
                        >
                          Copy CSS
                        </button>
                        <button onClick={() => handleDeleteGradient(g.id)} className={`ml-auto ${iconBtn} hover:!bg-red-50 hover:!text-red-500`} title="Delete" aria-label="Delete gradient">
                          {TrashIcon}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : activeCollection ? (
            <>
              <button onClick={() => setActiveCollectionId(null)} className="mb-6 -mt-2 flex items-center gap-1.5 text-[13px] font-medium text-[#1c1712]/55 transition hover:text-[#1c1712]">
                <Svg size={13} sw={2.5}><path d="M15 6l-6 6 6 6" /></Svg>
                All collections
              </button>
              {activeCollectionPalettes.length === 0 ? (
                <Empty strip={DEFAULT_STRIP} title="No palettes in this collection yet" body="Add palettes from the Palettes tab." />
              ) : (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                  {activeCollectionPalettes.map((p) => (
                    <div key={p.id} className="overflow-hidden rounded-2xl ring-1 ring-black/[0.07] transition hover:ring-black/25">
                      <div className="flex h-32">{p.colors.map((c, i) => <div key={i} className="flex-1" style={{ backgroundColor: c.hex }} />)}</div>
                      <div className="flex items-center justify-between gap-2 px-4 py-3">
                        <p className="truncate text-[15px] font-semibold tracking-[-0.01em]">{p.label}</p>
                        <button
                          onClick={() => activeCollectionId && toggleCollectionMembership(activeCollectionId, p.id, true)}
                          className={`shrink-0 ${iconBtn} hover:!bg-red-50 hover:!text-red-500`}
                          title="Remove from collection"
                          aria-label="Remove from collection"
                        >
                          <Svg size={15}><path d="M18 6L6 18M6 6l12 12" /></Svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <>
              <div className="mb-8 flex max-w-xl gap-2">
                <input
                  value={newCollectionName}
                  onChange={(e) => setNewCollectionName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleCreateCollection()}
                  placeholder="New collection name…"
                  aria-label="New collection name"
                  className="min-w-0 flex-1 rounded-full bg-white px-5 py-2.5 text-[14px] outline-none ring-1 ring-black/[0.12] transition placeholder:text-[#1c1712]/35 focus:ring-black/40"
                />
                <button onClick={handleCreateCollection} disabled={!newCollectionName.trim()} className={`${darkBtn} disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-[#1c1712]`}>
                  Create
                </button>
              </div>
              {collections.length === 0 ? (
                <Empty strip={DEFAULT_STRIP} title="No collections yet" body="Group your saved palettes into collections." />
              ) : (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                  {collections.map((c) => {
                    const preview = c.paletteIds.map((id) => paletteById.get(id)).filter((p): p is SavedPalette => !!p);
                    return (
                      <div
                        key={c.id}
                        onClick={() => setActiveCollectionId(c.id)}
                        className="group cursor-pointer overflow-hidden rounded-2xl ring-1 ring-black/[0.07] transition hover:ring-black/25"
                      >
                        <div className="flex h-24">
                          {preview.length === 0
                            ? <div className="flex-1 bg-[#f5f5f5]" />
                            : preview.slice(0, 5).flatMap((p) => p.colors.slice(0, 1)).map((c2, i) => <div key={i} className="flex-1" style={{ backgroundColor: c2.hex }} />)}
                        </div>
                        <div className="flex items-center justify-between gap-2 px-4 py-3">
                          <div className="min-w-0">
                            <p className="truncate text-[15px] font-semibold tracking-[-0.01em]">{c.name}</p>
                            <p className="text-[12px] text-[#1c1712]/45">{c.paletteIds.length} {c.paletteIds.length === 1 ? "palette" : "palettes"}</p>
                          </div>
                          <button
                            onClick={(e) => { e.stopPropagation(); handleDeleteCollection(c.id); }}
                            className={`shrink-0 ${iconBtn} transition hover:!bg-red-50 hover:!text-red-500 lg:opacity-0 lg:group-hover:opacity-100 focus-visible:opacity-100`}
                            title="Delete collection"
                            aria-label="Delete collection"
                          >
                            {TrashIcon}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Sign-out modal */}
      {signOutModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center px-4" onClick={() => setSignOutModal(false)}>
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Sign out"
            className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl ring-1 ring-black/[0.08]"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-[18px] font-semibold tracking-[-0.02em]">Sign out?</h3>
            <p className="mt-1.5 text-[14px] leading-6 text-[#1c1712]/55">Are you sure you want to sign out?</p>
            <div className="mt-6 flex gap-3">
              <button onClick={() => setSignOutModal(false)} className={`flex-1 ${ringBtn} py-2.5 text-[14px]`}>
                Cancel
              </button>
              <button
                onClick={() => { setSignOutModal(false); signOut(); }}
                className="flex-1 rounded-full bg-red-600 py-2.5 text-[14px] font-semibold text-white transition hover:bg-red-700"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
