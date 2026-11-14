import type { Metadata } from "next";
import { site } from "../../site";
import PageHead from "../../components/site/PageHead";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description: "ARA COMPANYのプライバシーポリシー。お問い合わせでお預かりする個人情報の取り扱いについて。",
  alternates: { canonical: "/privacy/" },
};

// 制定日・内容は社長の確認後に確定する（2026-11-14 草案）。
const ENACTED = "2026年11月14日";

export default function PrivacyPage() {
  return (
    <>
      <PageHead crumbs={[{ name: "プライバシーポリシー", href: "/privacy/" }]} eyebrow="Privacy Policy" title="プライバシーポリシー" />
      <section className="section">
        <div className="wrap-narrow doc">
          <p>{site.name}（以下「当事業」）は、お問い合わせなどでお預かりする個人情報を、以下のとおり取り扱います。</p>

          <section aria-labelledby="p1">
            <h2 id="p1">1. 取得する情報</h2>
            <p>当事業は、メールでのお問い合わせの際に、次の情報をお預かりします。</p>
            <ul>
              <li>お名前、会社名・店舗名</li>
              <li>メールアドレス</li>
              <li>お問い合わせの内容、そのほかメールに記載された情報</li>
            </ul>
          </section>

          <section aria-labelledby="p2">
            <h2 id="p2">2. 利用目的</h2>
            <ul>
              <li>お問い合わせへの回答・ご連絡のため</li>
              <li>ご依頼内容の確認、ご提案・お見積もり、契約・業務の遂行のため</li>
            </ul>
            <p>これらの目的以外には利用しません。</p>
          </section>

          <section aria-labelledby="p3">
            <h2 id="p3">3. 第三者への提供</h2>
            <p>法令に基づく場合を除き、ご本人の同意なく第三者に個人情報を提供しません。</p>
          </section>

          <section aria-labelledby="p4">
            <h2 id="p4">4. 外部サービスの利用</h2>
            <ul>
              <li>メールの送受信には、Google LLC が提供する Gmail を利用しています。</li>
              <li>このサイトの配信には Cloudflare, Inc. のサービスを利用しており、閲覧時の通信情報（IPアドレスなど）が配信のために処理される場合があります。</li>
            </ul>
            <p>アクセス解析ツールなどを新たに導入する場合は、このページでお知らせします。</p>
          </section>

          <section aria-labelledby="p5">
            <h2 id="p5">5. 安全管理</h2>
            <p>お預かりした個人情報は、漏えい・紛失などが起きないよう適切に管理し、必要がなくなった場合は削除します。</p>
          </section>

          <section aria-labelledby="p6">
            <h2 id="p6">6. 開示・訂正・削除のご請求</h2>
            <p>ご本人から個人情報の開示・訂正・利用停止・削除などのご請求があった場合は、ご本人であることを確認したうえで対応します。下記のお問い合わせ先までご連絡ください。</p>
          </section>

          <section aria-labelledby="p7">
            <h2 id="p7">7. お問い合わせ先</h2>
            <p>{site.name}（{site.stage}・{site.base}）<br />メール：{site.email}</p>
          </section>

          <section aria-labelledby="p8">
            <h2 id="p8">8. 改定</h2>
            <p>このポリシーの内容は、必要に応じて変更することがあります。変更後の内容は、このページに掲載した時点から適用します。</p>
            <p>制定：{ENACTED}</p>
          </section>
        </div>
      </section>
    </>
  );
}
