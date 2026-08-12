import type { MDXContent } from "mdx/types";

export type PostMeta = {
  title: string;
  description: string;
  /** ISO 8601, ex.: "2026-08-11" */
  date: string;
  /** ISO 8601. Ausente = nunca editado depois de publicado. */
  updated?: string;
  /** Exibição e `keywords` do JSON-LD. Ainda não gera rota. */
  tags: string[];
};

export type PostModule = {
  default: MDXContent;
  meta: PostMeta;
};

/**
 * Fonte única do blog. Alimenta /blog/[slug], o índice, o RSS e o nó Blog
 * do sidebarTree. Import preguiçoso: o índice lê só os `meta`, sem arrastar
 * o corpo dos posts — tudo resolvido em build.
 */
export const postLoaders = {
  "o-numero-que-me-faria-mudar-de-ideia": () =>
    import("@/content/blog/o-numero-que-me-faria-mudar-de-ideia.mdx"),
  "recusado-nao-e-adiado": () =>
    import("@/content/blog/recusado-nao-e-adiado.mdx"),
} satisfies Record<string, () => Promise<PostModule>>;

export type PostSlug = keyof typeof postLoaders;

export const postSlugs = Object.keys(postLoaders) as PostSlug[];
