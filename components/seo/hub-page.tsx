import Link from "next/link";

import type { HubPage } from "@/lib/seo/content";
import { Header } from "@/components/header";

export function HubPageView({ hub }: { hub: HubPage }) {
  return (
    <main className="relative min-h-screen bg-[#160b05] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(0,0,0,0.95),transparent_18%),radial-gradient(circle_at_88%_0%,rgba(255,106,44,0.18),transparent_30%),linear-gradient(135deg,#1a0e06_0%,#160b05_50%,#1a0e06_100%)]" />
      <div className="noise absolute inset-0 opacity-20" />

      <Header />

      <section className="relative border-b border-white/8">
        <div className="mx-auto max-w-7xl px-6 py-8 pt-28 lg:px-8">
          <div className="mt-4 grid grid-cols-1 gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <h1 className="max-w-4xl font-display text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
                {hub.title}
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-white/55">{hub.description}</p>
              <div className="mt-8 rounded-2xl border border-[#F15B2A]/25 bg-[#F15B2A]/8 p-6 backdrop-blur-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#F97A45]">Overview</p>
                <p className="mt-3 text-base leading-7 text-white/80">{hub.answer}</p>
              </div>
            </div>

            {hub.goals.length > 0 && (
              <div className="rounded-2xl border border-white/10 bg-white/4 p-7 backdrop-blur-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/40">What you&apos;ll find</p>
                <ul className="mt-5 space-y-3 text-sm text-white/70">
                  {hub.goals.map((goal) => (
                    <li key={goal} className="rounded-xl border border-white/8 bg-white/4 px-4 py-3">
                      {goal}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl font-semibold tracking-[-0.03em] text-white">Explore</h2>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {hub.featuredLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group rounded-2xl border border-white/10 bg-white/4 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-white/18 hover:bg-white/6 overflow-hidden"
            >
              {item.paletteColors && item.paletteColors.length > 0 && (
                item.href.startsWith("/gradients/") ? (
                  <div
                    className="h-10 w-full"
                    style={{ background: `linear-gradient(to right, ${item.paletteColors.join(", ")})` }}
                  />
                ) : (
                  <div className="flex h-10 w-full">
                    {item.paletteColors.map((hex, i) => (
                      <div key={i} className="flex-1" style={{ backgroundColor: hex }} />
                    ))}
                  </div>
                )
              )}
              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/35">
                  {item.label ?? "Programmatic page"}
                </p>
                <h3 className="mt-3 text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-xs text-white/30">{item.href}</p>
                <p className="mt-5 text-sm font-medium text-[#F97A45] transition-colors group-hover:text-[#F15B2A]">Open page →</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
