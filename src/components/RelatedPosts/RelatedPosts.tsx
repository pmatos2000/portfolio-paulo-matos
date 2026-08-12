import Link from "next/link";
import { type LoadedPost, loadPosts, type PostSlug } from "@/data/posts";
import styles from "./RelatedPosts.module.css";

type RelatedPostsProps = { slug: PostSlug; limit?: number };

/**
 * Peso pelo inverso da frequência: tag que aparece em quase todo post quase
 * não pontua. Contagem simples empataria tudo numa fase de tema único.
 */
const scoreOf = (
  post: LoadedPost,
  current: LoadedPost,
  frequency: Map<string, number>,
) =>
  post.tags
    .filter((tag) => current.tags.includes(tag))
    .reduce((sum, tag) => sum + 1 / (frequency.get(tag) ?? 1), 0);

const RelatedPosts = async ({ slug, limit = 3 }: RelatedPostsProps) => {
  const posts = await loadPosts();
  const index = posts.findIndex((post) => post.slug === slug);

  if (index < 0) {
    return null;
  }

  const current = posts[index];
  const skip = new Set<string>([slug]);
  if (index > 0) {
    skip.add(posts[index - 1].slug);
  }
  if (index < posts.length - 1) {
    skip.add(posts[index + 1].slug);
  }

  const frequency = new Map<string, number>();
  for (const post of posts) {
    for (const tag of post.tags) {
      frequency.set(tag, (frequency.get(tag) ?? 0) + 1);
    }
  }

  const related = posts
    .filter((post) => !skip.has(post.slug))
    .map((post) => ({ post, score: scoreOf(post, current, frequency) }))
    .filter((entry) => entry.score > 0)
    .sort(
      (a, b) => b.score - a.score || b.post.date.localeCompare(a.post.date),
    )
    .slice(0, limit);

  if (related.length === 0) {
    return null;
  }

  return (
    <section className={styles.related}>
      <h2 className={styles.heading}>Relacionados</h2>
      <ul className={styles.list}>
        {related.map(({ post }) => (
          <li key={post.slug} className={styles.item}>
            <Link href={`/blog/${post.slug}`} className={styles.link}>
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default RelatedPosts;
