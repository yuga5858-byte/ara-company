"use client";

import { useEffect, useRef } from "react";

// 筆で描いた円相を canvas に描く。毛の1本ずつを線として引き、終わりに向けてかすれさせる。
const STEPS = 900;
const BRISTLES = 72;
const DURATION = 3600;

function hash(a: number, b: number) {
  let h = Math.imul(a ^ 0x9e3779b9, 0x85ebca6b) ^ Math.imul(b + 0x632be5ab, 0xc2b2ae35);
  h ^= h >>> 15;
  h = Math.imul(h, 0x2c1b3c6d);
  h ^= h >>> 12;
  return (h >>> 0) / 4294967296;
}

type Bristle = { offset: number; inkLimit: number; alpha: number };

const bristles: Bristle[] = Array.from({ length: BRISTLES }, (_, i) => ({
  offset: (i / (BRISTLES - 1)) * 2 - 1 + (hash(i, 1) - 0.5) * 0.05,
  inkLimit: 0.72 + hash(i, 2) * 0.34,
  alpha: 0.5 + hash(i, 3) * 0.45,
}));

function strokeAt(p: number, size: number) {
  const start = 0.78 * Math.PI;
  const sweep = 1.84 * Math.PI;
  const t = start + sweep * p;
  const R = size * 0.37;
  const r = R * (1 + 0.028 * Math.sin(2 * t + 1.3) + 0.012 * Math.sin(5 * t));
  const W = size * 0.09;
  const w = p < 0.05 ? W * (0.75 + 0.5 * (p / 0.05)) : W * (1.25 - 0.62 * p);
  return { cx: size / 2 + r * Math.cos(t), cy: size / 2 + r * Math.sin(t), nx: Math.cos(t), ny: Math.sin(t), w };
}

function drawRange(ctx: CanvasRenderingContext2D, size: number, from: number, to: number, prev: ([number, number] | null)[]) {
  const lineWidth = Math.max(1, ((size * 0.09) / BRISTLES) * 2.6);
  ctx.lineWidth = lineWidth;
  ctx.lineCap = "round";
  for (let s = from; s <= to; s++) {
    const p = s / STEPS;
    const { cx, cy, nx, ny, w } = strokeAt(p, size);
    bristles.forEach((b, i) => {
      const x = cx + nx * b.offset * (w / 2);
      const y = cy + ny * b.offset * (w / 2);
      const last = prev[i];
      prev[i] = [x, y];
      if (!last) return;
      const limit = b.inkLimit - 0.18 * Math.abs(b.offset);
      const dryness = Math.min(1, Math.max(0, (p - limit) * 7));
      if (hash(s, i + 100) < dryness) return;
      ctx.globalAlpha = b.alpha * (1 - dryness * 0.5);
      ctx.beginPath();
      ctx.moveTo(last[0], last[1]);
      ctx.lineTo(x, y);
      ctx.stroke();
    });
  }
  ctx.globalAlpha = 1;
}

export default function Enso({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // 描き進めた位置。途中で大きさや色が変わっても、描き直してから続きを描く（最初から完成形にしない）
    let done = reduce ? STEPS : -1;
    let size = 0;
    let prev: ([number, number] | null)[] = [];

    function setup() {
      size = canvas!.clientWidth;
      const dpr = window.devicePixelRatio || 1;
      canvas!.width = size * dpr;
      canvas!.height = size * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx!.clearRect(0, 0, size, size);
      ctx!.strokeStyle = getComputedStyle(canvas!).getPropertyValue("--ink").trim() || "#151412";
      prev = Array(BRISTLES).fill(null);
    }

    function redraw() {
      setup();
      if (done >= 0) drawRange(ctx!, size, 0, done, prev);
    }

    redraw();
    if (!reduce) {
      const t0 = performance.now();
      const tick = (now: number) => {
        const k = Math.min(1, (now - t0) / DURATION);
        const eased = 1 - Math.pow(1 - k, 1.3);
        const target = Math.floor(eased * STEPS);
        if (target > done) {
          drawRange(ctx!, size, done + 1, target, prev);
          done = target;
        }
        if (k < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }

    const ro = new ResizeObserver(() => {
      if (canvas.clientWidth !== size) redraw();
    });
    ro.observe(canvas);
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener("change", redraw);
    const mo = new MutationObserver(redraw);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      mq.removeEventListener("change", redraw);
      mo.disconnect();
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
