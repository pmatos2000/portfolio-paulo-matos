import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import profileImage from "@/assets/images/profile.jpg";
import JsonLd from "@/components/JsonLd/JsonLd";
import { pageMetadata, siteConfig, socialLinks } from "@/data/site";
import styles from "./page.module.css";

export const metadata = pageMetadata({
  title: siteConfig.title,
  description:
    "Desenvolvedor Full-Stack especializado em C#, ASP.NET Core e React, formado em Engenharia de Sistemas pela UFMG. Atualmente construindo Leaf, uma linguagem de script embarcável em Rust.",
  path: "/",
  absoluteTitle: true,
});

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  alternateName: "Paulo Henrique Rodrigues de Matos",
  url: siteConfig.url,
  image: new URL(profileImage.src, siteConfig.url).toString(),
  jobTitle: "Desenvolvedor Full-Stack",
  description: siteConfig.description,
  worksFor: {
    "@type": "Organization",
    name: "Lyncas",
    url: "https://lyncas.net/",
  },
  sameAs: [socialLinks.linkedin, socialLinks.github],
  knowsAbout: ["C#", "ASP.NET Core", "React", "TypeScript", "Rust"],
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "Universidade Federal de Minas Gerais",
    },
    {
      "@type": "CollegeOrUniversity",
      name: "CEFET-MG",
    },
  ],
};

const SOCIAL = [
  { href: socialLinks.linkedin, label: "LinkedIn", Icon: FaLinkedin },
  { href: socialLinks.github, label: "GitHub", Icon: FaGithub },
];

const START_LINKS = [
  { href: "/sobre-mim", file: "sobre-mim.css", hint: "Quem eu sou" },
  { href: "/experiencias", file: "experiencias.tsx", hint: "Onde trabalhei" },
  { href: "/competencias", file: "competências.css", hint: "O que eu uso" },
  { href: "/formacao", file: "formacao.ts", hint: "Onde estudei" },
];

const PROJECTS = [
  {
    href: "/projetos/jogos/rosa-polar",
    file: "rosa-polar.app",
    hint: "Curva de Rhodonea na Godot Engine",
  },
  {
    href: "/projetos/aplicativos/ze-chinelao",
    file: "ze-chinelao.app",
    hint: "MMC e sistemas lineares passo a passo",
  },
];

const Home = () => {
  return (
    <div className={styles.welcome}>
      <JsonLd data={personSchema} />
      <header className={styles.header}>
        <Image
          src={profileImage}
          alt="Paulo Matos"
          width={80}
          height={80}
          quality={60}
          className={styles.avatar}
          priority
        />
        <div>
          <h1 className={styles.title}>Paulo Matos</h1>
          <p className={styles.subtitle}>
            Desenvolvedor Full-Stack &amp; Líder Técnico
          </p>
          <div className={styles.social}>
            {SOCIAL.map(({ href, label, Icon }) => (
              <a
                key={href}
                href={href}
                className={styles.socialLink}
                target="_blank"
                rel="me noopener noreferrer"
              >
                <Icon size={18} aria-hidden="true" />
                <span>{label}</span>
              </a>
            ))}
          </div>
        </div>
      </header>

      <section className={styles.highlight}>
        <h2 className={styles.highlightTitle}>Leaf</h2>
        <p>
          Criar um componente novo no{" "}
          <a
            href="https://github.com/pmatos2000/rustle"
            target="_blank"
            rel="noopener noreferrer"
          >
            Rustle
          </a>{" "}
          — um motor gráfico que estou escrevendo em Rust — hoje exige
          recompilar o projeto inteiro. Leaf é a linguagem de script que elimina
          esse ciclo.
        </p>
        <p>
          Tipagem estática, compilada para uma VM própria, integração nativa com
          Rust, sem coletor de lixo e sem panic. Avaliei Lua, Rhai e Rune antes
          de decidir escrever a minha — nenhuma atendia a tudo isso ao mesmo
          tempo.
        </p>
      </section>

      <div className={styles.columns}>
        <section>
          <h2 className={styles.columnTitle}>Começar</h2>
          <ul className={styles.list}>
            {START_LINKS.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={styles.link}>
                  <span className={styles.file}>{item.file}</span>
                  <span className={styles.hint}>{item.hint}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className={styles.columnTitle}>Projetos</h2>
          <ul className={styles.list}>
            {PROJECTS.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={styles.link}>
                  <span className={styles.file}>{item.file}</span>
                  <span className={styles.hint}>{item.hint}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Home;
