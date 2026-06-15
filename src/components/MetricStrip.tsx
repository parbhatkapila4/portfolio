"use client";

import { useRef } from "react";
import { useInView } from "motion/react";
import { MetricValue } from "./MetricValue";

export function MetricStrip({ items }: { items: { value: string; label: string }[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref}>
      <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--foreground)]/45">
        fig. 00 <span className="opacity-50">—</span> results
      </p>
      <dl className="grid grid-cols-2 gap-x-6 gap-y-8 border-t border-[var(--foreground)]/12 pt-7 sm:grid-cols-4 sm:gap-y-0 sm:divide-x sm:divide-[var(--foreground)]/10">
        {items.map((m) => (
          <div key={m.label} className="sm:px-6 sm:first:pl-0">
            <dt className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
              <MetricValue value={m.value} inView={inView} />
            </dt>
            <dd className="mt-2.5 font-mono text-[10px] uppercase leading-tight tracking-[0.16em] text-[var(--foreground)]/55">
              {m.label}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
