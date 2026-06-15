"use client";

import { motion } from "motion/react";
import { Rule } from "./Rule";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function SpecGrid({ items }: { items: { title: string; lines: string[] }[] }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={{ show: { transition: { staggerChildren: 0.08 } } }}
      className="grid grid-cols-1 border-l border-t border-[var(--foreground)]/10 sm:grid-cols-2 lg:grid-cols-3"
    >
      {items.map((it, i) => (
        <motion.div
          key={it.title}
          variants={{
            hidden: { opacity: 0, y: 16 },
            show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
          }}
          className="relative flex flex-col border-b border-r border-[var(--foreground)]/10 bg-[var(--background)] p-6"
        >
          <span className="absolute right-4 top-4 font-mono text-[10px] tabular-nums text-[var(--foreground)]/30">
            {String(i + 1).padStart(2, "0")}
          </span>
          <Rule className="mb-4 w-8" />
          <h4 className="font-heading pr-8 text-base font-semibold tracking-[-0.01em]">{it.title}</h4>
          <ul className="mt-3 space-y-2">
            {it.lines.map((l, j) => (
              <li key={j} className="text-sm leading-relaxed text-[var(--foreground)]/70">
                {l}
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </motion.div>
  );
}
