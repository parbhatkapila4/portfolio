"use client";

import { motion } from "motion/react";
import { Mail, Linkedin, Twitter } from "lucide-react";

const Contact = () => {
  return (
    <section
      id="contact"
      className="py-20 sm:py-32 px-4 sm:px-6 bg-black text-white border-t border-white/5"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-12 sm:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-3 sm:mb-4">
            <div className="h-px w-8 sm:w-12 bg-white/20"></div>
            <span className="text-xs text-gray-500 uppercase tracking-widest">
              Contact
            </span>
            <div className="h-px w-8 sm:w-12 bg-white/20"></div>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-4 sm:mb-6">
            Let&apos;s Work Together
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 font-light max-w-2xl mx-auto">
            Seeking full-time engineering roles at startups building AI
            products. Always open to connecting with teams building interesting
            products.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <a
            href="mailto:parbhat@parbhat.dev"
            className="group flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition-all text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            <Mail className="w-4 h-4" />
            Email
          </a>
          <a
            href="https://www.linkedin.com/in/parbhat-kapila/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 border border-white/10 rounded-lg font-medium hover:border-white/20 hover:bg-white/5 transition-all text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-white/20"
          >
            <Linkedin className="w-4 h-4" />
            LinkedIn
          </a>
          <a
            href="https://x.com/Parbhat03"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 border border-white/10 rounded-lg font-medium hover:border-white/20 hover:bg-white/5 transition-all text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-white/20"
          >
            <Twitter className="w-4 h-4" />
            Twitter
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
