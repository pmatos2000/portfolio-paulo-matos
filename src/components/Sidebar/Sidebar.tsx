"use client";

import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { SidebarContext } from "@/contexts/SidebarContext";
import { sidebarTree, type TreeItem } from "@/data/sidebarTree";
import TreeNodeComponent from "../TreeNodeComponent/TreeNodeComponent";
import styles from "./Sidebar.module.css";

const findItem = (
  nodes: TreeItem[],
  predicate: (item: TreeItem) => boolean,
): TreeItem | null => {
  for (const node of nodes) {
    if (predicate(node)) {
      return node;
    }
    if (node.type === "node") {
      const found = findItem(node.children, predicate);
      if (found) return found;
    }
  }
  return null;
};

type SidebarProps = {
  onCloseMenu: () => void;
};

const Sidebar = ({ onCloseMenu }: SidebarProps) => {
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

  const activeUrl = useMemo(() => {
    const fullPath = pathname + hash;
    let activeNode = findItem(sidebarTree, (item) => item.url === fullPath);
    if (!activeNode) {
      activeNode = findItem(sidebarTree, (item) => item.url === pathname);
    }
    return activeNode?.url || null;
  }, [pathname, hash]);

  return (
    <SidebarContext.Provider
      value={{
        activeUrl,
        closeMobileMenu: onCloseMenu,
        onNavigate: handleNavigate,
      }}
    >
      <aside className={styles.sidebar} aria-label="Explorador de arquivos">
        <p className={styles.title}>EXPLORER</p>
        <ul className={styles.fileList}>
          {sidebarTree.map((node) => (
            <TreeNodeComponent key={node.id} node={node} />
          ))}
        </ul>
      </aside>
    </SidebarContext.Provider>
  );
};

export default Sidebar;
