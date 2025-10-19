"use client";

import React from "react";
import { motion } from "motion/react";

// Icon imports
import { FaJs } from "react-icons/fa";
import { FaAws, FaDocker, FaGitAlt, FaNodeJs, FaReact } from "react-icons/fa6";
import {
  SiExpress,
  SiLangchain,
  SiMongodb,
  SiNextdotjs,
  SiOpenai,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiRedis,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiStripe,
  SiSupabase,
} from "react-icons/si";
import { TbApi, TbVectorTriangle } from "react-icons/tb";

// Skills data
const skills = [
  // Tier 1: Core Frontend/Backend
  { name: "TypeScript", icon: <SiTypescript /> },
  { name: "JavaScript", icon: <FaJs /> },
  { name: "Python", icon: <SiPython /> },
  { name: "React", icon: <FaReact /> },
  { name: "Next.js", icon: <SiNextdotjs /> },
  { name: "Node.js", icon: <FaNodeJs /> },
  
  // Tier 2: AI keywords (hottest right now)
  { name: "OpenAI", icon: <SiOpenai /> },
  { name: "LangChain", icon: <SiLangchain /> },
  { name: "pgvector", icon: <TbVectorTriangle /> },
  
  // Tier 3: Backend/Database (fundamental skills)
  { name: "PostgreSQL", icon: <SiPostgresql /> },
  { name: "MongoDB", icon: <SiMongodb /> },
  { name: "Express", icon: <SiExpress /> },
  { name: "REST API", icon: <TbApi /> },
  { name: "Prisma", icon: <SiPrisma /> },
  { name: "Redis", icon: <SiRedis /> },
  
  // Tier 4: Cloud/DevOps
  { name: "AWS", icon: <FaAws /> },
  { name: "Docker", icon: <FaDocker /> },
  { name: "Vercel", icon: <SiVercel /> },
  
  // Tier 5: Tools/Libraries
  { name: "Supabase", icon: <SiSupabase /> },
  { name: "Stripe", icon: <SiStripe /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss /> },
  { name: "Git", icon: <FaGitAlt /> },
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
      className="space-y-6"
      {...fadeInUp}
    >
      <h2 className="text-2xl font-bold text-white">Skills & Tools</h2>
      
      <div className="flex flex-wrap gap-3">
        {skills.map((skill, index) => (
          <motion.div
            key={`skill-${index}`}
            className="flex items-center gap-2 px-3 py-2 border border-gray-600 rounded-lg text-gray-400 hover:text-white hover:border-gray-500 transition-colors"
            {...skillItemAnimation(index)}
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-lg">
              {skill.icon}
            </div>
            <span className="text-sm font-medium">
              {skill.name}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Skills;
