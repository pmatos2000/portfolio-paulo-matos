import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import profileImage from "@/assets/images/profile.jpg";
import JsonLd from "@/components/JsonLd/JsonLd";
import PostLinks from "@/components/PostLinks/PostLinks";
import { personSchema } from "@/data/schema";
import { pageMetadata, siteConfig, socialLinks } from "@/data/site";
import styles from "./page.module.css";

export const metadata = pageMetadata({
  title: siteConfig.title,
  description:
    "Desenvolvedor Full-Stack em C#, ASP.NET Core e React, formado em Engenharia de Sistemas pela UFMG. Construindo o Leaf, linguagem de script em Rust.",
  path: "/",
  absoluteTitle: true,
});

const SOCIAL = [
  { href: socialLinks.linkedin, label: "LinkedIn", Icon: FaLinkedin },
  { href: socialLinks.github, label: "GitHub", Icon: FaGithub },
];

const START_LINKS = [
  { href: "/sobre-mim", file: "sobre-mim.css", hint: "Quem eu sou" },
  { href: "/experiencias", file: "experiências.tsx", hint: "Onde trabalhei" },
  { href: "/competencias", file: "competências.css", hint: "O que eu uso" },
  { href: "/formacao", file: "formação.ts", hint: "Onde estudei" },
  { href: "/publicacoes", file: "publicações/", hint: "O que documentei" },
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
      <JsonLd data={personSchema(profileImage.src)} />
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
          <h1 className={styles.title}>
            <span>Paulo Matos</span>
            <span className={styles.role}>
              Desenvolvedor Full-Stack &amp; Líder Técnico
            </span>
          </h1>
          <p className={styles.subtitle}>
            C#, ASP.NET Core, React, TypeScript e Rust
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

      <section className={styles.intro} aria-label="Apresentação">
        <p>
          Desenvolvo aplicações e soluções de software há mais de cinco anos,
          com experiência em arquitetura de sistemas, desenvolvimento full-stack
          e liderança técnica. Sou formado em Engenharia de Sistemas pela UFMG e
          gosto de transformar problemas complexos em produtos simples,
          confiáveis e fáceis de manter.
        </p>
        <p>
          Conheça minha <Link href="/sobre-mim">trajetória</Link>, veja minhas{" "}
          <Link href="/experiencias">experiências profissionais</Link>, explore
          os <Link href="/projetos">projetos que desenvolvi</Link> ou leia meus{" "}
          <Link href="/blog">artigos técnicos</Link>.
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

      <section className={styles.highlight}>
        <h2 className={styles.highlightTitle}>
          <Link href="/projetos/leaf">Leaf</Link>
        </h2>
        <p>
          O <Link href="/projetos/leaf">Leaf</Link> é uma linguagem de script
          com tipagem estática que estou desenvolvendo em Rust. O projeto nasceu
          para acelerar o desenvolvimento do{" "}
          <Link href="/projetos/rustle">Rustle</Link>, minha engine de jogos 2D,
          evitando a recompilação completa a cada alteração de comportamento.
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
