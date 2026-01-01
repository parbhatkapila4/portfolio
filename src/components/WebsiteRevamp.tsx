"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

const reasons = [
  {
    title: "Outdated Design",
    description:
      "Your current design doesn't reflect modern standards and user expectations.",
  },
  {
    title: "Poor User Experience",
    description:
      "Navigation and interactions are confusing, leading to high bounce rates.",
  },
  {
    title: "Low Conversion Rates",
    description:
      "Visitors aren't converting into customers or taking desired actions.",
  },
  {
    title: "Not Mobile-Friendly",
    description:
      "Your site doesn't work well on mobile devices, losing mobile traffic.",
  },
  {
    title: "Slow Load Times",
    description:
      "Poor performance is driving users away before they see your content.",
  },
  {
    title: "Brand Evolution",
    description:
      "Your brand has evolved, but your website hasn't kept up with the changes.",
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay: 0.7 },
};

const WebsiteRevamp = () => {
  return (
    <motion.section className="py-16 md:py-24" {...fadeInUp}>
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-gray-200 mb-4">
        Get The Website You Want Without The Headache
      </h2>
      <h3 className="text-xl md:text-2xl font-semibold text-center text-gray-600 dark:text-gray-400 mb-12">
        Why Does Your Website Need A Revamp?
      </h3>

      <div className="max-w-4xl mx-auto space-y-6 mb-12">
        {reasons.map((reason, index) => (
          <motion.div
            key={index}
            className="flex gap-4"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="font-bold text-gray-800 dark:text-gray-200 min-w-[150px]">
              {reason.title}
            </div>
            <div className="text-gray-600 dark:text-gray-400">
              {reason.description}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <button className="flex items-center gap-2 bg-black text-white dark:bg-white dark:text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-900 dark:hover:bg-gray-100 transition-colors">
          Let&apos;s Get Started
          <ArrowRight className="w-5 h-5" />
        </button>
        <button className="text-gray-800 dark:text-gray-200 font-medium hover:underline">
          How I Work?
        </button>
      </div>
    </motion.section>
  );
};

export default WebsiteRevamp;
