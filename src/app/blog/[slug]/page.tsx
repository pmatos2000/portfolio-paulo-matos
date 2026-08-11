import type { Metadata } from "next";
import { type PostSlug, postLoaders, postSlugs } from "@/data/posts";
import { pageMetadata } from "@/data/site";
import styles from "./post.module.css";

type Props = { params: Promise<{ slug: PostSlug }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return postSlugs.map((slug) => ({ slug }));
}

/**
 * UTC explícito: `new Date("2026-08-11")` é meia-noite UTC, e formatar em
 * America/Sao_Paulo (UTC-3) exibiria 10/08.
 */
const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { meta } = await postLoaders[slug]();

  return pageMetadata({
    title: meta.title,
    description: meta.description,
    path: `/blog/${slug}`,
  });
}

const PostPage = async ({ params }: Props) => {
  const { slug } = await params;
  const { default: Content, meta } = await postLoaders[slug]();

  return (
    <article className="contentPage">
      <h1>{meta.title}</h1>
      <div className={styles.postMeta}>
        <time dateTime={meta.date}>{formatDate(meta.date)}</time>
        <ul className={styles.tags}>
          {meta.tags.map((tag) => (
            <li key={tag} className={styles.tag}>
              {tag}
            </li>
          ))}
        </ul>
      </div>
      <Content />
    </article>
  );
};

export default PostPage;
