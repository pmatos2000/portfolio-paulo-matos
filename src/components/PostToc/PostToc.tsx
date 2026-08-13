import type { TocHeading } from "@/data/postToc";
import styles from "./PostToc.module.css";

type ListProps = { headings: TocHeading[] };

/** Abaixo disso o índice ocupa mais espaço do que economiza. */
const MIN_ENTRIES = 3;

const countEntries = (headings: TocHeading[]): number =>
  headings.reduce((total, item) => total + 1 + countEntries(item.children), 0);

const TocList = ({ headings }: ListProps) => (
  <ol className={styles.list}>
    {headings.map((heading) => (
      <li key={heading.id} className={styles.item}>
        <a className={styles.link} href={`#${heading.id}`}>
          {heading.text}
        </a>
        {heading.children.length > 0 ? (
          <TocList headings={heading.children} />
        ) : null}
      </li>
    ))}
  </ol>
);

/**
 * Índice do post. Server Component de propósito: são âncoras reais no HTML
 * servido, então valem como links internos para o buscador e funcionam sem JS.
 */
const PostToc = ({ headings }: ListProps) => {
  if (countEntries(headings) < MIN_ENTRIES) {
    return null;
  }

  return (
    <details className={styles.toc} open>
      <summary className={styles.summary}>Neste post</summary>
      <nav aria-label="Índice do post">
        <TocList headings={headings} />
      </nav>
    </details>
  );
};

export default PostToc;
