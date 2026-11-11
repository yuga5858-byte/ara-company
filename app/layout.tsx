import type { Metadata, Viewport } from "next";
import { Yuji_Syuku, Shippori_Mincho, Zen_Kaku_Gothic_New, Archivo, Cormorant_Garamond, Noto_Serif_JP, Noto_Sans_JP } from "next/font/google";
import "./base.css";
import { site, siteUrl } from "./site";

// 公式サイト用（2026-11 リニューアル：Noto Serif JP・Noto Sans JP・Cormorant Garamond）
const serif = Noto_Serif_JP({ weight: ["400", "500", "700"], subsets: ["latin"], preload: false, variable: "--font-serif" });
const sans = Noto_Sans_JP({ weight: ["400", "500"], subsets: ["latin"], preload: false, variable: "--font-sans" });
// 旧デザイン・制作デモで使う書体
const brush = Yuji_Syuku({ weight: "400", subsets: ["latin"], preload: false, variable: "--font-brush" });
const mincho = Shippori_Mincho({ weight: ["500", "700"], subsets: ["latin"], preload: false, variable: "--font-mincho" });
const gothic = Zen_Kaku_Gothic_New({ weight: ["400", "500", "700"], subsets: ["latin"], preload: false, variable: "--font-gothic" });
// 制作デモ用（使われるページでだけ読み込まれる）
const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"], preload: false, variable: "--font-archivo" });
const cormorant = Cormorant_Garamond({ weight: ["400", "500", "600"], style: ["normal", "italic"], subsets: ["latin"], preload: false, variable: "--font-cormorant" });

const DESCRIPTION =
  "挑戦が、次の景色をつくる。ARA COMPANYは大阪府を拠点に、ファッションブランド「ORMOSCIA」の立ち上げ準備と、Webサイト制作・運用改善・AIシステム導入支援に取り組んでいます。";

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title: { default: `${site.name}｜挑戦が、次の景色をつくる。`, template: `%s｜${site.name}` },
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: site.name,
    title: site.name,
    description: DESCRIPTION,
  },
  twitter: { card: "summary", title: site.name, description: DESCRIPTION },
  alternates: siteUrl ? { canonical: "/" } : undefined,
};

export const viewport: Viewport = { viewportFit: "cover", themeColor: "#0B0B0B" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const fonts = [serif, sans, brush, mincho, gothic, archivo, cormorant].map((f) => f.variable).join(" ");
  return (
    <html lang="ja" className={fonts}>
      <body>{children}</body>
    </html>
  );
}
