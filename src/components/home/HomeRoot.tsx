"use client";

import { useEffect, useRef, type ReactNode } from "react";

import { FooterSea } from "./FooterSea";
import { HeroSky } from "./HeroSky";
import "./home.css";

const PAGE_PAPER = "#fcfcfc";

const REVEAL_FRAMES: Keyframe[] = [
  { opacity: 0, transform: "translateY(16px)" },
  { opacity: 1, transform: "none" },
];
const REVEAL_TIMING: KeyframeAnimationOptions = {
  duration: 800,
  easing: "cubic-bezier(0.22, 1, 0.36, 1)",
  fill: "both",
};
const PEN_MS = 2400;
const PEN_LIFT_MS = 50;
const PEN_START_MS = 300;

function penStrokes(drawing: Element) {
  const strokes = [...drawing.querySelectorAll<SVGGeometryElement>("path")];
  const lengths = strokes.map((stroke) => stroke.getTotalLength());
  const total = lengths.reduce((sum, length) => sum + length, 0) || 1;
  let written = 0;
  return strokes.map((stroke, i) => {
    const length = lengths[i];
    const dash = `${length} ${length * 2}`;
    const anim = stroke.animate(
      [
        { strokeDasharray: dash, strokeDashoffset: length * 1.02 },
        { strokeDasharray: dash, strokeDashoffset: 0 },
      ],
      {
        delay: PEN_START_MS + (written / total) * PEN_MS + i * PEN_LIFT_MS,
        duration: Math.max(60, (length / total) * PEN_MS),
        easing: "cubic-bezier(0.45, 0, 0.4, 1)",
        fill: "both",
      },
    );
    written += length;
    return anim;
  });
}

export function HomeRoot({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || typeof root.animate !== "function") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const fold = window.innerHeight;
    const held = new Map<Element, Animation[]>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          io.unobserve(entry.target);
          for (const anim of held.get(entry.target) ?? []) {
            anim.play();
            anim.finished.then(() => anim.cancel()).catch(() => undefined);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    for (const el of root.querySelectorAll(".reveal, .draw")) {
      if (el.getBoundingClientRect().top <= fold) continue;
      const anims = el.classList.contains("draw") ? penStrokes(el) : [el.animate(REVEAL_FRAMES, REVEAL_TIMING)];
      anims.forEach((anim) => anim.pause());
      held.set(el, anims);
      io.observe(el);
    }
    return () => {
      io.disconnect();
      held.forEach((anims) => anims.forEach((anim) => anim.cancel()));
    };
  }, []);

  useEffect(() => {
    const metas = [...document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]')];
    const originals = metas.map((meta) => meta.content);
    metas.forEach((meta) => {
      meta.content = PAGE_PAPER;
    });
    return () => {
      metas.forEach((meta, i) => {
        meta.content = originals[i];
      });
    };
  }, []);

  return (
    <div ref={rootRef} id="home" className="home">
      <HeroSky />
      {children}
      <FooterSea />
    </div>
  );
}
