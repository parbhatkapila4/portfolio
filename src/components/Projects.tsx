"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, Github, Play, X } from "lucide-react";
const ProjectDesArray = [
  {
    name: "Vector Mail",
    description: "Enterprise email intelligence platform leveraging advanced RAG architecture and multi-model AI orchestration (GPT-4, Claude, Gemini) to deliver context-aware email automation. Engineered distributed vector embedding pipeline with Redis clustering, processing 100's of emails with low search latency. Implemented adaptive learning system using transfer learning on user communication patterns, improving response accuracy by 40%. Architected serverless edge deployment achieving 70% cold start reduction and 99.9% availability. Integrated Stripe subscription infrastructure with idempotent webhook processing and automated billing reconciliation.",
    url: "https://vectormail.parbhat.dev",
    github: "https://github.com/parbhatkapila4/Vector-Mail",
    video: "https://lcbcrithcxdbqynfmtxk.supabase.co/storage/v1/object/public/Videos/Vector%20Mail-1758311992317.mp4",
    tech: ["Next.js", "TypeScript", "Gmail API", "Gemini", "Stripe", "Prisma ORM", "PostgreSQL"],
  },
  {
    name: "Repo Doc",
    description: "AI-powered developer productivity platform that reduces onboarding time by 75% through intelligent codebase documentation and semantic code search. Architected distributed processing pipeline handling repositories up to 10GB with parallel AST parsing, incremental indexing, and smart chunking strategies. Built hybrid search engine combining pgvector similarity with BM25 keyword matching, achieving 92% relevance accuracy. Designed serverless event-driven architecture with SQS queuing, Lambda workers, and DynamoDB state management for concurrent processing of repositories. Implemented multi-tenant data isolation with row-level security and automated cache invalidation.",
    url: "https://repodoc.parbhat.dev/",
    github: "https://github.com/parbhatkapila4/RepoDocs",
    video: "https://lcbcrithcxdbqynfmtxk.supabase.co/storage/v1/object/public/Videos/Repo-Docs%20Demo-1758239976349%20(1).mp4",
    tech: ["Next.js", "OpenAI/Gemini API", "PostgreSQL", "TypeScript", "Prisma ORM", "RAG"],
  },
  {
    name: "Visura AI",
    description: "Enterprise document intelligence SaaS reducing document analysis time from hours to seconds through advanced LLM orchestration. Engineered sophisticated extraction pipeline with LangChain agents, handling 1000+ page documents through hierarchical map-reduce summarization and intelligent chunking within token constraints. Architected multi-document knowledge graph with cross-reference resolution and temporal context preservation. Built high-performance vector search with HNSW indexing on pgvector, achieving low query response time for embeddings. Implemented robust payment infrastructure with Stripe webhooks, subscription lifecycle management, usage-based metering, and automated invoice generation. Scaled to process documents with 99.9% accuracy.",
    url: "https://visura.parbhat.dev/",
    github: "https://github.com/parbhatkapila4/Visura",
    video: "https://lcbcrithcxdbqynfmtxk.supabase.co/storage/v1/object/public/Videos/Visura-Demo-1758303349310.mp4",
    tech: ["Next.js", "Gemini API", "Stripe", "LangChain", "TypeScript", "PostgreSQL"],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 5.5,
    },
  },
};

const Projects = () => {
  const [show, setShow] = useState(true);
  const [videoOpen, setVideoOpen] = useState(false);
  const [recentVideo, setRecentVideo] = useState("");

  const projectDisplayed = show ? ProjectDesArray : ProjectDesArray.slice(0, 2);

  const openVideo = (videoSrc: string) => {
    setRecentVideo(videoSrc);
    setVideoOpen(true);
  };
  const closeVideo = () => {
    setVideoOpen(false);
    setRecentVideo("");
  };

  return (
    <>
      <motion.div
        className="mt-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 5.0 }}
      >
          <motion.div
            className="flex items-center gap-3 mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 5.2 }}
          >
            <div className="h-8 w-1 bg-gradient-to-b from-cyan-500 to-cyan-500/20 rounded-full" />
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
              Featured Projects
            </h1>
          </motion.div>
          <motion.div
            className="grid gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
          {projectDisplayed.map((project, index) => (
          <motion.div
            key={`parbhat-project-${index}`}
            className="group relative overflow-hidden rounded-xl p-4 sm:p-6 transition-all duration-500"
            style={{
              background: "linear-gradient(rgba(10, 10, 10, 0.8), rgba(10, 10, 10, 0.8)) padding-box, linear-gradient(135deg, rgba(6, 182, 212, 0.3), rgba(34, 211, 238, 0.2), rgba(103, 232, 249, 0.2)) border-box",
              border: "1px solid transparent",
            }}
            whileHover={{
              scale: 1.02,
              y: -8,
            }}
            whileTap={{ scale: 0.99 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-cyan-400/5 to-cyan-300/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute -inset-[1px] bg-gradient-to-r from-cyan-500/20 via-cyan-400/20 to-cyan-300/20 rounded-xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500" />
              <div className="relative z-10 flex flex-col gap-3 sm:gap-4">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
                  <div className="flex-1">
                    <motion.h2
                      className="text-lg sm:text-xl font-bold mb-2 group-hover:text-cyan-400/90 transition-colors duration-300"
                      transition={{ duration: 0.2, delay: 5.8 }}
                    >
                      {project.name}
                    </motion.h2>
                  </div>
                  <div className="flex gap-2 sm:ml-4">
                    {project.video && (
                      <motion.button
                        onClick={() => openVideo(project.video!)}
                        className="px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg border border-cyan-500/30 bg-cyan-500/5 hover:bg-cyan-500/10 hover:border-cyan-400/50 transition-all duration-300 group/link flex items-center gap-1 sm:gap-2 text-xs font-semibold shadow-elegant"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="flex items-center gap-1 sm:gap-2 text-cyan-400/90 group-hover/link:text-cyan-400">
                          <Play className="w-3 h-3 sm:w-4 sm:h-4 group-hover/link:scale-110 transition-transform duration-300" />
                          <span className="hidden sm:inline">Demo</span>
                          <span className="sm:hidden">Demo</span>
                        </span>
                      </motion.button>
                    )}

                    <motion.a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 sm:p-2 rounded-lg border border-white/15 hover:border-cyan-400/40 hover:bg-cyan-500/5 transition-all duration-300 group/link shadow-elegant"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 text-white/60 group-hover/link:text-cyan-400 group-hover/link:scale-110 transition-all duration-300" />
                    </motion.a>
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 sm:p-2 rounded-lg border border-white/15 hover:border-cyan-400/40 hover:bg-cyan-500/5 transition-all duration-300 group/link shadow-elegant"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github className="w-3 h-3 sm:w-4 sm:h-4 text-white/60 group-hover/link:text-cyan-400 group-hover/link:scale-110 transition-all duration-300" />
                    </motion.a>
                  </div>
                </div>
                <motion.p
                  className="text-xs sm:text-sm leading-relaxed text-white/70 group-hover:text-white/85 transition-colors duration-300 tracking-wide"
                  transition={{ duration: 0.4, delay: 6.0 }}
                  style={{ lineHeight: '1.7' }}
                >
                  {project.description}
                </motion.p>

                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {project.tech.map((tech, techIndex) => (
                    <motion.span
                      key={`parbhat-project-tech-${techIndex}`}
                      className="px-2.5 sm:px-3 py-1 text-xs font-semibold rounded-full border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/40 hover:bg-cyan-500/5 shadow-elegant"
                      whileHover={{
                        scale: 1.05,
                        y: -2,
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
          </motion.div>
      </motion.div>

      <AnimatePresence>
        {videoOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeVideo}
          >
            <motion.div
              className="relative max-w-4xl w-full mx-2 sm:mx-4 bg-black/30 rounded-xl overflow-hidden border border-white/20"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <button
                  onClick={closeVideo}
                  className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/20  transition-colors duration-300"
                >
                  <X className="w-5 h-5" />
                </button>
                <video
                  src={recentVideo}
                  muted
                  autoPlay
                  className="w-full h-auto max-h-[60vh] sm:max-h-[80vh]"
                >
                  Your browser can not play this video. Please try Chrome, Edge,
                  or Safari.
                </video>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Projects;
