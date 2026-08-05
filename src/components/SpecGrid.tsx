"use client";

import { motion } from "motion/react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function SpecGrid({ items }: { items: { title: string; lines: string[] }[] }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={{ show: { transition: { staggerChildren: 0.08 } } }}
    >
      {items.map((it, i) => (
        <motion.div
          key={it.title}
          variants={{
            hidden: { opacity: 0, y: 16 },
            show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
          }}
          className="grid grid-cols-1 gap-y-3 border-t border-line py-6 last:border-b sm:grid-cols-12 sm:gap-x-8 sm:py-7"
        >
          <div className="flex items-baseline gap-4 sm:col-span-4">
            <span aria-hidden className="font-mono text-[10px] tabular-nums text-faint">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h4 className="font-display text-base font-semibold tracking-[-0.01em] sm:text-lg">{it.title}</h4>
          </div>
          <ul className="space-y-2 sm:col-span-8">
            {it.lines.map((l, j) => (
              <li key={j} className="max-w-[62ch] text-sm leading-relaxed text-[var(--foreground)]/70">
                {l}
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </motion.div>
  );
}
