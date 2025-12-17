"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { GitHubCalendar } from "react-github-calendar";
import { Github, ExternalLink } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay: 0.3 },
};

const GithubContributions = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshKey((prev) => prev + 1);
    }, 3 * 60 * 1000);

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        setRefreshKey((prev) => prev + 1);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <motion.section className="space-y-4 sm:space-y-6" {...fadeInUp}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
        <h2 className="text-xl sm:text-2xl font-bold text-white">
          GitHub Contributions
        </h2>
        <motion.a
          href="https://github.com/parbhatkapila4"
          target="_blank"
          rel="noopener noreferrer"
          className="group px-4 sm:px-6 py-2 sm:py-3 border border-gray-600 rounded-lg text-gray-400 hover:text-white hover:border-gray-500 transition-all duration-300 flex items-center gap-2 bg-gray-900/50 hover:bg-gray-800/50 backdrop-blur-sm text-sm sm:text-base w-full sm:w-auto justify-center sm:justify-start"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="View GitHub Profile"
        >
          <Github className="w-4 h-4 sm:w-5 sm:h-5 group-hover:text-white transition-colors" />
          <span className="font-medium">View Profile</span>
          <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.a>
      </div>

      <div className="border border-gray-600 rounded-lg px-2 py-4 hover:border-gray-500 transition-colors github-calendar-wrapper overflow-hidden">
        <div className="w-full flex justify-center">
          <div className="w-full max-w-full overflow-hidden">
            <GitHubCalendar
              key={refreshKey}
              username="parbhatkapila4"
              blockSize={10.5}
              blockMargin={3.5}
              fontSize={12.5}
              theme={{
                light: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
                dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
              }}
              colorScheme="dark"
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
