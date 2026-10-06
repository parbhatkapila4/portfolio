const FRAME_MS = 1000 / 30;
const CLOCK_MS = 60_000;
const START_MS = 150;

export type Pass = { prog: WebGLProgram; uni: Record<string, WebGLUniformLocation | null> };
export type Scene = {
  build(): void;
  draw(ms: number, scale: number): void;
  dispose(): void;
};

function compile(gl: WebGL2RenderingContext, type: number, src: string) {
  const s = gl.createShader(type);
  if (!s) throw new Error("createShader failed");
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(s);
    gl.deleteShader(s);
    throw new Error(log ?? "shader compile failed");
  }
  return s;
}

export function link(gl: WebGL2RenderingContext, vert: string, frag: string, names: string[]): Pass {
  const prog = gl.createProgram();
  if (!prog) throw new Error("createProgram failed");
  const vs = compile(gl, gl.VERTEX_SHADER, vert);
  const fs = compile(gl, gl.FRAGMENT_SHADER, frag);
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  gl.deleteShader(vs);
  gl.deleteShader(fs);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    const log = gl.getProgramInfoLog(prog);
    gl.deleteProgram(prog);
    throw new Error(log ?? "link failed");
  }
  return { prog, uni: Object.fromEntries(names.map((n) => [n, gl.getUniformLocation(prog, n)])) };
}

export function fit(canvas: HTMLCanvasElement, scale: number, maxPixels: number) {
  const cssW = canvas.clientWidth;
  const cssH = canvas.clientHeight;
  let dpr = Math.min(window.devicePixelRatio || 1, 2) * scale;
  const area = cssW * cssH * dpr * dpr;
  if (area > maxPixels) dpr *= Math.sqrt(maxPixels / area);
  const w = Math.max(1, Math.round(cssW * dpr));
  const h = Math.max(1, Math.round(cssH * dpr));
  if (canvas.width !== w || canvas.height !== h) {
    canvas.width = w;
    canvas.height = h;
  }
}

function start(
  host: HTMLElement,
  canvas: HTMLCanvasElement,
  setup: (gl: WebGL2RenderingContext, reduce: boolean) => Scene,
) {
  const gl = canvas.getContext("webgl2", {
    alpha: true,
    premultipliedAlpha: true,
    antialias: false,
    depth: false,
    stencil: false,
    powerPreference: "low-power",
  });
  if (!gl) return null;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const scene = setup(gl, reduce);
  let built = false;
  let raf = 0;
  let last = 0;
  let onScreen = false;
  let scale = 1;
  let slow = 0;

  const build = () => {
    scene.build();
    built = true;
  };
  const draw = (ms: number) => {
    if (!built || gl.isContextLost()) return;
    scene.draw(ms, scale);
    host.dataset.live = "";
  };
  const tick = (ms: number) => {
    raf = 0;
    if (!onScreen || document.hidden) return;
    if (ms - last >= FRAME_MS - 2) {
      const dt = last ? ms - last : FRAME_MS;
      last = ms;
      draw(ms);
      slow = dt > 52 ? slow + 1 : Math.max(0, slow - 1);
      if (slow > 24 && scale > 0.55) {
        scale *= 0.8;
        slow = 0;
      }
    }
    raf = requestAnimationFrame(tick);
  };
  const run = () => {
    if (reduce) {
      draw(performance.now());
      return;
    }
    if (!raf && onScreen && !document.hidden) {
      last = 0;
      raf = requestAnimationFrame(tick);
    }
  };

  try {
    build();
  } catch (err) {
    if (process.env.NODE_ENV !== "production") console.error(err);
    return null;
  }

  const io = new IntersectionObserver(
    ([entry]) => {
      onScreen = entry.isIntersecting;
      run();
    },
    { rootMargin: "120px 0px" },
  );
  io.observe(canvas);
  const ro = new ResizeObserver(() => {
    if (reduce && onScreen) draw(performance.now());
  });
  ro.observe(canvas);
  const minute = reduce ? window.setInterval(() => onScreen && draw(performance.now()), CLOCK_MS) : 0;

  const onVisibility = () => run();
  const onLost = (e: Event) => {
    e.preventDefault();
    cancelAnimationFrame(raf);
    raf = 0;
    built = false;
    delete host.dataset.live;
  };
  const onRestored = () => {
    try {
      build();
      run();
    } catch {
      built = false;
    }
  };
  document.addEventListener("visibilitychange", onVisibility);
  canvas.addEventListener("webglcontextlost", onLost);
  canvas.addEventListener("webglcontextrestored", onRestored);

  return () => {
    cancelAnimationFrame(raf);
    raf = 0;
    window.clearInterval(minute);
    io.disconnect();
    ro.disconnect();
    document.removeEventListener("visibilitychange", onVisibility);
    canvas.removeEventListener("webglcontextlost", onLost);
    canvas.removeEventListener("webglcontextrestored", onRestored);
    if (built && !gl.isContextLost()) scene.dispose();
    built = false;
  };
}
export function live(
  host: HTMLElement,
  canvas: HTMLCanvasElement,
  setup: (gl: WebGL2RenderingContext, reduce: boolean) => Scene,
  still: () => void,
) {
  let stop: (() => void) | null = null;
  const timer = window.setTimeout(() => {
    stop = start(host, canvas, setup);
    if (stop) return;
    still();
    const minute = window.setInterval(still, CLOCK_MS);
    stop = () => window.clearInterval(minute);
  }, START_MS);
  return () => {
    window.clearTimeout(timer);
    stop?.();
  };
}
