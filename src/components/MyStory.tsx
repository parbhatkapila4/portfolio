"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { FileText } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay: 0.5 },
};

const MyStory = () => {
  return (
    <motion.section
      className="py-16 md:py-24"
      initial={fadeInUp.initial}
      animate={fadeInUp.animate}
      transition={fadeInUp.transition}
    >
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-gray-200 mb-12">
        My Story
      </h2>

      <div className="max-w-4xl mx-auto space-y-8">
        <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
          I&apos;m Parbhat, an AI-focused full-stack engineer with 3+ years of
          experience building production systems that stay live under real
          usage. Over the past three years, I&apos;ve taken products to
          production, supporting real users, processing large volumes of data,
          and delivering outcomes that teams can actually measure.
        </p>

        <div className="relative flex items-center justify-center gap-8 my-12">
          <motion.div
            className="relative w-48 h-64 bg-white dark:bg-gray-800 p-2 shadow-2xl rotate-[-5deg] z-10"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="relative w-full h-full">
              <Image
                src="/Parbhat1.jpg"
                alt="Parbhat Kapila"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          </motion.div>
          <motion.div
            className="relative w-48 h-64 bg-white dark:bg-gray-800 p-2 shadow-2xl rotate-[5deg]"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="relative w-full h-full bg-gradient-to-br from-gray-800 to-black"></div>
          </motion.div>
        </div>

        <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
          My strength is designing AI-driven software that holds up in practice,
          systems that combine retrieval pipelines, vector storage, model
          orchestration, and application logic into something reliable and
          maintainable. I&apos;ve worked across the stack to ship fast, keep
          latency low, and maintain accuracy under real workloads, while
          balancing cost, performance, and operational constraints.
        </p>

        <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
          I approach engineering with a production mindset: release early,
          observe behavior in the wild, and refine based on usage patterns. When
          I&apos;m not coding, I enjoy exploring new technologies, contributing
          to open source, and staying updated with the latest AI developments.
        </p>

        <div className="flex justify-center pt-4">
          <a
            href="https://drive.google.com/file/d/1cjRYZ7E0hbS8droSlWTjEyRzyHmRY9hk/view?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-900 transition-colors"
          >
            <FileText className="w-5 h-5" />
            View My Resume
          </a>
        </div>
      </div>
    </motion.section>
  );
};

export default MyStory;
