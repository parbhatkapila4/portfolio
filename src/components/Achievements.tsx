"use client";

import { motion } from "motion/react";

const achievements = [
  {
    metric: "10,000+",
    label: "Documents Processed",
    description: "Enterprise AI systems handling real production workloads",
  },
  {
    metric: "99.9%",
    label: "Uptime",
    description: "Production reliability across all deployed systems",
  },
  {
    metric: "94%+",
    label: "Accuracy",
    description: "AI model performance in production environments",
  },
  {
    metric: "600+",
    label: "Commits (2025)",
    description: "Consistent daily shipping and iteration",
  },
  {
    metric: "$5.00 ~ $0.10",
    label: "Cost Savings",
    description:
      "Reduced per-document processing cost by 95% (from ~$5.00 to ~$0.10) - saving clients thousands in manual workload.",
  },
  {
    metric: "$15K+",
    label: "Revenue Generated",
    description: "Total revenue from production AI products and services",
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay: 0.25 },
};

const achievementItemAnimation = (index: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay: 0.3 + index * 0.1 },
});

const Achievements = () => {
  return (
    <motion.section className="space-y-4 sm:space-y-6" {...fadeInUp}>
      <h2 className="text-xl sm:text-2xl font-bold text-white">
        Key Achievements
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {achievements.map((achievement, index) => (
          <motion.div
            key={`achievement-${index}`}
            className="border border-gray-600 rounded-lg p-3 sm:p-4 hover:border-gray-500 transition-colors"
            {...achievementItemAnimation(index)}
          >
            <div className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2 text-center sm:text-left">
              {achievement.metric}
            </div>
            <div className="text-xs sm:text-sm font-medium text-gray-400 mb-1 text-center sm:text-left">
              {achievement.label}
            </div>
            <div className="text-[10px] sm:text-xs text-gray-500 text-center sm:text-left">
              {achievement.description}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Achievements;
