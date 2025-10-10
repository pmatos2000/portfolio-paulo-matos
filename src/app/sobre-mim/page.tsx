import Image from "next/image";

import profileImage from "@/assets/images/profile.jpg";
import styles from "./sobre-mim.module.css";

const SobreMimPage = () => {
  return (
    <div className="contentPage">
      <div className={styles.aboutContainer}>
        <div className={styles.photoContainer}>
          <Image src={profileImage} alt="Foto de Paulo Matos" priority />
        </div>

        <div className={styles.textContainer}>
          <h2>Olá! Eu sou Paulo Matos.</h2>
          <h3>Desenvolvedor Full-Stack & Líder Técnico</h3>

          <p>
            Sou um desenvolvedor Full-Stack com mais de 5 anos de experiência em
            sistemas de alta complexidade, especializado em C#, ASP.NET Core e
            React.js. Meu perfil é analítico e orientado a resultados, com foco
            em entregar soluções de alta performance e escalabilidade, sempre
            aplicando as melhores práticas de desenvolvimento.
          </p>

          <h3>Minha Jornada com a Programação</h3>
          <p>
            Minha primeira aventura no mundo do código começou de uma forma um
            tanto inusitada: criando scripts em Ruby para modificar jogos no RPG
            Maker XP. Embora hoje eu mal me lembre da sintaxe, foi ali que a
            semente da curiosidade foi plantada. Essa paixão por ensinar e
            entender a fundo os pilares da computação floresceu durante a
            faculdade, onde
            <strong> dei aulas de programação em C e C++</strong>. Essa
            experiência não só solidificou meu conhecimento em
            <strong> estruturas de dados</strong>, como também me permitiu
            ajudar muitos colegas a se formarem.
          </p>

          <h3>Além do Código</h3>
          <p>
            Acredito que a criatividade e a lógica que aplicamos no
            desenvolvimento se estendem para muitas outras áreas. Minha vontade
            de compartilhar conhecimento, por exemplo, me levou a ter um canal
            no YouTube focado em ensino. Essa versatilidade também me acompanhou
            na vida acadêmica: fui
            <strong> monitor de Cálculo Numérico</strong>, o que demonstra meu
            domínio em diferentes áreas e minha facilidade para aprender e
            ensinar coisas novas.
          </p>
          <p>
            Fora do universo digital, sou um apaixonado por culinária, uma
            paixão que me levou a criar um blog de comida para compartilhar
            receitas e experiências. Também encontro um grande prazer no contato
            com a natureza; já tive um jardim repleto de plantas, com um carinho
            especial pelas onze-horas, e cheguei a construir uma compostagem
            caseira, aprendendo na prática sobre ciclos e sustentabilidade.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SobreMimPage;
