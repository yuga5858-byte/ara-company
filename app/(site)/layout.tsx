import "./globals.css";
import SiteHeader from "../components/site/SiteHeader";
import SiteFooter from "../components/site/SiteFooter";

// 公式サイトの全ページ共通：ヘッダー・フッター。（制作デモ /demo/ はこのレイアウトを使わない）
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a className="skip" href="#main">本文へ移動</a>
      <SiteHeader />
      <main id="main">{children}</main>
      <SiteFooter />
    </>
  );
}
