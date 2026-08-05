"use client";

import { motion, useScroll, useSpring, useReducedMotion } from "motion/react";

export function ReadingProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  const scaleX = reduce ? scrollYProgress : smooth;

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-[var(--accent)]"
      style={{ scaleX }}
    />
  );
}
