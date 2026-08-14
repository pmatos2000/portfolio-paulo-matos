import type { MDXContent } from "mdx/types";
import { postDay } from "@/data/postDate";

export type PostMeta = {
  title: string;
  description: string;
  /**
   * ISO 8601 com hora e fuso de Brasília: "2026-08-12T20:02:00-03:00".
   *
   * A hora fica junto do dia, e não é acrescentada na hora de renderizar,
   * porque quem sabe quando o post saiu é o post. Daqui saem o
   * `datePublished` do JSON-LD, o `pubDate` do RSS e o `lastModified` do
   * sitemap — todos exigem data completa, e nenhum deles precisa adivinhar.
   */
  date: string;
  /**
   * Mesmo formato do `date`. `null` = nunca editado depois de publicado.
   *
   * Obrigatório e anulável, em vez de opcional: escrever `null` é uma
   * decisão, esquecer o campo é um descuido, e só o primeiro se distingue do
   * outro na hora de reler o arquivo.
   */
  updated: string | null;
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
  "o-numero-que-me-faria-mudar-de-ideia": () =>
    import("@/content/blog/o-numero-que-me-faria-mudar-de-ideia.mdx"),
  "recusado-nao-e-adiado": () =>
    import("@/content/blog/recusado-nao-e-adiado.mdx"),
} satisfies Record<string, () => Promise<PostModule>>;

export type PostSlug = keyof typeof postLoaders;

export const postSlugs = Object.keys(postLoaders) as PostSlug[];

export type LoadedPost = PostMeta & { slug: PostSlug };

/**
 * Carrega um post pelo tipo declarado, e não pelo inferido do arquivo.
 *
 * Importar um .mdx traz o `meta` com o formato literal daquele arquivo — só
 * os campos que estão lá escritos. Quem lesse um campo ausente em um post
 * qualquer recebia erro de compilação em si mesmo, longe da causa; foi o que
 * aconteceu com `updated`. Anotar o retorno como PostModule alarga para
 * PostMeta, e um post incompleto passa a acusar aqui, ao lado do postLoaders.
 */
export const loadPost = (slug: PostSlug): Promise<PostModule> =>
  postLoaders[slug]();

/** Todos os posts, do mais novo para o mais antigo. Fonte de toda listagem. */
export const loadPosts = async (): Promise<LoadedPost[]> => {
  const posts = await Promise.all(
    postSlugs.map(async (slug) => {
      const { meta } = await loadPost(slug);
      return { ...meta, slug };
    }),
  );
  /**
   * Ordena pelo dia, não pelo instante.
   *
   * Comparar a data completa reordenaria os posts do mesmo dia pela hora, e
   * como a ordenação é decrescente a série do Leaf apareceria de trás para
   * frente. Recortando o dia, o empate persiste e o desempate continua sendo
   * a ordem de `postLoaders` — porque `sort` é estável. A hora fica livre
   * para ser a verdade sobre a publicação sem mexer na leitura.
   */
  return posts.sort((a, b) => postDay(b.date).localeCompare(postDay(a.date)));
};
