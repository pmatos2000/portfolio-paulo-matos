"use client";

import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { SidebarContext } from "@/contexts/SidebarContext";
import { sidebarTree, type TreeItem, type TreeLeaf } from "@/data/sidebarTree";
import TreeNodeComponent from "../TreeNodeComponent/TreeNodeComponent";
import styles from "./Sidebar.module.css";

const findLeaf = (
  nodes: TreeItem[],
  predicate: (leaf: TreeLeaf) => boolean,
): TreeLeaf | null => {
  for (const node of nodes) {
    if (node.type === "leaf" && predicate(node)) {
      return node;
    }
    if (node.type === "node") {
      const found = findLeaf(node.children, predicate);
      if (found) return found;
    }
  }
  return null;
};

const Sidebar = () => {
  const pathname = usePathname();
  const [hash, setHash] = useState("");

  // biome-ignore lint/correctness/useExhaustiveDependencies: Nós realmente queremos que este efeito rode novamente sempre que o pathname mudar.
  useEffect(() => {
    setHash(window.location.hash);
  }, [pathname]);

  const activeUrl = useMemo(() => {
    const fullPath = pathname + hash;
    let activeNode = findLeaf(sidebarTree, (leaf) => leaf.url === fullPath);
    if (!activeNode) {
      activeNode = findLeaf(sidebarTree, (leaf) => leaf.url === pathname);
    }
    return activeNode?.url || null;
  }, [pathname, hash]);

  return (
    <SidebarContext.Provider value={{ activeUrl }}>
      <aside className={styles.sidebar}>
        <h2 className={styles.title}>EXPLORER</h2>
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
