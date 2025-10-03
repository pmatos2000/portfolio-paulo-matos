"use client";

import { VscFiles, VscSettingsGear } from "react-icons/vsc";
import styles from "./ActivityBar.module.css";

type ActivityBarProps = {
  activeIcon: string;
  onIconClick: (iconName: string) => void;
};

const ActivityBar = ({ activeIcon, onIconClick }: ActivityBarProps) => {
  const handleIconClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const iconName = event.currentTarget.title;
    onIconClick(iconName);
  };

  return (
    <nav className={styles.activityBar}>
      <div className={styles.iconGroupTop}>
        <button
          type="button"
          title="Explorer"
          className={activeIcon === "Explorer" ? styles.active : ""}
          onClick={handleIconClick}
        >
          <VscFiles size={32} />
        </button>
      </div>
      <div className={styles.iconGroupBottom}>
        <button
          type="button"
          title="Manage"
          className={activeIcon === "Manage" ? styles.active : ""}
          onClick={handleIconClick}
        >
          <VscSettingsGear size={32} />
        </button>
      </div>
    </nav>
  );
};

export default ActivityBar;
