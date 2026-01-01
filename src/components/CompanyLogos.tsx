"use client";

import { motion } from "motion/react";

const companies = [
  "sbox",
  "Logipad",
  "STUDIO TRAVEL",
  "EYKKON",
  "Chick-fil-A",
  "x kapa99",
];

const CompanyLogos = () => {
  return (
    <section className="w-full bg-white dark:bg-black py-12 md:py-16 border-t border-gray-200 dark:border-gray-800">
      <div className="flex items-center justify-center gap-8 md:gap-12 flex-wrap">
        {companies.map((company, index) => (
          <motion.div
            key={index}
            className="text-gray-400 text-sm md:text-base font-medium"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            {company}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CompanyLogos;
