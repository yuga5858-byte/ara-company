"use client";

import { useEffect, useRef } from "react";

// 画面全体の背景に、ゆっくり揺れる黒い水面を WebGL で描く。
// 水の中を白い墨がゆっくり溶けて流れ、マウスやタップの位置に波紋が広がる（波紋で墨も揺れる）。
const MAX_RIPPLES = 8;
const RENDER_SCALE = 0.6;
// 水面の模様の細かさ（小さいほど大きくゆったりした波）
const WAVE_SCALE = 1.6;

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

type Palette = {
  base: string; tint: string; sheen: string; spec: string; glow: string;
  ink: string; inkAmt: number; cloud: number; thread: number;
};
const v3 = (hex: string) => {
  const n = parseInt(hex.slice(1), 16);
  return `vec3(${[16, 8, 0].map((s) => (((n >> s) & 255) / 255).toFixed(3)).join(", ")})`;
};

// 色：黒い水に白い墨（2026-11-16 社長の判断で、墨と金から戻した）
const PALETTE: Palette = { base: "#07080A", tint: "#0A0D0F", sheen: "#808A94", spec: "#CCD1D9", glow: "#0D0E0F", ink: "#DBD9D1", inkAmt: 0.52, cloud: 0.75, thread: 1.0 };

const frag = (c: Palette) => `
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform float u_scroll;
uniform vec3 u_ripples[${MAX_RIPPLES}];

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 4; i++) { v += a * noise(p); p = p * 2.03 + vec2(1.7, 9.2); a *= 0.5; }
  return v;
}

float height(vec2 p) {
  float t = u_time;
  vec2 warp = vec2(fbm(p * 0.9 + vec2(t * 0.04, -t * 0.03)), fbm(p * 0.9 + vec2(-t * 0.035, t * 0.05) + 4.1));
  float h = fbm(p * 0.9 + warp * 1.2 + vec2(t * 0.02, t * 0.015));
  for (int i = 0; i < ${MAX_RIPPLES}; i++) {
    vec3 r = u_ripples[i];
    float age = t - r.z;
    if (r.z > 0.0 && age > 0.0 && age < 4.0) {
      float d = distance(p, r.xy);
      h += 0.06 * sin(18.0 * d - 6.0 * age) * exp(-2.6 * d - 1.1 * age) * smoothstep(0.0, 0.25, age);
    }
  }
  return h;
}

// 墨：水の流れで何度もねじれた雲（ドメインワープ）。濃い部分は乳白の雲、縁には細いすじ
float inkField(vec2 p, float t) {
  vec2 q = vec2(fbm(p * 0.55 + vec2(0.0, t * 0.018)), fbm(p * 0.55 + vec2(5.2, 1.3) - vec2(t * 0.012, 0.0)));
  vec2 r = vec2(fbm(p * 0.55 + 2.6 * q + vec2(1.7, 9.2) + t * 0.025), fbm(p * 0.55 + 2.6 * q + vec2(8.3, 2.8) - t * 0.02));
  return fbm(p * 0.55 + 2.8 * r);
}

void main() {
  float aspect = u_res.x / u_res.y;
  vec2 uv = gl_FragCoord.xy / u_res;
  vec2 p = vec2(uv.x * aspect, uv.y) * ${WAVE_SCALE.toFixed(2)};
  // スクロールに合わせて水面がゆっくり流れる
  p.y -= u_scroll;

  float e = 0.004;
  float h = height(p);
  vec3 n = normalize(vec3(height(p - vec2(e, 0.0)) - height(p + vec2(e, 0.0)),
                          height(p - vec2(0.0, e)) - height(p + vec2(0.0, e)),
                          e * 3.6));

  vec3 L = normalize(vec3(-0.35, 0.55, 0.75));
  vec3 V = vec3(0.0, 0.0, 1.0);
  float spec = pow(max(dot(reflect(-L, n), V), 0.0), 90.0);
  float sheen = pow(1.0 - n.z, 1.6);

  vec3 base = ${v3(c.base)};
  vec3 col = base + ${v3(c.tint)} * h;
  col += ${v3(c.sheen)} * sheen * 0.7;
  col += ${v3(c.spec)} * spec * 0.16;

  // 墨が水に溶けて流れる。水面の傾きで少しゆがませ、波紋が通ると墨も揺れて見えるようにする
  float f = inkField(p + n.xy * 0.35, u_time);
  float cloud = smoothstep(0.48, 0.78, f);
  float thread = smoothstep(0.035, 0.0, abs(f - 0.56)) * 0.55 * ${c.thread.toFixed(2)};
  float ink = clamp(cloud * ${c.cloud.toFixed(2)} + thread, 0.0, 1.0);
  vec3 milk = ${v3(c.ink)};
  col = mix(col, milk * (0.62 + 0.38 * sheen), ink * ${c.inkAmt.toFixed(2)});
  col += milk * spec * ink * 0.25;

  // 上から差す月明かり
  float glow = smoothstep(1.1, 0.0, distance(uv, vec2(0.62, 1.05)));
  col += ${v3(c.glow)} * glow;
  // 周辺減光
  col *= mix(0.55, 1.0, smoothstep(1.2, 0.3, distance(uv, vec2(0.5))));

  gl_FragColor = vec4(col, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  return s;
}

export default function Water() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const gl = canvas?.getContext("webgl", { antialias: false, alpha: false });
    if (!canvas || !gl) return;

    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, frag(PALETTE)));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "u_res");
    const uTime = gl.getUniformLocation(prog, "u_time");
    const uScroll = gl.getUniformLocation(prog, "u_scroll");
    let scroll = 0;
    const uRipples = gl.getUniformLocation(prog, "u_ripples");

    const ripples = new Float32Array(MAX_RIPPLES * 3);
    let next = 0;
    const t0 = performance.now();
    // パソコンで「アニメーションを減らす」設定（Windows の「アニメーション効果」オフなど）のときも、
    // 水面は止めずに、ゆっくり静かに流す（波紋・速い動きは出さない）
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const speed = reduce ? 0.35 : 1;
    const now = () => ((performance.now() - t0) / 1000) * speed + 10;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2) * RENDER_SCALE;
      canvas!.width = Math.round(window.innerWidth * dpr);
      canvas!.height = Math.round(window.innerHeight * dpr);
      gl!.viewport(0, 0, canvas!.width, canvas!.height);
      gl!.uniform2f(uRes, canvas!.width, canvas!.height);
    }

    function render() {
      const target = (window.scrollY / window.innerHeight) * 0.35;
      scroll += (target - scroll) * 0.06;
      gl!.uniform1f(uScroll, scroll);
      gl!.uniform1f(uTime, now());
      gl!.uniform3fv(uRipples, ripples);
      gl!.drawArrays(gl!.TRIANGLES, 0, 3);
    }

    function addRipple(clientX: number, clientY: number) {
      const aspect = window.innerWidth / window.innerHeight;
      const x = (clientX / window.innerWidth) * aspect * WAVE_SCALE;
      const y = (1 - clientY / window.innerHeight) * WAVE_SCALE;
      ripples.set([x, y - scroll, now()], next * 3);
      next = (next + 1) % MAX_RIPPLES;
    }

    let lastMove = 0;
    let lastX = -999;
    let lastY = -999;
    function onMove(e: PointerEvent) {
      const t = performance.now();
      if (t - lastMove < 140 || Math.hypot(e.clientX - lastX, e.clientY - lastY) < 40) return;
      lastMove = t;
      lastX = e.clientX;
      lastY = e.clientY;
      addRipple(e.clientX, e.clientY);
    }
    function onDown(e: PointerEvent) {
      addRipple(e.clientX, e.clientY);
    }

    resize();
    let frame = 0;
    let last = 0;
    const loop = (t: number) => {
      frame = requestAnimationFrame(loop);
      if (reduce && t - last < 32) return; // 動きを減らす設定では約30fpsで十分
      last = t;
      render();
    };

    render();
    frame = requestAnimationFrame(loop);
    if (!reduce) {
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerdown", onDown, { passive: true });
    }

    const onResize = () => {
      resize();
      render();
    };
    const onVisibility = () => {
      cancelAnimationFrame(frame);
      if (!document.hidden) frame = requestAnimationFrame(loop);
    };
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={ref} className="water" aria-hidden="true" />;
}
