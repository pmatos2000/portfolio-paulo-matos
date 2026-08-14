import { siteConfig, socialLinks } from "@/data/site";

/**
 * Nó único da entidade Paulo Matos no grafo do site.
 *
 * O nó é definido uma vez, pelo personSchema da home. Todo JSON-LD que
 * precisa citar o autor referencia este @id em vez de declarar outro objeto
 * Person — sem isso cada página publica um nó solto e o buscador precisa
 * deduzir que são a mesma pessoa, em vez de ler a relação já declarada.
 */
export const PERSON_ID = `${siteConfig.url}/#paulo`;

/**
 * Referência ao nó da home, com o mínimo repetido junto.
 *
 * Só o @id seria o correto pela especificação, e foi o que estava aqui. Mas
 * o validador do Google avalia cada página isolada: ele não busca a home
 * para descobrir quem é esse @id, e reportava author/publisher sem nome nem
 * url — chegava a inferir "Thing" no lugar de "Person".
 *
 * Repetir @type, name e url não cria um segundo nó: o @id é o mesmo, então
 * quem monta o grafo funde as duas descrições. O que ainda não se pode fazer
 * é omitir o @id — era isso que fragmentava a entidade.
 */
export const personRef = {
  "@id": PERSON_ID,
  "@type": "Person",
  name: siteConfig.name,
  url: siteConfig.url,
} as const;

/**
 * Tecnologia como entidade, não como string.
 *
 * "Rust" sozinho tanto é a linguagem quanto a ferrugem, e "React" é também
 * um verbo em inglês. O sameAs para a Wikipédia diz de qual das acepções se
 * trata, que é o que liga esta Person ao mesmo nó que o buscador já conhece.
 */
type Technology = {
  name: string;
  sameAs: string;
};

const WIKIPEDIA = "https://en.wikipedia.org/wiki";

const TECHNOLOGIES: Technology[] = [
  { name: "C#", sameAs: `${WIKIPEDIA}/C_Sharp_(programming_language)` },
  { name: "ASP.NET Core", sameAs: `${WIKIPEDIA}/ASP.NET_Core` },
  { name: "React", sameAs: `${WIKIPEDIA}/React_(software)` },
  { name: "TypeScript", sameAs: `${WIKIPEDIA}/TypeScript` },
  { name: "Rust", sameAs: `${WIKIPEDIA}/Rust_(programming_language)` },
];

const asThing = ({ name, sameAs }: Technology) => ({
  "@type": "Thing",
  name,
  sameAs,
});

const LOCALITY = "Belo Horizonte";

const ADDRESS = {
  "@type": "PostalAddress",
  addressLocality: LOCALITY,
  addressRegion: "MG",
  addressCountry: "BR",
} as const;

/**
 * A Person do site. Só a home a emite — as demais páginas referenciam.
 *
 * A imagem chega por parâmetro porque o caminho vem do import do Next, que
 * embute o hash do arquivo: escrever o caminho à mão aqui quebraria calado
 * na primeira vez que a foto mudasse.
 */
export const personSchema = (imagePath: string) => ({
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": PERSON_ID,
  name: siteConfig.name,
  alternateName: "Paulo Henrique Rodrigues de Matos",
  url: siteConfig.url,
  mainEntityOfPage: siteConfig.url,
  image: new URL(imagePath, siteConfig.url).toString(),
  jobTitle: "Desenvolvedor Full-Stack",
  description: siteConfig.description,
  address: ADDRESS,
  hasOccupation: {
    "@type": "Occupation",
    name: "Desenvolvedor de software",
    occupationLocation: { "@type": "City", name: LOCALITY },
  },
  worksFor: {
    "@type": "Organization",
    name: "Lyncas",
    url: "https://lyncas.net/",
  },
  sameAs: [socialLinks.linkedin, socialLinks.github],
  knowsAbout: TECHNOLOGIES.map(asThing),
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
});

type ProjectInput = {
  name: string;
  description: string;
  path: string;
  /** Ausente enquanto não houver código publicado. */
  codeRepository?: string;
  /** Em que o projeto é escrito, não sobre o que ele fala. */
  programmingLanguage?: string[];
  /** Onde rodar ou baixar: itch.io, loja, demonstração. */
  sameAs?: string[];
  keywords?: string[];
};

/**
 * Marca a página de um projeto como obra de autoria da Person.
 *
 * É o que tira o knowsAbout do campo da afirmação: dizer "sei Rust" custa
 * uma linha, mas um SoftwareSourceCode com repositório público, linguagem
 * declarada e autor apontando para o mesmo @id da home é verificável.
 *
 * SoftwareSourceCode pressupõe código publicado. Projeto ainda em
 * especificação entra como CreativeWork — declarar fonte onde não existe
 * nenhuma seria falso, e dado estruturado falso é pior que dado ausente.
 */
export const projectSchema = ({
  name,
  description,
  path,
  codeRepository,
  programmingLanguage,
  sameAs,
  keywords,
}: ProjectInput) => ({
  "@context": "https://schema.org",
  "@type": codeRepository ? "SoftwareSourceCode" : "CreativeWork",
  name,
  description,
  url: new URL(path, siteConfig.url).toString(),
  mainEntityOfPage: new URL(path, siteConfig.url).toString(),
  author: personRef,
  inLanguage: "pt-BR",
  ...(codeRepository ? { codeRepository } : {}),
  ...(programmingLanguage ? { programmingLanguage } : {}),
  ...(sameAs ? { sameAs } : {}),
  ...(keywords ? { keywords: keywords.join(", ") } : {}),
});
