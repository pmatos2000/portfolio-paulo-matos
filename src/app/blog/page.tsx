import Link from "next/link";
import {
  type PostMeta,
  type PostSlug,
  postLoaders,
  postSlugs,
} from "@/data/posts";
import { blogConfig, pageMetadata } from "@/data/site";
import styles from "./blog.module.css";

export const metadata = pageMetadata({
  title: "Blog",
  description: blogConfig.description,
  path: "/blog",
});

type LoadedPost = PostMeta & { slug: PostSlug };

const loadPosts = async (): Promise<LoadedPost[]> => {
  const posts = await Promise.all(
    postSlugs.map(async (slug) => {
      const { meta } = await postLoaders[slug]();
      return { ...meta, slug };
    }),
  );
  return posts.sort((a, b) => b.date.localeCompare(a.date));
};

const groupByYear = (posts: LoadedPost[]): [string, LoadedPost[]][] => {
  const years = new Map<string, LoadedPost[]>();
  for (const post of posts) {
    const year = post.date.slice(0, 4);
    const bucket = years.get(year);
    if (bucket) {
      bucket.push(post);
    } else {
      years.set(year, [post]);
    }
  }
  return [...years];
};

const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));

const BlogPage = async () => {
  const groups = groupByYear(await loadPosts());

  return (
    <div className={`contentPage ${styles.index}`}>
      <h1>Blog</h1>
      <p className={styles.feed}>
        <a href={blogConfig.feedPath}>Assinar por RSS</a>
      </p>

      {groups.map(([year, posts]) => (
        <section key={year}>
          <h2>{year}</h2>
          <ul className={styles.postList}>
            {posts.map((post) => (
              <li key={post.slug} className={styles.post}>
                <h3 className={styles.postTitle}>
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <time className={styles.date} dateTime={post.date}>
                  {formatDate(post.date)}
                </time>
                <p className={styles.description}>{post.description}</p>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
};

export default BlogPage;
