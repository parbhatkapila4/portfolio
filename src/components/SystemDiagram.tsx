"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Rule } from "./Rule";

type DiagramNode = { label: string; sub?: string; accent?: boolean };
type Lane = { label: string; nodes: DiagramNode[] };

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function SystemDiagram({ lanes, caption, figNum }: { lanes: Lane[]; caption?: string; figNum?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const fig = String(figNum ?? 1).padStart(2, "0");

  return (
    <figure className="my-2">
      <div ref={ref} className="relative border border-line bg-foreground/[0.015]">
        <span className="absolute -top-2 left-5 z-10 bg-[var(--background)] px-2 font-mono text-[10px] tracking-[0.2em] text-[var(--foreground)]">
          FIG. {fig}
        </span>

        <div className="overflow-x-auto p-6 sm:p-8">
          <div className="flex min-w-max flex-col gap-9">
            {lanes.map((lane, li) => (
              <motion.div
                key={lane.label}
                initial="hidden"
                animate={inView ? "show" : "hidden"}
                variants={{ show: { transition: { staggerChildren: 0.07, delayChildren: li * 0.06 } } }}
              >
                <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.22em] text-faint">
                  {lane.label}
                </p>
                <Rule className="mb-3.5 w-full max-w-[220px]" />
                <div className="flex items-center">
                  {lane.nodes.map((n, i) => (
                    <div key={n.label} className="flex items-center">
                      <motion.div
                        variants={{
                          hidden: { opacity: 0, y: 8, scale: n.accent ? 0.96 : 1 },
                          show: {
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            transition: { duration: n.accent ? 0.6 : 0.5, ease: EASE, delay: n.accent ? 0.15 : 0 },
                          },
                        }}
                        className={`flex min-w-[128px] flex-col justify-center border px-4 py-3 transition-[transform,border-color] duration-300 [@media(hover:hover)]:hover:-translate-y-[2px] ${
                          n.accent
                            ? "border-foreground bg-foreground text-background shadow-[0_4px_24px_var(--line-strong)]"
                            : "border-line-strong bg-[var(--surface-2)] text-[var(--foreground)] [@media(hover:hover)]:hover:border-foreground/40"
                        }`}
                      >
                        <span className="font-mono text-[12px] font-medium leading-tight">{n.label}</span>
                        {n.sub && (
                          <span
                            className={`mt-1 font-mono text-[9px] uppercase leading-tight tracking-[0.1em] ${
                              n.accent ? "text-background/65" : "text-muted"
                            }`}
                          >
                            {n.sub}
                          </span>
                        )}
                      </motion.div>
                      {i < lane.nodes.length - 1 && (
                        <span className="flex shrink-0 items-center self-center text-foreground/35">
                          <span
                            className={`h-px w-7 bg-repeat-x ${inView ? "motion-safe:animate-[flow_0.5s_linear_infinite]" : ""}`}
                            style={{
                              backgroundImage: "linear-gradient(to right, currentColor 50%, transparent 50%)",
                              backgroundSize: "10px 1px",
                            }}
                          />
                          <span className="-ml-px text-[9px] leading-none">▶</span>
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      {caption && (
        <figcaption className="mt-3 font-mono text-[11px] leading-relaxed tracking-[0.04em] text-faint">
          <span className="text-[var(--foreground)]">FIG. {fig}</span> - {caption}
        </figcaption>
      )}
    </figure>
  );
}
