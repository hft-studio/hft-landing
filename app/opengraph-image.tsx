import { ImageResponse } from "next/og";

export const alt = "HFT Labs — Software for the AI era";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Concentric rings mirroring the hero's <MagicRings> (#a855f7 -> #6366f1).
const rings = [
  { size: 360, color: "rgba(168, 85, 247, 0.55)" },
  { size: 540, color: "rgba(139, 92, 246, 0.42)" },
  { size: 720, color: "rgba(124, 92, 246, 0.30)" },
  { size: 900, color: "rgba(99, 102, 241, 0.20)" },
  { size: 1080, color: "rgba(99, 102, 241, 0.12)" },
  { size: 1260, color: "rgba(99, 102, 241, 0.07)" },
];

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#000000",
          padding: "80px",
          fontFamily: "sans-serif",
          overflow: "hidden",
        }}
      >
        {/* Dotted grid — mirrors <DotField> */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.14) 1.6px, transparent 1.6px)",
            backgroundSize: "18px 18px",
          }}
        />

        {/* Purple core glow */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: "1000px",
            height: "1000px",
            transform: "translate(-50%, -50%)",
            backgroundImage:
              "radial-gradient(circle, rgba(168,85,247,0.40) 0%, rgba(99,102,241,0.18) 35%, rgba(0,0,0,0) 65%)",
            display: "flex",
          }}
        />

        {/* Concentric rings */}
        {rings.map((ring) => (
          <div
            key={ring.size}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: `${ring.size}px`,
              height: `${ring.size}px`,
              transform: "translate(-50%, -50%)",
              borderRadius: "9999px",
              border: `2px solid ${ring.color}`,
              display: "flex",
            }}
          />
        ))}

        {/* Header */}
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              fontSize: 44,
              fontWeight: 800,
              letterSpacing: "-0.04em",
              color: "#ffffff",
            }}
          >
            HFT
          </div>
          <div
            style={{
              fontSize: 22,
              color: "#a3a3a3",
              borderLeft: "1px solid #333",
              paddingLeft: "16px",
            }}
          >
            AI-native software studio
          </div>
        </div>

        {/* Headline */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          <div
            style={{
              fontSize: 96,
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
              color: "#ffffff",
            }}
          >
            Software for the AI era.
          </div>
          <div
            style={{
              fontSize: 30,
              color: "#cbb6f0",
              maxWidth: "900px",
              lineHeight: 1.4,
            }}
          >
            Products at the intersection of artificial intelligence, digital
            assets, and data-driven web applications.
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            position: "relative",
            display: "flex",
            fontSize: 26,
            color: "#737373",
          }}
        >
          hftlabs.xyz
        </div>
      </div>
    ),
    { ...size }
  );
}
