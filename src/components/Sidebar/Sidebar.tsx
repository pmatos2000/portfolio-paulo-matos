"use client";

import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { SidebarContext } from "@/contexts/SidebarContext";
import { buildTree, findItem } from "@/data/sidebarTree";
import TreeNodeComponent from "../TreeNodeComponent/TreeNodeComponent";
import styles from "./Sidebar.module.css";

type SidebarProps = {
  onCloseMenu: () => void;
  lastPostSlug: string | null;
};

const Sidebar = ({ onCloseMenu, lastPostSlug }: SidebarProps) => {
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

  const activeId = useMemo(() => {
    const paths = hash ? [pathname + hash, pathname] : [pathname];
    for (const path of paths) {
      const leaf = findItem(
        tree,
        (item) => item.type === "leaf" && item.url === path,
      );
      if (leaf) {
        return leaf.id;
      }
    }
    for (const path of paths) {
      const node = findItem(tree, (item) => item.url === path);
      if (node) {
        return node.id;
      }
    }
    return null;
  }, [tree, pathname, hash]);

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
      </aside>
    </SidebarContext.Provider>
  );
};

export default Sidebar;
