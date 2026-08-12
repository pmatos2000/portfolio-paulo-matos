"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import JsonLd from "@/components/JsonLd/JsonLd";
import { buildTree, findItem } from "@/data/sidebarTree";
import { siteConfig } from "@/data/site";
import styles from "./Breadcrumbs.module.css";

const Breadcrumbs = () => {
  const pathname = usePathname();
  const parts = pathname.slice(1).split("/").filter(Boolean);

  if (parts.length === 0) {
    return null;
  }

  const tree = buildTree(pathname);

  const titleFor = (href: string, fallback: string) => {
    const leaf = findItem(
      tree,
      (item) => item.type === "leaf" && item.url === href,
    );
    if (leaf) {
      return leaf.title;
    }
    return findItem(tree, (item) => item.url === href)?.title ?? fallback;
  };

  // Cada segmento acumula o caminho: /projetos, /projetos/jogos, ...
  const segments = parts.map((text, index) => {
    const href = `/${parts.slice(0, index + 1).join("/")}`;
    return { text: titleFor(href, text), href };
  });

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: segments.map((segment, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: segment.text,
      item: new URL(segment.href, siteConfig.url).toString(),
    })),
  };

  return (
    <nav className={styles.breadcrumbs} aria-label="Trilha de navegação">
      <JsonLd data={breadcrumbSchema} />
      <Link href="/" className={styles.crumb} aria-label="Voltar para o início">
        src
      </Link>
      {segments.map((segment, index) => (
        <div key={segment.href} className={styles.segment}>
          <span className={styles.separator}>&gt;</span>
          <Link
            href={segment.href}
            className={styles.crumb}
            aria-current={index === segments.length - 1 ? "page" : undefined}
          >
            {segment.text}
          </Link>
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
