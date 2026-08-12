import Link from "next/link";
import { loadPosts } from "@/data/posts";
import styles from "./PostLinks.module.css";

type PostLinksProps = { tag?: string; limit?: number };

const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));

const PostLinks = async ({ tag, limit }: PostLinksProps) => {
  const all = await loadPosts();
  const posts = all
    .filter((post) => !tag || post.tags.includes(tag))
    .slice(0, limit ?? all.length);

  if (posts.length === 0) {
    return null;
  }

  return (
    <ul className={styles.list}>
      {posts.map((post) => (
        <li key={post.slug}>
          <Link href={`/blog/${post.slug}`} className={styles.link}>
            <span className={styles.title}>{post.title}</span>
            <time className={styles.date} dateTime={post.date}>
              {formatDate(post.date)}
            </time>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default PostLinks;
