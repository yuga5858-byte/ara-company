import type { MetadataRoute } from "next";
import { siteUrl } from "./site";

export const dynamic = "force-static";

// 制作デモは各ページの noindex で検索結果から外す（クロール自体は許可して noindex を読ませる）。
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: siteUrl ? `${siteUrl}/sitemap.xml` : undefined,
  };
}
