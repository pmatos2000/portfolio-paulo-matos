"use client";

import { type ActivityView, ALL_VIEWS } from "@/data/activityViews";
import styles from "./MobileViewBar.module.css";

type MobileViewBarProps = {
  activeView: ActivityView | null;
  /** A gaveta está aberta. Muda o significado de tocar no item ativo. */
  isOpen: boolean;
  onSelect: (view: ActivityView) => void;
};

const MobileViewBar = ({
  activeView,
  isOpen,
  onSelect,
}: MobileViewBarProps) => (
  <nav className={styles.bar} aria-label="Painéis">
    {ALL_VIEWS.map(({ id, label, short, Icon }) => {
      /** Só acende com a gaveta aberta: o activeView continua apontando para
          o último painel mesmo fechada, e o destaque sugeria que havia algo
          aberto quando não havia. */
      const active = isOpen && activeView === id;
      return (
        <button
          key={id}
          type="button"
          title={label}
          aria-label={label}
          /** Cada botão abre um painel, então expanded descreve melhor que pressed. */
          aria-expanded={active && isOpen}
          className={`${styles.button} ${active ? styles.active : ""}`}
          onClick={() => onSelect(id)}
        >
          <Icon size={20} aria-hidden="true" />
          <span>{short}</span>
        </button>
      );
    })}
  </nav>
);

export default MobileViewBar;
