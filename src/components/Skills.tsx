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
} from "react-icons/si";

const skills = [
  { name: "React", icon: <FaReact /> },
  { name: "Next.js", icon: <SiNextdotjs /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss /> },
  { name: "shadcn", icon: <SiShadcnui /> },
  { name: "Motion", icon: <SiFramer /> },
  { name: "Node.js", icon: <FaNodeJs /> },
  { name: "ExpressJS", icon: <SiExpress /> },
  { name: "Prisma", icon: <SiPrisma /> },
  { name: "PostgreSQL", icon: <SiPostgresql /> },
  { name: "MongoDB", icon: <SiMongodb /> },
  { name: "Redis", icon: <SiRedis /> },
  { name: "Docker", icon: <FaDocker /> },
  { name: "AWS", icon: <FaAws /> },
  { name: "Vercel", icon: <SiVercel /> },
  { name: "JavaScript", icon: <FaJs /> },
  { name: "TypeScript", icon: <SiTypescript /> },
  { name: "Python", icon: <SiPython /> },
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
      <motion.h1
        className="text-2xl font-bold mb-3"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 2.2, ease: "easeOut" }}
      >
        Skills
      </motion.h1>
      <motion.div
        className="flex flex-wrap gap-2 mt-2"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 2.4, ease: "easeOut" }}
      >
        {skills.map((skill, index) => (
          <motion.div
            key={`Parbhat-tech-stack-${index}`}
            className="flex items-center gap-2 border border-white/10 rounded-md p-2 cursor-pointer hover:bg-white/10 transition-colors"
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.5,
              delay: 2.6 + index * 0.1,
              ease: "easeOut",
            }}
            whileHover={{
              scale: 1.08,
              y: -3,
              boxShadow: "0 10px 25px rgba(0, 0 , 0, 0.2)",
              borderColor: "#FFD70080",
            }}
          >
            <motion.div
              whileHover={{
                rotate: 360,
                scale: 1.2,
                color: "#FFD70080",
              }}
              transition={{ duration: 0.6 }}
            >
              {skill.icon}
            </motion.div>
            <motion.span
              whileHover={{ color: "#FFD70080" }}
              transition={{ duration: 0.2 }}
            >
              {skill.name}
            </motion.span>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default Skills;
