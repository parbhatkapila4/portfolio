"use client";

import { motion } from "motion/react";

const skillCategories = [
  {
    title: "Frontend",
    skills: ["TypeScript", "Next.js", "React", "Tailwind CSS", "Framer Motion"],
  },
  {
    title: "Backend & Databases",
    skills: [
      "Node.js",
      "Python",
      "PostgreSQL",
      "Redis",
      "pgvector",
      "REST API",
    ],
  },
  {
    title: "AI/ML",
    skills: [
      "OpenAI",
      "LangChain",
      "RAG",
      "pgvector",
      "GPT-4",
      "LLM Orchestration",
    ],
  },
  {
    title: "Infrastructure",
    skills: [
      "Docker",
      "AWS",
      "Vercel",
      "CI/CD",
      "Auto-scaling",
      "Microservices",
    ],
  },
  {
    title: "Architecture",
    skills: [
      "Multi-tenant SaaS",
      "Distributed Systems",
      "API Design",
      "System Design",
    ],
  },
  {
    title: "Tools & Practices",
    skills: [
      "Git",
      "Stripe",
      "OAuth",
      "Monitoring",
      "Performance Optimization",
    ],
  },
];

const Skills = () => {
  return (
    <section
      id="skills"
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
            <p className="text-sm text-gray-500 font-mono mb-4">Tech Stack</p>
            <h2 className="text-6xl sm:text-7xl lg:text-8xl font-mono font-normal leading-none">
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
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
            >
              <h3 className="text-xl font-medium text-white font-sans">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 text-sm border border-white/10 rounded-full text-gray-400 font-mono hover:border-white/30 hover:text-white transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
