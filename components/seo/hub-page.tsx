import Link from "next/link";

import type { HubPage } from "@/lib/seo/content";
import { primaryNav } from "@/lib/seo/site-config";

export function HubPageView({ hub }: { hub: HubPage }) {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#fffaf2_0%,#fffdf9_38%,#fff 100%)] text-slate-950">
      <section className="border-b border-black/5 bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.18),transparent_28%),radial-gradient(circle_at_top_right,rgba(14,165,233,0.14),transparent_24%)]">
        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-700">
            <Link href="/" className="font-semibold tracking-[0.18em] text-slate-900 uppercase">
              HueFlow
            </Link>
            {primaryNav.slice(0, 8).map((item) => (
              <Link key={item.href} href={item.href} className="rounded-full border border-black/8 bg-white/70 px-3 py-1.5 hover:bg-white">
                {item.label}
              </Link>
            ))}
          </div>
          <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-orange-700">SEO + GEO + AEO Hub</p>
              <h1 className="mt-4 max-w-4xl font-display text-4xl font-semibold tracking-tight sm:text-5xl">
                {hub.title}
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-700">{hub.description}</p>
              <div className="mt-8 rounded-3xl border border-orange-200 bg-white/90 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Answer-first summary</p>
                <p className="mt-3 text-base leading-7 text-slate-800">{hub.answer}</p>
              </div>
            </div>
            <div className="rounded-[2rem] border border-slate-200 bg-slate-950 p-8 text-white shadow-[0_24px_80px_rgba(15,23,42,0.16)]">
              <p className="text-xs uppercase tracking-[0.24em] text-orange-300">Search goals</p>
              <ul className="mt-5 space-y-3 text-sm text-slate-200">
                {hub.goals.map((goal) => (
                  <li key={goal} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    {goal}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Featured pages</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">Hub-and-spoke entry points</h2>
          </div>
          <Link href="/resources/seo-architecture" className="rounded-full border border-black/10 px-5 py-3 text-sm font-medium hover:bg-slate-50">
            View full architecture
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {hub.featuredLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group rounded-[1.75rem] border border-black/8 bg-white p-6 shadow-[0_24px_50px_rgba(15,23,42,0.05)] transition-transform hover:-translate-y-1"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                {item.label ?? "Programmatic page"}
              </p>
              <h3 className="mt-3 text-xl font-semibold text-slate-950">{item.title}</h3>
              <p className="mt-4 text-sm text-slate-600">{item.href}</p>
              <p className="mt-6 text-sm font-medium text-orange-700 group-hover:text-orange-800">Open page</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
