"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "span" | "li" | "article" | "section";
  immediate?: boolean;
};

const TRANSITION = (delay: number) => ({
  duration: 0.7,
  delay,
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
});

export function Reveal({ children, className, delay = 0, y = 18, as = "div", immediate = false }: RevealProps) {
  const Cmp = motion[as];

  if (immediate) {
    return (
      <Cmp
        className={className}
        initial={{ opacity: 0, y }}
        animate={{ opacity: 1, y: 0 }}
        transition={TRANSITION(delay)}
      >
        {children}
      </Cmp>
    );
  }

  return (
    <Cmp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={TRANSITION(delay)}
    >
      {children}
    </Cmp>
  );
}
