"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { VscClose, VscMenu } from "react-icons/vsc";
import ActivityBar from "@/components/ActivityBar/ActivityBar";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import MobileViewBar from "@/components/MobileViewBar/MobileViewBar";
import TabsBar from "@/components/TabsBar/TabsBar";
import ViewPanel from "@/components/ViewPanel/ViewPanel";
import type { ActivityView } from "@/data/activityViews";
import type { BlogYear } from "@/data/blogTree";
import type { Commit } from "@/data/gitLog";
import { postSlugFromPath } from "@/data/sidebarTree";
import styles from "./AppLayout.module.css";

type AppLayoutProps = {
  children: React.ReactNode;
  blogYears: BlogYear[];
  commits: Commit[];
};

export default function AppLayout({
  children,
  blogYears,
  commits,
}: AppLayoutProps) {
  const pathname = usePathname();
  const postSlug = postSlugFromPath(pathname);
  const [lastPostSlug, setLastPostSlug] = useState<string | null>(postSlug);
  const [activeView, setActiveView] = useState<ActivityView | null>("Explorer");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  useEffect(() => {
    if (postSlug) {
      setLastPostSlug(postSlug);
    }
  }, [postSlug]);

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

  /** No rodapé, alternar para null deixaria a gaveta aberta e vazia. */
  const handleFooterClick = (view: ActivityView) => {
    setActiveView(view);
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
        <ViewPanel
          activeView={activeView}
          onCloseMenu={closeMobileMenu}
          lastPostSlug={lastPostSlug}
          blogYears={blogYears}
          commits={commits}
        />
        <div className={styles.mobileViews}>
          <MobileViewBar activeView={activeView} onSelect={handleFooterClick} />
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
