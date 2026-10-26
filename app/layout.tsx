import type { Metadata, Viewport } from "next";
import { Archivo, Shippori_Mincho, Zen_Kaku_Gothic_New, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-archivo" });
const mincho = Shippori_Mincho({ weight: ["500", "700"], subsets: ["latin"], preload: false, variable: "--font-mincho" });
const gothic = Zen_Kaku_Gothic_New({ weight: ["400", "500", "700"], subsets: ["latin"], preload: false, variable: "--font-gothic" });
const mono = IBM_Plex_Mono({ weight: ["400", "500"], subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "ARA COMPANY",
  description: "ARA COMPANYは、AI・ブランド・事業支援の3つの事業から始まり、新しい事業を立ち上げ続ける会社です。",
};

export const viewport: Viewport = { viewportFit: "cover" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={`${archivo.variable} ${mincho.variable} ${gothic.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
