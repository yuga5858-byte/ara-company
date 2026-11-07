import DemoPhoto from "../../_components/DemoPhoto";
import SiteShell from "../../_components/SiteShell";
import { BRAND, BRAND_SUB, HP, cta, demoMeta, nav, workPhotos, works } from "../../kisu/data";
import s from "../../kisu/kisu.module.css";

export const metadata = demoMeta("工務店 HP 制作デモ｜施工事例", "施工事例のページ（掲載イメージ）");

// 架空の施工事例は作らない。写真の差し替え枠と、載せる項目の見本だけを見せる。
export default function KisuHpWorks() {
  return (
    <SiteShell brand={BRAND} brandSub={BRAND_SUB} nav={nav} current={`${HP}works/`} cta={cta} tone="light" className={s.theme}>
      <div className={s.wrap}>
        <header className={s.pageHead}>
          <p className={s.kicker}>WORKS</p>
          <h1 className={s.h2}>施工事例</h1>
          <p>工事の前と後の写真、工期、お客様のご要望を載せるページです。</p>
        </header>
      </div>
      <section className={s.section}>
        <div className={s.wrap}>
          <div className={s.works}>
            {works.map((w) => {
              const p = workPhotos(w.title);
              return (
                <article key={w.title} className={s.work}>
                  <div className={s.pair}>
                    <div><p className={s.pairLabel}>BEFORE</p><DemoPhoto photo={p.before} tone="light" className={s.pairPhoto} /></div>
                    <div><p className={s.pairLabel}>AFTER</p><DemoPhoto photo={p.after} tone="light" className={s.pairPhoto} /></div>
                  </div>
                  <p className={s.pairLabel}>{w.tag}</p>
                  <h2 style={{ fontSize: "1.05rem" }}>{w.title}</h2>
                  <p>{w.body}</p>
                </article>
              );
            })}
          </div>
          <p className={s.note}>※ 掲載イメージです。実際のサイトでは、お客様の許可を得た施工事例を、写真と一緒に掲載します。</p>
        </div>
      </section>
    </SiteShell>
  );
}
