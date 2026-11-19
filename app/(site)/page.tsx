import { Hero, Portfolio, ContactSection } from "./_parts/sections";
import LegacyHashRedirect from "./_parts/LegacyHashRedirect";
import IntroReveal from "../components/IntroReveal";
import { site, siteUrl } from "../site";

// 検索エンジン向け：サイト名と読み方（Google の検索結果のサイト名に使われる）
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.name,
  alternateName: [site.nameKana, "オルモ カンパニー", "ARA COMPANY"],
  url: `${siteUrl}/`,
  inLanguage: "ja",
};

// トップページ：ファーストビューと、各ページへの入口
const menu = [
  { href: "/about/", en: "ABOUT", ja: "私たちについて", body: "大阪府を拠点とする個人事業、ORMO COMPANYのこと。" },
  { href: "/philosophy/", en: "PHILOSOPHY", ja: "企業理念", body: "挑戦するすべての人に、次の可能性を。" },
  { href: "/business/", en: "BUSINESS", ja: "事業構想", body: "現在の取り組みと、これからの構想。" },
  { href: "/services/", en: "SERVICES", ja: "Web制作・AI導入", body: "ARVR TECHとして承るWeb制作・運用改善・AI導入。" },
  { href: "/story/", en: "OUR STORY", ja: "創業の原点", body: "サッカーと怪我の経験から生まれた想い。" },
];

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <LegacyHashRedirect />
      <IntroReveal />
      <main id="top">
        <Hero />
        <Portfolio />
        <section className="block band" aria-labelledby="menu-title">
          <div className="wrap">
            <div className="sec-head" data-reveal>
              <span className="label">Menu</span>
              <div><h2 id="menu-title">ORMO COMPANYを知る</h2></div>
            </div>
            <ul className="menu-cards">
              {menu.map((m, i) => (
                <li key={m.href} data-reveal style={{ "--d": i } as React.CSSProperties}>
                  <a href={m.href}>
                    <span className="label">{m.en}</span>
                    <span className="menu-ja">{m.ja}</span>
                    <span className="menu-body">{m.body}</span>
                    <span className="menu-go" aria-hidden="true">→</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <ContactSection />
    </>
  );
}
