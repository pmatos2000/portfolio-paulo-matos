"use client";
import { useState } from "react";
import { VscChevronDown, VscChevronRight } from "react-icons/vsc";
import type { TreeItem } from "@/data/sidebarTree";
import styles from "./TreeNodeComponent.module.css";

type TreeNodeProps = {
  node: TreeItem;
};

const TreeNodeComponent = ({ node }: TreeNodeProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  if (node.type === "node") {
    return (
      <li className={styles.node}>
        <button
          type="button"
          className={styles.nodeTitle}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? <VscChevronDown /> : <VscChevronRight />}
          <span>{node.title}</span>
        </button>
        {isExpanded && (
          <ul className={styles.nestedList}>
            {node.children.map((child) => (
              <TreeNodeComponent key={child.id} node={child} />
            ))}
          </ul>
        )}
      </li>
    );
  }

  const IconComponent = node.icon;
  return (
    <li>
      <a href={node.url} className={styles.leaf}>
        <span className={styles.icon}>
          <IconComponent />
        </span>
        <span>{node.title}</span>
      </a>
    </li>
  );
};

export default TreeNodeComponent;
