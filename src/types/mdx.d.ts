/**
 * Declaração completa de `*.mdx`.
 *
 * Não dá para só acrescentar `meta` à declaração do @types/mdx: padrões
 * curinga idênticos não se fundem — um vence e substitui o outro. Como este
 * arquivo vence, ele precisa declarar também o `export default`, senão o
 * esModuleInterop sintetiza um default igual ao namespace do módulo e
 * `<Content />` deixa de ser um componente válido.
 *
 * Os `import(...)` inline mantêm o arquivo como script global (sem `import`
 * no topo), que é o que o torna uma declaração ambiente.
 */
declare module "*.mdx" {
  export const meta: import("@/data/posts").PostMeta;

  const MDXComponent: import("mdx/types").MDXContent;
  export default MDXComponent;
}
