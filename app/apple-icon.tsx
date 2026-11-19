import { ImageResponse } from "next/og";

// export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#e8531f",
          backgroundImage: "linear-gradient(135deg, #f97316 0%, #e8531f 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 84,
            fontWeight: 700,
            color: "#ffffff",
            fontFamily: "sans-serif",
          }}
        >
          H
        </div>
      </div>
    ),
    { ...size },
  );
}
