"use client";

import React from "react";
import { motion } from "motion/react";

// Icon imports
import { FaAws, FaDocker, FaGitAlt, FaNodeJs, FaReact } from "react-icons/fa6";
import {
  SiLangchain,
  SiNextdotjs,
  SiOpenai,
  SiPostgresql,
  SiPython,
  SiRedis,
  SiTypescript,
  SiVercel,
  SiStripe,
} from "react-icons/si";
import { TbApi, TbVectorTriangle, TbBrain, TbRefresh } from "react-icons/tb";

// Skills data organized by rows
const skillRows = [
  {
    label: "Core",
    skills: [
      { name: "TypeScript", icon: <SiTypescript /> },
      { name: "Next.js", icon: <SiNextdotjs /> },
      { name: "React", icon: <FaReact /> },
      { name: "Node.js", icon: <FaNodeJs /> },
      { name: "Python", icon: <SiPython /> },
      { name: "PostgreSQL", icon: <SiPostgresql /> },
    ]
  },
  {
    label: "AI/Money",
    skills: [
      { name: "OpenAI", icon: <SiOpenai /> },
      { name: "LangChain", icon: <SiLangchain /> },
      { name: "RAG", icon: <TbBrain /> },
      { name: "pgvector", icon: <TbVectorTriangle /> },
      { name: "Stripe", icon: <SiStripe /> },
      { name: "Redis", icon: <SiRedis /> },
    ]
  },
  {
    label: "DevOps",
    skills: [
      { name: "Docker", icon: <FaDocker /> },
      { name: "AWS", icon: <FaAws /> },
      { name: "Vercel", icon: <SiVercel /> },
      { name: "Git", icon: <FaGitAlt /> },
      { name: "CI/CD", icon: <TbRefresh /> },
      { name: "REST API", icon: <TbApi /> },
    ]
  }
];

// Animation configuration
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay: 0.2 }
};

// Individual skill item animation
const skillItemAnimation = (index: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay: 0.3 + index * 0.05 }
});

const Skills = () => {
  return (
    <motion.section
      className="space-y-4 sm:space-y-6"
      {...fadeInUp}
    >
      <h2 className="text-xl sm:text-2xl font-bold text-white">Skills & Tools</h2>
      
      <div className="space-y-3 sm:space-y-4">
        {skillRows.map((row, rowIndex) => (
          <div key={`row-${rowIndex}`}>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {row.skills.map((skill, index) => (
                <motion.div
                  key={`skill-${rowIndex}-${index}`}
                  className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 border border-gray-600 rounded-lg text-gray-400 hover:text-white hover:border-gray-500 transition-colors"
                  {...skillItemAnimation(rowIndex * 6 + index)}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-base sm:text-lg">
                    {skill.icon}
                  </div>
                  <span className="text-xs sm:text-sm font-medium">
                    {skill.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
};

export default Skills;
