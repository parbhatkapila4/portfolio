import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { MaskLines } from "./MaskLines";
import { LiveClock } from "./LiveClock";
import { Magnetic } from "./Magnetic";

const RESUME_URL =
  "https://drive.google.com/file/d/173l5TKWumoK91FhcQdMRfYafhg9BbTi1/view?usp=sharing";

const stats = [
  { value: "10K+", label: "Emails indexed", source: "VectorMail" },
  { value: "12-Stage", label: "AI video pipeline", source: "Cutline" },
  { value: "CRM-gated", label: "Data ingestion", source: "Sentinel" },
];

const Hero = () => {
  return (
    <section id="home" className="relative flex min-h-[100svh] flex-col px-6 md:px-10 lg:px-16">
      <div className="flex items-center gap-4 pt-28 font-mono text-[11px] uppercase tracking-[0.25em] text-neutral-500 dark:text-neutral-400 sm:text-xs lg:pt-32">
        <span className="flex items-center gap-2 text-[var(--foreground)]">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--foreground)] motion-safe:animate-pulse" />
          Available for select roles
        </span>
        <span className="h-px flex-1 bg-black/10 dark:bg-white/15" />
        <span className="hidden items-center gap-3 sm:flex">
          <LiveClock />
          <span className="opacity-40">/</span>
          Remote - US·EU
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-center py-10 lg:py-12">
        <div className="grid grid-cols-1 items-start gap-x-8 gap-y-10 lg:grid-cols-12">
          <div className="col-span-12 lg:col-span-8">
            <Reveal immediate>
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-neutral-500 dark:text-neutral-400 sm:text-xs">
                Parbhat Kapila - AI Systems Engineer
              </p>
            </Reveal>
            <h1 className="font-heading mt-5 text-[clamp(2.5rem,8vw,6.75rem)] font-semibold leading-[0.9] tracking-[-0.04em]">
              <MaskLines lines={["Building", "production AI", "systems."]} />
            </h1>
            <Reveal delay={0.5} immediate>
              <p className="mt-6 flex items-center gap-3 text-base text-neutral-600 dark:text-neutral-300 sm:text-lg">
                <span className="h-px w-8 shrink-0 bg-current opacity-40" />
                Ship to production, then keep it running.
              </p>
            </Reveal>

            <Reveal delay={0.6} immediate>
              <dl className="mt-9 grid max-w-2xl grid-cols-3 gap-4 border-t border-black/10 pt-7 dark:border-white/15">
                {stats.map((s) => (
                  <div key={s.label}>
                    <dt className="font-heading text-2xl font-semibold tracking-tight tabular-nums sm:text-4xl">
                      {s.value}
                    </dt>
                    <dd className="mt-1.5 font-mono text-[10px] uppercase leading-tight tracking-[0.14em] text-neutral-500 dark:text-neutral-400 sm:text-[11px]">
                      {s.label} <span className="opacity-50">/ {s.source}</span>
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={0.7} immediate>
              <div className="mt-9 flex flex-wrap items-center gap-x-4 gap-y-4">
                <Magnetic className="inline-flex">
                  <a
                    href="#contact"
                    className="group inline-flex items-center gap-2.5 border border-[var(--foreground)] bg-[var(--foreground)] px-7 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--background)] transition-colors duration-300 hover:bg-transparent hover:text-[var(--foreground)]"
                  >
                    Let&apos;s build something
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </Magnetic>
                <Magnetic className="inline-flex">
                  <a
                    href={RESUME_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 px-3 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--foreground)]"
                  >
                    <span className="relative">
                      View résumé
                      <span className="absolute -bottom-1 left-0 h-px w-full origin-right bg-current transition-transform duration-300 group-hover:origin-left group-hover:scale-x-0" />
                    </span>
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </Magnetic>
              </div>
            </Reveal>
          </div>

          <div className="col-span-12 lg:col-span-4 lg:pt-1">
            <Reveal delay={0.45} immediate>
              <figure className="group">
                <div className="relative aspect-[3/4] w-full max-w-[260px] overflow-hidden border border-black/10 dark:border-white/15 lg:ml-auto">
                  <Image
                    src="/Parbhat1.jpg"
                    alt="Parbhat Kapila - AI Systems Engineer"
                    fill
                    priority
                    sizes="(max-width: 1024px) 260px, 300px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  />
                </div>
                <figcaption className="mt-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400 lg:ml-auto lg:max-w-[260px]">
                  <span>Parbhat Kapila</span>
                  <span>/ &apos;26</span>
                </figcaption>
                <p className="mt-6 text-[14px] leading-relaxed text-neutral-600 dark:text-neutral-300 lg:ml-auto lg:max-w-[260px]">
                  Live products you can use today - all built and run by me, no team behind
                  them. Everything&apos;s public and verifiable.
                </p>
              </figure>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
