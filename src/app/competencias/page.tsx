import { Fragment } from "react";
import SkillBar from "@/components/SkillBar/SkillBar";
import { pageMetadata } from "@/data/site";
import { skillsData } from "@/data/skills";
import styles from "./competencias.module.css";

export const metadata = pageMetadata({
  title: "Competências técnicas",
  description:
    "Tecnologias, arquiteturas e metodologias com as quais tenho experiência, organizadas por categoria e nível de proficiência.",
  path: "/competencias",
});

const CompetenciasPage = () => {
  return (
    <div className="contentPage">
      <h1>Minhas Competências</h1>
      <p>
        Um resumo detalhado das tecnologias, arquiteturas e metodologias com as
        quais tenho experiência, organizado por categoria.
      </p>

      {skillsData.map((group) => (
        <section key={group.category} className={styles.skillGroup}>
          <h2>{group.category}</h2>
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
