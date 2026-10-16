import type { Metadata } from "next";

import { StructuredData } from "@/components/seo/structured-data";
import { buildHubMetadata, renderHub } from "@/lib/seo/page-utils";
import { buildFaqSchema, buildSpeakableSchema } from "@/lib/seo/schema";

export const metadata: Metadata = buildHubMetadata("/accessibility");
export const revalidate = false;

const faqSchema = buildFaqSchema([
  { question: "What is color contrast accessibility?", answer: "Color contrast accessibility means ensuring there is enough difference in lightness between text and its background so that people with low vision or color blindness can read it clearly. It is measured as a contrast ratio, with higher numbers meaning more contrast." },
  { question: "What is WCAG color contrast?", answer: "WCAG (Web Content Accessibility Guidelines) defines minimum contrast ratios for accessible text. WCAG AA requires 4.5:1 for normal text and 3:1 for large text. WCAG AAA requires 7:1 for normal text and 4.5:1 for large text. These are the global standard for web accessibility." },
  { question: "What is the minimum contrast ratio for accessible text?", answer: "The minimum contrast ratio for normal text is 4.5:1 under WCAG AA guidelines, which most websites must meet. Large text (18pt or 14pt bold) only requires 3:1. For the highest accessibility standard (WCAG AAA), the ratio is 7:1 for normal text." },
  { question: "How do I make my color palette accessible?", answer: "Check every text-background color pair with a contrast checker. Aim for 4.5:1 minimum (WCAG AA). Avoid relying on color alone to convey meaning — add icons or text labels. Test your palette using a colorblind simulator to ensure it works for deuteranopia and protanopia users." },
  { question: "What colors are difficult for colorblind users?", answer: "Red-green combinations are the most problematic — about 8% of men have red-green color blindness (deuteranopia or protanopia). Avoid using red and green as the only differentiator. Blue-yellow combinations are safer. Use HueFlow's colorblind simulator to preview how your palette appears to affected users." },
]);

export default function AccessibilityPage() {
  return (
    <>
      <StructuredData data={faqSchema} />
      <StructuredData data={buildSpeakableSchema(["h1", "h2", ".hub-description", ".hub-answer"])} />
      {renderHub("/accessibility")}
    </>
  );
}
