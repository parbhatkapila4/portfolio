"use client";

import { useEffect, useLayoutEffect, useState } from "react";
const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;
export function useOverHero(
  probe: number | (() => number),
  initial = true,
): boolean {
  const [over, setOver] = useState(initial);

  useIsomorphicLayoutEffect(() => {
    const stage = document.querySelector<HTMLElement>("[data-hero-stage]");
    if (!stage) {
      setOver(false);
      return;
    }

    let raf = 0;
    const measure = () => {
      raf = 0;
      const y = typeof probe === "function" ? probe() : probe;
      const rect = stage.getBoundingClientRect();
      setOver(rect.top <= y && rect.bottom >= y);
    };
    const schedule = () => {
      if (raf) return;
      raf = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [probe]);

  return over;
}
