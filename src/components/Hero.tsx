"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ArrowRight, TrendingUp } from "lucide-react";

const Hero = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center py-20 px-4 sm:px-6 pt-24 sm:pt-20 bg-black text-white relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-20 items-center">
          <motion.div
            className="space-y-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="space-y-6 sm:space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                <span className="text-xs font-medium text-gray-400 tracking-wider uppercase">
                  Available for Full-Time Roles
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light leading-[1.1] tracking-tight">
                Building
                <br />
                <span className="font-medium">Production AI</span>
                <br />
                <span className="font-light text-gray-500">Systems</span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-gray-400 leading-relaxed max-w-2xl font-light">
                Full-stack engineer specializing in production AI systems.
                Architecting scalable infrastructure, optimizing for performance
                and cost, and delivering systems that serve real users at scale.
              </p>
            </div>

            <div className="flex items-center gap-6 sm:gap-12 pt-6 sm:pt-8 border-t border-white/5">
              <div>
                <div className="text-xl sm:text-2xl font-light text-white mb-1">
                  10K+
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">
                  Documents
                </div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-light text-white mb-1">
                  99.9%
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">
                  Uptime
                </div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-light text-white mb-1">
                  3+
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">
                  Years
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-4">
              <a
                href="#contact"
                className="group flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition-all text-sm tracking-wide focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                Get in Touch
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a
                href="https://drive.google.com/file/d/1cjRYZ7E0hbS8droSlWTjEyRzyHmRY9hk/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 border border-white/10 rounded-lg font-medium hover:border-white/20 hover:bg-white/5 transition-all text-sm tracking-wide text-center focus:outline-none focus:ring-2 focus:ring-white/20"
              >
                View Resume
              </a>
            </div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative aspect-[4/5] max-w-xs sm:max-w-md mx-auto mt-8 lg:mt-0">
              <div className="absolute inset-0 border border-white/10 rounded-2xl"></div>
              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                <Image
                  src="/Parbhat1.jpg"
                  alt="Parbhat Kapila"
                  fill
                  className="object-cover"
                  priority
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
