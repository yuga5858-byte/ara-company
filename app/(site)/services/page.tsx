import type { Metadata } from "next";
import PageTitle from "../_parts/PageTitle";
import { ServicesSection } from "../_parts/sections";

export const metadata: Metadata = {
  title: "Web制作・AI導入",
  description: "Webサイト制作・Web運用改善・AIシステム導入支援。料金の目安、ご相談の流れ、制作デモ。",
  alternates: { canonical: "/services/" },
  openGraph: { title: "Web制作・AI導入｜ARA COMPANY", description: "Webサイト制作・Web運用改善・AIシステム導入支援。料金の目安、ご相談の流れ、制作デモ。", url: "/services/" },
};

export default function Page() {
  return (
    <main id="top">
      <PageTitle en="SERVICES" ja="Web制作・AI導入" />
      <ServicesSection />
    </main>
  );
}
