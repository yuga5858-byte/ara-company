import ContactForm from "./components/ContactForm";
import { businesses, SLOT_COUNT } from "./businesses";

const steps = [
  { title: "ヒアリング", body: "現状と目指す姿をうかがい、課題を整理します。初回のご相談は無料です。" },
  { title: "設計・ご提案", body: "AI・ブランド・支援のどれを、どの順で使うかを組み立ててご提案します。" },
  { title: "実行", body: "ツール開発、デザイン制作、施策の実行まで、手を動かして形にします。" },
  { title: "伴走・改善", body: "数字を見ながら改善を続け、自走できる状態になるまで支えます。" },
];

const mission = [
  { k: "AI", v: "速くする。", d: "手作業や判断の繰り返しをAIに任せ、人が考えるべきことに時間を戻します。" },
  { k: "BRAND", v: "伝わるようにする。", d: "名前、ロゴ、言葉、Webまで。選ばれる理由を、見える形に整えます。" },
  { k: "SUPPORT", v: "続けられるようにする。", d: "立ち上げから運営まで伴走し、事業が自分たちの力で回る状態をつくります。" },
];

const profile: { label: string; value: string | null }[] = [
  { label: "会社名", value: "ARA COMPANY" },
  { label: "代表者", value: null },
  { label: "設立", value: null },
  { label: "所在地", value: null },
];

export default function Home() {
  const openSlots = Math.max(SLOT_COUNT - businesses.length, 1);
  const nextCode = `BU-${String(businesses.length + 1).padStart(2, "0")}`;

  return (
    <>
      <header className="site band">
        <div className="wrap">
          <a className="logo" href="#top">ARA<span>.</span>COMPANY</a>
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
            <div className="wordmark" aria-label="ARA COMPANY">
              <span className="ch">A</span><span className="ch">R</span><span className="ch">A</span>
              <small>COMPANY</small>
            </div>

            <div className="hero-copy">
              <h1>事業は、<br />ひとつで終わらない。</h1>
              <p>ARA COMPANYは、AI・ブランド・事業支援の3つの事業から始まる会社です。それぞれの現場で得た知見をつなぎ合わせ、これからも新しい事業を立ち上げていきます。</p>
            </div>

            <div>
              <div className="slots" role="list" aria-label="事業ポートフォリオ">
                {businesses.map((b) => (
                  <a key={b.id} className="slot on" role="listitem" href={`#${b.id}`}>
                    <span className="no">{b.code}</span><span className="nm">{b.name}</span><span className="jp">{b.short}</span>
                  </a>
                ))}
                {Array.from({ length: openSlots }, (_, i) => (
                  <div key={i} className="slot open" role="listitem">
                    <span className="no">BU-{String(businesses.length + i + 1).padStart(2, "0")}</span>
                    {i === 0 && <span className="dot" aria-hidden="true" />}
                    <span className="nm">{i === 0 ? "NEXT" : "—"}</span>
                  </div>
                ))}
              </div>
              <div className="slots-note">
                <span className="label">Business portfolio / {new Date().getFullYear()}</span>
                <span className="label">{businesses.length} active · {openSlots} open</span>
              </div>
            </div>
          </div>
        </section>

        <section className="block band" id="mission">
          <div className="wrap">
            <div className="sec-head">
              <span className="label">Mission</span>
              <div>
                <h2>速くして、伝わるようにして、<br />続けられるようにする。</h2>
                <p className="lead">事業がうまくいかない理由は、たいてい3つのどれかです。時間が足りない。魅力が伝わっていない。続ける体制がない。ARA COMPANYの3つの事業は、この3つの課題にそれぞれ向き合うためにあります。</p>
              </div>
            </div>
            <div className="mission-lines">
              {mission.map((m) => (
                <div key={m.k} className="mline"><span className="k">{m.k}</span><span className="v">{m.v}</span><span className="d">{m.d}</span></div>
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
                  <div className="unit-top"><h3>{b.name}</h3><span className="label">{b.code}</span></div>
                  <div className="sub">{b.title}</div>
                  <p>{b.description}</p>
                  <ul>
                    {b.services.map((s) => (
                      <li key={s.label}><span>{s.label}</span><span>{s.tag}</span></li>
                    ))}
                  </ul>
                </article>
              ))}
              <article className="unit next">
                <div className="unit-top"><h3>NEXT</h3><span className="label">{nextCode} —</span></div>
                <div className="sub">次の事業へ</div>
                <p>3つの事業で生まれた知見とつながりから、新しい事業を育てていきます。一緒に事業をつくりたい企業・個人の方からのご相談をお待ちしています。</p>
                <a className="btn" href="#contact">協業について相談する <span aria-hidden="true">→</span></a>
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
              {steps.map((s, i) => (
                <div key={s.title} className="step">
                  <span className="n">STEP {String(i + 1).padStart(2, "0")}</span><h3>{s.title}</h3><p>{s.body}</p>
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
                    <td>{row.value ?? <span className="tbd">[ 記入予定 ]</span>}</td>
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
            <h2>LET&apos;S<br />BUILD.</h2>
            <p className="jp">まずは、お気軽にご相談ください。</p>
            <p className="note">AI・ブランド・事業支援のどれに当てはまるか分からなくても大丈夫です。内容を伺ったうえで、合う進め方をご提案します。</p>
          </div>
          <ContactForm />
        </div>
      </section>

      <footer className="site band">
        <div className="wrap">
          <span>© {new Date().getFullYear()} ARA COMPANY</span>
          <span className="label">{businesses.map((b) => b.name).join(" · ")} · NEXT</span>
        </div>
      </footer>
    </>
  );
}
