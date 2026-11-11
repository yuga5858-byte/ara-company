import CopyEmail from "../components/CopyEmail";
import MailButton from "../components/MailButton";
import ContactForm from "../components/ContactForm";
import SiteNav from "../components/SiteNav";
import ScrollFx from "../components/ScrollFx";
import InkField from "../components/InkField";
import BrushEnso from "../components/BrushEnso";
import { businesses, statusLabel, isLead } from "../businesses";
import type { Business } from "../businesses";
import { site, solutions, contactEnabled, formEnabled, mailtoHref, gmailHref, profileRows } from "../site";
import { services, PRICE_NOTE, flow, demos } from "../services";
import { PURPOSE_JA, PURPOSE_EN, mission, values, story, message } from "./content";

// 2026-11 リニューアル「静けさの中に、強さを宿す。」
// 墨黒を基調に、生成りの面を「間」として差し込む。朱は印・ボタン・小さなアクセントだけに使う。
// 文章は app/(site)/content.ts（旧サイトから一字一句そのまま）と app/site.ts・businesses.ts・services.ts から読む。

const CATCH = "挑戦が、次の景色をつくる。";
const CATCH_EN = "CREATE THE NEXT SCENERY.";

const d = (i: number) => ({ "--d": i }) as React.CSSProperties;

const profile = profileRows(
  businesses.filter((b) => b.brand).map((b) => `${b.brandName ?? b.name}（${statusLabel[b.status]}）`).join("、"),
  services.map((s) => s.title).join("、")
);
const currentBusinesses = businesses.filter(isLead);
const futureBusinesses = businesses.filter((b) => !isLead(b));

const ExternalMark = () => (
  <>
    <span aria-hidden="true"> ↗</span>
    <span className="sr-only">（新しいタブで開きます）</span>
  </>
);

function SectionHead({ no, en, title, lead, tone = "dark" }: { no: string; en: string; title: React.ReactNode; lead?: React.ReactNode; tone?: "dark" | "light" }) {
  return (
    <header className={`sec-head sec-head-${tone}`}>
      <p className="sec-index" data-reveal>
        <span className="sec-no">{no}</span>
        <span className="sec-rule" aria-hidden="true" />
        <span className="sec-en">{en}</span>
      </p>
      <h2 className="sec-title" data-reveal style={d(1)}>{title}</h2>
      {lead && <p className="sec-lead" data-reveal style={d(2)}>{lead}</p>}
    </header>
  );
}

function BusinessCard({ b, i }: { b: Business; i: number }) {
  const lead = isLead(b);
  return (
    <article className={`biz${lead ? " biz-now" : " biz-future"}`} id={b.id} data-reveal style={d(i)}>
      <span className="biz-glyph" aria-hidden="true">{b.kanji}</span>
      <div className="biz-top">
        <p className="biz-cat">{b.category}</p>
        <span className={`biz-status${lead ? " is-now" : ""}`}>
          {lead && <span className="biz-seal" aria-hidden="true" />}
          {statusLabel[b.status]}
        </span>
      </div>
      <h3 className="biz-name">{b.id === "ormoscia" ? "ORMOSCIA" : b.brandName ?? b.title}</h3>
      {b.id !== "ormoscia" && (b.brandName ? <p className="biz-sub">{b.title}</p> : <p className="biz-sub">{b.name}</p>)}
      <p className="biz-desc">{b.description}</p>
      <div className="biz-actions">
        {b.id === "ormoscia" && site.ormosciaUrl && (
          <a className="btn btn-line" href={site.ormosciaUrl} target="_blank" rel="noopener noreferrer">ORMOSCIA 公式サイト<ExternalMark /></a>
        )}
        {b.brandName === solutions.name && (
          <>
            {solutions.url && <a className="btn btn-line" href={solutions.url} target="_blank" rel="noopener noreferrer">ARVR TECH 公式サイト<ExternalMark /></a>}
            <a className="text-link" href="#services">サービス内容を見る <span aria-hidden="true">→</span></a>
          </>
        )}
      </div>
    </article>
  );
}

export default function Home() {
  const year = new Date().getFullYear();
  const navLinks = [
    { href: "#about", label: "ABOUT", ja: "私たちについて" },
    { href: "#philosophy", label: "PHILOSOPHY", ja: "企業理念" },
    { href: "#business", label: "BUSINESS", ja: "事業" },
    { href: "#services", label: "SERVICES", ja: "Web制作・AI導入" },
    { href: "#story", label: "OUR STORY", ja: "創業の原点" },
    ...(contactEnabled ? [{ href: "#contact", label: "CONTACT", ja: "お問い合わせ" }] : []),
  ];

  return (
    <>
      <ScrollFx />
      <a className="skip" href="#about">本文へ移動</a>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="ARA COMPANY トップへ">
          <img className="brand-mark" src="/brand/company-mark.webp" alt="" width={420} height={284} />
          <span className="brand-name">ARA COMPANY</span>
        </a>
        <SiteNav links={navLinks} />
      </header>

      <main id="top">
        {/* ---------- ファーストビュー ---------- */}
        <section className="hero" aria-labelledby="hero-title">
          <InkField className="hero-ink" />
          <div className="hero-light" aria-hidden="true" />
          <BrushEnso className="hero-enso" />
          <div className="hero-grid">
            <p className="hero-catch" lang="ja">
              {Array.from(CATCH).map((ch, i) => (
                <span key={i} style={d(i)} aria-hidden="true">{ch}</span>
              ))}
              <span className="sr-only">{CATCH}</span>
            </p>

            <div className="hero-center">
              <h1 id="hero-title" className="hero-logo">
                <img src="/brand/company-mark.webp" alt="ARA COMPANY" width={420} height={284} fetchPriority="high" />
              </h1>
              <p className="hero-word" aria-hidden="true">ARA COMPANY</p>
            </div>

            <p className="hero-en" lang="en">{CATCH_EN}</p>
          </div>
          <span className="hero-seal" aria-hidden="true">挑</span>
          <a className="hero-scroll" href="#about">
            <span>SCROLL TO EXPLORE</span>
            <span className="hero-scroll-line" aria-hidden="true" />
          </a>
        </section>

        {/* ---------- ABOUT（生成り） ---------- */}
        <section className="sec sec-light" id="about">
          <div className="wrap">
            <SectionHead
              no="01"
              en="ABOUT"
              tone="light"
              title={<>ファッションを起点に、<br />挑戦を支える事業を。</>}
              lead={<>ARA COMPANYは、{site.base}を拠点とする個人事業です。現在は、ファッションブランド「ORMOSCIA」の立ち上げ準備と、Webサイト制作・AI導入支援に取り組んでいます。自ら事業を生み出し、成長させ、その利益や仕組みを通じて人の挑戦を支えることを目指しています。</>}
            />
            <dl className="profile" data-reveal>
              {profile.map((row) => (
                <div key={row.label}>
                  <dt>{row.label}</dt>
                  <dd>{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ---------- PHILOSOPHY ---------- */}
        <section className="sec" id="philosophy">
          <div className="wrap">
            <SectionHead no="02" en="PHILOSOPHY" title="企業理念" />

            <div className="purpose" data-reveal>
              <p className="purpose-label">Our Purpose｜経営理念</p>
              <p className="purpose-ja">{PURPOSE_JA}</p>
              <p className="purpose-en" lang="en">{PURPOSE_EN}</p>
            </div>

            <div className="block">
              <div className="block-head" data-reveal>
                <p className="label">Mission｜使命</p>
                <h3>人の可能性を広げ、<br />挑戦を続けられる環境をつくる。</h3>
                <p>商品やサービスを販売するだけでなく、人の生活や価値観に良い変化を生み出す。</p>
              </div>
              <ul className="mission">
                {mission.map((m, i) => (
                  <li key={m.k} data-reveal style={d(i)}>
                    <span className="mission-big" aria-hidden="true">{m.big}</span>
                    <span className="mission-k">{m.k}</span>
                    <span className="mission-v">{m.v}</span>
                  </li>
                ))}
              </ul>
              <p className="block-tail" data-reveal>ファッションを通じて自信を、テクノロジーを通じて新しい選択肢を、事業を通じて仕事や居場所を生み出していく。</p>
            </div>

            <div className="block block-split">
              <div className="block-head" data-reveal>
                <p className="label">Vision｜目指す未来</p>
                <h3>挑戦する人が、<br />何度でも前を向ける社会へ。</h3>
              </div>
              <div className="prose" data-reveal style={d(1)}>
                <p>ARA COMPANYは、複数の事業を持つ企業へと成長することを目指します。</p>
                <p>その先にあるのは、競技を続けたいアスリートや、夢に向かって努力する人が、経済面・仕事・情報・人とのつながりなど、さまざまな面で支えを得られる環境です。</p>
              </div>
            </div>

            <div className="block">
              <div className="block-head" data-reveal>
                <h3 className="label">Values｜5つの価値観</h3>
              </div>
              <ol className="values">
                {values.map((v, i) => (
                  <li key={v.no} data-reveal style={d(i)}>
                    <span className="values-no">{v.no}</span>
                    <h4 className="values-ja">{v.ja}</h4>
                    <span className="values-en" lang="en">{v.en}</span>
                    <p>{v.body}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* ---------- BUSINESS ---------- */}
        <section className="sec sec-arch" id="business">
          <div className="wrap">
            <SectionHead
              no="03"
              en="BUSINESS"
              title="事業"
              lead="現在は、ファッションブランド「ORMOSCIA」の立ち上げを準備しながら、Web・AI事業ブランド「ARVR TECH」としてWeb制作・AI導入のご相談を受け付けています。そのほかの事業は将来構想であり、一つずつ形にしていきます。"
            />
            <h3 className="group-title" data-reveal><span lang="en">NOW</span>現在の取り組み</h3>
            <div className="biz-grid biz-grid-now">
              {currentBusinesses.map((b, i) => <BusinessCard key={b.id} b={b} i={i} />)}
            </div>
            <h3 className="group-title" data-reveal><span lang="en">FUTURE</span>将来構想</h3>
            <div className="biz-grid biz-grid-future">
              {futureBusinesses.map((b, i) => <BusinessCard key={b.id} b={b} i={i} />)}
            </div>
          </div>
        </section>

        {/* ---------- SERVICES（ARVR TECH） ---------- */}
        <section className="sec" id="services">
          <div className="wrap">
            <SectionHead
              no="04"
              en="SERVICES"
              title="Web制作・AI導入"
              lead="AI・テクノロジー事業として、Webサイトの制作から公開後の運用改善、AIの業務導入までご相談いただけます。"
            />
            <div className="arvr" data-reveal>
              <p className="label">{solutions.name}</p>
              <p className="arvr-rel">{solutions.relation}</p>
              <p>Web制作・Web運用改善・AIシステム導入支援は、{solutions.name}としてご相談を承っています。</p>
              {solutions.url && <a className="btn btn-line" href={solutions.url} target="_blank" rel="noopener noreferrer">ARVR TECH 公式サイトを見る<ExternalMark /></a>}
            </div>

            <div className="services">
              {services.map((sv, i) => (
                <article key={sv.id} className="service" data-reveal style={d(i)}>
                  <p className="label" lang="en">{sv.en}</p>
                  <h3>{sv.title}</h3>
                  <p className="service-price">
                    <span className="service-amount">{sv.price}</span>
                    {sv.priceNote && <span className="service-note">（{sv.priceNote}）</span>}
                  </p>
                  <p className="service-desc">{sv.description}</p>
                  <ul>{sv.items.map((it) => <li key={it}>{it}</li>)}</ul>
                  {contactEnabled && <a className="text-link" href={mailtoHref(sv.subject)}>メールで相談する <span aria-hidden="true">→</span></a>}
                </article>
              ))}
            </div>
            <p className="fine" data-reveal>※ {PRICE_NOTE}</p>

            <div className="block">
              <div className="block-head" data-reveal><h3 className="label">Flow｜ご相談の流れ</h3></div>
              <ol className="flow">
                {flow.map((f, i) => (
                  <li key={f.title} data-reveal style={d(i)}>
                    <span className="flow-no">{String(i + 1).padStart(2, "0")}</span>
                    <h4>{f.title}</h4>
                    <p>{f.body}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="block">
              <div className="block-head" data-reveal>
                <p className="label">Demo｜制作デモ</p>
                <h3>業種に合わせた、Webサイトの制作デモ。</h3>
                <p>架空の店舗を想定して制作したデモです。実在の店舗や制作実績ではありません。</p>
              </div>
              <ul className="demos">
                {demos.map((dm, i) => (
                  <li key={dm.href} data-reveal style={d(i)}>
                    <a className={`demo demo-${dm.variant}`} href={dm.href}>
                      <span className="demo-tag">DEMO</span>
                      <span className="demo-ind">{dm.industry}</span>
                      <span className="demo-name">{dm.name}</span>
                      <span className="demo-tone">{dm.tone}</span>
                      <span className="demo-go">デモを見る <span aria-hidden="true">→</span></span>
                    </a>
                  </li>
                ))}
              </ul>
              <p className="fine"><a className="text-link" href="/demo/">制作デモ一覧へ <span aria-hidden="true">→</span></a></p>
            </div>

            {contactEnabled && (
              <div className="services-cta" data-reveal>
                <p>制作内容が決まっていなくても大丈夫です。まずは現在の状況やご希望をお聞かせください。</p>
                <a className="btn" href={mailtoHref("Web制作のご相談")}>Web制作について相談する <span aria-hidden="true">→</span></a>
              </div>
            )}
          </div>
        </section>

        {/* ---------- OUR STORY（生成り） ---------- */}
        <section className="sec sec-light" id="story">
          <div className="wrap">
            <SectionHead no="05" en="OUR STORY" tone="light" title="創業の原点" />
            <div className="story">
              {story.map((s, i) =>
                s.quote ? (
                  <blockquote key={i} className="story-quote" data-reveal>{s.text}</blockquote>
                ) : (
                  <p key={i} data-reveal>{s.text}</p>
                )
              )}
            </div>

            <div className="message" data-reveal>
              <div className="message-head">
                <p className="label">Founder&apos;s Message｜代表メッセージ</p>
                <h3>{PURPOSE_JA}</h3>
              </div>
              <div className="prose">
                {message.map((m, i) => <p key={i}>{m}</p>)}
                <p className="sign">ARA COMPANY 代表</p>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- CONTACT ---------- */}
        {contactEnabled && (
          <section className="sec sec-contact" id="contact">
            <div className="wrap contact">
              <div>
                <SectionHead no="06" en="CONTACT" title="お問い合わせ" />
                <p className="contact-note" data-reveal>Web制作・AI導入のご相談、ORMOSCIAに関するお問い合わせ、協業のご相談、取材のご依頼などは、メールにてご連絡ください。</p>
                <ul className="topics" aria-label="お問い合わせの例" data-reveal>
                  <li>Web制作のご相談</li>
                  <li>AIシステム導入のご相談</li>
                  <li>ORMOSCIAについて</li>
                  <li>協業のご相談</li>
                  <li>取材のご依頼</li>
                </ul>
              </div>
              <div className="contact-card" data-reveal style={d(1)}>
                <p className="label" lang="en">Email</p>
                <p className="mail-addr" id="contact-email">{site.email}</p>
                <div className="contact-actions">
                  <MailButton className="btn" href={mailtoHref()} gmailHref={gmailHref()} />
                  <CopyEmail email={site.email!} targetId="contact-email" />
                </div>
                <p className="note-sm">メールアプリが開かない場合は、<a href={gmailHref()} target="_blank" rel="noopener noreferrer">Gmailで作成する</a>か、アドレスをコピーしてお使いのメールからお送りください。</p>
                {formEnabled && <ContactForm />}
              </div>
            </div>
          </section>
        )}
      </main>

      <footer className="site-footer">
        <div className="wrap footer-inner">
          <div className="footer-brand">
            <img src="/brand/company-mark.webp" alt="" width={420} height={284} loading="lazy" />
            <p lang="en">{CATCH_EN}</p>
          </div>
          <nav className="footer-links" aria-label="関連サイト">
            {site.ormosciaUrl && <a href={site.ormosciaUrl} target="_blank" rel="noopener noreferrer">ORMOSCIA（ファッション）<ExternalMark /></a>}
            {solutions.url && <a href={solutions.url} target="_blank" rel="noopener noreferrer">{solutions.name}（Web・AI事業）<ExternalMark /></a>}
          </nav>
          <small>© {year} ARA COMPANY</small>
        </div>
      </footer>
    </>
  );
}
