"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Breadcrumbs.module.css";

const Breadcrumbs = () => {
  const pathname = usePathname();
  const parts = pathname.slice(1).split("/").filter(Boolean);

  if (parts.length === 0) {
    return null;
  }

  // Cada segmento acumula o caminho: /projetos, /projetos/jogos, ...
  const segments = parts.map((text, index) => ({
    text,
    href: `/${parts.slice(0, index + 1).join("/")}`,
  }));

  return (
    <nav className={styles.breadcrumbs} aria-label="Trilha de navegação">
      <Link href="/" className={styles.crumb} aria-label="Voltar para o início">
        src
      </Link>
      {segments.map((segment, index) => (
        <div key={segment.href} className={styles.segment}>
          <span className={styles.separator}>&gt;</span>
          <Link
            href={segment.href}
            className={styles.crumb}
            aria-current={index === segments.length - 1 ? "page" : undefined}
          >
            {segment.text}
          </Link>
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
