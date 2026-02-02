"use client";

import { useState, useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import "lenis/dist/lenis.css";

const HEADER_OFFSET = 100;

function AnchorScrollHandler({ children }: { children: React.ReactNode }) {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor || !anchor.hash) return;
      const id = anchor.hash.slice(1);
      if (!id) return;
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, { offset: -HEADER_OFFSET, duration: 1.2 });
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [lenis]);

  return <>{children}</>;
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [useSmooth, setUseSmooth] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setUseSmooth(!mq.matches);
  }, []);

  if (!useSmooth) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      options={{
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 2,
        autoRaf: true,
      }}
    >
      <AnchorScrollHandler>{children}</AnchorScrollHandler>
    </ReactLenis>
  );
}
