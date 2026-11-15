import type { Metadata } from "next";
import PageTitle from "../_parts/PageTitle";
import { StorySection } from "../_parts/sections";

export const metadata: Metadata = {
  title: "創業の原点",
  description: "怪我や挫折を経験したサッカーの道から、人が挑戦を続けられる環境をつくりたいと考え、ARA COMPANYを立ち上げました。",
  alternates: { canonical: "/story/" },
  openGraph: { title: "創業の原点｜ARA COMPANY", description: "怪我や挫折を経験したサッカーの道から、人が挑戦を続けられる環境をつくりたいと考え、ARA COMPANYを立ち上げました。", url: "/story/" },
};

export default function Page() {
  return (
    <main id="top">
      <PageTitle en="OUR STORY" ja="創業の原点" />
      <StorySection />
    </main>
  );
}
