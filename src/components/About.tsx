"use client";

import { motion } from "motion/react";

const expertise = [
  {
    title: "System Architecture",
    text: "Designing scalable, production-grade systems from the ground up. Built multi-tenant SaaS architectures with isolated data models, auto-scaling infrastructure for real production workloads, and cost-optimized deployments driven by architectural tradeoffs, reducing infrastructure spend by 95% without sacrificing reliability.",
  },
  {
    title: "AI/ML Production",
    text: "Productionized LLM and RAG systems backed by vector databases at scale. Built retrieval pipelines processing 10,000+ documents with 94%+ accuracy, optimized pgvector queries for sub-200ms latency, and implemented multi-provider LLM orchestration with GPT-4 and resilient fallback strategies.",
  },
  {
    title: "Performance & Optimization",
    text: "Driving measurable business impact through technical optimization. Reduced per-document processing costs from $5.00 to $0.05 through architectural changes and chunk reuse, achieved sub-200ms semantic search latency under load, and maintained 99.9% uptime across live production systems.",
  },
  {
    title: "Full-Stack Ownership",
    text: "Building and operating production systems used by real users daily. Independently responsible for technical decisions, feature delivery, deployments, monitoring, and post-launch reliability across TypeScript, Next.js, Python, PostgreSQL, Redis, AWS, and Vercel. Owning systems from first commit through live operation.",
  },
];

const About = () => {
  return (
    <section id="about" className="py-20 sm:py-28 px-4 sm:px-6 bg-white dark:bg-black">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-sm font-semibold text-teal-600 dark:text-gray-500 uppercase tracking-wider">
            About Parbhat Kapila
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mt-2 mb-4">
            Full-Stack & AI Expertise & Impact
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {expertise.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="p-6 rounded-2xl bg-white dark:bg-transparent border border-slate-200/80 dark:border-white/10 shadow-sm hover:shadow-md dark:hover:bg-white/[0.02] transition-all duration-300 hover:-translate-y-0.5"
            >
              <h3 className="font-heading text-xl font-bold text-slate-900 dark:text-white mb-3">
                {item.title}
              </h3>
              <p className="text-slate-600 dark:text-gray-400 leading-relaxed">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="max-w-3xl p-6 sm:p-8 rounded-2xl bg-teal-50 border border-teal-100 dark:bg-white/5 dark:border-white/10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-slate-700 dark:text-gray-300 leading-relaxed text-lg">
            I&apos;m an AI-focused full-stack engineer building production systems used by real teams. Over the past three years, I&apos;ve shipped and operated live products handling large data volumes and reduced operational costs by 95%.
            <br /><br />
            I specialize in turning complex AI pipelines into reliable software retrieval, vector storage, and model orchestration optimized for low latency (sub-200ms), high accuracy (94%+), and real production constraints.
            <br /><br />
            I&apos;m seeking a full-time role at a startup where execution matters and engineers are trusted to ship systems that deliver measurable business value.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
