import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { LiveClock } from "./LiveClock";
import { MaskLines } from "./MaskLines";

const RESUME_URL = "/resume.pdf";

const stats = [
  { value: "10K+", label: "Emails indexed", source: "VectorMail" },
  { value: "12-Stage", label: "AI video pipeline", source: "Cutline" },
  { value: "CRM-gated", label: "Data ingestion", source: "Sentinel" },
];

const statementLines = [
  "Engineering",
  <span
    key="l2"
    className="block pl-[8vw] font-serif italic font-normal tracking-normal text-[1.04em] sm:pl-[12vw]"
  >
    production AI
  </span>,
  <span key="l3" className="block pl-[16vw] sm:pl-[24vw]">
    systems.
  </span>,
];

const Hero = () => {
  return (
    <section
      id="home"
      className="relative px-6 pb-8 pt-28 sm:px-10 lg:px-14"
    >
      <div className="mx-auto w-full max-w-[87.5rem]">
        <Reveal immediate>
          <div className="flex items-baseline justify-between font-mono text-[0.625rem] uppercase tracking-[0.28em]">
            <span className="inline-flex items-center gap-2.5 text-muted">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-foreground opacity-60 motion-safe:animate-ping" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-foreground" />
              </span>
              Available for select roles
            </span>
            <span className="hidden items-baseline gap-3 text-faint sm:flex">
              <LiveClock />
              <span className="opacity-50">/</span>
              Remote - US·EU
            </span>
          </div>
        </Reveal>

        <div className="pt-20 sm:pt-28 lg:pt-36">
          <Reveal immediate>
            <p className="flex items-center gap-4 font-mono text-[0.625rem] uppercase tracking-[0.32em] text-muted sm:text-[0.6875rem]">
              <span aria-hidden className="h-px w-10 bg-foreground/40" />
              Parbhat Kapila - AI Systems Engineer
            </p>
          </Reveal>

          <h1 className="font-display mt-8 text-[clamp(2.9rem,9.5vw,8.75rem)] font-semibold leading-[0.98] tracking-[-0.04em] sm:mt-10">
            <MaskLines lines={statementLines} />
          </h1>

          <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-8 border-t border-line pt-9 sm:mt-14 lg:grid-cols-12">
            <Reveal delay={0.55} immediate className="lg:col-span-6">
              <p className="max-w-[36ch] text-base leading-relaxed text-muted sm:text-lg">
                Deploy to production, then own the reliability.
              </p>
            </Reveal>
            <Reveal
              delay={0.65}
              immediate
              className="flex flex-wrap items-center gap-x-8 gap-y-3 lg:col-span-5 lg:col-start-8 lg:justify-end"
            >
              <a
                href="#contact"
                className="link-underline group inline-flex items-center gap-1.5 text-[0.9375rem] font-medium text-[var(--foreground)]"
              >
                Let&apos;s engineer something
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline group inline-flex items-center gap-1.5 text-[0.9375rem] font-medium text-muted transition-colors hover:text-[var(--foreground)]"
              >
                View résumé
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Reveal>
          </div>

          <Reveal delay={0.78} immediate>
            <dl className="mt-14 grid grid-cols-1 border-t border-line sm:grid-cols-3">
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className={`flex flex-col gap-2 py-6 max-sm:[&:not(:first-child)]:border-t sm:py-7 ${
                    i === 1 ? "sm:border-l sm:px-10" : i === 2 ? "sm:border-l sm:pl-10" : "sm:pr-10"
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
