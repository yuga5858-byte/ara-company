import type { Metadata, Viewport } from "next";
import { Yuji_Syuku, Shippori_Mincho, Zen_Kaku_Gothic_New } from "next/font/google";
import "./globals.css";

const brush = Yuji_Syuku({ weight: "400", subsets: ["latin"], preload: false, variable: "--font-brush" });
const mincho = Shippori_Mincho({ weight: ["500", "700"], subsets: ["latin"], preload: false, variable: "--font-mincho" });
const gothic = Zen_Kaku_Gothic_New({ weight: ["400", "500", "700"], subsets: ["latin"], preload: false, variable: "--font-gothic" });

export const metadata: Metadata = {
  title: "ARA COMPANY",
  description: "挑戦するすべての人に、次の可能性を。ARA COMPANYは、ファッションブランド「ORMOSCIA」を起点に、挑戦する人を支える事業を生み出していく会社です。",
};

export const viewport: Viewport = { viewportFit: "cover" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={`${brush.variable} ${mincho.variable} ${gothic.variable}`}>
      <body>{children}</body>
    </html>
  );
}
