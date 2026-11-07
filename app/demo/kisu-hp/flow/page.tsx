import LineCta from "../../_components/LineCta";
import SiteShell from "../../_components/SiteShell";
import { BRAND, BRAND_SUB, HP, cta, demoMeta, faqs, nav, steps } from "../../kisu/data";
import s from "../../kisu/kisu.module.css";

export const metadata = demoMeta("工務店 HP 制作デモ｜リフォームの流れ", "ご相談から工事後の点検までの流れのページ");

export default function KisuHpFlow() {
  return (
    <SiteShell brand={BRAND} brandSub={BRAND_SUB} nav={nav} current={`${HP}flow/`} cta={cta} tone="light" className={s.theme}>
      <div className={s.wrap}>
        <header className={s.pageHead}>
          <p className={s.kicker}>FLOW</p>
          <h1 className={s.h2}>リフォームの流れ</h1>
          <p>はじめての方にも分かりやすいように、ご相談から工事のあとまでをまとめました。</p>
        </header>
      </div>
      <section className={s.section}>
        <div className={s.wrap}>
          <ol className={s.steps}>
            {steps.map((st) => (
              <li key={st.title}>
                {st.line && <span className={s.stepTag}>LINE</span>}
                <h2 style={{ fontSize: "1.05rem" }}>{st.title}</h2>
                <p>{st.body}</p>
              </li>
            ))}
          </ol>
          <div className={s.lineBox}>
            <LineCta label="LINE で写真を送って相談" note="写真を送ると、だいたいの金額が返ってきます。" />
          </div>
        </div>
      </section>
      <section className={`${s.section} ${s.sectionAlt}`}>
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
    </SiteShell>
  );
}
