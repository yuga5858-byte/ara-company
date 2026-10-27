import type { Metadata } from "next";
import DemoBanner from "../_components/DemoBanner";
import DemoPhoto, { type Photo } from "../_components/DemoPhoto";
import ReserveForm from "../_components/ReserveForm";
import s from "./gym.module.css";

// ここに載せている店舗・人物・料金・口コミはすべて架空（営業用の制作デモ）。
export const metadata: Metadata = {
  title: "パーソナルジム LP 制作デモ",
  description: "ARA COMPANYが制作した、架空の大阪のパーソナルジムのランディングページ（制作デモ）です。",
  robots: { index: false, follow: false },
};

const photos: Record<string, Photo> = {
  hero: { src: null, alt: "照明を落としたトレーニングフロア", brief: "照明を落とした個室のトレーニングフロア。ラックとバーベル、床に落ちるスポットライト（横長）" },
  concept: { src: null, alt: "トレーナーがフォームを確認する様子", brief: "トレーナーがフォームを確認している手元のクローズアップ（縦長）" },
  t1: { src: null, alt: "トレーナー 黒田 蒼のポートレート", brief: "トレーナーのポートレート。黒背景、上半身（縦長）" },
  t2: { src: null, alt: "トレーナー 藤井 奏のポートレート", brief: "トレーナーのポートレート。黒背景、上半身（縦長）" },
  t3: { src: null, alt: "トレーナー 三浦 陸のポートレート", brief: "トレーナーのポートレート。黒背景、上半身（縦長）" },
};

const features = [
  { no: "01", title: "完全個室・マンツーマン", body: "ほかのお客様と顔を合わせない動線と個室で、トレーニングだけに集中できます。" },
  { no: "02", title: "姿勢と動作の評価から", body: "初回に姿勢・関節の動き・体組成を測り、身体の状態に合わせてメニューを組み立てます。" },
  { no: "03", title: "食事は写真を送るだけ", body: "毎食の写真をアプリで送ると、トレーナーが続けやすい改善点を返信します。" },
];

const trainers = [
  { photo: photos.t1, name: "黒田 蒼", en: "AOI KURODA", role: "ヘッドトレーナー", body: "ボディメイクと姿勢改善を担当。重さより「正しく効かせる」ことを大切にしています。", tags: ["ボディメイク", "姿勢改善"] },
  { photo: photos.t2, name: "藤井 奏", en: "KANADE FUJII", role: "トレーナー", body: "女性の引き締めと産後のトレーニングを担当。生活に無理のないペースで進めます。", tags: ["引き締め", "産後ケア"] },
  { photo: photos.t3, name: "三浦 陸", en: "RIKU MIURA", role: "トレーナー", body: "競技者のコンディショニングを担当。動きの癖を見つけて、パフォーマンスを高めます。", tags: ["コンディショニング", "競技力向上"] },
];

const plans = [
  { name: "体験トレーニング", en: "TRIAL", price: "3,300", unit: "円／60分", points: ["カウンセリング・姿勢評価", "トレーニング体験", "当日入会で入会金無料"], featured: false },
  { name: "スタンダード", en: "STANDARD", price: "36,300", unit: "円／月（4回）", points: ["1回60分のマンツーマン", "食事サポート付き", "月1回の体組成測定"], featured: true },
  { name: "プレミアム", en: "PREMIUM", price: "66,000", unit: "円／月（8回）", points: ["1回60分のマンツーマン", "食事サポート付き", "毎回の体組成測定・ウェア貸出"], featured: false },
];

const voices = [
  { body: "個室なので人目を気にせず続けられました。フォームを毎回直してもらえるのが心強いです。", who: "30代・会社員（デモ）" },
  { body: "食事の写真を送るだけなので、忙しい週でも続けられています。", who: "40代・自営業（デモ）" },
];

const faqs = [
  { q: "運動経験がなくても大丈夫ですか？", a: "はい。初回に身体の状態を確認し、無理のない強度から始めます。" },
  { q: "何を持っていけばいいですか？", a: "室内用シューズと飲み物をお持ちください。ウェアとタオルは無料でお貸しします。" },
  { q: "予約の変更やキャンセルはできますか？", a: "前日の20時までにご連絡いただければ、無料で変更できます。" },
  { q: "食事制限は厳しいですか？", a: "極端な制限は行いません。普段の食事をもとに、続けやすい改善を提案します。" },
  { q: "駐車場はありますか？", a: "専用駐車場はありません。近隣のコインパーキングをご利用ください。" },
];

export default function GymDemo() {
  return (
    <div className={s.page}>
      <DemoBanner tone="dark" />

      <header className={s.header}>
        <a className={s.logo} href="#top">ATELIER <span>KINETIC</span></a>
        <nav className={s.nav} aria-label="ページ内メニュー">
          <a href="#concept">特徴</a>
          <a href="#trainers">トレーナー</a>
          <a href="#plans">料金</a>
          <a href="#faq">よくある質問</a>
        </nav>
        <a className={s.headerCta} href="#reserve">体験予約</a>
      </header>

      <main id="top">
        <section className={s.hero}>
          <DemoPhoto photo={photos.hero} tone="dark" className={s.heroPhoto} />
          <div className={s.heroInner}>
            <p className={s.eyebrow}>PRIVATE PERSONAL GYM ／ OSAKA KITAHORIE</p>
            <h1 className={s.heroTitle}>
              <span>BUILT</span>
              <span>WITH</span>
              <span>INTENT.</span>
            </h1>
            <p className={s.heroLead}>身体は、設計できる。<br />大阪・北堀江の完全個室パーソナルジム。</p>
            <div className={s.heroActions}>
              <a className={s.btnPrimary} href="#reserve">体験トレーニングを予約する</a>
              <a className={s.btnGhost} href="#plans">料金を見る</a>
            </div>
          </div>
        </section>

        <section className={s.section} id="concept">
          <div className={s.conceptGrid}>
            <div>
              <p className={s.kicker}>CONCEPT</p>
              <h2 className={s.h2}>闇雲に追い込まない。<br />必要な負荷を、正確に。</h2>
              <p className={s.lead}>ATELIER KINETIC は、一人ひとりの骨格や動きの癖を見極めてから、トレーニングを設計するパーソナルジムです。</p>
            </div>
            <DemoPhoto photo={photos.concept} tone="dark" className={s.conceptPhoto} />
          </div>
          <ol className={s.features}>
            {features.map((f) => (
              <li key={f.no}>
                <span className={s.featureNo}>{f.no}</span>
                <h3>{f.title}</h3>
                <p>{f.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className={s.section} id="trainers">
          <p className={s.kicker}>TRAINERS</p>
          <h2 className={s.h2}>トレーナー紹介</h2>
          <div className={s.trainers}>
            {trainers.map((t) => (
              <article key={t.en} className={s.trainer}>
                <DemoPhoto photo={t.photo} tone="dark" className={s.trainerPhoto} />
                <p className={s.trainerRole}>{t.role}</p>
                <h3>{t.name}<span>{t.en}</span></h3>
                <p>{t.body}</p>
                <ul>{t.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
              </article>
            ))}
          </div>
        </section>

        <section className={s.section} id="plans">
          <p className={s.kicker}>PRICE</p>
          <h2 className={s.h2}>料金プラン</h2>
          <div className={s.plans}>
            {plans.map((p) => (
              <article key={p.en} className={`${s.plan} ${p.featured ? s.planFeatured : ""}`}>
                {p.featured && <span className={s.badge}>人気</span>}
                <p className={s.planEn}>{p.en}</p>
                <h3>{p.name}</h3>
                <p className={s.planPrice}><strong>{p.price}</strong>{p.unit}</p>
                <ul>{p.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
                <a className={p.featured ? s.btnPrimary : s.btnGhost} href="#reserve">体験を予約する</a>
              </article>
            ))}
          </div>
          <p className={s.note}>表示価格はすべて税込です。入会金 22,000円（体験当日のご入会で無料）。※ デモ用の架空の料金です。</p>
        </section>

        <section className={s.section} aria-labelledby="voices">
          <p className={s.kicker}>VOICE</p>
          <h2 className={s.h2} id="voices">お客様の声</h2>
          <div className={s.voices}>
            {voices.map((v) => (
              <figure key={v.who}>
                <blockquote>{v.body}</blockquote>
                <figcaption>{v.who}</figcaption>
              </figure>
            ))}
          </div>
          <p className={s.note}>※ デモ用の架空の口コミです。</p>
        </section>

        <section className={s.section} id="faq">
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
        </section>

        <section className={`${s.section} ${s.reserve}`} id="reserve">
          <div>
            <p className={s.kicker}>RESERVATION</p>
            <h2 className={s.h2}>まずは60分の<br />体験トレーニングから。</h2>
            <p className={s.lead}>カウンセリングと姿勢評価のあと、実際のトレーニングを体験いただけます。無理な勧誘はいたしません。</p>
            <dl className={s.info}>
              <div><dt>営業時間</dt><dd>7:00〜23:00（不定休）</dd></div>
              <div><dt>所在地</dt><dd>大阪市西区北堀江（架空の店舗）</dd></div>
            </dl>
          </div>
          <ReserveForm
            className={s.form}
            submitLabel="体験を予約する"
            fields={[
              { id: "name", label: "お名前", type: "text", required: true },
              { id: "email", label: "メールアドレス", type: "email", required: true },
              { id: "date", label: "ご希望日", type: "date", required: true },
              { id: "time", label: "ご希望の時間帯", type: "select", options: ["7:00〜11:00", "11:00〜16:00", "16:00〜20:00", "20:00〜23:00"] },
            ]}
          />
        </section>
      </main>

      <footer className={s.footer}>
        <p className={s.logo}>ATELIER <span>KINETIC</span></p>
        <p>この店舗は実在しません。ARA COMPANY による Web 制作デモです。</p>
        <a href="/#services">ARA COMPANY の Web 制作について</a>
      </footer>

      <a className={s.stickyCta} href="#reserve">体験トレーニングを予約する</a>
    </div>
  );
}
