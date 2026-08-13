import type { Metadata } from "next";

export const siteConfig = {
  name: "Paulo Matos",
  url: "https://www.pmatos.dev",
  title: "Paulo Matos | Desenvolvedor Full-Stack",
  titleTemplate: "%s | Paulo Matos — Dev Full-Stack",
  description:
    "Desenvolvedor Full-Stack com mais de 5 anos de experiência em C#, ASP.NET Core e React. Engenheiro de Sistemas pela UFMG.",
  locale: "pt_BR",
} as const;

/** Fonte única do índice /blog e do canal RSS — os dois divergiriam sozinhos. */
export const blogConfig = {
  title: `Blog de ${siteConfig.name}`,
  description:
    "Notas técnicas sobre o que estou construindo. No momento, o Leaf: uma linguagem de script embarcável em Rust.",
  feedPath: "/rss.xml",
} as const;

export const socialLinks = {
  linkedin: "https://www.linkedin.com/in/dev-paulo/",
  github: "https://github.com/pmatos2000",
} as const;

/** Rota gerada por src/app/opengraph-image.tsx — mover o arquivo exige mudar isto. */
export const OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${siteConfig.name} — Desenvolvedor Full-Stack`,
};

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  /** Ignora o template de título do layout raiz. */
  absoluteTitle?: boolean;
  /** A rota tem opengraph-image próprio; não injetar o card do site. */
  routeImage?: boolean;
  /** Fora do índice dos buscadores, mas os links continuam valendo. */
  noindex?: boolean;
  article?: {
    publishedTime: string;
    modifiedTime: string;
    tags: string[];
  };
};

export const pageMetadata = ({
  title,
  description,
  path,
  absoluteTitle = false,
  routeImage = false,
  noindex = false,
  article,
}: PageMetadataInput): Metadata => ({
  title: absoluteTitle ? { absolute: title } : title,
  description,
  ...(noindex ? { robots: { index: false, follow: true } } : {}),
  alternates: {
    canonical: path,
    types: { "application/rss+xml": blogConfig.feedPath },
  },
  openGraph: {
    ...(article
      ? {
          type: "article",
          publishedTime: article.publishedTime,
          modifiedTime: article.modifiedTime,
          tags: article.tags,
        }
      : { type: "website" }),
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    url: path,
    title,
    description,
    ...(routeImage ? {} : { images: [OG_IMAGE] }),
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    ...(routeImage ? {} : { images: [OG_IMAGE.url] }),
  },
});
