"use client";

import { motion } from "motion/react";

const skillCategories = [
  {
    title: "Frontend (Product UI)",
    skills: [
      "TypeScript",
      "React",
      "Next.js (App Router)",
      "Tailwind CSS",
    ],
  },
  {
    title: "Backend & APIs",
    skills: [
      "Node.js",
      "Python",
      "FastAPI",
      "Express.js",
      "REST APIs",
      "WebSockets",
    ],
  },
  {
    title: "AI Systems (Production)",
    skills: [
      "OpenAI / GPT-4",
      "LangChain",
      "RAG pipelines",
      "pgvector",
      "embedding search",
      "LLM orchestration",
    ],
  },
  {
    title: "Data & Infrastructure",
    skills: [
      "PostgreSQL",
      "Redis",
      "Object Storage (S3)",
      "queues / async processing",
    ],
  },
  {
    title: "Cloud & Deployment",
    skills: [
      "AWS (EC2, S3, RDS)",
      "Docker",
      "Vercel",
      "CI/CD (GitHub Actions)",
    ],
  },
  {
    title: "Architecture & Practices",
    skills: [
      "Multi-tenant SaaS",
      "distributed systems",
      "event-driven design",
      "system design",
      "performance optimization",
    ],
  },
];

const Skills = () => {
  return (
    <section
      id="skills"
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
              Tech Stack
            </p>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-mono font-normal leading-none">
              Technologies
              <br />
              <span className="text-gray-400">& Tools</span>
            </h2>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              className="space-y-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
            >
              <h3 className="text-xl font-medium text-white font-sans">
                {category.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-400">
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
