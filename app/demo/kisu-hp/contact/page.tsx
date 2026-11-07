import LineCta from "../../_components/LineCta";
import ReserveForm from "../../_components/ReserveForm";
import SiteShell from "../../_components/SiteShell";
import { BRAND, BRAND_SUB, HP, cta, contactFields, demoMeta, nav } from "../../kisu/data";
import s from "../../kisu/kisu.module.css";

export const metadata = demoMeta("工務店 HP 制作デモ｜お問い合わせ", "お問い合わせ・現地調査の申し込みページ");

export default function KisuHpContact() {
  return (
    <SiteShell brand={BRAND} brandSub={BRAND_SUB} nav={nav} current={`${HP}contact/`} cta={cta} tone="light" className={s.theme}>
      <div className={s.wrap}>
        <header className={s.pageHead}>
          <p className={s.kicker}>CONTACT</p>
          <h1 className={s.h2}>お問い合わせ</h1>
          <p>LINE なら写真を送るだけ。フォームからは現地調査のお申し込みができます。</p>
        </header>
      </div>
      <section className={s.section}>
        <div className={`${s.wrap} ${s.contact}`}>
          <div>
            <div className={s.lineBox} style={{ marginTop: 0 }}>
              <LineCta label="LINE で写真を送って相談" note="写真を送ると、だいたいの金額が返ってきます。" />
              <p>いちばん早いのは LINE です。気になる場所の写真を2〜3枚お送りください。</p>
            </div>
            <dl className={s.info}>
              <div><dt>受付時間</dt><dd>9:00〜18:00（日曜・祝日休み）</dd></div>
              <div><dt>お電話</dt><dd>実際のサイトでは、ここに電話番号を載せます</dd></div>
              <div><dt>所在地</dt><dd>大阪府〇〇市（架空）</dd></div>
            </dl>
          </div>
          <ReserveForm className={s.form} submitLabel="この内容で相談する" fields={contactFields} />
        </div>
      </section>
    </SiteShell>
  );
}
