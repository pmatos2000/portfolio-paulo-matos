"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { IconType } from "react-icons";
import { VscClose, VscFile, VscFolderOpened } from "react-icons/vsc";
import {
  sidebarTree,
  type TreeItem,
  type TreeLeaf,
  type TreeNode,
} from "@/data/sidebarTree";
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

/** Nó cujos filhos apontam para esta rota — a "pasta" da página. */
const findOwnerNode = (nodes: TreeItem[], path: string): TreeNode | null => {
  for (const node of nodes) {
    if (node.type !== "node") {
      continue;
    }
    const owns = node.children.some(
      (child) => child.type === "leaf" && child.url.split("#")[0] === path,
    );
    if (owns) {
      return node;
    }
    const found = findOwnerNode(node.children, path);
    if (found) {
      return found;
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
  const ownerNode = activeLeaf ? null : findOwnerNode(sidebarTree, pathname);

  let IconComponent: IconType = VscFile;
  let tabTitle = pathname.split("/").pop() ?? "";

  if (activeLeaf) {
    IconComponent = activeLeaf.icon;
    tabTitle = activeLeaf.title;
  } else if (ownerNode) {
    IconComponent = VscFolderOpened;
    tabTitle = ownerNode.title;
  }

  return (
    <div className={styles.tabsBar}>
      <div className={`${styles.tab} ${styles.active}`}>
        <span className={styles.icon}>
          <IconComponent />
        </span>
        <span className={styles.title}>{tabTitle}</span>
        <Link
          href="/"
          className={styles.closeButton}
          aria-label="Fechar aba e voltar ao início"
        >
          <VscClose size={16} />
        </Link>
      </div>
    </div>
  );
};

export default TabsBar;
