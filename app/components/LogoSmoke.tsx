"use client";

import { useEffect, useRef } from "react";

// トップのロゴを、煙の粒で描き直す。
// - ロゴ画像（亀の紋章と「ARA COMPANY」）を一度だけ読み取り、細かな金の粒に分けて描く。粒はかすかに揺らぎ、一部は煙のように立ちのぼって消える
// - マウス・指で触ると、その周りの粒が渦を巻いて吹き散らされる。クリック・タップでは大きく崩れる
// - 何もしないでいると、粒はゆっくり元の位置へ戻り、ロゴの形に戻る
// - スクロールすると、右から順に粒になって右上へ流れて消える（戻すと元に戻る）
// - 動きを減らす設定・JavaScript が動かない場合は、元のロゴ画像をそのまま見せる
// - 親要素（.enso-wrap）の中に置く。粒で描けるようになったら .smoke-ready を付けて、元の画像を透明にする（読み上げ用の alt は残る）

type Grain = {
  hx: number; hy: number; a: number; c: number; delay: number;
  r1: number; r2: number; r3: number;
  ox: number; oy: number; vx: number; vy: number;
};

const STEP = 2;
const IDLE_MS = 700; // 最後に触ってから、元に戻り始めるまでの時間

export default function LogoSmoke() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const wrap = canvas?.parentElement;
    if (!canvas || !wrap) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const small = window.matchMedia("(max-width: 760px)").matches;
    const imgs = Array.from(wrap.querySelectorAll<HTMLImageElement>(".hero-logo img"));
    let grains: Grain[] = [];
    let W = 0;
    let H = 0;
    let img: ImageData | null = null;
    let buf: Uint32Array | null = null;
    let ready = false;

    // ロゴ画像を、粒の材料として読み取る
    const sample = () => {
      if (!imgs.length || imgs.some((im) => !im.complete || !im.naturalWidth)) return;
      const cr = canvas.getBoundingClientRect();
      W = canvas.width = Math.max(1, Math.round(cr.width));
      H = canvas.height = Math.max(1, Math.round(cr.height));
      img = ctx.createImageData(W, H);
      buf = new Uint32Array(img.data.buffer);

      const off = document.createElement("canvas");
      off.width = W;
      off.height = H;
      const o = off.getContext("2d", { willReadFrequently: true });
      if (!o) return;
      for (const im of imgs) {
        const r = im.getBoundingClientRect();
        o.drawImage(im, r.left - cr.left, r.top - cr.top, r.width, r.height);
      }
      const data = o.getImageData(0, 0, W, H).data;
      let minX = W;
      let maxX = 0;
      const list: Grain[] = [];
      for (let y = 0; y < H; y += STEP) {
        for (let x = 0; x < W; x += STEP) {
          const k = (y * W + x) * 4;
          const a = data[k + 3];
          if (a < 40) continue;
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          list.push({
            hx: x, hy: y, a: a / 255,
            // その場所の色（ImageData はリトルエンディアンで ABGR の順）
            c: (data[k + 2] << 16) | (data[k + 1] << 8) | data[k],
            delay: 0, r1: Math.random(), r2: Math.random(), r3: Math.random(),
            ox: 0, oy: 0, vx: 0, vy: 0,
          });
        }
      }
      const span = Math.max(1, maxX - minX);
      // スクロールでは右側から先に崩れる（風が右上へ抜けていくように）
      for (const g of list) g.delay = 0.55 * (1 - (g.hx - minX) / span) + 0.3 * g.r1;
      grains = list;
      ready = true;
      wrap.classList.add("smoke-ready");
    };

    // 触った場所（キャンバスの座標）
    const pointer = { x: 0, y: 0, active: false, last: -1e9, burst: false };
    const toLocal = (e: PointerEvent) => {
      const cr = canvas.getBoundingClientRect();
      pointer.x = e.clientX - cr.left;
      pointer.y = e.clientY - cr.top;
    };
    const onMove = (e: PointerEvent) => {
      toLocal(e);
      pointer.active = true;
      pointer.last = performance.now();
    };
    const onDown = (e: PointerEvent) => {
      toLocal(e);
      pointer.active = true;
      pointer.burst = true;
      pointer.last = performance.now();
    };
    const onLeave = () => { pointer.active = false; };

    const progress = () => Math.min(1, Math.max(0, window.scrollY / (window.innerHeight * 0.8)));
    let lastPuff = 0;
    const puff = (x: number, y: number, dx: number, dy: number, amount: number) => {
      const cr = canvas.getBoundingClientRect();
      window.dispatchEvent(new CustomEvent("ara:smoke", {
        detail: { x: (cr.left + x) / window.innerWidth, y: 1 - (cr.top + y) / window.innerHeight, dx, dy, amount, radius: 0.0018 },
      }));
    };

    let raf = 0;
    let last = performance.now();
    let visible = true;
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!ready) {
        sample();
        if (!ready) return;
      }
      if (!img || !buf) return;
      const p = progress();
      const t = now / 1000;
      const touching = pointer.active && now - pointer.last < 90;
      const idle = now - pointer.last > IDLE_MS;
      const R = small ? 64 : 86;
      const R2 = pointer.burst ? (R * 2.6) ** 2 : R * R;
      const force = pointer.burst ? 2600 : 900;
      const k = idle ? 7 : 0.4; // 元に戻ろうとする力
      const damp = Math.exp(-(idle ? 4.2 : 1.4) * dt);
      let disturbed = false;

      buf.fill(0);
      const data = img.data;
      for (const g of grains) {
        // 触ったところの粒を、渦を巻くように吹き散らす
        if (touching || pointer.burst) {
          const dx = g.hx + g.ox - pointer.x;
          const dy = g.hy + g.oy - pointer.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < R2 && d2 > 0.01) {
            const d = Math.sqrt(d2);
            const f = (1 - d / Math.sqrt(R2)) * force * dt * (0.6 + g.r2 * 0.8);
            g.vx += (dx / d) * f - (dy / d) * f * 0.7;
            g.vy += (dy / d) * f + (dx / d) * f * 0.7 - f * 0.4;
            disturbed = true;
          }
        }
        // 何もしなければ元の位置へ戻る。散っている間は、煙のように少しずつ上へ
        g.vx += -g.ox * k * dt;
        g.vy += -g.oy * k * dt - (idle ? 0 : Math.min(1, Math.abs(g.ox) / 30) * 14 * dt);
        g.vx *= damp;
        g.vy *= damp;
        g.ox += g.vx * dt;
        g.oy += g.vy * dt;

        // スクロールで崩れる量
        let q = (p * 1.55 - g.delay) / 0.7;
        if (q <= 0) q = 0;
        else if (q >= 1) continue;
        const e = q * Math.sqrt(q);
        let x = g.hx + g.ox + e * (W * 0.18 + g.r2 * W * 0.3) + Math.sin(t * 0.9 + g.r3 * 6.28) * 6 * q;
        let y = g.hy + g.oy - e * (H * 0.1 + g.r3 * H * 0.28) + Math.sin(q * 5 + g.r1 * 6) * 18 * q;
        // 煙らしさ：かすかな揺らぎと明滅
        x += Math.sin(t * 0.8 + g.r2 * 6.28) * 0.6;
        y += Math.cos(t * 0.7 + g.r1 * 6.28) * 0.6;
        let alpha = g.a * Math.pow(1 - q, 1.3) * (0.82 + 0.18 * Math.sin(t * 2.1 + g.r1 * 6.28));
        // ごく一部の粒は、ロゴから煙のように立ちのぼって消え、また元に戻る
        if (g.r3 < 0.035) {
          const ph = (t * 0.12 + g.r1) % 1;
          y -= ph * 46;
          x += Math.sin(ph * 6 + g.r2 * 6) * 9;
          alpha *= 1 - ph;
        }
        const off = Math.abs(g.ox) + Math.abs(g.oy);
        if (off > 4) alpha *= Math.max(0.35, 1 - off / 220);
        if (alpha < 0.03) continue;
        const size = q > 0.35 || off > 4 ? 1 : STEP;
        const px = Math.round(x);
        const py = Math.round(y);
        const A = Math.round(alpha * 255);
        for (let yy = py; yy < py + size; yy++) {
          if (yy < 0 || yy >= H) continue;
          for (let xx = px; xx < px + size; xx++) {
            if (xx < 0 || xx >= W) continue;
            const i = yy * W + xx;
            if (data[i * 4 + 3] < A) buf[i] = (A << 24) | g.c;
          }
        }
      }
      ctx.putImageData(img, 0, 0);

      // 吹き散らした場所から、背景にも煙を足す
      if (disturbed && now - lastPuff > 90) {
        lastPuff = now;
        puff(pointer.x, pointer.y, (Math.random() - 0.5) * 300, 160, pointer.burst ? 0.12 : 0.05);
      }
      pointer.burst = false;
    };

    const start = () => {
      if (!raf && visible && !document.hidden) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(wrap);
    const onVis = () => (document.hidden ? stop() : start());
    const resample = () => {
      ready = false;
    };
    let rt = 0;
    const onResize = () => {
      window.clearTimeout(rt);
      rt = window.setTimeout(resample, 200);
    };
    for (const im of imgs) im.addEventListener("load", resample);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("resize", onResize);
    start();

    return () => {
      stop();
      io.disconnect();
      for (const im of imgs) im.removeEventListener("load", resample);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("resize", onResize);
      wrap.classList.remove("smoke-ready");
    };
  }, []);

  return <canvas ref={ref} className="enso-dust" aria-hidden="true" />;
}
