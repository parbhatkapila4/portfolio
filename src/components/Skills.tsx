"use client";

import { motion } from "motion/react";

const skillCategories = [
  { title: "Frontend (Product UI)", skills: ["TypeScript", "React", "Next.js (App Router)", "Tailwind CSS"] },
  { title: "Backend & APIs", skills: ["Node.js", "Python", "FastAPI", "Express.js", "REST APIs", "WebSockets"] },
  { title: "AI Systems (Production)", skills: ["OpenAI / GPT-4", "LangChain", "RAG pipelines", "pgvector", "embedding search", "LLM orchestration"] },
  { title: "Data & Infrastructure", skills: ["PostgreSQL", "Redis", "Object Storage (S3)", "queues / async processing"] },
  { title: "Cloud & Deployment", skills: ["AWS (EC2, S3, RDS)", "Docker", "Vercel", "CI/CD (GitHub Actions)"] },
  { title: "Architecture & Practices", skills: ["Multi-tenant SaaS", "distributed systems", "event-driven design", "system design", "performance optimization"] },
];

const Skills = () => {
  return (
    <section id="skills" className="py-20 sm:py-28 px-4 sm:px-6 bg-white dark:bg-black">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-sm font-semibold text-teal-600 dark:text-gray-500 uppercase tracking-wider">
            Tech Stack
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mt-2 mb-4">
            Technologies & Tools
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="p-6 rounded-2xl bg-white dark:bg-transparent border border-slate-200/80 dark:border-white/10 shadow-sm hover:shadow-md hover:border-slate-300/80 dark:hover:bg-white/[0.02] transition-all duration-300 hover:-translate-y-0.5"
            >
              <h3 className="font-heading text-lg font-bold text-slate-900 dark:text-white mb-3">
                {category.title}
              </h3>
              <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed">
                {category.skills.join(", ")}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
