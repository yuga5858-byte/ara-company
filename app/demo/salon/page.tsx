import type { Metadata } from "next";
import DemoBanner from "../_components/DemoBanner";
import DemoPhoto, { type Photo } from "../_components/DemoPhoto";
import ReserveForm from "../_components/ReserveForm";
import s from "./salon.module.css";

// ここに載せている店舗・人物・料金・口コミはすべて架空（営業用の制作デモ）。
export const metadata: Metadata = {
  title: "プライベート美容サロン LP 制作デモ",
  description: "ARA COMPANYが制作した、架空のプライベート美容サロンのランディングページ（制作デモ）です。",
  robots: { index: false, follow: false },
};

const photos: Record<string, Photo> = {
  hero: { src: null, alt: "自然光が入る施術ルーム", brief: "やわらかな自然光が入る施術ルーム。白いリネンのベッドとドライフラワー（縦長）" },
  room1: { src: null, alt: "完全個室の施術ルーム", brief: "完全個室の施術ルーム全景（横長）" },
  room2: { src: null, alt: "パウダールーム", brief: "鏡と間接照明のパウダールーム（縦長）" },
  room3: { src: null, alt: "施術後にお茶を楽しむラウンジ", brief: "ハーブティーとソファのラウンジ（縦長）" },
  staff1: { src: null, alt: "オーナーエステティシャン 白石 澪のポートレート", brief: "スタッフのポートレート。明るい背景、自然な笑顔（縦長）" },
  staff2: { src: null, alt: "エステティシャン 高槻 結のポートレート", brief: "スタッフのポートレート。明るい背景、自然な笑顔（縦長）" },
};

const menus = [
  {
    category: "FACIAL",
    title: "フェイシャル",
    items: [
      { name: "ベーシックフェイシャル", time: "60分", price: "12,100", desc: "クレンジングから保湿まで、肌の土台を整えるスタンダードコース。" },
      { name: "エイジングケアフェイシャル", time: "90分", price: "18,700", desc: "ハンドトリートメントで、ハリと透明感を引き出します。" },
    ],
  },
  {
    category: "HEAD & BODY",
    title: "ヘッドスパ・ボディ",
    items: [
      { name: "ドライヘッドスパ", time: "45分", price: "7,700", desc: "水を使わない、首・肩・頭のほぐし。お仕事帰りにも。" },
      { name: "リンパボディトリートメント", time: "90分", price: "19,800", desc: "全身のめぐりを整える、オイルトリートメント。" },
    ],
  },
];

const staff = [
  { photo: photos.staff1, name: "白石 澪", en: "Mio Shiraishi", role: "オーナーエステティシャン", body: "お一人おひとりの肌の状態と生活リズムを伺い、通いやすいペースをご提案します。" },
  { photo: photos.staff2, name: "高槻 結", en: "Yui Takatsuki", role: "エステティシャン", body: "ヘッドスパとボディを担当しています。力加減はいつでもお申し付けください。" },
];

const steps = [
  { title: "ご予約", body: "フォームから、ご希望のメニューと日時をお送りください。" },
  { title: "カウンセリング", body: "肌のお悩みや、当日の体調を伺います。" },
  { title: "施術", body: "完全個室で、ゆったりとお過ごしいただけます。" },
  { title: "アフターティー", body: "ハーブティーとともに、ご自宅でのケアをお伝えします。" },
];

const faqs = [
  { q: "初めてでも予約できますか？", a: "はい。初回は通常より15分長くお時間をいただき、カウンセリングを行います。" },
  { q: "メイクをしたまま行っても大丈夫ですか？", a: "はい。フェイシャルの際はこちらでメイクを落とし、パウダールームでお直しいただけます。" },
  { q: "キャンセルはいつまでできますか？", a: "前日の18時までにご連絡いただければ、キャンセル料はかかりません。" },
];

export default function SalonDemo() {
  return (
    <div className={s.page}>
      <DemoBanner tone="light" />

      <header className={s.header}>
        <a className={s.logo} href="#top">Salon <em>Soyeux</em></a>
        <nav className={s.nav} aria-label="ページ内メニュー">
          <a href="#menu">メニュー・料金</a>
          <a href="#space">店内</a>
          <a href="#staff">スタッフ</a>
          <a href="#faq">よくある質問</a>
        </nav>
        <a className={s.headerCta} href="#reserve">ご予約</a>
      </header>

      <main id="top">
        <section className={s.hero}>
          <div className={s.heroText}>
            <p className={s.eyebrow}>Private Beauty Salon — Osaka</p>
            <h1 className={s.heroTitle}>肌に、<br />静かな余白を。</h1>
            <p className={s.heroLead}>お一人さまずつご案内する、完全予約制のプライベートサロン。<br />ほかのお客様と会うことなく、ゆったりとお過ごしいただけます。</p>
            <div className={s.heroActions}>
              <a className={s.btnPrimary} href="#reserve">ご予約はこちら</a>
              <a className={s.btnText} href="#menu">メニューを見る</a>
            </div>
          </div>
          <DemoPhoto photo={photos.hero} tone="light" className={s.heroPhoto} />
        </section>

        <section className={s.concept}>
          <p className={s.script}>Soyeux</p>
          <p className={s.conceptText}>ソワイユは、フランス語で「絹のような」。<br />触れたくなるような、やわらかな肌へ。<br />忙しい毎日の中に、何もしなくていい時間をお届けします。</p>
        </section>

        <section className={s.section} id="menu">
          <div className={s.secHead}>
            <p className={s.eyebrow}>Menu &amp; Price</p>
            <h2 className={s.h2}>メニュー・料金</h2>
          </div>
          <div className={s.menus}>
            {menus.map((m) => (
              <div key={m.category} className={s.menuGroup}>
                <p className={s.menuCat}>{m.category}</p>
                <h3>{m.title}</h3>
                <ul>
                  {m.items.map((it) => (
                    <li key={it.name}>
                      <div className={s.menuRow}>
                        <span className={s.menuName}>{it.name}</span>
                        <span className={s.dots} aria-hidden="true" />
                        <span className={s.menuPrice}>{it.time}／<strong>{it.price}</strong>円</span>
                      </div>
                      <p>{it.desc}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className={s.firstVisit}><span>初回限定</span>すべてのメニューを 20% OFF でお試しいただけます。</p>
          <p className={s.note}>表示価格はすべて税込です。※ デモ用の架空の料金です。</p>
        </section>

        <section className={s.section} id="space">
          <div className={s.secHead}>
            <p className={s.eyebrow}>Our Space</p>
            <h2 className={s.h2}>店内のご紹介</h2>
          </div>
          <div className={s.gallery}>
            <figure className={s.galleryWide}>
              <DemoPhoto photo={photos.room1} tone="light" className={s.galleryPhoto} />
              <figcaption>完全個室の施術ルーム</figcaption>
            </figure>
            <figure>
              <DemoPhoto photo={photos.room2} tone="light" className={s.galleryPhoto} />
              <figcaption>パウダールーム</figcaption>
            </figure>
            <figure>
              <DemoPhoto photo={photos.room3} tone="light" className={s.galleryPhoto} />
              <figcaption>アフターティーのラウンジ</figcaption>
            </figure>
          </div>
        </section>

        <section className={s.section} id="staff">
          <div className={s.secHead}>
            <p className={s.eyebrow}>Staff</p>
            <h2 className={s.h2}>スタッフ紹介</h2>
          </div>
          <div className={s.staff}>
            {staff.map((p) => (
              <article key={p.en}>
                <DemoPhoto photo={p.photo} tone="light" className={s.staffPhoto} />
                <div>
                  <p className={s.staffRole}>{p.role}</p>
                  <h3>{p.name}<span>{p.en}</span></h3>
                  <p>{p.body}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={s.section}>
          <div className={s.secHead}>
            <p className={s.eyebrow}>Flow</p>
            <h2 className={s.h2}>ご来店の流れ</h2>
          </div>
          <ol className={s.steps}>
            {steps.map((st, i) => (
              <li key={st.title}>
                <span className={s.stepNo}>{String(i + 1).padStart(2, "0")}</span>
                <h3>{st.title}</h3>
                <p>{st.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className={s.section} id="faq">
          <div className={s.secHead}>
            <p className={s.eyebrow}>Q &amp; A</p>
            <h2 className={s.h2}>よくあるご質問</h2>
          </div>
          <div className={s.faq}>
            {faqs.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className={s.reserve} id="reserve">
          <div className={s.reserveInner}>
            <div>
              <p className={s.eyebrow}>Reservation</p>
              <h2 className={s.h2}>ご予約</h2>
              <p className={s.lead}>ご希望のメニューと日時をお送りください。空き状況を確認し、ご予約確定のご連絡を差し上げます。</p>
              <dl className={s.info}>
                <div><dt>営業時間</dt><dd>10:00〜19:00（最終受付 17:30）</dd></div>
                <div><dt>定休日</dt><dd>火曜日</dd></div>
                <div><dt>所在地</dt><dd>大阪市北区西天満（架空の店舗）</dd></div>
              </dl>
            </div>
            <ReserveForm
              className={s.form}
              submitLabel="予約内容を送信する"
              fields={[
                { id: "name", label: "お名前", type: "text", required: true },
                { id: "email", label: "メールアドレス", type: "email", required: true },
                { id: "menuChoice", label: "ご希望のメニュー", type: "select", required: true, options: menus.flatMap((m) => m.items.map((it) => `${it.name}（${it.time}）`)) },
                { id: "date", label: "ご希望日", type: "date", required: true },
              ]}
            />
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <p className={s.logo}>Salon <em>Soyeux</em></p>
        <p>この店舗は実在しません。ARA COMPANY による Web 制作デモです。</p>
        <a href="/#services">ARA COMPANY の Web 制作について</a>
      </footer>

      <a className={s.stickyCta} href="#reserve">ご予約はこちら</a>
    </div>
  );
}
