"use client";

import { motion } from "motion/react";

// Animation configuration
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay: 0.1 },
};

// About content
const aboutContent = [
  `I'm an AI Full-Stack Developer specializing in production-ready AI systems. Three years 
building and deploying applications that process 10,000+ documents, serve real users, and 
generate measurable business value. My expertise spans RAG architectures, vector databases, 
LLM integration, and full-stack SaaS development.`,
  
  `I architect AI systems that work at scale - from semantic search engines with sub-2s 
response times to intelligent document processing with 94%+ accuracy. My approach is 
production - first, ship fast, measure everything, iterate based on real user data. Whether 
it's building RAG pipelines, optimizing vector embeddings, or integrating payment 
infrastructure, I deliver systems that handle real traffic and real users.`,
  
  `Seeking opportunities with US/EU startups that are building AI-powered products. I thrive 
in fast-paced environments where execution matters more than perfect architecture. Ready to 
contribute from day one - my 600+ commits this year show consistent, daily progress toward 
shipped features. Let's build AI products that users actually love.`,
];

const About = () => {
  return (
    <motion.section className="space-y-4 sm:space-y-6" {...fadeInUp}>
      <h2 className="text-xl sm:text-2xl font-bold text-white">About Me</h2>

      <div className="space-y-3 sm:space-y-4 text-gray-400 leading-relaxed text-sm sm:text-base">
        {aboutContent.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </motion.section>
  );
};

export default About;
