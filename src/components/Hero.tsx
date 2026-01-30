"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center pt-20 pb-16 px-4 sm:px-6 bg-white dark:bg-black relative overflow-hidden"
    >


      <div className="absolute top-1/4 -right-32 w-96 h-96 bg-teal-100/60 rounded-full blur-3xl pointer-events-none opacity-0 dark:opacity-0" />
      <div className="absolute bottom-1/4 -left-32 w-80 h-80 bg-amber-100/50 rounded-full blur-3xl pointer-events-none opacity-0 dark:opacity-0" />

      <div className="absolute inset-0 opacity-0 dark:opacity-[0.03] pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "50px 50px" }} />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            className="space-y-8 order-2 lg:order-1"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 dark:bg-white/5 dark:border-white/10">
              <div className="w-2 h-2 bg-teal-500 dark:bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-teal-700 dark:text-gray-400">
                Available for US startups · Remote
              </span>
            </div>

            <div>
              <p className="text-slate-600 dark:text-gray-400 font-medium mb-2">Parbhat Kapila · Full-Stack Engineer</p>
              <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white leading-[1.1] tracking-tight">
                Building
                <br />
                <span className="text-teal-600 dark:text-teal-400">Production AI</span>
                <br />
                <span className="dark:text-gray-500">Systems</span>
              </h1>
            </div>

            <p className="text-lg text-slate-600 dark:text-gray-400 leading-relaxed max-w-xl">
              Full-stack engineer focused on internal AI tools, RAG infrastructure, and data-heavy SaaS.
              I ship from zero to live product, then keep it fast, cheap, and reliable under real traffic.
            </p>

            <div className="flex flex-wrap gap-8 py-4 border-t border-slate-200/50 dark:border-white/5">
              <div>
                <div className="font-heading text-2xl font-bold text-slate-900 dark:text-white inline-flex items-baseline">
                  <span>10</span>
                  <span className="[vertical-align:-0.12em]">K+</span>
                </div>
                <div className="text-sm text-slate-500 dark:text-gray-500">Documents</div>
              </div>
              <div>
                <div className="font-heading text-2xl font-bold text-slate-900 dark:text-white inline-flex items-baseline">
                  <span>99.9</span>
                  <span className="[vertical-align:-0.12em]">%</span>
                </div>
                <div className="text-sm text-slate-500 dark:text-gray-500">Uptime</div>
              </div>
              <div>
                <div className="font-heading text-2xl font-bold text-slate-900 dark:text-white inline-flex items-baseline">
                  <span>3</span>
                  <span className="[vertical-align:-0.12em]">+</span>
                </div>
                <div className="text-sm text-slate-500 dark:text-gray-500">Years</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-teal-600 text-white rounded-xl font-semibold hover:bg-teal-700 dark:bg-white dark:text-black dark:hover:bg-gray-100 transition-all duration-200 shadow-lg shadow-teal-500/25 dark:shadow-none hover:scale-[1.02] active:scale-[0.98]"
              >
                Get in Touch
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="https://drive.google.com/file/d/1DCOrzdqGl458ebbURChfwhR3IadqRCsy/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3.5 border-2 border-slate-300 dark:border-white/10 dark:bg-white/5 dark:hover:border-white/20 rounded-xl font-semibold text-slate-700 dark:text-white hover:border-teal-500 hover:text-teal-600 hover:bg-teal-50/50 dark:hover:bg-white/5 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                View Resume
              </a>
            </div>
          </motion.div>

          <motion.div
            className="relative order-1 lg:order-2 flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative w-full max-w-sm aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl shadow-slate-300/50 ring-4 ring-white dark:shadow-none dark:ring-white/10 dark:border dark:border-white/10 transition-transform duration-300 hover:scale-[1.02]">
              <Image
                src="/Parbhat1.jpg"
                alt="Parbhat Kapila - Full Stack Engineer"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 400px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 dark:from-black/40 via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
