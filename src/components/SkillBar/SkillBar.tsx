import type { Level } from "@/data/skills";
import styles from "./SkillBar.module.css";

type SkillBarProps = {
  level: Level;
};

const levelMap = {
  Avançado: 3,
  Intermediário: 2,
  Básico: 1,
};

const SkillBar = ({ level }: SkillBarProps) => {
  const filledSegments = levelMap[level] || 0;

  return (
    <div className={styles.skillBar}>
      <div
        className={`${styles.barSegment} ${filledSegments >= 1 ? styles.filled : ""}`}
      ></div>
      <div
        className={`${styles.barSegment} ${filledSegments >= 2 ? styles.filled : ""}`}
      ></div>
      <div
        className={`${styles.barSegment} ${filledSegments >= 3 ? styles.filled : ""}`}
      ></div>
    </div>
  );
};

export default SkillBar;
