export const VERT_QUAD = `#version 300 es
precision highp float;
out vec2 vUv;
void main() {
  // Full-screen triangle (3 vertices, no buffers).
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  vUv = p;
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}
`;

const SNOISE = `
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(
    i.z + vec4(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}
`;

const HASH = `
uint pcg(uint v) {
  uint state = v * 747796405u + 2891336453u;
  uint word = ((state >> ((state >> 28u) + 4u)) ^ state) * 277803737u;
  return (word >> 22u) ^ word;
}
float hash1(uint v) { return float(pcg(v)) / 4294967296.0; }
`;

const CAMERA = `
uniform float uTanHalfFov;   // tan(vertical fov / 2)
uniform float uAspect;       // width / height
uniform float uCamH;         // camera height above the plane
uniform float uPitch;        // radians, positive = looking down
uniform float uZNear, uZFar;
// Project a ground point (x, z) to NDC; returns view-space depth in out param.
vec2 project(vec2 xz, out float depth) {
  float c = cos(uPitch), s = sin(uPitch);
  float y = -uCamH;
  float vy = y * c + xz.y * s;
  float vz = -y * s + xz.y * c;
  depth = vz;
  return vec2(xz.x / (vz * uTanHalfFov * uAspect), vy / (vz * uTanHalfFov));
}
// Visible half-width of the plane at depth z (slightly padded).
float halfWidthAt(float z) {
  float c = cos(uPitch), s = sin(uPitch);
  float vz = uCamH * s + z * c;
  return vz * uTanHalfFov * uAspect * 1.12 + 0.35;
}
// Grid (alignment field) uv for a plane point.
vec2 gridUv(vec2 xz) {
  float u = xz.x / halfWidthAt(xz.y) * 0.5 + 0.5;
  float v = (xz.y - uZNear) / (uZFar - uZNear);
  return vec2(u, v);
}
`;

export const FRAG_CURL = `#version 300 es
precision highp float;
${SNOISE}
${CAMERA}
uniform float uTime;        // already scaled by uEvolve
uniform float uCurlScale;   // world -> noise frequency
in vec2 vUv;
out vec4 o;

float psi(vec2 p, float t) {
  vec3 q = vec3(p * uCurlScale, t);
  float n = snoise(q);
  n += 0.45 * snoise(q * 2.3 + vec3(17.0, 3.0, 1.3));
  n += 0.18 * snoise(q * 5.1 + vec3(-5.0, 11.0, 2.7));
  return n;
}

void main() {
  // Inverse of gridUv(): world position for this texel.
  float z = mix(uZNear, uZFar, vUv.y);
  float x = (vUv.x * 2.0 - 1.0) * halfWidthAt(z);
  vec2 p = vec2(x, z);
  float e = 0.2 / uCurlScale;
  float dx = psi(p + vec2(e, 0.0), uTime) - psi(p - vec2(e, 0.0), uTime);
  float dz = psi(p + vec2(0.0, e), uTime) - psi(p - vec2(0.0, e), uTime);
  o = vec4(vec2(dz, -dx) / (2.0 * e), 0.0, 0.0);
}
`;

export const FRAG_SIM = `#version 300 es
precision highp float;
precision highp int;
${HASH}
${CAMERA}
uniform sampler2D uState;
uniform sampler2D uAlign;   // RGBA16F: (Σvx·w, Σvz·w, Σw)
uniform sampler2D uCurl;    // RG16F: curl field in grid uv space
uniform int uSize;
uniform float uTime;        // simulation seconds
uniform float uDt;          // step seconds
uniform uint uFrame;
uniform float uDepthBias;   // <1 pushes spawns toward the horizon
uniform vec2 uWind;         // unit heading × base speed (world units / s)
uniform float uSpeedNear, uSpeedFar;   // depth-keyed speed scale
uniform float uCurlAmp;     // curl strength at the far end (near = ×0.15)
uniform float uAlignNear, uAlignFar;   // heading blend toward the local mean
uniform float uGustAmp, uGustPos, uGustWidth;  // travelling wave packet along depth (1 = horizon)
uniform vec3 uPointer;      // world x, world z, strength (0 = none)
uniform float uPointerR;    // obstacle radius in world units at the pointer depth
uniform float uLifeMin, uLifeMax;
in vec2 vUv;
out vec4 outState;

void main() {
  ivec2 tc = ivec2(gl_FragCoord.xy);
  uint id = uint(tc.y * uSize + tc.x);
  vec4 s = texelFetch(uState, tc, 0);
  vec2 p = s.xy;
  float age = s.z;
  float life = abs(s.w);

  bool dead = life <= 0.0 || age >= life;
  if (!dead) {
    float hw = halfWidthAt(p.y);
    dead = abs(p.x) > hw || p.y > uZFar || p.y < uZNear;
  }

  if (dead) {
    uint k = id * 3u + uFrame * 2654435761u;
    float u = hash1(k);
    float v = hash1(k + 1u);
    float w = hash1(k + 2u);
    float z = mix(uZNear, uZFar, pow(v, uDepthBias));
    float x = (u * 2.0 - 1.0) * halfWidthAt(z);
    float l = mix(uLifeMin, uLifeMax, w);
    // Negative life flags "spawned this frame" so no segment is drawn from the old position.
    outState = vec4(x, z, 0.0, -l);
    return;
  }

  float zNorm = clamp((p.y - uZNear) / (uZFar - uZNear), 0.0, 1.0);
  float order = smoothstep(0.0, 0.45, zNorm);        // 0 near (laminar) -> 1 far (turbulent)

  // Gust: a long-wavelength packet travelling from the horizon toward the shore.
  float gd = (zNorm - uGustPos) / uGustWidth;
  float gust = 1.0 + uGustAmp * exp(-gd * gd); // gd*gd, never pow(): negative base is undefined in ES

  float amp = mix(0.15, 1.0, order) * uCurlAmp * gust;
  vec2 v0 = uWind + texture(uCurl, gridUv(p)).rg * amp;
  float speed = mix(uSpeedNear, uSpeedFar, smoothstep(0.08, 0.8, zNorm));
  v0 *= speed;

  // Braiding: lean toward the mean heading of the neighbourhood (more near, less far).
  vec3 al = texture(uAlign, gridUv(p)).rgb;
  if (al.b > 1e-3) {
    vec2 mean = al.rg / al.b;
    float mlen = length(mean);
    float vlen = length(v0);
    if (mlen > 1e-5 && vlen > 1e-6) {
      float w = mix(uAlignNear, uAlignFar, order);
      vec2 m = mix(v0 / vlen, mean / mlen, w);
      float ml = length(m);
      if (ml > 1e-5) v0 = (m / ml) * vlen;   // (opposed headings cancel: keep v0)
    }
  }

  // Pointer: potential flow around a cylinder - threads part and rejoin, no swirl.
  if (uPointer.z > 0.0) {
    vec2 d = p - uPointer.xy;
    float R = uPointerR;
    float dist2 = max(dot(d, d), 1e-6);
    float dist = sqrt(dist2);
    vec2 n = d / dist;
    float un = dot(v0, n);
    // Dipole term of potential flow past a cylinder, softened inside the radius so
    // threads part around the pointer without piling up on a hard rim.
    float soft = smoothstep(0.0, R, dist);
    vec2 dipole = (R * R / max(dist2, R * R)) * (v0 - 2.0 * un * n) * soft;
    v0 = mix(v0, v0 + dipole * 0.75, uPointer.z);
  }

  p += v0 * uDt;
  age += uDt;
  outState = vec4(p, age, life);
}
`;
export const VERT_SPLAT = `#version 300 es
precision highp float;
precision highp int;
${CAMERA}
uniform sampler2D uStateCur;
uniform sampler2D uStatePrev;
uniform int uSize;
uniform float uDt;
out vec3 vVel;
void main() {
  int pid = gl_VertexID;
  ivec2 tc = ivec2(pid % uSize, pid / uSize);
  vec4 cur = texelFetch(uStateCur, tc, 0);
  vec4 prev = texelFetch(uStatePrev, tc, 0);
  if (cur.w < 0.0 || cur.z < 0.0001) {
    gl_Position = vec4(0.0, 0.0, 4.0, 1.0);
    gl_PointSize = 1.0;
    vVel = vec3(0.0);
    return;
  }
  vec2 uv = gridUv(cur.xy);
  gl_Position = vec4(uv * 2.0 - 1.0, 0.0, 1.0);
  gl_PointSize = 1.0;
  vVel = vec3((cur.xy - prev.xy) / max(uDt, 1e-4), 1.0);
}
`;

export const FRAG_SPLAT = `#version 300 es
precision mediump float;
in vec3 vVel;
out vec4 o;
void main() { o = vec4(vVel, 0.0); }
`;

export const VERT_PARTICLES = `#version 300 es
precision highp float;
precision highp int;
${HASH}
${CAMERA}
uniform sampler2D uStateCur;
uniform sampler2D uStatePrev;
uniform int uSize;
uniform float uGain;        // brightness per segment
uniform float uNearDim;     // brightness multiplier at the near end
uniform float uDepthRef;    // depth where compensation starts
uniform float uDepthComp;   // brightness ∝ (depth/ref)^-comp beyond ref (tames the horizon pile-up)
uniform float uExtinction;  // aerial extinction per unit depth
out float vI;

void main() {
  int vid = gl_VertexID;
  int pid = vid >> 1;
  int end = vid & 1;
  ivec2 tc = ivec2(pid % uSize, pid / uSize);
  vec4 cur = texelFetch(uStateCur, tc, 0);
  vec4 prev = texelFetch(uStatePrev, tc, 0);

  // Skip the frame a particle (re)spawns: no segment from its previous life.
  if (cur.w < 0.0 || cur.z < 0.0001) {
    gl_Position = vec4(0.0, 0.0, 4.0, 1.0);
    vI = 0.0;
    return;
  }

  vec2 xz = (end == 0) ? prev.xy : cur.xy;
  float depth;
  vec2 ndc = project(xz, depth);
  gl_Position = vec4(ndc, 0.0, 1.0);

  float life = abs(cur.w);
  float age = cur.z;
  float edge = life * 0.12;
  float fade = smoothstep(0.0, edge, age) * (1.0 - smoothstep(life - edge, life, age));
  float zNorm = clamp((cur.y - uZNear) / (uZFar - uZNear), 0.0, 1.0);
  // Per-thread weight, log-normal-ish in [0.4, 1.6].
  float wgt = exp(mix(-0.9, 0.47, hash1(uint(pid) * 7u + 13u)));
  float nearDim = mix(uNearDim, 1.0, smoothstep(0.0, 0.5, zNorm));
  float comp = pow(max(depth, uDepthRef) / uDepthRef, -uDepthComp);
  float ext = exp(-uExtinction * depth);
  vI = fade * wgt * nearDim * comp * ext * uGain;
}
`;

export const FRAG_PARTICLES = `#version 300 es
precision mediump float;
in float vI;
out vec4 o;
void main() {
  o = vec4(vI, 0.0, 0.0, 1.0);
}
`;

export const FRAG_FADE = `#version 300 es
precision highp float;
uniform sampler2D uTrail;
uniform vec2 uTexel;
uniform float uDecay;
uniform float uDiffuse;
uniform float uFloor;   // subtracted per frame so the buffer returns to true black
in vec2 vUv;
out vec4 o;
void main() {
  vec4 c = texture(uTrail, vUv);
  // Four bilinear taps at half-texel diagonals = the (1,2,1)⊗(1,2,1)/16 tent in 5 fetches.
  vec2 h = uTexel * 0.5;
  vec4 blurred = 0.25 * (texture(uTrail, vUv + h) + texture(uTrail, vUv - h)
                       + texture(uTrail, vUv + vec2(h.x, -h.y)) + texture(uTrail, vUv - vec2(h.x, -h.y)));
  vec4 r = mix(c, blurred, uDiffuse) * uDecay;
  o = max(r - uFloor, 0.0);
}
`;

export const FRAG_COPY = `#version 300 es
precision highp float;
uniform sampler2D uSrc;
in vec2 vUv;
out vec4 o;
void main() {
  ivec2 tc = ivec2(gl_FragCoord.xy);
  ivec2 sz = textureSize(uSrc, 0);
  o = (tc.x < sz.x && tc.y < sz.y) ? texelFetch(uSrc, tc, 0) : vec4(0.0);
}
`;
export const FRAG_GRIDBLUR = `#version 300 es
precision mediump float;
uniform sampler2D uSrc;
uniform vec2 uTexel;
in vec2 vUv;
out vec4 o;
void main() {
  vec4 c = texture(uSrc, vUv) * 4.0;
  c += texture(uSrc, vUv + vec2(uTexel.x, 0.0)) * 2.0;
  c += texture(uSrc, vUv - vec2(uTexel.x, 0.0)) * 2.0;
  c += texture(uSrc, vUv + vec2(0.0, uTexel.y)) * 2.0;
  c += texture(uSrc, vUv - vec2(0.0, uTexel.y)) * 2.0;
  c += texture(uSrc, vUv + uTexel);
  c += texture(uSrc, vUv - uTexel);
  c += texture(uSrc, vUv + vec2(uTexel.x, -uTexel.y));
  c += texture(uSrc, vUv - vec2(uTexel.x, -uTexel.y));
  o = c / 16.0;
}
`;

export const FRAG_DOWNSAMPLE = `#version 300 es
precision highp float;
uniform sampler2D uSrc;
uniform vec2 uTexel; // half a destination texel, in source uv
in vec2 vUv;
out vec4 o;
void main() {
  vec4 a = texture(uSrc, vUv + uTexel * vec2(-1.0, -1.0));
  vec4 b = texture(uSrc, vUv + uTexel * vec2( 1.0, -1.0));
  vec4 c = texture(uSrc, vUv + uTexel * vec2(-1.0,  1.0));
  vec4 d = texture(uSrc, vUv + uTexel * vec2( 1.0,  1.0));
  o = (a + b + c + d) * 0.25;
}
`;

export const FRAG_BLUR = `#version 300 es
precision highp float;
uniform sampler2D uSrc;
uniform vec2 uDir; // texel-sized step along the blur axis
in vec2 vUv;
out vec4 o;
void main() {
  // 9-tap Gaussian, bilinear-optimized (5 fetches).
  vec4 s = texture(uSrc, vUv) * 0.2270270270;
  s += texture(uSrc, vUv + uDir * 1.3846153846) * 0.3162162162;
  s += texture(uSrc, vUv - uDir * 1.3846153846) * 0.3162162162;
  s += texture(uSrc, vUv + uDir * 3.2307692308) * 0.0702702703;
  s += texture(uSrc, vUv - uDir * 3.2307692308) * 0.0702702703;
  o = s;
}
`;

export const FRAG_COMPOSITE = `#version 300 es
precision highp float;
${CAMERA}
uniform sampler2D uTrail;
uniform sampler2D uHaze;
uniform vec2 uRes;
uniform float uTime;
uniform float uFrameSeed;   // changes at 24 fps for the grain
uniform float uHorizon;     // uv y of the horizon (0 bottom .. 1 top)
uniform float uSunX;        // uv x of the key light
uniform float uExposure;
uniform float uKeyGain;     // broad exposure lift toward the key light
uniform float uShadowSide;  // exposure multiplier far from the key light (the cool side stays dim)
uniform float uGlitter;     // exposure lift along the light's reflection path on the sea
uniform float uHazeGain;    // wide glow on the band
uniform float uGlow;        // sky glow strength
uniform float uSkyFall;     // sky glow falloff rate (per uv) above the horizon
uniform float uFeather;     // uv height below the horizon over which the sea dissolves into sky
uniform float uFog;         // aerial perspective extinction per world unit
uniform float uFogLift;     // max lift toward the haze colour
uniform float uBottomFade;  // uv height over which the field fades to ink at the bottom
uniform float uSat;
uniform float uGrain;
uniform float uReveal;      // eased 0..1 exposure wipe (horizon -> shore)
uniform vec2 uParallax;     // uv offset
uniform vec3 uInk;          // linear-light page black
uniform vec3 uHazeCol;      // linear-light haze
uniform vec3 uP[8];         // palette LUT stops (linear light), 0 = ink … 7 = cream cap
uniform float uWarmDrift;   // -1..1 slow colour-temperature drift of the band
in vec2 vUv;
out vec4 o;

vec3 lut(float t) {
  // 8 stops at 0, .15, .40, .55, .68, .80, .92, 1
  const float k[8] = float[8](0.0, 0.15, 0.40, 0.55, 0.68, 0.80, 0.92, 1.0);
  vec3 c = uP[0];
  for (int i = 1; i < 8; i++) {
    c = mix(c, uP[i], smoothstep(k[i - 1], k[i], t));
  }
  return c;
}

float hash12(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

// Exact sRGB transfer (the 1/2.2 approximation lifts the blacks by ~10/255).
vec3 toSRGB(vec3 c) {
  vec3 lo = c * 12.92;
  vec3 hi = 1.055 * pow(max(c, vec3(0.0)), vec3(1.0 / 2.4)) - 0.055;
  return mix(lo, hi, step(vec3(0.0031308), c));
}

void main() {
  vec2 uvs = vUv + uParallax;
  vec2 uvc = clamp(uvs, 0.0, 1.0);
  vec4 tr = texture(uTrail, uvc);
  float haze = texture(uHaze, uvc).r;

  // Ground depth for this pixel (below the horizon) - drives the aerial perspective.
  float ndcY = uvs.y * 2.0 - 1.0;
  float dy = ndcY * uTanHalfFov;
  float c = cos(uPitch), s = sin(uPitch);
  float wy = dy * c - s;          // un-pitched ray y (dz = 1)
  float wz = dy * s + c;
  float tHit = -uCamH / min(wy, -1e-4);
  float z = min(wz * tHit, uZFar); // world depth along the ground (valid below the horizon)

  // Horizon-relative coordinates. uHorizon is where the sea's far edge (zFar) projects.
  float h = uHorizon;
  float below = step(uvs.y, h);
  // The sky glow breathes a little along x so the band never reads as a ruled line.
  float und = 0.012 * sin(uvs.x * 6.3 + uTime * 0.05) + 0.006 * sin(uvs.x * 15.1 - uTime * 0.03);
  float dist = clamp((h - uvs.y) / max(h, 1e-3), 0.0, 1.0);   // 0 at the horizon -> 1 at the bottom
  float above = max(uvs.y - h - und, 0.0);

  // Key light: a broad warmth/exposure bias around uSunX, and the light's reflection
  // path on the sea - narrow at the horizon, widening and fading toward the viewer.
  float dx = uvs.x - uSunX;
  float key = exp(-(dx * dx) / (0.55 * 0.55));
  float pathW = mix(0.07, 0.5, dist);
  float glitter = exp(-(dx * dx) / (pathW * pathW)) * pow(1.0 - dist, 2.4) * below;
  float exposure = uExposure * mix(uShadowSide, 1.0 + uKeyGain, key) * (1.0 + uGlitter * glitter);

  // Entrance: lit from the horizon toward the shore.
  float lit = smoothstep(dist, dist + 0.35, uReveal * 1.35);
  // Quiet zone: the field settles to ink under the copy.
  float bottom = smoothstep(0.0, uBottomFade, uvs.y);
  // Feather: the sea dissolves into the sky over the last few percent before the horizon.
  float feather = mix(0.2, 1.0, smoothstep(0.0, uFeather, dist));

  float I = tr.r * exposure * lit * bottom * feather;
  float L = 1.0 - exp(-I);

  // Sky: ink at the top, a soft glow peaking on the horizon, warmer and brighter toward the key light.
  float warmSide = 0.22 + 0.78 * key;
  float skyGlow = exp(-above * uSkyFall) * warmSide * uGlow * lit * (1.0 - below);
  float seaGlow = exp(-dist * 7.0) * warmSide * uGlow * lit * below;
  float hazeGlow = haze * exposure * uHazeGain * lit;

  // Total luminance -> palette LUT (peak chroma at amber, desaturating to cream).
  float total = L + skyGlow + seaGlow + hazeGlow;
  vec3 col = lut(clamp(total, 0.0, 1.0));

  // Warmth keyed to the light: away from it the same intensity stays slate.
  float lum = dot(col, vec3(0.2126, 0.7152, 0.0722));
  vec3 cool = mix(vec3(lum), col, 0.2) * vec3(0.965, 0.985, 1.025);
  float warmth = clamp(0.1 + 0.9 * max(key, glitter) + uWarmDrift * 0.08, 0.0, 1.0);
  col = mix(cool, col, warmth);

  // Aerial perspective: lift the shadows toward haze on both sides of the horizon line.
  float hazeBand = below * (1.0 - exp(-uFog * z)) + (1.0 - below) * exp(-above * 20.0);
  col = mix(col, max(col, uHazeCol), hazeBand * uFogLift * bottom);

  // Saturation dial.
  lum = dot(col, vec3(0.2126, 0.7152, 0.0722));
  col = mix(vec3(lum), col, uSat);

  // Vignette, gentle.
  vec2 vc = (vUv - 0.5) * vec2(uRes.x / uRes.y, 1.0);
  float vig = 1.0 - smoothstep(0.6, 1.5, length(vc)) * 0.45;
  col = mix(uInk, col, vig);
  col = max(col, uInk);

  // Encode.
  col = toSRGB(col);

  // One grain source: luminance-only, stronger in the darks, new offset at 24 fps,
  // plus a triangular dither so the 8-bit output never bands.
  float g = hash12(gl_FragCoord.xy + uFrameSeed * 311.7) - 0.5;
  float dth = (hash12(gl_FragCoord.yx * 1.7 + uFrameSeed * 97.3) + hash12(gl_FragCoord.xy * 0.7 + uFrameSeed * 53.1) - 1.0) / 255.0;
  col += g * uGrain * (1.0 - col * 0.65) + dth;

  o = vec4(col, 1.0);
}
`;
