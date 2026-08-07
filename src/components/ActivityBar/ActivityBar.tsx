"use client";

import type { IconType } from "react-icons";
import { VscFiles, VscSettingsGear } from "react-icons/vsc";
import styles from "./ActivityBar.module.css";

export type ActivityView = "Explorer" | "Manage";

type ActivityBarProps = {
  activeIcon: string;
  onIconClick: (view: ActivityView) => void;
};

const VIEWS: { id: ActivityView; label: string; Icon: IconType }[] = [
  { id: "Explorer", label: "Explorador de arquivos", Icon: VscFiles },
  { id: "Manage", label: "Configurações", Icon: VscSettingsGear },
];

const ActivityBar = ({ activeIcon, onIconClick }: ActivityBarProps) => {
  return (
    <nav className={styles.activityBar}>
      {VIEWS.map(({ id, label, Icon }, index) => (
        <div
          key={id}
          className={index === 0 ? styles.iconGroupTop : styles.iconGroupBottom}
        >
          <button
            type="button"
            title={label}
            aria-label={label}
            aria-pressed={activeIcon === id}
            className={activeIcon === id ? styles.active : ""}
            onClick={() => onIconClick(id)}
          >
            <Icon size={32} />
          </button>
        </div>
      ))}
    </nav>
  );
};

export default ActivityBar;
