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

  const lineNodes = lines.map((line, i) =>
    i === 0 ? (
      line
    ) : (
      <span
        key={i}
        className="font-serif block normal-case italic font-normal tracking-normal text-[1.03em]"
      >
        {line}
      </span>
    )
  );

  return (
    <header className="relative flex min-h-[80vh] flex-col justify-end pb-[8vh]">
      <span
        aria-hidden
        className="font-display pointer-events-none absolute right-0 top-6 -z-10 translate-x-[3%] select-none text-[clamp(7rem,17vw,14rem)] font-bold leading-none tabular-nums text-foreground/[0.05]"
      >
        {docNum}
      </span>

      <div className="max-w-[62.5rem]">
        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.25em] text-muted">
          Writing <span className="text-faint">·</span> Case study <span className="text-faint">·</span> {year}{" "}
          <span className="text-faint">·</span> {field}
        </p>
        <Rule className="mt-3 w-full" delay={0.1} />

        <h1 className="font-display mt-8 text-[clamp(2.4rem,6.8vw,5.5rem)] font-bold uppercase leading-[0.95] tracking-[-0.035em]">
          <MaskLines lines={lineNodes} />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: standfirstDelay, duration: 0.7, ease: EASE }}
          className="mt-8 max-w-[60ch] text-lg leading-relaxed text-[var(--foreground)]/75 first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-serif first-letter:text-[4.5rem] first-letter:italic first-letter:leading-[0.72] sm:text-xl"
        >
          {tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: standfirstDelay + 0.15, duration: 0.6, ease: EASE }}
          className="mt-9 flex flex-wrap items-center gap-3 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-muted"
        >
          <Magnetic className="inline-flex">
            <a
              href={live}
              target="_blank"
              rel="noopener noreferrer"
              className="group link-underline inline-flex items-center gap-2 transition-colors hover:text-[var(--foreground)]"
            >
              Live <span className="normal-case tracking-normal text-faint">{host(live)}</span>
              <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Magnetic>
          <Magnetic className="inline-flex">
            <a
              href={source}
              target="_blank"
              rel="noopener noreferrer"
              className="group link-underline inline-flex items-center gap-2 transition-colors hover:text-[var(--foreground)]"
            >
              Source <span className="normal-case tracking-normal text-faint">{host(source)}</span>
              <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Magnetic>
        </motion.div>
      </div>

    </header>
  );
}
