import type { MetadataRoute } from "next";
import { siteUrl } from "./site";

export const dynamic = "force-static";

// 公開URLは site.ts の siteUrl。制作デモは載せない。
export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteUrl) return [];
  return [{ url: `${siteUrl}/`, changeFrequency: "monthly", priority: 1 }];
}
