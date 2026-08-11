import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [60, 75],
  },
  /** Só vale em desenvolvimento. Sem isto, o celular na LAN recebe HTML sem JavaScript. */
  allowedDevOrigins: ["192.168.18.22"],
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
