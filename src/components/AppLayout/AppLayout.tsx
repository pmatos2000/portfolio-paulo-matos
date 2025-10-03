"use client";

import { useState } from "react";
import ActivityBar from "@/components/ActivityBar/ActivityBar";
import ViewPanel from "@/components/ViewPanel/ViewPanel";
import styles from "./AppLayout.module.css";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [activeView, setActiveView] = useState<string | null>("Explorer");

  const handleIconClick = (iconName: string) => {
    if (iconName === activeView) {
      setActiveView(null);
    } else {
      setActiveView(iconName);
    }
  };

  return (
    <div className={styles.mainLayout}>
      <ActivityBar
        activeIcon={activeView || ""}
        onIconClick={handleIconClick}
      />
      <ViewPanel activeView={activeView} />
      <main className={styles.contentArea}>{children}</main>
    </div>
  );
}
