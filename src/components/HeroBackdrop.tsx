"use client";

import { getImageProps } from "next/image";
import { useEffect, useRef, useState, type RefObject } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

import { heroBackdrop } from "@/assets/hero/backdrop.generated";
import {
  createHeroField,
  type FieldInfo,
  type HeroField,
} from "@/lib/hero-field/engine";

const SIZES = "(orientation: portrait) 180vh, 100vw";
const variant = (width: number) =>
  heroBackdrop.widths.find((w) => w >= width) ??
  heroBackdrop.widths[heroBackdrop.widths.length - 1];
const avifLoader = ({ width }: { width: number }) =>
  `/hero/backdrop-${variant(width)}.avif`;
const webpLoader = ({ width }: { width: number }) =>
  `/hero/backdrop-${variant(width)}.webp`;

export type HeroBackdropState =
  | { kind: "live"; info: FieldInfo; still: boolean }
  | { kind: "fallback" }
  | { kind: "pending" };

type HeroBackdropProps = {
  stageRef: RefObject<HTMLElement | null>;
  copyRef: RefObject<HTMLElement | null>;
  onState?: (state: HeroBackdropState) => void;
};

declare global {
  interface Window {
    __heroField?: HeroField | null;
  }
}

export function HeroBackdrop({
  stageRef,
  copyRef,
  onState,
}: HeroBackdropProps) {
  const [still, setStill] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fieldRef = useRef<HeroField | null>(null);
  const [mode, setMode] = useState<"pending" | "live" | "fallback">("pending");
  const onStateRef = useRef(onState);
  onStateRef.current = onState;

  const [inView, setInView] = useState(true);
  const inViewRef = useRef(true);
  inViewRef.current = inView;
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [stageRef]);

  const { scrollY: windowY } = useScroll();
  const stageHeight = useRef(1);
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const measure = () => {
      stageHeight.current = Math.max(1, el.offsetHeight);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [stageRef]);
  const scrollProgress = useTransform(windowY, (v) =>
    Math.min(1, Math.max(0, v / stageHeight.current)),
  );

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 34, damping: 18, mass: 0.9 });
  const sy = useSpring(py, { stiffness: 34, damping: 18, mass: 0.9 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    if (!canvas || !stage) return;
    const debug = process.env.NODE_ENV !== "production";
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const params = new URLSearchParams(debug ? window.location.search : "");
    const forcedTier = params.has("fieldtier")
      ? Number(params.get("fieldtier"))
      : undefined;
    const forcedColors = window.matchMedia("(forced-colors: active)").matches;
    if (params.has("fieldoff") || forcedColors) {
      setMode("fallback");
      onStateRef.current?.({ kind: "fallback" });
      return;
    }
    const rmQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const horizonFor = () => {
      const copy = copyRef.current;
      const H = stage.clientHeight || 1;
      if (!copy) return 0.3;
      const top =
        copy.getBoundingClientRect().top - stage.getBoundingClientRect().top;
      const h = Math.min(0.4, Math.max(0.17, top / H - 0.13));
      return Number.isFinite(h) ? h : 0.3;
    };

    let teardown: (() => void) | null = null;
    const create = (reduceMotion: boolean) => {
      teardown?.();
      teardown = null;
      setStill(reduceMotion);
      let disposed = false;
      const field = createHeroField(canvas, {
        params: { horizonFromTop: horizonFor() },
        reducedMotion: reduceMotion,
        halfRate: coarse,
        debug,
        tier: Number.isFinite(forcedTier) ? forcedTier : undefined,
        lockTier: params.has("fieldlock"),
        areaCap: params.has("fieldarea")
          ? Number(params.get("fieldarea"))
          : undefined,
        onFallback: () => {
          if (disposed) return;
          setMode("fallback");
          onStateRef.current?.({ kind: "fallback" });
        },
        onReady: (info) => {
          setMode("live");
          onStateRef.current?.({ kind: "live", info, still: reduceMotion });
        },
        onTierChange: (info) => {
          onStateRef.current?.({ kind: "live", info, still: reduceMotion });
        },
      });
      fieldRef.current = field;
      if (debug) window.__heroField = field;
      if (!field) return;
      field.setActive(inViewRef.current);

      let sw = Math.max(1, stage.clientWidth);
      let sh = Math.max(1, stage.clientHeight);
      const measure = () => {
        sw = Math.max(1, stage.clientWidth);
        sh = Math.max(1, stage.clientHeight);
        field.setHorizon(horizonFor());
      };
      const ro = new ResizeObserver(measure);
      ro.observe(stage);
      if (copyRef.current) ro.observe(copyRef.current);

      const unsubScroll = scrollProgress.on("change", (v) =>
        field.setScroll(v),
      );
      field.setScroll(scrollProgress.get());
      const unsubX = sx.on("change", (v) =>
        field.setParallax(v / sw, sy.get() / sh),
      );
      const unsubY = sy.on("change", (v) =>
        field.setParallax(sx.get() / sw, v / sh),
      );

      teardown = () => {
        disposed = true;
        ro.disconnect();
        unsubScroll();
        unsubX();
        unsubY();
        field.dispose();
        fieldRef.current = null;
        if (debug) window.__heroField = null;
      };
    };

    create(rmQuery.matches);
    const onRmChange = (e: MediaQueryListEvent) => create(e.matches);
    rmQuery.addEventListener("change", onRmChange);

    return () => {
      rmQuery.removeEventListener("change", onRmChange);
      teardown?.();
      teardown = null;
    };
  }, [stageRef, copyRef, scrollProgress, sx, sy]);

  useEffect(() => {
    fieldRef.current?.setActive(inView && mode === "live");
  }, [inView, mode]);

  useEffect(() => {
    if (still || !inView || mode !== "live") return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const stage = stageRef.current;
    if (!stage) return;
    const geo = { left: 0, top: 0, w: 1, h: 1, copyTop: 1 };
    const measureGeo = () => {
      const r = stage.getBoundingClientRect();
      geo.left = r.left;
      geo.top = r.top;
      geo.w = Math.max(1, r.width);
      geo.h = Math.max(1, r.height);
      const copy = copyRef.current;
      geo.copyTop = copy
        ? (copy.getBoundingClientRect().top - r.top) / geo.h
        : 1;
    };
    measureGeo();
    const ro = new ResizeObserver(measureGeo);
    ro.observe(stage);
    if (copyRef.current) ro.observe(copyRef.current);
    window.addEventListener("scroll", measureGeo, { passive: true });

    const onMove = (e: PointerEvent) => {
      const field = fieldRef.current;
      if (!field) return;
      const x = (e.clientX - geo.left) / geo.w;
      const y = (e.clientY - geo.top) / geo.h;
      if (x < 0 || x > 1 || y < 0 || y > geo.copyTop) field.setPointer(null);
      else field.setPointer(x, y);
      px.set((e.clientX / window.innerWidth - 0.5) * 10);
      py.set((e.clientY / window.innerHeight - 0.5) * 6);
    };
    const onLeave = () => {
      fieldRef.current?.setPointer(null);
      px.set(0);
      py.set(0);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", measureGeo);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      onLeave();
    };
  }, [px, py, still, inView, mode, stageRef, copyRef]);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 isolate overflow-hidden bg-[#0a0a0a]"
    >
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 h-full w-full transition-opacity duration-700 ease-out ${
          mode === "live" ? "opacity-100" : "opacity-0"
        }`}
      />
      {mode === "fallback" ? <FallbackPhoto /> : null}

      <div
        className="absolute inset-x-0 top-0 h-[18%]"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.25) 55%, rgba(10,10,10,0) 100%)",
        }}
      />
    </div>
  );
}

function FallbackPhoto() {
  const common = {
    alt: "",
    fill: true,
    loading: "eager" as const,
    sizes: SIZES,
    placeholder: "blur" as const,
    blurDataURL: heroBackdrop.blurDataURL,
    style: { objectPosition: "var(--hero-pos)" },
    className: "object-cover [--hero-pos:64%_50%] md:[--hero-pos:50%_50%]",
  };
  const {
    props: { srcSet: avifSrcSet },
  } = getImageProps({
    ...common,
    src: "/hero/backdrop-2560.avif",
    loader: avifLoader,
  });
  const { props: imgProps } = getImageProps({
    ...common,
    src: "/hero/backdrop-2560.webp",
    loader: webpLoader,
  });
  return (
    <motion.div
      className="absolute inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      <picture>
        <source type="image/avif" srcSet={avifSrcSet} sizes={SIZES} />
        <img {...imgProps} alt="" />
      </picture>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to top, #0a0a0a 0%, rgba(10,10,10,0.7) 16%, rgba(10,10,10,0.25) 36%, rgba(10,10,10,0) 56%)",
        }}
      />
    </motion.div>
  );
}
