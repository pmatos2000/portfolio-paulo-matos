import type { Metadata } from "next";
import type { ComponentProps } from "react";
import JsonLd from "@/components/JsonLd/JsonLd";
import PostNav from "@/components/PostNav/PostNav";
import PostToc from "@/components/PostToc/PostToc";
import RelatedPosts from "@/components/RelatedPosts/RelatedPosts";
import { formatPostDate } from "@/data/postDate";
import { loadPost, type PostSlug, postSlugs } from "@/data/posts";
import { getPostToc } from "@/data/postToc";
import { personRef } from "@/data/schema";
import { pageMetadata, siteConfig } from "@/data/site";
import styles from "./post.module.css";

type Props = { params: Promise<{ slug: PostSlug }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return postSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { meta } = await loadPost(slug);

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
  const { default: Content, meta } = await loadPost(slug);
  const toc = await getPostToc(slug);

  /**
   * O índice entra logo antes do primeiro h2, ou seja, depois da abertura do
   * post. Casar pelo id em vez de contar renderizações mantém o componente
   * puro: o rehype-slug garante um id único por título, então a comparação não
   * depende da ordem em que o React resolve os nós.
   */
  const firstHeadingId = toc[0]?.id ?? null;
  const H2 = ({ id, ...rest }: ComponentProps<"h2">) =>
    id === firstHeadingId ? (
      <>
        <PostToc headings={toc} />
        <h2 id={id} {...rest} />
      </>
    ) : (
      <h2 id={id} {...rest} />
    );

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
    author: personRef,
    publisher: personRef,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: new URL(`/blog/${slug}/opengraph-image`, siteConfig.url).toString(),
  };

  return (
    <div className="contentPage">
      <JsonLd data={schema} />
      <article>
        <h1>{meta.title}</h1>
        <div className={styles.postMeta}>
          <time dateTime={meta.date}>{formatPostDate(meta.date)}</time>
          <ul className={styles.tags}>
            {meta.tags.map((tag) => (
              <li key={tag} className={styles.tag}>
                {tag}
              </li>
            ))}
          </ul>
        </div>
        <Content components={{ h2: H2 }} />
      </article>
      <PostNav slug={slug} />
      <RelatedPosts slug={slug} />
    </div>
  );
};

export default PostPage;
