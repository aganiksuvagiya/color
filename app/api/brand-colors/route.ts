import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();
    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    let targetUrl = url.trim();
    if (!targetUrl.startsWith("http")) targetUrl = `https://${targetUrl}`;

    const screenshotUrl = `https://image.thum.io/get/width/1280/crop/800/${targetUrl}`;

    const res = await fetch(screenshotUrl, {
      signal: AbortSignal.timeout(15000),
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Could not capture website screenshot" }, { status: 400 });
    }

    const buffer = await res.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");
    const contentType = res.headers.get("content-type") || "image/png";

    return NextResponse.json({
      screenshot: `data:${contentType};base64,${base64}`,
      url: targetUrl,
    });
  } catch {
    return NextResponse.json({ error: "Failed to analyze website. Check the URL and try again." }, { status: 500 });
  }
}
