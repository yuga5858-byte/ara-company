"use client";

import { useEffect, useRef, useState } from "react";
import Water from "./Water";

// 画面全体の背景に、ゆっくり立ちのぼる白い煙を描く（WebGL2 の流体シミュレーション）。
// - 煙は下のほうから絶えず湧き、渦を巻きながら上へ流れて薄れていく
// - マウスや指を動かすと、その動きで煙がかき回される
// - 「アニメーションを減らす」設定では、ゆっくり流すだけにして、マウスには反応しない
// - WebGL2 や半精度の浮動小数テクスチャが使えない端末では、これまでの水面（Water）を表示する
// - 外部ライブラリや素材は使わない

const SIM_RES = 128; // 流れ（速度）の計算の細かさ
const PRESSURE_ITER = 20;
const CURL = 22; // 渦の強さ
const VEL_DISSIPATION = 0.25;
const DYE_DISSIPATION = 0.55; // 煙が薄れる速さ
const BUOYANCY = 0.9; // 煙が上へのぼる力

const VERT = `#version 300 es
in vec2 a_pos;
uniform vec2 texel;
out vec2 vUv; out vec2 vL; out vec2 vR; out vec2 vT; out vec2 vB;
void main() {
  vUv = a_pos * 0.5 + 0.5;
  vL = vUv - vec2(texel.x, 0.0); vR = vUv + vec2(texel.x, 0.0);
  vT = vUv + vec2(0.0, texel.y); vB = vUv - vec2(0.0, texel.y);
  gl_Position = vec4(a_pos, 0.0, 1.0);
}`;

const HEAD = `#version 300 es
precision highp float;
precision highp sampler2D;
in vec2 vUv; in vec2 vL; in vec2 vR; in vec2 vT; in vec2 vB;
out vec4 o;
`;

const FRAGS = {
  advect: `${HEAD}
uniform sampler2D uVelocity; uniform sampler2D uSource;
uniform vec2 simTexel; uniform float dt; uniform float dissipation;
void main() {
  vec2 coord = vUv - dt * texture(uVelocity, vUv).xy * simTexel;
  o = texture(uSource, coord) / (1.0 + dissipation * dt);
}`,
  splat: `${HEAD}
uniform sampler2D uTarget; uniform float aspect; uniform vec3 color; uniform vec2 point; uniform float radius;
void main() {
  vec2 p = vUv - point; p.x *= aspect;
  o = vec4(texture(uTarget, vUv).xyz + exp(-dot(p, p) / radius) * color, 1.0);
}`,
  buoyancy: `${HEAD}
uniform sampler2D uVelocity; uniform sampler2D uDye; uniform float dt; uniform float strength;
void main() {
  vec2 v = texture(uVelocity, vUv).xy;
  float d = texture(uDye, vUv).r;
  v.y += strength * d * dt;
  o = vec4(v, 0.0, 1.0);
}`,
  curl: `${HEAD}
uniform sampler2D uVelocity;
void main() {
  float L = texture(uVelocity, vL).y; float R = texture(uVelocity, vR).y;
  float T = texture(uVelocity, vT).x; float B = texture(uVelocity, vB).x;
  o = vec4(0.5 * (R - L - T + B), 0.0, 0.0, 1.0);
}`,
  vorticity: `${HEAD}
uniform sampler2D uVelocity; uniform sampler2D uCurl; uniform float curl; uniform float dt;
void main() {
  float L = texture(uCurl, vL).x; float R = texture(uCurl, vR).x;
  float T = texture(uCurl, vT).x; float B = texture(uCurl, vB).x;
  float C = texture(uCurl, vUv).x;
  vec2 f = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
  f /= length(f) + 0.0001;
  f *= curl * C; f.y *= -1.0;
  vec2 v = texture(uVelocity, vUv).xy + f * dt;
  o = vec4(clamp(v, -1000.0, 1000.0), 0.0, 1.0);
}`,
  divergence: `${HEAD}
uniform sampler2D uVelocity;
void main() {
  float L = texture(uVelocity, vL).x; float R = texture(uVelocity, vR).x;
  float T = texture(uVelocity, vT).y; float B = texture(uVelocity, vB).y;
  vec2 C = texture(uVelocity, vUv).xy;
  if (vL.x < 0.0) L = -C.x; if (vR.x > 1.0) R = -C.x;
  if (vT.y > 1.0) T = -C.y; if (vB.y < 0.0) B = -C.y;
  o = vec4(0.5 * (R - L + T - B), 0.0, 0.0, 1.0);
}`,
  clear: `${HEAD}
uniform sampler2D uTexture; uniform float value;
void main() { o = value * texture(uTexture, vUv); }`,
  pressure: `${HEAD}
uniform sampler2D uPressure; uniform sampler2D uDivergence;
void main() {
  float L = texture(uPressure, vL).x; float R = texture(uPressure, vR).x;
  float T = texture(uPressure, vT).x; float B = texture(uPressure, vB).x;
  float div = texture(uDivergence, vUv).x;
  o = vec4((L + R + B + T - div) * 0.25, 0.0, 0.0, 1.0);
}`,
  gradient: `${HEAD}
uniform sampler2D uPressure; uniform sampler2D uVelocity;
void main() {
  float L = texture(uPressure, vL).x; float R = texture(uPressure, vR).x;
  float T = texture(uPressure, vT).x; float B = texture(uPressure, vB).x;
  o = vec4(texture(uVelocity, vUv).xy - vec2(R - L, T - B), 0.0, 1.0);
}`,
  // 表示：煙の濃さを、黒地に乳白の煙として描く。濃淡の傾きで少し陰影をつけ、周辺を落とし、細かな粒子感を足す
  display: `${HEAD}
uniform sampler2D uDye; uniform vec2 dyeTexel; uniform float time;
float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
void main() {
  float d = texture(uDye, vUv).r;
  float l = texture(uDye, vUv - vec2(dyeTexel.x * 2.0, 0.0)).r;
  float t = texture(uDye, vUv + vec2(0.0, dyeTexel.y * 2.0)).r;
  float a = 1.0 - exp(-d * 1.6);
  float shade = clamp(0.8 + (t - d) * 1.1 + (d - l) * 0.6, 0.55, 1.1);
  vec3 bg = vec3(0.027, 0.030, 0.035);
  vec3 smoke = vec3(0.86, 0.85, 0.82) * shade;
  vec3 col = mix(bg, smoke, a * 0.78);
  col *= mix(0.55, 1.0, smoothstep(1.15, 0.25, distance(vUv, vec2(0.5, 0.55))));
  col += (hash(vUv * 900.0 + time) - 0.5) * 0.025;
  o = vec4(col, 1.0);
}`,
};

type Prog = { prog: WebGLProgram; u: Record<string, WebGLUniformLocation | null> };
type FBO = { tex: WebGLTexture; fb: WebGLFramebuffer; w: number; h: number };
type Double = { read: FBO; write: FBO; swap: () => void };

function setup(canvas: HTMLCanvasElement) {
  const gl = canvas.getContext("webgl2", { alpha: false, antialias: false, depth: false, stencil: false, preserveDrawingBuffer: false });
  if (!gl) return null;
  if (!gl.getExtension("EXT_color_buffer_float")) return null;
  gl.getExtension("OES_texture_float_linear");

  const compile = (type: number, src: string) => {
    const s = gl.createShader(type)!;
    gl.shaderSource(s, src);
    gl.compileShader(s);
    return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
  };
  const vert = compile(gl.VERTEX_SHADER, VERT);
  if (!vert) return null;
  const progs: Record<string, Prog> = {};
  for (const [name, src] of Object.entries(FRAGS)) {
    const frag = compile(gl.FRAGMENT_SHADER, src);
    if (!frag) return null;
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vert);
    gl.attachShader(prog, frag);
    gl.bindAttribLocation(prog, 0, "a_pos");
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return null;
    const u: Prog["u"] = {};
    const n = gl.getProgramParameter(prog, gl.ACTIVE_UNIFORMS) as number;
    for (let i = 0; i < n; i++) {
      const info = gl.getActiveUniform(prog, i)!;
      u[info.name] = gl.getUniformLocation(prog, info.name);
    }
    progs[name] = { prog, u };
  }

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

  const fbo = (w: number, h: number, internal: number, format: number): FBO => {
    const tex = gl.createTexture()!;
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, internal, w, h, 0, format, gl.HALF_FLOAT, null);
    const fb = gl.createFramebuffer()!;
    gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
    gl.viewport(0, 0, w, h);
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    return { tex, fb, w, h };
  };
  const double = (w: number, h: number, internal: number, format: number): Double => {
    const d = { read: fbo(w, h, internal, format), write: fbo(w, h, internal, format), swap() { const t = d.read; d.read = d.write; d.write = t; } };
    return d;
  };
  if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE) return null;

  return { gl, progs, fbo, double };
}

export default function Smoke() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = setup(canvas);
    if (!ctx) {
      setFallback(true);
      return;
    }
    const { gl, progs, fbo, double } = ctx;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.matchMedia("(max-width: 760px)").matches;
    const DYE_RES = small ? 320 : 640;

    const sizeFor = (res: number) => {
      const aspect = window.innerWidth / window.innerHeight;
      return aspect >= 1 ? [Math.round(res * aspect), res] : [res, Math.round(res / aspect)];
    };
    let [sw, sh] = sizeFor(SIM_RES);
    let [dw, dh] = sizeFor(DYE_RES);
    let velocity = double(sw, sh, gl.RG16F, gl.RG);
    let dye = double(dw, dh, gl.RGBA16F, gl.RGBA);
    let pressure = double(sw, sh, gl.R16F, gl.RED);
    let divergence = fbo(sw, sh, gl.R16F, gl.RED);
    let curlTex = fbo(sw, sh, gl.R16F, gl.RED);

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(window.innerWidth * dpr * 0.75);
      canvas.height = Math.round(window.innerHeight * dpr * 0.75);
    };
    resizeCanvas();

    const blit = (target: FBO | null) => {
      if (target) {
        gl.viewport(0, 0, target.w, target.h);
        gl.bindFramebuffer(gl.FRAMEBUFFER, target.fb);
      } else {
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      }
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    let unit = 0;
    const prog = (name: string, texel: [number, number]) => {
      const p = progs[name];
      gl.useProgram(p.prog);
      unit = 0;
      if (p.u.texel) gl.uniform2f(p.u.texel, texel[0], texel[1]);
      return p;
    };
    const tex = (p: Prog, name: string, t: WebGLTexture) => {
      gl.activeTexture(gl.TEXTURE0 + unit);
      gl.bindTexture(gl.TEXTURE_2D, t);
      gl.uniform1i(p.u[name], unit);
      unit++;
    };

    const splat = (x: number, y: number, dx: number, dy: number, amount: number, radius: number) => {
      const aspect = canvas.width / canvas.height;
      let p = prog("splat", [1 / sw, 1 / sh]);
      tex(p, "uTarget", velocity.read.tex);
      gl.uniform1f(p.u.aspect, aspect);
      gl.uniform2f(p.u.point, x, y);
      gl.uniform3f(p.u.color, dx, dy, 0);
      gl.uniform1f(p.u.radius, radius);
      blit(velocity.write);
      velocity.swap();
      p = prog("splat", [1 / dw, 1 / dh]);
      tex(p, "uTarget", dye.read.tex);
      gl.uniform1f(p.u.aspect, aspect);
      gl.uniform2f(p.u.point, x, y);
      gl.uniform3f(p.u.color, amount, amount, amount);
      gl.uniform1f(p.u.radius, radius);
      blit(dye.write);
      dye.swap();
    };

    const step = (dt: number) => {
      const st: [number, number] = [1 / sw, 1 / sh];
      let p = prog("buoyancy", st);
      tex(p, "uVelocity", velocity.read.tex);
      tex(p, "uDye", dye.read.tex);
      gl.uniform1f(p.u.dt, dt);
      gl.uniform1f(p.u.strength, BUOYANCY);
      blit(velocity.write);
      velocity.swap();

      p = prog("curl", st);
      tex(p, "uVelocity", velocity.read.tex);
      blit(curlTex);

      p = prog("vorticity", st);
      tex(p, "uVelocity", velocity.read.tex);
      tex(p, "uCurl", curlTex.tex);
      gl.uniform1f(p.u.curl, CURL);
      gl.uniform1f(p.u.dt, dt);
      blit(velocity.write);
      velocity.swap();

      p = prog("divergence", st);
      tex(p, "uVelocity", velocity.read.tex);
      blit(divergence);

      p = prog("clear", st);
      tex(p, "uTexture", pressure.read.tex);
      gl.uniform1f(p.u.value, 0.8);
      blit(pressure.write);
      pressure.swap();

      p = prog("pressure", st);
      tex(p, "uDivergence", divergence.tex);
      const pu = p.u.uPressure;
      for (let i = 0; i < PRESSURE_ITER; i++) {
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, pressure.read.tex);
        gl.uniform1i(pu, 1);
        blit(pressure.write);
        pressure.swap();
      }

      p = prog("gradient", st);
      tex(p, "uPressure", pressure.read.tex);
      tex(p, "uVelocity", velocity.read.tex);
      blit(velocity.write);
      velocity.swap();

      p = prog("advect", st);
      tex(p, "uVelocity", velocity.read.tex);
      tex(p, "uSource", velocity.read.tex);
      gl.uniform2f(p.u.simTexel, 1 / sw, 1 / sh);
      gl.uniform1f(p.u.dt, dt);
      gl.uniform1f(p.u.dissipation, VEL_DISSIPATION);
      blit(velocity.write);
      velocity.swap();

      p = prog("advect", [1 / dw, 1 / dh]);
      tex(p, "uVelocity", velocity.read.tex);
      tex(p, "uSource", dye.read.tex);
      gl.uniform2f(p.u.simTexel, 1 / sw, 1 / sh);
      gl.uniform1f(p.u.dt, dt);
      gl.uniform1f(p.u.dissipation, DYE_DISSIPATION);
      blit(dye.write);
      dye.swap();
    };

    let time = 0;
    const render = () => {
      const p = prog("display", [1 / dw, 1 / dh]);
      tex(p, "uDye", dye.read.tex);
      gl.uniform2f(p.u.dyeTexel, 1 / dw, 1 / dh);
      gl.uniform1f(p.u.time, time % 100);
      blit(null);
    };

    // 煙の湧き口：画面の下のほうを、ゆっくり左右に漂う
    const emitters = [0, 1, 2, 3].map((i) => ({ phase: i * 1.7, base: 0.18 + i * 0.22 }));
    const emit = () => {
      for (const e of emitters) {
        const x = e.base + Math.sin(time * 0.13 + e.phase) * 0.08;
        const y = 0.02 + Math.max(0, Math.sin(time * 0.21 + e.phase * 2.3)) * 0.12;
        const sway = Math.sin(time * 0.6 + e.phase * 3.1) * 60;
        splat(x, y, sway, 140 + Math.sin(time * 0.4 + e.phase) * 50, 0.05, 0.0012);
      }
    };

    // マウス・指の動きで煙をかき回す
    const pointer = { x: 0, y: 0, dx: 0, dy: 0, moved: false, ready: false };
    const onMove = (e: PointerEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = 1 - e.clientY / window.innerHeight;
      if (pointer.ready) {
        pointer.dx += (x - pointer.x) * 5000;
        pointer.dy += (y - pointer.y) * 5000;
        pointer.moved = true;
      }
      pointer.x = x;
      pointer.y = y;
      pointer.ready = true;
    };
    const onLeave = () => { pointer.ready = false; };

    // ほかの演出（オープニング・円相が崩れる演出）から煙を足す。
    // detail: { x, y（画面左下が0、右上が1）, dx, dy（煙を押す速さ）, amount（濃さ）, radius }
    type SmokePuff = { x: number; y: number; dx: number; dy: number; amount: number; radius: number };
    const queue: SmokePuff[] = [];
    const onPuff = (e: Event) => {
      const d = (e as CustomEvent<SmokePuff>).detail;
      if (d && queue.length < 64) queue.push(d);
    };
    window.addEventListener("ara:smoke", onPuff);

    // 最初から煙が漂っている状態にする
    for (let i = 0; i < 50; i++) {
      time += 1 / 30;
      if (i % 2 === 0) emit();
      step(1 / 30);
    }

    let raf = 0;
    let last = performance.now();
    let acc = 0;
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      const elapsed = Math.min((now - last) / 1000, 1 / 20);
      last = now;
      acc += elapsed;
      if (acc < 1 / 45) return; // 約45fpsまで
      const dt = Math.min(acc, 1 / 30) * (reduce ? 0.35 : 1);
      acc = 0;
      time += dt;
      emit();
      while (queue.length) {
        const q = queue.shift()!;
        splat(q.x, q.y, q.dx, q.dy, q.amount, q.radius);
      }
      if (pointer.moved) {
        splat(pointer.x, pointer.y, pointer.dx, pointer.dy, 0.06, 0.0018);
        pointer.dx = pointer.dy = 0;
        pointer.moved = false;
      }
      step(dt);
      render();
    };
    raf = requestAnimationFrame(loop);

    if (!reduce) {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
    }
    const onVisibility = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden) {
        last = performance.now();
        raf = requestAnimationFrame(loop);
      }
    };
    let rt = 0;
    let lastW = window.innerWidth;
    const onResize = () => {
      window.clearTimeout(rt);
      rt = window.setTimeout(() => {
        resizeCanvas();
        // スマホでスクロール時にアドレスバーが出入りするだけなら、煙は作り直さない
        if (window.innerWidth === lastW) return;
        lastW = window.innerWidth;
        [sw, sh] = sizeFor(SIM_RES);
        [dw, dh] = sizeFor(DYE_RES);
        velocity = double(sw, sh, gl.RG16F, gl.RG);
        dye = double(dw, dh, gl.RGBA16F, gl.RGBA);
        pressure = double(sw, sh, gl.R16F, gl.RED);
        divergence = fbo(sw, sh, gl.R16F, gl.RED);
        curlTex = fbo(sw, sh, gl.R16F, gl.RED);
      }, 250);
    };
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("ara:smoke", onPuff);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  if (fallback) return <Water />;
  return <canvas ref={ref} className="water" aria-hidden="true" />;
}
