"use client";

import { useEffect, useRef } from "react";

import { fit, link, live, type Pass } from "./live-canvas";
import { clockHours, css, currentSky } from "./sky-model";
import { CLOUDS_FRAG, SKY_FRAG, VERT } from "./sky-shaders";

const MAX_PIXELS = 1.8e6;
const CLOUD_SCALE = 0.5;
const WIND = 0.028;

const CLOUD_UNIFORMS = ["uRes", "uDrift", "uMorph", "uCover", "uAlpha", "uGlowAmt", "uLight", "uLit", "uShade", "uHaze", "uGlow"];
const SKY_UNIFORMS = [
  "uClouds", "uRes", "uCss", "uTime", "uStars", "uGlowAmt", "uMoonPhase",
  "uTop", "uUpper", "uLower", "uBase", "uGlow", "uSunCol", "uSun", "uMoon",
];

const rand = (n: number) => {
  const v = Math.sin(n * 12.9898) * 43758.5453;
  return v - Math.floor(v);
};

export function HeroSky() {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;

    const still = () => {
      const s = currentSky();
      host.style.background = `linear-gradient(${css(s.top)}, ${css(s.upper)} 40%, ${css(s.lower)} 66%, ${css(s.base)} 96%)`;
      host.dataset.still = "";
    };

    return live(
      host,
      canvas,
      (gl, reduce) => {
        const today = new Date();
        const day = today.getFullYear() * 372 + today.getMonth() * 31 + today.getDate();
        const drift0 = rand(day) * 512 + clockHours(today) * 3600 * WIND;
        const cover = 0.55 + 0.04 * rand(day + 0.5);

        let clouds: Pass;
        let sky: Pass;
        let vao: WebGLVertexArrayObject | null = null;
        let fbo: WebGLFramebuffer | null = null;
        let tex: WebGLTexture | null = null;
        let cloudW = 0;
        let cloudH = 0;
        let current = currentSky();
        let lookedAt = 0;
        const t0 = performance.now();

        const build = () => {
          clouds = link(gl, VERT, CLOUDS_FRAG, CLOUD_UNIFORMS);
          sky = link(gl, VERT, SKY_FRAG, SKY_UNIFORMS);
          vao = gl.createVertexArray();
          tex = gl.createTexture();
          gl.bindTexture(gl.TEXTURE_2D, tex);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
          fbo = gl.createFramebuffer();
          cloudW = cloudH = 0;
        };

        const size = (scale: number) => {
          fit(canvas, scale, MAX_PIXELS);
          const cw = Math.max(64, Math.round(canvas.clientWidth * CLOUD_SCALE * scale));
          const ch = Math.max(32, Math.round(canvas.clientHeight * CLOUD_SCALE * scale));
          if (cw !== cloudW || ch !== cloudH) {
            cloudW = cw;
            cloudH = ch;
            gl.bindTexture(gl.TEXTURE_2D, tex);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA8, cw, ch, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
            gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
          }
        };

        const draw = (ms: number, scale: number) => {
          size(scale);
          if (ms - lookedAt > 1000) {
            current = currentSky();
            lookedAt = ms;
          }
          const s = current;
          const t = reduce ? 0 : (ms - t0) / 1000;
          gl.bindVertexArray(vao);

          gl.activeTexture(gl.TEXTURE0);
          gl.bindTexture(gl.TEXTURE_2D, null);
          gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
          gl.viewport(0, 0, cloudW, cloudH);
          gl.useProgram(clouds.prog);
          gl.uniform2f(clouds.uni.uRes, cloudW, cloudH);
          gl.uniform1f(clouds.uni.uDrift, (drift0 + t * WIND) % 512);
          gl.uniform1f(clouds.uni.uMorph, t * 0.012);
          gl.uniform1f(clouds.uni.uCover, cover);
          gl.uniform1f(clouds.uni.uAlpha, s.cloudAlpha);
          gl.uniform1f(clouds.uni.uGlowAmt, s.glowAmount);
          gl.uniform2f(clouds.uni.uLight, s.light.x, s.light.y);
          gl.uniform3f(clouds.uni.uLit, ...s.cloudLit);
          gl.uniform3f(clouds.uni.uShade, ...s.cloudShade);
          gl.uniform3f(clouds.uni.uHaze, ...s.base);
          gl.uniform3f(clouds.uni.uGlow, ...s.glow);
          gl.drawArrays(gl.TRIANGLES, 0, 3);

          gl.bindFramebuffer(gl.FRAMEBUFFER, null);
          gl.viewport(0, 0, canvas.width, canvas.height);
          gl.useProgram(sky.prog);
          gl.activeTexture(gl.TEXTURE0);
          gl.bindTexture(gl.TEXTURE_2D, tex);
          gl.uniform1i(sky.uni.uClouds, 0);
          gl.uniform2f(sky.uni.uRes, canvas.width, canvas.height);
          gl.uniform2f(sky.uni.uCss, canvas.clientWidth, canvas.clientHeight);
          gl.uniform1f(sky.uni.uTime, t);
          gl.uniform1f(sky.uni.uStars, s.stars);
          gl.uniform1f(sky.uni.uGlowAmt, s.glowAmount);
          gl.uniform1f(sky.uni.uMoonPhase, s.moonPhase);
          gl.uniform3f(sky.uni.uTop, ...s.top);
          gl.uniform3f(sky.uni.uUpper, ...s.upper);
          gl.uniform3f(sky.uni.uLower, ...s.lower);
          gl.uniform3f(sky.uni.uBase, ...s.base);
          gl.uniform3f(sky.uni.uGlow, ...s.glow);
          gl.uniform3f(sky.uni.uSunCol, ...s.sun);
          gl.uniform3f(sky.uni.uSun, s.sunAt.x, s.sunAt.y, s.sunAt.amount);
          gl.uniform3f(sky.uni.uMoon, s.moonAt.x, s.moonAt.y, s.moonAt.amount);
          gl.drawArrays(gl.TRIANGLES, 0, 3);
        };

        const dispose = () => {
          gl.deleteProgram(clouds.prog);
          gl.deleteProgram(sky.prog);
          gl.deleteVertexArray(vao);
          gl.deleteFramebuffer(fbo);
          gl.deleteTexture(tex);
        };

        return { build, draw, dispose };
      },
      still,
    );
  }, []);

  return (
    <div ref={hostRef} className="sky" aria-hidden>
      <canvas ref={canvasRef} />
    </div>
  );
}
