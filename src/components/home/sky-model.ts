export type RGB = readonly [number, number, number];

type Look = {
  top: RGB;
  upper: RGB;
  lower: RGB;
  base: RGB;
  glow: RGB;
  glowAmount: number;
  cloudLit: RGB;
  cloudShade: RGB;
  cloudAlpha: number;
  sun: RGB;
  stars: number;
};

export type Sky = Look & {
  sunAt: { x: number; y: number; high: number; amount: number };
  moonAt: { x: number; y: number; high: number; amount: number };
  moonPhase: number;
  light: { x: number; y: number };
};

export const SUNRISE = 6;
export const SUNSET = 18.5;
const HORIZON = 0.66;

export const css = (c: RGB) => `rgb(${c.map((v) => Math.round(v * 255)).join(" ")})`;

const hex = (v: string): RGB => [
  parseInt(v.slice(1, 3), 16) / 255,
  parseInt(v.slice(3, 5), 16) / 255,
  parseInt(v.slice(5, 7), 16) / 255,
];

const NIGHT: Look = {
  top: hex("#030822"),
  upper: hex("#0a1d63"),
  lower: hex("#1d44a8"),
  base: hex("#5a80d8"),
  glow: hex("#5a80d8"),
  glowAmount: 0,
  cloudLit: hex("#a9bff2"),
  cloudShade: hex("#2c4499"),
  cloudAlpha: 0.46,
  sun: hex("#ffd9a0"),
  stars: 1,
};

const DAY: Look = {
  top: hex("#2f80de"),
  upper: hex("#5aa4ee"),
  lower: hex("#9bcbf7"),
  base: hex("#d9ecfd"),
  glow: hex("#ffffff"),
  glowAmount: 0.18,
  cloudLit: hex("#ffffff"),
  cloudShade: hex("#c3d4ef"),
  cloudAlpha: 0.96,
  sun: hex("#fffbe8"),
  stars: 0,
};
const DUSK: Look[] = [
  {
    top: hex("#0a1850"),
    upper: hex("#2e3a8e"),
    lower: hex("#7b55a6"),
    base: hex("#e0877f"),
    glow: hex("#ff8f5e"),
    glowAmount: 0.55,
    cloudLit: hex("#e59aa9"),
    cloudShade: hex("#2b2f73"),
    cloudAlpha: 0.72,
    sun: hex("#ff9a5c"),
    stars: 0.3,
  },
  {
    top: hex("#284693"),
    upper: hex("#7669b3"),
    lower: hex("#ef9578"),
    base: hex("#ffc48f"),
    glow: hex("#ffae5c"),
    glowAmount: 0.85,
    cloudLit: hex("#ffb685"),
    cloudShade: hex("#6b5a9e"),
    cloudAlpha: 0.9,
    sun: hex("#ffb35c"),
    stars: 0,
  },
  {
    top: hex("#3b76c9"),
    upper: hex("#82ade6"),
    lower: hex("#f2c8a4"),
    base: hex("#ffe6c9"),
    glow: hex("#ffd18c"),
    glowAmount: 0.6,
    cloudLit: hex("#fff1dc"),
    cloudShade: hex("#c4a6c2"),
    cloudAlpha: 0.94,
    sun: hex("#ffe2a8"),
    stars: 0,
  },
];

const DAWN: Look[] = [
  {
    top: hex("#091a52"),
    upper: hex("#2c418f"),
    lower: hex("#8d62a8"),
    base: hex("#eaa0a3"),
    glow: hex("#ff9f86"),
    glowAmount: 0.5,
    cloudLit: hex("#eaa9bd"),
    cloudShade: hex("#2e3778"),
    cloudAlpha: 0.7,
    sun: hex("#ffab8a"),
    stars: 0.3,
  },
  {
    top: hex("#2f52a0"),
    upper: hex("#8f84c4"),
    lower: hex("#f5aa98"),
    base: hex("#ffd0b0"),
    glow: hex("#ffc089"),
    glowAmount: 0.8,
    cloudLit: hex("#ffc7b2"),
    cloudShade: hex("#7a6cab"),
    cloudAlpha: 0.9,
    sun: hex("#ffc27a"),
    stars: 0,
  },
  {
    top: hex("#4582d0"),
    upper: hex("#96bdec"),
    lower: hex("#f7d8c6"),
    base: hex("#ffecdb"),
    glow: hex("#ffdcae"),
    glowAmount: 0.5,
    cloudLit: hex("#fff4ea"),
    cloudShade: hex("#c8b4d0"),
    cloudAlpha: 0.94,
    sun: hex("#ffeebf"),
    stars: 0,
  },
];
const HEIGHTS = [-0.42, -0.13, 0, 0.17, 0.5];

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const smooth = (a: number, b: number, v: number) => {
  const t = clamp01((v - a) / (b - a));
  return t * t * (3 - 2 * t);
};
export const mix = (a: number, b: number, t: number) => a + (b - a) * t;
export const mixRGB = (a: RGB, b: RGB, t: number): RGB => [mix(a[0], b[0], t), mix(a[1], b[1], t), mix(a[2], b[2], t)];

function blend(a: Look, b: Look, t: number): Look {
  return {
    top: mixRGB(a.top, b.top, t),
    upper: mixRGB(a.upper, b.upper, t),
    lower: mixRGB(a.lower, b.lower, t),
    base: mixRGB(a.base, b.base, t),
    glow: mixRGB(a.glow, b.glow, t),
    glowAmount: mix(a.glowAmount, b.glowAmount, t),
    cloudLit: mixRGB(a.cloudLit, b.cloudLit, t),
    cloudShade: mixRGB(a.cloudShade, b.cloudShade, t),
    cloudAlpha: mix(a.cloudAlpha, b.cloudAlpha, t),
    sun: mixRGB(a.sun, b.sun, t),
    stars: mix(a.stars, b.stars, t),
  };
}
function sunHeight(hours: number) {
  const day = SUNSET - SUNRISE;
  if (hours >= SUNRISE && hours < SUNSET) return Math.sin((Math.PI * (hours - SUNRISE)) / day);
  const since = (hours - SUNSET + 24) % 24;
  return -Math.sin((Math.PI * since) / (24 - day));
}

const SYNODIC_DAYS = 29.530588853;
const NEW_MOON = Date.UTC(2000, 0, 6, 18, 14);

function moonPhase(date: Date) {
  const phase = ((date.getTime() - NEW_MOON) / 86_400_000 / SYNODIC_DAYS) % 1;
  return phase < 0 ? phase + 1 : phase;
}

export const clockHours = (date: Date) =>
  date.getHours() + date.getMinutes() / 60 + date.getSeconds() / 3600;
export function skyAt(date: Date, hours = clockHours(date)): Sky {
  const height = sunHeight(hours);
  const looks = [NIGHT, ...(hours >= 12 ? DUSK : DAWN), DAY];

  let look = looks[0];
  if (height >= HEIGHTS[HEIGHTS.length - 1]) {
    look = looks[looks.length - 1];
  } else if (height > HEIGHTS[0]) {
    const i = HEIGHTS.findIndex((h) => height < h) - 1;
    look = blend(looks[i], looks[i + 1], smooth(HEIGHTS[i], HEIGHTS[i + 1], height));
  }

  const day = clamp01((hours - SUNRISE) / (SUNSET - SUNRISE));
  const across = hours < SUNRISE ? 0 : day;
  const sunHigh = Math.pow(Math.max(height, 0), 0.85);
  const sunAt = {
    x: mix(0.12, 0.88, across),
    y: height >= 0 ? mix(HORIZON, 0.16, sunHigh) : HORIZON - height * 0.5,
    high: sunHigh,
    amount: smooth(-0.08, 0.03, height),
  };

  const night = clamp01(((hours - SUNSET + 24) % 24) / (24 - (SUNSET - SUNRISE)));
  const moonHigh = Math.sin(Math.PI * night);
  const moonAt = {
    x: mix(0.18, 0.84, night),
    y: 0.56 - 0.38 * moonHigh,
    high: moonHigh,
    amount: smooth(-0.08, -0.3, height),
  };

  return {
    ...look,
    sunAt,
    moonAt,
    moonPhase: moonPhase(date),
    light: height > -0.12 ? { x: sunAt.x, y: sunAt.y } : { x: moonAt.x, y: moonAt.y },
  };
}

const NAMED: Record<string, number> = {
  night: 0.5,
  dawn: 5.5,
  sunrise: 6,
  morning: 9,
  noon: 12.25,
  day: 13,
  golden: 17.6,
  sunset: 18.5,
  dusk: 19,
};
export function previewHours(search: string): number | undefined {
  const value = new URLSearchParams(search).get("sky");
  if (!value) return undefined;
  if (value in NAMED) return NAMED[value];
  const hours = Number(value);
  return Number.isFinite(hours) ? ((hours % 24) + 24) % 24 : undefined;
}
export function currentSky(): Sky {
  const date = new Date();
  return skyAt(date, previewHours(window.location.search) ?? clockHours(date));
}
