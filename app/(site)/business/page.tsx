import type { Metadata } from "next";
import PageTitle from "../_parts/PageTitle";
import { BusinessSection } from "../_parts/sections";

export const metadata: Metadata = {
  title: "事業構想",
  description: "アパレル事業「ORMO WEAR」とブランド「BEyond Station」（立ち上げ準備中）、Web・AI事業「ARVR TECH」（ご相談受付中）、アスリートのキャリア支援とコミュニティ（将来構想）。",
  alternates: { canonical: "/business/" },
  openGraph: { title: "事業構想｜ORMO COMPANY", description: "アパレル事業「ORMO WEAR」とブランド「BEyond Station」（立ち上げ準備中）、Web・AI事業「ARVR TECH」（ご相談受付中）、アスリートのキャリア支援とコミュニティ（将来構想）。", url: "/business/" },
};

export default function Page() {
  return (
    <main id="top">
      <PageTitle en="BUSINESS" ja="事業構想" />
      <BusinessSection />
    </main>
  );
}
