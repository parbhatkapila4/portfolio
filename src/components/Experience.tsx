"use client";
import { Briefcase } from "lucide-react";
import { motion } from "motion/react";

const ExperienceData = [
  {
    company: "Freelance",
    position: "Full-Stack Developer",
    date: "May 2022 - Jan 2025",
    description:
      "Architected and delivered enterprise-grade applications serving users across fintech, SaaS, and AI sectors. Led end-to-end system design for distributed architectures handling 1M+ daily requests with sub-200ms latency {In JP Morgan virtual simulation, we have 100K+ daily requests}. Engineered microservices ecosystems with event-driven patterns, implementing CQRS, saga patterns, and API gateway architectures. Built real-time data pipelines with Redis streams and PostgreSQL, optimizing query performance by 85% through strategic indexing and caching strategies. Designed and deployed CI/CD infrastructure on AWS/Vercel achieving zero-downtime deployments, comprehensive observability with DataDog/Sentry, and 99.95% uptime SLA. Mentored colleagues developers and established coding standards, architectural patterns, and best practices across multiple client teams.",
  },
];

const Experience = () => {
  return (
    <motion.div
      className="mt-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 6.8 }}
    >
        <motion.div
          className="flex items-center gap-3 mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 7.0 }}
        >
          <div className="h-8 w-1 bg-gradient-to-b from-cyan-500 to-cyan-500/20 rounded-full" />
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
            Experience
          </h1>
        </motion.div>
        <motion.div className="flex flex-col gap-6">
        {ExperienceData.map((experience, index) => (
          <motion.div
            key={`parbhat-experience-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 7.2 + index * 0.2 }}
            whileHover={{
              scale: 1.02,
              y: -5,
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="group relative overflow-hidden rounded-xl p-4 sm:p-6 transition-all duration-500" style={{
              background: "linear-gradient(rgba(10, 10, 10, 0.8), rgba(10, 10, 10, 0.8)) padding-box, linear-gradient(135deg, rgba(6, 182, 212, 0.3), rgba(34, 211, 238, 0.2)) border-box",
              border: "1px solid transparent",
            }}>
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute -inset-[1px] bg-gradient-to-r from-cyan-500/20 to-cyan-400/20 rounded-xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500" />
              <div className="relative z-10 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <motion.div
                      className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center border border-white/20"
                      whileHover={{
                        scale: 1.1,
                        rotate: 5,
                        transition: { duration: 0.3 },
                      }}
                    >
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Briefcase className="w-5 h-5 sm:w-6 sm:h-6" />
                      </motion.div>
                    </motion.div>
                    <div>
                      <motion.h2
                        className="text-lg sm:text-xl font-bold group-hover:text-cyan-400/90 transition-colors duration-300"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 7.4 + index * 0.2 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        {experience.company}
                      </motion.h2>
                      <motion.h3
                        className="text-sm sm:text-base font-medium text-white/80"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 7.6 + index * 0.2 }}
                      >
                        {experience.position}
                      </motion.h3>
                    </div>
                  </div>
                  <motion.span
                    className="px-2 sm:px-3 py-1 rounded-full text-xs font-semibold border border-cyan-500/20 bg-cyan-500/5 text-center text-cyan-400/80 shadow-elegant"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 7.5 + index * 0.2 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {experience.date}
                  </motion.span>
                </div>

                <motion.p
                  className="text-xs sm:text-sm leading-relaxed text-white/70 group-hover:text-white/85 pl-0 sm:pl-16 transition-colors duration-300 tracking-wide"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 7.8 + index * 0.2 }}
                  style={{ lineHeight: '1.7' }}
                >
                  {experience.description}
                </motion.p>
              </div>
            </div>
          </motion.div>
        ))}
        </motion.div>
    </motion.div>
  );
};

export default Experience;
