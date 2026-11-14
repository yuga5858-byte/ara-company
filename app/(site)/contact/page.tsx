import Link from "next/link";
import type { Metadata } from "next";
import { formEnabled } from "../../site";
import PageHead from "../../components/site/PageHead";
import MailContact from "../../components/site/MailContact";
import ContactForm from "../../components/ContactForm";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description: "ARA COMPANY（ARVR TECH）へのお問い合わせ。ホームページ・LP制作、Web広告運用、LINE予約システム、NFC × LINE導入支援のご相談はメールで受け付けています。",
  alternates: { canonical: "/contact/" },
};

const steps = [
  { title: "メールを送る", body: "下のボタンからメールを作成し、業種とご相談内容をお送りください。" },
  { title: "返信", body: "内容を確認し、メールでご返信します。必要に応じて、詳しくお話を伺う日程を調整します。" },
  { title: "ご提案・お見積もり", body: "内容に合わせて、進め方と費用をご案内します。ご依頼いただくかは、その後にご判断ください。" },
];

export default function ContactPage() {
  return (
    <>
      <PageHead
        crumbs={[{ name: "お問い合わせ", href: "/contact/" }]}
        eyebrow="Contact"
        title="お問い合わせ"
        lead="お問い合わせは、メールで受け付けています。内容が固まっていなくても大丈夫です。"
      />
      <section className="section" aria-labelledby="h-mail">
        <div className="wrap split">
          <div style={{ display: "grid", gap: 24, alignContent: "start" }}>
            <div className="sec-head" style={{ marginBottom: 0 }}><h2 id="h-mail">メールでのお問い合わせ</h2></div>
            <div className="prose">
              <p>メールに次の内容を書いていただくと、スムーズにご案内できます。</p>
              <ul className="price-notes" style={{ marginTop: 0 }}>
                <li>業種・会社名や店舗名</li>
                <li>ご相談内容（新しく作りたい、今のサイトを直したい、LINEで予約を受けたい など）</li>
                <li>ご希望の時期・ご予算（決まっていれば）</li>
              </ul>
            </div>
          </div>
          <div style={{ display: "grid", gap: 28 }}>
            <MailContact />
            {formEnabled && <ContactForm />}
          </div>
        </div>
      </section>
      <section className="section alt" aria-labelledby="h-after">
        <div className="wrap">
          <div className="sec-head"><h2 id="h-after">お問い合わせのあと</h2></div>
          <ol className="flow">{steps.map((s) => <li key={s.title}><h3>{s.title}</h3><p>{s.body}</p></li>)}</ol>
          <p className="note">お預かりした個人情報は、<Link className="text-link" href="/privacy/">プライバシーポリシー</Link>に沿って取り扱います。</p>
        </div>
      </section>
    </>
  );
}
