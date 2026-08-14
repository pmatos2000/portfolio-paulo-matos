import Link from "next/link";
import { formatPostDate } from "@/data/postDate";
import { loadPosts } from "@/data/posts";
import styles from "./PostLinks.module.css";

type PostLinksProps = { tag?: string; limit?: number };

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
              {formatPostDate(post.date, "short")}
            </time>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default PostLinks;
