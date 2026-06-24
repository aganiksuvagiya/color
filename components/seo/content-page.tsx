import Link from "next/link";

import type { ResolvedContentEntry } from "@/lib/seo/content";

type Breadcrumb = {
  name: string;
  href: string;
};

const relatedGroups = [
  { label: "Related colors", match: "/colors/" },
  { label: "Related color meanings", match: "/color-meanings/" },
  { label: "Related palettes", match: "/palettes/" },
  { label: "Related gradients", match: "/gradients/" },
  { label: "Related accessibility guides", match: "/accessibility/" },
  { label: "Related branding guides", match: "/brand-colors/" },
  { label: "Related articles", match: "/" },
] as const;

export function ContentPageView({
  entry,
  breadcrumbs,
  answerLabel = "Direct answer",
}: {
  entry: ResolvedContentEntry;
  breadcrumbs: Breadcrumb[];
  answerLabel?: string;
}) {
  const groupedLinks = relatedGroups
    .map((group) => ({
      label: group.label,
      links:
        group.match === "/"
          ? entry.relatedLinks.filter((link) =>
              ["/guides/", "/explainers/", "/comparisons/", "/faqs/", "/resources/", "/blog"].some((prefix) =>
                link.href.startsWith(prefix),
              ),
            )
          : entry.relatedLinks.filter((link) => link.href.startsWith(group.match)),
    }))
    .filter((group) => group.links.length > 0);

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#fff_0%,#fff8f3_100%)] text-slate-950">
      <section className="border-b border-black/5 bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.16),transparent_26%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.14),transparent_24%)]">
        <div className="mx-auto max-w-5xl px-6 py-10 lg:px-8">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
            {breadcrumbs.map((item, index) => (
              <span key={item.href} className="flex items-center gap-2">
                <Link href={item.href} className="hover:text-slate-900">
                  {item.name}
                </Link>
                {index < breadcrumbs.length - 1 ? <span>/</span> : null}
              </span>
            ))}
          </nav>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">{entry.title}</h1>
          <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-700">{entry.description}</p>
          <div className="mt-8 rounded-[2rem] border border-orange-200 bg-white/92 p-7 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-orange-700">{answerLabel}</p>
            <p className="mt-3 text-lg leading-8 text-slate-900">{entry.answer}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-12 lg:grid-cols-[1fr_300px] lg:px-8">
        <article className="space-y-10">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-[1.75rem] border border-black/8 bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Key takeaways</p>
              <ul className="mt-3 space-y-3 text-sm leading-7 text-slate-800">
                {entry.keyTakeaways.map((takeaway) => (
                  <li key={takeaway}>{takeaway}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-[1.75rem] border border-black/8 bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Quick facts</p>
              <div className="mt-3 space-y-3">
                {entry.quickFacts.map((fact) => (
                  <div key={fact.label} className="rounded-2xl bg-slate-50 px-4 py-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">{fact.label}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-900">{fact.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <section className="rounded-[2rem] border border-black/8 bg-slate-950 p-7 text-white shadow-[0_24px_80px_rgba(15,23,42,0.12)]">
            <h2 className="text-2xl font-semibold tracking-tight">{entry.expertSummary.title}</h2>
            <p className="mt-4 text-base leading-8 text-slate-200">{entry.expertSummary.body}</p>
          </section>

          <div className="grid gap-5 md:grid-cols-2">
            <section className="rounded-[2rem] border border-black/8 bg-white p-7 shadow-[0_20px_50px_rgba(15,23,42,0.04)]">
              <h2 className="text-2xl font-semibold tracking-tight">Definitions</h2>
              <div className="mt-5 space-y-4">
                {entry.definitions.map((item) => (
                  <div key={item.term} className="rounded-[1.5rem] border border-black/8 bg-slate-50 p-5">
                    <h3 className="text-lg font-semibold text-slate-950">{item.term}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-700">{item.definition}</p>
                  </div>
                ))}
              </div>
            </section>
            <section className="rounded-[2rem] border border-black/8 bg-white p-7 shadow-[0_20px_50px_rgba(15,23,42,0.04)]">
              <h2 className="text-2xl font-semibold tracking-tight">Pros and cons</h2>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div className="rounded-[1.5rem] border border-emerald-200 bg-emerald-50 p-5">
                  <h3 className="text-lg font-semibold text-emerald-900">Pros</h3>
                  <ul className="mt-3 space-y-3 text-sm leading-7 text-emerald-950">
                    {entry.prosCons.pros.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-[1.5rem] border border-amber-200 bg-amber-50 p-5">
                  <h3 className="text-lg font-semibold text-amber-900">Cons</h3>
                  <ul className="mt-3 space-y-3 text-sm leading-7 text-amber-950">
                    {entry.prosCons.cons.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          </div>

          <section className="rounded-[2rem] border border-black/8 bg-white p-7 shadow-[0_20px_50px_rgba(15,23,42,0.04)]">
            <h2 className="text-2xl font-semibold tracking-tight">AI-friendly sections</h2>
            <div className="mt-6 grid gap-4">
              {entry.aiSections.map((section) => (
                <div key={section.title} className="rounded-[1.5rem] border border-black/8 bg-slate-50 p-5">
                  <h3 className="text-lg font-semibold text-slate-950">{section.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-700">{section.body}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="space-y-6">
            {entry.sections.map((section) => (
              <section key={section.title} className="rounded-[2rem] border border-black/8 bg-white p-7 shadow-[0_20px_50px_rgba(15,23,42,0.04)]">
                <h2 className="text-2xl font-semibold tracking-tight">{section.title}</h2>
                <p className="mt-4 text-base leading-8 text-slate-700">{section.body}</p>
              </section>
            ))}
          </div>

          {entry.comparisonRows ? (
            <section className="overflow-hidden rounded-[2rem] border border-black/8 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.04)]">
              <div className="border-b border-black/6 px-7 py-5">
                <h2 className="text-2xl font-semibold tracking-tight">Comparison table</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-600">
                    <tr>
                      <th className="px-6 py-4 font-semibold">Option</th>
                      <th className="px-6 py-4 font-semibold">Best for</th>
                      <th className="px-6 py-4 font-semibold">Strengths</th>
                      <th className="px-6 py-4 font-semibold">Watchouts</th>
                    </tr>
                  </thead>
                  <tbody>
                    {entry.comparisonRows.map((row) => (
                      <tr key={row.label} className="border-t border-black/6">
                        <td className="px-6 py-4 font-medium text-slate-950">{row.label}</td>
                        <td className="px-6 py-4 text-slate-700">{row.bestFor}</td>
                        <td className="px-6 py-4 text-slate-700">{row.strengths}</td>
                        <td className="px-6 py-4 text-slate-700">{row.watchouts}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          ) : null}

          {entry.examples ? (
            <section className="rounded-[2rem] border border-black/8 bg-slate-950 p-7 text-white shadow-[0_24px_80px_rgba(15,23,42,0.12)]">
              <h2 className="text-2xl font-semibold tracking-tight">Examples</h2>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {entry.examples.map((example) => (
                  <div key={example.title} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                    <h3 className="text-lg font-semibold">{example.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-200">{example.body}</p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          <section className="rounded-[2rem] border border-black/8 bg-white p-7 shadow-[0_20px_50px_rgba(15,23,42,0.04)]">
            <h2 className="text-2xl font-semibold tracking-tight">Citation-worthy blocks</h2>
            <div className="mt-6 space-y-4">
              {entry.citationBlocks.map((block) => (
                <blockquote key={block} className="rounded-[1.5rem] border border-black/8 bg-slate-50 p-5 text-sm leading-7 text-slate-800">
                  {block}
                </blockquote>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border border-black/8 bg-white p-7 shadow-[0_20px_50px_rgba(15,23,42,0.04)]">
            <h2 className="text-2xl font-semibold tracking-tight">FAQ block</h2>
            <div className="mt-6 space-y-5">
              {entry.faq.map((item) => (
                <div key={item.question} className="rounded-[1.5rem] border border-black/8 bg-slate-50 p-5">
                  <h3 className="text-lg font-semibold text-slate-950">{item.question}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-700">{item.answer}</p>
                </div>
              ))}
            </div>
          </section>
        </article>

        <aside className="space-y-6">
          <div className="rounded-[2rem] border border-black/8 bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.04)]">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">AI retrieval format</p>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
              <li>40-60 word answer block above the fold</li>
              <li>Clear entity title and direct question match</li>
              <li>Definitions, FAQ, pros and cons, and comparison sections for citations</li>
              <li>Related pages with explicit semantic anchors</li>
            </ul>
          </div>
          <div className="rounded-[2rem] border border-black/8 bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.04)]">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Entity relationships</p>
            <div className="mt-4 space-y-3">
              {entry.entityRelations.map((relation) => (
                <div key={`${relation.entity}-${relation.connectedTo}`} className="rounded-2xl border border-black/8 bg-slate-50 px-4 py-3 text-sm text-slate-800">
                  <span className="font-semibold">{relation.entity}</span> {relation.relationship} <span className="font-semibold">{relation.connectedTo}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[2rem] border border-black/8 bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.04)]">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Internal links</p>
            <div className="mt-4 space-y-5">
              {groupedLinks.map((group) => (
                <div key={group.label}>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">{group.label}</p>
                  <div className="mt-3 space-y-3">
                    {group.links.map((link) => (
                      <Link key={link.href} href={link.href} className="block rounded-2xl border border-black/8 bg-slate-50 px-4 py-3 text-sm text-slate-800 hover:bg-slate-100">
                        {link.title}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
