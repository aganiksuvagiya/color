"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { Header } from "@/components/header";
import { SwatchStrip, useCopy } from "@/components/seo/swatch-strip";
import type { Shade, ShadeFaq, ShadePalette } from "@/lib/shades-data";

type LinkItem = { title: string; href: string };
type FamilyChip = { slug: string; name: string; hex: string; href: string };
type Format = "hex" | "rgb" | "hsl";
type Filter = "all" | Shade["group"];

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "light", label: "Light" },
  { key: "medium", label: "Medium" },
  { key: "dark", label: "Dark" },
];

const FORMATS: { key: Format; label: string }[] = [
  { key: "hex", label: "HEX" },
  { key: "rgb", label: "RGB" },
  { key: "hsl", label: "HSL" },
];

const code = (s: Shade, f: Format) => (f === "hex" ? s.hex : f === "rgb" ? s.rgb : s.hsl);

function Segmented<T extends string>({ value, options, onChange, label }: { value: T; options: { key: T; label: string; count?: number }[]; onChange: (v: T) => void; label: string }) {
  return (
    <div role="tablist" aria-label={label} className="inline-flex rounded-full bg-[#1c1712]/[0.06] p-1">
      {options.map((o) => (
        <button
          key={o.key}
          role="tab"
          aria-selected={value === o.key}
          onClick={() => onChange(o.key)}
          className={`rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition ${
            value === o.key ? "bg-white text-[#1c1712] shadow-sm" : "text-[#1c1712]/50 hover:text-[#1c1712]"
          }`}
        >
          {o.label}
          {o.count !== undefined && <span className="ml-1.5 text-[11px] font-medium text-[#1c1712]/35">{o.count}</span>}
        </button>
      ))}
    </div>
  );
}

function SectionTitle({ eyebrow, title, body }: { eyebrow: string; title: string; body?: string }) {
  return (
    <div className="max-w-2xl">
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#c2410c]">{eyebrow}</p>
      <h2 className="mt-2 text-[1.75rem] font-semibold tracking-[-0.03em] text-[#1c1712]">{title}</h2>
      {body && <p className="mt-2 text-[15px] leading-7 text-[#1c1712]/55">{body}</p>}
    </div>
  );
}

type ViewShade = Shade & { colorSlug?: string };
type FamilyNav = FamilyChip & { active: boolean };

function isLight(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 160;
}

const CopyIcon = () => (
  <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <rect x="9" y="9" width="13" height="13" rx="2" />
    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
  </svg>
);
const EyeIcon = () => (
  <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export function ShadesPageView({
  name,
  intro,
  usage,
  shades,
  palettes,
  faq,
  related,
  families,
  breadcrumbs,
  accent,
}: {
  name: string;
  intro: string;
  usage: string;
  accent: string;
  shades: ViewShade[];
  palettes: ShadePalette[];
  faq: ShadeFaq[];
  related: LinkItem[];
  families: FamilyNav[];
  breadcrumbs: LinkItem[];
}) {
  const { copied, copy } = useCopy();
  const [filter, setFilter] = useState<Filter>("all");
  const [format, setFormat] = useState<Format>("hex");
  const [view, setView] = useState<"grid" | "list">("grid");
  const lower = name.toLowerCase();

  // While the toolbar is stuck under the floating header, a white backdrop fills the
  // area around the header so swatches don't peek through. Watches a 1px sentinel
  // placed just above the toolbar.
  const sentinel = useRef<HTMLDivElement>(null);
  const [stuck, setStuck] = useState(false);
  useEffect(() => {
    const el = sentinel.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setStuck(!e.isIntersecting), { rootMargin: "-87px 0px 0px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const counts = { all: shades.length, light: 0, medium: 0, dark: 0 } as Record<Filter, number>;
  for (const s of shades) counts[s.group] += 1;
  const visible = filter === "all" ? shades : shades.filter((s) => s.group === filter);

  return (
    <main className="min-h-screen bg-white text-[#1c1712]">
      <Header />

      {/* ── Header: title, one line, color chips (coolors-style) ── */}
      <section className="w-full px-6 sm:px-8 lg:px-12 pb-10 pt-28">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-[12px] text-[#1c1712]/40">
          {breadcrumbs.map((item, i) => (
            <span key={item.href} className="flex items-center gap-2">
              {i < breadcrumbs.length - 1 ? (
                <Link href={item.href} className="transition hover:text-[#1c1712]/70">{item.title}</Link>
              ) : (
                <span className="text-[#1c1712]/60">{item.title}</span>
              )}
              {i < breadcrumbs.length - 1 && <span className="text-[#1c1712]/20">/</span>}
            </span>
          ))}
        </nav>
        <h1 className="mt-8 text-[2.6rem] font-bold leading-[1.05] tracking-[-0.035em] sm:text-[3.5rem]">
          Shades of <span style={{ color: accent }}>{name}</span>
        </h1>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          {/* Stacked preview dots: an even sample from light to dark */}
          <span className="flex -space-x-1.5" aria-hidden="true">
            {Array.from({ length: 6 }, (_, i) => shades[Math.round((i * (shades.length - 1)) / 5)]).map((s, i) => (
              <span key={i} className="h-5 w-5 rounded-full ring-2 ring-white" style={{ backgroundColor: s?.hex }} />
            ))}
          </span>
          <p className="text-[16px] text-[#1c1712]/55">
            <span className="font-semibold text-[#1c1712]/80">{shades.length} {lower} color names</span> with HEX, RGB and HSL codes. Click any shade to copy it.
          </p>
        </div>

        <nav aria-label="Color families" className="mt-8 flex flex-wrap gap-2">
          {families.map((f) => (
            <Link
              key={f.slug}
              href={f.href}
              aria-current={f.active ? "page" : undefined}
              className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-[13px] font-medium transition ${
                f.active ? "bg-[#e8531f]/10 text-[#e8531f] ring-1 ring-[#e8531f]/25" : "bg-[#1c1712]/[0.04] text-[#1c1712]/65 hover:bg-[#1c1712]/[0.08] hover:text-[#1c1712]"
              }`}
            >
              <span className="h-2.5 w-2.5 rounded-full ring-1 ring-inset ring-black/10" style={{ backgroundColor: f.hex }} />
              {f.name}
            </Link>
          ))}
        </nav>
      </section>

      {/* ── Shade explorer ── */}
      <section className="w-full px-6 sm:px-8 lg:px-12 pb-16">
        {/* Toolbar: a solid full-bleed bar that sticks right under the floating header
            (which ends at 86px), so cards never show through behind it. */}
        <div ref={sentinel} aria-hidden="true" className="h-px" />
        {stuck && <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-10 hidden h-[86px] bg-white lg:block" />}
        <div className="z-20 -mx-6 flex flex-wrap items-center justify-between gap-3 border-b border-black/[0.06] bg-white px-6 py-3 sm:-mx-8 sm:px-8 lg:sticky lg:top-[86px] lg:-mx-12 lg:px-12">
          <Segmented label="Filter shades" value={filter} onChange={setFilter} options={FILTERS.filter((f) => counts[f.key] > 0).map((f) => ({ ...f, count: counts[f.key] }))} />
          <div className="flex flex-wrap items-center gap-3">
            <Segmented label="Code format" value={format} onChange={setFormat} options={FORMATS} />
            <Segmented label="View" value={view} onChange={setView} options={[{ key: "grid", label: "Grid" }, { key: "list", label: "List" }]} />
          </div>
        </div>

        {/* Grid view: wide swatches, code on hover, name + actions below. In "All" the
            grid is split into labelled Light / Medium / Dark groups.
            Both views stay in the DOM so every code is in the page HTML. */}
        <div className={view === "grid" ? "" : "hidden"}>
          {(filter === "all"
            ? FILTERS.filter((f) => f.key !== "all").map((f) => ({ key: f.key, label: f.label, items: shades.filter((s) => s.group === f.key) }))
            : [{ key: filter, label: "", items: visible }]
          )
            .filter((g) => g.items.length > 0)
            .map((g) => (
              <div key={g.key} className="mt-8">
                {g.label && (
                  <h3 className="mb-4 flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#1c1712]/40">
                    {g.label} shades <span className="font-medium normal-case tracking-normal text-[#1c1712]/30">{g.items.length}</span>
                    <span className="h-px flex-1 bg-black/[0.06]" />
                  </h3>
                )}
                <ul className="grid grid-cols-2 gap-x-5 gap-y-5 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
                  {g.items.map((s) => {
                    const value = code(s, format);
                    const done = copied === value;
                    return (
                      <li key={s.hex + s.name} className="group">
                        <button
                          onClick={() => copy(value)}
                          aria-label={`Copy ${s.name} ${value}`}
                          className="flex aspect-[3/1] w-full items-center justify-center rounded-lg ring-1 ring-inset ring-black/[0.06] transition duration-200 group-hover:-translate-y-0.5 group-hover:shadow-[0_10px_24px_-12px_rgba(28,23,18,0.4)]"
                          style={{ backgroundColor: s.hex }}
                        >
                          <span
                            className={`font-mono text-[13px] font-semibold tracking-wide transition-opacity duration-150 ${done ? "opacity-100" : "opacity-0 group-hover:opacity-100"} ${
                              isLight(s.hex) ? "text-black/70" : "text-white/90"
                            }`}
                          >
                            {done ? "✓ Copied" : format === "hex" ? s.hex.slice(1) : value}
                          </span>
                        </button>
                        <div className="mt-2 flex items-center justify-between gap-2 px-0.5">
                          <span className="truncate text-[13px] font-medium text-[#1c1712]/85">{s.name}</span>
                          <span className="flex shrink-0 items-center gap-2 text-[#1c1712]/35">
                            <button onClick={() => copy(value)} className="transition hover:text-[#1c1712]" aria-label={`Copy ${value}`} title={`Copy ${value}`}>
                              <CopyIcon />
                            </button>
                            {s.colorSlug ? (
                              <Link href={`/colors/${s.colorSlug}`} className="transition hover:text-[#1c1712]" aria-label={`View ${s.name}`} title={`View ${s.name}`}>
                                <EyeIcon />
                              </Link>
                            ) : (
                              // Keeps the copy icon in the same spot on every card.
                              <span className="w-[15px]" aria-hidden="true" />
                            )}
                          </span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
        </div>

        {/* List view */}
        <div className={`mt-6 overflow-x-auto rounded-xl ring-1 ring-black/[0.07] ${view === "list" ? "" : "hidden"}`}>
          <table className="w-full min-w-[560px] text-left text-[14px]">
            <thead>
              <tr className="border-b border-black/[0.06] text-[11px] uppercase tracking-[0.14em] text-[#1c1712]/40">
                <th className="px-5 py-3 font-semibold">Name</th>
                <th className="px-5 py-3 font-semibold">HEX</th>
                <th className="px-5 py-3 font-semibold">RGB</th>
                <th className="px-5 py-3 font-semibold">HSL</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((s) => (
                <tr key={s.hex + s.name} className="border-b border-black/[0.04] last:border-0">
                  <td className="px-5 py-2.5">
                    <span className="flex items-center gap-3">
                      <span className="h-7 w-7 shrink-0 rounded-md ring-1 ring-inset ring-black/[0.08]" style={{ backgroundColor: s.hex }} />
                      <span className="font-medium">{s.name}</span>
                    </span>
                  </td>
                  {(["hex", "rgb", "hsl"] as Format[]).map((f) => (
                    <td key={f} className="px-5 py-2.5">
                      <button onClick={() => copy(code(s, f))} className="font-mono text-[12px] text-[#1c1712]/60 transition hover:text-[#e8531f]">
                        {copied === code(s, f) ? "✓ Copied" : code(s, f)}
                      </button>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Palettes ── */}
      <section className="border-t border-black/[0.06]">
        <div className="w-full px-6 sm:px-8 lg:px-12 py-16">
          <SectionTitle eyebrow="Palettes" title={`Color palettes with shades of ${lower}`} body="Ready-made combinations. Click a color to copy it, or open the palette in the generator to edit it." />
          <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2">
            {palettes.map((p) => (
              <div key={p.name}>
                <SwatchStrip colors={p.colors} height="h-28" copied={copied} onCopy={copy} className="rounded-xl" />
                <div className="mt-3 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="truncate text-[15px] font-semibold">{p.name}</h3>
                    <p className="truncate text-[13px] text-[#1c1712]/45">{p.useCase}</p>
                  </div>
                  <Link
                    href={`/generator?label=${encodeURIComponent(p.name)}&c=${p.colors.map((c) => c.slice(1).toUpperCase()).join("-")}`}
                    className="shrink-0 rounded-full border border-black/[0.12] px-3.5 py-1.5 text-[12px] font-semibold text-[#1c1712]/75 transition hover:border-[#e8531f] hover:bg-[#e8531f] hover:text-white"
                  >
                    Open in generator →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Guide + FAQ ── */}
      <section className="border-t border-black/[0.06]">
        <div className="grid w-full gap-12 px-6 py-16 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:px-12">
          <div>
            <SectionTitle eyebrow="Guide" title={`About shades of ${lower}`} />
            <p className="mt-5 text-[15px] leading-8 text-[#1c1712]/65">{intro}</p>
            <p className="mt-4 text-[15px] leading-8 text-[#1c1712]/65">{usage}</p>
            {related.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-2">
                {related.map((l) => (
                  <Link key={l.href} href={l.href} className="rounded-full px-3.5 py-1.5 text-[13px] text-[#1c1712]/70 ring-1 ring-black/[0.08] transition hover:text-[#e8531f] hover:ring-[#e8531f]/40">
                    {l.title} →
                  </Link>
                ))}
              </div>
            )}
          </div>
          <div>
            <SectionTitle eyebrow="FAQ" title={`Questions about shades of ${lower}`} />
            <div className="mt-5 divide-y divide-black/[0.07] border-y border-black/[0.07]">
              {faq.map((f) => (
                <details key={f.question} className="group py-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15px] font-semibold">
                    {f.question}
                    <span className="text-lg leading-none text-[#1c1712]/30 transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-2.5 text-[14px] leading-7 text-[#1c1712]/60">{f.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export function ShadesHubView({ families }: { families: (FamilyChip & { count: number; strip: string[] })[] }) {
  const { copied, copy } = useCopy();
  return (
    <main className="min-h-screen bg-white text-[#1c1712]">
      <Header />
      <section className="bg-white">
        <div className="w-full px-6 sm:px-8 lg:px-12 pb-12 pt-28">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[12px] text-[#1c1712]/40">
            <Link href="/" className="transition hover:text-[#1c1712]/70">Home</Link>
            <span className="text-[#1c1712]/20">/</span>
            <span className="text-[#1c1712]/60">Shades</span>
          </nav>
          <h1 className="mt-8 text-[2.75rem] font-black leading-[1.02] tracking-[-0.045em] sm:text-6xl">Color Shades</h1>
          <p className="mt-5 max-w-3xl text-[17px] leading-8 text-[#1c1712]/60">
            Named shades of every major color - blue, pink, purple, green and more - with HEX, RGB and HSL codes, ready palettes and one-click copy.
          </p>
        </div>
      </section>
      <div className="grid w-full grid-cols-1 gap-x-6 gap-y-10 px-6 py-16 sm:grid-cols-2 sm:px-8 lg:grid-cols-3 lg:px-12 xl:grid-cols-4">
        {families.map((f) => (
          <div key={f.slug}>
            <SwatchStrip colors={f.strip} height="h-32" copied={copied} onCopy={copy} className="rounded-2xl" />
            <Link href={f.href} className="group mt-4 flex items-center justify-between">
              <div>
                <h2 className="text-[16px] font-semibold transition group-hover:text-[#e8531f]">Shades of {f.name}</h2>
                <p className="text-[13px] text-[#1c1712]/45">{f.count} named shades</p>
              </div>
              <span className="text-[#1c1712]/30 transition group-hover:translate-x-1 group-hover:text-[#e8531f]">→</span>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
