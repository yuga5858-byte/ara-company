import DemoPhoto from "../../_components/DemoPhoto";
import SiteShell from "../../_components/SiteShell";
import { BRAND, BRAND_SUB, HP, cta, demoMeta, nav, photos } from "../../kisu/data";
import s from "../../kisu/kisu.module.css";

export const metadata = demoMeta("工務店 HP 制作デモ｜会社案内", "代表あいさつと会社概要のページ");

// 代表・所在地・許可などはすべて架空。許可番号は創作せず、項目名だけを見せる。
const rows = [
  ["会社名", `${BRAND}（架空の会社です）`],
  ["代表", "木栖 拓真（架空の人物です）"],
  ["所在地", "大阪府〇〇市（架空）"],
  ["受付時間", "9:00〜18:00（日曜・祝日休み）"],
  ["事業内容", "住宅リフォーム、外壁・屋根の補修、小規模な修繕"],
  ["許可・登録", "実際のサイトでは、建設業許可などの番号をここに記載します"],
  ["対応エリア", "大阪府北部を中心に（デモのため架空）"],
];

export default function KisuHpCompany() {
  return (
    <SiteShell brand={BRAND} brandSub={BRAND_SUB} nav={nav} current={`${HP}company/`} cta={cta} tone="light" className={s.theme}>
      <div className={s.wrap}>
        <header className={s.pageHead}>
          <p className={s.kicker}>COMPANY</p>
          <h1 className={s.h2}>会社案内</h1>
        </header>
      </div>
      <section className={s.section}>
        <div className={`${s.wrap} ${s.split}`}>
          <DemoPhoto photo={photos.owner} tone="light" className={s.portrait} />
          <div style={{ display: "grid", gap: 16 }}>
            <p className={s.kicker}>MESSAGE</p>
            <h2 className={s.h2} style={{ marginBottom: 0 }}>「頼んでよかった」を、<br />近くで積み重ねる。</h2>
            <p>小さな修理から大きなリフォームまで、ご相談いただいた方の暮らしに合わせて考えます。見積もりの内訳はすべてお見せし、分からないことは何度でもご説明します。</p>
            <p className={s.note}>代表 木栖 拓真（架空の人物です）</p>
          </div>
        </div>
      </section>
      <section className={`${s.section} ${s.sectionAlt}`}>
        <div className={s.wrap}>
          <h2 className={s.h2}>会社概要</h2>
          <table className={s.table}>
            <tbody>
              {rows.map(([k, v]) => <tr key={k}><th scope="row">{k}</th><td>{v}</td></tr>)}
            </tbody>
          </table>
          <DemoPhoto photo={photos.team} tone="light" className={s.pairPhoto} />
        </div>
      </section>
    </SiteShell>
  );
}
