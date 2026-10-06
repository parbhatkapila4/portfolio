"use client";

import { useEffect, useRef } from "react";

import { fit, link, live, type Pass } from "./live-canvas";
import { FOCAL, SEA_FRAG, SEA_UNIFORMS } from "./sea-shader";
import { css, currentSky, mix, mixRGB, type RGB, type Sky } from "./sky-model";
import { VERT } from "./sky-shaders";


const MAX_PIXELS = 1.3e6;
const LOW = 0.113;
const HIGH = 0.192;
const MOONLIGHT: RGB = [0.78, 0.85, 1];

const WHITE: RGB = [1, 1, 1];
const BLACK: RGB = [0, 0, 0];

const deep = (s: Sky) => mixRGB(mixRGB(s.top, s.upper, 0.25), BLACK, 0.58);

function light(s: Sky, aspect: number) {
  const sun = s.sunAt.amount > 0;
  const at = sun ? s.sunAt : s.moonAt;
  const up = mix(LOW, HIGH, at.high);
  const turn = Math.atan(((at.x - 0.5) * aspect) / FOCAL);
  return {
    dir: [Math.sin(turn) * Math.cos(up), Math.sin(up), Math.cos(turn) * Math.cos(up)] as const,
    color: sun ? mixRGB(s.sun, WHITE, 0.7) : MOONLIGHT,
    amount: sun ? at.amount : at.amount * (0.2 + 0.4 * (1 - Math.cos(2 * Math.PI * s.moonPhase))),
  };
}

export function FooterSea() {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;

    const still = () => {
      const s = currentSky();
      host.style.background = `linear-gradient(${css(s.base)}, ${css(s.lower)} 52%, ${css(deep(s))})`;
      host.dataset.still = "";
    };

    return live(
      host,
      canvas,
      (gl, reduce) => {
        let sea: Pass;
        let vao: WebGLVertexArrayObject | null = null;
        let current = currentSky();
        let lookedAt = 0;
        const t0 = performance.now();

        const build = () => {
          sea = link(gl, VERT, SEA_FRAG, SEA_UNIFORMS);
          vao = gl.createVertexArray();
        };

        const draw = (ms: number, scale: number) => {
          fit(canvas, scale, MAX_PIXELS);
          if (ms - lookedAt > 1000) {
            current = currentSky();
            lookedAt = ms;
          }
          const s = current;
          const lit = light(s, canvas.width / canvas.height);
          gl.bindVertexArray(vao);
          gl.viewport(0, 0, canvas.width, canvas.height);
          gl.useProgram(sea.prog);
          gl.uniform2f(sea.uni.uRes, canvas.width, canvas.height);
          gl.uniform1f(sea.uni.uTime, reduce ? 0 : (ms - t0) / 1000);
          gl.uniform1f(sea.uni.uGlowAmt, s.glowAmount);
          gl.uniform3f(sea.uni.uTop, ...s.top);
          gl.uniform3f(sea.uni.uUpper, ...s.upper);
          gl.uniform3f(sea.uni.uLower, ...s.lower);
          gl.uniform3f(sea.uni.uRim, ...mixRGB(s.base, s.lower, 0.6 * s.stars));
          gl.uniform3f(sea.uni.uBase, ...s.base);
          gl.uniform3f(sea.uni.uGlow, ...s.glow);
          gl.uniform3f(sea.uni.uDeep, ...deep(s));
          gl.uniform3f(sea.uni.uLight, ...lit.dir);
          gl.uniform4f(sea.uni.uLightCol, ...lit.color, lit.amount);
          gl.drawArrays(gl.TRIANGLES, 0, 3);
        };

        const dispose = () => {
          gl.deleteProgram(sea.prog);
          gl.deleteVertexArray(vao);
        };

        return { build, draw, dispose };
      },
      still,
    );
  }, []);

  return (
    <div ref={hostRef} className="sea" aria-hidden>
      <canvas ref={canvasRef} />
    </div>
  );
}
