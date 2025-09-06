"use client";
import { Briefcase } from "lucide-react";
import { motion } from "motion/react";

const ExperienceData = [
  {
    company: "Citi",
    position: "Full-Stack Developer",
    date: "Jun 2025 - Jul 2025",
    description:
      "At Citi’s virtual internship, I built dashboards processing 100K+ financial records and improved reporting efficiency by 30% with optimized data pipelines. I designed and delivered scalable financial logic models that supported data-driven decision-making at scale.",
  },
  {
    company: "Wells Fargo",
    position: "Full-Stack Developer",
    date: "May 2025 – May 2025",
    description:
      "At Wells Fargo’s virtual internship, I built backend data models handling 1M+ records and optimized queries to cut execution time by 20%. I strengthened reliability by applying secure coding practices that reduced vulnerabilities by 25%.",
  },
  {
    company: "JPMorganChase",
    position: "Full-Stack Developer",
    date: "Feb 2025 – Apr 2025",
    description:
      "At JPMorgan Chase’s virtual internship, I built RESTful APIs handling 50K+ JSON records daily and boosted backend performance by 15% through smarter queries. Delivered features in agile sprints, simulating real startup speed and execution.",
  },
];

const Experience = () => {
  return (
    <motion.div
      className="mt-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h1
        className="text-2xl font-bold mb-3"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        Experience
      </motion.h1>
      <motion.div className="flex flex-col gap-6">
        {ExperienceData.map((experience, index) => (
          <motion.div
            key={`parbhat-experience-${index}`}
            whileHover={{
              scale: 1.02,
              y: -5,
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="group relative overflow-hidden border border-white/20 rounded-xl p-6 hover:border-white/30 transition-all duration-300">
              <div className="relative flex gap-4 items-start">
                <motion.div
                  className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center border border-white/20"
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
                    <Briefcase className="w-6 h-6" />
                  </motion.div>
                </motion.div>
                <div className="flex-1 space-y-2">
                  <motion.div
                    className="flex items-center justify-between"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.h2
                      className="text-xl font-bold"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      {experience.company}
                    </motion.h2>
                    <motion.span
                      className="px-3 py-1 rounded-full text-xs font-medium border border-white/20"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {experience.date}
                    </motion.span>
                  </motion.div>

                  <motion.h3
                    className="text-lg font-semibold"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    {experience.position}
                  </motion.h3>

                  <motion.p
                    className="text-sm leading-relaxed"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    {experience.description}
                  </motion.p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Experience;
