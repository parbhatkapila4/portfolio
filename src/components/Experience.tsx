"use client";

import { motion } from "motion/react";

const experienceData = [
  {
    company: "AI Full-Stack Developer | Product Builder",
    role: "Independent Product Development",
    date: "May 2022 - Present",
    description:
      "Led development and ongoing operation of multiple production AI products used by active users. Scope of work included system design, feature delivery, reliability, and iteration based on live usage across independently run SaaS applications.Handled day-to-day engineering across backend services, data stores, AI pipelines, and deployment infrastructure. Regularly addressed performance issues, production bugs, scaling constraints, and integration requirements involving authentication, payments, and third-party APIs.Worked in fast iteration cycles, releasing improvements continuously while keeping systems stable in production. Sustained long-term delivery pace with 600+ commits in 2025, focused on maintaining and improving systems that remain active and in use.",
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay: 0.4 },
};

const experienceItemAnimation = (index: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay: 0.5 + index * 0.1 },
});

const Experience = () => {
  return (
    <motion.section className="space-y-4 sm:space-y-6" {...fadeInUp}>
      <h2 className="text-xl sm:text-2xl font-bold text-white">Experience</h2>

      <div className="space-y-4 sm:space-y-6">
        {experienceData.map((experience, index) => (
          <motion.div
            key={`experience-${index}`}
            className="border border-gray-600 rounded-lg p-4 sm:p-6 hover:border-gray-500 transition-colors"
            {...experienceItemAnimation(index)}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-start justify-between mb-3 sm:mb-4 gap-2 sm:gap-0">
              <div className="flex-1">
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  {experience.company}
                </h3>
                {experience.role && (
                  <p className="text-gray-500 text-xs sm:text-sm mt-1">
                    {experience.role}
                  </p>
                )}
              </div>
              <span className="px-2.5 sm:px-3 py-1 text-xs sm:text-sm text-gray-400 border border-gray-600 rounded-md whitespace-nowrap">
                {experience.date}
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
              {experience.description}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Experience;
