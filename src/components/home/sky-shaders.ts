export const VERT = `#version 300 es
void main(){ vec2 p = vec2((gl_VertexID << 1) & 2, gl_VertexID & 2); gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0); }`;

const NOISE = `
float hash12(vec2 p){ vec3 q = fract(vec3(p.xyx) * 0.1031); q += dot(q, q.yzx + 33.33); return fract((q.x + q.y) * q.z); }
float vnoise(vec2 p){ vec2 i = floor(p), f = fract(p); vec2 u = f*f*f*(f*(f*6.0-15.0)+10.0);
  return mix(mix(hash12(i), hash12(i+vec2(1,0)), u.x), mix(hash12(i+vec2(0,1)), hash12(i+vec2(1,1)), u.x), u.y); }
`;

export const CLOUDS_FRAG = `#version 300 es
precision highp float;
uniform vec2 uRes; uniform float uDrift; uniform float uMorph; uniform float uCover; uniform float uAlpha; uniform float uGlowAmt;
uniform vec2 uLight; uniform vec3 uLit; uniform vec3 uShade; uniform vec3 uHaze; uniform vec3 uGlow;
out vec4 o;
${NOISE}
const mat2 TURN = mat2(0.8, -0.6, 0.6, 0.8);
float fbm(vec2 p, int oct){ float a = 0.5, s = 0.0, n = 0.0;
  for(int i=0;i<5;i++){ if(i>=oct) break; s += a*vnoise(p); n += a; p = TURN*p*2.03+17.1; a *= 0.5; } return s/n; }
// The band looks toward the horizon: its foot is far away and its top is
// overhead, so clouds flatten and crowd together as they near the bottom.
vec2 plane(vec2 uv, float asp){ float e = mix(0.12, 0.64, uv.y); return vec2((uv.x - 0.5) * asp * 0.58, 1.0) / e; }
// how much cloud there is at a point, before it is cut into shapes
float mass(vec2 p, vec2 w, int oct){
  float big = vnoise(p * 0.31 + 9.0);                                  // open sky between groups of cloud
  return fbm(p * 1.25 + w, oct) + (big - 0.5) * 0.22;
}
float shape(float n){ return smoothstep(uCover, uCover + 0.17, n); }
void main(){
  vec2 uv = gl_FragCoord.xy / uRes; float asp = uRes.x / uRes.y;
  vec2 wind = vec2(uDrift, uMorph * 0.6);
  vec2 p = plane(uv, asp) + wind;
  vec2 w = (vec2(fbm(p * 0.8 + 3.1 + uMorph, 3), fbm(p * 0.8 + 11.7 - uMorph, 3)) - 0.5) * 1.1;   // billow
  float n = mass(p, w, 5);
  n += (fbm(p * 5.2 + w * 2.0 + 40.0, 3) - 0.5) * 0.11;                // fine detail eats at the edges
  float d = shape(n);
  // shading: the more cloud lies between a point and the light, the deeper it sits in shadow
  vec2 toL = (vec2(uLight.x, 1.0 - uLight.y) - uv) * vec2(asp, 1.0);
  float reach = length(toL);
  toL = toL / max(reach, 0.001) * vec2(1.0 / asp, 1.0);
  float shadow = shape(mass(plane(uv + toL * 0.045, asp) + wind, w, 4)) * 0.6 + shape(mass(plane(uv + toL * 0.11, asp) + wind, w, 3)) * 0.4;
  float lit = clamp(1.0 - shadow * 0.68, 0.0, 1.0);
  vec3 col = mix(uShade, uLit, lit);
  col = mix(col, uShade * 0.96, smoothstep(uCover + 0.06, uCover + 0.42, n) * 0.16);   // thick cores are heavier still
  col = mix(col, uGlow, uGlowAmt * exp(-reach * reach * 1.3) * 0.6 * lit); // a low sun warms the side that faces it
  col = mix(col, uHaze, smoothstep(0.60, 0.05, uv.y) * 0.7);           // far clouds sink into the haze
  float a = d * uAlpha * smoothstep(0.0, 0.28, uv.y);
  // thin streaks of high cloud, behind the rest
  vec2 c = vec2(p.x * 0.33, p.y * 1.25) + vec2(uDrift * 0.45, 0.0) + 31.0;
  float ci = smoothstep(0.50, 0.86, fbm(c + (fbm(c * 2.1 + uMorph, 2) - 0.5) * 0.9, 4));
  float ca = ci * smoothstep(0.30, 0.85, uv.y) * 0.42 * uAlpha;
  o = vec4(mix(uLit, uHaze, 0.2) * ca * (1.0 - a) + col * a, ca * (1.0 - a) + a);
}`;

export const SKY_FRAG = `#version 300 es
precision highp float;
uniform sampler2D uClouds;
uniform vec2 uRes; uniform vec2 uCss; uniform float uTime; uniform float uStars; uniform float uGlowAmt; uniform float uMoonPhase;
uniform vec3 uTop; uniform vec3 uUpper; uniform vec3 uLower; uniform vec3 uBase; uniform vec3 uGlow; uniform vec3 uSunCol;
uniform vec3 uSun; uniform vec3 uMoon;                                 // x, y across and down the band, z = how present
out vec4 o;
${NOISE}
// One star per grid cell at most, sitting on a device pixel so small ones stay crisp.
float star(vec2 px, float dpr, float cell, float keep, float size, float seed){
  vec2 id = floor(px / cell);
  float h = hash12(id + seed);
  if (h > keep * (0.45 + 1.1 * vnoise(id * cell / 520.0 + seed))) return 0.0;      // rich patches and sparse ones
  vec2 c = (id + 0.12 + 0.76 * vec2(hash12(id + seed + 3.1), hash12(id + seed + 7.7))) * cell;
  c = (floor(c * dpr) + 0.5) / dpr;
  float m = 0.38 + 0.62 * pow(hash12(id + seed + 11.3), 2.4);
  float r = size * dpr * (0.75 + 0.5 * m);
  vec2 off = (px - c) * dpr; float d = length(off);
  float twinkle = 1.0 - 0.42 * m * (0.5 + 0.5 * sin(uTime * (0.5 + 2.1 * hash12(id + seed + 5.0)) + h * 60.0));
  float big = step(1.2, size);                                          // the largest get a soft halo and a glint
  float glint = exp(-abs(off.x) * 0.55 / dpr - abs(off.y) * 3.2 / dpr) + exp(-abs(off.y) * 0.55 / dpr - abs(off.x) * 3.2 / dpr);
  return m * twinkle * (smoothstep(r, r * 0.3, d) + big * (0.24 * exp(-d / (r * 1.6)) + 0.30 * m * glint));
}
void main(){
  vec2 uv = gl_FragCoord.xy / uRes;
  float v = 1.0 - uv.y;                                                 // 0 at the top of the band, 1 at its foot
  vec2 px = vec2(uv.x, v) * uCss;                                       // CSS px from the top-left corner
  float dpr = uRes.x / uCss.x; float H = uCss.y;
  vec4 cloud = texture(uClouds, uv);
  // cloud thins out in front of the sun and the moon, so they always shine through
  vec2 toSun = (px - vec2(uSun.x * uCss.x, uSun.y * H)) / (H * 0.17);
  vec2 toMoon = (px - vec2(uMoon.x * uCss.x, uMoon.y * H)) / (H * 0.15);
  cloud *= 1.0 - 0.72 * max(exp(-dot(toSun, toSun)) * uSun.z, exp(-dot(toMoon, toMoon)) * uMoon.z);

  vec3 col = mix(uTop, uUpper, smoothstep(0.0, 0.40, v));
  col = mix(col, uLower, smoothstep(0.28, 0.66, v));
  col = mix(col, uBase, smoothstep(0.58, 0.96, v));
  // light on the horizon under the sun
  vec2 g = (px - vec2(uSun.x * uCss.x, 0.74 * H)) / (H * vec2(2.3, 0.62));
  col = mix(col, uGlow, exp(-dot(g, g) * 1.5) * uGlowAmt);

  if (uStars > 0.003) {
    float s = star(px, dpr, 19.0, 0.72, 0.62, 0.0) * 0.9 + star(px, dpr, 43.0, 0.62, 0.92, 17.0) * 1.1 + star(px, dpr, 112.0, 0.55, 1.35, 43.0) * 1.3;
    vec3 tint = mix(vec3(0.80, 0.88, 1.0), vec3(1.0, 0.95, 0.86), hash12(floor(px / 47.0) + 2.0));
    col += (tint - col) * clamp(s, 0.0, 1.0) * uStars * smoothstep(0.98, 0.42, v) * (1.0 - cloud.a * 0.85);
    // now and then, a meteor
    float mt = mod(uTime + 9.0, 23.0);
    if (mt < 0.9 && uStars > 0.6) {
      float seed = floor((uTime + 9.0) / 23.0);
      vec2 from = vec2((0.12 + 0.60 * hash12(vec2(seed, 1.0))) * uCss.x, (0.06 + 0.20 * hash12(vec2(seed, 2.0))) * H);
      vec2 dir = normalize(vec2(0.92, 0.38));
      vec2 rel = px - (from + dir * mt * H * 0.9);
      float along = dot(rel, dir), across = length(rel - dir * along);
      col += (1.0 - col) * smoothstep(1.4, 0.0, across) * smoothstep(-H * 0.28, 0.0, along) * step(along, 0.0) * sin(mt / 0.9 * 3.14159) * 0.85 * (1.0 - cloud.a);
    }
  }

  if (uSun.z > 0.003) {
    float sd = length(px - vec2(uSun.x * uCss.x, uSun.y * H));
    float R = clamp(H * 0.045, 13.0, 20.0);
    float halo = exp(-sd / (R * 1.6)) * 0.85 + exp(-sd / (R * 6.0)) * 0.35 + exp(-sd / (R * 22.0)) * 0.16;
    col += (uSunCol - col) * clamp(halo, 0.0, 1.0) * uSun.z;
    col = mix(col, mix(uSunCol, vec3(1.0), 0.6), smoothstep(R + 1.0 / dpr, R - 1.0 / dpr, sd) * uSun.z);
  }

  if (uMoon.z > 0.003) {
    vec2 m = px - vec2(uMoon.x * uCss.x, uMoon.y * H);
    float R = clamp(H * 0.04, 12.0, 17.0);
    float md = length(m);
    float k = min(cos(6.28318 * uMoonPhase), 0.80);                     // never thinner than a sliver
    col += (vec3(0.78, 0.85, 1.0) - col) * (exp(-md / (R * 2.6)) * 0.30 + exp(-md / (R * 9.0)) * 0.10) * uMoon.z * (0.45 + 0.275 * (1.0 - k));
    vec2 q = mat2(0.88, 0.47, -0.47, 0.88) * m / R;                     // the disc, tilted
    float aa = 1.2 / (R * dpr);
    float side = uMoonPhase < 0.5 ? 1.0 : -1.0;                         // waxing is lit on the right, waning on the left
    float lit = smoothstep(-aa * 1.5, aa * 1.5, q.x * side - k * sqrt(max(0.0, 1.0 - q.y * q.y)));
    vec3 face = vec3(0.97, 0.95, 0.90) * (0.92 + 0.08 * vnoise(q * 2.3 + 4.0));
    col = mix(col, mix(col + vec3(0.03, 0.04, 0.07), face, lit), smoothstep(1.0 + aa, 1.0 - aa, length(q)) * uMoon.z);
  }

  col = col * (1.0 - cloud.a) + cloud.rgb;

  // melt into the page, with a grain of dither so the long gradients never band
  float a = 1.0 - smoothstep(0.44, 0.96, v - cloud.a * 0.03);
  float n = hash12(gl_FragCoord.xy) - 0.5;
  a = clamp(a + n * (1.5 / 255.0), 0.0, 1.0);
  o = vec4(clamp(col + n * (1.5 / 255.0), 0.0, 1.0) * a, a);
}`;
