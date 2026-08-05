"use client";

import { useRef } from "react";
import { useInView } from "motion/react";
import { MetricValue } from "./MetricValue";

export function MetricStrip({ items }: { items: { value: string; label: string }[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref}>
      <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-faint">
        <span className="text-[var(--foreground)]">fig. 00</span> <span className="opacity-50">—</span> results
      </p>
      <dl className="grid grid-cols-2 border-y border-line sm:grid-cols-4">
        {items.map((m, i) => (
          <div
            key={m.label}
            className={[
              "flex flex-col gap-2 py-6 sm:py-7 sm:pr-8",
              i % 2 === 1 ? "border-l pl-5" : "",
              i >= 2 ? "max-sm:border-t" : "",
              i > 0 ? "sm:border-l sm:pl-8" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <dt className="font-display text-xl font-semibold tracking-tight sm:text-2xl">
              <MetricValue value={m.value} inView={inView} />
            </dt>
            <dd className="font-mono text-[9px] uppercase leading-relaxed tracking-[0.14em] text-muted sm:text-[10px]">
              {m.label}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
