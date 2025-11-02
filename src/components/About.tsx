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
  `I'm a full-stack engineer who turns complex problems into simple, elegant solutions. 
Three years building production systems that actually ship. My work is always production-focused - everything I build handles real traffic, real users, and generates real value.`,
  
  `My approach is to ship fast, iterate based on data, and never overcomplicate. I thrive 
on taking ownership from concept to deployment. Whether it's AI systems, payment 
infrastructure, or real-time processing, I figure it out and deliver. My commits tell 
the story: consistent, daily progress toward shipped features.`,
  
  `Currently exploring opportunities with teams that move fast and value execution. I want 
to build products that users love, not architecture diagrams that never ship. Ready to 
contribute from day one. I've learned that good code that ships beats perfect code that doesn't.`,
];

const About = () => {
  return (
    <motion.section className="space-y-6" {...fadeInUp}>
      <h2 className="text-2xl font-bold text-white">About Me</h2>

      <div className="space-y-4 text-gray-400 leading-relaxed">
        {aboutContent.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </motion.section>
  );
};

export default About;
