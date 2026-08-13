"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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

  const handleIconClick = (view: ActivityView) => {
    setActiveView(view === activeView ? null : view);
  };

  /**
   * No compacto a barra de baixo é o único controle da gaveta. Tocar no painel
   * já aberto fecha; nos outros, troca de painel sem fechar. Sem esse alternar
   * a única saída seria a faixa de overlay, que a 360px tem 40px de largura.
   */
  const handleFooterClick = (view: ActivityView) => {
    if (isMobileMenuOpen && view === activeView) {
      setIsMobileMenuOpen(false);
      return;
    }
    setActiveView(view);
    setIsMobileMenuOpen(true);
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
      </div>

      <div className={styles.contentWrapper}>
        <TabsBar />
        <Breadcrumbs />
        <main className={styles.contentArea}>{children}</main>
      </div>

      {isMobileMenuOpen && (
        <button
          type="button"
          className={styles.overlay}
          onClick={closeMobileMenu}
          aria-label="Fechar painel"
        />
      )}

      {/* Fora do .viewPanelContainer de propósito: dentro dele, a barra saía da
          tela junto com a gaveta e não haveria como fechar nem trocar de painel. */}
      <div className={styles.mobileViews}>
        <MobileViewBar
          activeView={activeView}
          isOpen={isMobileMenuOpen}
          onSelect={handleFooterClick}
        />
      </div>
    </div>
  );
}
