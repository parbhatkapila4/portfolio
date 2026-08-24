"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Reveal } from "./Reveal";
import { LiveClock } from "./LiveClock";
import { MaskLines } from "./MaskLines";
import { HeroBackdrop, type HeroBackdropState } from "./HeroBackdrop";
import { useOverHero } from "@/hooks/useOverHero";

const RESUME_URL =
  "https://drive.google.com/file/d/1QFkv7CN9ZERgODnO_F_t07TJMYkJhzPn/view?usp=drive_link";

const stats = [
  { value: "10K+", label: "Emails indexed", source: "VectorMail" },
  { value: "12-Stage", label: "AI video pipeline", source: "Cutline" },
  { value: "CRM-gated", label: "Data ingestion", source: "Sentinel" },
];

const statementLines = [
  "Engineering",
  <span
    key="l2"
    className="block pl-[10%] font-serif italic font-normal tracking-normal text-[1.04em] sm:pl-[25%]"
  >
    production AI
  </span>,
  <span key="l3" className="block pl-[20%] sm:pl-[50%]">
    systems.
  </span>,
];

const Hero = () => {
  const stageRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const [backdrop, setBackdrop] = useState<HeroBackdropState>({
    kind: "pending",
  });
  const onBackdropState = useCallback(
    (s: HeroBackdropState) => setBackdrop(s),
    [],
  );
  const stageAtTop = useOverHero(1);
  useEffect(() => {
    const meta = document.querySelector<HTMLMetaElement>(
      'meta[name="theme-color"][media*="light"]',
    );
    if (!meta) return;
    const original = meta.dataset.original ?? meta.content;
    meta.dataset.original = original;
    meta.content = stageAtTop ? "#0a0a0a" : original;
    return () => {
      meta.content = original;
    };
  }, [stageAtTop]);

  return (
    <section id="home" className="relative">
      <div
        ref={stageRef}
        data-hero-stage
        className="scope-dark relative flex min-h-[100svh] flex-col overflow-hidden bg-[#0a0a0a] text-[var(--foreground)]"
      >
        <HeroBackdrop
          stageRef={stageRef}
          copyRef={copyRef}
          onState={onBackdropState}
        />

        <div className="relative z-[1] mx-auto flex w-full max-w-[87.5rem] flex-1 flex-col justify-end px-6 pb-8 pt-32 sm:px-10 sm:pb-9 lg:px-14 lg:pb-10">
          <div ref={copyRef}>
            <Reveal immediate delay={0.4} y={12}>
              <div className="flex items-baseline justify-between gap-6">
                <p className="flex items-center gap-3 font-mono text-[0.625rem] uppercase tracking-[0.24em] text-foreground sm:gap-4 sm:text-[0.6875rem] sm:tracking-[0.32em]">
                  <span
                    aria-hidden
                    className="h-px w-6 shrink-0 bg-foreground/60 sm:w-10"
                  />
                  Parbhat Kapila - AI Systems Engineer
                </p>
                {backdrop.kind === "live" ? (
                  <p
                    aria-hidden
                    className="hidden shrink-0 font-mono text-[0.625rem] uppercase tracking-[0.24em] text-foreground/80 lg:block [@media(max-height:760px)]:lg:hidden"
                  >
                    Fig. 01 -{" "}
                    {backdrop.still
                      ? "Still"
                      : `${backdrop.info.particles.toLocaleString("en-US")} streamlines · Live`}
                  </p>
                ) : null}
              </div>
            </Reveal>

            <h1 className="font-display mt-5 text-[clamp(2.5rem,5.9vw,6rem)] font-semibold leading-[0.96] tracking-[-0.04em] sm:mt-6">
              <MaskLines lines={statementLines} delay={0.55} stagger={0.12} />
            </h1>

            <div className="mt-8 grid grid-cols-1 gap-x-10 gap-y-7 border-t border-line pt-6 sm:mt-9 lg:grid-cols-12 lg:items-end">
              <Reveal delay={0.9} immediate y={12} className="lg:col-span-5">
                <p className="max-w-[34ch] text-base leading-relaxed text-muted sm:text-lg">
                  Deploy to production, then own the reliability.
                </p>
              </Reveal>

              <Reveal
                delay={1.0}
                immediate
                y={12}
                className="flex flex-col gap-5 lg:col-span-5 lg:col-start-8"
              >
                <div className="flex flex-col gap-y-2 font-mono text-[0.625rem] uppercase tracking-[0.28em]">
                  <span className="inline-flex items-center gap-2.5 text-muted">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-foreground opacity-60 motion-safe:animate-ping" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-foreground" />
                    </span>
                    Available for select roles
                  </span>
                  <span className="hidden items-baseline gap-3 text-muted sm:flex">
                    <LiveClock />
                    <span className="opacity-50">/</span>
                    Remote - US·EU
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
                  <a
                    href="#contact"
                    className="link-underline group inline-flex items-center gap-1.5 text-[0.9375rem] font-medium text-[var(--foreground)]"
                  >
                    Let&apos;s engineer something
                    <span
                      aria-hidden
                      className="inline-block h-px w-4 shrink-0 bg-current opacity-60 transition-[width] duration-300 group-hover:w-7"
                    />
                  </a>
                  <a
                    href={RESUME_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline group inline-flex items-center gap-1.5 text-[0.9375rem] font-medium text-muted transition-colors hover:text-[var(--foreground)]"
                  >
                    View résumé
                    <span
                      aria-hidden
                      className="inline-block h-px w-4 shrink-0 bg-current opacity-60 transition-[width] duration-300 group-hover:w-7"
                    />
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 sm:px-10 lg:px-14">
        <div className="mx-auto w-full max-w-[87.5rem]">
          <Reveal delay={0.1}>
            <dl className="grid grid-cols-1 border-y border-line sm:grid-cols-3">
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className={`flex flex-col gap-2 py-6 max-sm:[&:not(:first-child)]:border-t sm:py-7 ${
                    i === 1
                      ? "sm:border-l sm:px-10"
                      : i === 2
                        ? "sm:border-l sm:pl-10"
                        : "sm:pr-10"
                  }`}
                >
                  <dt className="font-display text-2xl font-semibold tracking-[-0.02em] tabular-nums sm:text-3xl">
                    {s.value}
                  </dt>
                  <dd className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-muted">
                    {s.label} <span className="text-faint">/ {s.source}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Hero;
