import Link from "next/link";

import type { HubPage } from "@/lib/seo/content";
import { Header } from "@/components/header";

export function HubPageView({ hub }: { hub: HubPage }) {
  return (
    <main className="min-h-screen text-[#1c1712]" style={{ backgroundColor: "#f8f4ef" }}>
      <Header />

      {/* Hero */}
      <section className="border-b border-black/6">
        <div className="mx-auto max-w-[1400px] px-6 pt-28 pb-0 lg:px-8">

          {/* Top: badge + title + palette strip preview */}
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[55%_1fr] lg:items-center pb-10">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-black/8 bg-white px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#1c1712]/40 mb-6">
                <span className="h-1.5 w-1.5 rounded-full bg-[#E8531F]" />
                HueFlow Library
              </div>

              <h1 className="font-display text-4xl font-semibold tracking-[-0.04em] text-[#1c1712] sm:text-5xl lg:text-[3.2rem]">
                {hub.title}
              </h1>
              <p className="mt-4 max-w-xl text-lg leading-8 text-[#1c1712]/50">
                {hub.description}
              </p>

              {/* Goals as inline chips */}
              {hub.goals.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {hub.goals.map((goal) => (
                    <span key={goal} className="inline-flex items-center gap-1.5 rounded-full border border-black/8 bg-white px-3.5 py-1.5 text-xs font-medium text-[#1c1712]/60">
                      <span className="h-1 w-1 rounded-full bg-[#E8531F]" />
                      {goal}
                    </span>
                  ))}
                </div>
              )}

              <p className="mt-8 text-sm leading-relaxed text-[#1c1712]/55 max-w-lg border-l-2 border-[#E8531F]/30 pl-4">
                {hub.answer}
              </p>
            </div>

            {/* Visual: stacked palette strips from featured links */}
            <div className="hidden lg:flex flex-col gap-2">
              {hub.featuredLinks.slice(0, 5).map((item) => (
                item.paletteColors && item.paletteColors.length > 0 ? (
                  <Link key={item.href} href={item.href}
                    className="group flex h-12 w-full rounded-xl overflow-hidden border border-black/6 hover:border-black/14 hover:shadow-[0_4px_16px_rgba(28,23,18,0.10)] transition-all"
                  >
                    {item.paletteColors.map((hex, i) => (
                      <div key={i} className="flex-1 transition-all duration-300 group-hover:first:flex-[1.5]" style={{ backgroundColor: hex }} />
                    ))}
                  </Link>
                ) : null
              ))}
              <p className="mt-1 text-right text-[11px] text-[#1c1712]/30">{hub.featuredLinks.length} collections →</p>
            </div>
          </div>
        </div>
      </section>

      {/* Explore grid */}
      <section className="mx-auto max-w-[1400px] px-6 py-14 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold tracking-[-0.03em] text-[#1c1712]">Explore</h2>
          <span className="text-sm text-[#1c1712]/35">{hub.featuredLinks.length} collections</span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {hub.featuredLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group rounded-2xl border border-black/8 bg-white overflow-hidden hover:border-black/14 hover:shadow-[0_8px_28px_rgba(28,23,18,0.10)] hover:-translate-y-0.5 transition-all duration-200"
            >
              {/* Color strip */}
              {item.paletteColors && item.paletteColors.length > 0 ? (
                item.href.startsWith("/gradients/") ? (
                  <div
                    className="h-24 w-full"
                    style={{ background: `linear-gradient(to right, ${item.paletteColors.join(", ")})` }}
                  />
                ) : (
                  <div className="flex h-24 w-full">
                    {item.paletteColors.map((hex, i) => (
                      <div
                        key={i}
                        className="flex-1 transition-all duration-300"
                        style={{ backgroundColor: hex }}
                      />
                    ))}
                  </div>
                )
              ) : (
                <div className="h-24 w-full bg-gradient-to-br from-[#f0ebe4] to-[#e8e0d6]" />
              )}

              <div className="p-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#1c1712]/30">
                  {item.label ?? "Collection"}
                </p>
                <h3 className="mt-2 text-[15px] font-semibold text-[#1c1712] leading-snug">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm font-semibold text-[#E8531F] group-hover:text-[#C23A10] transition-colors">
                  Open page →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
