"use client";

import {
  type ActivityView,
  type ActivityViewDef,
  BOTTOM_VIEWS,
  TOP_VIEWS,
} from "@/data/activityViews";
import styles from "./ActivityBar.module.css";

type ActivityBarProps = {
  activeIcon: string;
  onIconClick: (view: ActivityView) => void;
};

type GroupProps = ActivityBarProps & { views: ActivityViewDef[] };

const Group = ({ views, activeIcon, onIconClick }: GroupProps) => (
  <div className={styles.group}>
    {views.map(({ id, label, Icon }) => (
      <button
        key={id}
        type="button"
        title={label}
        aria-label={label}
        aria-pressed={activeIcon === id}
        className={activeIcon === id ? styles.active : ""}
        onClick={() => onIconClick(id)}
      >
        <Icon size={32} aria-hidden="true" />
      </button>
    ))}
  </div>
);

const ActivityBar = ({ activeIcon, onIconClick }: ActivityBarProps) => (
  <nav className={styles.activityBar}>
    <Group
      views={TOP_VIEWS}
      activeIcon={activeIcon}
      onIconClick={onIconClick}
    />
    <Group
      views={BOTTOM_VIEWS}
      activeIcon={activeIcon}
      onIconClick={onIconClick}
    />
  </nav>
);

export default ActivityBar;
