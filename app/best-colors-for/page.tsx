import type { Metadata } from "next";

import { StructuredData } from "@/components/seo/structured-data";
import { buildPageMetadata, renderHub } from "@/lib/seo/page-utils";
import { buildFaqSchema, buildSpeakableSchema } from "@/lib/seo/schema";

export const metadata: Metadata = buildPageMetadata({
  title: "Best Colors For Every Industry & Use Case",
  description: "Discover the best colors for your website, brand, or app — expert color guides for SaaS, healthcare, fitness, finance, education, and more.",
  path: "/best-colors-for",
});
export const revalidate = false;

const faqSchema = buildFaqSchema([
  { question: "What are the best colors for a website?", answer: "The best website colors depend on your industry. Blue works for trust (SaaS, finance, healthcare). Green for growth and wellness. Orange and red for energy and urgency. Always pair your primary color with a neutral background and high-contrast text." },
  { question: "What is the best color for a business website?", answer: "Blue is the most common choice for business websites because it signals trust and professionalism. Pair with white backgrounds and dark gray text for a clean, credible look." },
  { question: "What colors attract customers?", answer: "Orange and red create urgency and drive action. Blue builds trust and reduces friction. Green signals safety and growth. Yellow grabs attention. The best color depends on what emotion you want to trigger in your customers." },
  { question: "What color is best for a healthcare website?", answer: "Blue and green are the most effective colors for healthcare websites. Blue builds trust and calm authority; green signals health, growth, and wellness. Avoid red except for emergency or alert contexts." },
  { question: "What color increases sales on a website?", answer: "Orange and red CTAs are shown to increase click-through rates by creating urgency. However, the best color depends on the context — contrast with the surrounding page matters more than the specific color choice." },
]);

export default function BestColorsForPage() {
  return (
    <>
      <StructuredData data={faqSchema} />
      <StructuredData data={buildSpeakableSchema(["h1", "h2", ".hub-description", ".hub-answer"])} />
      {renderHub("/best-colors-for")}
    </>
  );
}
