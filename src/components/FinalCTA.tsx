"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Mail } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay: 0.8 },
};

const FinalCTA = () => {
  return (
    <motion.section id="contact" className="py-16 md:py-24" {...fadeInUp}>
      <div className="max-w-4xl mx-auto space-y-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-800 dark:text-gray-200">
          Your Vision, My Creation Let&apos;s Bring It To Life
        </h2>

        <p className="text-lg text-center text-gray-700 dark:text-gray-300 leading-relaxed">
          A design revamp can transform your online presence, boost conversions,
          and align your website with your evolving brand. Let&apos;s work
          together to create something that truly represents your business and
          drives results.
        </p>

        <div className="flex items-center justify-end gap-4 mb-8">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-300 dark:border-gray-700">
            <Image
              src="/Parbhat1.jpg"
              alt="Parbhat Kapila"
              width={64}
              height={64}
              className="object-cover"
              unoptimized
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200">
            Looking For Something Unique?
          </h3>
          <h4 className="text-xl md:text-2xl font-semibold text-gray-700 dark:text-gray-300">
            Feel Free To Share Your Idea!
          </h4>
          <p className="text-gray-600 dark:text-gray-400">
            Have a project in mind? I&apos;d love to hear about it. Whether
            it&apos;s a complete redesign or a specific feature, let&apos;s
            discuss how we can bring your vision to life.
          </p>
        </div>

        <a
          href="mailto:parbhat@parbhat.dev"
          className="flex items-center justify-center gap-2 bg-black text-white dark:bg-white dark:text-black px-6 py-4 rounded-lg font-semibold hover:bg-gray-900 dark:hover:bg-gray-100 transition-colors w-full md:w-auto"
        >
          <Mail className="w-5 h-5" />
          Drop me an email at parbhat@parbhat.dev
        </a>
      </div>
    </motion.section>
  );
};

export default FinalCTA;
