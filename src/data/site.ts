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
};

export const pageMetadata = ({
  title,
  description,
  path,
  absoluteTitle = false,
}: PageMetadataInput): Metadata => ({
  title: absoluteTitle ? { absolute: title } : title,
  description,
  alternates: { canonical: path },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    url: path,
    title,
    description,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [OG_IMAGE.url],
  },
});
