"use client";

import { motion } from "motion/react";

const Results = () => {
  const results = [
    {
      title: "Revenue Generation",
      value: "$15K+",
      description: "Built and deployed Visura, an enterprise AI platform that generated over $15,000 in revenue through direct client adoption.",
    },
    {
      title: "Cost Optimization",
      value: "95%",
      description: "Optimized AI processing pipeline from $5.00 to $0.05 per document, saving clients thousands while maintaining 94%+ accuracy.",
    },
    {
      title: "Performance",
      value: "<200ms",
      description: "Achieved sub-200ms semantic search across 1000+ indexed emails using optimized RAG pipelines and pgvector indexing.",
    },
    {
      title: "Accuracy",
      value: "94%+",
      description: "Maintained 94%+ accuracy in production RAG systems processing 10,000+ documents with real-world data variations.",
    },
    {
      title: "Scale",
      value: "10K+",
      description: "Built systems that reliably process 10,000+ documents in production environments with consistent performance.",
    },
    {
      title: "Efficiency",
      value: "75%",
      description: "Reduced engineering team onboarding time by 75% through automated documentation systems processing 200+ repositories.",
    },
  ];

  return (
    <section className="py-40 px-6 sm:px-8 lg:px-12 bg-[#0a0a0a] text-white border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm text-gray-500 font-mono mb-4">Measurable Outcomes</p>
            <h2 className="text-6xl sm:text-7xl lg:text-8xl font-mono font-normal leading-none">
              Real
              <br />
              <span className="text-gray-400">Results</span>
            </h2>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {results.map((result, index) => (
            <motion.div
              key={index}
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
            >
              <div className="text-5xl font-mono text-white leading-none">{result.value}</div>
              <h3 className="text-xl font-medium text-white font-sans">{result.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed font-sans">{result.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Results;
