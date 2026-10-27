// AI・テクノロジー事業で受け付けているサービス。価格や内容を変えるときはここを編集する。
// 実績はまだないため掲載しない（制作デモは「架空の店舗を想定したデモ」と明記して載せる）。

export type Service = {
  id: string;
  en: string;
  title: string;
  price: string;
  priceNote?: string;
  description: string;
  items: string[];
  subject: string;
};

export const services: Service[] = [
  {
    id: "web",
    en: "Web Production",
    title: "Webサイト制作（HP・LP・EC）",
    price: "39,800円〜",
    priceNote: "税込・参考価格",
    description: "事業や店舗の魅力が伝わるWebサイトを、企画・デザインから公開まで一貫して制作します。",
    items: ["ホームページ（コーポレート・店舗サイト）", "ランディングページ（LP）", "ECサイト（ネットショップ）", "スマートフォン対応・基本的なSEO設定"],
    subject: "Webサイト制作のご相談",
  },
  {
    id: "growth",
    en: "Web Operation",
    title: "Web運用・改善支援",
    price: "お見積り",
    description: "公開後のサイトを、更新しやすく、成果につながる状態に保つための運用と改善をお手伝いします。",
    items: ["お知らせ・商品情報などの更新作業", "アクセス状況をもとにした改善のご提案", "表示速度・スマートフォン表示の改善"],
    subject: "Web運用・改善支援のご相談",
  },
  {
    id: "ai",
    en: "AI Integration",
    title: "AIシステム導入支援",
    price: "お見積り",
    description: "日々の業務を整理し、AIを使うと効果が出やすいところから、無理なく導入できる形をご提案します。",
    items: ["業務の棚卸しとAI活用のご提案", "生成AIを使った業務ツールの開発", "導入後の使い方のサポート"],
    subject: "AIシステム導入支援のご相談",
  },
];

export const PRICE_NOTE =
  "39,800円〜は参考価格です。ページ数・機能・原稿や写真のご用意状況によって変わるため、正式な金額はお見積りにてご案内します。";

export const flow = [
  { title: "メールでご相談", body: "作りたいもの、ご予算、ご希望の時期などをお送りください。" },
  { title: "ヒアリング・お見積り", body: "内容を伺い、制作範囲とお見積りをご案内します。" },
  { title: "制作・ご確認", body: "デザインと実装を進め、確認いただきながら仕上げます。" },
  { title: "公開・運用", body: "公開作業を行います。必要に応じて運用・改善もお手伝いします。" },
];

// 営業用の制作デモ。架空の店舗であることを必ず明記する。
export const demos = [
  {
    href: "/demo/gym/",
    industry: "パーソナルジム",
    name: "ATELIER KINETIC",
    tone: "ブラック・チャコールを基調にした、力強く上質なLP",
    variant: "gym",
  },
  {
    href: "/demo/salon/",
    industry: "プライベート美容サロン",
    name: "Salon Soyeux",
    tone: "アイボリー・ベージュを基調にした、清潔感のあるLP",
    variant: "salon",
  },
] as const;
