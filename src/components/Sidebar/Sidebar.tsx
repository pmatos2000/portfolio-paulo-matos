import { sidebarTree } from "@/data/sidebarTree";
import TreeNodeComponent from "../TreeNodeComponent/TreeNodeComponent";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <h2 className={styles.title}>EXPLORER</h2>
      <ul className={styles.fileList}>
        {sidebarTree.map((node) => (
          <TreeNodeComponent key={node.id} node={node} />
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
