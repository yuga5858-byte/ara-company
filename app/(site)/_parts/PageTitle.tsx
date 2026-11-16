import Link from "next/link";

// 各ページの見出し（ページの h1）。セクションの中の大きな見出しはそのまま使う。
export default function PageTitle({ en, ja }: { en: string; ja: string }) {
  return (
    <div className="page-title band">
      <div className="wrap">
        <nav className="crumbs" aria-label="現在地">
          <Link href="/">TOP</Link>
          <span aria-hidden="true">／</span>
          <span aria-current="page">{en}</span>
        </nav>
        <h1>
          <span className="page-title-en">{en}</span>
          <span className="page-title-ja">{ja}</span>
        </h1>
      </div>
    </div>
  );
}
