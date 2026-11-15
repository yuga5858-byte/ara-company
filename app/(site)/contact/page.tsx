import type { Metadata } from "next";
import PageTitle from "../_parts/PageTitle";
import { ContactSection } from "../_parts/sections";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description: "Web制作・AI導入のご相談、ORMOSCIAに関するお問い合わせ、協業のご相談、取材のご依頼はメールにてご連絡ください。",
  alternates: { canonical: "/contact/" },
  openGraph: { title: "お問い合わせ｜ARA COMPANY", description: "Web制作・AI導入のご相談、ORMOSCIAに関するお問い合わせ、協業のご相談、取材のご依頼はメールにてご連絡ください。", url: "/contact/" },
};

export default function Page() {
  return (
    <main id="top">
      <PageTitle en="CONTACT" ja="お問い合わせ" />
      <ContactSection />
    </main>
  );
}
