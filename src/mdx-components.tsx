import type { MDXComponents } from "mdx/types";
import type { ComponentProps } from "react";
import CodeBlock from "@/components/CodeBlock/CodeBlock";
import MdxLink from "@/components/MdxLink/MdxLink";

/** O GFM entrega <table> sem contêiner. Sem o wrapper, uma tabela de seis
    colunas estoura o layout no celular em vez de rolar — o mesmo caso que o
    <pre> já resolvia com overflow-x próprio. */
const Table = (props: ComponentProps<"table">) => (
  <div className="tableWrap">
    <table {...props} />
  </div>
);

const components: MDXComponents = {
  a: MdxLink,
  pre: CodeBlock,
  table: Table,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
