"use client";

/**
 * Bold "blue metallic" gradient backdrop: navy base + flowing silk wave.
 *
 * A small raw-WebGL fragment shader (written from scratch — no third-party
 * component or dependency) renders domain-warped flowing bands in our real
 * brand palette: deep navy, brand blue, teal accent, and a light sheen. A
 * dark-blue scrim and a film grain are layered on top so the motion reads
 * behind white text.
 *
 * Only the three large sections animate; the industry tiles pass
 * `animated={false}` and render a lighter static backdrop with no WebGL
 * context at all. The shader pauses when scrolled offscreen and renders a
 * single static frame under `prefers-reduced-motion`.
 *
 * The host section must be `relative overflow-hidden`.
 */

import { useEffect, useRef } from "react";

// Inline fractal-noise SVG used as the grain layer.
const GRAIN =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'>
       <filter id='n'>
         <feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/>
         <feColorMatrix type='saturate' values='0'/>
       </filter>
       <rect width='160' height='160' filter='url(#n)' opacity='0.85'/>
     </svg>`
  );

const VERT = `
attribute vec2 p;
void main() { gl_Position = vec4(p, 0.0, 1.0); }
`;

// Original silk shader: two passes of domain-warped sine flow produce a
// soft, satiny ripple; the flow value drives a gradient through our brand
// colors with a sharp highlight for the silk sheen.
const FRAG = `
precision highp float;
uniform vec2  uRes;
uniform float uTime;

// Multi-stop blue palette — six shades from deep navy through indigo,
// steel, brand blue, azure, to a light sheen. More intermediate stops
// give the moving wave clearer color variation as it flows.
const vec3 NAVY   = vec3(0.070, 0.120, 0.250); // deep navy
const vec3 INDIGO = vec3(0.115, 0.220, 0.430); // indigo
const vec3 STEEL  = vec3(0.175, 0.310, 0.590); // steel blue
const vec3 BLUE   = vec3(0.220, 0.450, 0.870); // brand blue
const vec3 AZURE  = vec3(0.450, 0.720, 0.960); // azure (lifted)
const vec3 SHEEN  = vec3(0.750, 0.830, 0.920); // muted light-blue sheen

void main() {
  vec2 uv = gl_FragCoord.xy / uRes.xy;
  // keep the flow roughly square regardless of section aspect
  uv.x *= uRes.x / uRes.y;

  float t = uTime;
  // wave width — higher = narrower waves
  vec2 q = uv * 0.6;

  // domain warp — broader, gentler folds (one pass only)
  q.x += 0.65 * sin(q.y * 1.0 + t * 0.6);
  q.y += 0.55 * sin(q.x * 0.8 - t * 0.5);

  // flowing bands — low-frequency warp inner term so each wave is wide
  float w = sin(q.x + q.y + 0.9 * sin(q.x - q.y + t * 0.7) + t * 0.4);
  float flow = 0.5 + 0.5 * w;                 // 0..1

  // Chained smoothstep mixes — the wave sweeps through six blue stops as
  // flow rises, so each moment of motion shifts color noticeably.
  vec3 col = NAVY;
  col = mix(col, INDIGO, smoothstep(0.00, 0.25, flow));
  col = mix(col, STEEL,  smoothstep(0.18, 0.48, flow));
  col = mix(col, BLUE,   smoothstep(0.40, 0.70, flow));
  col = mix(col, AZURE,  smoothstep(0.65, 0.88, flow));
  col = mix(col, SHEEN,  smoothstep(0.85, 1.00, flow));

  gl_FragColor = vec4(col, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)!;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  return sh;
}

export default function GradientBackdrop({
  animated = true,
}: {
  animated?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!animated) return;
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;

    const gl =
      (canvas.getContext("webgl") as WebGLRenderingContext | null) ||
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);
    if (!gl) return;

    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "uRes");
    const uTime = gl.getUniformLocation(prog, "uTime");

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      canvas.width = Math.max(1, w * dpr);
      canvas.height = Math.max(1, h * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(parent);
    resize();

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const start = performance.now();
    const draw = (now: number) => {
      gl.uniform1f(uTime, ((now - start) / 1000) * 0.45);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    if (reduceMotion) {
      draw(start + 2500);
      return () => ro.disconnect();
    }

    let raf = 0;
    let running = false;
    const tick = (now: number) => {
      draw(now);
      raf = requestAnimationFrame(tick);
    };
    const run = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };
    const io = new IntersectionObserver(
      ([e]) => (e.isIntersecting ? run() : stop()),
      { threshold: 0 }
    );
    io.observe(parent);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [animated]);

  return (
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none -z-10 overflow-hidden"
    >
      {/* Navy base — always present, fallback for static / no-WebGL */}
      <div className="absolute inset-0" style={{ backgroundColor: "#0A1530" }} />

      {/* Flowing silk shader (skipped for static backdrops) */}
      {animated && (
        <div className="absolute inset-0">
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full block"
            style={{ filter: "blur(14px)" }}
          />
        </div>
      )}

      {/* Dark-blue scrim — keeps white text legible while the silk
          still shows through */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: "rgba(5,12,30,0.42)",
          backgroundImage: [
            "linear-gradient(135deg, rgba(4,10,28,0.48) 0%, rgba(9,20,52,0.28) 45%, rgba(3,8,22,0.46) 100%)",
            "radial-gradient(60% 70% at 6% 4%, rgba(2,6,18,0.42), transparent 58%)",
          ].join(", "),
        }}
      />

      {/* Film grain — preserved on top so the backdrop stays grainy */}
      <div
        className="absolute inset-0 mix-blend-overlay opacity-[0.55]"
        style={{
          backgroundImage: `url("${GRAIN}")`,
          backgroundSize: "180px 180px",
        }}
      />
    </div>
  );
}
