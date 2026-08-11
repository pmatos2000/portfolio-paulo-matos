import { ImageResponse } from "next/og";
import { type PostSlug, postLoaders, postSlugs } from "@/data/posts";
import { siteConfig } from "@/data/site";

export const alt = `Post no blog de ${siteConfig.name}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return postSlugs.map((slug) => ({ slug }));
}

const COLORS = {
  bg: "#1e1e1e",
  panel: "#252526",
  border: "#333333",
  accent: "#10b981",
  text: "#ffffff",
  muted: "#8e8e8e",
};

const PANEL_WIDTH = 300;
const PANEL_PADDING = 28;
const CONTENT_PADDING = 64;
const PANEL_INNER = PANEL_WIDTH - PANEL_PADDING * 2;
const CONTENT_INNER = size.width - PANEL_WIDTH - CONTENT_PADDING * 2;

/** Satori não quebra texto por largura percentual — só por largura em pixel. */
const titleFontSize = (title: string) => {
  if (title.length > 64) {
    return 42;
  }
  if (title.length > 42) {
    return 50;
  }
  return 58;
};

const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));

export default async function Image({
  params,
}: {
  params: Promise<{ slug: PostSlug }>;
}) {
  const { slug } = await params;
  const { meta } = await postLoaders[slug]();

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
          width: PANEL_WIDTH,
          flexShrink: 0,
          background: COLORS.panel,
          borderRight: `1px solid ${COLORS.border}`,
          padding: `40px ${PANEL_PADDING}px`,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 20,
            letterSpacing: 3,
            color: COLORS.muted,
          }}
        >
          EXPLORER
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 24,
            color: COLORS.muted,
            marginTop: 32,
          }}
        >
          Blog
        </div>
        <div
          style={{
            display: "flex",
            width: PANEL_INNER - 22,
            fontSize: 22,
            color: COLORS.accent,
            marginTop: 16,
            marginLeft: 22,
            fontStyle: "italic",
          }}
        >
          {`${slug}.mdx`}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: CONTENT_INNER,
          flexShrink: 0,
          justifyContent: "center",
          padding: `0 ${CONTENT_PADDING}px`,
        }}
      >
        <div
          style={{
            display: "flex",
            width: CONTENT_INNER,
            fontSize: titleFontSize(meta.title),
            color: COLORS.text,
            lineHeight: 1.2,
          }}
        >
          {meta.title}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 26,
            color: COLORS.muted,
            marginTop: 36,
          }}
        >
          {`${formatDate(meta.date)} · ${siteConfig.name}`}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 24,
            color: COLORS.accent,
            marginTop: 12,
          }}
        >
          www.pmatos.dev
        </div>
      </div>
    </div>,
    { ...size },
  );
}
