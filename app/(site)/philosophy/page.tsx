import type { Metadata } from "next";
import PageTitle from "../_parts/PageTitle";
import { PhilosophySection } from "../_parts/sections";

export const metadata: Metadata = {
  title: "企業理念",
  description: "挑戦するすべての人に、次の可能性を。ARA COMPANYの経営理念・使命・目指す未来・5つの価値観。",
  alternates: { canonical: "/philosophy/" },
  openGraph: { title: "企業理念｜ARA COMPANY", description: "挑戦するすべての人に、次の可能性を。ARA COMPANYの経営理念・使命・目指す未来・5つの価値観。", url: "/philosophy/" },
};

export default function Page() {
  return (
    <main id="top">
      <PageTitle en="PHILOSOPHY" ja="企業理念" />
      <PhilosophySection />
    </main>
  );
}
