import type { NextConfig } from "next";

// STATIC_EXPORT=1 で静的書き出し（out/）。Cloudflare Pages など静的ホスティングにも置ける。
const nextConfig: NextConfig = {
  output: process.env.STATIC_EXPORT ? "export" : undefined,
  trailingSlash: true,
};

export default nextConfig;
