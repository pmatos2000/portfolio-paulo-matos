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

  const { activeUrl, closeMobileMenu, onNavigate } = context;

  const handleClick = (url: string) => {
    onNavigate(url);
    closeMobileMenu();
  };

  if (node.type === "node") {
    const children = isExpanded ? (
      <ul className={styles.nestedList}>
        {node.children.map((child) => (
          <TreeNodeComponent key={child.id} node={child} />
        ))}
      </ul>
    ) : null;

    const chevron = isExpanded ? (
      <VscChevronDown aria-hidden="true" />
    ) : (
      <VscChevronRight aria-hidden="true" />
    );

    // Pasta com página própria: o chevron alterna, o nome navega.
    const nodeUrl = node.url;
    if (nodeUrl) {
      return (
        <li>
          <div className={styles.nodeRow}>
            <button
              type="button"
              className={styles.chevronButton}
              aria-expanded={isExpanded}
              aria-label={
                isExpanded ? `Recolher ${node.title}` : `Expandir ${node.title}`
              }
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {chevron}
            </button>
            <Link
              href={nodeUrl}
              title={node.title}
              className={`${styles.nodeLink} ${activeUrl === nodeUrl ? styles.active : ""}`}
              onClick={() => handleClick(nodeUrl)}
            >
              <span className={styles.icon}>
                <VscFolderOpened size={20} aria-hidden="true" />
              </span>
              <span>{node.title}</span>
            </Link>
          </div>
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
          {chevron}
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
        onClick={() => handleClick(node.url)}
      >
        <span className={styles.icon}>
          <IconComponent size={20} aria-hidden="true" />
        </span>
        <span>{node.title}</span>
      </Link>
    </li>
  );
};

export default TreeNodeComponent;
