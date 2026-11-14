import Link from "next/link";
import { site, solutions } from "../../site";
import { serviceNav } from "./nav";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-about">
            <Link className="logo" href="/"><span className="logo-mark" aria-hidden="true" /><b>ARA COMPANY</b></Link>
            <p>
              {site.base}を拠点とする個人事業です。Web・AI事業ブランド「{solutions.name}」として、ホームページ・LP制作、LINE予約・NFCの導入支援などを行っています。
            </p>
          </div>
          <nav aria-labelledby="f-services">
            <h2 id="f-services">サービス</h2>
            <ul>
              <li><Link href="/services/">サービス一覧</Link></li>
              {serviceNav.map((s) => <li key={s.href}><Link href={s.href}>{s.label}</Link></li>)}
            </ul>
          </nav>
          <nav aria-labelledby="f-company">
            <h2 id="f-company">ARA COMPANY</h2>
            <ul>
              <li><Link href="/">ホーム</Link></li>
              <li><Link href="/about/">会社概要</Link></li>
              <li><Link href="/contact/">お問い合わせ</Link></li>
              <li><Link href="/privacy/">プライバシーポリシー</Link></li>
            </ul>
          </nav>
          <nav aria-labelledby="f-links">
            <h2 id="f-links">関連サイト</h2>
            <ul>
              {solutions.url && (
                <li><a href={solutions.url} target="_blank" rel="noopener noreferrer">{solutions.name}<span className="sr-only">（新しいタブで開きます）</span> ↗</a></li>
              )}
              <li><Link href="/demo/">制作デモ（架空の店舗）</Link></li>
            </ul>
          </nav>
        </div>
        <p className="copyright">
          <span>運営：{site.name}（{site.stage}・{site.base}）</span>
          <span>© {new Date().getFullYear()} {site.name}</span>
        </p>
      </div>
    </footer>
  );
}
