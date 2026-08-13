import { loadPosts } from "@/data/posts";
import { getPostToc, type TocHeading } from "@/data/postToc";

export type BlogPostRef = {
  slug: string;
  title: string;
  date: string;
  /** Títulos do post; o painel Blog monta o outline a partir daqui. */
  toc: TocHeading[];
};

export type BlogYear = {
  year: string;
  posts: BlogPostRef[];
};

/**
 * Roda em build, no servidor. Devolve só dado serializável — ícone é função
 * e não atravessa a fronteira, então ele é acrescentado no cliente.
 */
export const getBlogYears = async (): Promise<BlogYear[]> => {
  const years = new Map<string, BlogPostRef[]>();

  for (const post of await loadPosts()) {
    const year = post.date.slice(0, 4);
    const slug = String(post.slug);
    const ref = {
      slug,
      title: post.title,
      date: post.date,
      toc: await getPostToc(slug),
    };
    const bucket = years.get(year);
    if (bucket) {
      bucket.push(ref);
    } else {
      years.set(year, [ref]);
    }
  }

  return [...years].map(([year, posts]) => ({ year, posts }));
};
