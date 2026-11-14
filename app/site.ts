// サイト全体の基本情報。手続きや体制が変わったら、ここだけ更新すれば各所に反映される。
//
// 現在：2026-11-02 に個人事業として開業（開業届・青色申告承認申請書は提出済み）。法人登記はしていない。
// ARA COMPANY は屋号（事業名）として表記する。
// 「株式会社」「法人」「設立済み」などの表現は、実際に手続きが済むまで使わないこと。

export type ProfileRow = { label: string; value: string };

export const site = {
  name: "ARA COMPANY",
  base: "大阪府",
  stage: "個人事業として運営（2026年11月開業）",
  policy: "ファッションを起点に、将来的にはAI・テクノロジー、スポーツ支援、コミュニティ事業などへ展開する。",

  // 法人化した後に設定する（個人事業の間は使わない）。null の項目はサイトに表示しない。
  legal: {
    entityName: null as string | null, // 例：「株式会社〇〇」
    representative: null as string | null,
    established: null as string | null,
    corporateNumber: null as string | null,
    address: null as string | null, // 設定すると「活動拠点」の代わりに「所在地」を表示
  },

  // 公式メールアドレス。設定するとCONTACTセクションとメールボタンを表示する。
  email: "aracompany.office@gmail.com" as string | null,

  // フォームの送信先。設定するまでフォームは表示しない（メールでの受付のみ）。
  contactEndpoint: null as string | null,

  // ORMOSCIA 公式サイト（公開済み）。ドメインを変えたら NEXT_PUBLIC_ORMOSCIA_URL で上書きする。
  ormosciaUrl: (process.env.NEXT_PUBLIC_ORMOSCIA_URL || "https://ormoscia.ara-official.workers.dev").replace(/\/$/, "") as string | null,
};

// 公開URL（独自ドメイン）。canonical・sitemap・OGP の URL に使う。
// ビルド環境の設定に左右されないよう、コードで固定する。
export const siteUrl = "https://ara-company.jp";

// Web・AI事業ブランド ARVR TECH（別サイト）。
// 公開URL（独自ドメイン）。ビルド環境の設定に左右されないよう、コードで固定する。
export const solutions = {
  name: "ARVR TECH",
  url: "https://tech.ara-company.jp" as string | null,
  relation: "ARVR TECHは、ARA COMPANYが展開するWeb・AI事業ブランドです。",
};

export const contactEnabled = site.email !== null;
export const formEnabled = site.contactEndpoint !== null;

export function mailtoHref(subject = "お問い合わせ") {
  return `mailto:${site.email}?subject=${encodeURIComponent(`【${site.name}】${subject}`)}`;
}

// Gmail の作成画面を開くURL（メールアプリが無い端末向け）
export function gmailHref(subject = "お問い合わせ") {
  const su = encodeURIComponent(`【${site.name}】${subject}`);
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${site.email}&su=${su}`;
}

export function profileRows(brands: string, services: string): ProfileRow[] {
  const { legal } = site;
  const rows: (ProfileRow | null)[] = [
    legal.entityName ? { label: "名称", value: legal.entityName } : { label: "事業名", value: site.name },
    legal.representative ? { label: "代表者", value: legal.representative } : null,
    legal.established ? { label: "設立", value: legal.established } : null,
    legal.corporateNumber ? { label: "法人番号", value: legal.corporateNumber } : null,
    legal.address ? { label: "所在地", value: legal.address } : { label: "活動拠点", value: site.base },
    { label: "展開ブランド", value: brands },
    { label: "提供サービス", value: services },
    { label: "事業方針", value: site.policy },
    legal.entityName ? null : { label: "現在の状況", value: site.stage },
  ];
  return rows.filter((r): r is ProfileRow => r !== null);
}
