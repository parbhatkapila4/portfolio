"use client";

import { motion } from "motion/react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

type Bullet = { lead?: string; text: string };

export function DatasheetBullets({ bullets }: { bullets: Bullet[] }) {
  return (
    <motion.ul
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={{ show: { transition: { staggerChildren: 0.08 } } }}
      className="mt-3 divide-y divide-[var(--foreground)]/10 border-t border-[var(--foreground)]/10"
    >
      {bullets.map((b, i) => (
        <motion.li
          key={i}
          variants={{
            hidden: { opacity: 0, y: 16 },
            show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
          }}
          className="grid grid-cols-1 gap-x-6 gap-y-1.5 py-5 sm:grid-cols-12"
        >
          <div className="flex items-baseline gap-3 sm:col-span-5">
            <span className="font-mono text-[0.6875rem] tabular-nums text-faint">
              {String(i + 1).padStart(2, "0")}
            </span>
            {b.lead && (
              <span className="font-display text-[0.9375rem] font-semibold leading-snug tracking-[-0.01em] text-[var(--foreground)]">
                {b.lead}
              </span>
            )}
          </div>
          <p
            className={`text-[0.9375rem] leading-relaxed text-[var(--foreground)]/75 ${
              b.lead ? "sm:col-span-7" : "sm:col-span-11 sm:col-start-2"
            }`}
          >
            {b.text}
          </p>
        </motion.li>
      ))}
    </motion.ul>
  );
}
