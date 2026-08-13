import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import profileImage from "@/assets/images/profile.jpg";
import JsonLd from "@/components/JsonLd/JsonLd";
import PostLinks from "@/components/PostLinks/PostLinks";
import { pageMetadata, siteConfig, socialLinks } from "@/data/site";
import styles from "./page.module.css";

export const metadata = pageMetadata({
  title: siteConfig.title,
  description:
    "Desenvolvedor Full-Stack em C#, ASP.NET Core e React, formado em Engenharia de Sistemas pela UFMG. Construindo o Leaf, linguagem de script em Rust.",
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
  { href: "/experiencias", file: "experiências.tsx", hint: "Onde trabalhei" },
  { href: "/competencias", file: "competências.css", hint: "O que eu uso" },
  { href: "/formacao", file: "formação.ts", hint: "Onde estudei" },
];

const PROJECTS = [
  {
    href: "/projetos/jogos/rosa-polar",
    file: "rosa-polar.app",
    hint: "Curva de Rhodonea na Godot Engine",
  },
  {
    href: "/projetos/aplicativos/ze-chinelao",
    file: "zé-chinelão.app",
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

      <section className={styles.highlight}>
        <h2 className={styles.highlightTitle}>
          <Link href="/projetos/leaf">Leaf</Link>
        </h2>
        <p>
          Criar um componente novo no{" "}
          <Link href="/projetos/rustle">Rustle</Link> — a engine de jogos 2D que
          estou escrevendo em Rust — hoje exige recompilar o projeto inteiro.
          Leaf é a linguagem de script que elimina esse ciclo.
        </p>
        <p>
          Tipagem estática, compilada para uma VM de registradores, integração
          nativa com Rust, sem coletor de lixo e sem panic. Construí a camada de
          script da prova de conceito em Rune antes de decidir escrever a minha
          — foi usando que os limites apareceram.
        </p>
        <h3 className={styles.highlightSub}>Escrevendo sobre isso</h3>
        <PostLinks tag="leaf" limit={3} />
        <p className={styles.highlightFooter}>
          <Link href="/blog">Todos os posts</Link>
        </p>
      </section>
    </div>
  );
};

export default Home;
