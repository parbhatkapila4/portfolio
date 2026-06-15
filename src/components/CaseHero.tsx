"use client";

import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { MaskLines } from "./MaskLines";
import { Magnetic } from "./Magnetic";
import { Rule } from "./Rule";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function host(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export function CaseHero({
  title,
  tagline,
  live,
  source,
  field,
  docNum,
  year = "2026",
}: {
  title: string;
  tagline: string;
  live: string;
  source: string;
  field: string;
  docNum: string;
  year?: string;
}) {
  const ci = title.indexOf(":");
  const lines = ci > -1 ? [title.slice(0, ci + 1), title.slice(ci + 1).trim()] : [title];
  const standfirstDelay = 0.15 + lines.length * 0.12 + 0.2;

  return (
    <header className="relative flex min-h-[80vh] flex-col justify-end pb-[8vh]">
      <span
        aria-hidden
        className="pointer-events-none absolute right-0 top-2 -z-10 translate-x-[5%] select-none font-heading text-[clamp(7rem,16vw,13rem)] font-semibold leading-none tabular-nums text-[var(--foreground)]/[0.05]"
      >
        {docNum}
      </span>

      <div className="max-w-[1000px]">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--foreground)]/55">
          Writing <span className="opacity-40">·</span> Case study <span className="opacity-40">·</span> {year}{" "}
          <span className="opacity-40">·</span> {field}
        </p>
        <Rule className="mt-3 w-full" delay={0.1} />

        <h1 className="font-heading mt-7 text-[clamp(2.5rem,7vw,5.25rem)] font-semibold leading-[0.94] tracking-[-0.035em]">
          <MaskLines lines={lines} />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: standfirstDelay, duration: 0.7, ease: EASE }}
          className="mt-7 max-w-[60ch] text-lg leading-relaxed text-[var(--foreground)]/75 first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-heading first-letter:text-[4.25rem] first-letter:font-semibold first-letter:leading-[0.74] sm:text-xl"
        >
          {tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: standfirstDelay + 0.15, duration: 0.6, ease: EASE }}
          className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--foreground)]/60"
        >
          <Magnetic className="inline-flex">
            <a
              href={live}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 transition-colors hover:text-[var(--foreground)]"
            >
              Live <span className="opacity-45 normal-case tracking-normal">{host(live)}</span>
              <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Magnetic>
          <span className="h-3 w-px bg-[var(--foreground)]/20" />
          <Magnetic className="inline-flex">
            <a
              href={source}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 transition-colors hover:text-[var(--foreground)]"
            >
              Source <span className="opacity-45 normal-case tracking-normal">{host(source)}</span>
              <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Magnetic>
        </motion.div>
      </div>

      <div className="mt-14 hidden items-center gap-3 motion-reduce:hidden sm:flex">
        <motion.span
          className="block h-8 w-px bg-[var(--foreground)]/40"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
        <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[var(--foreground)]/45">Scroll</span>
      </div>
    </header>
  );
}
