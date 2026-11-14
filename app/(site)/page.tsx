import Link from "next/link";
import type { Metadata } from "next";
import { site, solutions } from "../site";
import ServiceCards from "../components/site/ServiceCards";
import CtaBand from "../components/site/CtaBand";
import HashRedirect from "../components/site/HashRedirect";

export const metadata: Metadata = {
  title: { absolute: "ARA COMPANY｜ビジネスの可能性を、テクノロジーで広げる。" },
  description:
    "ARA COMPANYは、大阪府を拠点にWeb制作・集客支援・LINE活用・業務効率化を行う個人事業です。ホームページ制作、LP制作、Web広告運用、LINE予約システム、NFC × LINE導入支援。",
  alternates: { canonical: "/" },
};

const approach = [
  { title: "分かりやすく、正直に", body: "できること・できないこと、かかる費用を最初にお伝えします。" },
  { title: "作って終わりにしない", body: "公開後の更新や、予約・問い合わせの導線まで一緒に考えます。" },
  { title: "小さく始めて、育てる", body: "LP1ページやLINE予約だけなど、必要なところから始められます。" },
];

export default function Home() {
  const orgLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: "https://ara-company.jp/",
    email: site.email ?? undefined,
    areaServed: "JP",
    brand: { "@type": "Brand", name: solutions.name, url: solutions.url ?? undefined },
  };
  return (
    <>
      <HashRedirect />
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-grid" aria-hidden="true" />
        <div className="wrap" style={{ position: "relative" }}>
          <span className="seal" aria-hidden="true">挑</span>
          <p className="eyebrow">ARA COMPANY — Web &amp; Technology, Osaka</p>
          <h1 id="hero-title">
            <span className="line">ビジネスの可能性を、</span>
            <span className="line">テクノロジーで広げる。</span>
          </h1>
          <p className="lead">ARA COMPANYは、Web制作・集客支援・LINE活用・業務効率化を通じて、事業の成長をサポートします。</p>
          <div className="actions">
            <Link className="btn" href="/services/">サービスを見る <span className="arrow" aria-hidden="true">→</span></Link>
            <Link className="btn btn-line" href="/contact/">お問い合わせ</Link>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="biz-title">
        <div className="wrap split">
          <div className="sec-head">
            <p className="no">01 — Business</p>
            <h2 id="biz-title">事業紹介</h2>
          </div>
          <div className="prose">
            <p>
              ARA COMPANYは、Web・AI事業ブランド「{solutions.name}」として、店舗や中小事業者のWeb活用をお手伝いしています。
            </p>
            <p>
              ホームページやLPの制作、Web広告のご相談、LINE公式アカウントを使った予約の仕組みづくり、NFCタグを使った店頭での案内まで。お客様に見つけてもらい、問い合わせや予約につながるまでの流れを、事業の規模に合わせて整えます。
            </p>
            {solutions.url && (
              <p>
                <a className="text-link" href={solutions.url} target="_blank" rel="noopener noreferrer">
                  {solutions.name}のサイトを見る<span className="sr-only">（新しいタブで開きます）</span> <span aria-hidden="true">↗</span>
                </a>
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="section alt" aria-labelledby="svc-title">
        <div className="wrap">
          <div className="sec-head">
            <p className="no">02 — Services</p>
            <h2 id="svc-title">サービス一覧</h2>
            <p>目的に合わせて、5つのサービスをご用意しています。料金や内容は各サービスのページでご確認いただけます。</p>
          </div>
          <ServiceCards />
          <p style={{ marginTop: 28 }}><Link className="text-link" href="/services/">サービス一覧ページへ <span aria-hidden="true">→</span></Link></p>
        </div>
      </section>

      <section className="section" aria-labelledby="about-title">
        <div className="wrap split">
          <div className="sec-head">
            <p className="no">03 — About</p>
            <h2 id="about-title">ARA COMPANYについて</h2>
          </div>
          <div style={{ display: "grid", gap: 28 }}>
            <p className="purpose">{site.purpose}</p>
            <ol className="points">
              {approach.map((a, i) => (
                <li key={a.title}>
                  <span className="n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                  <div><h3>{a.title}</h3><p>{a.body}</p></div>
                </li>
              ))}
            </ol>
            <p><Link className="text-link" href="/about/">会社概要を見る <span aria-hidden="true">→</span></Link></p>
          </div>
        </div>
      </section>

      <CtaBand />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }} />
    </>
  );
}
