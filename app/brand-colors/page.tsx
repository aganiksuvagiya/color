import type { Metadata } from "next";

import { StructuredData } from "@/components/seo/structured-data";
import { buildHubMetadata, renderHub } from "@/lib/seo/page-utils";
import { buildFaqSchema, buildSpeakableSchema } from "@/lib/seo/schema";

export const metadata: Metadata = buildHubMetadata("/brand-colors");
export const revalidate = false;

const faqSchema = buildFaqSchema([
  { question: "What colors do top brands use?", answer: "Apple uses white and silver for simplicity. Coca-Cola uses red for energy and excitement. Facebook and PayPal use blue for trust. McDonald's uses red and yellow for appetite and urgency. Most successful brands choose 1-2 primary colors that match their core brand personality." },
  { question: "What is brand color strategy?", answer: "Brand color strategy is the deliberate selection of colors that communicate your brand's personality, values, and positioning. It includes a primary brand color, supporting secondary colors, and neutral tones — all chosen to trigger specific emotions in your target audience." },
  { question: "How do I choose brand colors?", answer: "Start with your brand personality (trustworthy, energetic, luxurious, or playful). Match it to a primary hue: blue for trust, red/orange for energy, green for growth, purple for luxury. Then build a full palette with secondary colors and neutrals. Test contrast ratios for accessibility." },
  { question: "What colors work best for tech and SaaS brands?", answer: "Blue is the dominant color for tech brands (Salesforce, LinkedIn, Dell) because it signals trust and reliability. Purple is popular for innovative SaaS (Slack, Twitch). Dark themes with accent colors like teal or cyan are common for developer tools." },
  { question: "What colors work best for healthcare brands?", answer: "Blue and green dominate healthcare branding. Blue signals trust and clinical authority; green signals health, growth, and wellness. White backgrounds reinforce cleanliness. Avoid red except for emergency or alert contexts, as it can trigger anxiety in healthcare settings." },
]);

export default function BrandColorsPage() {
  return (
    <>
      <StructuredData data={faqSchema} />
      <StructuredData data={buildSpeakableSchema(["h1", "h2", ".hub-description", ".hub-answer"])} />
      {renderHub("/brand-colors")}
    </>
  );
}
