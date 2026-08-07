import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/site";

export const alt = `${siteConfig.name} — Desenvolvedor Full-Stack`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const COLORS = {
  bg: "#1e1e1e",
  panel: "#252526",
  border: "#333333",
  accent: "#10b981",
  text: "#ffffff",
  muted: "#8e8e8e",
};

const FILES = [
  "sobre-mim.css",
  "competências.css",
  "rosa-polar.app",
  "ze-chinelao.app",
];

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        background: COLORS.bg,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: 320,
          background: COLORS.panel,
          borderRight: `1px solid ${COLORS.border}`,
          padding: "40px 28px",
        }}
      >
        <div style={{ fontSize: 20, letterSpacing: 3, color: COLORS.muted }}>
          EXPLORER
        </div>
        <div style={{ display: "flex", flexDirection: "column", marginTop: 32 }}>
          {FILES.map((file) => (
            <div
              key={file}
              style={{ fontSize: 24, color: COLORS.muted, marginBottom: 18 }}
            >
              {file}
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          justifyContent: "center",
          padding: "0 72px",
        }}
      >
        <div style={{ fontSize: 76, color: COLORS.text }}>{siteConfig.name}</div>
        <div style={{ fontSize: 38, color: COLORS.accent, marginTop: 20 }}>
          Desenvolvedor Full-Stack
        </div>
        <div style={{ fontSize: 28, color: COLORS.muted, marginTop: 48 }}>
          www.pmatos.dev
        </div>
      </div>
    </div>,
    { ...size },
  );
}
