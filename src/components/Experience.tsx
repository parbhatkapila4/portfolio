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
    <section
      id="experience"
      className="py-20 sm:py-32 px-4 sm:px-6 bg-black text-white relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="mb-12 sm:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
            <div className="h-px w-8 sm:w-12 bg-white/20"></div>
            <span className="text-xs text-gray-500 uppercase tracking-widest">
              Experience
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight">
            Professional Journey
          </h2>
        </motion.div>

        <div className="space-y-px">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className="group relative border-t border-white/5 bg-black hover:bg-white/[0.02] transition-all duration-700"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                delay: index * 0.1,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="p-6 sm:p-8 md:p-12 lg:p-16">
                <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 lg:gap-12">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-gray-500 flex-shrink-0 mt-1" />
                    <div>
                      <div className="text-sm text-gray-500 uppercase tracking-wider font-light mb-2">
                        {exp.period}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <Briefcase className="w-4 h-4 text-gray-500" />
                        <h3 className="text-2xl sm:text-3xl font-light tracking-tight">
                          {exp.title}
                        </h3>
                      </div>
                      <p className="text-gray-400 text-lg font-light mb-6">
                        {exp.company}
                      </p>
                      <p className="text-gray-300 leading-relaxed font-light text-base sm:text-lg">
                        {exp.description.map((line, i) => (
                          <span key={i}>
                            {line}
                            {i < exp.description.length - 1 && <br />}
                          </span>
                        ))}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-4">
                      {exp.tech.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1.5 text-xs border border-white/10 rounded-full text-gray-400 font-light hover:border-white/20 hover:text-gray-300 transition-all"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
