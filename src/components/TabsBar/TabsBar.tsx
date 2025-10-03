"use client";

import { usePathname } from "next/navigation";
import { FaReact } from "react-icons/fa"; // Ícone padrão para abas .tsx
import styles from "./TabsBar.module.css";

const TabsBar = () => {
  const pathname = usePathname();

  const segments = pathname.split("/");
  const tabTitle = segments[segments.length - 1];

  if (!tabTitle) {
    return null;
  }

  return (
    <div className={styles.tabsBar}>
      <div className={`${styles.tab} ${styles.active}`}>
        <span className={styles.icon}>
          <FaReact />
        </span>
        <span className={styles.title}>{tabTitle}</span>
      </div>
    </div>
  );
};

export default TabsBar;
