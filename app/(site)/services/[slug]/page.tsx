import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services, serviceBySlug, servicePath, type Service } from "../../../services";
import PageHead from "../../../components/site/PageHead";
import CtaBand from "../../../components/site/CtaBand";

// 5つのサービス詳細。すべて同じ8つのブロックで表示する（内容は app/services.ts）。
export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = serviceBySlug(slug);
  if (!s) return {};
  return {
    title: s.seo.title,
    description: s.seo.description,
    alternates: { canonical: servicePath(s.slug) },
    openGraph: { title: `${s.seo.title}｜ARA COMPANY`, description: s.seo.description, url: servicePath(s.slug) },
  };
}

const sections = [
  { id: "worries", label: "お悩み" },
  { id: "offerings", label: "提供内容" },
  { id: "merits", label: "メリット" },
  { id: "pricing", label: "料金・プラン" },
  { id: "flow", label: "導入の流れ" },
  { id: "faq", label: "よくある質問" },
];

function tagClass(tag: string) {
  if (tag.includes("LINE")) return "tag tag-line";
  if (tag.includes("外部")) return "tag tag-ext";
  return "tag";
}

function Plans({ s }: { s: Service }) {
  return (
    <>
      <div className="plans">
        {s.plans.map((p) => (
          <article key={p.name} className={`plan${p.featured && s.plans.length > 1 ? " featured" : ""}`} aria-labelledby={`plan-${p.name}`}>
            {p.featured && s.plans.length > 1 && <span className="featured-label">おすすめ</span>}
            {p.sub && <p className="plan-sub">{p.sub}</p>}
            <h3 id={`plan-${p.name}`}>{p.name}</h3>
            <p className="price">
              <b>{p.price}</b>{p.tax && <small>{p.tax}</small>}
              {p.campaign && <span className="campaign">{p.campaign}</span>}
            </p>
            <ul>{p.items.map((it) => <li key={it}>{it}</li>)}</ul>
            {p.forWhom && <p className="for"><small>こんな方におすすめ</small>{p.forWhom}</p>}
            {p.note && <p className="plan-note">※ {p.note}</p>}
          </article>
        ))}
      </div>
      <ul className="price-notes">{s.priceNotes.map((n) => <li key={n}>{n}</li>)}</ul>
      {s.payment && (
        <>
          <h3 style={{ marginTop: 36, fontSize: "1rem" }}>お支払い</h3>
          <ol className="payment">
            {s.payment.map((p) => <li key={p.when}><small>{p.when}</small>{p.amount}</li>)}
          </ol>
        </>
      )}
    </>
  );
}

export default async function ServiceDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = serviceBySlug(slug);
  if (!s) notFound();

  const others = services.filter((x) => x.slug !== s.slug);
  const hasTags = s.offerings.some((o) => o.tag);
  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.name,
    description: s.summary,
    provider: { "@type": "Organization", name: "ARA COMPANY", url: "https://ara-company.jp/" },
    areaServed: "JP",
  };
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: s.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <>
      {/* 1. サービス名と概要 */}
      <PageHead
        crumbs={[{ name: "サービス", href: "/services/" }, { name: s.name, href: servicePath(s.slug) }]}
        eyebrow={s.en}
        title={s.name}
        lead={s.summary}
      >
        <div style={{ marginTop: 24, display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
          {s.status && <span className="badge">{s.status}</span>}
          <span className="badge badge-soft">料金の目安：{s.priceHint}</span>
        </div>
        <div className="actions" style={{ marginTop: 28 }}>
          <Link className="btn" href={`/contact/?topic=${s.slug}`}>このサービスについて相談する <span className="arrow" aria-hidden="true">→</span></Link>
          <a className="btn btn-line" href="#pricing">料金を見る</a>
        </div>
        <nav aria-label="このページの目次" style={{ marginTop: 32 }}>
          <ul className="sub-nav">
            {sections.map((x) => <li key={x.id}><a href={`#${x.id}`}>{x.label}</a></li>)}
          </ul>
        </nav>
      </PageHead>

      {/* 2. こんなお悩みはありませんか？ */}
      <section className="section" id="worries" aria-labelledby="h-worries">
        <div className="wrap">
          <div className="sec-head"><p className="no">01</p><h2 id="h-worries">こんなお悩みはありませんか？</h2><p>{s.catch}</p></div>
          <ul className="worries">{s.worries.map((w) => <li key={w}>{w}</li>)}</ul>
        </div>
      </section>

      {/* 3. 提供できる内容 */}
      <section className="section alt" id="offerings" aria-labelledby="h-offerings">
        <div className="wrap">
          <div className="sec-head"><p className="no">02</p><h2 id="h-offerings">提供できる内容</h2></div>
          {hasTags && (
            <p className="help" style={{ marginBottom: 18, display: "flex", flexWrap: "wrap", gap: "8px 16px", alignItems: "center" }}>
              <span><span className="tag">設定・作業</span> 当事業が行う設定・確認</span>
              <span><span className="tag tag-line">LINE標準機能</span> LINE公式アカウントにもともとある機能</span>
              <span><span className="tag tag-ext">外部システム連携</span> LINEの外の予約フォーム・予約システムを使う部分</span>
            </p>
          )}
          <ul className="offer">
            {s.offerings.map((o) => (
              <li key={o.title}>
                <h3>{o.title}{o.tag && <span className={tagClass(o.tag)}>{o.tag}</span>}</h3>
                <p>{o.body}</p>
              </li>
            ))}
          </ul>
          {s.offeringsNote && <p className="note">※ {s.offeringsNote}</p>}
          {(s.slug === "website" || s.slug === "lp") && (
            <p className="note">
              制作の雰囲気は、<Link className="text-link" href="/demo/">制作デモ（架空の店舗を想定した見本）</Link>でご覧いただけます。
            </p>
          )}
        </div>
      </section>

      {/* 4. 導入メリット */}
      <section className="section" id="merits" aria-labelledby="h-merits">
        <div className="wrap">
          <div className="sec-head"><p className="no">03</p><h2 id="h-merits">導入メリット</h2></div>
          <ul className="merits">{s.merits.map((m) => <li key={m.title}><h3>{m.title}</h3><p>{m.body}</p></li>)}</ul>
        </div>
      </section>

      {/* 5. 料金・プラン */}
      <section className="section alt" id="pricing" aria-labelledby="h-pricing">
        <div className="wrap">
          <div className="sec-head"><p className="no">04</p><h2 id="h-pricing">料金・プラン</h2>{s.plans.every((p) => p.price === "お見積もり") && <p>店舗・事業の状況を伺い、必要な内容に合わせて個別にお見積もりします。</p>}</div>
          <Plans s={s} />
          {s.slug === "nfc-line" && (
            <p className="note">
              <Link className="text-link" href={servicePath("line-reservation")}>LINE予約システム（NFCタグなしの単独導入）を見る <span aria-hidden="true">→</span></Link>
            </p>
          )}
          {s.slug === "line-reservation" && (
            <p className="note">
              <Link className="text-link" href={servicePath("nfc-line")}>NFCタグとあわせて導入する場合（NFC × LINE導入支援）を見る <span aria-hidden="true">→</span></Link>
            </p>
          )}
        </div>
      </section>

      {/* 6. 導入までの流れ */}
      <section className="section" id="flow" aria-labelledby="h-flow">
        <div className="wrap">
          <div className="sec-head"><p className="no">05</p><h2 id="h-flow">導入までの流れ</h2></div>
          <ol className="flow">{s.flow.map((f) => <li key={f.title}><h3>{f.title}</h3><p>{f.body}</p></li>)}</ol>
        </div>
      </section>

      {/* 7. よくある質問 */}
      <section className="section" id="faq" aria-labelledby="h-faq">
        <div className="wrap-narrow">
          <div className="sec-head"><p className="no">06</p><h2 id="h-faq">よくある質問</h2></div>
          <div className="faq">
            {s.faqs.map((f) => (
              <details key={f.q}>
                <summary><span className="q">{f.q}</span></summary>
                <p className="a">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt" aria-labelledby="h-others">
        <div className="wrap">
          <div className="sec-head"><h2 id="h-others">ほかのサービス</h2></div>
          <ul className="other-services">
            {others.map((o) => <li key={o.slug}><Link href={servicePath(o.slug)}>{o.name}<span aria-hidden="true">→</span></Link></li>)}
          </ul>
        </div>
      </section>

      {/* 8. お問い合わせ */}
      <CtaBand
        title={`${s.name}のご相談`}
        lead="内容が固まっていなくても大丈夫です。業種と、困っていること・やりたいことをメールでお送りください。"
        topic={s.slug}
        label="このサービスについて相談する"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
    </>
  );
}
