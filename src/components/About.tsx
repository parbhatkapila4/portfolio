"use client";

import { motion } from "motion/react";

const About = () => {
  return (
    <section
      id="about"
      className="py-40 px-6 sm:px-8 lg:px-12 bg-black text-white"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm text-gray-500 font-mono mb-4">About</p>
            <h2 className="text-6xl sm:text-7xl lg:text-8xl font-mono font-normal leading-none">
              Expertise
              <br />
              <span className="text-gray-400">& Impact</span>
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
              Designing scalable, production-grade systems from the ground up.
              Multi-tenant SaaS architecture with isolated data, auto-scaling
              infrastructure for production workloads, and cost-optimized
              deployments reducing spend by 95%.
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
              Productionizing LLMs, RAG systems, and vector databases at scale.
              RAG pipelines processing 10,000+ documents with 94%+ accuracy,
              vector database optimization for sub-200ms queries, and LLM
              orchestration with GPT-4 and multi-provider fallbacks.
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
              Delivering measurable business impact through technical
              optimization. Reduced processing costs from $5.00 to $0.05 per
              document (95% reduction), sub-200ms query latency for semantic
              search at scale, and 99.9% uptime across production systems.
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
              End-to-end product development from architecture to deployment.
              600+ production commits in 2025, shipping consistently.
              Independent product ownership: design, build, deploy, maintain
              across TypeScript, Next.js, Python, PostgreSQL, Redis, AWS, and
              Vercel.
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
          <p>
            I&apos;m an AI-focused full-stack engineer building production
            systems that stay live under real usage. Over the past three years,
            I&apos;ve taken products from concept to production, supporting real
            users, processing large volumes of data, and delivering measurable
            outcomes, like generating{" "}
            <span className="text-white font-medium">
              $15K+ revenue from a single project
            </span>{" "}
            and reducing operational costs by{" "}
            <span className="text-white font-medium">95%</span>.
          </p>
          <p>
            My strength is designing AI-driven software that holds up in
            practice, systems that combine retrieval pipelines, vector storage,
            model orchestration, and application logic into something reliable
            and maintainable. I&apos;ve worked across the stack to ship fast,
            keep latency low (sub-200ms), and maintain accuracy under real
            workloads (94%+), while balancing cost, performance, and operational
            constraints.
          </p>
          <p className="text-white font-medium text-xl">
            I&apos;m seeking full-time engineering roles at startups building
            serious AI products, where ownership and execution matter. I ramp
            quickly, operate independently, and contribute consistently,
            reflected in 600+ production commits tied directly to shipped
            features. I aim to build software that teams rely on every day,
            that generates measurable business value.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
