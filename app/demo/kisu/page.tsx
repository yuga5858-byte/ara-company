import DemoBanner from "../_components/DemoBanner";
import DemoPhoto from "../_components/DemoPhoto";
import LineCta from "../_components/LineCta";
import ReserveForm from "../_components/ReserveForm";
import { solutions } from "../../site";
import { BRAND, BRAND_SUB, contactFields, demoMeta, faqs, menus, photos, promises, steps, workPhotos, works, worries } from "./data";
import s from "./kisu.module.css";

// 水まわり・外壁リフォームの相談 LP（制作デモ）。会社・料金・事例はすべて架空。
export const metadata = demoMeta("リフォーム相談 LP 制作デモ", "水まわりと外壁のリフォーム相談を、LINE の写真から受け付けるランディングページ");

export default function KisuLp() {
  return (
    <div className={`${s.theme} ${s.page}`}>
      <DemoBanner tone="light" />

      <header className={s.lpHeader}>
        <a className={s.logo} href="#top">{BRAND}<small>{BRAND_SUB}</small></a>
        <nav className={s.lpNav} aria-label="ページ内メニュー">
          <a href="#menu">料金の目安</a>
          <a href="#flow">相談の流れ</a>
          <a href="#works">施工事例</a>
          <a href="#faq">よくある質問</a>
        </nav>
        <a className={s.lpHeaderCta} href="#contact">見積もり相談</a>
      </header>

      <main id="top">
        <div className={s.wrap}>
          <section className={s.hero}>
            <div className={s.heroText}>
              <p className={s.eyebrow}>水まわり・外壁のリフォーム ／ 大阪府北部（架空）</p>
              <h1 className={s.h1}>写真を送るだけで、<br />リフォームの相談。</h1>
              <p className={s.lead}>キッチン・お風呂・外壁の「そろそろ」を、LINE で気軽に。代表が最後まで担当する、地域の小さな工務店です。</p>
              <div className={s.actions}>
                <LineCta label="LINE で写真を送って相談" note="写真を送ると、だいたいの金額が返ってきます。" />
                <a className={s.btnGhost} href="#menu">料金の目安を見る</a>
              </div>
            </div>
            <DemoPhoto photo={photos.hero} tone="light" className={s.heroPhoto} />
          </section>
        </div>

        <section className={`${s.section} ${s.sectionAlt}`}>
          <div className={s.wrap}>
            <p className={s.kicker}>WORRIES</p>
            <h2 className={s.h2}>こんなこと、ありませんか。</h2>
            <ul className={s.checks}>{worries.map((w) => <li key={w}>{w}</li>)}</ul>
          </div>
        </section>

        <section className={s.section} id="menu">
          <div className={s.wrap}>
            <p className={s.kicker}>PRICE</p>
            <h2 className={s.h2}>リフォームの料金の目安</h2>
            <div className={s.cards}>
              {menus.map((m) => (
                <article key={m.title} className={s.card}>
                  <h3>{m.title}</h3>
                  <p className={s.price}>{m.price}<small>税込</small></p>
                  <p>{m.body}</p>
                </article>
              ))}
            </div>
            <p className={s.note}>※ デモ用の架空の料金です。実際の金額は、現地調査のあとのお見積もりで決まります。</p>
          </div>
        </section>

        <section className={`${s.section} ${s.sectionAlt}`} id="flow">
          <div className={s.wrap}>
            <p className={s.kicker}>FLOW</p>
            <h2 className={s.h2}>ご相談から工事まで</h2>
            <ol className={s.steps}>
              {steps.map((st) => (
                <li key={st.title}>
                  {st.line && <span className={s.stepTag}>LINE</span>}
                  <h3>{st.title}</h3>
                  <p>{st.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className={s.section} id="works">
          <div className={s.wrap}>
            <p className={s.kicker}>WORKS</p>
            <h2 className={s.h2}>施工事例</h2>
            <div className={s.works}>
              {works.slice(0, 2).map((w) => {
                const p = workPhotos(w.title);
                return (
                  <article key={w.title} className={s.work}>
                    <div className={s.pair}>
                      <div><p className={s.pairLabel}>BEFORE</p><DemoPhoto photo={p.before} tone="light" className={s.pairPhoto} /></div>
                      <div><p className={s.pairLabel}>AFTER</p><DemoPhoto photo={p.after} tone="light" className={s.pairPhoto} /></div>
                    </div>
                    <h3>{w.title}</h3>
                    <p>{w.body}</p>
                  </article>
                );
              })}
            </div>
            <p className={s.note}>※ 掲載イメージです。実際のサイトでは、お客様の許可を得た施工事例を掲載します。</p>
          </div>
        </section>

        <section className={`${s.section} ${s.sectionAlt}`}>
          <div className={s.wrap}>
            <p className={s.kicker}>PROMISE</p>
            <h2 className={s.h2}>{BRAND}の約束</h2>
            <div className={s.cards}>
              {promises.map((p) => (
                <article key={p.no} className={s.card}>
                  <span className={s.num}>{p.no}</span>
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={s.section} id="faq">
          <div className={s.wrap}>
            <p className={s.kicker}>FAQ</p>
            <h2 className={s.h2}>よくある質問</h2>
            <div className={s.faq}>
              {faqs.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className={`${s.section} ${s.sectionAlt}`} id="contact">
          <div className={`${s.wrap} ${s.contact}`}>
            <div>
              <p className={s.kicker}>CONTACT</p>
              <h2 className={s.h2}>まずは、写真を1枚。</h2>
              <p className={s.lead}>LINE なら、気になる場所の写真を送るだけ。フォームからは現地調査のご予約ができます。</p>
              <div className={s.lineBox}>
                <LineCta label="LINE で写真を送って相談" note="写真を送ると、だいたいの金額が返ってきます。" />
                <p>受付：9:00〜18:00（日曜・祝日休み）※ 架空の会社です</p>
              </div>
            </div>
            <ReserveForm className={s.form} submitLabel="現地調査を申し込む" fields={contactFields} />
          </div>
        </section>
      </main>

      <footer className={s.lpFooter}>
        <p className={s.logo}>{BRAND}<small>{BRAND_SUB}</small></p>
        <p>この会社は実在しません。ARVR TECH（運営：ARA COMPANY）による Web 制作デモです。</p>
        <a href={solutions.url ?? "/#services"}>ARVR TECH の Web 制作について</a>
      </footer>

      <a className={s.sticky} href="#contact">LINE・フォームで見積もり相談</a>
    </div>
  );
}
