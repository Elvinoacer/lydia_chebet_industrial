"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

/**
 * Flowing silk — a raw-WebGL shader backdrop tuned to the textile identity.
 * Layered domain-warped noise reads as woven fabric currents catching light.
 *
 * Performance contract:
 *  - single fullscreen quad, one fragment program
 *  - devicePixelRatio capped at 1.5
 *  - rAF pauses when the canvas is offscreen or the tab is hidden
 *  - prefers-reduced-motion renders exactly one frame
 *  - graceful fallback: CSS gradient stays underneath if WebGL is missing
 */

const VERT = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform vec2  uRes;
uniform float uTime;
uniform vec2  uMouse;
uniform vec3  uColorA;   // deep tone
uniform vec3  uColorB;   // brand current
uniform vec3  uColorC;   // luminous highlight
uniform float uIntensity;

vec3 hash3(vec2 p) {
  vec3 q = vec3(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)), dot(p, vec2(419.2, 371.9)));
  return fract(sin(q) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = dot(hash3(i).xy, vec2(12.9898, 78.233));
  float b = dot(hash3(i + vec2(1.0, 0.0)).xy, vec2(12.9898, 78.233));
  float c = dot(hash3(i + vec2(0.0, 1.0)).xy, vec2(12.9898, 78.233));
  float d = dot(hash3(i + vec2(1.0, 1.0)).xy, vec2(12.9898, 78.233));
  return mix(mix(fract(sin(a) * 43758.5453), fract(sin(b) * 43758.5453), u.x),
             mix(fract(sin(c) * 43758.5453), fract(sin(d) * 43758.5453), u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = rot * p * 2.0 + vec2(3.1, 1.7);
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes.xy;
  vec2 p = uv;
  p.x *= uRes.x / uRes.y;

  float t = uTime * 0.06;

  // gentle mouse-driven current bend
  vec2 m = (uMouse - 0.5) * 0.35;
  p += m * 0.3;

  // domain-warped flowing silk
  vec2 q = vec2(fbm(p * 1.6 + t), fbm(p * 1.6 + vec2(5.2, 1.3) - t));
  vec2 r = vec2(fbm(p * 1.6 + 3.0 * q + vec2(1.7, 9.2) + 0.3 * t),
                fbm(p * 1.6 + 3.0 * q + vec2(8.3, 2.8) - 0.26 * t));
  float f = fbm(p * 1.6 + 4.0 * r);

  // woven thread striations — subtle horizontal & vertical interference
  float threads = sin((uv.x * 380.0 + f * 14.0)) * sin((uv.y * 300.0 - f * 10.0));
  threads = smoothstep(0.86, 1.0, threads) * 0.35;

  // color composition: deep → current → highlight
  vec3 col = mix(uColorA, uColorB, clamp(f * f * 3.0, 0.0, 1.0));
  col = mix(col, uColorC, clamp(length(q) * 0.42 * uIntensity, 0.0, 0.85));
  col += threads * uColorC * 0.55;
  col += pow(clamp(1.0 - length(uv - vec2(0.65, 0.35)), 0.0, 1.0), 3.0) * 0.16 * uColorC;

  // vignette
  float vig = smoothstep(1.25, 0.35, length(uv - 0.5));
  col *= mix(0.82, 1.0, vig);

  gl_FragColor = vec4(col, 1.0);
}
`;

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.replace("#", ""), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

const PALETTES = {
  dark: {
    a: "#07110c",
    b: "#17573d",
    c: "#6fe3a4",
    intensity: 1.3,
  },
  light: {
    a: "#dce8df",
    b: "#a9cfb8",
    c: "#2f7d5b",
    intensity: 1.0,
  },
};

export function SilkCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "low-power",
    });
    if (!gl) return; // CSS gradient fallback stays visible

    // --- compile ---
    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "uRes");
    const uTime = gl.getUniformLocation(prog, "uTime");
    const uMouse = gl.getUniformLocation(prog, "uMouse");
    const uColorA = gl.getUniformLocation(prog, "uColorA");
    const uColorB = gl.getUniformLocation(prog, "uColorB");
    const uColorC = gl.getUniformLocation(prog, "uColorC");
    const uIntensity = gl.getUniformLocation(prog, "uIntensity");

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const theme = resolvedTheme === "light" ? "light" : "dark";
    const pal = PALETTES[theme];

    let rafId = 0;
    let running = true;
    let visible = true;
    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
    const start = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = Math.floor(canvas.clientWidth * dpr);
      const h = Math.floor(canvas.clientHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };

    const frame = (now: number) => {
      if (!running) return;
      if (visible) {
        resize();
        mouse.x += (mouse.tx - mouse.x) * 0.04;
        mouse.y += (mouse.ty - mouse.y) * 0.04;
        gl.uniform2f(uRes, canvas.width, canvas.height);
        gl.uniform1f(uTime, (now - start) / 1000);
        gl.uniform2f(uMouse, mouse.x, 1 - mouse.y);
        gl.uniform3fv(uColorA, hexToRgb(pal.a));
        gl.uniform3fv(uColorB, hexToRgb(pal.b));
        gl.uniform3fv(uColorC, hexToRgb(pal.c));
        gl.uniform1f(uIntensity, pal.intensity);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
      }
      if (!reduce) rafId = requestAnimationFrame(frame);
    };

    // pause when offscreen or tab hidden — zero wasted GPU
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    });
    io.observe(canvas);
    const onVis = () => {
      visible = !document.hidden;
      if (!document.hidden && !reduce && !rafId) rafId = requestAnimationFrame(frame);
    };
    document.addEventListener("visibilitychange", onVis);

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.tx = (e.clientX - rect.left) / Math.max(1, rect.width);
      mouse.ty = (e.clientY - rect.top) / Math.max(1, rect.height);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("resize", resize);

    rafId = requestAnimationFrame(frame);

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [resolvedTheme]);

  return (
    <div className={className} aria-hidden>
      {/* CSS fallback gradient always beneath */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_70%_20%,#123a29_0%,#0a1510_60%)] dark:bg-[radial-gradient(120%_90%_at_70%_20%,#123a29_0%,#0a1510_60%)] bg-[radial-gradient(120%_90%_at_70%_20%,#bcd8c6_0%,#e9efe9_60%)]" />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
