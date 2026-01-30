"use client";

import { motion } from "motion/react";

const About = () => {
  return (
    <section
      id="about"
      className="py-20 sm:py-32 lg:py-40 px-6 sm:px-8 lg:px-12 bg-black text-white"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 sm:mb-20 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs sm:text-sm text-gray-500 font-mono mb-3 sm:mb-4">
              About Parbhat Kapila
            </p>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-mono font-normal leading-none">
              Full-Stack & AI
              <br />
              <span className="text-gray-400">Expertise & Impact</span>
            </h2>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 mb-24">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-mono text-white mb-6">
              System Architecture
            </h3>
            <p className="text-lg text-gray-400 leading-relaxed font-sans">
              Designing scalable, production-grade systems from the ground up. Built multi-tenant SaaS architectures with isolated data models, auto-scaling infrastructure for real production workloads, and cost-optimized deployments driven by architectural tradeoffs, reducing infrastructure spend by 95% without sacrificing reliability.
            </p>
          </motion.div>

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <h3 className="text-2xl font-mono text-white mb-6">
              AI/ML Production
            </h3>
            <p className="text-lg text-gray-400 leading-relaxed font-sans">
              Productionized LLM and RAG systems backed by vector databases at scale. Built retrieval pipelines processing 10,000+ documents with 94%+ accuracy, optimized pgvector queries for sub-200ms latency, and implemented multi-provider LLM orchestration with GPT-4 and resilient fallback strategies.
            </p>
          </motion.div>

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h3 className="text-2xl font-mono text-white mb-6">
              Performance & Optimization
            </h3>
            <p className="text-lg text-gray-400 leading-relaxed font-sans">
              Driving measurable business impact through technical optimization. Reduced per-document processing costs from $5.00 to $0.05 through architectural changes and chunk reuse, achieved sub-200ms semantic search latency under load, and maintained 99.9% uptime across live production systems.
            </p>
          </motion.div>

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h3 className="text-2xl font-mono text-white mb-6">
              Full-Stack Ownership
            </h3>
            <p className="text-lg text-gray-400 leading-relaxed font-sans">
              Building and operating production systems used by real users daily. Independently responsible for technical decisions, feature delivery, deployments, monitoring, and post-launch reliability across TypeScript, Next.js, Python, PostgreSQL, Redis, AWS, and Vercel. Owning systems from first commit through live operation.
            </p>
          </motion.div>
        </div>

        <motion.div
          className="max-w-4xl space-y-8 text-lg text-gray-300 leading-relaxed font-sans"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-white font-medium text-xl">
            I&apos;m an AI-focused full-stack engineer building production systems used by real teams. Over the past three years, I’ve shipped and operated live products handling large data volumes and reduced operational costs by 95%.
            <br />
            I specialize in turning complex AI pipelines into reliable software retrieval, vector storage, and model orchestration optimized for low latency (sub-200ms), high accuracy (94%+), and real production constraints.
            <br />
            I’m seeking a full-time role at a startup where execution matters and engineers are trusted to ship systems that deliver measurable business value.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
