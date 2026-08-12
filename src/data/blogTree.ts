import { postLoaders, postSlugs } from "@/data/posts";

export type BlogPostRef = {
  slug: string;
  title: string;
  date: string;
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
  const posts = await Promise.all(
    postSlugs.map(async (slug) => {
      const { meta } = await postLoaders[slug]();
      return { slug: String(slug), title: meta.title, date: meta.date };
    }),
  );
  posts.sort((a, b) => b.date.localeCompare(a.date));

  const years = new Map<string, BlogPostRef[]>();
  for (const post of posts) {
    const year = post.date.slice(0, 4);
    const bucket = years.get(year);
    if (bucket) {
      bucket.push(post);
    } else {
      years.set(year, [post]);
    }
  }

  return [...years].map(([year, list]) => ({ year, posts: list }));
};
