import Link from "next/link";
import { loadPosts, type PostSlug } from "@/data/posts";
import styles from "./PostNav.module.css";

type PostNavProps = { slug: PostSlug };

const PostNav = async ({ slug }: PostNavProps) => {
  const posts = await loadPosts();
  const index = posts.findIndex((post) => post.slug === slug);

  const newer = index > 0 ? posts[index - 1] : null;
  const older =
    index >= 0 && index < posts.length - 1 ? posts[index + 1] : null;

  return (
    <nav className={styles.nav} aria-label="Navegação entre posts">
      <div className={styles.side}>
        {older ? (
          <Link href={`/blog/${older.slug}`} className={styles.link}>
            <span className={styles.label}>← Anterior</span>
            <span className={styles.title}>{older.title}</span>
          </Link>
        ) : null}
      </div>

      <div className={styles.center}>
        <Link href="/blog" className={styles.all}>
          Todos os posts
        </Link>
      </div>

      <div className={`${styles.side} ${styles.right}`}>
        {newer ? (
          <Link href={`/blog/${newer.slug}`} className={styles.link}>
            <span className={styles.label}>Próximo →</span>
            <span className={styles.title}>{newer.title}</span>
          </Link>
        ) : null}
      </div>
    </nav>
  );
};

export default PostNav;
