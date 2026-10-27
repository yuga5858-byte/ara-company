import ContactForm from "./components/ContactForm";
import CopyEmail from "./components/CopyEmail";
import Enso from "./components/Enso";
import Water from "./components/Water";
import ScrollFx from "./components/ScrollFx";
import { businesses, statusLabel, isLead } from "./businesses";
import { site, contactEnabled, formEnabled, mailtoHref, profileRows } from "./site";

const PURPOSE_JA = "挑戦するすべての人に、次の可能性を。";
const PURPOSE_EN = "Creating possibilities beyond limits.";

const mission = [
  { big: "信", k: "FASHION", v: "ファッションを通じて自信を", },
  { big: "選", k: "TECHNOLOGY", v: "テクノロジーを通じて新しい選択肢を" },
  { big: "場", k: "BUSINESS", v: "事業を通じて仕事や居場所を" },
];

const values = [
  { no: "01", en: "CHALLENGE", ja: "挑戦", body: "失敗を恐れず、新しい可能性を追求する。" },
  { no: "02", en: "RESILIENCE", ja: "再起", body: "立ち止まることを恐れず、何度でも前に進む。" },
  { no: "03", en: "CONNECTION", ja: "つながり", body: "人と人とのつながりを大切にし、ともに成長する。" },
  { no: "04", en: "CREATION", ja: "創造", body: "既存の常識にとらわれず、新しい価値を生み出す。" },
  { no: "05", en: "IMPACT", ja: "社会への還元", body: "事業の成長を、自分たちだけでなく誰かの可能性につなげる。" },
];

// OUR STORY は本文のまま掲載する。quote: true の段落は引用として強調する。
const story: { text: string; quote?: boolean }[] = [
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

const message = [
  "私はこれまで、サッカーを通じて挑戦することの喜びと、思うように進めないことの苦しさを経験してきました。",
  "大きな怪我によって何度も立ち止まり、将来への不安を感じたこともあります。",
  "それでも、周囲の人たちに支えられ、挑戦を続けることができました。",
  "この経験が、ARA COMPANYを立ち上げようと考えた原点です。",
  "私たちは、ファッションやテクノロジーをはじめ、さまざまな事業に挑戦していきます。",
  "まずは自分たちの手で価値を生み出し、事業を成長させる。そして、その成長を誰かの新しい可能性につなげていきたいと考えています。",
  "立ち止まることがあっても、そこで終わりではない。",
  "ARA COMPANYは、挑戦する人とともに成長し続ける会社を目指します。",
];

const delay = (i: number) => ({ "--d": i }) as React.CSSProperties;

// 確認済みの情報だけを載せる（項目は app/site.ts で管理）。
const profile = profileRows(
  businesses.filter(isLead).map((b) => `${b.name}（${statusLabel[b.status]}）`).join("、")
);

export default function Home() {
  const year = new Date().getFullYear();

  return (
    <>
      <Water />
      <ScrollFx />
      <header className="site band">
        <div className="wrap">
          <a className="logo" href="#top"><span className="seal">ARA</span><b>ARA COMPANY</b></a>
          <nav className="main" aria-label="メインメニュー">
            <a href="#about">ABOUT</a>
            <a href="#philosophy">PHILOSOPHY</a>
            <a href="#business">BUSINESS</a>
            <a href="#story">OUR STORY</a>
            {contactEnabled && <a className="cta-link" href="#contact">CONTACT</a>}
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="hero band">
          <div className="wrap">
            <h1 className="catch">挑戦するすべての人に、<br />次の可能性を。</h1>
            <div className="enso-wrap">
              <Enso className="enso" />
              <div className="enso-name">
                <span className="ara">ARA</span>
                <span className="co">COMPANY</span>
              </div>
              <span className="seal" aria-hidden="true">挑</span>
            </div>
            <div className="hero-side">
              <span className="label">Our Purpose</span>
              <p className="en-purpose">{PURPOSE_EN}</p>
              <p>ARA COMPANYは、ファッションを起点に、挑戦する人を支える事業づくりを目指しています。現在は{site.base}を拠点に、事業立ち上げの準備を進めています。</p>
              <a className="btn" href="#story">OUR STORY <span aria-hidden="true">→</span></a>
            </div>
          </div>
        </section>

        <div className="portfolio band">
          <div className="wrap">
            <ul className="marks" aria-label="事業構想">
              {businesses.map((b) => (
                <li key={b.id}>
                  <a className={`mark${isLead(b) ? "" : " open"}`} href={`#${b.id}`}>
                    {isLead(b) ? <span className="seal">{b.kanji}</span> : <span className="slot">{b.kanji}</span>}
                    <small>{b.name}</small>
                    <small className="state">{statusLabel[b.status]}</small>
                  </a>
                </li>
              ))}
            </ul>
            <span className="label">{site.base}を拠点に準備中</span>
          </div>
        </div>

        <section className="block band" id="about">
          <div className="wrap">
            <div className="sec-head" data-reveal>
              <span className="label">About</span>
              <div>
                <h2>ファッションを起点に、<br />挑戦を支える事業を。</h2>
                <p className="lead">ARA COMPANYは、{site.base}を拠点に事業の立ち上げを準備しています。最初の取り組みは、ファッションブランド「ORMOSCIA」の立ち上げです。自ら事業を生み出し、成長させ、その利益や仕組みを通じて人の挑戦を支えることを目指しています。</p>
              </div>
            </div>
            <table className="profile" data-reveal>
              <tbody>
                {profile.map((row) => (
                  <tr key={row.label}>
                    <th scope="row">{row.label}</th>
                    <td>{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="block band" id="philosophy">
          <div className="wrap">
            <div className="sec-head" data-reveal>
              <span className="label">Philosophy</span>
              <div><h2>企業理念</h2></div>
            </div>

            <div className="purpose" data-reveal="ink">
              <span className="label">Our Purpose｜経営理念</span>
              <p className="purpose-ja">{PURPOSE_JA}</p>
              <p className="purpose-en">{PURPOSE_EN}</p>
            </div>

            <div className="philo">
              <div className="philo-head" data-reveal>
                <span className="label">Mission｜使命</span>
                <h3>人の可能性を広げ、<br />挑戦を続けられる環境をつくる。</h3>
                <p>商品やサービスを販売するだけでなく、人の生活や価値観に良い変化を生み出す。</p>
              </div>
              <div className="mission-grid">
                {mission.map((m, i) => (
                  <div key={m.k} className="mcol" data-reveal style={delay(i)}>
                    <span className="big" aria-hidden="true">{m.big}</span>
                    <span className="k">{m.k}</span>
                    <span className="v">{m.v}</span>
                  </div>
                ))}
              </div>
              <p className="mission-tail" data-reveal>ファッションを通じて自信を、テクノロジーを通じて新しい選択肢を、事業を通じて仕事や居場所を生み出していく。</p>
            </div>

            <div className="philo">
              <div className="philo-head" data-reveal>
                <span className="label">Vision｜目指す未来</span>
                <h3>挑戦する人が、<br />何度でも前を向ける社会へ。</h3>
              </div>
              <div className="prose" data-reveal>
                <p>ARA COMPANYは、複数の事業を持つ企業へと成長することを目指します。</p>
                <p>その先にあるのは、競技を続けたいアスリートや、夢に向かって努力する人が、経済面・仕事・情報・人とのつながりなど、さまざまな面で支えを得られる環境です。</p>
              </div>
            </div>

            <div className="philo">
              <div className="philo-head" data-reveal>
                <span className="label">Values｜5つの価値観</span>
              </div>
              <ol className="values">
                {values.map((v, i) => (
                  <li key={v.no} data-reveal style={delay(i)}>
                    <span className="no">{v.no}</span>
                    <div>
                      <span className="en">{v.en}</span>
                      <h4>{v.ja}</h4>
                    </div>
                    <p>{v.body}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="block band" id="business">
          <div className="wrap">
            <div className="sec-head" data-reveal>
              <span className="label">Business</span>
              <div>
                <h2>事業構想</h2>
                <p className="lead">現在は、ファッションブランド「ORMOSCIA」の立ち上げを準備しています。そのほかの事業は構想段階・将来構想であり、一つずつ形にしていきます。</p>
              </div>
            </div>

            <div className="units">
              {businesses.map((b) => (
                <article key={b.id} className={`unit${isLead(b) ? "" : " next"}`} id={b.id} data-reveal>
                  <span className="glyph" aria-hidden="true" data-reveal="ink">{b.kanji}</span>
                  <div className="head">
                    <div className="name"><h3>{b.title}</h3><span className="label">{b.category}</span></div>
                    <p>{b.description}</p>
                  </div>
                  <div className="unit-side">
                    <span className={`status status-${b.status}`}>{statusLabel[b.status]}</span>
                    {b.id === "ormoscia" &&
                      (site.ormosciaUrl ? (
                        <a className="btn" href={site.ormosciaUrl} target="_blank" rel="noopener noreferrer">ORMOSCIA公式サイト <span aria-hidden="true">→</span></a>
                      ) : (
                        <>
                          {contactEnabled && <a className="btn" href="#contact">ORMOSCIAへのお問い合わせ <span aria-hidden="true">→</span></a>}
                          <small className="note-sm">ブランドサイトは準備中です。</small>
                        </>
                      ))}
                    {b.inquiry && contactEnabled && (
                      <a className="btn" href="#contact">{b.inquiry.label} <span aria-hidden="true">→</span></a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="block band" id="story">
          <div className="wrap">
            <div className="sec-head" data-reveal>
              <span className="label">Our Story</span>
              <div><h2>創業の原点</h2></div>
            </div>
            <div className="story">
              {story.map((s, i) =>
                s.quote ? <blockquote key={i} data-reveal="ink">{s.text}</blockquote> : <p key={i} data-reveal>{s.text}</p>
              )}
            </div>

            <div className="message" data-reveal>
              <div className="philo-head" data-reveal>
                <span className="label">Founder&apos;s Message｜代表メッセージ</span>
                <h3>{PURPOSE_JA}</h3>
              </div>
              <div className="prose">
                {message.map((m, i) => <p key={i}>{m}</p>)}
                <p className="sign">ARA COMPANY 代表</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {contactEnabled && (
      <section className="contact band" id="contact">
        <div className="wrap">
          <div data-reveal>
            <span className="label">Contact</span>
            <h2>お問い合わせ</h2>
            <p className="note">ORMOSCIA、AI・テクノロジーに関するお問い合わせ、協業のご相談、取材のご依頼などは、メールにてご連絡ください。</p>
            <ul className="topics" aria-label="お問い合わせの例">
              <li>ORMOSCIAについて</li>
              <li>AI・テクノロジーについて</li>
              <li>協業のご相談</li>
              <li>取材のご依頼</li>
            </ul>
          </div>
          <div className="contact-card" data-reveal>
            <span className="label">Email</span>
            <p className="mail-addr" id="contact-email">{site.email}</p>
            <div className="contact-actions">
              <a className="btn btn-mail" href={mailtoHref()}>メールでお問い合わせ <span aria-hidden="true">→</span></a>
              <CopyEmail email={site.email!} targetId="contact-email" />
            </div>
            <p className="note-sm">メールソフトが開かない場合は、アドレスをコピーしてお使いのメールからお送りください。</p>
            {formEnabled && <ContactForm />}
          </div>
        </div>
      </section>
      )}

      <footer className="site band">
        <div className="wrap">
          <span>© {year} ARA COMPANY</span>
          <span className="label">{PURPOSE_EN}</span>
        </div>
      </footer>
    </>
  );
}
