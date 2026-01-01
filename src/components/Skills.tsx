"use client";

import { motion } from "motion/react";
import {
  Code2,
  Database,
  Cloud,
  Cpu,
  GitBranch,
  Zap,
  Shield,
  Layers,
  Workflow,
  Boxes,
} from "lucide-react";

const skillCategories = [
  {
    icon: Code2,
    title: "Frontend",
    skills: ["TypeScript", "Next.js", "React", "Tailwind CSS", "Framer Motion"],
    color: "text-blue-400",
  },
  {
    icon: Database,
    title: "Backend & Databases",
    skills: [
      "Node.js",
      "Python",
      "PostgreSQL",
      "Redis",
      "pgvector",
      "REST API",
    ],
    color: "text-green-400",
  },
  {
    icon: Cpu,
    title: "AI/ML",
    skills: [
      "OpenAI",
      "LangChain",
      "RAG",
      "pgvector",
      "GPT-4",
      "LLM Orchestration",
    ],
    color: "text-purple-400",
  },
  {
    icon: Cloud,
    title: "Infrastructure",
    skills: [
      "Docker",
      "AWS",
      "Vercel",
      "CI/CD",
      "Auto-scaling",
      "Microservices",
    ],
    color: "text-orange-400",
  },
  {
    icon: Workflow,
    title: "Architecture",
    skills: [
      "Multi-tenant SaaS",
      "Distributed Systems",
      "API Design",
      "System Design",
    ],
    color: "text-pink-400",
  },
  {
    icon: Zap,
    title: "Tools & Practices",
    skills: [
      "Git",
      "Stripe",
      "OAuth",
      "Monitoring",
      "Performance Optimization",
    ],
    color: "text-yellow-400",
  },
];

const Skills = () => {
  return (
    <section
      id="skills"
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
              Technologies
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight">
            Tech Stack
          </h2>
          <p className="text-gray-400 font-light mt-4 max-w-2xl text-base sm:text-lg">
            Production-proven technologies I use to build scalable, reliable
            systems.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={index}
                className="group bg-black border-t border-l border-white/5 p-6 sm:p-8 hover:bg-white/[0.02] transition-all duration-700"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  delay: index * 0.08,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 mb-6 flex items-center justify-center border border-white/10 rounded-lg group-hover:border-white/20 transition-all duration-500">
                  <Icon
                    className={`w-5 h-5 sm:w-6 sm:h-6 ${category.color} group-hover:scale-110 transition-transform`}
                  />
                </div>

                <h3 className="text-xl sm:text-2xl font-light mb-4 tracking-tight">
                  {category.title}
                </h3>

                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 text-xs border border-white/10 rounded-full text-gray-400 font-light hover:border-white/20 hover:text-gray-300 transition-all"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
