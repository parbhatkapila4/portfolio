"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center pt-24 pb-16 px-4 sm:px-6 lg:pt-28 lg:pb-24 bg-white dark:bg-black relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none z-0 dark:hidden">
        <svg
          className="absolute w-[180%] h-[180%] right-0 top-1/2 -translate-y-1/2"
          viewBox="0 0 800 600"
          preserveAspectRatio="xMaxYMid meet"
          style={{ transform: "rotate(-10deg)" }}
        >
          <defs>
            <linearGradient id="ribbon-light" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#e2e8f0" stopOpacity="0.08" />
            </linearGradient>
          </defs>
          <path
            d="M 700 0 L 800 100 C 650 300 450 450 200 550 C -50 650 -150 600 -100 500 L 100 300 C 300 350 500 250 700 0 Z"
            fill="url(#ribbon-light)"
          />
        </svg>
      </div>
      <div className="absolute inset-0 pointer-events-none z-0 hidden dark:block">
        <svg
          className="absolute w-[180%] h-[180%] right-0 top-1/2 -translate-y-1/2"
          viewBox="0 0 800 600"
          preserveAspectRatio="xMaxYMid meet"
          style={{ transform: "rotate(-10deg)" }}
        >
          <defs>
            <linearGradient id="ribbon-dark" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#27272a" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#18181b" stopOpacity="0.15" />
            </linearGradient>
          </defs>
          <path
            d="M 700 0 L 800 100 C 650 300 450 450 200 550 C -50 650 -150 600 -100 500 L 100 300 C 300 350 500 250 700 0 Z"
            fill="url(#ribbon-dark)"
          />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="space-y-6 lg:space-y-10 order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-slate-200/80 dark:border-white/10 bg-white/60 dark:bg-white/[0.03] backdrop-blur-sm max-w-full">
              <div className="w-1.5 h-1.5 shrink-0 bg-emerald-500 rounded-full" />
              <span className="text-[11px] sm:text-xs font-medium tracking-wide text-slate-600 dark:text-white uppercase">
                Available for full-time · US startups · Remote
              </span>
            </div>

            <div className="space-y-2 lg:space-y-3">
              <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-white tracking-wide">
                Parbhat Kapila · Full-Stack Engineer
              </p>
              <h1 className="font-heading text-3xl sm:text-6xl md:text-7xl lg:text-[4.25rem] xl:text-[4.75rem] font-semibold text-slate-900 dark:text-white leading-[1.12] tracking-[-0.02em]">
                Building
                <br />
                <span className="text-teal-600 dark:text-teal-400">Production AI</span>
                <br />
                <span className="dark:text-white">Systems</span>
              </h1>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 tracking-wide">
                Ship to production, then keep it running.
              </p>
            </div>

            <p className="text-sm lg:text-base text-slate-600 dark:text-white leading-relaxed max-w-lg font-normal">
              Shipped and operated live production systems. Reduced onboarding 75%, cut infra costs 95%. I build internal AI tools, RAG infrastructure, and data-heavy SaaS and ship them to production. Fast, cheap, reliable under real traffic.
            </p>

            <div className="flex flex-wrap gap-6 lg:gap-12 py-4 lg:py-6 border-y border-slate-200/60 dark:border-white/[0.06]">
              <div>
                <div className="font-heading text-lg lg:text-xl font-semibold text-slate-900 dark:text-white tabular-nums">100K+</div>
                <div className="text-xs lg:text-sm text-slate-500 dark:text-white/90 mt-0.5">LOC indexed</div>
              </div>
              <div>
                <div className="font-heading text-lg lg:text-xl font-semibold text-slate-900 dark:text-white tabular-nums">99.9%</div>
                <div className="text-xs lg:text-sm text-slate-500 dark:text-white/90 mt-0.5">Uptime</div>
              </div>
              <div>
                <div className="font-heading text-lg lg:text-xl font-semibold text-slate-900 dark:text-white tabular-nums">75%</div>
                <div className="text-xs lg:text-sm text-slate-500 dark:text-white/90 mt-0.5">Onboarding cut</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-1 lg:pt-0">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 lg:px-6 lg:py-3.5 bg-teal-600 text-white rounded-xl text-sm lg:text-base font-semibold hover:bg-teal-700 dark:bg-white dark:text-black dark:hover:bg-gray-100 transition-all duration-200"
              >
                Let&apos;s Build Something
                <ArrowRight className="w-4 h-4" aria-hidden />
              </a>
              <a
                href="https://drive.google.com/file/d/1DCOrzdqGl458ebbURChfwhR3IadqRCsy/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-5 py-3 lg:px-6 lg:py-3.5 border-2 border-slate-300 dark:border-white/20 rounded-xl text-sm lg:text-base font-semibold text-slate-700 dark:text-white hover:border-teal-500 hover:text-teal-600 dark:hover:border-white/30 dark:hover:bg-white/5 transition-all duration-200"
              >
                View Resume
              </a>
            </div>
          </div>

          <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end z-10">
            <div className="relative w-full max-w-[240px] sm:max-w-[280px] lg:max-w-[340px] aspect-[4/5] rounded-2xl overflow-hidden border border-slate-200/80 dark:border-white/[0.08] shadow-xl mx-auto lg:mx-0">
              <Image
                src="/Parbhat1.jpg"
                alt="Parbhat Kapila - Full Stack Engineer"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 320px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
