import type { Metadata } from "next";

import { StructuredData } from "@/components/seo/structured-data";
import { renderHub, buildHubMetadata } from "@/lib/seo/page-utils";
import { buildFaqSchema, buildSpeakableSchema } from "@/lib/seo/schema";

export const metadata: Metadata = buildHubMetadata("/colors");
export const revalidate = false;

const faqSchema = buildFaqSchema([
  { question: "What is a color hex code?", answer: "A hex code is a 6-character code (e.g. #FF0000) that represents a color in red, green, and blue values. It is widely used in CSS, design tools, and web development." },
  { question: "What is the hex code for blue?", answer: "Pure blue is #0000FF. Common design blues include #3B82F6 (Tailwind blue-500) and #1E40AF (Tailwind blue-800)." },
  { question: "What is the hex code for red?", answer: "Pure red is #FF0000. Common design reds include #EF4444 (Tailwind red-500) and #DC2626 (Tailwind red-600)." },
  { question: "How do I convert HEX to RGB?", answer: "Split the hex code into two-character pairs and convert each from hex to decimal. #FF0000 = RGB(255, 0, 0). Use HueFlow's free color converter for instant results." },
  { question: "What colors go well together?", answer: "Complementary colors (opposite on the color wheel) create high contrast. Analogous colors (adjacent) feel harmonious. Use HueFlow's color harmony tool to find matching palettes." },
]);

export default function ColorsPage() {
  return (
    <>
      <StructuredData data={faqSchema} />
      <StructuredData data={buildSpeakableSchema(["h1", "h2", ".hub-description", ".hub-answer"])} />
      {renderHub("/colors")}
    </>
  );
}
