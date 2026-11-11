"use client";

import { useEffect } from "react";

// スクロール演出：[data-reveal] の要素を画面に入ったときに浮かび上がらせ、
// トップの円相と縦書きの言葉をスクロール量に合わせて動かす。
// JS が動かない環境や「視差効果を減らす」設定では、すべて最初から表示されたままにする。
export default function ScrollFx() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = document.documentElement;
    const items = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

    // 最初から画面内にある要素は隠さない（ちらつき防止）
    items.forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.92) el.classList.add("is-in");
    });
    root.classList.add("fx");

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );
    items.forEach((el) => {
      if (!el.classList.contains("is-in")) io.observe(el);
    });

    let ticking = false;
    const update = () => {
      ticking = false;
      const p = Math.min(1, Math.max(0, window.scrollY / window.innerHeight));
      root.style.setProperty("--hero-p", p.toFixed(4));
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      root.classList.remove("fx");
    };
  }, []);

  return null;
}
