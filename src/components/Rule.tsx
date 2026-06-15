"use client";

import { motion } from "motion/react";

export function Rule({
  className = "",
  delay = 0,
  vertical = false,
}: {
  className?: string;
  delay?: number;
  vertical?: boolean;
}) {
  return (
    <motion.span
      aria-hidden
      className={`block shrink-0 bg-[var(--foreground)]/15 ${vertical ? "w-px" : "h-px"} ${className}`}
      style={{ originX: 0, originY: 0 }}
      initial={vertical ? { scaleY: 0 } : { scaleX: 0 }}
      whileInView={vertical ? { scaleY: 1 } : { scaleX: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    />
  );
}
