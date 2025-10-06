"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, ExternalLink, Github, Play, X } from "lucide-react";
const ProjectDesArray = [
  {
    name: "Vector Mail",
    description: "AI-powered email intelligence platform with RAG-based semantic search, and  multi-provider AI orchestration. Features personalized email composition through fine-tuning on user patterns, Redis-cached vector embeddings, and Edge Runtime deployment achieving 70% cold start reduction.",
    url: "https://vectormail.parbhat.dev",
    github: "https://github.com/parbhatkapila4/Vector-Mail",
    video: "https://lcbcrithcxdbqynfmtxk.supabase.co/storage/v1/object/public/Videos/Vector%20Mail-1758311992317.mp4",
    tech: ["Next.js", "TypeScript", "Gmail API", "Gemini", "Stripe", "Prisma ORM", "PostgreSQL"],
  },
  {
    name: "Repo Doc",
    description: "Code documentation generator that transforms GitHub repositories into queryable knowledge bases using semantic chunking and hybrid vector-keyword search. Implements rate-limited batch embeddings, incremental indexing for large codebases, and conversational interface for instant developer onboarding. Built with serverless architecture supporting concurrent repository processing and auto-generated documentation with shareable links.",
    url: "https://repodoc.parbhat.dev/",
    github: "https://github.com/parbhatkapila4/RepoDocs",
    video: "https://lcbcrithcxdbqynfmtxk.supabase.co/storage/v1/object/public/Videos/Repo-Docs%20Demo-1758239976349%20(1).mp4",
    tech: ["Next.js", "OpenAI/Gemini API", "PostgreSQL", "TypeScript", "Prisma ORM", "RAG"],
  },
  {
    name: "Visura AI",
    description: "Document intelligence platform processing PDFs through LangChain orchestration with hierarchical summarization and multi-level retrieval. Handles documents using concurrent processing, cross-document search, and context-aware Q&A within LLM limits. Integrated Stripe subscription billing with idempotent webhook processing, deployed on Neon PostgreSQL with pgvector and Clerk authentication.",
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
        className="mt-15"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 5.0 }}
      >
        <motion.h1
          className="text-xl sm:text-2xl font-bold mb-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 5.2 }}
        >
          Projects
        </motion.h1>
        <motion.div
          className="grid gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {projectDisplayed.map((project, index) => (
            <motion.div
              key={`parbhat-project-${index}`}
              className="group relative overflow-hidden border border-white/20 rounded-xl p-4 sm:p-6 hover:border-white/30 transition-all duration-300 hover:shadow-lg"
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex flex-col gap-3 sm:gap-4">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
                  <div className="flex-1">
                    <motion.h2
                      className="text-lg sm:text-xl font-bold mb-2 transition-colors duration-300"
                      transition={{ duration: 0.2, delay: 5.8 }}
                    >
                      {project.name}
                    </motion.h2>
                  </div>
                  <div className="flex gap-2 sm:ml-4">
                    {project.video && (
                      <motion.button
                        onClick={() => openVideo(project.video!)}
                        className="p-1.5 sm:p-2 rounded-lg border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all duration-300 group/link flex items-center gap-1 sm:gap-2 text-xs font-medium"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="flex items-center gap-1 sm:gap-2">
                          <Play className="w-3 h-3 sm:w-4 sm:h-4 group-hover/link:scale-110 transition-transform duration-300" />
                          <span className="hidden sm:inline">Product Demo</span>
                          <span className="sm:hidden">Demo</span>
                        </span>
                      </motion.button>
                    )}

                    <motion.a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 sm:p-2 rounded-lg border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all duration-300 group/link"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 group-hover/link:scale-110 transition-transform duration-300" />
                    </motion.a>
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 sm:p-2 rounded-lg border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all duration-300 group/link"
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github className="w-3 h-3 sm:w-4 sm:h-4 group-hover/link:scale-110 transition-transform duration-300" />
                    </motion.a>
                  </div>
                </div>
                <motion.p
                  className="text-xs sm:text-sm leading-relaxed text-white/70 group-hover:text-white/80 transition-colors duration-300"
                  transition={{ duration: 0.4, delay: 6.0 }}
                >
                  {project.description}
                </motion.p>

                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {project.tech.map((tech, techIndex) => (
                    <motion.span
                      key={`parbhat-project-tech-${techIndex}`}
                      className="px-2 sm:px-3 py-1 text-xs font-medium rounded-full border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/30 transition-all duration-300"
                      transition={{ duration: 0.5, delay: 6.2 }}
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
