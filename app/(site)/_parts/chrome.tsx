// 全ページ共通の枠：水面の背景・スクロール演出・ヘッダー・フッター
import Link from "next/link";
import SiteNav from "../../components/SiteNav";
import Water from "../../components/Water";
import ScrollFx from "../../components/ScrollFx";
import { site, solutions, contactEnabled } from "../../site";
import { MESSAGE_EN } from "./shared";

export function SiteHeader() {
  return (
    <header className="site band">
      <div className="wrap">
        <Link className="logo" href="/"><span className="logo-mark" aria-hidden="true" /><b>ARA COMPANY</b></Link>
        <SiteNav
          links={[
            { href: "/about/", label: "ABOUT", ja: "私たちについて" },
            { href: "/philosophy/", label: "PHILOSOPHY", ja: "企業理念" },
            { href: "/business/", label: "BUSINESS", ja: "事業構想" },
            { href: "/services/", label: "SERVICES", ja: "Web制作・AI導入" },
            { href: "/story/", label: "OUR STORY", ja: "創業の原点" },
            ...(contactEnabled ? [{ href: "/contact/", label: "CONTACT", ja: "お問い合わせ" }] : []),
          ]}
        />
      </div>
    </header>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="site band">
      <div className="wrap">
        <span>© {year} {site.name}（{site.nameKana}）</span>
        {site.ormosciaUrl && (
          <a className="footer-link" href={site.ormosciaUrl} target="_blank" rel="noopener noreferrer">
            ORMOSCIA（ファッション）<span aria-hidden="true"> ↗</span><span className="sr-only">（新しいタブで開きます）</span>
          </a>
        )}
        {solutions.url && (
          <a className="footer-link" href={solutions.url} target="_blank" rel="noopener noreferrer">
            {solutions.name}（Web・AI事業）<span aria-hidden="true"> ↗</span><span className="sr-only">（新しいタブで開きます）</span>
          </a>
        )}
        <span className="label">{MESSAGE_EN}</span>
      </div>
    </footer>
  );
}

export function SiteBackground() {
  return (
    <>
      <Water />
      <ScrollFx />
    </>
  );
}
