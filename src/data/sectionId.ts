/**
 * Slug ASCII para id de seção nas páginas estáticas.
 *
 * Segue a convenção já usada à mão nas âncoras do site — `matematica-
 * computacional`, `cases-ageis` — em vez de preservar acento. Id acentuado
 * vira percent-encoding quando a URL é compartilhada.
 *
 * Difere de propósito do id dos posts, que o rehype-slug gera mantendo acento:
 * lá o texto vem do MDX e não passa por aqui.
 */
export const sectionId = (text: string): string =>
  text
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
