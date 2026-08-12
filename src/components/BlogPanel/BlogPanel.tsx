"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { SiHtml5 } from "react-icons/si";
import { VscMarkdown } from "react-icons/vsc";
import { SidebarContext } from "@/contexts/SidebarContext";
import type { BlogYear } from "@/data/blogTree";
import type { TreeItem } from "@/data/sidebarTree";
import TreeNodeComponent from "../TreeNodeComponent/TreeNodeComponent";
import styles from "./BlogPanel.module.css";

type BlogPanelProps = {
  years: BlogYear[];
  onCloseMenu: () => void;
};

const INDEX_ID = "blog-panel:index";

const toTree = (years: BlogYear[]): TreeItem[] => [
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
    children: entry.posts.map((post) => ({
      id: `blog-panel:${post.slug}`,
      type: "leaf" as const,
      title: `${post.slug}.mdx`,
      icon: VscMarkdown,
      url: `/blog/${post.slug}`,
    })),
  })),
];

const BlogPanel = ({ years, onCloseMenu }: BlogPanelProps) => {
  const pathname = usePathname();
  const tree = useMemo(() => toTree(years), [years]);

  const activeId = useMemo(() => {
    if (pathname === "/blog") {
      return INDEX_ID;
    }
    if (pathname.startsWith("/blog/")) {
      return `blog-panel:${pathname.slice("/blog/".length)}`;
    }
    return null;
  }, [pathname]);

  return (
    <SidebarContext.Provider
      value={{
        activeId,
        closeMobileMenu: onCloseMenu,
        onNavigate: () => undefined,
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
