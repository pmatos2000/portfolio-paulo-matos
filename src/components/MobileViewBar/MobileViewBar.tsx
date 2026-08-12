"use client";

import { type ActivityView, ALL_VIEWS } from "@/data/activityViews";
import styles from "./MobileViewBar.module.css";

type MobileViewBarProps = {
  activeView: ActivityView | null;
  onSelect: (view: ActivityView) => void;
};

const MobileViewBar = ({ activeView, onSelect }: MobileViewBarProps) => (
  <nav className={styles.bar} aria-label="Trocar de painel">
    {ALL_VIEWS.map(({ id, label, short, Icon }) => (
      <button
        key={id}
        type="button"
        title={label}
        aria-pressed={activeView === id}
        className={`${styles.button} ${activeView === id ? styles.active : ""}`}
        onClick={() => onSelect(id)}
      >
        <Icon size={20} aria-hidden="true" />
        <span>{short}</span>
      </button>
    ))}
  </nav>
);

export default MobileViewBar;
