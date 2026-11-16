// ARA COMPANY 公式サイトの共有部品と文章（2026-11 にトップ1ページから各ページへ分けたもの。文章は一字一句そのまま）。
import ContactForm from "../../components/ContactForm";
import CopyEmail from "../../components/CopyEmail";
import MailButton from "../../components/MailButton";
import SiteNav from "../../components/SiteNav";
import Enso from "../../components/Enso";
import Water from "../../components/Water";
import ScrollFx from "../../components/ScrollFx";
import { businesses, statusLabel, isLead } from "../../businesses";
import { site, solutions, contactEnabled, formEnabled, mailtoHref, gmailHref, profileRows } from "../../site";
import type { Business } from "../../businesses";
import { services, PRICE_NOTE, flow, demos } from "../../services";

export const PURPOSE_JA = "挑戦するすべての人に、次の可能性を。";
export const PURPOSE_EN = "Creating possibilities beyond limits.";
// ブランドメッセージ（トップのキャッチコピー）
export const MESSAGE_EN = "Create the next scenery.";

export const mission = [
  { big: "信", k: "FASHION", v: "ファッションを通じて自信を", },
  { big: "選", k: "TECHNOLOGY", v: "テクノロジーを通じて新しい選択肢を" },
  { big: "場", k: "BUSINESS", v: "事業を通じて仕事や居場所を" },
];

export const values = [
  { no: "01", en: "CHALLENGE", ja: "挑戦", body: "失敗を恐れず、新しい可能性を追求する。" },
  { no: "02", en: "RESILIENCE", ja: "再起", body: "立ち止まることを恐れず、何度でも前に進む。" },
  { no: "03", en: "CONNECTION", ja: "つながり", body: "人と人とのつながりを大切にし、ともに成長する。" },
  { no: "04", en: "CREATION", ja: "創造", body: "既存の常識にとらわれず、新しい価値を生み出す。" },
  { no: "05", en: "IMPACT", ja: "社会への還元", body: "事業の成長を、自分たちだけでなく誰かの可能性につなげる。" },
];

// OUR STORY は本文のまま掲載する。quote: true の段落は引用として強調する。
export const story: { text: string; quote?: boolean }[] = [
  { text: "私は幼い頃からサッカーに打ち込み、プロサッカー選手になることを目標に挑戦を続けてきました。" },
  { text: "しかし、大学進学後、度重なる大きな怪我や手術を経験し、思うように競技ができない時間を過ごしました。" },
  { text: "周囲の仲間が試合で活躍する一方、自分はリハビリを繰り返す日々。これまで積み重ねてきた努力や、自分の将来に対して不安を感じることもありました。" },
  { text: "それでも、家族や仲間の支えがあり、もう一度前を向くことができました。" },
  { text: "この経験から強く感じたことがあります。" },
  { text: "「人は、能力や努力だけで挑戦を続けられるわけではない。支えてくれる人や環境があるからこそ、何度でも立ち上がれる。」", quote: true },
  { text: "そして、自分と同じように、怪我や挫折によって夢を諦めかけている人たちの力になりたいと考えるようになりました。" },
  { text: "ただ、誰かを支えるためには、想いだけでは足りません。経済的な力、仕事を生み出す力、そして人が集まる場所が必要です。" },
  { text: "だからこそ、自ら事業を生み出し、成長させ、その利益や仕組みを通じて人の挑戦を支えられる会社をつくりたい。" },
  { text: "その想いから生まれたのが、ARA COMPANYです。" },
  { text: "私たちは、ファッションをはじめとするさまざまな事業を通じて、人と人をつなぎ、新しい価値を生み出していきます。" },
  { text: "そしていつか、挑戦したいという気持ちを持つ人が、環境や困難によって可能性を閉ざされない社会を実現したいと考えています。" },
];

export const message = [
  "私はこれまで、サッカーを通じて挑戦することの喜びと、思うように進めないことの苦しさを経験してきました。",
  "大きな怪我によって何度も立ち止まり、将来への不安を感じたこともあります。",
  "それでも、周囲の人たちに支えられ、挑戦を続けることができました。",
  "この経験が、ARA COMPANYを立ち上げようと考えた原点です。",
  "私たちは、ファッションやテクノロジーをはじめ、さまざまな事業に挑戦していきます。",
  "まずは自分たちの手で価値を生み出し、事業を成長させる。そして、その成長を誰かの新しい可能性につなげていきたいと考えています。",
  "立ち止まることがあっても、そこで終わりではない。",
  "ARA COMPANYは、挑戦する人とともに成長し続ける会社を目指します。",
];

export const delay = (i: number) => ({ "--d": i }) as React.CSSProperties;

// 確認済みの情報だけを載せる（項目は app/site.ts で管理）。
export const profile = profileRows(
  businesses.filter((b) => b.brand).map((b) => `${b.brandName ?? b.name}（${statusLabel[b.status]}）`).join("、"),
  services.map((s) => s.title).join("、")
);

// 現在取り組んでいる事業と、将来構想を分けて表示する
export const currentBusinesses = businesses.filter(isLead);
export const futureBusinesses = businesses.filter((b) => !isLead(b));

// ARVR TECH への導線。公開URLが未設定の間はページ内のサービス紹介へ案内する。
export function SolutionsLink({ note = true }: { note?: boolean }) {
  if (solutions.url) {
    return (
      <a className="btn" href={solutions.url} target="_blank" rel="noopener noreferrer">
        ARVR TECH公式サイトを見る <span aria-hidden="true">↗</span><span className="sr-only">（新しいタブで開きます）</span>
      </a>
    );
  }
  return note ? <small className="note-sm">ARVR TECHの公式サイトは公開準備中です。</small> : null;
}

export function BusinessUnit({ b }: { b: Business }) {
  return (
    <article className={`unit${isLead(b) ? "" : " next"}`} id={b.id} data-reveal>
      <span className="glyph" aria-hidden="true" data-reveal="ink">{b.kanji}</span>
      <div className="head">
        <div className="name"><h3>{b.title}</h3><span className="label">{b.category}</span></div>
        {b.brandName && <p className="unit-brand">展開ブランド：<strong>{b.brandName}</strong></p>}
        <p>{b.description}</p>
      </div>
      <div className="unit-side">
        <span className={`status status-${b.status}`}>{statusLabel[b.status]}</span>
        {b.id === "ormoscia" &&
          (site.ormosciaUrl ? (
            <a className="btn" href={site.ormosciaUrl} target="_blank" rel="noopener noreferrer">ORMOSCIA公式サイトを見る <span aria-hidden="true">↗</span><span className="sr-only">（新しいタブで開きます）</span></a>
          ) : (
            <>
              {contactEnabled && <a className="btn" href="/contact/">ORMOSCIAへのお問い合わせ <span aria-hidden="true">→</span></a>}
              <small className="note-sm">ブランドサイトは準備中です。</small>
            </>
          ))}
        {b.brandName === solutions.name && (
          <>
            <SolutionsLink />
            <a className="text-link" href="/services/">サービス内容を見る <span aria-hidden="true">→</span></a>
          </>
        )}
        {b.link && (
          <a className="btn" href={b.link.href}>{b.link.label} <span aria-hidden="true">→</span></a>
        )}
      </div>
    </article>
  );
}
