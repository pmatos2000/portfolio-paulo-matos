import type { MDXComponents } from "mdx/types";
import CodeBlock from "@/components/CodeBlock/CodeBlock";
import MdxLink from "@/components/MdxLink/MdxLink";

const components: MDXComponents = {
  a: MdxLink,
  pre: CodeBlock,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
