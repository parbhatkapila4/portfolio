import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = Object.fromEntries(
  process.argv
    .slice(2)
    .map((a, i, arr) =>
      a.startsWith("--")
        ? [
            a.slice(2),
            arr[i + 1] && !arr[i + 1].startsWith("--") ? arr[i + 1] : "true",
          ]
        : [],
    )
    .filter((x) => x.length),
);
const URL = args.url ?? "http://localhost:3102/";
const MODE = args.mode ?? "hero";
const LABEL =
  args.label ??
  `${MODE}${args.toggle ? "-" + args.toggle.replace(/,/g, "+") : ""}`;
const OUT_DIR = path.join(root, "_shots/perf");
const VIEWPORT = {
  width: Number(args.width ?? 1440),
  height: Number(args.height ?? 900),
};
const DPR = Number(args.dpr ?? 1);
const SCROLL_VH = Number(args.vh ?? 2);
const SCROLL_MS = Number(args.ms ?? 3000);
const WHEEL_EVERY_MS = 50;

const TOGGLE_CSS = {
  noblur:
    "header{backdrop-filter:none!important;-webkit-backdrop-filter:none!important}",
  nomarquee: '[class*="animate-[marquee"]{animation:none!important}',
  nomask:
    '[class*="mask-image"]{-webkit-mask-image:none!important;mask-image:none!important}',
  noheaderbg:
    "header{background-color:transparent!important;border-color:transparent!important}",
  noblurtransition:
    "header{transition-property:background-color,border-color,color!important}",
  nomarqueetext: ".text-outline{visibility:hidden!important}",
  hidemarquee: '[class*="animate-[marquee"]{display:none!important}',
  noreveal: "#home dl{opacity:1!important;transform:none!important}",
  nostriptext: "#home dl{visibility:hidden!important}",
  hidestrip: "#home dl{display:none!important}",
  nostatusdot: "[data-hero-stage] .animate-ping{display:none!important}",
  noheader: "header{visibility:hidden!important}",
  noglobalgrain:
    "body > div.pointer-events-none.fixed.inset-0{display:none!important}",
  nocontent: "[data-hero-stage] > div.relative{visibility:hidden!important}",
  norail: 'nav[aria-label="Section navigation"]{display:none!important}',
  nobar: 'a[aria-label^="Book a 30"]{display:none!important}',
  nobarshadow: 'a[aria-label^="Book a 30"]{box-shadow:none!important}',
  hidebelow:
    '#home dl,[class*="animate-[marquee"]{display:none!important} #projects{visibility:hidden!important}',
};

const CATEGORIES = [
  "-*",
  ...(args.gpucats === "true"
    ? [
        "skia",
        "skia.gpu",
        "skia.shaders",
        "gpu",
        "viz",
        "disabled-by-default-skia",
        "disabled-by-default-skia.gpu",
        "disabled-by-default-gpu.service",
        "cc",
      ]
    : []),
  "devtools.timeline",
  "disabled-by-default-devtools.timeline",
  "disabled-by-default-devtools.timeline.frame",
  "disabled-by-default-devtools.timeline.stack",
  "blink.user_timing",
  "toplevel",
  "v8.execute",
];

await mkdir(OUT_DIR, { recursive: true });

const ANALYZE_ONLY = args.analyze === "true";

let launchLabel, renderer, heroSrc, startY, endY, raf;
if (!ANALYZE_ONLY) {
  let browser;
  try {
    browser = await chromium.launch({
      channel: "chrome",
      headless: true,
      args: [
        "--ignore-gpu-blocklist",
        "--use-angle=d3d11",
        "--disable-features=CalculateNativeWinOcclusion",
      ],
    });
    launchLabel = "chrome (headless=new, D3D11)";
  } catch {
    browser = await chromium.launch({
      headless: true,
      args: [
        "--ignore-gpu-blocklist",
        "--use-angle=d3d11",
        "--enable-gpu-rasterization",
      ],
    });
    launchLabel = "bundled chromium (headless, gpu flags)";
  }

  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: DPR,
    colorScheme: "dark",
  });
  const page = await context.newPage();
  if (
    args.toggle === "reduced" ||
    args.toggle?.split(",").includes("reduced")
  ) {
    await page.emulateMedia({ reducedMotion: "reduce" });
  }

  renderer = await page.evaluate(() => {
    const c = document.createElement("canvas");
    const gl = c.getContext("webgl2") || c.getContext("webgl");
    const ext = gl && gl.getExtension("WEBGL_debug_renderer_info");
    return ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : "unknown";
  });

  await page.goto(URL, { waitUntil: "load", timeout: 120000 });
  await page.waitForFunction(
    () => {
      if (window.__heroField) return true;
      const c = document.querySelector("[data-hero-stage] canvas");
      if (c && c.width > 300) return true;
      const img = document.querySelector("[data-hero-stage] img");
      return (
        !!img &&
        img.complete &&
        img.naturalWidth > 0 &&
        /\/hero\//.test(img.currentSrc)
      );
    },
    null,
    { timeout: 60000 },
  );
  heroSrc = await page.evaluate(() => {
    const field = window.__heroField;
    if (field) return { live: true, ...field.getInfo() };
    const c = document.querySelector("[data-hero-stage] canvas");
    if (c && c.width > 300)
      return { live: true, width: c.width, height: c.height };
    const img = document.querySelector("[data-hero-stage] img");
    if (!img) return { live: false, src: "pending" };
    return {
      live: false,
      src: img.currentSrc.split("/").pop(),
      decoding: img.getAttribute("decoding"),
      fetchpriority: img.getAttribute("fetchpriority"),
    };
  });

  await page.waitForTimeout(2600);

  if (args.toggle && args.toggle !== "reduced") {
    const names =
      args.toggle === "all" ? Object.keys(TOGGLE_CSS) : args.toggle.split(",");
    const css = names
      .map((n) => TOGGLE_CSS[n])
      .filter(Boolean)
      .join("\n");
    if (css) await page.addStyleTag({ content: css });
    await page.waitForTimeout(300);
  }

  if (args.prewarm === "true") {
    await page.evaluate(() => window.scrollTo(0, 40));
    await page.waitForTimeout(500);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(600);
  }
  if (args.warm === "true") {
    const px = Math.round(VIEWPORT.height * SCROLL_VH);
    for (let i = 0; i < 40; i++) {
      await page.mouse.wheel(0, px / 40);
      await page.waitForTimeout(50);
    }
    await page.waitForTimeout(1500);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(1800);
  }
  if (MODE === "control") {
    await page.evaluate(() =>
      window.scrollTo(0, Math.round(window.innerHeight * 3.2)),
    );
    await page.waitForTimeout(1500);
  }
  startY = await page.evaluate(() => window.scrollY);

  await page.evaluate(() => {
    window.__raf = { t: [], on: true };
    const loop = (ts) => {
      if (!window.__raf.on) return;
      window.__raf.t.push(ts);
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  });

  await page.mouse.move(VIEWPORT.width / 2, VIEWPORT.height / 2);
  await browser.startTracing(page, {
    path: path.join(OUT_DIR, `${LABEL}.trace.json`),
    screenshots: false,
    categories: CATEGORIES,
  });
  await page.waitForTimeout(200);
  await page.evaluate(() => performance.mark("scroll-start"));

  const totalPx = Math.round(VIEWPORT.height * SCROLL_VH);
  const steps = Math.round(SCROLL_MS / WHEEL_EVERY_MS);
  const perStep = totalPx / steps;
  const t0 = Date.now();
  for (let i = 0; i < steps; i++) {
    await page.mouse.wheel(0, perStep);
    const target = t0 + (i + 1) * WHEEL_EVERY_MS;
    const wait = target - Date.now();
    if (wait > 0) await page.waitForTimeout(wait);
  }
  await page.waitForTimeout(1200);
  await page.evaluate(() => performance.mark("scroll-end"));
  await page.waitForTimeout(100);
  endY = await page.evaluate(() => window.scrollY);
  await browser.stopTracing();
  raf = await page.evaluate(() => {
    window.__raf.on = false;
    const m = (n) => performance.getEntriesByName(n)[0]?.startTime ?? null;
    return {
      t: window.__raf.t,
      scrollStart: m("scroll-start"),
      scrollEnd: m("scroll-end"),
    };
  });
  await browser.close();
  await writeFile(
    path.join(OUT_DIR, `${LABEL}.meta.json`),
    JSON.stringify({ launchLabel, renderer, heroSrc, startY, endY, raf }),
  );
} else {
  ({ launchLabel, renderer, heroSrc, startY, endY, raf } = JSON.parse(
    await readFile(path.join(OUT_DIR, `${LABEL}.meta.json`), "utf8"),
  ));
}

const trace = JSON.parse(
  await readFile(path.join(OUT_DIR, `${LABEL}.trace.json`), "utf8"),
);
const events = trace.traceEvents ?? trace;

const marks = Object.fromEntries(
  events
    .filter(
      (e) =>
        e.cat?.includes("blink.user_timing") &&
        (e.name === "scroll-start" || e.name === "scroll-end"),
    )
    .map((e) => [e.name, e.ts]),
);
const W0 = marks["scroll-start"] ?? -Infinity;
const W1 = marks["scroll-end"] ?? Infinity;
const inWindow = (e) => e.ts >= W0 && e.ts <= W1;

const threadName = {};
for (const e of events)
  if (e.ph === "M" && e.name === "thread_name")
    threadName[`${e.pid}:${e.tid}`] = e.args?.name;
const procName = {};
for (const e of events)
  if (e.ph === "M" && e.name === "process_name") procName[e.pid] = e.args?.name;
const tkey = (e) => `${e.pid}:${e.tid}`;

const open = new Map();
const allFrames = [];
for (const e of events
  .filter((x) => x.name === "PipelineReporter")
  .sort((a, b) => a.ts - b.ts)) {
  const k = `${e.id ?? e.id2?.local ?? ""}`;
  if (e.ph === "b") {
    const r = e.args?.frame_reporter ?? e.args?.chrome_frame_reporter ?? {};
    const f = {
      start: e.ts,
      state: r.state,
      affects: r.affects_smoothness,
      seq: r.frame_sequence,
      scroll: r.scroll_state,
    };
    if (!open.has(k)) open.set(k, []);
    open.get(k).push(f);
    allFrames.push(f);
  } else if (e.ph === "e" && open.get(k)?.length) {
    open.get(k).shift().end = e.ts;
  }
}
const frames = allFrames.filter((f) => f.end && f.start >= W0 && f.start <= W1);
const presented = frames.filter(
  (f) =>
    f.state === "STATE_PRESENTED_ALL" || f.state === "STATE_PRESENTED_PARTIAL",
);
const dropped = frames.filter((f) => f.state === "STATE_DROPPED");
const droppedSmooth = dropped.filter((f) => f.affects);
const presentedTimes = presented.map((f) => f.end).sort((a, b) => a - b);
let worstGapMs = 0;
for (let i = 1; i < presentedTimes.length; i++)
  worstGapMs = Math.max(
    worstGapMs,
    (presentedTimes[i] - presentedTimes[i - 1]) / 1000,
  );

const rafT = (raf.t ?? raf).filter(
  (t) =>
    (raf.scrollStart == null || t >= raf.scrollStart) &&
    (raf.scrollEnd == null || t <= raf.scrollEnd),
);
const deltas = [];
const longAt = [];
for (let i = 1; i < rafT.length; i++) {
  const d = rafT[i] - rafT[i - 1];
  deltas.push(d);
  if (d > 20)
    longAt.push({
      at: +((rafT[i - 1] - (raf.scrollStart ?? 0)) / 1).toFixed(0),
      ms: +d.toFixed(1),
    });
}
const sorted = [...deltas].sort((a, b) => a - b);
const pct = (p) =>
  sorted[Math.min(sorted.length - 1, Math.floor(p * sorted.length))] ?? 0;
const longFrames = deltas.filter((d) => d > 20).length;
const veryLong = deltas.filter((d) => d > 34).length;

const mainKeys = new Set(
  Object.entries(threadName)
    .filter(([, n]) => n === "CrRendererMain")
    .map(([k]) => k),
);
const gpuKeys = new Set(
  Object.entries(threadName)
    .filter(([, n]) => n === "CrGpuMain")
    .map(([k]) => k),
);
const compositorKeys = new Set(
  Object.entries(threadName)
    .filter(([, n]) => n === "Compositor")
    .map(([k]) => k),
);
const rasterKeys = new Set(
  Object.entries(threadName)
    .filter(([, n]) =>
      /CompositorTileWorker|ThreadPoolForegroundWorker/.test(n ?? ""),
    )
    .map(([k]) => k),
);

const CATS = {
  style: [
    "UpdateLayoutTree",
    "ScheduleStyleRecalculation",
    "StyleRecalcInvalidationTracking",
  ],
  layout: ["Layout", "InvalidateLayout", "LayoutShift"],
  paint: ["Paint", "PaintImage", "PrePaint", "UpdateLayer", "UpdateLayerTree"],
  composite: ["CompositeLayers", "Commit", "Layerize"],
  script: [
    "FunctionCall",
    "EvaluateScript",
    "v8.callFunction",
    "TimerFire",
    "EventDispatch",
    "RunMicrotasks",
    "FireAnimationFrame",
    "RequestAnimationFrame",
  ],
  hittest: ["HitTest"],
};
const catOf = (name) =>
  Object.entries(CATS).find(([, names]) => names.includes(name))?.[0];

const mainDur = {};
const longTasks = [];
const fnTotals = new Map();
const mainComplete = events.filter(
  (e) => e.ph === "X" && mainKeys.has(tkey(e)) && inWindow(e),
);
for (const e of mainComplete) {
  const c = catOf(e.name);
  if (c) mainDur[c] = (mainDur[c] ?? 0) + (e.dur ?? 0) / 1000;
  if (e.name === "FunctionCall" && e.args?.data) {
    const d = e.args.data;
    const key = `${d.functionName || "(anonymous)"} @ ${(d.url || "").split("/").pop()}:${d.lineNumber ?? "?"}`;
    fnTotals.set(key, (fnTotals.get(key) ?? 0) + (e.dur ?? 0) / 1000);
  }
  if (e.name === "RunTask" && (e.dur ?? 0) / 1000 > 8) longTasks.push(e);
}

const describeTask = (task) => {
  const kids = mainComplete.filter(
    (k) =>
      k.ts >= task.ts &&
      k.ts + (k.dur ?? 0) <= task.ts + task.dur &&
      k !== task,
  );
  const by = {};
  const fns = new Map();
  for (const k of kids) {
    const c = catOf(k.name);
    if (c) by[c] = (by[c] ?? 0) + (k.dur ?? 0) / 1000;
    if (k.name === "FunctionCall" && k.args?.data) {
      const d = k.args.data;
      const key = `${d.functionName || "(anon)"}@${(d.url || "").split("/").pop()}:${d.lineNumber ?? "?"}`;
      fns.set(key, (fns.get(key) ?? 0) + (k.dur ?? 0) / 1000);
    }
    if (k.name === "Layout" && k.args?.beginData)
      by.layoutNodes =
        (by.layoutNodes ?? 0) + (k.args.beginData.dirtyObjects ?? 0);
    if (k.name === "UpdateLayoutTree" && k.args?.elementCount)
      by.styleElems = (by.styleElems ?? 0) + k.args.elementCount;
  }
  const topFns = [...fns.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([k, v]) => `${k} ${v.toFixed(1)}ms`);
  return {
    at: ((task.ts - W0) / 1000).toFixed(0) + "ms",
    dur: (task.dur / 1000).toFixed(1) + "ms",
    by: Object.fromEntries(
      Object.entries(by).map(([k, v]) => [
        k,
        typeof v === "number" ? +v.toFixed(1) : v,
      ]),
    ),
    topFns,
  };
};
const longTaskDetails = longTasks
  .sort((a, b) => b.dur - a.dur)
  .slice(0, 8)
  .map(describeTask);

const paints = mainComplete.filter((e) => e.name === "Paint");
const paintArea = paints.reduce((s, p) => {
  const c = p.args?.data?.clip;
  if (!c || c.length < 8) return s;
  const w = Math.abs(c[2] - c[0]);
  const h = Math.abs(c[5] - c[1]);
  return s + w * h;
}, 0);

const sumDur = (keys, names) =>
  events
    .filter(
      (e) =>
        e.ph === "X" &&
        keys.has(tkey(e)) &&
        inWindow(e) &&
        (!names || names.includes(e.name)),
    )
    .reduce((s, e) => s + (e.dur ?? 0) / 1000, 0);
const gpuMs = sumDur(gpuKeys, ["GPUTask"]);
const gpuTasks = events.filter(
  (e) =>
    e.ph === "X" && gpuKeys.has(tkey(e)) && inWindow(e) && e.name === "GPUTask",
);
const gpuLong = gpuTasks.filter((e) => e.dur / 1000 > 8).length;
const gpuMaxMs = gpuTasks.reduce((m, e) => Math.max(m, e.dur / 1000), 0);
const compositorMs = sumDur(compositorKeys);
const angleKeys = new Set(
  Object.entries(threadName)
    .filter(([, n]) => /ThreadPoolForegroundWorker/.test(n ?? ""))
    .map(([k]) => k),
);
const angleMs = events
  .filter(
    (e) =>
      e.ph === "X" &&
      angleKeys.has(tkey(e)) &&
      inWindow(e) &&
      e.name === "ANGLEPlatformImpl::RunWorkerTask",
  )
  .reduce((s, e) => s + e.dur / 1000, 0);
const gpuStalls = events
  .filter(
    (e) =>
      e.ph === "X" &&
      gpuKeys.has(tkey(e)) &&
      inWindow(e) &&
      e.name === "RunTask" &&
      e.dur / 1000 > 30,
  )
  .map((e) => ({
    at: Math.round((e.ts - W0) / 1000),
    ms: +(e.dur / 1000).toFixed(1),
  }));
const rasterMs = sumDur(rasterKeys, [
  "RasterTask",
  "ImageDecodeTask",
  "DecodeImage",
]);
const windowMs = (W1 - W0) / 1000;

const summary = {
  label: LABEL,
  mode: MODE,
  toggle: args.toggle ?? null,
  browser: launchLabel,
  gpu: renderer,
  viewport: `${VIEWPORT.width}x${VIEWPORT.height}@${DPR}x`,
  hero: heroSrc,
  scroll: {
    from: startY,
    to: endY,
    px: endY - startY,
    windowMs: +windowMs.toFixed(0),
  },
  frames: {
    presented: presented.length,
    dropped: dropped.length,
    droppedAffectingSmoothness: droppedSmooth.length,
    droppedPct: frames.length
      ? +((dropped.length / (presented.length + dropped.length)) * 100).toFixed(
          1,
        )
      : null,
    worstPresentedGapMs: +worstGapMs.toFixed(1),
  },
  raf: {
    frames: deltas.length,
    meanMs: +(
      deltas.reduce((a, b) => a + b, 0) / Math.max(1, deltas.length)
    ).toFixed(2),
    p50Ms: +pct(0.5).toFixed(1),
    p95Ms: +pct(0.95).toFixed(1),
    maxMs: +(sorted[sorted.length - 1] ?? 0).toFixed(1),
    over20ms: longFrames,
    over34ms: veryLong,
    longFramesAt: longAt,
  },
  mainThreadMs: Object.fromEntries(
    Object.entries(mainDur).map(([k, v]) => [k, +v.toFixed(1)]),
  ),
  paints: { count: paints.length, areaPx: Math.round(paintArea) },
  gpu: {
    taskMs: +gpuMs.toFixed(1),
    tasksOver8ms: gpuLong,
    maxTaskMs: +gpuMaxMs.toFixed(1),
    shaderCompileWorkerMs: +angleMs.toFixed(1),
    mainStallsOver30ms: gpuStalls,
  },
  compositorThreadMs: +compositorMs.toFixed(1),
  rasterMs: +rasterMs.toFixed(1),
  topFunctions: [...fnTotals.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([k, v]) => `${k} ${v.toFixed(1)}ms`),
  longestMainTasks: longTaskDetails,
};

await writeFile(
  path.join(OUT_DIR, `${LABEL}.summary.json`),
  JSON.stringify(summary, null, 2),
);
console.log(JSON.stringify(summary, null, 2));
