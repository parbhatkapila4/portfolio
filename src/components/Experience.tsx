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
    date: "May 2025",
    description:
      "At Wells Fargo's virtual internship, I built backend data models handling 1M+ records and optimized queries to cut execution time by 20%. I strengthened reliability by applying secure coding practices that reduced vulnerabilities by 25%.",
  },
  {
    company: "JP Morgan",
    position: "Full-Stack Developer",
    date: "Feb 2025 - Apr 2025",
    description:
      "At JPMorgan Chase’s virtual internship, I built RESTful APIs handling 50K+ JSON records daily and boosted backend performance by 15% through smarter queries. Delivered features in agile sprints, simulating real startup speed and execution.",
  },
  {
    company: "Freelance",
    position: "Full-Stack Developer",
    date: "May 2022 - Jan 2025",
    description:
      "Developed scalable full-stack solutions using React.js, Node.js, and AWS for enterprise clients. Resolved performance bottlenecks through query optimization and caching strategies, achieving 40% faster response times. Led agile development cycles under tight deadlines.",
  },
];

const Experience = () => {
  return (
    <motion.div
      className="mt-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 6.8 }}
    >
      <motion.h1
        className="text-xl sm:text-2xl font-bold mb-3"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 7.0 }}
      >
        Experience
      </motion.h1>
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
            <div className="group relative overflow-hidden border border-white/20 rounded-xl p-4 sm:p-6 hover:border-white/30 transition-all duration-300">
              <div className="space-y-3">
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
                        className="text-lg sm:text-xl font-bold"
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
                    className="px-2 sm:px-3 py-1 rounded-full text-xs font-medium border border-white/20 bg-white/5 text-center"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 7.5 + index * 0.2 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {experience.date}
                  </motion.span>
                </div>

                <motion.p
                  className="text-xs sm:text-sm leading-relaxed text-white/70 pl-0 sm:pl-16"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 7.8 + index * 0.2 }}
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
