"use client";

import { useEffect, useRef } from "react";

// スクロールすると、トップの円相と「ARA COMPANY」が、右から順に細かな粒になって煙のように流れて消える。
// - 円相と文字を一度だけ画像として読み取り、粒に分ける。粒の位置はスクロール量だけで決まるので、戻すと元の形に戻る
// - 崩れていく粒の近くから、背景の煙（Smoke）にも少し煙を足す
// - 動きを減らす設定では何もしない（円相はそのまま）
// - 親要素（.enso-wrap）の中に置く。元の円相と文字は、崩れ始めたら CSS で隠す（.enso-wrap.dissolving）

type Grain = { x: number; y: number; a: number; delay: number; r1: number; r2: number; r3: number };

export default function EnsoDissolve() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const wrap = canvas?.parentElement;
    if (!canvas || !wrap) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let grains: Grain[] = [];
    let sampled = false;
    let W = 0;
    let H = 0;
    let img: ImageData | null = null;
    let buf: Uint32Array | null = null;
    let color = 0;
    const small = window.matchMedia("(max-width: 760px)").matches;
    const STEP = 2;

    // 円相（canvas）と文字を、粒の材料として読み取る
    const sample = () => {
      const cr = canvas.getBoundingClientRect();
      const wr = wrap.getBoundingClientRect();
      W = canvas.width = Math.max(1, Math.round(cr.width));
      H = canvas.height = Math.max(1, Math.round(cr.height));
      img = ctx.createImageData(W, H);
      buf = new Uint32Array(img.data.buffer);

      const off = document.createElement("canvas");
      off.width = Math.max(1, Math.round(wr.width));
      off.height = Math.max(1, Math.round(wr.height));
      const o = off.getContext("2d", { willReadFrequently: true });
      if (!o) return;
      const enso = wrap.querySelector<HTMLCanvasElement>("canvas.enso");
      if (enso) {
        const er = enso.getBoundingClientRect();
        o.drawImage(enso, er.left - wr.left, er.top - wr.top, er.width, er.height);
      }
      const ink = getComputedStyle(wrap).getPropertyValue("--ink").trim() || "#ECE8DE";
      o.fillStyle = ink;
      for (const el of wrap.querySelectorAll<HTMLElement>(".enso-name .ara, .enso-name .co")) {
        const cs = getComputedStyle(el);
        const r = el.getBoundingClientRect();
        o.font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
        (o as CanvasRenderingContext2D & { letterSpacing?: string }).letterSpacing = cs.letterSpacing === "normal" ? "0px" : cs.letterSpacing;
        o.textBaseline = "middle";
        o.globalAlpha = el.classList.contains("co") ? 0.7 : 1;
        o.fillText(el.textContent ?? "", r.left - wr.left + parseFloat(cs.paddingLeft || "0"), r.top - wr.top + r.height / 2);
      }
      o.globalAlpha = 1;

      const hex = ink.replace("#", "");
      const n = parseInt(hex.length === 3 ? hex.split("").map((c) => c + c).join("") : hex, 16);
      // ImageData はリトルエンディアンで ABGR の順に並ぶ
      color = ((n & 0xff) << 16) | (n & 0xff00) | ((n >> 16) & 0xff);

      const data = o.getImageData(0, 0, off.width, off.height).data;
      const ox = wr.left - cr.left;
      const oy = wr.top - cr.top;
      const list: Grain[] = [];
      for (let y = 0; y < off.height; y += STEP) {
        for (let x = 0; x < off.width; x += STEP) {
          const a = data[(y * off.width + x) * 4 + 3];
          if (a < 30) continue;
          const r1 = Math.random();
          const xn = x / off.width;
          list.push({
            x: x + ox,
            y: y + oy,
            a: a / 255,
            // 右側から先に崩れる（風が右上へ抜けていくように）
            delay: 0.55 * (1 - xn) + 0.3 * r1,
            r1,
            r2: Math.random(),
            r3: Math.random(),
          });
        }
      }
      grains = list;
      sampled = true;
    };

    const draw = (p: number, t: number) => {
      if (!img || !buf) return;
      buf.fill(0);
      const data = img.data;
      const reach = small ? 0.9 : 1;
      for (const g of grains) {
        let q = (p * 1.55 - g.delay) / 0.7;
        if (q <= 0) q = 0;
        else if (q >= 1) continue;
        const e = q * Math.sqrt(q);
        const dx = e * (W * 0.18 + g.r2 * W * 0.3) * reach + Math.sin(t * 0.9 + g.r3 * 6.28) * 6 * q;
        const dy = -e * (H * 0.1 + g.r3 * H * 0.28) * reach + Math.sin(q * 5 + g.r1 * 6) * 18 * q;
        const alpha = g.a * Math.pow(1 - q, 1.3);
        if (alpha < 0.03) continue;
        const size = q > 0.35 ? 1 : STEP;
        const px = Math.round(g.x + dx);
        const py = Math.round(g.y + dy);
        const A = Math.round(alpha * 255);
        for (let yy = py; yy < py + size; yy++) {
          if (yy < 0 || yy >= H) continue;
          for (let xx = px; xx < px + size; xx++) {
            if (xx < 0 || xx >= W) continue;
            const i = yy * W + xx;
            if (data[i * 4 + 3] < A) buf[i] = (A << 24) | color;
          }
        }
      }
      ctx.putImageData(img, 0, 0);
    };

    let raf = 0;
    let lastPuffP = 0;
    const progress = () => Math.min(1, Math.max(0, window.scrollY / (window.innerHeight * 0.8)));

    // 崩れている粒のあたりから、背景の煙を少し足す
    const puff = (p: number) => {
      if (p <= lastPuffP + 0.025) {
        if (p < lastPuffP) lastPuffP = p;
        return;
      }
      lastPuffP = p;
      const cr = canvas.getBoundingClientRect();
      for (let k = 0; k < 2; k++) {
        const g = grains[Math.floor(Math.random() * grains.length)];
        if (!g) return;
        const q = (p * 1.55 - g.delay) / 0.7;
        if (q <= 0.02 || q >= 0.8) continue;
        const x = (cr.left + g.x) / window.innerWidth;
        const y = 1 - (cr.top + g.y) / window.innerHeight;
        window.dispatchEvent(new CustomEvent("ara:smoke", { detail: { x, y, dx: 260, dy: 180, amount: 0.06, radius: 0.0016 } }));
      }
    };

    const frame = (now: number) => {
      const p = progress();
      if (p <= 0) {
        wrap.classList.remove("dissolving");
        ctx.clearRect(0, 0, W, H);
        raf = 0;
        return;
      }
      if (!sampled) sample();
      wrap.classList.add("dissolving");
      draw(p, now / 1000);
      puff(p);
      // 崩れている途中は、粒がゆらぐように動かし続ける
      raf = p < 1 ? requestAnimationFrame(frame) : 0;
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };
    const onScroll = () => {
      // 一番上に戻ったら、次に崩すときに読み取り直す（円相の描き終わりや大きさの変化を拾う）
      if (window.scrollY <= 0) sampled = false;
      kick();
    };
    const onResize = () => {
      sampled = false;
      kick();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    // 描き終わる前に崩し始めた場合も、描き終わったら完成形で読み取り直す
    window.addEventListener("ara:enso-drawn", onResize);
    if (progress() > 0) kick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("ara:enso-drawn", onResize);
      wrap.classList.remove("dissolving");
    };
  }, []);

  return <canvas ref={ref} className="enso-dust" aria-hidden="true" />;
}
