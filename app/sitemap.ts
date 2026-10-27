import type { MetadataRoute } from "next";
import { siteUrl } from "./site";

export const dynamic = "force-static";

// 公開URLが決まったら NEXT_PUBLIC_SITE_URL を設定する。制作デモは載せない。
export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteUrl) return [];
  return [{ url: `${siteUrl}/`, changeFrequency: "monthly", priority: 1 }];
}
