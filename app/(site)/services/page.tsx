import type { Metadata } from "next";
import PageHead from "../../components/site/PageHead";
import ServiceCards from "../../components/site/ServiceCards";
import CtaBand from "../../components/site/CtaBand";

export const metadata: Metadata = {
  title: "サービス一覧",
  description: "ARA COMPANY（ARVR TECH）のサービス一覧。ホームページ制作、LP制作、Web広告運用、LINE予約システム、NFC × LINE導入支援の内容と料金の目安。",
  alternates: { canonical: "/services/" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHead
        crumbs={[{ name: "サービス", href: "/services/" }]}
        eyebrow="Services"
        title="サービス一覧"
        lead="Webの入口づくりから、LINEを使った予約・店頭での案内まで。目的に合わせてお選びいただけます。迷ったときは、お気軽にご相談ください。"
      />
      <section className="section" aria-label="サービス">
        <div className="wrap">
          <ServiceCards showPrice headingLevel={2} />
          <ul className="price-notes">
            <li>料金はすべて税込です。「お見積もり」のサービスは、内容を伺ったうえで個別にご案内します。</li>
            <li>LINE予約システムは、NFCタグなしでも単独で導入できます。</li>
          </ul>
        </div>
      </section>
      <CtaBand title="どのサービスが合うか分からないときも" lead="業種と、困っていること・やりたいことをお送りください。合うサービスと進め方をご提案します。" />
    </>
  );
}
