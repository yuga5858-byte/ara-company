import "./globals.css";
import { SiteBackground, SiteFooter, SiteHeader } from "./_parts/chrome";

// 公式サイトの全ページ共通：水面の背景・ヘッダー・フッター
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteBackground />
      <SiteHeader />
      {children}
      <SiteFooter />
    </>
  );
}
