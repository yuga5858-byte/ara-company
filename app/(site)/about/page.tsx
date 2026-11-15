import type { Metadata } from "next";
import PageTitle from "../_parts/PageTitle";
import { AboutSection } from "../_parts/sections";

export const metadata: Metadata = {
  title: "私たちについて",
  description: "ARA COMPANYは大阪府を拠点とする個人事業です。ファッションブランド「ORMOSCIA」の立ち上げ準備と、Webサイト制作・AI導入支援に取り組んでいます。",
  alternates: { canonical: "/about/" },
  openGraph: { title: "私たちについて｜ARA COMPANY", description: "ARA COMPANYは大阪府を拠点とする個人事業です。ファッションブランド「ORMOSCIA」の立ち上げ準備と、Webサイト制作・AI導入支援に取り組んでいます。", url: "/about/" },
};

export default function Page() {
  return (
    <main id="top">
      <PageTitle en="ABOUT" ja="私たちについて" />
      <AboutSection />
    </main>
  );
}
