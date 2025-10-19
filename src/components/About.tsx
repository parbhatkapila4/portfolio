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
  "Hey! I'm Parbhat, a full-stack engineer who's been building AI-powered apps for the past 3+ years. I love working with React, Next.js, TypeScript, Python, and Node.js - mostly remote gigs. My thing is RAG architectures, vector databases (pgvector), LangChain, and building SaaS platforms that actually work well.",
  "I take messy requirements and turn them into clean, deployed systems. Been working with REST APIs, PostgreSQL, Redis, and modern CI/CD stuff. I've built real-time apps, payment systems with Stripe, and semantic search features. Right now, I'm looking for full-time remote work focused on AI development and building tools that make developer's lives easier.",
  "I've been architecting AI platforms that handle tons of concurrent users, working with vector embeddings, OpenAI integration, and event-driven systems. Built intelligent document processing, automated workflows, and real-time collaboration features - all deployed on Vercel and AWS."
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
