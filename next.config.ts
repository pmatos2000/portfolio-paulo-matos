import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [60, 75],
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
