"use client";

import { motion } from "motion/react";

// Experience data
const experienceData = [
  {
    company: "Independent Development",
    position: "Full-Stack Engineer",
    date: "May 2022 - Present",
    description: "Built and deployed production AI applications using React, Next.js, Node.js, Python, and TypeScript. Specialized in RAG architectures with vector databases (pgvector, Pinecone), LangChain integration, and RESTful APIs. Architected semantic search systems processing 10,000+ documents with sub-2s response times. Implemented full-stack SaaS features including Stripe payment infrastructure, PostgreSQL database design, and CI/CD pipelines. Maintained 99.9% uptime across all deployments, serving real users. 400+ commits this year, shipping to production constantly",
  },
];

// Animation configuration
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay: 0.4 }
};

// Individual experience item animation
const experienceItemAnimation = (index: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay: 0.5 + index * 0.1 }
});

const Experience = () => {
  return (
    <motion.section
      className="space-y-6"
      {...fadeInUp}
    >
      <h2 className="text-2xl font-bold text-white">Experience</h2>
      
      <div className="space-y-6">
        {experienceData.map((experience, index) => (
          <motion.div
            key={`experience-${index}`}
            className="border border-gray-600 rounded-lg p-6 hover:border-gray-500 transition-colors"
            {...experienceItemAnimation(index)}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-white">{experience.company}</h3>
                <p className="text-gray-400">{experience.position}</p>
              </div>
              <span className="px-3 py-1 text-sm text-gray-400 border border-gray-600 rounded-md">
                {experience.date}
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              {experience.description}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Experience;
