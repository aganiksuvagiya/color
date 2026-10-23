import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ComponentType } from "react";

import { BlogArticle } from "@/components/blog/blog-article";
import { ColorOfTheYear2027Post } from "@/components/blog/posts/color-of-the-year-2027";
import { NavyBluePost } from "@/components/blog/posts/colors-that-go-with-navy-blue";
import { CeleryPost, CottageDoorPost, GroundedPost, WebsterGreenPost } from "@/components/blog/posts/paint-picks-2027";
import { StructuredData } from "@/components/seo/structured-data";
import { blogPath, blogPosts, getBlogPost } from "@/lib/blog/posts";
import { buildPageMetadata } from "@/lib/seo/page-utils";
import { buildArticleSchema, buildBreadcrumbSchema, buildFaqSchema, buildSpeakableSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/lib/seo/site-config";

const BODIES: Record<string, ComponentType> = {
  "color-of-the-year-2027": ColorOfTheYear2027Post,
  "colors-that-go-with-navy-blue": NavyBluePost,
  "sherwin-williams-celery": CeleryPost,
  "benjamin-moore-webster-green": WebsterGreenPost,
  "behr-grounded": GroundedPost,
  "valspar-cottage-door": CottageDoorPost,
};

export const dynamicParams = false;

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const post = getBlogPost((await params).slug);
  if (!post) return {};
  const meta = buildPageMetadata({ title: post.title, description: post.description, path: blogPath(post.slug), keywords: post.keywords });
  return {
    ...meta,
    openGraph: { ...meta.openGraph, type: "article", publishedTime: post.published, modifiedTime: post.updated },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const post = getBlogPost((await params).slug);
  const Body = post ? BODIES[post.slug] : undefined;
  if (!post || !Body) notFound();

  const url = `${siteConfig.domain}${blogPath(post.slug)}`;

  return (
    <>
      <StructuredData
        data={{
          ...buildArticleSchema({ title: post.title, description: post.description, url, datePublished: post.published, dateModified: post.updated }),
          "@type": "BlogPosting",
          image: `${siteConfig.domain}/opengraph-image`,
          keywords: post.keywords.join(", "),
          articleSection: post.category,
          inLanguage: "en-US",
        }}
      />
      <StructuredData data={buildFaqSchema(post.faq)} />
      <StructuredData data={buildSpeakableSchema([".hub-answer", "h1"])} />
      <StructuredData
        data={buildBreadcrumbSchema([
          { name: "Home", item: siteConfig.domain },
          { name: "Blog", item: `${siteConfig.domain}/blog` },
          { name: post.crumb, item: url },
        ])}
      />
      <BlogArticle post={post}>
        <Body />
      </BlogArticle>
    </>
  );
}
