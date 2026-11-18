"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

// 映画のような枠：画面下の黒帯（スクロールの進み具合の線つき）と、四隅の小さな文字。
// 飾りなので読み上げの対象にしない（aria-hidden）。文字は少しずつ書き換えるだけで、操作の邪魔をしない。
const SCENES: Record<string, [string, string]> = {
  "/": ["01", "OPENING"],
  "/about/": ["02", "ABOUT"],
  "/philosophy/": ["03", "PHILOSOPHY"],
  "/business/": ["04", "BUSINESS"],
  "/services/": ["05", "SERVICES"],
  "/story/": ["06", "OUR STORY"],
  "/contact/": ["07", "CONTACT"],
};
const FPS = 24;
const pad = (n: number, w = 2) => String(Math.floor(n)).padStart(w, "0");

export default function CinemaHud() {
  const pathname = usePathname();
  const frameRef = useRef<HTMLSpanElement>(null);
  const tcRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const key = pathname.endsWith("/") ? pathname : `${pathname}/`;
  const [num, name] = SCENES[key] ?? ["00", "SCENE"];

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t0 = performance.now();
    let raf = 0;
    let last = 0;
    const update = (now: number) => {
      raf = requestAnimationFrame(update);
      if (now - last < 1000 / 12) return; // 文字の書き換えは1秒に12回まで
      last = now;
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const p = Math.min(1, Math.max(0, window.scrollY / max));
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
      if (frameRef.current) frameRef.current.textContent = pad(window.scrollY / 6, 4);
      if (tcRef.current && !reduce) {
        const s = (now - t0) / 1000;
        tcRef.current.textContent = `${pad(s / 60)}:${pad(s % 60)}.${pad((s * FPS) % FPS)}`;
      }
    };
    raf = requestAnimationFrame(update);
    const onVis = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden) raf = requestAnimationFrame(update);
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [pathname]);

  return (
    <div className="cinema" aria-hidden="true">
      <div className="cinema-hud cinema-bl">
        <span>SCENE {num} — {name}</span>
        <span>FRAME <span ref={frameRef}>0000</span></span>
        <span className="cinema-tc">TC <span ref={tcRef}>00:00.00</span></span>
      </div>
      <div className="cinema-hud cinema-br">
        <span>OSAKA, JP</span>
        <span>↓ SCROLL TO PROGRESS</span>
      </div>
      <div className="cinema-bar">
        <span ref={barRef} className="cinema-progress" />
      </div>
    </div>
  );
}
