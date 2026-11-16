import type { MetadataRoute } from "next";
import { siteUrl } from "./site";

export const dynamic = "force-static";

// 公開URLは site.ts の siteUrl。制作デモは載せない。
const pages = ["", "about/", "philosophy/", "business/", "services/", "story/", "contact/"];

export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteUrl) return [];
  return pages.map((p) => ({ url: `${siteUrl}/${p}`, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.7 }));
}
