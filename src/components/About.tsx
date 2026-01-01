"use client";

import { motion } from "motion/react";
import {
  Code2,
  Database,
  TrendingUp,
  Zap,
  DollarSign,
  Users,
  Shield,
  GitBranch,
  Target,
} from "lucide-react";

const About = () => {
  const achievements = [
    {
      icon: DollarSign,
      value: "$15K+",
      label: "Revenue Generated",
      description: "From production AI products",
    },
    {
      icon: TrendingUp,
      value: "95%",
      label: "Cost Reduction",
      description: "$5.00 → $0.10 per document",
    },
    {
      icon: Database,
      value: "10K+",
      label: "Documents Processed",
      description: "Enterprise AI systems",
    },
    {
      icon: Shield,
      value: "99.9%",
      label: "Uptime SLA",
      description: "Across all deployed systems",
    },
    {
      icon: Target,
      value: "94%+",
      label: "AI Accuracy",
      description: "Classification in production",
    },
    {
      icon: GitBranch,
      value: "600+",
      label: "Commits (2025)",
      description: "Consistent production shipping",
    },
  ];

  const expertise = [
    {
      icon: Code2,
      title: "System Architecture",
      description:
        "Designing and implementing scalable, production-grade systems from the ground up.",
      highlights: [
        "Multi-tenant SaaS architecture with isolated data",
        "Auto-scaling infrastructure for production workloads",
        "Cost-optimized deployments reducing infrastructure spend by 95%",
        "Distributed systems with Redis caching and pgvector",
      ],
    },
    {
      icon: Database,
      title: "AI/ML Production",
      description:
        "Productionizing LLMs, RAG systems, and vector databases at scale with measurable accuracy.",
      highlights: [
        "RAG pipelines processing 10,000+ documents with 94%+ accuracy",
        "Vector database optimization (pgvector) for sub-200ms queries",
        "LLM orchestration with GPT-4, OpenAI, multi-provider fallbacks",
        "Semantic search across live email streams and codebases",
      ],
    },
    {
      icon: TrendingUp,
      title: "Performance & Optimization",
      description:
        "Delivering measurable business impact through technical optimization and cost efficiency.",
      highlights: [
        "Reduced processing costs from $5.00 to $0.10 per document (95% reduction)",
        "Sub-200ms query latency for semantic search at scale",
        "99.9% uptime across production systems serving real users",
        "Scaled from prototype to production with real users",
      ],
    },
    {
      icon: Zap,
      title: "Full-Stack Ownership",
      description:
        "End-to-end product development from architecture to deployment, monitoring, and iteration.",
      highlights: [
        "600+ production commits in 2025, shipping consistently",
        "TypeScript, Next.js, Python, PostgreSQL, Redis, AWS, Vercel",
        "Stripe/PayPal integrations, OAuth, real-time sync systems",
        "Independent product ownership: design, build, deploy, maintain",
      ],
    },
  ];

  return (
    <section
      id="about"
      className="py-20 sm:py-32 px-4 sm:px-6 bg-black text-white relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="mb-12 sm:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
            <div className="h-px w-8 sm:w-12 bg-white/20"></div>
            <span className="text-xs text-gray-500 uppercase tracking-widest">
              About
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight">
            Expertise & Impact
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px mb-16 sm:mb-32">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <motion.div
                key={index}
                className="bg-black border-t border-l border-white/5 p-4 sm:p-6 hover:bg-white/[0.02] transition-all duration-500"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  delay: index * 0.05,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mb-3 sm:mb-4" />
                <div className="text-xl sm:text-2xl font-light text-white mb-1">
                  {achievement.value}
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-wider font-light mb-1">
                  {achievement.label}
                </div>
                <div className="text-[10px] sm:text-xs text-gray-600 font-light leading-relaxed">
                  {achievement.description}
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px mb-16 sm:mb-32">
          {expertise.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                className="group bg-black border-t border-l border-white/5 p-6 sm:p-8 md:p-12 lg:p-16 hover:bg-white/[0.02] transition-all duration-700"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  delay: index * 0.08,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 mb-6 sm:mb-8 flex items-center justify-center border border-white/10 rounded-lg group-hover:border-white/20 transition-all duration-500">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 group-hover:text-gray-300 transition-colors" />
                </div>

                <h3 className="text-2xl sm:text-3xl font-light mb-3 sm:mb-4 tracking-tight">
                  {item.title}
                </h3>

                <p className="text-gray-400 leading-relaxed font-light text-base sm:text-lg mb-6 sm:mb-8">
                  {item.description}
                </p>

                <ul className="space-y-3">
                  {item.highlights.map((highlight, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-gray-500 font-light leading-relaxed"
                    >
                      <div className="h-px w-4 bg-white/10 mt-2 flex-shrink-0"></div>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="max-w-4xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div className="h-px w-8 sm:w-12 bg-white/20"></div>
            <span className="text-xs text-gray-500 uppercase tracking-widest">
              Background
            </span>
          </div>

          <div className="space-y-6 sm:space-y-8 text-base sm:text-lg leading-relaxed text-gray-300 font-light">
            <p>
              I work as an AI-focused full-stack engineer building production
              systems that stay live under real usage. Over the past three
              years, I&apos;ve taken products to production, supporting real
              users, processing large volumes of data, and delivering outcomes
              that teams can actually measure.
            </p>
            <p>
              My strength is designing AI-driven software that holds up in
              practice, systems that combine retrieval pipelines, vector
              storage, model orchestration, and application logic into something
              reliable and maintainable. I&apos;ve worked across the stack to
              ship fast, keep latency low, and maintain accuracy under real
              workloads, while balancing cost, performance, and operational
              constraints.
            </p>
            <p>
              I approach engineering with a production mindset: release early,
              observe behavior in the wild, and refine based on usage patterns.
              From building scalable AI backends to integrating authentication,
              payments, and deployment pipelines, I take responsibility for how
              systems behave before and after launch.
            </p>
            <p className="text-white font-normal">
              I&apos;m seeking full-time engineering roles at startups building
              serious AI products, where ownership and execution matter more. I
              ramp quickly, operate independently, and contribute consistently,
              reflected in steady production commits tied directly to shipped
              features. I aim to build software teams rely on every day.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
