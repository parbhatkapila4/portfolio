"use client";

import { motion } from "motion/react";

const About = () => {
  return (
    <>
      <motion.section
        className="mt-14"
        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-8 w-1 bg-gradient-to-b from-cyan-500 to-cyan-500/20 rounded-full" />
            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
              Why I Build
            </h2>
          </div>
          <p
            className="text-sm sm:text-base text-white/75 leading-relaxed pl-7 border-l-2 border-white/5 tracking-wide"
            style={{ lineHeight: '1.75' }}
          >
            {`I'm Parbhat, a full-stack engineer specializing in building high-performance, scalable applications for fast-moving startups. With expertise spanning distributed systems, AI integration, and modern web architectures, I architect end-to-end solutions that handle users while maintaining clean, maintainable codebases. I excel at transforming complex business requirements into production-ready systems, leading technical initiatives, and mentoring teams through challenging engineering problems.`}
          </p>
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
      initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
        <div className="flex items-center gap-3 mb-4">
          <div className="h-8 w-1 bg-gradient-to-b from-cyan-400 to-cyan-400/20 rounded-full" />
          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
            Present
          </h2>
        </div>
        <p
          className="text-sm sm:text-base text-white/75 leading-relaxed pl-7 border-l-2 border-white/5 tracking-wide"
          style={{ lineHeight: '1.75' }}
        >
          {`Currently architecting enterprise-grade AI collaboration platforms that transform meeting data into actionable intelligence at scale. Leading the design and implementation of distributed real-time systems processing thousands of concurrent sessions, with RAG-based semantic search, multi-model AI orchestration, and event-driven microservices architecture. Building resilient infrastructure with automated failover, horizontal scaling, and trying to achieve sub-100ms response times—delivering solutions that reduce operational overhead by 10x while maintaining 99.99% uptime.`}
        </p>
    </motion.section>
  );
};
