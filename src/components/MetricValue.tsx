"use client";

import { useEffect, useMemo, useState } from "react";
import { animate, motion, useReducedMotion } from "motion/react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function parseNumeric(value: string): { num: number; suffix: string } | null {
  const m = value.match(/^(\d[\d,]*)(.*)$/);
  if (!m) return null;
  if (/^-\d/.test(m[2])) return null;
  return { num: parseInt(m[1].replace(/,/g, ""), 10), suffix: m[2] };
}

export function MetricValue({ value, inView }: { value: string; inView: boolean }) {
  const reduce = useReducedMotion();
  const parsed = useMemo(() => parseNumeric(value), [value]);
  const target = parsed?.num ?? null;
  const [n, setN] = useState<number>(0);

  useEffect(() => {
    if (target == null || reduce || !inView) return;
    const controls = animate(0, target, {
      duration: 1.4,
      ease: EASE,
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, target]);

  if (parsed) {
    const shown = reduce ? parsed.num : inView ? n : 0;
    return (
      <span className="tabular-nums">
        {shown}
        {parsed.suffix}
      </span>
    );
  }

  if (reduce) return <span>{value}</span>;

  return (
    <span className="inline-block overflow-hidden pb-[0.12em] -mb-[0.08em] align-bottom">
      <motion.span
        className="inline-block"
        initial={{ y: "110%" }}
        animate={inView ? { y: 0 } : { y: "110%" }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        {value}
      </motion.span>
    </span>
  );
}
