import { ImageResponse } from "next/og";
import { SITE } from "@/lib/seo";

export const alt = `${SITE.name} · ${SITE.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#000000",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top: brand */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              width: 0,
              height: 0,
              borderLeft: "26px solid transparent",
              borderRight: "26px solid transparent",
              borderBottom: "44px solid #12ebd6",
            }}
          />
          <div
            style={{ color: "#ffffff", fontSize: 44, fontWeight: 700, letterSpacing: "-0.02em" }}
          >
            {SITE.name}
          </div>
        </div>

        {/* Middle: headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "#ffffff",
              fontSize: 88,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.04em",
              maxWidth: "900px",
            }}
          >
            Digital transformation
            <br />
            <span style={{ color: "#12ebd6" }}>for Africa.</span>
          </div>
        </div>

        {/* Bottom: meta */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            color: "#9a9a95",
            fontSize: 28,
            letterSpacing: "0.04em",
          }}
        >
          <span>Brazzaville · Republic of Congo</span>
          <span>akieni.com</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
