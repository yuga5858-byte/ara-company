"use client";

import { useEffect } from "react";

// 旧サイト（1ページ構成）のページ内リンク（/#services など）で来た人を、新しいページへ案内する。
const map: Record<string, string> = {
  "#services": "/services/",
  "#about": "/about/",
  "#philosophy": "/about/",
  "#business": "/about/",
  "#story": "/about/",
  "#contact": "/contact/",
};

export default function HashRedirect() {
  useEffect(() => {
    const to = map[window.location.hash];
    if (to) window.location.replace(to);
  }, []);
  return null;
}
