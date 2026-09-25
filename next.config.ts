import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ecommerce-santa-maria.s3.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
