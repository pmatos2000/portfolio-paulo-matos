import type { MDXComponents } from "mdx/types";

/**
 * Componentes aplicados a todo MDX do site. Vazio por enquanto: os estilos de
 * prosa vêm de `.contentPage` no globals.css. É daqui que o realce de sintaxe
 * (item 12) e o tratamento de imagem vão pendurar.
 */
const components: MDXComponents = {};

export function useMDXComponents(): MDXComponents {
  return components;
}
