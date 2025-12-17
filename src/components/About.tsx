"use client";

import { motion } from "motion/react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay: 0.1 },
};

const aboutContent = [
  `I work as an AI-focused full-stack engineer building production systems that stay live under real usage. Over the past three years, I’ve taken products to production, supporting real users, processing large volumes of data, and delivering outcomes that teams can actually measure.`,

  `My strength is designing AI-driven software that holds up in practice, systems that combine retrieval pipelines, vector storage, model orchestration, and application logic into something reliable and maintainable. I’ve worked across the stack to ship fast, keep latency low, and maintain accuracy under real workloads, while balancing cost, performance, and operational constraints.`,

  `I approach engineering with a production mindset: release early, observe behavior in the wild, and refine based on usage patterns. From building scalable AI backends to integrating authentication, payments, and deployment pipelines, I take responsibility for how systems behave before and after launch.`,

  `I’m interested in working with startups building serious AI products, where ownership and execution matter more. I ramp quickly, operate independently, and contribute consistently, reflected in steady production commits tied directly to shipped features. I aim to build software teams rely on every day.`,
];

const About = () => {
  return (
    <motion.section className="space-y-4 sm:space-y-6" {...fadeInUp}>
      <h2 className="text-xl sm:text-2xl font-bold text-white">About Me</h2>

      <div className="space-y-3 sm:space-y-4 text-gray-400 leading-relaxed text-sm sm:text-base">
        {aboutContent.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </motion.section>
  );
};

export default About;
