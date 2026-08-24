"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

type MaskLinesProps = {
  lines: ReactNode[];
  className?: string;

  delay?: number;

  stagger?: number;
};

export function MaskLines({
  lines,
  className,
  delay = 0.15,
  stagger = 0.12,
}: MaskLinesProps) {
  return (
    <span className={className}>
      {lines.map((line, i) => (
        <span
          key={i}
          className="block overflow-hidden pb-[0.12em] -mb-[0.06em]"
        >
          <motion.span
            className="block"
            initial={{ y: "115%" }}
            animate={{ y: 0 }}
            transition={{
              duration: 0.9,
              delay: delay + i * stagger,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
