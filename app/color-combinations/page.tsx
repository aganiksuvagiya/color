import type { Metadata } from "next";

import { StructuredData } from "@/components/seo/structured-data";
import { buildHubMetadata, renderHub } from "@/lib/seo/page-utils";
import { buildFaqSchema, buildSpeakableSchema } from "@/lib/seo/schema";

export const metadata: Metadata = buildHubMetadata("/color-combinations");
export const revalidate = false;

const faqSchema = buildFaqSchema([
  { question: "What colors go well together?", answer: "Complementary colors (opposite on the wheel) like blue and orange, or red and green, create strong contrast. Analogous colors like blue, teal, and green feel harmonious and calm." },
  { question: "What is a good color combination for a website?", answer: "A clean website palette often uses one primary color, a neutral background (white or light gray), and a dark text color. Example: blue + white + dark gray for SaaS sites." },
  { question: "What is the best color combination for a logo?", answer: "High-contrast pairs like black and gold (luxury), blue and white (trust), or orange and dark gray (energy) work well for logos. Choose based on your brand's personality." },
  { question: "What two colors make a good contrast?", answer: "Black and white offer the highest contrast (21:1). For accessible designs, aim for at least 4.5:1 contrast ratio between text and background colors per WCAG guidelines." },
]);

export default function ColorCombinationsPage() {
  return (
    <>
      <StructuredData data={faqSchema} />
      <StructuredData data={buildSpeakableSchema(["h1", "h2", ".hub-description", ".hub-answer"])} />
      {renderHub("/color-combinations")}
    </>
  );
}
