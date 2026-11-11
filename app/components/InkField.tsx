"use client";

import { useEffect, useRef } from "react";

// ファーストビューの背景：墨が水の中でゆっくり広がる様子を、軽い Canvas 2D で描く。
// - 3D や外部ライブラリは使わない。煙のすじを持つ画像を起動時に数枚だけ作り、それを薄く重ねて墨を表す
// - 毎フレーム墨黒で塗り直し、すじのある煙の画像をゆっくり回しながら重ねて、墨の揺らぎを出す
// - マウス（指）の近くの墨はそっと押しのけられ、スクロールすると墨は上へ流れて薄くなる
// - 30fps に抑え、画面外やタブが裏にあるときは止める。スマホでは粒の数と解像度を下げる
// - 動きを減らす設定では、少し進めた状態の1枚だけを描いて止める（静止背景）

type Puff = { x: number; y: number; vx: number; vy: number; r: number; rMax: number; age: number; life: number; a: number; shu: boolean; rot: number; spin: number; tex: number };

const SUMI = "11, 11, 11";

// 煙・墨のすじを持つ柔らかい円（値ノイズを重ねて作る）。起動時に数枚だけ作り、以後は使い回す
function makeSprite(rgb: string, seed: number) {
  const s = 128;
  const c = document.createElement("canvas");
  c.width = c.height = s;
  const g = c.getContext("2d")!;
  const img = g.createImageData(s, s);
  let st = seed * 9301 + 49297;
  const rnd = () => ((st = (st * 9301 + 49297) % 233280) / 233280);
  const grid = (n: number) => Array.from({ length: (n + 1) * (n + 1) }, rnd);
  const octaves = [4, 8, 16].map((n) => ({ n, v: grid(n) }));
  const sm = (t: number) => t * t * (3 - 2 * t);
  const noise = (x: number, y: number) => {
    let sum = 0, amp = 0.55, tot = 0;
    for (const o of octaves) {
      const fx = x * o.n, fy = y * o.n, ix = Math.floor(fx), iy = Math.floor(fy), tx = sm(fx - ix), ty = sm(fy - iy);
      const at = (i: number, j: number) => o.v[Math.min(o.n, j) * (o.n + 1) + Math.min(o.n, i)];
      const a = at(ix, iy) + (at(ix + 1, iy) - at(ix, iy)) * tx;
      const b = at(ix, iy + 1) + (at(ix + 1, iy + 1) - at(ix, iy + 1)) * tx;
      sum += (a + (b - a) * ty) * amp; tot += amp; amp *= 0.5;
    }
    return sum / tot;
  };
  const [r, gg, b] = rgb.split(",").map((v) => Number(v.trim()));
  for (let y = 0; y < s; y++) {
    for (let x = 0; x < s; x++) {
      const dx = x / s - 0.5, dy = y / s - 0.5, d = Math.sqrt(dx * dx + dy * dy) * 2;
      const fall = Math.max(0, 1 - d);
      const n = noise(x / s, y / s);
      const a = Math.pow(fall, 1.4) * Math.max(0, Math.min(1, (n - 0.27) * 2.5));
      const i = (y * s + x) * 4;
      img.data[i] = r; img.data[i + 1] = gg; img.data[i + 2] = b; img.data[i + 3] = Math.round(a * 255);
    }
  }
  g.putImageData(img, 0, 0);
  return c;
}

export default function InkField({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.matchMedia("(max-width: 760px)").matches;
    const scale = small ? 0.38 : 0.5; // 表示サイズに対する描画解像度（ぼけは墨らしさとして生かす）
    const count = small ? 42 : 66;
    const kinari = [1, 2, 3].map((k) => makeSprite("234, 229, 219", k));
    const shu = makeSprite("164, 61, 48", 7);

    let w = 0, h = 0;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = Math.max(1, Math.round(rect.width * scale));
      h = Math.max(1, Math.round(rect.height * scale));
      canvas.width = w;
      canvas.height = h;
      ctx.fillStyle = `rgb(${SUMI})`;
      ctx.fillRect(0, 0, w, h);
    };
    resize();

    // 墨を落とす点（ゆっくり漂う）。中央やや下から立ちのぼる
    const sources = [0, 1, 2].map((i) => ({ phase: i * 2.1, rx: 0.16 + i * 0.05, ry: 0.08 + i * 0.03 }));
    const pointer = { x: -9999, y: -9999, active: false };
    let scrollP = 0;
    let t = 0;

    const spawn = (p?: Puff): Puff => {
      const s = sources[Math.floor(Math.random() * sources.length)];
      const cx = w * (0.5 + Math.cos(t * 0.00012 + s.phase) * s.rx);
      const cy = h * (0.62 + Math.sin(t * 0.00009 + s.phase) * s.ry);
      const puff = p ?? ({} as Puff);
      puff.x = cx + (Math.random() - 0.5) * w * 0.08;
      puff.y = cy + (Math.random() - 0.5) * h * 0.06;
      puff.vx = (Math.random() - 0.5) * 0.15;
      puff.vy = -0.05 - Math.random() * 0.12;
      puff.r = (small ? 14 : 22) + Math.random() * 14;
      puff.rMax = (small ? 110 : 170) + Math.random() * (small ? 80 : 170);
      puff.rot = Math.random() * Math.PI * 2;
      puff.spin = (Math.random() - 0.5) * 0.0016;
      puff.tex = Math.floor(Math.random() * 3);
      puff.age = 0;
      puff.life = 520 + Math.random() * 520;
      puff.shu = Math.random() < 0.05; // ごくまれに朱が混じる
      puff.a = puff.shu ? 0.13 : 0.09 + Math.random() * 0.08;
      return puff;
    };
    const puffs: Puff[] = Array.from({ length: count }, () => {
      const p = spawn();
      p.age = Math.random() * p.life; // 最初から広がった状態を混ぜる
      return p;
    });

    // 水の流れ：いくつかの正弦波を重ねた、ゆっくり変化する流れの向き
    const flow = (x: number, y: number) => {
      const k = 1 / scale;
      const a =
        Math.sin(x * 0.0042 * k + t * 0.00021) * Math.cos(y * 0.0051 * k - t * 0.00017) +
        Math.sin((x + y) * 0.0027 * k + t * 0.00011) * 0.6;
      return a * Math.PI;
    };

    const step = () => {
      t += 33;
      // 毎フレーム墨黒で塗り直す（明るさが積み重なって白く飛ばないように）
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;
      ctx.fillStyle = `rgb(${SUMI})`;
      ctx.fillRect(0, 0, w, h);

      const lift = scrollP * 0.9;
      for (const p of puffs) {
        p.age += 1;
        if (p.age > p.life) spawn(p);
        const ang = flow(p.x, p.y);
        p.vx += Math.cos(ang) * 0.012;
        p.vy += Math.sin(ang) * 0.012 - 0.002 - lift * 0.01;
        if (pointer.active) {
          const dx = p.x - pointer.x, dy = p.y - pointer.y;
          const d2 = dx * dx + dy * dy, R = (small ? 60 : 110);
          if (d2 < R * R && d2 > 1) {
            const f = (1 - Math.sqrt(d2) / R) * 0.06;
            p.vx += (dx / Math.sqrt(d2)) * f;
            p.vy += (dy / Math.sqrt(d2)) * f;
          }
        }
        p.vx *= 0.975;
        p.vy *= 0.975;
        p.x += p.vx;
        p.y += p.vy;
        const k = p.age / p.life;
        p.r += (p.rMax - p.r) * 0.004;
        // 生まれてすぐ濃く、ゆっくり薄れる
        const env = Math.min(1, k * 6) * Math.pow(1 - k, 1.6);
        ctx.globalAlpha = p.a * env * (1 - scrollP * 0.6);
        p.rot += p.spin;
        const cos = Math.cos(p.rot), sin = Math.sin(p.rot);
        ctx.setTransform(cos, sin, -sin, cos, p.x, p.y);
        const d = p.r * 2;
        ctx.drawImage(p.shu ? shu : kinari[p.tex], -p.r, -p.r, d, d);
      }
    };

    if (reduce) {
      for (let i = 0; i < 260; i++) step();
      return; // 静止背景
    }

    let raf = 0, last = 0, visible = true, running = false;
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (now - last < 32) return; // 約30fps
      last = now;
      step();
    };
    const start = () => { if (!running && visible && !document.hidden) { running = true; raf = requestAnimationFrame(loop); } };
    const stop = () => { running = false; cancelAnimationFrame(raf); };

    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) start(); else stop(); });
    io.observe(canvas);
    const onVis = () => (document.hidden ? stop() : start());
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = (e.clientX - rect.left) * scale;
      pointer.y = (e.clientY - rect.top) * scale;
      pointer.active = true;
    };
    const onLeave = () => { pointer.active = false; };
    const onScroll = () => { scrollP = Math.min(1, Math.max(0, window.scrollY / window.innerHeight)); };
    let rt = 0;
    const onResize = () => { window.clearTimeout(rt); rt = window.setTimeout(resize, 200); };

    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    for (let i = 0; i < 90; i++) step(); // 最初の表示から墨が漂っている状態にする
    start();

    return () => {
      stop();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
