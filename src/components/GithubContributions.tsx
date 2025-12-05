"use client";

import { motion } from "motion/react";
import { GitHubCalendar } from "react-github-calendar";

// Animation configuration
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay: 0.3 },
};

const GithubContributions = () => {
  return (
    <motion.section className="space-y-6" {...fadeInUp}>
      <h2 className="text-2xl font-bold text-white">GitHub Contributions</h2>
      
      <div className="border border-gray-600 rounded-lg p-6 hover:border-gray-500 transition-colors github-calendar-wrapper">
        <div className="w-full overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div style={{ width: 'max-content', margin: '0 auto' }}>
            <GitHubCalendar
              username="parbhatkapila4"
              blockSize={12}
              blockMargin={4}
              fontSize={14}
              theme={{
                light: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
                dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
              }}
              colorScheme="dark"
              hideColorLegend={false}
              hideMonthLabels={false}
              showWeekdayLabels={true}
              weekStart={1}
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default GithubContributions;

