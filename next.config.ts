import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [60, 75],
  },
  /** Só vale em desenvolvimento. Sem isto, o celular na LAN recebe HTML sem JavaScript. */
  allowedDevOrigins: ["192.168.18.22"],
};

/** Plugin declarado como string, não como função importada: o Turbopack
    serializa a configuração do loader e não atravessa referência de módulo.
    Passando `remarkGfm` importado, o `next dev` quebra e o build não. */
const withMDX = createMDX({
  options: {
    remarkPlugins: [["remark-gfm", {}]],
  },
});

export default withMDX(nextConfig);
