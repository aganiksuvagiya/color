import { NextRequest, NextResponse } from "next/server";
import chromium from "@sparticuz/chromium";
import puppeteer, { type Page } from "puppeteer-core";

export const maxDuration = 60;
export const runtime = "nodejs";

const NAV_TIMEOUT_MS = 25000;
const POST_LOAD_SETTLE_MS = 1500;

// Common markers left on Cloudflare (and similar) bot-challenge pages —
// checked so we return a clear error instead of silently extracting colors
// from the block page instead of the real site.
const CHALLENGE_MARKERS = [
  "verify you are human",
  "checking if the site connection is secure",
  "cf-turnstile",
  "just a moment",
  "attention required! | cloudflare",
];

async function isBotChallengePage(page: Page): Promise<boolean> {
  const [title, bodyText] = await Promise.all([
    page.title().catch(() => ""),
    page.evaluate(() => document.body?.innerText?.slice(0, 500) ?? "").catch(() => ""),
  ]);
  const haystack = `${title} ${bodyText}`.toLowerCase();
  return CHALLENGE_MARKERS.some((marker) => haystack.includes(marker));
}

const LOCAL_CHROME_PATHS: Record<string, string> = {
  darwin: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  win32: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  linux: "/usr/bin/google-chrome",
};

async function resolveExecutablePath(): Promise<string> {
  if (process.env.PUPPETEER_EXECUTABLE_PATH) return process.env.PUPPETEER_EXECUTABLE_PATH;
  if (process.env.VERCEL) return chromium.executablePath();
  return LOCAL_CHROME_PATHS[process.platform] || (await chromium.executablePath());
}

export async function POST(request: NextRequest) {
  let browser: Awaited<ReturnType<typeof puppeteer.launch>> | null = null;

  try {
    const { url } = await request.json();
    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    let targetUrl = url.trim();
    if (!targetUrl.startsWith("http")) targetUrl = `https://${targetUrl}`;

    const executablePath = await resolveExecutablePath();

    browser = await puppeteer.launch({
      args: process.env.VERCEL ? chromium.args : [],
      defaultViewport: { width: 1280, height: 800 },
      executablePath,
      headless: true,
    });

    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(NAV_TIMEOUT_MS);

    try {
      await page.goto(targetUrl, { waitUntil: "networkidle2", timeout: NAV_TIMEOUT_MS });
    } catch (navErr) {
      // Some sites never go fully idle (polling widgets, analytics beacons) —
      // fall back to whatever loaded within the timeout instead of failing outright.
      if (!(navErr instanceof Error && navErr.name === "TimeoutError")) throw navErr;
    }

    // Let lazy-loaded images finish rendering after the load event.
    await new Promise((resolve) => setTimeout(resolve, POST_LOAD_SETTLE_MS));

    if (await isBotChallengePage(page)) {
      return NextResponse.json(
        { error: "This site is protected by a bot-verification challenge (e.g. Cloudflare) and can't be captured automatically." },
        { status: 400 },
      );
    }

    const screenshotBuffer = await page.screenshot({ type: "png" });

    return NextResponse.json({
      screenshot: `data:image/png;base64,${Buffer.from(screenshotBuffer).toString("base64")}`,
      url: targetUrl,
    });
  } catch (err) {
    const timedOut = err instanceof Error && err.name === "TimeoutError";
    const message = timedOut
      ? "The website took too long to load. It may be slow or blocking automated access."
      : "Failed to analyze website. Check the URL and try again.";
    return NextResponse.json({ error: message }, { status: timedOut ? 400 : 500 });
  } finally {
    if (browser) await browser.close();
  }
}
