"use client";

import { useEffect, useRef } from "react";

// 画面全体の背景に、ゆっくり揺れる黒い水面を WebGL で描く。
// マウスやタップの位置に波紋が広がる。
const MAX_RIPPLES = 8;
const RENDER_SCALE = 0.6;
// 水面の模様の細かさ（小さいほど大きくゆったりした波）
const WAVE_SCALE = 1.6;

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;
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

void main() {
  float aspect = u_res.x / u_res.y;
  vec2 uv = gl_FragCoord.xy / u_res;
  vec2 p = vec2(uv.x * aspect, uv.y) * ${WAVE_SCALE.toFixed(2)};

  float e = 0.004;
  float h = height(p);
  vec3 n = normalize(vec3(height(p - vec2(e, 0.0)) - height(p + vec2(e, 0.0)),
                          height(p - vec2(0.0, e)) - height(p + vec2(0.0, e)),
                          e * 3.6));

  vec3 L = normalize(vec3(-0.35, 0.55, 0.75));
  vec3 V = vec3(0.0, 0.0, 1.0);
  float spec = pow(max(dot(reflect(-L, n), V), 0.0), 90.0);
  float sheen = pow(1.0 - n.z, 1.6);

  vec3 base = vec3(0.028, 0.030, 0.034);
  vec3 col = base + vec3(0.04, 0.05, 0.06) * h;
  col += vec3(0.50, 0.54, 0.58) * sheen * 0.7;
  col += vec3(0.80, 0.82, 0.85) * spec * 0.16;

  // 上から差す月明かり
  float glow = smoothstep(1.1, 0.0, distance(uv, vec2(0.62, 1.05)));
  col += vec3(0.05, 0.055, 0.06) * glow;
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
    gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG));
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
    const uRipples = gl.getUniformLocation(prog, "u_ripples");

    const ripples = new Float32Array(MAX_RIPPLES * 3);
    let next = 0;
    const t0 = performance.now();
    const now = () => (performance.now() - t0) / 1000 + 10;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2) * RENDER_SCALE;
      canvas!.width = Math.round(window.innerWidth * dpr);
      canvas!.height = Math.round(window.innerHeight * dpr);
      gl!.viewport(0, 0, canvas!.width, canvas!.height);
      gl!.uniform2f(uRes, canvas!.width, canvas!.height);
    }

    function render() {
      gl!.uniform1f(uTime, now());
      gl!.uniform3fv(uRipples, ripples);
      gl!.drawArrays(gl!.TRIANGLES, 0, 3);
    }

    function addRipple(clientX: number, clientY: number) {
      const aspect = window.innerWidth / window.innerHeight;
      const x = (clientX / window.innerWidth) * aspect * WAVE_SCALE;
      const y = (1 - clientY / window.innerHeight) * WAVE_SCALE;
      ripples.set([x, y, now()], next * 3);
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
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    const loop = () => {
      render();
      frame = requestAnimationFrame(loop);
    };

    if (reduce) {
      render();
    } else {
      frame = requestAnimationFrame(loop);
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerdown", onDown, { passive: true });
    }

    const onResize = () => {
      resize();
      if (reduce) render();
    };
    const onVisibility = () => {
      cancelAnimationFrame(frame);
      if (!document.hidden && !reduce) frame = requestAnimationFrame(loop);
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
