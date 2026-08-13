"use client";

import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { SidebarContext } from "@/contexts/SidebarContext";
import type { BlogYear } from "@/data/blogTree";
import { outlineFor } from "@/data/outline";
import { buildTree, findItem } from "@/data/sidebarTree";
import OutlinePanel from "../OutlinePanel/OutlinePanel";
import TreeNodeComponent from "../TreeNodeComponent/TreeNodeComponent";
import styles from "./Sidebar.module.css";

type SidebarProps = {
  onCloseMenu: () => void;
  lastPostSlug: string | null;
  blogYears: BlogYear[];
};

const Sidebar = ({ onCloseMenu, lastPostSlug, blogYears }: SidebarProps) => {
  const pathname = usePathname();
  const [hash, setHash] = useState("");

  // biome-ignore lint/correctness/useExhaustiveDependencies: Nós realmente queremos que este efeito rode novamente sempre que o pathname mudar.
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

  const tree = useMemo(
    () => buildTree(pathname, lastPostSlug),
    [pathname, lastPostSlug],
  );

  const outline = useMemo(
    () => outlineFor(pathname, blogYears),
    [pathname, blogYears],
  );

  /**
   * Busca na árvore e no outline juntos. Numa página com âncora os dois lados
   * compartilham a mesma folha, então o id bate e os dois acendem; num post, o
   * título só existe no outline e é aqui que ele é encontrado.
   */
  const activeId = useMemo(() => {
    const items = [...tree, ...outline];
    const paths = hash ? [pathname + hash, pathname] : [pathname];
    for (const path of paths) {
      const leaf = findItem(
        items,
        (item) => item.type === "leaf" && item.url === path,
      );
      if (leaf) {
        return leaf.id;
      }
    }
    for (const path of paths) {
      const node = findItem(items, (item) => item.url === path);
      if (node) {
        return node.id;
      }
    }
    return null;
  }, [tree, outline, pathname, hash]);

  return (
    <SidebarContext.Provider
      value={{
        activeId,
        closeMobileMenu: onCloseMenu,
        onNavigate: handleNavigate,
      }}
    >
      <aside className={styles.sidebar} aria-label="Explorador de arquivos">
        <p className={styles.title}>EXPLORER</p>
        <ul className={styles.fileList}>
          {tree.map((node) => (
            <TreeNodeComponent key={node.id} node={node} />
          ))}
        </ul>
        <OutlinePanel items={outline} />
      </aside>
    </SidebarContext.Provider>
  );
};

export default Sidebar;
