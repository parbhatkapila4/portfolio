"use client";

import { motion } from "motion/react";
import { Calendar, Briefcase } from "lucide-react";

const experiences = [
  {
    period: "May 2022 - Present",
    title: "AI Full-Stack Developer | Product Builder",
    company: "Independent Product Development",
    description: [
      "Built, shipped, and operated multiple production AI products used by real teams. Took full responsibility for system design, feature delivery, reliability, and iteration driven by live usage across independently run SaaS applications.",
      "Owned backend services, data stores, AI pipelines, and deployment infrastructure, including authentication, payments, and third-party integrations. Debugged production incidents, performance bottlenecks, and scaling limits while shipping improvements continuously without breaking live systems.",
    ],
    tech: ["Next.js", "TypeScript", "Python", "PostgreSQL", "Redis", "OpenAI", "pgvector", "Docker", "AWS"],
  },
];

const Experience = () => {
  return (
    <section id="experience" className="py-20 sm:py-28 px-4 sm:px-6 bg-white dark:bg-black relative overflow-hidden">
      <div className="absolute inset-0 opacity-0 dark:opacity-[0.02] pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "50px 50px" }} />
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-sm font-semibold text-teal-600 dark:text-gray-500 uppercase tracking-wider">
            Professional Journey
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mt-2">
            Full-Stack & AI Engineer Experience
          </h2>
        </motion.div>

        <div className="space-y-6 dark:space-y-px">
          {experiences.map((exp, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-black border border-slate-200/80 dark:border-white/5 shadow-sm hover:shadow-md dark:hover:bg-white/[0.02] transition-all duration-300"
            >
              <div className="flex flex-col lg:flex-row lg:gap-12 gap-6">
                <div className="flex items-start gap-3 lg:w-48 flex-shrink-0">
                  <Calendar className="w-5 h-5 text-teal-500 dark:text-gray-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-sm font-semibold text-slate-600 dark:text-gray-500 uppercase tracking-wider">
                      {exp.period}
                    </span>
                  </div>
                </div>
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-teal-500 dark:text-gray-500 flex-shrink-0" />
                    <h3 className="font-heading text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                      {exp.title}
                    </h3>
                  </div>
                  <p className="text-slate-600 dark:text-gray-400 font-medium">{exp.company}</p>
                  <div className="space-y-2 text-slate-600 dark:text-gray-300 leading-relaxed">
                    {exp.description.map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {exp.tech.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 text-xs font-medium rounded-full bg-slate-100 text-slate-600 border border-slate-200/80 dark:bg-transparent dark:text-gray-400 dark:border-white/10"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
