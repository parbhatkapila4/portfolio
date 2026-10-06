export const FOCAL = 3.9;

export const SEA_UNIFORMS = [
  "uRes", "uTime", "uGlowAmt", "uTop", "uUpper", "uLower", "uRim", "uBase", "uGlow", "uDeep", "uLight", "uLightCol",
];

export const SEA_FRAG = `#version 300 es
precision highp float;
uniform vec2 uRes; uniform float uTime; uniform float uGlowAmt;
uniform vec3 uTop; uniform vec3 uUpper; uniform vec3 uLower; uniform vec3 uRim; uniform vec3 uBase; uniform vec3 uGlow; uniform vec3 uDeep;
uniform vec3 uLight; uniform vec4 uLightCol;                           // where the sun or moon stands; its colour, and how present it is
out vec4 o;
const float FOCAL = ${FOCAL.toFixed(2)};
const float RISE = 0.04;                                               // the horizon lies this far above the band's top edge, lost in the haze
const float WIND = 0.35;                                               // the waves run toward the eye and a little across
const float STRETCH = 1.7;                                             // ripples are this much longer along the crest than across it
const float PI = 3.14159265;
float hash12(vec2 p){ vec3 q = fract(vec3(p.xyx) * 0.1031); q += dot(q, q.yzx + 33.33); return fract((q.x + q.y) * q.z); }
// grainy noise and its slope: (n, dn/dx, dn/dy)
vec2 turn(vec2 i){ float a = 2.0 * PI * hash12(i); return vec2(cos(a), sin(a)); }
vec3 grain(vec2 p){
  vec2 i = floor(p), f = fract(p);
  vec2 u = f*f*f*(f*(f*6.0-15.0)+10.0), du = 30.0*f*f*(f*(f-2.0)+1.0);
  vec2 ga = turn(i), gb = turn(i+vec2(1,0)), gc = turn(i+vec2(0,1)), gd = turn(i+vec2(1,1));
  float va = dot(ga, f), vb = dot(gb, f-vec2(1,0)), vc = dot(gc, f-vec2(0,1)), vd = dot(gd, f-vec2(1,1));
  float k = va - vb - vc + vd;
  return vec3(va + u.x*(vb-va) + u.y*(vc-va) + u.x*u.y*k,
              ga + u.x*(gb-ga) + u.y*(gc-ga) + u.x*u.y*(ga-gb-gc+gd) + du*(u.yx*k + vec2(vb, vc) - va));
}
// The slope of the water at p, and how rough it is below what the pixel can
// show (foot = the pixel's size out there): a wave finer than the pixel is
// left out of the slope, and the ripples lost that way count as roughness.
vec3 water(vec2 p, vec2 foot, float t){
  vec2 g = vec2(0.0);
  // swell: a few long wave trains rolling in, each dragging the water under the next, which peaks the crests
  mat2 J = mat2(1.0);                                                   // how the dragged point moves with p
  vec2 q = p; float k = 2.2, a = 1.0;
  for (int i = 0; i < 5; i++) {
    float fi = float(i);
    float ang = WIND + 0.42 * sin(fi * 2.4 + 0.7);
    vec2 d = vec2(sin(ang), cos(ang));
    float keep = 1.0 - smoothstep(0.2, 0.5, k * max(abs(d.x) * foot.x, abs(d.y) * foot.y) / PI);
    float x = dot(d, q) * k + t * sqrt(k) * 0.62 + fi * 1.7;
    float s = sin(x), c = cos(x), w = exp(s - 1.0);
    vec2 Jd = d * J;
    g += (0.030 * a * k * keep * w * c) * Jd;
    q -= d * (0.10 * a * w * c);
    J -= (0.10 * a * k * w * (c * c - s)) * outerProduct(d, Jd);
    k *= 1.55; a *= 0.72;
  }
  // wind: it roughens the water in patches and leaves slicks between them
  float gust = mix(0.30, 1.0, smoothstep(-0.30, 0.34, grain(p * vec2(0.20, 0.07) + vec2(3.0, t * 0.012)).x));
  // ripples: grain stretched along the crests, two layers at each size sliding over each other
  float f = 1.9, e = 0.074, lost = 0.0, all = 0.0;
  for (int i = 0; i < 10; i++) {
    float fi = float(i);
    float side = mod(fi, 2.0) < 0.5 ? 1.0 : -1.0;
    float ang = WIND + side * 0.34 + 0.05 * fi;
    vec2 d = vec2(sin(ang), cos(ang)), c = vec2(d.y, -d.x);             // the way these ripples run, and the line of their crests
    float keep = 1.0 - smoothstep(0.22, 0.60, f * dot(abs(c) + STRETCH * abs(d), foot));
    vec3 n = grain(vec2(dot(c, q) * f + fi * 7.3, dot(d, q) * f * STRETCH + t * (0.19 + 0.04 * side) * sqrt(f) + fi * 3.1));
    g += (e * gust * exp(1.3 * n.x) * keep) * (c * n.y / STRETCH + d * n.z);   // the exp makes crests sharper than troughs
    all += e * e; lost += e * e * (1.0 - keep);
    if (side < 0.0) { f *= 1.9; e *= 0.9; }
  }
  return vec3(g, lost / all);
}
// the sky the water mirrors, by how high the mirrored line of sight points
vec3 sky(vec3 r){
  float e = max(r.y, 0.0);
  vec3 c = mix(uRim, uLower, smoothstep(0.0, 0.13, e));
  c = mix(c, uUpper, smoothstep(0.08, 0.40, e));
  c = mix(c, uTop, smoothstep(0.34, 0.90, e));
  float toward = max(dot(normalize(r.xz + 1e-5), normalize(uLight.xz + 1e-5)), 0.0);
  return mix(c, uGlow, uGlowAmt * pow(toward, 5.0) * exp(-e * 7.0));   // the light on the horizon under the sun
}
void main(){
  vec2 uv = gl_FragCoord.xy / uRes; float asp = uRes.x / uRes.y;
  float v = 1.0 - uv.y;                                                 // 0 at the top of the band, 1 at its foot
  float drop = v + RISE;                                                // how far under the horizon this pixel looks
  float up = mix(1.8, 1.0, smoothstep(1.4, 4.4, asp));                  // the eye's height: a narrow band looks from higher, so it still shows a stretch of sea
  vec2 p = vec2((uv.x - 0.5) * asp, FOCAL) * up / drop;                 // where this pixel's line of sight meets the sea
  vec2 foot = vec2(1.0, FOCAL / drop) * up / (drop * uRes.y);           // the size of the pixel out there: across, away
  vec3 w = water(p, foot, uTime);
  vec3 eye = normalize(vec3(-p.x, up, -p.y));                           // from the water back to the eye
  vec3 n = normalize(vec3(-w.x, 1.0, -w.y));
  n = normalize(n + eye * max(0.03 - dot(n, eye), 0.0));                // a face turned away is seen edge on at most
  // seen at a low angle water is a mirror; the steeper the look, the more of its own colour shows
  float fres = mix(0.2, 1.0, pow(1.0 - dot(n, eye), 3.2));
  vec3 col = mix(uDeep, sky(reflect(-eye, n)), fres);
  float far = 1.0 - smoothstep(0.0, 0.62, v);
  col = mix(col, uBase, far * 0.85);                                    // distance pales into the haze on the horizon
  // glitter: light comes off the water wherever its slope is the one that throws it into the eye
  vec3 hv = normalize(eye + uLight);
  vec2 off = (-hv.xz / hv.y - w.xy) / mix(0.036, 0.13, w.z);            // what the pixel cannot resolve widens the patch
  float glit = exp(-0.5 * dot(off, off)) * mix(1.3, 0.7, w.z);
  col += (uLightCol.rgb - col) * clamp(glit, 0.0, 1.0) * uLightCol.a;

  // melt into the page, with a grain of dither so the long gradients never band
  float a = smoothstep(0.02, 0.52, v);
  float nz = hash12(gl_FragCoord.xy) - 0.5;
  a = clamp(a + nz * (1.5 / 255.0), 0.0, 1.0);
  o = vec4(clamp(col + nz * (1.5 / 255.0), 0.0, 1.0) * a, a);
}`;
