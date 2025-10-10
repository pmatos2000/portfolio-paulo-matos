import { Fragment } from "react";
import SkillBar from "@/components/SkillBar/SkillBar";
import { skillsData } from "@/data/skills";
import styles from "./competencias.module.css";

const CompetenciasPage = () => {
  return (
    <div className="contentPage">
      <h2>Minhas Competências</h2>
      <p>
        Um resumo detalhado das tecnologias, arquiteturas e metodologias com as
        quais tenho experiência, organizado por categoria.
      </p>

      {skillsData.map((group) => (
        <section key={group.category} className={styles.skillGroup}>
          <h3>{group.category}</h3>
          <p className={styles.categoryDescription}>{group.description}</p>

          <div className={styles.skillsGrid}>
            {group.skills.map((skill) => (
              <Fragment key={skill.name}>
                <div className={styles.skillName}>{skill.name}</div>
                <div>
                  <SkillBar level={skill.level} />
                </div>
              </Fragment>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default CompetenciasPage;
