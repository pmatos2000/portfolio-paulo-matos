"use client";

import { usePathname } from "next/navigation";
import { FaReact } from "react-icons/fa";
import { sidebarTree, type TreeItem, type TreeLeaf } from "@/data/sidebarTree";
import styles from "./TabsBar.module.css";

const findLeafByUrl = (nodes: TreeItem[], url: string): TreeLeaf | null => {
  for (const node of nodes) {
    if (node.type === "leaf" && node.url === url) {
      return node;
    }
    if (node.type === "node") {
      const found = findLeafByUrl(node.children, url);
      if (found) {
        return found;
      }
    }
  }
  return null;
};

const TabsBar = () => {
  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  const activeLeaf = findLeafByUrl(sidebarTree, pathname);

  const IconComponent = activeLeaf?.icon || FaReact;

  const tabTitle = activeLeaf?.title || pathname.split("/").pop();

  return (
    <div className={styles.tabsBar}>
      <div className={`${styles.tab} ${styles.active}`}>
        <span className={styles.icon}>
          <IconComponent />
        </span>
        <span className={styles.title}>{tabTitle}</span>
      </div>
    </div>
  );
};

export default TabsBar;
