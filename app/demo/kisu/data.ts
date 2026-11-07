import type { Metadata } from "next";
import type { Photo } from "../_components/DemoPhoto";
import type { NavItem } from "../_components/SiteShell";

// 木栖工務店（制作デモ）の内容。会社・人物・料金・事例はすべて架空。
// 架空の施工事例や口コミは載せない。事例は「掲載イメージ」の枠だけを見せる。
export const BRAND = "木栖工務店";
export const BRAND_SUB = "KISU KOMUTEN（架空）";

export function demoMeta(title: string, description: string): Metadata {
  const d = `${description}（ARVR TECH が制作した架空の工務店の制作デモです）`;
  return {
    title,
    description: d,
    robots: { index: false, follow: false },
    openGraph: { type: "website", locale: "ja_JP", siteName: "木栖工務店（制作デモ）", title, description: d },
    twitter: { card: "summary", title, description: d },
  };
}

export const HP = "/demo/kisu-hp/";
export const nav: NavItem[] = [
  { href: HP, label: "トップ" },
  { href: `${HP}works/`, label: "施工事例" },
  { href: `${HP}flow/`, label: "リフォームの流れ" },
  { href: `${HP}company/`, label: "会社案内" },
  { href: `${HP}contact/`, label: "お問い合わせ" },
];
export const cta: NavItem = { href: `${HP}contact/`, label: "見積もりを相談する" };

export const photos: Record<string, Photo> = {
  hero: { src: null, alt: "木の質感を生かしたキッチンのリフォーム", brief: "明るい自然光の入るキッチン。木の面材と白い壁（縦長）" },
  owner: { src: null, alt: "代表 木栖 拓真のポートレート", brief: "作業着姿の代表。工房の前で上半身（縦長）" },
  team: { src: null, alt: "現場で打ち合わせをする職人", brief: "現場で図面を見ながら打ち合わせをする2人（横長）" },
};

export const worries = [
  "キッチンやお風呂が古くなって、使いにくい",
  "外壁のひび割れや色あせが気になる",
  "どこに頼めばいいか、相場が分からない",
  "見積もりのために何度も家に来られるのは負担",
];

export const menus = [
  { title: "キッチン", price: "65万円〜", body: "システムキッチンの交換。配置の変更もご相談ください。" },
  { title: "浴室（ユニットバス）", price: "80万円〜", body: "在来の浴室からユニットバスへの入れ替えも対応します。" },
  { title: "トイレ", price: "18万円〜", body: "便器の交換と内装（床・壁紙）をまとめて。" },
  { title: "洗面台", price: "15万円〜", body: "収納の多い洗面台への交換。" },
  { title: "外壁塗装", price: "90万円〜", body: "延床30坪前後の目安。足場代を含みます。" },
  { title: "屋根の補修", price: "20万円〜", body: "瓦のずれ・雨どいの交換など、部分的な補修から。" },
];

export const steps = [
  { title: "LINE で写真を送る", body: "気になる場所の写真を2〜3枚送るだけ。だいたいの金額をお返しします。", line: true },
  { title: "現地調査", body: "代表が伺って、寸法と状態を確認します。所要時間は1時間ほどです。" },
  { title: "お見積もり", body: "材料・工事・処分費まで、内訳をすべて書いたお見積もりをお出しします。" },
  { title: "ご契約・工事", body: "工事の前に近隣へのごあいさつをします。工事中の様子は LINE で写真をお送りします。" },
  { title: "お引き渡し・点検", body: "完成後に一緒に確認します。1年後に点検に伺います。" },
];

export const promises = [
  { no: "01", title: "現地は代表が見に行きます", body: "最初の調査から工事の完了まで、同じ担当がご説明します。" },
  { no: "02", title: "見積もりは内訳をすべて", body: "「一式」でまとめず、材料・工事・処分費を分けてお出しします。" },
  { no: "03", title: "工事のあとも", body: "お引き渡しから1年後に点検に伺います。小さな修理もご相談ください。" },
];

export const works = [
  { title: "施工事例 1（キッチン）", body: "ここに、施工した場所（市区町村・建物の種類）と工期、お客様のご要望が入ります。", tag: "キッチン" },
  { title: "施工事例 2（外壁）", body: "ここに、施工した場所（市区町村・建物の種類）と工期、お客様のご要望が入ります。", tag: "外壁" },
  { title: "施工事例 3（浴室）", body: "ここに、施工した場所（市区町村・建物の種類）と工期、お客様のご要望が入ります。", tag: "浴室" },
  { title: "施工事例 4（トイレ・洗面）", body: "ここに、施工した場所（市区町村・建物の種類）と工期、お客様のご要望が入ります。", tag: "トイレ・洗面" },
];

export function workPhotos(title: string): { before: Photo; after: Photo } {
  return {
    before: { src: null, alt: `${title}（施工前）`, brief: "施工前の写真（横長）" },
    after: { src: null, alt: `${title}（施工後）`, brief: "施工後の写真（横長）" },
  };
}

export const faqs = [
  { q: "見積もりだけでもお願いできますか？", a: "はい。LINE で写真を送っていただければ、だいたいの金額をお返しします。現地調査とお見積もりは無料です。" },
  { q: "工事中も家にいて大丈夫ですか？", a: "多くの工事はお住まいのままで進められます。水まわりが使えない日は事前にお伝えします。" },
  { q: "どのあたりまで来てもらえますか？", a: "大阪府北部を中心に伺っています。（デモのため対応エリアは架空です）" },
  { q: "支払い方法は？", a: "工事の内容に合わせて、着工時と完成時の分割払いをご相談できます。" },
  { q: "小さな修理でも頼めますか？", a: "網戸の張り替えや建具の調整など、小さな工事もお受けしています。" },
];

export const news = [
  { date: "2026.11.01", body: "年末年始の休業日のお知らせ（デモ用のお知らせです）" },
  { date: "2026.10.15", body: "LINE での写真相談を始めました（デモ用のお知らせです）" },
  { date: "2026.09.20", body: "施工事例を追加しました（デモ用のお知らせです）" },
];

export const contactFields = [
  { id: "name", label: "お名前", type: "text" as const, required: true },
  { id: "tel", label: "電話番号", type: "tel" as const, required: true },
  { id: "area", label: "工事をする場所（市区町村）", type: "text" as const },
  { id: "kind", label: "ご相談の内容", type: "select" as const, options: ["キッチン", "浴室", "トイレ・洗面", "外壁・屋根", "その他"], required: true },
  { id: "date", label: "現地調査のご希望日", type: "date" as const },
];
