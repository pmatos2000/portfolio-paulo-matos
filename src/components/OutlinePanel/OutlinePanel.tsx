import type { TreeItem } from "@/data/sidebarTree";
import TreeNodeComponent from "../TreeNodeComponent/TreeNodeComponent";
import styles from "./OutlinePanel.module.css";

type OutlinePanelProps = { items: TreeItem[] };

/**
 * Seção OUTLINE no rodapé do Explorer, com a estrutura da página aberta.
 *
 * Fica fora da árvore de arquivos de propósito: a árvore nasce expandida e é
 * servida em toda página, então pendurar as seções de todas as páginas nela
 * injetaria dezenas de links repetidos em cada HTML. Aqui entram só as âncoras
 * da página atual.
 */
const OutlinePanel = ({ items }: OutlinePanelProps) => {
  if (items.length === 0) {
    return null;
  }

  return (
    <details className={styles.outline} open>
      <summary className={styles.summary}>OUTLINE</summary>
      <ul className={styles.list}>
        {items.map((item) => (
          <TreeNodeComponent key={item.id} node={item} />
        ))}
      </ul>
    </details>
  );
};

export default OutlinePanel;
