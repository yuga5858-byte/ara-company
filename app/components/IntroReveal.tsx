"use client";

import { useEffect } from "react";
import { INTRO_KEY } from "./introScript";

// トップページのオープニング：煙の中から「ARA COMPANY」が浮かび上がり、煙に溶けてからページが現れる。
// - 1回の訪問で1度だけ（sessionStorage）。動きを減らす設定では出さない
// - クリック・キー操作・スクロールで、すぐに飛ばせる
// - html に .intro を付けるのは、表示のちらつきを防ぐため layout の小さなスクリプトで行う（introScript.ts）

const HOLD = 3000; // 文字が見えている時間（ミリ秒）

function puff(x: number, y: number, dx: number, dy: number, amount: number, radius: number) {
  window.dispatchEvent(new CustomEvent("ara:smoke", { detail: { x, y, dx, dy, amount, radius } }));
}

export default function IntroReveal() {
  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains("intro")) return;
    try {
      sessionStorage.setItem(INTRO_KEY, "1");
    } catch {}

    const timers: number[] = [];
    let finished = false;

    const finish = () => {
      if (finished) return;
      finished = true;
      timers.forEach((t) => window.clearTimeout(t));
      cancelAnimationFrame(raf);
      root.classList.remove("intro-play");
      // 文字が煙に溶けるように、左右へ煙を流す
      for (let i = 0; i < 6; i++) {
        const x = 0.38 + i * 0.05;
        puff(x, 0.5, (i - 2.5) * 160, 260, 0.06, 0.002);
      }
      root.classList.add("intro-fading");
      root.classList.remove("intro");
      window.dispatchEvent(new Event("ara:intro-done"));
      timers.push(window.setTimeout(() => root.classList.remove("intro-fading"), 1400));
      window.removeEventListener("pointerdown", finish);
      window.removeEventListener("keydown", finish);
      window.removeEventListener("wheel", finish);
      window.removeEventListener("touchmove", finish);
    };

    // 煙の準備（最初の数フレーム）が終わってから、文字と煙を出し、時間を数え始める
    let raf = requestAnimationFrame(() => {
      raf = requestAnimationFrame(() => {
        root.classList.add("intro-play");
        // 文字のうしろで煙をふくらませる
        timers.push(
          window.setTimeout(() => {
            for (let i = 0; i < 12; i++) {
              const a = (i / 12) * Math.PI * 2;
              puff(0.5 + Math.cos(a) * 0.08, 0.5 + Math.sin(a) * 0.05, Math.cos(a) * 420, Math.sin(a) * 300 + 100, 0.07, 0.003);
            }
          }, 150),
        );
        timers.push(window.setTimeout(finish, HOLD));
      });
    });
    window.addEventListener("pointerdown", finish, { passive: true });
    window.addEventListener("keydown", finish);
    window.addEventListener("wheel", finish, { passive: true });
    window.addEventListener("touchmove", finish, { passive: true });

    return () => {
      finish();
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  return (
    <div className="intro-title" aria-hidden="true">
      <span className="intro-name">ARA COMPANY</span>
      <span className="intro-sub">Create the next scenery.</span>
    </div>
  );
}
