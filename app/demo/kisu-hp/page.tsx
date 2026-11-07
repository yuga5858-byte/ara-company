import DemoPhoto from "../_components/DemoPhoto";
import LineCta from "../_components/LineCta";
import SiteShell from "../_components/SiteShell";
import { BRAND, BRAND_SUB, HP, cta, demoMeta, menus, nav, news, photos, promises } from "../kisu/data";
import s from "../kisu/kisu.module.css";

// 工務店 HP（5ページ）のトップ（制作デモ）。会社・料金・お知らせはすべて架空。
export const metadata = demoMeta("工務店 HP 制作デモ｜トップ", "地域の工務店のホームページ（5ページ構成）");

export default function KisuHpTop() {
  return (
    <SiteShell brand={BRAND} brandSub={BRAND_SUB} nav={nav} current={HP} cta={cta} tone="light" className={s.theme}>
      <div className={s.wrap}>
        <section className={s.hero}>
          <div className={s.heroText}>
            <p className={s.eyebrow}>新築・リフォーム ／ 大阪府北部（架空）</p>
            <h1 className={s.h1}>住まいの「そろそろ」に、<br />近くの工務店を。</h1>
            <p className={s.lead}>{BRAND}は、水まわりのリフォームから外壁、小さな修理までお受けする地域の工務店です。最初のご相談から工事のあとまで、代表が担当します。</p>
            <div className={s.actions}>
              <a className={s.btn} href={cta.href}>{cta.label}</a>
              <a className={s.btnGhost} href={`${HP}works/`}>施工事例を見る</a>
            </div>
          </div>
          <DemoPhoto photo={photos.hero} tone="light" className={s.heroPhoto} />
        </section>
      </div>

      <section className={`${s.section} ${s.sectionAlt}`}>
        <div className={s.wrap}>
          <p className={s.kicker}>SERVICE</p>
          <h2 className={s.h2}>お受けしている工事</h2>
          <div className={s.cards}>
            {menus.map((m) => (
              <article key={m.title} className={s.card}>
                <h3>{m.title}</h3>
                <p className={s.price}>{m.price}<small>税込</small></p>
                <p>{m.body}</p>
              </article>
            ))}
          </div>
          <p className={s.note}>※ デモ用の架空の料金です。</p>
        </div>
      </section>

      <section className={s.section}>
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
          <div className={s.actions} style={{ marginTop: 28 }}>
            <a className={s.btnGhost} href={`${HP}flow/`}>リフォームの流れを見る</a>
          </div>
        </div>
      </section>

      <section className={`${s.section} ${s.sectionAlt}`}>
        <div className={s.wrap}>
          <p className={s.kicker}>NEWS</p>
          <h2 className={s.h2}>お知らせ</h2>
          <ul className={s.news}>
            {news.map((n) => <li key={n.date}><time>{n.date}</time><span>{n.body}</span></li>)}
          </ul>
        </div>
      </section>

      <section className={s.section}>
        <div className={`${s.wrap} ${s.contact}`}>
          <div>
            <p className={s.kicker}>CONTACT</p>
            <h2 className={s.h2}>写真1枚から、ご相談ください。</h2>
            <p className={s.lead}>LINE で気になる場所の写真を送ると、だいたいの金額をお返しします。</p>
          </div>
          <div className={s.lineBox}>
            <LineCta label="LINE で写真を送って相談" note="写真を送ると、だいたいの金額が返ってきます。" />
            <a className={s.btnGhost} href={cta.href}>フォームで相談する</a>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
