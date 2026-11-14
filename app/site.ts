// サイト全体の基本情報。手続きや体制が変わったら、ここだけ更新すれば各所に反映される。
//
// 2026-11-14 社長の指示で、サイトは ARVR TECH の事業（Web・LINE・NFC）だけを扱う構成に変更。
// ファッション（ORMOSCIA）などの事業構想・OUR STORY は載せない（旧サイトはブランチ backup/site-before-renewal-2026-11 と git の履歴に残る）。
//
// 現在：2026-11-02 に個人事業として開業（開業届・青色申告承認申請書は提出済み）。法人登記はしていない。
// ARA COMPANY は屋号（事業名）として表記する。
// 「株式会社」「法人」「設立済み」などの表現は、実際に手続きが済むまで使わないこと。

export type ProfileRow = { label: string; value: string };

export const site = {
  name: "ARA COMPANY",
  base: "大阪府",
  stage: "個人事業（2026年11月開業）",
  // ARA COMPANY の理念（旧サイトの企業理念から）
  purpose: "挑戦するすべての人に、次の可能性を。",

  // 法人化した後に設定する（個人事業の間は使わない）。null の項目はサイトに表示しない。
  legal: {
    entityName: null as string | null, // 例：「株式会社〇〇」
    representative: null as string | null, // 代表者名を載せる場合はここに入れる（社長の判断）
    established: null as string | null,
    corporateNumber: null as string | null,
    address: null as string | null, // 設定すると「活動拠点」の代わりに「所在地」を表示
  },

  // 公式メールアドレス。お問い合わせはこのアドレスに統一する。
  email: "aracompany.office@gmail.com" as string | null,

  // フォームの送信先。設定するまでフォームは表示しない（メールでの受付のみ）。
  contactEndpoint: null as string | null,
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

export function mailtoHref(subject = "お問い合わせ", body = "") {
  const b = body ? `&body=${encodeURIComponent(body)}` : "";
  return `mailto:${site.email}?subject=${encodeURIComponent(`【${site.name}】${subject}`)}${b}`;
}

// Gmail の作成画面を開くURL（メールアプリが無い端末向け）
export function gmailHref(subject = "お問い合わせ", body = "") {
  const su = encodeURIComponent(`【${site.name}】${subject}`);
  const b = body ? `&body=${encodeURIComponent(body)}` : "";
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${site.email}&su=${su}${b}`;
}

export function profileRows(): ProfileRow[] {
  const { legal } = site;
  const rows: (ProfileRow | null)[] = [
    legal.entityName ? { label: "名称", value: legal.entityName } : { label: "事業名", value: site.name },
    legal.representative ? { label: "代表者", value: legal.representative } : null,
    legal.established ? { label: "設立", value: legal.established } : null,
    legal.corporateNumber ? { label: "法人番号", value: legal.corporateNumber } : null,
    legal.entityName ? null : { label: "事業形態", value: site.stage },
    legal.address ? { label: "所在地", value: legal.address } : { label: "活動拠点", value: site.base },
    { label: "ブランド", value: `${solutions.name}（Web・AI事業）` },
    { label: "事業内容", value: "ホームページ・LP制作、Web広告運用のご相談、LINE予約システム・NFC × LINEの導入支援" },
    site.email ? { label: "お問い合わせ", value: site.email } : null,
  ];
  return rows.filter((r): r is ProfileRow => r !== null);
}
