import {
  FRAG_BLUR,
  FRAG_COMPOSITE,
  FRAG_DOWNSAMPLE,
  FRAG_FADE,
  FRAG_COPY,
  FRAG_CURL,
  FRAG_GRIDBLUR,
  FRAG_PARTICLES,
  FRAG_SIM,
  FRAG_SPLAT,
  VERT_PARTICLES,
  VERT_QUAD,
  VERT_SPLAT,
} from "./shaders";

export type FieldParams = {
  fovDeg: number;
  camH: number;
  horizonFromTop: number;
  zNear: number;
  zFar: number;
  depthBias: number;
  windAngle: number;
  windSwing: number;
  windPeriod: number;
  speedNear: number;
  speedFar: number;
  curlScale: number;
  curlAmp: number;
  evolve: number;
  alignNear: number;
  alignFar: number;
  gustAmp: number;
  gustSeconds: number;
  gustMinGap: number;
  gustMaxGap: number;
  lifeMin: number;
  lifeMax: number;
  timeScale: number;
  trailHalfLife: number;
  trailFloor: number;
  diffuse: number;
  gain: number;
  nearDim: number;
  depthRef: number;
  depthComp: number;
  extinction: number;
  exposure: number;
  keyGain: number;
  shadowSide: number;
  glitter: number;
  hazeGain: number;
  glow: number;
  skyFall: number;
  feather: number;
  fog: number;
  fogLift: number;
  bottomFade: number;
  sat: number;
  grain: number;
  sunX: number;
  pointerRadius: number;
  scrollShift: number;
  scrollStops: number;
  revealDelay: number;
  revealSeconds: number;
  palette: {
    ink: string;
    haze: string;
    stops: [string, string, string, string, string, string, string, string];
  };
};

export const DEFAULT_PARAMS: FieldParams = {
  fovDeg: 40,
  camH: 1.6,
  horizonFromTop: 0.3,
  zNear: 1.5,
  zFar: 40,
  depthBias: 0.8,
  windAngle: Math.PI + 0.5,
  windSwing: 0.35,
  windPeriod: 300,
  speedNear: 0.12,
  speedFar: 0.5,
  curlScale: 0.05,
  curlAmp: 2.0,
  evolve: 0.025,
  alignNear: 0.35,
  alignFar: 0.1,
  gustAmp: 0.8,
  gustSeconds: 6,
  gustMinGap: 45,
  gustMaxGap: 75,
  lifeMin: 8,
  lifeMax: 14,
  timeScale: 1,
  trailHalfLife: 3.0,
  trailFloor: 0.05,
  diffuse: 0.04,
  gain: 0.45,
  nearDim: 0.35,
  depthRef: 6,
  depthComp: 2.0,
  extinction: 0.06,
  exposure: 1.1,
  keyGain: 0.2,
  shadowSide: 0.45,
  glitter: 0.3,
  hazeGain: 0.1,
  glow: 0.55,
  skyFall: 6.0,
  feather: 0.08,
  fog: 0.035,
  fogLift: 0.05,
  bottomFade: 0.32,
  sat: 1.0,
  grain: 0.012,
  sunX: 0.66,
  pointerRadius: 0.133,
  scrollShift: 0.08,
  scrollStops: 1.2,
  revealDelay: 0.15,
  revealSeconds: 2.4,
  palette: {
    ink: "#0a0a0a",
    haze: "#0e1116",
    stops: [
      "#0a0a0a",
      "#0e1116",
      "#262b33",
      "#4f4740",
      "#6e4d3c",
      "#a47a48",
      "#e2c28c",
      "#efe3cd",
    ],
  },
};

export type FieldInfo = {
  frameMs: number;
  particles: number;
  size: number;
  dpr: number;
  width: number;
  height: number;
  renderer: string;
  tier: number;
};

export type HeroFieldOptions = {
  reducedMotion?: boolean;
  onFallback?: (reason: string) => void;
  onReady?: (info: FieldInfo) => void;
  onTierChange?: (info: FieldInfo) => void;
  params?: Partial<FieldParams>;
  tier?: number;
  halfRate?: boolean;
  lockTier?: boolean;
  areaCap?: number;
  debug?: boolean;
};

export interface HeroField {
  setPointer(x: number | null, y?: number): void;
  setParallax(x: number, y: number): void;
  setScroll(p: number): void;
  setActive(active: boolean): void;
  setHorizon(fromTop: number): void;
  setParams(p: Partial<FieldParams>): void;
  getParams(): FieldParams;
  getInfo(): FieldInfo;
  warm(simSteps: number, trailSteps: number): void;
  capture(): string;
  probe(): { particles: number[][]; align: number[][]; trailMax: number };
  dispose(): void;
}

const TIERS = [
  { size: 512, dprCap: 1.5 },
  { size: 448, dprCap: 1.25 },
  { size: 384, dprCap: 1.0 },
  { size: 256, dprCap: 1.0 },
] as const;

const EASE_OUT = (t: number) => {
  const x = Math.min(1, Math.max(0, t));
  return 1 - Math.pow(1 - x, 3.2);
};

function hexToLinear(hex: string): [number, number, number] {
  const n = parseInt(hex.replace("#", ""), 16);
  const s = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => {
    const c = v / 255;
    return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return [s[0], s[1], s[2]];
}

export function pickTier(): number {
  if (typeof window === "undefined") return 0;
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const small = Math.min(window.innerWidth, window.innerHeight) < 700;
  const nav = navigator as Navigator & { deviceMemory?: number };
  const lowMem = typeof nav.deviceMemory === "number" && nav.deviceMemory <= 4;
  const fewCores =
    typeof navigator.hardwareConcurrency === "number" &&
    navigator.hardwareConcurrency <= 4;
  if (coarse || small) return lowMem || fewCores ? 3 : 2;
  if (lowMem || fewCores) return 1;
  return 0;
}

class Program {
  readonly prog: WebGLProgram;
  private readonly loc = new Map<string, WebGLUniformLocation | null>();
  private checked: boolean;
  constructor(
    private readonly gl: WebGL2RenderingContext,
    vs: string,
    fs: string,
    private readonly label: string,
    deferLinkCheck = false,
  ) {
    const v = compile(gl, gl.VERTEX_SHADER, vs, label + ".vert");
    const f = compile(gl, gl.FRAGMENT_SHADER, fs, label + ".frag");
    const p = gl.createProgram();
    if (!p) throw new Error("createProgram failed");
    gl.attachShader(p, v);
    gl.attachShader(p, f);
    gl.linkProgram(p);
    gl.deleteShader(v);
    gl.deleteShader(f);
    this.prog = p;
    this.checked = false;
    if (!deferLinkCheck) this.verify();
  }
  ready(completionStatus: number | null) {
    if (this.checked) return true;
    const gl = this.gl;
    if (
      completionStatus !== null &&
      !gl.getProgramParameter(this.prog, completionStatus)
    )
      return false;
    this.verify();
    return true;
  }
  private verify() {
    const gl = this.gl;
    if (!gl.getProgramParameter(this.prog, gl.LINK_STATUS)) {
      const log = gl.getProgramInfoLog(this.prog);
      gl.deleteProgram(this.prog);
      throw new Error(`link ${this.label}: ${log}`);
    }
    this.checked = true;
  }
  use() {
    this.gl.useProgram(this.prog);
  }
  u(name: string) {
    let l = this.loc.get(name);
    if (l === undefined) {
      l = this.gl.getUniformLocation(this.prog, name);
      this.loc.set(name, l);
    }
    return l;
  }
  f1(n: string, x: number) {
    this.gl.uniform1f(this.u(n), x);
  }
  f2(n: string, x: number, y: number) {
    this.gl.uniform2f(this.u(n), x, y);
  }
  f3(n: string, x: number, y: number, z: number) {
    this.gl.uniform3f(this.u(n), x, y, z);
  }
  f3v(n: string, v: Float32Array) {
    this.gl.uniform3fv(this.u(n), v);
  }
  i1(n: string, x: number) {
    this.gl.uniform1i(this.u(n), x);
  }
  ui1(n: string, x: number) {
    this.gl.uniform1ui(this.u(n), x >>> 0);
  }
  dispose() {
    this.gl.deleteProgram(this.prog);
  }
}

function compile(
  gl: WebGL2RenderingContext,
  type: number,
  src: string,
  label: string,
) {
  const s = gl.createShader(type);
  if (!s) throw new Error("createShader failed");
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(s);
    gl.deleteShader(s);
    throw new Error(`compile ${label}: ${log}`);
  }
  return s;
}

type Target = {
  tex: WebGLTexture;
  fbo: WebGLFramebuffer;
  w: number;
  h: number;
};

function createTarget(
  gl: WebGL2RenderingContext,
  w: number,
  h: number,
  internal: number,
  format: number,
  type: number,
  filter: number,
  data: ArrayBufferView | null = null,
): Target {
  const tex = gl.createTexture();
  const fbo = gl.createFramebuffer();
  if (!tex || !fbo) throw new Error("createTarget failed");
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filter);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filter);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texImage2D(gl.TEXTURE_2D, 0, internal, w, h, 0, format, type, data);
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
  gl.framebufferTexture2D(
    gl.FRAMEBUFFER,
    gl.COLOR_ATTACHMENT0,
    gl.TEXTURE_2D,
    tex,
    0,
  );
  const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  gl.bindTexture(gl.TEXTURE_2D, null);
  if (status !== gl.FRAMEBUFFER_COMPLETE) {
    gl.deleteTexture(tex);
    gl.deleteFramebuffer(fbo);
    throw new Error(`framebuffer incomplete: 0x${status.toString(16)}`);
  }
  return { tex, fbo, w, h };
}

function deleteTarget(gl: WebGL2RenderingContext, t: Target | null) {
  if (!t) return;
  gl.deleteTexture(t.tex);
  gl.deleteFramebuffer(t.fbo);
}

export function createHeroField(
  canvas: HTMLCanvasElement,
  options: HeroFieldOptions = {},
): HeroField | null {
  const gl = canvas.getContext("webgl2", {
    alpha: false,
    antialias: false,
    depth: false,
    stencil: false,
    premultipliedAlpha: false,
    preserveDrawingBuffer: false,
    powerPreference: "low-power",
  });
  if (!gl) {
    options.onFallback?.("webgl2-unavailable");
    return null;
  }
  if (!gl.getExtension("EXT_color_buffer_float")) {
    options.onFallback?.("no-float-render-targets");
    return null;
  }
  try {
    return new HeroFieldImpl(canvas, gl, options);
  } catch (err) {
    if (options.debug) console.error("[hero-field]", err);
    options.onFallback?.(err instanceof Error ? err.message : "init-failed");
    return null;
  }
}

const ALIGN_W = 160;
const ALIGN_H = 80;
const CURL_W = 192;
const CURL_H = 96;

class HeroFieldImpl implements HeroField {
  private params: FieldParams;
  private readonly reducedMotion: boolean;
  private readonly debug: boolean;
  private readonly halfRate: boolean;

  private simProg!: Program;
  private splatProg!: Program;
  private particleProg!: Program;
  private fadeProg!: Program;
  private gridBlurProg!: Program;
  private copyProg!: Program;
  private curlProg!: Program;
  private programs: Program[] = [];
  private parallelCompile: { COMPLETION_STATUS_KHR: number } | null = null;
  private linked = false;
  private downProg!: Program;
  private blurProg!: Program;
  private compProg!: Program;
  private vao!: WebGLVertexArrayObject;

  private tier: number;
  private size = 0;
  private state: [Target | null, Target | null] = [null, null];
  private stateIdx = 0;
  private align: [Target | null, Target | null] = [null, null];
  private curl: Target | null = null;
  private trail: [Target | null, Target | null] = [null, null];
  private trailIdx = 0;
  private haze: [Target | null, Target | null] = [null, null];

  private dpr = 1;
  private width = 0;
  private height = 0;
  private ro: ResizeObserver | null = null;

  private active = false;
  private disposed = false;
  private raf = 0;
  private lastT = 0;
  private simTime = 0;
  private frame = 0;
  private lastPresent = 0;
  private pendingSim = 0;
  private pendingTrail = 0;
  private revealStart = 0;
  private reveal = 0;

  private pointer: { x: number; y: number } | null = null;
  private pointerWorld = { x: 0, z: 0, s: 0, r: 1 };
  private parallax = { x: 0, y: 0 };
  private scroll = 0;

  private gustAt = 0;
  private gustPos = -1;
  private gustAmp = 0;

  private frameEma = 16.7;
  private settleUntil = 0;
  private downgrades = 0;
  private overBudget = 0;
  private resizeTimer = 0;

  private stillFrame = false;

  private palette = new Float32Array(24);
  private ink: [number, number, number] = [0, 0, 0];
  private hazeCol: [number, number, number] = [0, 0, 0];

  private lostTimer = 0;
  private onLost = (e: Event) => {
    e.preventDefault();
    this.stopLoop();
    window.clearTimeout(this.lostTimer);
    this.lostTimer = window.setTimeout(() => {
      if (!this.disposed && this.gl.isContextLost())
        this.options.onFallback?.("context-lost");
    }, 3000);
  };
  private onRestored = () => {
    window.clearTimeout(this.lostTimer);
    try {
      if (!this.gl.getExtension("EXT_color_buffer_float"))
        throw new Error("no-float-render-targets");
      this.build();
      this.align = [null, null];
      this.curl = null;
      this.trail = [null, null];
      this.haze = [null, null];
      this.state = [null, null];
      this.allocTargets(true);
      this.prewarm();
      if (this.active) this.startLoop();
    } catch (err) {
      if (this.debug) console.error("[hero-field] restore failed", err);
      this.options.onFallback?.("context-restore-failed");
    }
  };
  private onVisibility = () => {
    if (document.hidden) this.stopLoop();
    else if (this.active) {
      this.stopLoop();
      this.startLoop();
    }
  };

  constructor(
    private readonly canvas: HTMLCanvasElement,
    private readonly gl: WebGL2RenderingContext,
    private readonly options: HeroFieldOptions,
  ) {
    this.params = { ...DEFAULT_PARAMS, ...(options.params ?? {}) };
    if (options.params?.palette)
      this.params.palette = {
        ...DEFAULT_PARAMS.palette,
        ...options.params.palette,
      };
    this.reducedMotion = !!options.reducedMotion;
    this.debug = !!options.debug;
    this.halfRate = !!options.halfRate;
    this.tier = Math.min(
      TIERS.length - 1,
      Math.max(0, options.tier ?? pickTier()),
    );
    this.bakePalette();

    this.build();
    this.allocTargets(true);
    this.scheduleGust(0);
    this.prewarm();

    canvas.addEventListener("webglcontextlost", this.onLost);
    canvas.addEventListener("webglcontextrestored", this.onRestored);
    document.addEventListener("visibilitychange", this.onVisibility);

    this.ro = new ResizeObserver(() => this.resize());
    this.ro.observe(canvas);

    options.onReady?.(this.getInfo());
  }

  private build() {
    const gl = this.gl;
    this.parallelCompile = gl.getExtension("KHR_parallel_shader_compile");
    const defer = !!this.parallelCompile;
    const make = (vs: string, fs: string, label: string) =>
      new Program(gl, vs, fs, label, defer);
    this.simProg = make(VERT_QUAD, FRAG_SIM, "sim");
    this.splatProg = make(VERT_SPLAT, FRAG_SPLAT, "splat");
    this.particleProg = make(VERT_PARTICLES, FRAG_PARTICLES, "particles");
    this.fadeProg = make(VERT_QUAD, FRAG_FADE, "fade");
    this.gridBlurProg = make(VERT_QUAD, FRAG_GRIDBLUR, "gridblur");
    this.copyProg = make(VERT_QUAD, FRAG_COPY, "copy");
    this.curlProg = make(VERT_QUAD, FRAG_CURL, "curl");
    this.downProg = make(VERT_QUAD, FRAG_DOWNSAMPLE, "down");
    this.blurProg = make(VERT_QUAD, FRAG_BLUR, "blur");
    this.compProg = make(VERT_QUAD, FRAG_COMPOSITE, "composite");
    this.programs = [
      this.simProg,
      this.splatProg,
      this.particleProg,
      this.fadeProg,
      this.gridBlurProg,
      this.copyProg,
      this.curlProg,
      this.downProg,
      this.blurProg,
      this.compProg,
    ];
    this.linked = !defer;
    const vao = gl.createVertexArray();
    if (!vao) throw new Error("createVertexArray failed");
    this.vao = vao;
    gl.disable(gl.DEPTH_TEST);
    gl.disable(gl.CULL_FACE);
    gl.disable(gl.SCISSOR_TEST);
  }

  private bakePalette() {
    const pal = this.params.palette;
    pal.stops.forEach((hex, i) => {
      const c = hexToLinear(hex);
      this.palette[i * 3] = c[0];
      this.palette[i * 3 + 1] = c[1];
      this.palette[i * 3 + 2] = c[2];
    });
    this.ink = hexToLinear(pal.ink);
    this.hazeCol = hexToLinear(pal.haze);
  }

  private allocTargets(resetState: boolean) {
    const gl = this.gl;
    const tier = TIERS[this.tier];
    const dprCap =
      this.halfRate && this.tier <= 2
        ? Math.max(tier.dprCap, 1.5)
        : tier.dprCap;
    this.dpr = Math.min(window.devicePixelRatio || 1, dprCap);
    const cssW = Math.max(1, this.canvas.clientWidth);
    const cssH = Math.max(1, this.canvas.clientHeight);
    const cap = this.options.areaCap ?? 2.6e6;
    const area = cssW * cssH * this.dpr * this.dpr;
    if (area > cap) this.dpr *= Math.sqrt(cap / area);
    this.width = Math.max(1, Math.round(cssW * this.dpr));
    this.height = Math.max(1, Math.round(cssH * this.dpr));
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    const oldTrail = this.trail[this.trailIdx];
    for (let i = 0; i < 2; i++) {
      if (this.trail[i] !== oldTrail) deleteTarget(gl, this.trail[i]);
      this.trail[i] = createTarget(
        gl,
        this.width,
        this.height,
        gl.R16F,
        gl.RED,
        gl.HALF_FLOAT,
        gl.LINEAR,
      );
      deleteTarget(gl, this.haze[i]);
      this.haze[i] = createTarget(
        gl,
        Math.max(1, this.width >> 3),
        Math.max(1, this.height >> 3),
        gl.R16F,
        gl.RED,
        gl.HALF_FLOAT,
        gl.LINEAR,
      );
      if (!this.curl) {
        this.curl = createTarget(
          gl,
          CURL_W,
          CURL_H,
          gl.RG16F,
          gl.RG,
          gl.HALF_FLOAT,
          gl.LINEAR,
        );
        this.clearTarget(this.curl);
      }
      if (!this.align[i]) {
        this.align[i] = createTarget(
          gl,
          ALIGN_W,
          ALIGN_H,
          gl.RGBA16F,
          gl.RGBA,
          gl.HALF_FLOAT,
          gl.LINEAR,
        );
        this.clearTarget(this.align[i]!);
      }
    }
    this.clearTarget(this.trail[1]!);
    this.clearTarget(this.haze[0]!);
    if (oldTrail) {
      this.blit(oldTrail, this.trail[0]!, true);
      deleteTarget(gl, oldTrail);
    } else {
      this.clearTarget(this.trail[0]!);
    }
    this.trailIdx = 0;

    if (resetState || this.size !== tier.size) {
      const oldState = resetState ? null : this.state[this.stateIdx];
      const oldOther = resetState ? null : this.state[1 - this.stateIdx];
      this.size = tier.size;
      const data = oldState ? null : this.initialState(this.size);
      const fresh: [Target | null, Target | null] = [null, null];
      for (let i = 0; i < 2; i++) {
        fresh[i] = createTarget(
          gl,
          this.size,
          this.size,
          gl.RGBA32F,
          gl.RGBA,
          gl.FLOAT,
          gl.NEAREST,
          data,
        );
      }
      if (oldState) {
        this.blit(oldState, fresh[0]!, false);
        deleteTarget(gl, oldState);
        deleteTarget(gl, oldOther);
      } else {
        deleteTarget(gl, this.state[0]);
        deleteTarget(gl, this.state[1]);
      }
      this.state = fresh;
      this.stateIdx = 0;
    }
    this.stillFrame = false;
  }

  private blit(src: Target, dst: Target, resample: boolean) {
    const gl = this.gl;
    gl.bindFramebuffer(gl.FRAMEBUFFER, dst.fbo);
    gl.viewport(0, 0, dst.w, dst.h);
    gl.disable(gl.BLEND);
    gl.bindVertexArray(this.vao);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, src.tex);
    if (resample) {
      const fade = this.fadeProg;
      fade.use();
      fade.i1("uTrail", 0);
      fade.f2("uTexel", 1 / src.w, 1 / src.h);
      fade.f1("uDecay", 1);
      fade.f1("uDiffuse", 0);
      fade.f1("uFloor", 0);
    } else {
      const copy = this.copyProg;
      copy.use();
      copy.i1("uSrc", 0);
    }
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  }

  private clearTarget(t: Target) {
    const gl = this.gl;
    gl.bindFramebuffer(gl.FRAMEBUFFER, t.fbo);
    gl.viewport(0, 0, t.w, t.h);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  }

  private gainScale() {
    const area = this.width * this.height;
    const n = this.size * this.size;
    return Math.pow((area / (1440 * 900)) * (262144 / n), 0.8);
  }

  private camera() {
    const p = this.params;
    const t = Math.tan((p.fovDeg * Math.PI) / 360);
    const T = (1 - p.horizonFromTop) * 2 - 1;
    const h = p.camH;
    const u = (T * t * p.zFar + h) / (p.zFar - T * t * h);
    const pitch = Math.atan(u);
    const aspect = this.width / Math.max(1, this.height);
    return { tanHalfFov: t, pitch, aspect, horizonUv: 1 - p.horizonFromTop };
  }

  private halfWidthAt(z: number, cam: ReturnType<HeroFieldImpl["camera"]>) {
    const c = Math.cos(cam.pitch);
    const s = Math.sin(cam.pitch);
    const vz = this.params.camH * s + z * c;
    return vz * cam.tanHalfFov * cam.aspect * 1.12 + 0.35;
  }

  private initialState(size: number) {
    const p = this.params;
    const cam = this.camera();
    const n = size * size;
    const data = new Float32Array(n * 4);
    let seed = 0x9e3779b9;
    const rnd = () => {
      seed = (seed * 1664525 + 1013904223) >>> 0;
      return seed / 4294967296;
    };
    for (let i = 0; i < n; i++) {
      const z = p.zNear + (p.zFar - p.zNear) * Math.pow(rnd(), p.depthBias);
      const x = (rnd() * 2 - 1) * this.halfWidthAt(z, cam);
      const life = p.lifeMin + (p.lifeMax - p.lifeMin) * rnd();
      data[i * 4 + 0] = x;
      data[i * 4 + 1] = z;
      data[i * 4 + 2] = rnd() * life;
      data[i * 4 + 3] = life;
    }
    return data;
  }

  private prewarm() {
    this.pendingSim = this.reducedMotion ? 120 : 60;
    this.pendingTrail = this.reducedMotion ? 60 : 12;
  }
  private drainWarm() {
    if (this.pendingSim <= 0 && this.pendingTrail <= 0) return false;
    const dt = 1 / 60;
    let sim = Math.min(this.pendingSim, 8);
    this.pendingSim -= sim;
    while (sim-- > 0) this.simulate(dt, false);
    if (this.pendingSim <= 0) {
      let tr = Math.min(this.pendingTrail, 3);
      this.pendingTrail -= tr;
      while (tr-- > 0) this.simulate(dt, true);
    }
    return this.pendingSim > 0 || this.pendingTrail > 0;
  }
  private programsReady() {
    if (this.linked) return true;
    const status = this.parallelCompile?.COMPLETION_STATUS_KHR ?? null;
    let all = true;
    for (const prog of this.programs) if (!prog.ready(status)) all = false;
    this.linked = all;
    return all;
  }

  private resize() {
    if (this.disposed || this.gl.isContextLost()) return;
    const cssW = this.canvas.clientWidth;
    const cssH = this.canvas.clientHeight;
    if (cssW === 0 || cssH === 0) return;
    const tier = TIERS[this.tier];
    const dprCap =
      this.halfRate && this.tier <= 2
        ? Math.max(tier.dprCap, 1.5)
        : tier.dprCap;
    const cap = this.options.areaCap ?? 2.6e6;
    let dpr = Math.min(window.devicePixelRatio || 1, dprCap);
    const area = cssW * cssH * dpr * dpr;
    if (area > cap) dpr *= Math.sqrt(cap / area);
    const w = Math.round(cssW * dpr);
    const h = Math.round(cssH * dpr);
    if (Math.abs(w - this.width) < 2 && Math.abs(h - this.height) < 2) return;
    window.clearTimeout(this.resizeTimer);
    this.resizeTimer = window.setTimeout(() => {
      if (this.disposed || this.gl.isContextLost()) return;
      this.allocTargets(false);
      if (this.reducedMotion) this.warm(0, 40);
      this.settleUntil = performance.now() + 2000;
      if (!this.active || this.reducedMotion) this.renderOnce();
    }, 120);
  }

  private startLoop() {
    if (this.raf || this.disposed || this.gl.isContextLost()) return;
    this.lastT = 0;
    this.lastPresent = 0;
    this.settleUntil = performance.now() + 3000;
    const tick = (t: number) => {
      this.raf = 0;
      if (this.disposed || !this.active || document.hidden) return;
      this.step(t);
      if (
        this.reducedMotion &&
        this.stillFrame &&
        this.pendingSim <= 0 &&
        this.pendingTrail <= 0
      )
        return;
      this.raf = requestAnimationFrame(tick);
    };
    this.raf = requestAnimationFrame(tick);
  }

  private stopLoop() {
    if (this.raf) cancelAnimationFrame(this.raf);
    this.raf = 0;
  }

  private step(t: number) {
    try {
      if (!this.programsReady()) return;
    } catch (err) {
      if (this.debug) console.error("[hero-field]", err);
      this.stopLoop();
      this.options.onFallback?.("shader-link-failed");
      return;
    }
    if (this.drainWarm()) return;
    if (!this.revealStart) this.revealStart = t;
    if (this.reducedMotion) {
      this.reveal = 1;
      this.composite();
      this.stillFrame = true;
      return;
    }
    const interval = this.halfRate ? 1000 / 30 : 1000 / 60;
    if (this.lastPresent && t - this.lastPresent < interval - 3) return;
    this.lastPresent = t;
    let dt = this.lastT ? (t - this.lastT) / 1000 : 1 / 60;
    this.lastT = t;

    const budgetMs = this.halfRate ? 44 : 22;
    const ms = Math.min(dt * 1000, budgetMs * 2);
    this.frameEma += (ms - this.frameEma) * 0.08;
    if (t > this.settleUntil && this.frameEma > budgetMs) this.overBudget += 1;
    else this.overBudget = 0;
    if (
      !this.options.lockTier &&
      this.overBudget >= 30 &&
      this.downgrades < 2 &&
      this.tier < TIERS.length - 1 &&
      !this.gl.isContextLost()
    ) {
      this.tier += 1;
      this.downgrades += 1;
      this.frameEma = budgetMs * 0.75;
      this.overBudget = 0;
      this.settleUntil = t + 3000;
      if (this.debug) console.info("[hero-field] downgrade → tier", this.tier);
      this.allocTargets(false);
      this.options.onTierChange?.(this.getInfo());
    }

    dt = Math.min(Math.max(dt, 1 / 240), 1 / 30);
    const p = this.params;
    const since = (t - this.revealStart) / 1000 - p.revealDelay;
    this.reveal = EASE_OUT(since / Math.max(0.01, p.revealSeconds));
    this.simulate(dt * p.timeScale);
    this.composite();
  }

  private renderOnce() {
    if (this.gl.isContextLost() || !this.programsReady()) return;
    this.reveal = this.reducedMotion ? 1 : this.reveal;
    this.composite();
    if (this.reducedMotion) this.stillFrame = true;
  }

  private scheduleGust(now: number) {
    const p = this.params;
    this.gustAt =
      now + p.gustMinGap + Math.random() * (p.gustMaxGap - p.gustMinGap);
  }

  private updateGust(dt: number) {
    const p = this.params;
    if (this.gustPos < 0) {
      if (this.simTime >= this.gustAt) {
        this.gustPos = 1.15;
        this.gustAmp = p.gustAmp;
      }
      return;
    }
    this.gustPos -= dt * (1.3 / Math.max(1, p.gustSeconds));
    if (this.gustPos < -0.3) {
      this.gustPos = -1;
      this.gustAmp = 0;
      this.scheduleGust(this.simTime);
    }
  }

  warm(simSteps: number, trailSteps: number) {
    if (this.gl.isContextLost()) return;
    while (!this.programsReady()) {}
    simSteps += this.pendingSim;
    trailSteps += this.pendingTrail;
    this.pendingSim = this.pendingTrail = 0;
    const dt = 1 / 60;
    for (let i = 0; i < simSteps; i++) this.simulate(dt, false);
    for (let i = 0; i < trailSteps; i++) this.simulate(dt, true);
  }

  private simulate(dt: number, drawTrails = true) {
    const gl = this.gl;
    const p = this.params;
    const cam = this.camera();
    this.simTime += dt;
    this.frame += 1;
    this.updateGust(dt);

    const scrollWind = 1 - 0.3 * this.scroll;

    const lite = this.tier >= 2;
    gl.disable(gl.BLEND);
    gl.bindVertexArray(this.vao);
    const curlT = this.curl!;
    gl.bindFramebuffer(gl.FRAMEBUFFER, curlT.fbo);
    gl.viewport(0, 0, curlT.w, curlT.h);
    const cp = this.curlProg;
    cp.use();
    cp.f1("uTime", this.simTime * p.evolve);
    cp.f1("uCurlScale", p.curlScale);
    cp.f1("uTanHalfFov", cam.tanHalfFov);
    cp.f1("uAspect", cam.aspect);
    cp.f1("uCamH", p.camH);
    cp.f1("uPitch", cam.pitch);
    cp.f1("uZNear", p.zNear);
    cp.f1("uZFar", p.zFar);
    gl.drawArrays(gl.TRIANGLES, 0, 3);

    const src = this.state[this.stateIdx]!;
    const dst = this.state[1 - this.stateIdx]!;
    gl.bindFramebuffer(gl.FRAMEBUFFER, dst.fbo);
    gl.viewport(0, 0, dst.w, dst.h);
    const sim = this.simProg;
    sim.use();
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, src.tex);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, this.align[1]!.tex);
    gl.activeTexture(gl.TEXTURE2);
    gl.bindTexture(gl.TEXTURE_2D, curlT.tex);
    sim.i1("uState", 0);
    sim.i1("uAlign", 1);
    sim.i1("uCurl", 2);
    sim.i1("uSize", this.size);
    sim.f1("uTime", this.simTime);
    sim.f1("uDt", dt);
    sim.ui1("uFrame", this.frame);
    sim.f1("uZNear", p.zNear);
    sim.f1("uZFar", p.zFar);
    sim.f1("uDepthBias", p.depthBias);
    const swing =
      p.windSwing * Math.sin((this.simTime * 2 * Math.PI) / p.windPeriod);
    const a = p.windAngle + swing;
    sim.f2("uWind", Math.cos(a), Math.sin(a));
    sim.f1("uSpeedNear", p.speedNear * scrollWind);
    sim.f1("uSpeedFar", p.speedFar * scrollWind);
    sim.f1("uCurlAmp", p.curlAmp);
    sim.f1("uAlignNear", p.alignNear);
    sim.f1("uAlignFar", p.alignFar);
    sim.f1("uGustAmp", this.gustAmp);
    sim.f1("uGustPos", this.gustPos);
    sim.f1("uGustWidth", 0.14);
    sim.f1("uTanHalfFov", cam.tanHalfFov);
    sim.f1("uAspect", cam.aspect);
    sim.f1("uCamH", p.camH);
    sim.f1("uPitch", cam.pitch);
    sim.f1("uLifeMin", p.lifeMin);
    sim.f1("uLifeMax", p.lifeMax);
    this.updatePointerWorld(cam, dt);
    const pw = this.pointerWorld;
    sim.f3("uPointer", pw.x, pw.z, pw.s);
    sim.f1("uPointerR", pw.r);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    this.stateIdx = 1 - this.stateIdx;
    const cur = this.state[this.stateIdx]!;
    const prev = this.state[1 - this.stateIdx]!;
    const a0 = this.align[0]!;
    const a1 = this.align[1]!;
    if (!lite || (this.frame & 1) === 0) {
      gl.bindFramebuffer(gl.FRAMEBUFFER, a0.fbo);
      gl.viewport(0, 0, a0.w, a0.h);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.ONE, gl.ONE);
      const sp = this.splatProg;
      sp.use();
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, cur.tex);
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, prev.tex);
      sp.i1("uStateCur", 0);
      sp.i1("uStatePrev", 1);
      sp.i1("uSize", this.size);
      sp.f1("uDt", dt);
      sp.f1("uTanHalfFov", cam.tanHalfFov);
      sp.f1("uAspect", cam.aspect);
      sp.f1("uCamH", p.camH);
      sp.f1("uPitch", cam.pitch);
      sp.f1("uZNear", p.zNear);
      sp.f1("uZFar", p.zFar);
      gl.drawArrays(gl.POINTS, 0, this.size * this.size);
      gl.disable(gl.BLEND);
      gl.bindFramebuffer(gl.FRAMEBUFFER, a1.fbo);
      const gb = this.gridBlurProg;
      gb.use();
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, a0.tex);
      gb.i1("uSrc", 0);
      gb.f2("uTexel", 1 / a0.w, 1 / a0.h);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }
    const fade = this.fadeProg;

    if (!drawTrails) {
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      return;
    }

    const tSrc = this.trail[this.trailIdx]!;
    const tDst = this.trail[1 - this.trailIdx]!;
    gl.bindFramebuffer(gl.FRAMEBUFFER, tDst.fbo);
    gl.viewport(0, 0, tDst.w, tDst.h);
    fade.use();
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, tSrc.tex);
    fade.i1("uTrail", 0);
    fade.f2("uTexel", 1 / tDst.w, 1 / tDst.h);
    fade.f1("uDecay", Math.pow(0.5, dt / Math.max(0.05, p.trailHalfLife)));
    fade.f1("uDiffuse", p.diffuse);
    fade.f1("uFloor", p.trailFloor * dt * p.gain * this.gainScale());
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE);
    const pp = this.particleProg;
    pp.use();
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, cur.tex);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, prev.tex);
    pp.i1("uStateCur", 0);
    pp.i1("uStatePrev", 1);
    pp.i1("uSize", this.size);
    pp.f1("uTanHalfFov", cam.tanHalfFov);
    pp.f1("uAspect", cam.aspect);
    pp.f1("uCamH", p.camH);
    pp.f1("uPitch", cam.pitch);
    pp.f1("uZNear", p.zNear);
    pp.f1("uZFar", p.zFar);
    pp.f1("uGain", p.gain * this.gainScale());
    pp.f1("uNearDim", p.nearDim);
    pp.f1("uDepthRef", p.depthRef);
    pp.f1("uDepthComp", p.depthComp);
    pp.f1("uExtinction", p.extinction);
    gl.drawArrays(gl.LINES, 0, this.size * this.size * 2);
    gl.disable(gl.BLEND);
    gl.activeTexture(gl.TEXTURE0);
    this.trailIdx = 1 - this.trailIdx;

    if (lite) {
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      return;
    }
    const h0 = this.haze[0]!;
    const h1 = this.haze[1]!;
    gl.bindFramebuffer(gl.FRAMEBUFFER, h0.fbo);
    gl.viewport(0, 0, h0.w, h0.h);
    const down = this.downProg;
    down.use();
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.trail[this.trailIdx]!.tex);
    down.i1("uSrc", 0);
    down.f2("uTexel", 0.5 / h0.w, 0.5 / h0.h);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    const blur = this.blurProg;
    blur.use();
    blur.i1("uSrc", 0);
    for (const stepPx of [1, 2.5]) {
      gl.bindFramebuffer(gl.FRAMEBUFFER, h1.fbo);
      gl.bindTexture(gl.TEXTURE_2D, h0.tex);
      blur.f2("uDir", stepPx / h0.w, 0);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      gl.bindFramebuffer(gl.FRAMEBUFFER, h0.fbo);
      gl.bindTexture(gl.TEXTURE_2D, h1.tex);
      blur.f2("uDir", 0, stepPx / h0.h);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }

    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  }

  private composite() {
    const gl = this.gl;
    const p = this.params;
    const cam = this.camera();
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.viewport(0, 0, this.width, this.height);
    gl.disable(gl.BLEND);
    gl.bindVertexArray(this.vao);
    const c = this.compProg;
    c.use();
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.trail[this.trailIdx]!.tex);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, this.haze[0]!.tex);
    c.i1("uTrail", 0);
    c.i1("uHaze", 1);
    c.f2("uRes", this.width, this.height);
    c.f1("uTime", this.simTime);
    c.f1("uFrameSeed", Math.floor(this.simTime * 24) % 1024);
    c.f1("uHorizon", cam.horizonUv);
    c.f1("uSunX", p.sunX);
    c.f1("uTanHalfFov", cam.tanHalfFov);
    c.f1("uAspect", cam.aspect);
    c.f1("uCamH", p.camH);
    c.f1("uPitch", cam.pitch);
    c.f1("uZNear", p.zNear);
    c.f1("uZFar", p.zFar);
    const scrollExposure = Math.pow(
      2,
      -p.scrollStops * Math.min(1, this.scroll / 0.85),
    );
    c.f1("uExposure", p.exposure * scrollExposure);
    c.f1("uKeyGain", p.keyGain);
    c.f1("uShadowSide", p.shadowSide);
    c.f1("uGlitter", p.glitter);
    c.f1("uHazeGain", p.hazeGain);
    c.f1("uGlow", p.glow);
    c.f1("uSkyFall", p.skyFall);
    c.f1("uFeather", p.feather);
    c.f1("uFog", p.fog);
    c.f1("uFogLift", p.fogLift);
    c.f1("uBottomFade", p.bottomFade);
    c.f1("uSat", p.sat);
    c.f1("uGrain", p.grain);
    c.f1("uReveal", this.reducedMotion ? 1 : this.reveal);
    c.f2(
      "uParallax",
      this.parallax.x,
      this.parallax.y + (this.reducedMotion ? 0 : this.scroll * p.scrollShift),
    );
    c.f3("uInk", this.ink[0], this.ink[1], this.ink[2]);
    c.f3("uHazeCol", this.hazeCol[0], this.hazeCol[1], this.hazeCol[2]);
    c.f3v("uP[0]", this.palette);
    c.f1("uWarmDrift", Math.sin((this.simTime * 2 * Math.PI) / 180));
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    gl.activeTexture(gl.TEXTURE0);
  }

  private updatePointerWorld(
    cam: ReturnType<HeroFieldImpl["camera"]>,
    dt: number,
  ) {
    const pw = this.pointerWorld;
    const target = this.pointer ? 1 : 0;

    const rate = target > pw.s ? 1 / 0.5 : 1 / 1.2;
    pw.s += (target - pw.s) * Math.min(1, dt * rate * 2.2);
    if (!this.pointer) return;
    const nx = this.pointer.x * 2 - 1;
    const ny = (1 - this.pointer.y) * 2 - 1;
    const dx = nx * cam.tanHalfFov * cam.aspect;
    const dy = ny * cam.tanHalfFov;
    const cth = Math.cos(cam.pitch);
    const sth = Math.sin(cam.pitch);
    const wy = dy * cth - sth;
    const wz = dy * sth + cth;
    if (wy >= -1e-4) return;
    const tHit = -this.params.camH / wy;
    const x = dx * tHit;
    const z = wz * tHit;
    if (z < this.params.zNear || z > this.params.zFar) return;
    const depth = this.params.camH * sth + z * cth;
    pw.x = x;
    pw.z = z;
    pw.r = depth * cam.tanHalfFov * 2 * this.params.pointerRadius;
  }

  setPointer(x: number | null, y = 0) {
    if (this.reducedMotion) return;
    this.pointer = x === null ? null : { x, y };
  }
  setParallax(x: number, y: number) {
    if (this.reducedMotion) return;
    this.parallax.x = x;
    this.parallax.y = y;
  }
  setScroll(p: number) {
    const v = Math.min(1, Math.max(0, p));
    if (v === this.scroll) return;
    this.scroll = v;
    if (this.reducedMotion && !this.raf) this.renderOnce();
  }
  setActive(active: boolean) {
    this.active = active;
    if (active) this.startLoop();
    else this.stopLoop();
  }
  setHorizon(fromTop: number) {
    const v = Math.min(0.6, Math.max(0.12, fromTop));
    if (Math.abs(v - this.params.horizonFromTop) < 1e-4) return;
    this.params.horizonFromTop = v;
    if (this.reducedMotion && !this.gl.isContextLost()) {
      this.clearTarget(this.trail[0]!);
      this.clearTarget(this.trail[1]!);
      this.warm(0, 60);
    }
    if (this.reducedMotion && !this.raf) this.renderOnce();
  }
  setParams(p: Partial<FieldParams>) {
    const pal = p.palette
      ? { ...this.params.palette, ...p.palette }
      : this.params.palette;
    this.params = { ...this.params, ...p, palette: pal };
    if (p.palette) this.bakePalette();
    if (this.reducedMotion && !this.raf) this.renderOnce();
  }
  getParams() {
    return { ...this.params, palette: { ...this.params.palette } };
  }
  getInfo(): FieldInfo {
    const gl = this.gl;
    let renderer = "";
    const dbg = gl.getExtension("WEBGL_debug_renderer_info");
    if (dbg) renderer = String(gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL));
    return {
      frameMs: +this.frameEma.toFixed(2),
      particles: this.size * this.size,
      size: this.size,
      dpr: this.dpr,
      width: this.width,
      height: this.height,
      renderer,
      tier: this.tier,
    };
  }
  capture() {
    this.composite();
    return this.canvas.toDataURL("image/png");
  }
  probe() {
    const gl = this.gl;
    const read = (t: Target, n: number, w: number) => {
      gl.bindFramebuffer(gl.FRAMEBUFFER, t.fbo);
      const buf = new Float32Array(w * 4);
      const rows: number[][] = [];
      for (let i = 0; i < n; i++) {
        gl.readPixels(0, i * 7, w, 1, gl.RGBA, gl.FLOAT, buf);
        rows.push(Array.from(buf.slice(0, 4)).map((v) => +v.toFixed(4)));
      }
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      return rows;
    };
    const particles = read(this.state[this.stateIdx]!, 8, 1);
    const align = read(this.align[1]!, 6, 1);
    const tr = this.trail[this.trailIdx]!;
    gl.bindFramebuffer(gl.FRAMEBUFFER, tr.fbo);
    const row = new Float32Array(tr.w * 4);
    let mx = 0;
    for (let y = 0; y < tr.h; y += Math.max(1, tr.h >> 5)) {
      gl.readPixels(0, y, tr.w, 1, gl.RGBA, gl.FLOAT, row);
      for (let i = 0; i < row.length; i += 4) if (row[i] > mx) mx = row[i];
    }
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    return { particles, align, trailMax: mx };
  }
  dispose() {
    if (this.disposed) return;
    this.disposed = true;
    this.stopLoop();
    window.clearTimeout(this.lostTimer);
    window.clearTimeout(this.resizeTimer);
    this.ro?.disconnect();
    this.canvas.removeEventListener("webglcontextlost", this.onLost);
    this.canvas.removeEventListener("webglcontextrestored", this.onRestored);
    document.removeEventListener("visibilitychange", this.onVisibility);
    const gl = this.gl;
    if (gl.isContextLost()) return;
    for (const t of [
      ...this.state,
      ...this.align,
      this.curl,
      ...this.trail,
      ...this.haze,
    ])
      deleteTarget(gl, t);
    this.simProg.dispose();
    this.splatProg.dispose();
    this.particleProg.dispose();
    this.fadeProg.dispose();
    this.gridBlurProg.dispose();
    this.copyProg.dispose();
    this.curlProg.dispose();
    this.downProg.dispose();
    this.blurProg.dispose();
    this.compProg.dispose();
    gl.deleteVertexArray(this.vao);
    this.align[0] = this.align[1] = null;
    this.curl = null;
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.clearColor(0.0392, 0.0392, 0.0392, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
  }
}
