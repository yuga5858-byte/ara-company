import styles from "./demo.module.css";

// すべての制作デモの最上部に表示する。架空の情報であることを必ず明記する。
export default function DemoBanner({ tone }: { tone: "dark" | "light" }) {
  return (
    <div className={`${styles.banner} ${tone === "dark" ? styles.bannerDark : styles.bannerLight}`} role="note">
      <p>
        <strong>制作デモ</strong>
        このページは ARA COMPANY が制作した営業用のデモです。店舗名・所在地・料金・人物・口コミはすべて架空で、実在しません。
      </p>
      <a href="/#services">ARA COMPANYに戻る</a>
    </div>
  );
}
