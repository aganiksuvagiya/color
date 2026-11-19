import type { Metadata } from "next";

import { StructuredData } from "@/components/seo/structured-data";
import { buildPageMetadata, renderHub } from "@/lib/seo/page-utils";
import { buildFaqSchema } from "@/lib/seo/schema";

export const metadata: Metadata = buildPageMetadata({
  title: "FAQs",
  description: "Short answer pages optimized for featured snippets, AI overviews, and conversational citations.",
  path: "/faqs",
});
export const revalidate = false;

const faqSchema = buildFaqSchema([
  { question: "What is HueFlow?", answer: "HueFlow is a free color tool for designers, developers, and marketers. It includes a palette generator, contrast checker, gradient builder, color meaning guides, and brand color references." },
  { question: "Is HueFlow free to use?", answer: "Yes, HueFlow is completely free with no account required for core tools." },
  { question: "What tools does HueFlow offer?", answer: "HueFlow offers a palette generator, color picker, contrast checker, gradient generator, image color extractor, Tailwind color reference, color psychology explorer, colorblind simulator, and design token generator." },
  { question: "Does HueFlow support WCAG accessibility?", answer: "Yes, HueFlow's contrast checker and contrast fixer tool are built around WCAG 2.1 AA and AAA guidelines." },
  { question: "Can I use HueFlow for brand colors?", answer: "Yes, HueFlow has dedicated brand color guides and a brand color analyzer tool to help you choose and validate brand colors." },
]);

export default function FaqsPage() {
  return (
    <>
      <StructuredData data={faqSchema} />
      {renderHub("/faqs")}
    </>
  );
}
