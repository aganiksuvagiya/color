import Link from "next/link";

import type { HubPage } from "@/lib/seo/content";
import { Header } from "@/components/header";
import { Breadcrumbs, SmallTitle, eyebrow } from "@/components/seo/page-ui";

export type HubDirectory = {
  heading: string;
  links: { title: string; href: string; hex?: string }[];
};

function hashOf(text: string) {
  let h = 0;
  for (let i = 0; i < text.length; i++) h = (h * 31 + text.charCodeAt(i)) >>> 0;
  return h;
}

/** Cover for entries that have no palette of their own: five swatches from a hue taken from the title. Deterministic. */
function coverColors(title: string) {
  const base = hashOf(title) % 360;
  return [
    `hsl(${base} 50% 26%)`,
    `hsl(${base} 62% 48%)`,
    `hsl(${base + 26} 70% 62%)`,
    `hsl(${base + 50} 76% 78%)`,
    `hsl(${base + 50} 60% 92%)`,
  ];
}

export function HubPageView({ hub, directory }: { hub: HubPage; directory?: HubDirectory }) {
  const preview = hub.featuredLinks.filter((item) => item.paletteColors && item.paletteColors.length > 0).slice(0, 5);
  const dots = preview[0]?.paletteColors ?? coverColors(hub.title);

  return (
    <main className="min-h-screen bg-white text-[#1c1712]">
      <Header />

      {/* ── Header ── */}
      <section className="w-full px-6 pb-12 pt-28 sm:px-8 lg:px-12">
        <Breadcrumbs items={[{ title: "Home", href: "/" }, { title: hub.title, href: hub.path }]} />

        <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:items-center">
          <div>
            <h1 className="text-[2.6rem] font-bold leading-[1.05] tracking-[-0.035em] sm:text-[3.5rem]">{hub.title}</h1>
            <div className="mt-5 flex flex-wrap items-start gap-3">
              <span className="mt-1.5 flex -space-x-1.5" aria-hidden="true">
                {dots.slice(0, 5).map((hex, i) => (
                  <span key={`${hex}-${i}`} className="h-5 w-5 rounded-full ring-2 ring-white" style={{ backgroundColor: hex }} />
                ))}
              </span>
              <p className="hub-description min-w-0 flex-1 basis-72 text-[16px] leading-7 text-[#1c1712]/55">
                <span className="font-semibold text-[#1c1712]/80">{hub.featuredLinks.length} pages in this collection.</span> {hub.description}
              </p>
            </div>

            {hub.goals.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {hub.goals.map((goal) => (
                  <span key={goal} className="inline-flex items-center gap-2 rounded-lg bg-[#1c1712]/[0.04] px-3 py-1.5 text-[13px] font-medium text-[#1c1712]/65">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#c2410c]" />
                    {goal}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-8 max-w-2xl">
              <p className={eyebrow}>Quick answer</p>
              <p className="hub-answer mt-3 text-[1.1rem] font-medium leading-8 tracking-[-0.01em] text-[#1c1712]/80">{hub.answer}</p>
            </div>
          </div>

          {preview.length > 0 && (
            <div className="hidden flex-col gap-3 lg:flex">
              {preview.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex h-14 w-full overflow-hidden rounded-xl ring-1 ring-black/[0.07] transition hover:shadow-[0_12px_28px_-16px_rgba(28,23,18,0.35)]"
                  aria-label={item.title}
                >
                  {item.paletteColors!.map((hex, i) => (
                    <span key={i} className="flex-1 transition-[flex] duration-300 group-hover:first:flex-[1.5]" style={{ backgroundColor: hex }} />
                  ))}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Explore ── */}
      <section className="border-t border-black/[0.06]">
        <div className="w-full px-6 py-14 sm:px-8 lg:px-12">
          <p className={eyebrow}>Explore</p>
          <h2 className="mt-2 text-[1.75rem] font-semibold tracking-[-0.03em]">
            {hub.featuredLinks.length} collections
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {hub.featuredLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group overflow-hidden rounded-2xl ring-1 ring-black/[0.07] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-18px_rgba(28,23,18,0.35)]"
              >
                {item.paletteColors && item.paletteColors.length > 0 ? (
                  item.href.startsWith("/gradients/") ? (
                    <div className="h-28 w-full" style={{ background: `linear-gradient(to right, ${item.paletteColors.join(", ")})` }} aria-hidden="true" />
                  ) : (
                    <div className="flex h-28 w-full" aria-hidden="true">
                      {item.paletteColors.map((hex, i) => (
                        <div key={i} className="flex-1" style={{ backgroundColor: hex }} />
                      ))}
                    </div>
                  )
                ) : (
                  <div className="flex h-28 w-full" aria-hidden="true">
                    {coverColors(item.title).map((c, i) => (
                      <div key={i} className="flex-1" style={{ backgroundColor: c }} />
                    ))}
                  </div>
                )}

                <div className="p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#c2410c]">{item.label ?? "Collection"}</p>
                  <h3 className="mt-1.5 text-[1.05rem] font-semibold leading-snug tracking-[-0.015em] transition-colors group-hover:text-[#c2410c]">{item.title}</h3>
                  <p className="mt-4 text-[13px] font-semibold text-[#c2410c]">
                    Open page <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── A-Z directory of every page not featured above ── */}
      {directory && directory.links.length > 0 && (
        <section className="border-t border-black/[0.06]">
          <div className="w-full px-6 py-14 sm:px-8 lg:px-12">
            <SmallTitle>
              {directory.heading}
              <span className="font-mono normal-case tracking-normal text-[#1c1712]/35">{directory.links.length} pages</span>
            </SmallTitle>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {directory.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[14px] text-[#1c1712]/70 transition hover:bg-[#1c1712]/[0.04] hover:text-[#c2410c]"
                  >
                    {link.hex && (
                      <span className="h-3.5 w-3.5 shrink-0 rounded-full ring-1 ring-inset ring-black/10" style={{ backgroundColor: link.hex }} />
                    )}
                    <span className="truncate">{link.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </main>
  );
}
