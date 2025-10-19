"use client";

import { motion } from "motion/react";

// Animation configuration
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay: 0.1 }
};

// About content
const aboutContent = [
  "I'm Parbhat, a full-stack engineer with 5+ years of experience specializing in building high-performance, scalable applications for fast-moving startups. With expertise spanning distributed systems, AI integration, and modern web architectures, I architect end-to-end solutions that handle thousands of users while maintaining clean, maintainable codebases.",
  
  "I excel at transforming complex business requirements into production-ready systems, leading technical initiatives, and mentoring teams through challenging engineering problems. My current focus is on AI-powered applications, microservices architecture, and building developer tools that improve productivity.",
  
  "Currently architecting enterprise-grade AI collaboration platforms that transform meeting data into actionable intelligence at scale. Leading the design and implementation of distributed real-time systems processing thousands of concurrent sessions, with RAG-based semantic search, multi-model AI orchestration, and event-driven microservices architecture."
];

const About = () => {
  return (
    <motion.section
      className="space-y-6"
      {...fadeInUp}
    >
      <h2 className="text-2xl font-bold text-white">About Me</h2>
      
      <div className="space-y-4 text-gray-400 leading-relaxed">
        {aboutContent.map((paragraph, index) => (
          <p key={index}>
            {paragraph}
          </p>
        ))}
      </div>
    </motion.section>
  );
};

export default About;
