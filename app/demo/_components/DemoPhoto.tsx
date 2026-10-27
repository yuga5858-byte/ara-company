import styles from "./demo.module.css";

export type Photo = {
  // public/ 以下の画像パス。利用条件を確認した写真を入れるまでは null（差し替え枠を表示する）
  src: string | null;
  alt: string;
  // 差し替え枠に表示する、撮影・選定してほしい写真の内容
  brief: string;
  // 写真の出典と利用条件（例："Unsplash / Unsplash License"）
  credit?: string;
};

export default function DemoPhoto({ photo, className, tone }: { photo: Photo; className?: string; tone: "dark" | "light" }) {
  if (photo.src) {
    return <img className={className} src={photo.src} alt={photo.alt} loading="lazy" decoding="async" />;
  }
  return (
    <div
      className={`${styles.slot} ${tone === "dark" ? styles.slotDark : styles.slotLight} ${className ?? ""}`}
      role="img"
      aria-label={`${photo.alt}（写真差し替え予定）`}
    >
      <span className={styles.slotTag}>PHOTO</span>
      <span className={styles.slotBrief}>{photo.brief}</span>
    </div>
  );
}
