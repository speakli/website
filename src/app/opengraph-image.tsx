import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Speakli – Assistant vocal IA pour soignants en EHPAD";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0c1d50 0%, #142875 50%, #0a1840 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: 48 }}>
          <span style={{ fontSize: 56, fontWeight: 800, color: "#ffffff", letterSpacing: "-2px" }}>Speak</span>
          <span style={{ fontSize: 56, fontWeight: 800, color: "#007AFF", letterSpacing: "-2px" }}>li</span>
        </div>

        {/* Headline */}
        <div style={{ fontSize: 60, fontWeight: 800, color: "#ffffff", lineHeight: 1.15, marginBottom: 28, maxWidth: 820 }}>
          L'assistant vocal IA pour vos soignants
        </div>

        {/* Subline */}
        <div style={{ fontSize: 28, color: "rgba(255,255,255,0.58)", maxWidth: 700, lineHeight: 1.5 }}>
          Documentez les soins à la voix. Traçabilité en temps réel, hébergement HDS certifié en France.
        </div>

        {/* Badges */}
        <div style={{ display: "flex", gap: 14, marginTop: 52 }}>
          {["HDS Certifié", "RGPD", "350+ soignants"].map((label) => (
            <div
              key={label}
              style={{
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 12,
                padding: "10px 22px",
                color: "rgba(255,255,255,0.65)",
                fontSize: 22,
                fontWeight: 600,
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
