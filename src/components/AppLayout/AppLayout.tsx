"use client";

import { useState } from "react";
import { VscClose, VscMenu } from "react-icons/vsc";
import ActivityBar from "@/components/ActivityBar/ActivityBar";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import TabsBar from "@/components/TabsBar/TabsBar";
import ViewPanel from "@/components/ViewPanel/ViewPanel";
import styles from "./AppLayout.module.css";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [activeView, setActiveView] = useState<string | null>("Explorer");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleIconClick = (iconName: string) => {
    if (iconName === activeView) {
      setActiveView(null);
    } else {
      setActiveView(iconName);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <div className={styles.mainLayout}>
      <ActivityBar
        activeIcon={activeView || ""}
        onIconClick={handleIconClick}
      />

      <div
        className={`${styles.viewPanelContainer} ${isMobileMenuOpen ? styles.mobileMenuOpen : ""}`}
      >
        <ViewPanel activeView={activeView} />
      </div>

      <div className={styles.contentWrapper}>
        <header className={styles.mobileHeader}>
          <button
            type="button"
            className={styles.hamburgerButton}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Abrir menu"
          >
            {isMobileMenuOpen ? <VscClose size={24} /> : <VscMenu size={24} />}
          </button>
        </header>

        <TabsBar />
        <Breadcrumbs />
        <main className={styles.contentArea}>{children}</main>
      </div>
      {isMobileMenuOpen && (
        <button
          type="button"
          className={styles.overlay}
          onClick={() => setIsMobileMenuOpen(false)}
          aria-label="Fechar menu"
        />
      )}
    </div>
  );
}
