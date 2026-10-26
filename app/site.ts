// サイト全体の基本情報。手続きや体制が変わったら、ここだけ更新すれば各所に反映される。
//
// 現在：法人登記・開業届は未提出。ARA COMPANY は事業名として表記する。
// 「株式会社」「法人」「設立済み」などの表現は、実際に手続きが済むまで使わないこと。

export type ProfileRow = { label: string; value: string };

export const site = {
  name: "ARA COMPANY",
  base: "大阪府",
  stage: "事業立ち上げの準備段階",
  policy: "ファッションを起点に、将来的にはAI・テクノロジー、スポーツ支援、コミュニティ事業などへ展開する。",

  // 法人化・開業届の提出後に設定する。null の項目はサイトに表示しない。
  legal: {
    entityName: null as string | null, // 例：「株式会社〇〇」
    representative: null as string | null,
    established: null as string | null,
    corporateNumber: null as string | null,
    address: null as string | null, // 設定すると「活動拠点」の代わりに「所在地」を表示
  },

  // お問い合わせの送信先。設定するまでフォームとCONTACTの導線は表示しない。
  contactEndpoint: null as string | null,

  // ORMOSCIA の公式サイトが公開されたら URL を入れる。
  ormosciaUrl: null as string | null,
};

export const contactEnabled = site.contactEndpoint !== null;

export function profileRows(brands: string): ProfileRow[] {
  const { legal } = site;
  const rows: (ProfileRow | null)[] = [
    legal.entityName ? { label: "名称", value: legal.entityName } : { label: "事業名", value: site.name },
    legal.representative ? { label: "代表者", value: legal.representative } : null,
    legal.established ? { label: "設立", value: legal.established } : null,
    legal.corporateNumber ? { label: "法人番号", value: legal.corporateNumber } : null,
    legal.address ? { label: "所在地", value: legal.address } : { label: "活動拠点", value: site.base },
    { label: "展開ブランド", value: brands },
    { label: "事業方針", value: site.policy },
    legal.entityName ? null : { label: "現在の状況", value: site.stage },
  ];
  return rows.filter((r): r is ProfileRow => r !== null);
}
