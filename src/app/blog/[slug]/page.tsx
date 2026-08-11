import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd/JsonLd";
import { type PostSlug, postLoaders, postSlugs } from "@/data/posts";
import { pageMetadata, siteConfig } from "@/data/site";
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
    routeImage: true,
    article: {
      publishedTime: meta.date,
      modifiedTime: meta.updated ?? meta.date,
      tags: meta.tags,
    },
  });
}

const PostPage = async ({ params }: Props) => {
  const { slug } = await params;
  const { default: Content, meta } = await postLoaders[slug]();

  const url = new URL(`/blog/${slug}`, siteConfig.url).toString();
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: meta.title,
    description: meta.description,
    datePublished: meta.date,
    dateModified: meta.updated ?? meta.date,
    inLanguage: "pt-BR",
    keywords: meta.tags.join(", "),
    author: { "@type": "Person", name: siteConfig.name, url: siteConfig.url },
    publisher: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: new URL(`/blog/${slug}/opengraph-image`, siteConfig.url).toString(),
  };

  return (
    <article className="contentPage">
      <JsonLd data={schema} />
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
