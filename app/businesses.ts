// 事業を追加・更新するときは、この配列を編集するとトップの印と事業セクションに反映されます。
// status は実態に合わせること（準備中・構想段階の事業を「運営中」にしない）。
export type BusinessStatus = "active" | "preparing" | "concept" | "future";

export type Business = {
  id: string;
  name: string;
  category: string;
  kanji: string;
  title: string;
  status: BusinessStatus;
  description: string;
  // 設定すると事業紹介に「お問い合わせ」への導線を出す
  inquiry?: { label: string; subject: string };
};

export const statusLabel: Record<BusinessStatus, string> = {
  active: "運営中",
  preparing: "立ち上げ準備中",
  concept: "構想段階",
  future: "将来構想",
};

export const businesses: Business[] = [
  {
    id: "ormoscia",
    name: "ORMOSCIA",
    category: "Fashion & Culture",
    kanji: "装",
    title: "ORMOSCIA",
    status: "preparing",
    description:
      "立ち上げ準備中のファッションブランド。シンプルながら独自性のあるデザインを通じて、ファッションとスポーツカルチャーの融合を目指します。",
  },
  {
    id: "technology",
    name: "AI & TECHNOLOGY",
    category: "Technology",
    kanji: "智",
    title: "AI・テクノロジー",
    status: "concept",
    description: "AIやデジタル技術を活用し、新しい価値や業務効率化の仕組みを生み出します。",
    inquiry: { label: "AI・テクノロジーについて相談する", subject: "AI・テクノロジーについて" },
  },
  {
    id: "sports",
    name: "SPORTS SUPPORT",
    category: "Sports",
    kanji: "支",
    title: "スポーツ支援",
    status: "future",
    description:
      "怪我や挫折を経験したアスリートが、競技や新しい人生の目標に挑戦し続けられるよう支援します。",
  },
  {
    id: "community",
    name: "COMMUNITY",
    category: "Community",
    kanji: "縁",
    title: "コミュニティ",
    status: "future",
    description: "人と人がつながり、安心して過ごせる場所や交流の機会を生み出します。",
  },
];

// 印を朱で塗る（主力として扱う）事業。準備中を含む。
export const isLead = (b: Business) => b.status === "active" || b.status === "preparing";
