"use client";

import { useEffect } from "react";

// 1ページだった頃のリンク（例：ara-company.jp/#story）で来た人を、分けたページへ案内する
const MAP: Record<string, string> = {
  "#about": "/about/",
  "#philosophy": "/philosophy/",
  "#business": "/business/",
  "#services": "/services/",
  "#story": "/story/",
  "#contact": "/contact/",
  "#ormoscia": "/business/#wear",
  "#wear": "/business/#wear",
  "#technology": "/business/#technology",
  "#sports": "/business/#sports",
  "#community": "/business/#community",
};

export default function LegacyHashRedirect() {
  useEffect(() => {
    const to = MAP[window.location.hash];
    if (to) window.location.replace(to);
  }, []);
  return null;
}
