"use client";
import Link from "next/link";
import { useContext, useState } from "react";
import {
  VscChevronDown,
  VscChevronRight,
  VscFolderOpened,
} from "react-icons/vsc";
import { SidebarContext } from "@/contexts/SidebarContext";
import type { TreeItem } from "@/data/sidebarTree";
import styles from "./TreeNodeComponent.module.css";

type TreeNodeProps = {
  node: TreeItem;
};

const TreeNodeComponent = ({ node }: TreeNodeProps) => {
  const [isExpanded, setIsExpanded] = useState(
    node.type === "node" && node.defaultExpanded !== false,
  );

  const context = useContext(SidebarContext);
  if (!context) return null;

  const { activeUrl, closeMobileMenu } = context;

  if (node.type === "node") {
    const children = isExpanded ? (
      <ul className={styles.nestedList}>
        {node.children.map((child) => (
          <TreeNodeComponent key={child.id} node={child} />
        ))}
      </ul>
    ) : null;

    if (node.url) {
      return (
        <li>
          <Link
            href={node.url}
            title={node.title}
            className={`${styles.leaf} ${activeUrl === node.url ? styles.active : ""}`}
            onClick={closeMobileMenu}
          >
            <span className={styles.icon}>
              <VscFolderOpened size={20} />
            </span>
            <span>{node.title}</span>
          </Link>
          {children}
        </li>
      );
    }

    return (
      <li>
        <button
          type="button"
          className={styles.nodeTitle}
          aria-expanded={isExpanded}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? <VscChevronDown /> : <VscChevronRight />}
          <span>{node.title}</span>
        </button>
        {children}
      </li>
    );
  }

  const IconComponent = node.icon;
  const isActive = activeUrl === node.url;

  return (
    <li>
      <Link
        href={node.url}
        title={node.title}
        className={`${styles.leaf} ${isActive ? styles.active : ""}`}
        onClick={closeMobileMenu}
      >
        <span className={styles.icon}>
          <IconComponent size={20} />
        </span>
        <span>{node.title}</span>
      </Link>
    </li>
  );
};

export default TreeNodeComponent;
