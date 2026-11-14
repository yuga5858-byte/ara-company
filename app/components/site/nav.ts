import { services, servicePath } from "../../services";

// ヘッダー・フッター・スマホメニューで共通のリンク
export const mainNav = [
  { href: "/", label: "ホーム" },
  { href: "/services/", label: "サービス", children: true },
  { href: "/about/", label: "会社概要" },
] as const;

export const serviceNav = services.map((s) => ({ href: servicePath(s.slug), label: s.name, short: s.short, status: s.status }));

// trailingSlash の有無をそろえて比較する
export const norm = (p: string) => (p.length > 1 && p.endsWith("/") ? p.slice(0, -1) : p);
