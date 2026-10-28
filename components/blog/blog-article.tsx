import Link from "next/link";
import type { ReactNode } from "react";

import { Header } from "@/components/header";
import { Breadcrumbs, Faq, RelatedLinks, eyebrow } from "@/components/seo/page-ui";
import { blogPath, formatDate, type BlogPost } from "@/lib/blog/posts";

// Long-form article styles, applied to the post body.
const prose =
  "min-w-0 text-[17px] leading-8 text-[#1c1712]/75 " +
  "[&_h2]:mt-14 [&_h2]:scroll-mt-28 [&_h2]:text-[1.65rem] [&_h2]:font-semibold [&_h2]:leading-tight [&_h2]:tracking-[-0.025em] [&_h2]:text-[#1c1712] [&>h2:first-child]:mt-0 " +
  "[&_h3]:mt-10 [&_h3]:scroll-mt-28 [&_h3]:text-[1.2rem] [&_h3]:font-semibold [&_h3]:tracking-[-0.015em] [&_h3]:text-[#1c1712] " +
  // Text rules skip anything inside .not-prose, e.g. a live component embedded in a post.
  "[&_p:not(.not-prose_*)]:mt-5 [&_ul:not(.not-prose_*)]:mt-5 [&_ul:not(.not-prose_*)]:space-y-2.5 [&_ul:not(.not-prose_*)>li]:ml-5 [&_ul:not(.not-prose_*)>li]:list-disc [&_ul:not(.not-prose_*)>li]:pl-1 [&_ul:not(.not-prose_*)>li]:marker:text-[#c2410c] " +
  "[&_ol]:mt-5 [&_ol]:space-y-2.5 [&_ol>li]:ml-5 [&_ol>li]:list-decimal [&_ol>li]:pl-1 " +
  "[&_strong]:font-semibold [&_strong]:text-[#1c1712] " +
  "[&_p_a]:font-medium [&_p_a]:text-[#c2410c] [&_p_a]:underline [&_p_a]:underline-offset-2 hover:[&_p_a]:no-underline [&_li_a]:font-medium [&_li_a]:text-[#c2410c] [&_li_a]:underline [&_li_a]:underline-offset-2";

export function BlogArticle({ post, children }: { post: BlogPost; children: ReactNode }) {
  const updated = post.updated !== post.published;

  return (
    <main className="min-h-screen bg-white text-[#1c1712]">
      <Header />

      {/* ── Header ── */}
      <section className="w-full px-6 pb-10 pt-28 sm:px-8 lg:px-12">
        <Breadcrumbs items={[{ title: "Home", href: "/" }, { title: "Blog", href: "/blog" }, { title: post.crumb, href: blogPath(post.slug) }]} />
        <p className={`mt-8 ${eyebrow}`}>{post.category}</p>
        <h1 className="mt-3 max-w-5xl text-[2.4rem] font-bold leading-[1.06] tracking-[-0.035em] sm:text-[3.3rem]">{post.h1}</h1>
        <p className="mt-5 max-w-3xl text-[18px] leading-8 text-[#1c1712]/60">{post.dek}</p>
        <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-[#1c1712]/50">
          <span className="font-semibold text-[#1c1712]/70">By the HueFlow team</span>
          <span aria-hidden="true">·</span>
          <time dateTime={post.updated}>{updated ? `Updated ${formatDate(post.updated)}` : formatDate(post.published)}</time>
          <span aria-hidden="true">·</span>
          <span>{post.readMinutes} min read</span>
        </p>
        <div className="mt-8 flex h-16 overflow-hidden rounded-2xl ring-1 ring-black/[0.07] sm:h-20" aria-hidden="true">
          {post.cover.map((c) => (
            <div key={c} className="flex flex-1 items-end p-2.5" style={{ backgroundColor: c }} />
          ))}
        </div>
      </section>

      {/* ── Short answer ── */}
      <section className="w-full px-6 pb-4 sm:px-8 lg:px-12">
        <div className="max-w-4xl rounded-2xl bg-[#f5f5f5] p-5 sm:p-7">
          <p className={eyebrow}>Short answer</p>
          <p className="hub-answer mt-2 text-[1.12rem] font-medium leading-8 tracking-[-0.01em] text-[#1c1712]/85">{post.answer}</p>
        </div>
      </section>

      {/* ── Body ── */}
      <section className="w-full px-6 pb-16 pt-10 sm:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-16">
          <article className={prose}>{children}</article>

          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-8">
              <nav aria-label="On this page">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1c1712]/45">On this page</p>
                <ul className="mt-3 space-y-1.5 border-l border-black/[0.08]">
                  {post.toc.map((t) => (
                    <li key={t.id}>
                      <a href={`#${t.id}`} className="-ml-px block border-l border-transparent py-1 pl-4 text-[14px] leading-5 text-[#1c1712]/60 transition hover:border-[#c2410c] hover:text-[#1c1712]">
                        {t.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="rounded-2xl p-5 ring-1 ring-black/[0.07]">
                <p className="text-[14px] font-semibold">Try the colors</p>
                <p className="mt-1 text-[13px] leading-5 text-[#1c1712]/55">Build a palette around any color in this post and export it.</p>
                <Link href="/generator" className="mt-3 inline-block rounded-full bg-[#1c1712] px-4 py-2 text-[13px] font-semibold text-white transition hover:bg-[#c2410c]">
                  Open the generator
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="scroll-mt-24 border-t border-black/[0.06]">
        <div className="w-full px-6 py-14 sm:px-8 lg:px-12">
          <p className={eyebrow}>FAQ</p>
          <h2 className="mt-2 text-[1.75rem] font-semibold tracking-[-0.03em]">Frequently asked questions</h2>
          <div className="mt-6">
            <Faq items={post.faq} wide />
          </div>
        </div>
      </section>

      {post.sources.length > 0 && (
        <section className="border-t border-black/[0.06]">
          <div className="w-full px-6 py-12 sm:px-8 lg:px-12">
            <p className={eyebrow}>Sources</p>
            <h2 className="mt-2 text-[1.35rem] font-semibold tracking-[-0.02em]">Where these facts come from</h2>
            <ul className="mt-5 grid gap-2 text-[14px] sm:grid-cols-2">
              {post.sources.map((s) => (
                <li key={s.url} className="min-w-0">
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="block truncate text-[#1c1712]/70 underline underline-offset-2 transition hover:text-[#c2410c]">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="border-t border-black/[0.06]">
        <div className="w-full px-6 py-14 sm:px-8 lg:px-12">
          <p className={eyebrow}>Keep exploring</p>
          <h2 className="mt-2 text-[1.75rem] font-semibold tracking-[-0.03em]">Related tools and guides</h2>
          <div className="mt-6">
            <RelatedLinks links={post.related} />
          </div>
        </div>
      </section>
    </main>
  );
}
