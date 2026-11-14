import Link from "next/link";
import { siteUrl } from "../../site";

export type Crumb = { name: string; href: string };

// パンくず＋ページ見出し。パンくずは構造化データ（BreadcrumbList）も出す。
export default function PageHead({
  crumbs, eyebrow, title, lead, children,
}: { crumbs: Crumb[]; eyebrow?: string; title: string; lead?: string; children?: React.ReactNode }) {
  const all = [{ name: "ホーム", href: "/" }, ...crumbs];
  const ld = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: `${siteUrl}${c.href}` })),
  };
  return (
    <div className="page-head">
      <div className="wrap">
        <nav aria-label="パンくずリスト">
          <ol className="crumbs">
            {all.map((c, i) => (
              <li key={c.href}>
                {i === all.length - 1 ? <span aria-current="page">{c.name}</span> : <Link href={c.href}>{c.name}</Link>}
              </li>
            ))}
          </ol>
        </nav>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className="page-title">{title}</h1>
        {lead && <p className="page-lead">{lead}</p>}
        {children}
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </div>
  );
}
