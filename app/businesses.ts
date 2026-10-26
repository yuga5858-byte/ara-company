// 事業を追加するときは、この配列に1件足すだけでトップの枠と事業内容に反映されます。
export type Business = {
  id: string;
  code: string;
  name: string;
  short: string;
  kanji: string;
  title: string;
  description: string;
  services: { label: string; tag: string }[];
};

export const businesses: Business[] = [
  {
    id: "ai",
    code: "BU-01",
    name: "AI",
    short: "AI導入・活用",
    kanji: "智",
    title: "AI導入・活用支援",
    description:
      "生成AIを「試してみた」で終わらせず、毎日の業務で使われる仕組みにします。現場の業務を棚卸しし、効果の出るところから導入します。",
    services: [
      { label: "生成AIの業務活用設計", tag: "CONSULT" },
      { label: "業務自動化・社内ツール開発", tag: "BUILD" },
      { label: "AI研修・社内定着サポート", tag: "TRAIN" },
    ],
  },
  {
    id: "brand",
    code: "BU-02",
    name: "BRAND",
    short: "ブランドづくり",
    kanji: "印",
    title: "ブランド開発",
    description:
      "新しいブランドの立ち上げから、既存ブランドの見直しまで。コンセプトを言葉にし、ロゴやWebサイト、SNSまで一貫した表現に落とし込みます。",
    services: [
      { label: "コンセプト・ネーミング設計", tag: "STRATEGY" },
      { label: "ロゴ・VI・パッケージデザイン", tag: "DESIGN" },
      { label: "Webサイト・SNS運用", tag: "MEDIA" },
    ],
  },
  {
    id: "support",
    code: "BU-03",
    name: "SUPPORT",
    short: "事業支援",
    kanji: "支",
    title: "事業支援",
    description:
      "新規事業の立ち上げや、伸び悩む事業のテコ入れを伴走型で支援します。計画づくりだけでなく、集客や運営の実務まで一緒に動きます。",
    services: [
      { label: "新規事業の立ち上げ支援", tag: "LAUNCH" },
      { label: "集客・販路開拓", tag: "GROWTH" },
      { label: "運営体制づくり・伴走", tag: "OPERATE" },
    ],
  },
];

// トップの「事業ポートフォリオ」に並べる枠の数
export const SLOT_COUNT = 6;
