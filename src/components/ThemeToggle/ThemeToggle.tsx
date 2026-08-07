"use client";

import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
import { useTheme } from "@/contexts/ThemeContext";
import styles from "./ThemeToggle.module.css";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={styles.container}>
      <span>Tema</span>
      <label className={styles.switch}>
        <input
          type="checkbox"
          onChange={toggleTheme}
          checked={theme === "light"}
          aria-label="Tema claro"
        />
        <span className={styles.slider}>
          <BsFillSunFill
            className={`${styles.icon} ${styles.sun}`}
            aria-hidden="true"
          />
          <BsFillMoonFill
            className={`${styles.icon} ${styles.moon}`}
            aria-hidden="true"
          />
        </span>
      </label>
    </div>
  );
};

export default ThemeToggle;
