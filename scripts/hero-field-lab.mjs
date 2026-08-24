import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const sharp = require("sharp");

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const [mode = "shot", ...rest] = process.argv.slice(2);
const args = Object.fromEntries(
  rest
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
const url = args.url ?? "http://localhost:3001/";
const w = Number(args.width ?? 1440);
const h = Number(args.height ?? 900);
const mobile = args.mobile === "true";
const HIDE_COPY =
  "[data-hero-stage] > div.relative{visibility:hidden!important} header{visibility:hidden!important} nav[aria-label='Section navigation']{display:none!important} a[aria-label^='Book a 30']{display:none!important}";

async function openPage(extraParams = {}) {
  const browser = await chromium.launch({
    channel: "chrome",
    headless: true,
    args: ["--ignore-gpu-blocklist", "--use-angle=d3d11"],
  });
  const ctx = await browser.newContext({
    viewport: { width: w, height: h },
    deviceScaleFactor: Number(args.dpr ?? 1),
    reducedMotion: args.rm === "true" ? "reduce" : "no-preference",
    colorScheme: args.light === "true" ? "light" : "dark",
    isMobile: mobile,
    hasTouch: mobile,
  });
  const page = await ctx.newPage();
  page.on("pageerror", (e) => console.log("[pageerror]", e.message));
  page.on("console", (m) => {
    if (args.log === "true" || m.type() === "error")
      console.log("[console]", m.type(), m.text());
  });
  const u = new URL(url);
  if (args.tier) u.searchParams.set("fieldtier", args.tier);
  for (const [k, v] of Object.entries(extraParams)) u.searchParams.set(k, v);
  await page.goto(u.toString(), { waitUntil: "networkidle" });
  if (!u.searchParams.has("fieldoff"))
    await page
      .waitForFunction(() => !!window.__heroField, null, { timeout: 20000 })
      .catch(() => console.log("no field"));
  return { browser, page };
}

const lin = (c) => {
  c /= 255;
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
};
const lum = (r, g, b) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);

async function sheet(files, out, cols = 2, cellW = 720) {
  const cellH = Math.round((cellW * h) / w);
  const labelH = 26;
  const rows = Math.ceil(files.length / cols);
  const comps = [];
  for (let i = 0; i < files.length; i++) {
    const x = (i % cols) * cellW;
    const y = Math.floor(i / cols) * (cellH + labelH);
    comps.push({
      input: await sharp(files[i].file).resize(cellW, cellH).toBuffer(),
      left: x,
      top: y + labelH,
    });
    const label = files[i].name.replace(/&/g, "&amp;").replace(/</g, "&lt;");
    comps.push({
      input: Buffer.from(
        `<svg width="${cellW}" height="${labelH}"><rect width="100%" height="100%" fill="#202020"/><text x="8" y="18" font-family="monospace" font-size="14" fill="#ddd">${label}</text></svg>`,
      ),
      left: x,
      top: y,
    });
  }
  await sharp({
    create: {
      width: cols * cellW,
      height: rows * (cellH + labelH),
      channels: 3,
      background: "#202020",
    },
  })
    .composite(comps)
    .png()
    .toFile(out);
  console.log("sheet", out);
}

if (mode === "shot") {
  const out = args.out ?? path.join(root, "_shots/hero-lab.png");
  const { browser, page } = await openPage(
    args.fieldoff === "true" ? { fieldoff: "" } : {},
  );
  if (args.hidetext === "true") await page.addStyleTag({ content: HIDE_COPY });
  if (args.json)
    await page.evaluate(
      (p) => window.__heroField?.setParams(p),
      JSON.parse(args.json),
    );
  if (args.warm) {
    const [s, t] = String(args.warm).split(",").map(Number);
    await page.evaluate(([s, t]) => window.__heroField?.warm(s, t), [s, t]);
  }
  if (args.scroll)
    await page.evaluate((y) => window.scrollTo(0, y), Number(args.scroll));
  if (args.pointer) {
    const [px, py] = String(args.pointer).split(",").map(Number);
    await page.mouse.move(px, py);
    await page.waitForTimeout(200);
    await page.mouse.move(px + 2, py + 1);
  }
  await page.waitForTimeout(Number(args.wait ?? 5000));
  console.log(
    "[info]",
    JSON.stringify(await page.evaluate(() => window.__heroField?.getInfo?.())),
  );
  fs.mkdirSync(path.dirname(out), { recursive: true });
  await page.screenshot({ path: out });
  await browser.close();
  console.log("saved", out);
} else if (mode === "batch") {
  const variants = JSON.parse(fs.readFileSync(args.variants, "utf8"));
  const out = args.out ?? path.join(root, "_shots/hero-sheet.png");
  const { browser, page } = await openPage();
  if (args.hidetext !== "false") await page.addStyleTag({ content: HIDE_COPY });
  await page.waitForTimeout(1500);
  const base = await page.evaluate(() => window.__heroField.getParams());
  const files = [];
  for (const v of variants) {
    await page.evaluate(
      ([b, p]) => {
        window.__heroField.setParams({ ...b, ...p });
        window.__heroField.warm(0, 90);
      },
      [base, v.params],
    );
    await page.waitForTimeout(Number(args.settle ?? 3000));
    const f = out.replace(/\.png$/, `-${v.name.replace(/[^\w.-]+/g, "_")}.png`);
    await page.screenshot({ path: f });
    files.push({ name: v.name, file: f });
    console.log("rendered", v.name);
  }
  await browser.close();
  await sheet(files, out, Number(args.cols ?? 2));
} else if (mode === "contrast") {
  const frames = Number(args.frames ?? 12);
  const { browser, page } = await openPage();
  const zones = await page.evaluate(() => {
    const r = (el) => {
      if (!el) return null;
      const b = el.getBoundingClientRect();
      return { x: b.left, y: b.top, w: b.width, h: b.height };
    };
    const all = Array.from(
      document.querySelectorAll(
        "[data-hero-stage] p, [data-hero-stage] h1, [data-hero-stage] a, [data-hero-stage] span, header nav",
      ),
    );
    const find = (re) => all.find((el) => re.test(el.textContent || ""));
    return {
      header: r(document.querySelector("header nav")),
      eyebrow: r(find(/AI Systems Engineer/i)),
      caption: r(find(/Fig\. 01/i)),
      h1: r(document.querySelector("[data-hero-stage] h1")),
      avail: r(find(/Available for select/i)),
      tagline: r(find(/own the reliability/i)),
      links: r(find(/engineer something/i)),
    };
  });
  await page.addStyleTag({ content: HIDE_COPY });
  await page.waitForTimeout(2500);
  const pools = Object.fromEntries(Object.keys(zones).map((k) => [k, []]));
  for (let f = 0; f < frames; f++) {
    const buf = await page.screenshot();
    const { data, info } = await sharp(buf)
      .removeAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });
    const s = Number(args.dpr ?? 1);
    for (const [k, z] of Object.entries(zones)) {
      if (!z) continue;
      const x0 = Math.max(0, Math.floor(z.x * s)),
        y0 = Math.max(0, Math.floor(z.y * s));
      const x1 = Math.min(info.width, Math.ceil((z.x + z.w) * s)),
        y1 = Math.min(info.height, Math.ceil((z.y + z.h) * s));
      for (let y = y0; y < y1; y += 2)
        for (let x = x0; x < x1; x += 2) {
          const i = (y * info.width + x) * 3;
          pools[k].push(lum(data[i], data[i + 1], data[i + 2]));
        }
    }
    await page.waitForTimeout(Number(args.gap ?? 700) + Math.random() * 400);
  }
  await browser.close();
  const L = { fg: 0.886, muted: 0.334, caption: 0.54 };
  const cr = (Lt, Lb) => ((Lt + 0.05) / (Lb + 0.05)).toFixed(2);
  for (const [k, v] of Object.entries(pools)) {
    if (!v.length) continue;
    v.sort((a, b) => a - b);
    const q = (p) => v[Math.min(v.length - 1, Math.floor(p * v.length))];
    console.log(
      `${k.padEnd(8)} n=${v.length} L p50=${q(0.5).toFixed(3)} p90=${q(0.9).toFixed(3)} p99=${q(0.99).toFixed(3)} | CR fg@p90=${cr(L.fg, q(0.9))} fg@p99=${cr(L.fg, q(0.99))} muted@p90=${cr(L.muted, q(0.9))} caption@p90=${cr(L.caption, q(0.9))}`,
    );
  }
  console.log(
    "targets: 11px mono (fg) ≥ 4.5 at p90; display h1 ≥ 3; muted rows ≥ 4.5.",
  );
} else if (mode === "bake") {
  const W = Number(args.width ?? 2560),
    H = Number(args.height ?? 1440);
  const browser = await chromium.launch({
    channel: "chrome",
    headless: true,
    args: ["--ignore-gpu-blocklist", "--use-angle=d3d11"],
  });
  const ctx = await browser.newContext({
    viewport: { width: W, height: H },
    deviceScaleFactor: 1,
  });
  const page = await ctx.newPage();
  const u = new URL(url);
  u.searchParams.set("fieldtier", "0");
  u.searchParams.set("fieldlock", "");
  u.searchParams.set("fieldarea", String(W * H + 1));
  await page.goto(u.toString(), { waitUntil: "networkidle" });
  await page.waitForFunction(() => !!window.__heroField, null, {
    timeout: 20000,
  });
  await page.waitForTimeout(1500);
  await page.evaluate(() => window.__heroField.warm(0, 240));
  await page.waitForTimeout(4500);
  console.log(
    "[info]",
    JSON.stringify(await page.evaluate(() => window.__heroField.getInfo())),
  );
  const dataUrl = await page.evaluate(() => window.__heroField.capture());
  await browser.close();
  const buf = Buffer.from(dataUrl.split(",")[1], "base64");
  const dest = path.join(root, "src/assets/hero/backdrop.jpg");
  await sharp(buf)
    .jpeg({ quality: 92, chromaSubsampling: "4:4:4", mozjpeg: true })
    .toFile(dest);
  console.log(
    "wrote",
    path.relative(root, dest),
    "- now run: node scripts/optimize-hero.mjs",
  );
} else {
  console.log("unknown mode", mode);
  process.exit(1);
}
