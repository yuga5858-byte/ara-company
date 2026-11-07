import type { Metadata } from "next";
export const HP = "/demo/minamo-hp/";
export const nav = [{ href: HP, label: "ホーム" }, { href: `${HP}service/`, label: "サービス・料金" }, { href: `${HP}flow/`, label: "作業の流れ" }, { href: `${HP}company/`, label: "会社案内" }, { href: `${HP}contact/`, label: "お問い合わせ" }];
export function demoMeta(label: string, path: string): Metadata {
  const title = `ミナモ清掃｜${label}（制作デモ）`;
  const description = "架空の清掃店「ミナモ清掃」の制作デモです。料金・人物・所在地・営業案内は架空で、予約やLINEへの送信は行いません。";
  return { title, description, robots: { index: false, follow: false }, alternates: { canonical: path }, openGraph: { type: "website", locale: "ja_JP", siteName: "ミナモ清掃（制作デモ）", title, description, url: path }, twitter: { card: "summary", title, description } };
}
export const menus = [
  { title: "エアコン", price: "11,000円〜", body: "壁掛けタイプの内部洗浄。機種・設置状況を確認してご案内します。" },
  { title: "浴室", price: "16,500円〜", body: "浴槽・床・壁など、気になる箇所を事前にうかがいます。" },
  { title: "キッチン", price: "16,500円〜", body: "シンクやコンロ周辺の油汚れ・水あかをお手入れします。" },
  { title: "トイレ", price: "8,800円〜", body: "便器・床など、普段の掃除では手が届きにくい箇所まで。" },
  { title: "水回り3点セット", price: "38,500円〜", body: "浴室・キッチン・トイレをまとめて。暮らしに合わせてご相談ください。", featured: true },
];
export const steps = [
  { title: "LINEで写真を送る", body: "気になる場所と希望メニューをお知らせください。このデモでは写真の送信・受付はできません。" },
  { title: "お見積もり", body: "汚れや設備の状態、作業範囲を確認し、料金と条件をご案内する流れです。" },
  { title: "日程を決める", body: "ご希望日をうかがい、作業内容と訪問時間をすり合わせます。" },
  { title: "養生して作業", body: "周囲を保護し、素材や設備の状態に合わせて清掃します。" },
  { title: "仕上がりを確認", body: "作業箇所を一緒に確認し、日々のお手入れについてご案内します。" },
];
export const faqs = [
  { q: "作業中の立ち会いは必要ですか？", a: "作業前の確認と、終了後の仕上がり確認をお願いする想定です。途中の外出については事前にご相談ください。" },
  { q: "駐車場がなくても頼めますか？", a: "近隣駐車場の利用可否と費用を事前に確認し、お見積もり時にご案内する想定です。" },
  { q: "追加料金はかかりますか？", a: "設備の種類や状態によって変わるため、作業範囲と追加費用の有無を着手前に確認する想定です。" },
  { q: "予約の変更・キャンセルはできますか？", a: "変更希望が分かった時点でのご連絡を想定しています。実際の受付期限・キャンセル料は運営店の規定を掲載します。" },
  { q: "支払い方法を教えてください。", a: "このデモでは決済できません。実際のサイトでは、店舗が対応している支払い方法と時期をここにご案内します。" },
];
