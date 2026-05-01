"use client";

import { useEffect, useRef } from "react";
import "./LightRays.css";

interface LightRaysProps {
  raysOrigin?: [number, number];
  raysColor?: [number, number, number];
  raysSpeed?: number;
  lightSpread?: number;
  rayLength?: number;
  pulsating?: boolean;
  fadeDistance?: number;
  saturation?: number;
  followMouse?: boolean;
  mouseInfluence?: number;
  noiseAmount?: number;
  distortion?: number;
  className?: string;
}

const VERT = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAG = `
precision highp float;

uniform vec2  uResolution;
uniform float uTime;
uniform vec2  uOrigin;
uniform vec3  uColor;
uniform float uSpeed;
uniform float uSpread;
uniform float uRayLength;
uniform bool  uPulsating;
uniform float uFade;
uniform float uSaturation;
uniform vec2  uMouse;
uniform float uMouseInfluence;
uniform float uNoise;
uniform float uDistortion;

float hash(vec2 p) {
  p = fract(p * vec2(443.897, 441.423));
  p += dot(p, p + 19.19);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1,0)), f.x),
    mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), f.x),
    f.y
  );
}

vec3 saturate(vec3 c, float s) {
  float l = dot(c, vec3(0.299, 0.587, 0.114));
  return mix(vec3(l), c, s);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;

  // Mouse influence on origin
  vec2 mouseUV = uMouse / uResolution;
  vec2 origin = uOrigin + (mouseUV - uOrigin) * uMouseInfluence;

  vec2 dir = uv - origin;
  float dist = length(dir);
  float angle = atan(dir.y, dir.x);

  float t = uTime * uSpeed;

  // Distortion
  float distort = noise(dir * 3.0 + t * 0.4) * uDistortion;
  angle += distort;

  // Ray pattern: multiple overlapping rays
  float rays = 0.0;
  for (int i = 0; i < 8; i++) {
    float offset = float(i) * 0.785398; // PI/4
    float n = noise(vec2(angle * uSpread + offset + t * 0.3, float(i) * 1.7 + t * 0.17));
    n += noise(vec2(angle * uSpread * 2.0 + offset - t * 0.2, float(i) * 2.3)) * uNoise;
    rays += smoothstep(0.45, 0.55, n);
  }
  rays /= 8.0;

  // Fade by distance
  float fade = 1.0 - smoothstep(0.0, uFade, dist / uRayLength);

  // Pulsating brightness
  float pulse = uPulsating ? (0.85 + 0.15 * sin(t * 2.1)) : 1.0;

  float strength = rays * fade * pulse;

  vec3 col = uColor * strength;
  col = saturate(col, uSaturation);

  gl_FragColor = vec4(col, strength * 0.9);
}
`;

export default function LightRays({
  raysOrigin = [0.5, 0.0],
  raysColor = [0.0, 0.478, 1.0],
  raysSpeed = 1.0,
  lightSpread = 2.5,
  rayLength = 1.2,
  pulsating = true,
  fadeDistance = 1.0,
  saturation = 1.4,
  followMouse = true,
  mouseInfluence = 0.08,
  noiseAmount = 0.5,
  distortion = 0.15,
  className,
}: LightRaysProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number>(0);
  const mouseRef = useRef<[number, number]>([0, 0]);
  const visibleRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const canvas = document.createElement("canvas");
    canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%;";
    container.appendChild(canvas);
    canvasRef.current = canvas;

    const gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: false });
    if (!gl) return;

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

    function compileShader(type: number, src: string) {
      const s = gl!.createShader(type)!;
      gl!.shaderSource(s, src);
      gl!.compileShader(s);
      return s;
    }

    const prog = gl.createProgram()!;
    gl.attachShader(prog, compileShader(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compileShader(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    // Full-screen triangle
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const posLoc = gl.getAttribLocation(prog, "position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const uRes    = gl.getUniformLocation(prog, "uResolution");
    const uTime   = gl.getUniformLocation(prog, "uTime");
    const uOrigin = gl.getUniformLocation(prog, "uOrigin");
    const uColor  = gl.getUniformLocation(prog, "uColor");
    const uSpeed  = gl.getUniformLocation(prog, "uSpeed");
    const uSpreadU = gl.getUniformLocation(prog, "uSpread");
    const uRayLen = gl.getUniformLocation(prog, "uRayLength");
    const uPuls   = gl.getUniformLocation(prog, "uPulsating");
    const uFadeU  = gl.getUniformLocation(prog, "uFade");
    const uSat    = gl.getUniformLocation(prog, "uSaturation");
    const uMouse  = gl.getUniformLocation(prog, "uMouse");
    const uMouseInf = gl.getUniformLocation(prog, "uMouseInfluence");
    const uNoiseU = gl.getUniformLocation(prog, "uNoise");
    const uDist   = gl.getUniformLocation(prog, "uDistortion");

    let start = performance.now();

    function resize() {
      const w = container!.clientWidth;
      const h = container!.clientHeight;
      canvas.width = w;
      canvas.height = h;
      gl!.viewport(0, 0, w, h);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(container);
    resize();

    function render() {
      if (!visibleRef.current) { rafRef.current = requestAnimationFrame(render); return; }
      const w = canvas.width;
      const h = canvas.height;
      gl!.clear(gl!.COLOR_BUFFER_BIT);
      const t = (performance.now() - start) / 1000;
      gl!.uniform2f(uRes, w, h);
      gl!.uniform1f(uTime, t);
      gl!.uniform2f(uOrigin, raysOrigin[0], raysOrigin[1]);
      gl!.uniform3f(uColor, raysColor[0], raysColor[1], raysColor[2]);
      gl!.uniform1f(uSpeed, raysSpeed);
      gl!.uniform1f(uSpreadU, lightSpread);
      gl!.uniform1f(uRayLen, rayLength);
      gl!.uniform1i(uPuls, pulsating ? 1 : 0);
      gl!.uniform1f(uFadeU, fadeDistance);
      gl!.uniform1f(uSat, saturation);
      gl!.uniform2f(uMouse, mouseRef.current[0], mouseRef.current[1]);
      gl!.uniform1f(uMouseInf, followMouse ? mouseInfluence : 0);
      gl!.uniform1f(uNoiseU, noiseAmount);
      gl!.uniform1f(uDist, distortion);
      gl!.drawArrays(gl!.TRIANGLES, 0, 3);
      rafRef.current = requestAnimationFrame(render);
    }

    rafRef.current = requestAnimationFrame(render);

    const io = new IntersectionObserver(([e]) => { visibleRef.current = e.isIntersecting; });
    io.observe(container);

    function onMouseMove(e: MouseEvent) {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      mouseRef.current = [e.clientX - rect.left, canvas.height - (e.clientY - rect.top)];
    }
    if (followMouse) document.addEventListener("mousemove", onMouseMove);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      io.disconnect();
      if (followMouse) document.removeEventListener("mousemove", onMouseMove);
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={containerRef}
      className={`light-rays-container${className ? ` ${className}` : ""}`}
    />
  );
}
