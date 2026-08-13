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
 *
 * A ordenação é por data, decrescente. Entre posts da mesma data, vale a
 * ordem daqui — por isso a série do Leaf está na ordem de leitura.
 */
export const postLoaders = {
  "por-que-uma-linguagem-de-script": () =>
    import("@/content/blog/por-que-uma-linguagem-de-script.mdx"),
  "o-leaf-por-dentro": () => import("@/content/blog/o-leaf-por-dentro.mdx"),
  "o-plano-em-27-etapas": () =>
    import("@/content/blog/o-plano-em-27-etapas.mdx"),
} satisfies Record<string, () => Promise<PostModule>>;

export type PostSlug = keyof typeof postLoaders;

export const postSlugs = Object.keys(postLoaders) as PostSlug[];

export type LoadedPost = PostMeta & { slug: PostSlug };

/** Todos os posts, do mais novo para o mais antigo. Fonte de toda listagem. */
export const loadPosts = async (): Promise<LoadedPost[]> => {
  const posts = await Promise.all(
    postSlugs.map(async (slug) => {
      const { meta } = await postLoaders[slug]();
      return { ...meta, slug };
    }),
  );
  return posts.sort((a, b) => b.date.localeCompare(a.date));
};
