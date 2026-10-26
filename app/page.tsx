import ContactForm from "./components/ContactForm";
import Enso from "./components/Enso";
import { businesses, SLOT_COUNT } from "./businesses";

const steps = [
  { n: "一", title: "ヒアリング", body: "現状と目指す姿をうかがい、課題を整理します。初回のご相談は無料です。" },
  { n: "二", title: "設計・ご提案", body: "AI・ブランド・支援のどれを、どの順で使うかを組み立ててご提案します。" },
  { n: "三", title: "実行", body: "ツール開発、デザイン制作、施策の実行まで、手を動かして形にします。" },
  { n: "四", title: "伴走・改善", body: "数字を見ながら改善を続け、自走できる状態になるまで支えます。" },
];

const mission = [
  { big: "速", k: "AI", v: "速くする。", d: "手作業や判断の繰り返しをAIに任せ、人が考えるべきことに時間を戻します。" },
  { big: "伝", k: "BRAND", v: "伝わるようにする。", d: "名前、ロゴ、言葉、Webまで。選ばれる理由を、見える形に整えます。" },
  { big: "続", k: "SUPPORT", v: "続けられるようにする。", d: "立ち上げから運営まで伴走し、事業が自分たちの力で回る状態をつくります。" },
];

const profile: { label: string; value: string | null }[] = [
  { label: "会社名", value: "ARA COMPANY" },
  { label: "代表者", value: null },
  { label: "設立", value: null },
  { label: "所在地", value: null },
];

export default function Home() {
  const openSlots = Math.max(SLOT_COUNT - businesses.length, 1);
  const year = new Date().getFullYear();

  return (
    <>
      <header className="site band">
        <div className="wrap">
          <a className="logo" href="#top"><span className="seal">ARA</span><b>ARA COMPANY</b></a>
          <nav className="main" aria-label="メインメニュー">
            <a href="#mission">私たちについて</a>
            <a href="#business">事業</a>
            <a href="#process">進め方</a>
            <a href="#company">会社概要</a>
            <a className="cta-link" href="#contact">お問い合わせ</a>
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="hero band">
          <div className="wrap">
            <h1 className="catch">事業は、<br />ひとつで終わらない。</h1>
            <div className="enso-wrap">
              <Enso className="enso" />
              <div className="enso-name">
                <span className="ara">ARA</span>
                <span className="co">COMPANY</span>
              </div>
              <span className="seal" aria-hidden="true">新</span>
            </div>
            <div className="hero-side">
              <span className="label">AI · Brand · Support</span>
              <p>ARA COMPANYは、AI・ブランド・事業支援の3つの事業から始まる会社です。それぞれの現場で得た知見をつなぎ合わせ、これからも新しい事業を立ち上げていきます。</p>
              <a className="btn" href="#business">事業を見る <span aria-hidden="true">→</span></a>
            </div>
          </div>
        </section>

        <div className="portfolio band">
          <div className="wrap">
            <ul className="marks" aria-label="事業ポートフォリオ">
              {businesses.map((b) => (
                <li key={b.id}>
                  <a className="mark" href={`#${b.id}`}>
                    <span className="seal">{b.kanji}</span>
                    <small>{b.name}</small>
                  </a>
                </li>
              ))}
              {Array.from({ length: openSlots }, (_, i) => (
                <li key={i} className="mark open">
                  <span className="slot">{i === 0 ? "新" : ""}</span>
                  <small>{i === 0 ? "NEXT" : "—"}</small>
                </li>
              ))}
            </ul>
            <span className="label">{year} · {businesses.length}事業 稼働中 / {openSlots}枠 準備中</span>
          </div>
        </div>

        <section className="block band" id="mission">
          <div className="wrap">
            <div className="sec-head">
              <span className="label">Mission</span>
              <div>
                <h2>速くして、伝わるようにして、続けられるようにする。</h2>
                <p className="lead">事業がうまくいかない理由は、たいてい3つのどれかです。時間が足りない。魅力が伝わっていない。続ける体制がない。ARA COMPANYの3つの事業は、この3つの課題にそれぞれ向き合うためにあります。</p>
              </div>
            </div>
            <div className="mission-grid">
              {mission.map((m) => (
                <div key={m.k} className="mcol">
                  <span className="big" aria-hidden="true">{m.big}</span>
                  <span className="k">{m.k}</span>
                  <span className="v">{m.v}</span>
                  <p className="d">{m.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="block band" id="business">
          <div className="wrap">
            <div className="sec-head">
              <span className="label">Business</span>
              <div>
                <h2>事業内容</h2>
                <p className="lead">単独でも、組み合わせても。課題に合わせて必要な事業を組み合わせてご提案します。</p>
              </div>
            </div>

            <div className="units">
              {businesses.map((b) => (
                <article key={b.id} className="unit" id={b.id}>
                  <span className="glyph" aria-hidden="true">{b.kanji}</span>
                  <div className="head">
                    <div className="name"><h3>{b.title}</h3><span className="label">{b.code} {b.name}</span></div>
                    <p>{b.description}</p>
                  </div>
                  <ul>
                    {b.services.map((s) => (
                      <li key={s.label}><span>{s.label}</span><span>{s.tag}</span></li>
                    ))}
                  </ul>
                </article>
              ))}
              <article className="unit next">
                <span className="glyph" aria-hidden="true">新</span>
                <div className="head">
                  <div className="name"><h3>次の事業へ</h3><span className="label">NEXT</span></div>
                  <p>3つの事業で生まれた知見とつながりから、新しい事業を育てていきます。一緒に事業をつくりたい企業・個人の方からのご相談をお待ちしています。</p>
                </div>
                <a className="btn cta" href="#contact">協業について相談する <span aria-hidden="true">→</span></a>
              </article>
            </div>
          </div>
        </section>

        <section className="block band" id="process">
          <div className="wrap">
            <div className="sec-head">
              <span className="label">Process</span>
              <div>
                <h2>ご相談から伴走まで</h2>
                <p className="lead">どの事業でも、進め方は同じです。まず話を聞き、最後まで一緒に動きます。</p>
              </div>
            </div>
            <div className="steps">
              {steps.map((s) => (
                <div key={s.title} className="step">
                  <span className="n" aria-hidden="true">{s.n}</span><h3>{s.title}</h3><p>{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="block band" id="company">
          <div className="wrap">
            <div className="sec-head">
              <span className="label">Company</span>
              <div><h2>会社概要</h2></div>
            </div>
            <table className="profile">
              <tbody>
                {profile.map((row) => (
                  <tr key={row.label}>
                    <th scope="row">{row.label}</th>
                    <td>{row.value ?? <span className="tbd">記入予定</span>}</td>
                  </tr>
                ))}
                <tr>
                  <th scope="row">事業内容</th>
                  <td>{businesses.map((b) => <div key={b.id}>{b.title}</div>)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <section className="contact band" id="contact">
        <div className="wrap">
          <div>
            <h2>ご相談</h2>
            <p className="jp">まずは、お気軽にお声がけください。</p>
            <p className="note">AI・ブランド・事業支援のどれに当てはまるか分からなくても大丈夫です。内容を伺ったうえで、合う進め方をご提案します。</p>
          </div>
          <ContactForm />
        </div>
      </section>

      <footer className="site band">
        <div className="wrap">
          <span>© {year} ARA COMPANY</span>
          <span className="label">{businesses.map((b) => b.name).join(" · ")} · NEXT</span>
        </div>
      </footer>
    </>
  );
}
