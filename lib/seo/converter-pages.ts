import {
  FORMAT_LABEL,
  formatters,
  parseHex,
  rgbToHsl,
  rgbToOklab,
  rgbToOklch,
  rgbToCmyk,
  rgbToHex,
  type ColorFormat,
  type RGB,
} from "@/lib/color-convert";
import { findClosestColorName } from "@/lib/color-names";
import { converterPairSpecs } from "@/lib/seo/converter-specs";

export { FORMAT_LABEL, FORMAT_PLACEHOLDER } from "@/lib/color-convert";

const FORMAT_BLURB: Record<ColorFormat, string> = {
  hex: "HEX is a six-digit hexadecimal color code written after a #, such as #3B82F6. Each pair of digits sets the red, green or blue channel from 00 to FF (0 to 255).",
  rgb: "RGB describes a color by its red, green and blue light levels, each from 0 to 255, such as rgb(59, 130, 246). It is the native color model of screens, and CSS lets you add transparency with an alpha value.",
  rgba: "RGBA is RGB plus an alpha channel for opacity, such as rgba(59, 130, 246, 0.5). Red, green and blue run from 0 to 255; alpha runs from 0 (fully transparent) to 1 (fully opaque).",
  hsl: "HSL stands for hue (0 to 360 degrees on the color wheel), saturation (0 to 100%) and lightness (0 to 100%), such as hsl(217, 91%, 60%). It is popular in design systems because changing one number makes a color lighter, darker or more muted.",
  cmyk: "CMYK stands for cyan, magenta, yellow and key (black), the four inks used in print. Values are percentages from 0 to 100, such as cmyk(76%, 47%, 0%, 4%).",
  oklch: "OKLCH is a perceptual color format built on the OKLab color space: lightness (0 to 100%), chroma (color intensity) and hue (0 to 360 degrees), such as oklch(62.3% 0.188 259.8). Equal steps in lightness look equally light to the eye, which makes it useful for building accessible color scales.",
};

const CSS_SUPPORT: Record<ColorFormat, string> = {
  hex: "Yes. HEX works everywhere in CSS, including the 3-digit shorthand (#38F) and the 8-digit form with alpha (#3B82F680).",
  rgb: "Yes. Write rgb(59 130 246) or rgb(59, 130, 246), and add transparency with rgb(59 130 246 / 50%) or rgba().",
  rgba: "Yes. rgba(59, 130, 246, 0.5) works in every browser. Modern CSS also accepts the alpha inside rgb(), as rgb(59 130 246 / 50%), and both mean the same color.",
  hsl: "Yes. Write hsl(217 91% 60%) or hsl(217, 91%, 60%), and add transparency with hsl(217 91% 60% / 50%).",
  cmyk: "Not directly. Browsers do not support a cmyk() color function in CSS, so convert CMYK to HEX or RGB for the web. CMYK values are mainly used in print design tools.",
  oklch: "Yes, in current versions of Chrome, Edge, Safari and Firefox. Add a HEX or RGB fallback if you need to support older browsers.",
};

const FORMAT_USE: Record<ColorFormat, string> = {
  hex: "HEX is the most common format in CSS, design tools and style guides, and it is compact and easy to copy",
  rgb: "RGB is handy when you need per-channel values, transparency or canvas and image-processing code",
  rgba: "RGBA is the format for see-through colors: overlays, shadows, glass effects and tinted backgrounds, where the opacity is easy to read and change",
  hsl: "HSL is the easiest format to adjust by hand, because you can change lightness or saturation without touching the hue",
  cmyk: "CMYK is the format for print work, where colors are mixed from cyan, magenta, yellow and black ink",
  oklch: "OKLCH gives the most even lightness steps, so it is best for generating color scales and accessible palettes",
};

const TO_RGB_METHOD: Record<ColorFormat, string> = {
  hex: "split the HEX code into red, green and blue pairs and convert each pair from base 16 to a number from 0 to 255",
  rgb: "read the red, green and blue values (0 to 255)",
  rgba: "read the red, green and blue values (0 to 255) and the alpha (0 to 1)",
  hsl: "turn hue, saturation and lightness into chroma and a hue sector, then scale the result to 0 to 255",
  cmyk: "multiply 255 by (1 - ink) and (1 - black) for each channel",
  oklch: "convert lightness, chroma and hue to OKLab, then to linear sRGB, apply the sRGB gamma curve and scale to 0 to 255",
};

const FROM_RGB_METHOD: Record<ColorFormat, string> = {
  hex: "write each channel as a two-digit hexadecimal number and join them after a #",
  rgb: "write the three channels as rgb(red, green, blue)",
  rgba: "write the channels as rgba(red, green, blue, alpha), where alpha is the last HEX pair divided by 255, or 1 when there is none",
  hsl: "normalize each channel to 0 to 1, take lightness as the average of the highest and lowest channels, then derive saturation and hue from their difference",
  cmyk: "take black as 1 minus the highest channel, then compute cyan, magenta and yellow from what remains",
  oklch: "remove the sRGB gamma curve, multiply by the OKLab matrices, then convert lightness, a and b to lightness, chroma and hue",
};

export type ConverterSample = { name: string; hex: string; from: string; to: string };

export type ConverterPair = {
  slug: string;
  path: string;
  from: ColorFormat;
  to: ColorFormat;
  fromLabel: string;
  toLabel: string;
  title: string;
  description: string;
  h1: string;
  keywords: string[];
  answer: string;
  /** The color used for the worked example and the default value in the tool. */
  exampleHex: string;
  exampleName: string;
  exampleFrom: string;
  exampleTo: string;
  steps: string[];
  samples: ConverterSample[];
  faq: Array<{ question: string; answer: string }>;
};

const SAMPLE_COLORS: Array<[string, string]> = [
  ["Red", "#FF0000"],
  ["Orange", "#F97316"],
  ["Yellow", "#FACC15"],
  ["Green", "#22C55E"],
  ["Teal", "#14B8A6"],
  ["Sky blue", "#0EA5E9"],
  ["Blue", "#3B82F6"],
  ["Purple", "#8B5CF6"],
  ["Pink", "#EC4899"],
  ["Black", "#000000"],
  ["Gray", "#808080"],
  ["White", "#FFFFFF"],
];

// HEX alpha pairs for 100% down to 0% opacity, one per sample color.
const ALPHA_STEPS = ["FF", "E6", "CC", "BF", "99", "80", "66", "40", "33", "1A", "0D", "00"];

const f2 = (n: number) => String(Math.round(n * 100) / 100);
const f3 = (n: number) => String(Math.round(n * 1000) / 1000);

function toRgbSteps(from: ColorFormat, rgb: RGB, exampleFrom: string): string[] {
  const hexPairs = [rgb.r, rgb.g, rgb.b].map((v) => Math.round(v).toString(16).padStart(2, "0").toUpperCase());
  switch (from) {
    case "hex": {
      if (rgb.a !== undefined) {
        const alphaPair = Math.round(rgb.a * 255).toString(16).padStart(2, "0").toUpperCase();
        return [
          `Remove the # and split the code into four pairs: R = ${hexPairs[0]}, G = ${hexPairs[1]}, B = ${hexPairs[2]} and alpha A = ${alphaPair}.`,
          `Convert each pair from hexadecimal (base 16) to decimal: ${hexPairs[0]} = ${rgb.r}, ${hexPairs[1]} = ${rgb.g}, ${hexPairs[2]} = ${rgb.b}, ${alphaPair} = ${Math.round(rgb.a * 255)}.`,
        ];
      }
      return [
        `Remove the # and split the code into three pairs: R = ${hexPairs[0]}, G = ${hexPairs[1]}, B = ${hexPairs[2]}.`,
        `Convert each pair from hexadecimal (base 16) to decimal: ${hexPairs[0]} = ${rgb.r}, ${hexPairs[1]} = ${rgb.g}, ${hexPairs[2]} = ${rgb.b}.`,
      ];
    }
    case "rgb":
    case "rgba":
      return [`Start with the three channel values of ${exampleFrom}: R = ${rgb.r}, G = ${rgb.g}, B = ${rgb.b}. Each runs from 0 to 255.`];
    case "hsl": {
      const { h, s, l } = rgbToHsl(rgb);
      const sn = s / 100, ln = l / 100;
      const c = (1 - Math.abs(2 * ln - 1)) * sn;
      const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
      const m = ln - c / 2;
      return [
        `Convert saturation and lightness to fractions: S = ${f2(sn)}, L = ${f2(ln)} (hue H = ${h}).`,
        `Compute chroma C = (1 - |2L - 1|) x S = ${f3(c)}, then X = C x (1 - |(H / 60) mod 2 - 1|) = ${f3(x)} and m = L - C / 2 = ${f3(m)}.`,
        `Pick (R', G', B') from the hue sector, add m to each, and multiply by 255 to get R = ${rgb.r}, G = ${rgb.g}, B = ${rgb.b}.`,
      ];
    }
    case "cmyk": {
      const { c, m, y, k } = rgbToCmyk(rgb);
      return [
        `Convert the percentages to fractions: C = ${f2(c / 100)}, M = ${f2(m / 100)}, Y = ${f2(y / 100)}, K = ${f2(k / 100)}.`,
        `Apply R = 255 x (1 - C) x (1 - K), G = 255 x (1 - M) x (1 - K), B = 255 x (1 - Y) x (1 - K) to get R = ${rgb.r}, G = ${rgb.g}, B = ${rgb.b}.`,
      ];
    }
    case "oklch": {
      const { l, c, h } = rgbToOklch(rgb);
      const hr = (h * Math.PI) / 180;
      return [
        `Convert OKLCH to OKLab: a = C x cos(h) = ${f3(c * Math.cos(hr))} and b = C x sin(h) = ${f3(c * Math.sin(hr))}, with L = ${f3(l)}.`,
        "Multiply the OKLab values by the inverse OKLab matrices to get linear-light sRGB.",
        `Apply the sRGB gamma curve and scale to 0 to 255: R = ${rgb.r}, G = ${rgb.g}, B = ${rgb.b}. Colors outside the sRGB gamut are clamped.`,
      ];
    }
  }
}

function fromRgbSteps(to: ColorFormat, rgb: RGB): string[] {
  const rn = rgb.r / 255, gn = rgb.g / 255, bn = rgb.b / 255;
  const hexPairs = [rgb.r, rgb.g, rgb.b].map((v) => Math.round(v).toString(16).padStart(2, "0").toUpperCase());
  switch (to) {
    case "hex":
      return [
        `Convert each channel to a two-digit hexadecimal number, padding with a leading 0 when needed: ${rgb.r} = ${hexPairs[0]}, ${rgb.g} = ${hexPairs[1]}, ${rgb.b} = ${hexPairs[2]}.`,
        `Join the pairs after a #: #${hexPairs.join("")}.`,
      ];
    case "rgb":
      return [`Write the three values as rgb(${rgb.r}, ${rgb.g}, ${rgb.b}).`];
    case "rgba": {
      const a255 = Math.round((rgb.a ?? 1) * 255);
      return [
        `Divide the alpha by 255 to get a value from 0 to 1: ${a255} / 255 = ${f3(a255 / 255)}, which rounds to ${f2(a255 / 255)}. With no alpha pair, alpha is 1.`,
        `Write the result as ${formatters.rgba(rgb)}.`,
      ];
    }
    case "hsl": {
      const { h, s, l } = rgbToHsl(rgb);
      return [
        `Divide each channel by 255: R' = ${f3(rn)}, G' = ${f3(gn)}, B' = ${f3(bn)}.`,
        `Lightness is the average of the highest and lowest values: L = ${l}%. Saturation comes from their difference: S = ${s}%.`,
        `Hue depends on which channel is highest, converted to degrees on the color wheel: H = ${h} degrees. Result: hsl(${h}, ${s}%, ${l}%).`,
      ];
    }
    case "cmyk": {
      const { c, m, y, k } = rgbToCmyk(rgb);
      return [
        `Divide each channel by 255: R' = ${f3(rn)}, G' = ${f3(gn)}, B' = ${f3(bn)}.`,
        `Black is K = 1 - max(R', G', B') = ${f3(k / 100)}.`,
        `Cyan, magenta and yellow are C = (1 - R' - K) / (1 - K) = ${f3(c / 100)}, M = ${f3(m / 100)} and Y = ${f3(y / 100)}. Result: cmyk(${c}%, ${m}%, ${y}%, ${k}%).`,
      ];
    }
    case "oklch": {
      const { L, a, b } = rgbToOklab(rgb);
      const { l, c, h } = rgbToOklch(rgb);
      return [
        "Convert each channel to linear light by removing the sRGB gamma curve.",
        `Multiply by the OKLab matrices to get lightness and the two color axes: L = ${f3(L)}, a = ${f3(a)}, b = ${f3(b)}.`,
        `Chroma is C = sqrt(a^2 + b^2) = ${c} and hue is h = atan2(b, a) = ${h} degrees. Result: oklch(${f2(l * 100)}% ${c} ${h}).`,
      ];
    }
  }
}

function accuracyNote(from: ColorFormat, to: ColorFormat): string {
  const set = [from, to];
  if (set.includes("hex") && set.includes("rgba")) {
    return "The red, green and blue values are exact. Alpha is stored as 0 to 255 in HEX and written as a decimal in RGBA, rounded to two places, so 80 becomes 0.5 (exactly 0.502). Converting back gives the same HEX code.";
  }
  if (set.includes("hex") && set.includes("rgb")) {
    return "Yes. HEX and RGB store exactly the same 8-bit channel values, so converting between them is lossless in both directions.";
  }
  if (set.includes("cmyk")) {
    return "It is an approximation. HueFlow uses the standard device-independent formula, which does not use an ICC print profile, so printed results can differ from what you see on screen. Ask your printer for profile-based conversions when color accuracy matters.";
  }
  if (set.includes("oklch")) {
    return "Values are rounded, so a color inside the sRGB gamut converts back to within about 1 per channel. OKLCH can describe colors outside sRGB, and converting those to HEX or RGB clamps them to the nearest displayable color.";
  }
  if (to === "hsl") {
    return "HSL values are normally rounded to whole numbers, so converting back can shift a channel by 1. For exact values, keep the original color code.";
  }
  return "Nearly. The result is rounded to whole RGB values, so it can differ by 1 from the color you started with. For exact values, keep the original color code.";
}

function buildPair([from, to, exampleHex]: [ColorFormat, ColorFormat, string]): ConverterPair {
  const fromLabel = FORMAT_LABEL[from];
  const toLabel = FORMAT_LABEL[to];
  const slug = `${from}-to-${to}`;
  const rgb = parseHex(exampleHex)!;
  const exampleFrom = formatters[from](rgb);
  const exampleTo = formatters[to](rgb);
  const exampleName = findClosestColorName(rgbToHex(rgb));

  const method =
    from === "rgb"
      ? FROM_RGB_METHOD[to]
      : to === "rgb"
        ? TO_RGB_METHOD[from]
        : `first convert the ${fromLabel} value to RGB, then ${FROM_RGB_METHOD[to]}`;

  const steps = [...toRgbSteps(from, rgb, exampleFrom), ...fromRgbSteps(to, rgb)];

  // On the RGBA page each sample gets a different alpha, so the table doubles as an opacity chart.
  const samples = SAMPLE_COLORS.map(([name, hex], i) => {
    const c = parseHex(to === "rgba" ? hex + ALPHA_STEPS[i] : hex)!;
    return { name, hex, from: formatters[from](c), to: formatters[to](c) };
  });

  return {
    slug,
    path: `/${slug}`,
    from,
    to,
    fromLabel,
    toLabel,
    title: `${fromLabel} to ${toLabel} Converter: Free Online Color Code Tool`,
    description: `Convert ${fromLabel} color codes to ${toLabel} instantly. Free ${fromLabel} to ${toLabel} converter with live preview, copy-ready ${toLabel} values, the formula and worked examples. No signup.`,
    h1: `${fromLabel} to ${toLabel} Converter`,
    keywords: [
      `${fromLabel.toLowerCase()} to ${toLabel.toLowerCase()}`,
      `${fromLabel.toLowerCase()} to ${toLabel.toLowerCase()} converter`,
      `${fromLabel.toLowerCase()} to ${toLabel.toLowerCase()} color converter`,
      `convert ${fromLabel.toLowerCase()} to ${toLabel.toLowerCase()}`,
      `${fromLabel.toLowerCase()} ${toLabel.toLowerCase()} converter online`,
      `${toLabel.toLowerCase()} color code`,
    ],
    answer: `To convert ${fromLabel} to ${toLabel}, ${method}. For example, ${exampleFrom} (${exampleName}) is ${exampleTo}. Enter any ${fromLabel} value below and HueFlow shows the ${toLabel} result instantly, ready to copy.`,
    exampleHex,
    exampleName,
    exampleFrom,
    exampleTo,
    steps,
    samples,
    faq: [
      {
        question: `How do I convert ${fromLabel} to ${toLabel}?`,
        answer: `Enter your ${fromLabel} value in the converter and HueFlow shows the ${toLabel} equivalent instantly, with one-click copy. By hand: ${method}.`,
      },
      {
        question: `What is ${exampleFrom} in ${toLabel}?`,
        answer: `${exampleFrom} is ${exampleTo} in ${toLabel}. The color is close to ${exampleName}.`,
      },
      {
        question: `What is the ${toLabel} color format?`,
        answer: FORMAT_BLURB[to],
      },
      {
        question: `Is converting ${fromLabel} to ${toLabel} exact?`,
        answer: accuracyNote(from, to),
      },
      {
        question: `Can I use ${toLabel} values in CSS?`,
        answer: CSS_SUPPORT[to],
      },
      {
        question: `When should I use ${toLabel} instead of ${fromLabel}?`,
        answer: `${FORMAT_USE[to]}. ${FORMAT_USE[from]}. Pick the one that fits the tool or medium you are working in, and convert whenever you need the other.`,
      },
    ],
  };
}

export const converterPairs: ConverterPair[] = converterPairSpecs.map(buildPair);

export const converterSlugs = converterPairs.map((p) => p.slug);

export function getConverterPair(slug: string): ConverterPair | undefined {
  return converterPairs.find((p) => p.slug === slug);
}

export function getReverseConverter(pair: ConverterPair): ConverterPair | undefined {
  return converterPairs.find((p) => p.from === pair.to && p.to === pair.from);
}
