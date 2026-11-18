import "./globals.css";
import { SiteBackground, SiteFooter, SiteHeader } from "./_parts/chrome";
import { INTRO_SCRIPT } from "../components/introScript";

// 公式サイトの全ページ共通：煙の背景・映画風の枠・ヘッダー・フッター
// 最初のスクリプトは、トップのオープニングを出すかを、ページが描かれる前に決める（introScript.ts）
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: INTRO_SCRIPT }} />
      <SiteBackground />
      <SiteHeader />
      {children}
      <SiteFooter />
    </>
  );
}
