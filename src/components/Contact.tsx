"use client";

import { motion } from "motion/react";
import { Mail, Linkedin, Twitter } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-20 sm:py-28 px-4 sm:px-6 bg-white dark:bg-black">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-sm font-semibold text-teal-600 dark:text-gray-500 uppercase tracking-wider">
            Contact
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mt-2 mb-6">
            Let&apos;s Work Together
          </h2>
          <p className="text-slate-600 dark:text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto">
            Open to full-time remote engineering roles at US startups building production AI systems.
            Best fit for teams that value ownership, speed, and engineers who ship and maintain what they build.
            Comfortable aligning with US time zones and working directly with founders in fast-moving environments.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <a
            href="mailto:parbhat@parbhat.dev"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 bg-teal-600 text-white rounded-xl font-semibold hover:bg-teal-700 dark:bg-white dark:text-black dark:hover:bg-gray-100 transition-all duration-200 shadow-lg shadow-teal-500/25 dark:shadow-none hover:scale-[1.02] active:scale-[0.98]"
          >
            <Mail className="w-5 h-5" />
            Email
          </a>
          <a
            href="https://www.linkedin.com/in/parbhat-kapila/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 border-2 border-slate-300 dark:border-white/10 dark:bg-white/5 dark:hover:border-white/20 rounded-xl font-semibold text-slate-700 dark:text-white hover:border-teal-500 hover:text-teal-600 hover:bg-teal-50/50 dark:hover:bg-white/5 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Linkedin className="w-5 h-5" />
            LinkedIn
          </a>
          <a
            href="https://x.com/Parbhat03"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 border-2 border-slate-300 dark:border-white/10 dark:bg-white/5 dark:hover:border-white/20 rounded-xl font-semibold text-slate-700 dark:text-white hover:border-teal-500 hover:text-teal-600 hover:bg-teal-50/50 dark:hover:bg-white/5 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Twitter className="w-5 h-5" />
            Twitter
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
