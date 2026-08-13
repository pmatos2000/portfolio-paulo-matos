"use client";

import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { SiHtml5 } from "react-icons/si";
import { VscMarkdown } from "react-icons/vsc";
import { SidebarContext } from "@/contexts/SidebarContext";
import type { BlogYear } from "@/data/blogTree";
import { tocToItems } from "@/data/outline";
import type { TreeItem } from "@/data/sidebarTree";
import TreeNodeComponent from "../TreeNodeComponent/TreeNodeComponent";
import styles from "./BlogPanel.module.css";

type BlogPanelProps = {
  years: BlogYear[];
  onCloseMenu: () => void;
};

const INDEX_ID = "blog-panel:index";

/**
 * Só o post aberto ganha os títulos como filhos — é o que o VS Code faz com o
 * Outline, e evita despejar as 30 seções dos três posts de uma vez no painel.
 */
const toTree = (years: BlogYear[], activeSlug: string | null): TreeItem[] => [
  {
    id: INDEX_ID,
    type: "leaf",
    title: "index.html",
    icon: SiHtml5,
    url: "/blog",
  },
  ...years.map((entry) => ({
    id: `blog-panel:${entry.year}`,
    type: "node" as const,
    title: entry.year,
    children: entry.posts.map((post) => {
      const base = {
        id: `blog-panel:${post.slug}`,
        title: `${post.slug}.mdx`,
        icon: VscMarkdown,
        url: `/blog/${post.slug}`,
      };
      return post.slug === activeSlug && post.toc.length > 0
        ? {
            ...base,
            type: "node" as const,
            children: tocToItems(post.slug, post.toc, "blog-panel"),
          }
        : { ...base, type: "leaf" as const };
    }),
  })),
];

const BlogPanel = ({ years, onCloseMenu }: BlogPanelProps) => {
  const pathname = usePathname();
  const [hash, setHash] = useState("");

  const activeSlug = pathname.startsWith("/blog/")
    ? pathname.slice("/blog/".length)
    : null;

  /** Sem isto o título aberto não acende ao chegar por link direto ou voltar. */
  // biome-ignore lint/correctness/useExhaustiveDependencies: o hash precisa ser relido a cada troca de rota.
  useEffect(() => {
    const sync = () => setHash(window.location.hash);
    sync();
    window.addEventListener("hashchange", sync);
    window.addEventListener("popstate", sync);
    return () => {
      window.removeEventListener("hashchange", sync);
      window.removeEventListener("popstate", sync);
    };
  }, [pathname]);

  const handleNavigate = (url: string) => {
    const fragment = url.split("#")[1];
    setHash(fragment ? `#${fragment}` : "");
  };

  const tree = useMemo(() => toTree(years, activeSlug), [years, activeSlug]);

  const activeId = useMemo(() => {
    if (pathname === "/blog") {
      return INDEX_ID;
    }
    if (!activeSlug) {
      return null;
    }
    return `blog-panel:${activeSlug}${hash}`;
  }, [pathname, activeSlug, hash]);

  return (
    <SidebarContext.Provider
      value={{
        activeId,
        closeMobileMenu: onCloseMenu,
        onNavigate: handleNavigate,
      }}
    >
      <aside className={styles.panel} aria-label="Posts do blog">
        <p className={styles.title}>BLOG</p>
        <ul className={styles.list}>
          {tree.map((node) => (
            <TreeNodeComponent key={node.id} node={node} />
          ))}
        </ul>
      </aside>
    </SidebarContext.Provider>
  );
};

export default BlogPanel;
