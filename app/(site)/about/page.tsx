import type { Metadata } from "next";
import { site, solutions, profileRows } from "../../site";
import PageHead from "../../components/site/PageHead";
import ServiceCards from "../../components/site/ServiceCards";
import CtaBand from "../../components/site/CtaBand";

export const metadata: Metadata = {
  title: "会社概要",
  description: "ARA COMPANYの事業概要。大阪府を拠点とする個人事業として、Web・AI事業ブランド「ARVR TECH」を運営しています。理念・事業への考え方・運営者情報。",
  alternates: { canonical: "/about/" },
};

const stance = [
  { title: "できることを、正直に伝える", body: "対応できる範囲・できない範囲と、かかる費用を最初にご説明します。架空の実績や、成果の保証はしません。" },
  { title: "使う人の目線でつくる", body: "見る人が迷わないこと、運営する人が続けやすいこと。どちらも大切にして設計します。" },
  { title: "小さく始めて、育てる", body: "まずは必要なところから。事業の成長に合わせて、仕組みを少しずつ広げていけるようにします。" },
];

export default function AboutPage() {
  return (
    <>
      <PageHead
        crumbs={[{ name: "会社概要", href: "/about/" }]}
        eyebrow="About"
        title="会社概要"
        lead={`${site.name}は、${site.base}を拠点とする個人事業です。Web・AI事業ブランド「${solutions.name}」として、店舗や中小事業者のWeb活用・LINE活用をお手伝いしています。`}
      />

      <section className="section" aria-labelledby="h-purpose">
        <div className="wrap split">
          <div className="sec-head"><p className="no">01 — Philosophy</p><h2 id="h-purpose">理念</h2></div>
          <div style={{ display: "grid", gap: 20 }}>
            <p className="purpose">{site.purpose}</p>
            <p className="prose">
              挑戦する事業者が、テクノロジーを味方にして次の一歩を踏み出せるように。Webサイトや予約の仕組みを、分かりやすく、無理のない形でご提供します。
            </p>
          </div>
        </div>
      </section>

      <section className="section alt" aria-labelledby="h-stance">
        <div className="wrap split">
          <div className="sec-head"><p className="no">02 — Approach</p><h2 id="h-stance">事業への考え方</h2></div>
          <ol className="points">
            {stance.map((a, i) => (
              <li key={a.title}>
                <span className="n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <div><h3>{a.title}</h3><p>{a.body}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" aria-labelledby="h-profile">
        <div className="wrap split">
          <div className="sec-head"><p className="no">03 — Profile</p><h2 id="h-profile">事業概要・運営者情報</h2></div>
          <dl className="profile">
            {profileRows().map((r) => (
              <div key={r.label}><dt>{r.label}</dt><dd>{r.value}</dd></div>
            ))}
            {solutions.url && (
              <div>
                <dt>関連サイト</dt>
                <dd><a className="text-link" href={solutions.url} target="_blank" rel="noopener noreferrer">{solutions.name}（{solutions.url.replace("https://", "")}）<span className="sr-only">（新しいタブで開きます）</span></a></dd>
              </div>
            )}
          </dl>
        </div>
      </section>

      <section className="section alt" aria-labelledby="h-services">
        <div className="wrap">
          <div className="sec-head"><p className="no">04 — Services</p><h2 id="h-services">提供しているサービス</h2></div>
          <ServiceCards />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
