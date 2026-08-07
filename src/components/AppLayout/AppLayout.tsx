"use client";

import { useEffect, useState } from "react";
import { VscClose, VscMenu } from "react-icons/vsc";
import ActivityBar, {
  type ActivityView,
} from "@/components/ActivityBar/ActivityBar";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import TabsBar from "@/components/TabsBar/TabsBar";
import ThemeToggle from "@/components/ThemeToggle/ThemeToggle";
import ViewPanel from "@/components/ViewPanel/ViewPanel";
import styles from "./AppLayout.module.css";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [activeView, setActiveView] = useState<ActivityView | null>("Explorer");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    const willOpen = !isMobileMenuOpen;
    if (willOpen && !activeView) {
      setActiveView("Explorer");
    }
    setIsMobileMenuOpen(willOpen);
  };

  const handleIconClick = (view: ActivityView) => {
    setActiveView(view === activeView ? null : view);
    closeMobileMenu();
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
        <ViewPanel activeView={activeView} onCloseMenu={closeMobileMenu} />
        <div className={styles.mobileSettings}>
          <ThemeToggle />
        </div>
      </div>

      <div className={styles.contentWrapper}>
        <header className={styles.mobileHeader}>
          <button
            type="button"
            className={styles.hamburgerButton}
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <VscClose size={24} aria-hidden="true" />
            ) : (
              <VscMenu size={24} aria-hidden="true" />
            )}
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
