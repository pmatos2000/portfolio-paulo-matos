"use client";
import { usePathname } from "next/navigation";
import styles from "./Breadcrumbs.module.css";

const Breadcrumbs = () => {
  const pathname = usePathname();
  const segments = pathname
    .slice(1)
    .split("/")
    .map((text, index) => ({ text, key: index }));

  if (segments.length === 0 || segments[0].text === "") {
    return null;
  }

  return (
    <nav className={styles.breadcrumbs}>
      <span>src</span>
      <span className={styles.separator}>&gt;</span>
      {segments.map((segment, index) => (
        <div key={segment.key} className={styles.segment}>
          <span>{segment.text}</span>
          {index < segments.length - 1 && (
            <span className={styles.separator}>&gt;</span>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
