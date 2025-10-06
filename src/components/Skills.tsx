"use client";

import React from "react";
import { motion } from "motion/react";

import { FaJs } from "react-icons/fa";
import { FaAws, FaDocker, FaGitAlt, FaNodeJs, FaReact } from "react-icons/fa6";
import {
  SiExpress,
  SiFigma,
  SiFramer,
  SiMongodb,
  SiNextdotjs,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiRedis,
  SiShadcnui,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiStripe,
  SiSupabase,
  SiZod,
} from "react-icons/si";

const skills = [
  { name: "TypeScript", icon: <SiTypescript /> },
  { name: "JavaScript", icon: <FaJs /> },
  { name: "Python", icon: <SiPython /> },
  { name: "React", icon: <FaReact /> },
  { name: "Next.js", icon: <SiNextdotjs /> },
  { name: "Node.js", icon: <FaNodeJs /> },
  { name: "Express", icon: <SiExpress /> },
  { name: "PostgreSQL", icon: <SiPostgresql /> },
  { name: "MongoDB", icon: <SiMongodb /> },
  { name: "Prisma", icon: <SiPrisma /> },
  { name: "Redis", icon: <SiRedis /> },
  { name: "Supabase", icon: <SiSupabase /> },
  { name: "Docker", icon: <FaDocker /> },
  { name: "AWS", icon: <FaAws /> },
  { name: "Vercel", icon: <SiVercel /> },
  { name: "Stripe", icon: <SiStripe /> },
  { name: "Zod", icon: <SiZod /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss /> },
  { name: "shadcn/ui", icon: <SiShadcnui /> },
  { name: "Framer Motion", icon: <SiFramer /> },
  { name: "Git", icon: <FaGitAlt /> },
  { name: "Figma", icon: <SiFigma /> },
];

const Skills = () => {
  return (
    <motion.section
      className="mt-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 2.0, ease: "easeOut" }}
    >
        <motion.div
          className="flex items-center gap-3 mb-5"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 2.2, ease: "easeOut" }}
        >
          <div className="h-8 w-1 bg-gradient-to-b from-cyan-500 to-cyan-500/20 rounded-full" />
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
            Technical Expertise
          </h1>
        </motion.div>
        <motion.div
          className="flex flex-wrap gap-2 sm:gap-2.5"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.4, ease: "easeOut" }}
        >
        {skills.map((skill, index) => (
          <motion.div
            key={`Parbhat-tech-stack-${index}`}
            className="relative flex items-center gap-2 border border-white/10 rounded-lg p-2 sm:p-2.5 cursor-pointer bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm transition-all text-xs sm:text-sm font-medium overflow-hidden group shadow-elegant hover:shadow-elegant-lg"
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.5,
              delay: 2.6 + index * 0.05,
              ease: "easeOut",
            }}
            whileHover={{
              scale: 1.05,
              y: -5,
              borderColor: "rgba(6, 182, 212, 0.5)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <motion.div
              className="relative z-10"
              whileHover={{
                rotate: 360,
                scale: 1.2,
              }}
              transition={{ duration: 0.6 }}
            >
              {skill.icon}
            </motion.div>
            <span className="relative z-10 group-hover:text-cyan-400/90 transition-colors duration-300">
              {skill.name}
            </span>
          </motion.div>
        ))}
        </motion.div>
    </motion.section>
  );
};

export default Skills;
