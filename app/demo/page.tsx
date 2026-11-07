import type { Metadata } from "next";
import DemoBanner from "./_components/DemoBanner";
import { solutions } from "../site";
import s from "./demo-index.module.css";

// 営業で見せる制作デモの一覧。どのデモも架空の会社・店舗。
export const metadata: Metadata = {
  title: "制作デモ一覧",
  description: "ARVR TECH（運営：ARA COMPANY）が制作した、架空の会社・店舗の Web サイトのデモ一覧です。",
  robots: { index: false, follow: false },
};

const demos = [
  { industry: "パーソナルジム", name: "ATELIER KINETIC", kind: "LP", pages: "1ページ", href: "/demo/gym/", note: "体験予約までを1ページで案内" },
  { industry: "美容サロン", name: "Salon Soyeux", kind: "LP", pages: "1ページ", href: "/demo/salon/", note: "メニューと予約の流れを丁寧に" },
  { industry: "工務店・リフォーム", name: "木栖工務店", kind: "LP", pages: "1ページ", href: "/demo/kisu/", note: "LINE の写真相談から現地調査へ" },
  { industry: "工務店・リフォーム", name: "木栖工務店", kind: "HP", pages: "5ページ", href: "/demo/kisu-hp/", note: "施工事例・流れ・会社案内・お問い合わせ" },
  { industry: "ハウスクリーニング", name: "ミナモ清掃", kind: "LP", pages: "1ページ", href: "/demo/minamo/", note: "メニュー料金と LINE 見積もり・予約" },
  { industry: "ハウスクリーニング", name: "ミナモ清掃", kind: "HP", pages: "5ページ", href: "/demo/minamo-hp/", note: "サービス・作業の流れ・会社案内・お問い合わせ" },
];

export default function DemoIndex() {
  return (
    <div className={s.page}>
      <DemoBanner tone="light" />
      <main className={s.main}>
        <p className={s.kicker}>WORKS DEMO</p>
        <h1 className={s.h1}>制作デモ一覧</h1>
        <p className={s.lead}>
          ARVR TECH が制作した、Web サイトの見本です。会社・店舗・料金・人物はすべて架空です。
          LP は1ページで申し込みまで案内する形、HP は複数のページで会社やサービスを紹介する形です。
        </p>
        <ul className={s.list}>
          {demos.map((d) => (
            <li key={d.href}>
              <a className={s.card} href={d.href}>
                <span className={s.meta}>
                  <span className={s.kind}>{d.kind}</span>
                  {d.industry}・{d.pages}
                </span>
                <span className={s.name}>{d.name}</span>
                <span className={s.note}>{d.note}</span>
              </a>
            </li>
          ))}
        </ul>
        <p className={s.lead}>
          <a href={solutions.url ?? "/#services"}>ARVR TECH の Web 制作・料金について</a>
        </p>
      </main>
    </div>
  );
}
