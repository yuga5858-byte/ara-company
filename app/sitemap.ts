import type { MetadataRoute } from "next";
import { siteUrl } from "./site";
import { services, servicePath } from "./services";

export const dynamic = "force-static";

// 公開URLは site.ts の siteUrl。制作デモ（/demo/）は載せない。
export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteUrl) return [];
  const page = (path: string, priority: number) => ({ url: `${siteUrl}${path}`, changeFrequency: "monthly" as const, priority });
  return [
    page("/", 1),
    page("/services/", 0.9),
    ...services.map((s) => page(servicePath(s.slug), 0.8)),
    page("/about/", 0.7),
    page("/contact/", 0.7),
    page("/privacy/", 0.3),
  ];
}
