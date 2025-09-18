"use client";

import { motion } from "motion/react";

const About = () => {
  return (
    <>
      <motion.section
        className="mt-14"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
      >
        <motion.h2
          className="text-2xl font-bold mb-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 1.0, ease: "easeOut" }}
        >
          Why I Build
        </motion.h2>
        <motion.p
          className="text-[16px] text-white/80 mt-1.5"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2, ease: "easeOut" }}
        >
          {`I'm Parbhat, a startup engineer and full-stack developer who turns ideas into fast, dependable app. I thrive at the intersection of web, backend, and AI building tools that help founders go from concept to launch in weeks, not months. Outside of commits, I push myself with side projects and new tech, keeping my approach adaptive and my execution sharp.`}
        </motion.p>
      </motion.section>
      <Present />
    </>
  );
};

export default About;

const Present = () => {
  return (
    <motion.section
      className="mt-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.4, ease: "easeOut" }}
    >
      <motion.h2
        className="text-2xl font-bold mb-3"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 1.6, ease: "easeOut" }}
      >
        Present{""}
      </motion.h2>
      <motion.p
        className="text-[16px] mt-1.5 text-white/80"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.8, ease: "easeOut" }}
      >
        {`
        Right now, I’m building AI-powered collaboration systems that turn meetings into living knowledge. Real-time agents, searchable transcripts, and post-call intelligence are wired into full-stack workflows with auth, payments, and background jobs. My focus is simple: ship fast, own the stack, and deliver systems that cut hours of work into seconds and scale reliably as teams grow.`}
      </motion.p>
    </motion.section>
  );
};
