"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, Github, Play, X } from "lucide-react";

// Project data
const projects = [
  {
    name: "Vector Mail",
    description: "Enterprise email intelligence platform leveraging advanced RAG architecture and multi-model AI orchestration to deliver context-aware email automation. Engineered distributed vector embedding pipeline with Redis clustering, processing hundreds of emails with low search latency.",
    url: "https://vectormail.parbhat.dev",
    github: "https://github.com/parbhatkapila4/Vector-Mail",
    video: "https://lcbcrithcxdbqynfmtxk.supabase.co/storage/v1/object/public/Videos/Vector%20Mail-1758311992317.mp4",
    tech: ["Next.js", "TypeScript", "Gmail API", "Gemini", "Stripe", "Prisma ORM", "PostgreSQL"],
    status: "Running"
  },
  {
    name: "Repo Doc",
    description: "AI-powered developer productivity platform that reduces onboarding time by 75% through intelligent codebase documentation and semantic code search. Built hybrid search engine combining pgvector similarity with BM25 keyword matching, achieving 92% relevance accuracy.",
    url: "https://repodoc.parbhat.dev/",
    github: "https://github.com/parbhatkapila4/RepoDocs",
    video: "https://lcbcrithcxdbqynfmtxk.supabase.co/storage/v1/object/public/Videos/Repo-Docs%20Demo-1758239976349%20(1).mp4",
    tech: ["Next.js", "OpenAI/Gemini API", "PostgreSQL", "TypeScript", "Prisma ORM", "RAG"],
    status: "Running"
  },
  {
    name: "Visura AI",
    description: "Enterprise document intelligence SaaS reducing document analysis time from hours to seconds through advanced LLM orchestration. Engineered sophisticated extraction pipeline with LangChain agents, handling 1000+ page documents through hierarchical map-reduce summarization.",
    url: "https://visura.parbhat.dev/",
    github: "https://github.com/parbhatkapila4/Visura",
    video: "https://lcbcrithcxdbqynfmtxk.supabase.co/storage/v1/object/public/Videos/Visura-Demo-1758303349310.mp4",
    tech: ["Next.js", "Gemini API", "Stripe", "LangChain", "TypeScript", "PostgreSQL"],
    status: "Running"
  },
];

// Animation configurations
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay: 0.3 }
};

const projectItemAnimation = (index: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay: 0.4 + index * 0.1 }
});

// Live status badge component
const LiveBadge = () => (
  <div className="relative group">
    {/* Glow layers */}
    <div className="absolute -inset-2 bg-gradient-to-r from-green-200 via-emerald-300 to-green-200 rounded-2xl blur-xl opacity-10 group-hover:opacity-25 transition-all duration-700" />
    <div className="absolute -inset-1 bg-gradient-to-r from-green-300 via-emerald-400 to-green-300 rounded-xl blur-lg opacity-20 group-hover:opacity-40 transition-all duration-500" />
    <div className="absolute -inset-0.5 bg-gradient-to-r from-green-400 via-emerald-500 to-green-400 rounded-lg blur-sm opacity-50 group-hover:opacity-70 transition-all duration-300 animate-pulse" />
    
    {/* Main badge */}
    <div className="relative bg-gradient-to-br from-green-500 via-emerald-500 to-green-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold border border-green-300/50 shadow-2xl overflow-hidden backdrop-blur-sm">
      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
      
      {/* Content */}
      <div className="flex items-center gap-1.5 relative z-10">
        <div className="relative">
          <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping shadow-lg shadow-white/60" />
          <div className="absolute inset-0 w-1.5 h-1.5 bg-white rounded-full shadow-xl shadow-white/80" />
          <div className="absolute inset-0 w-1.5 h-1.5 bg-gradient-to-br from-white to-green-100 rounded-full" />
        </div>
        <span className="bg-gradient-to-r from-white via-green-50 to-white bg-clip-text text-transparent font-black tracking-wider drop-shadow-lg text-shadow-sm">
          LIVE
        </span>
        <div className="w-0.5 h-0.5 bg-white/90 rounded-full animate-pulse shadow-sm" />
      </div>
    </div>
  </div>
);

// Video modal component
const VideoModal = ({ isOpen, onClose, videoSrc }: { isOpen: boolean; onClose: () => void; videoSrc: string }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative max-w-4xl w-full mx-4 bg-black/30 rounded-xl overflow-hidden border border-gray-600"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/20 hover:bg-black/40 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
            <video
              src={videoSrc}
              muted
              autoPlay
              className="w-full h-auto max-h-[60vh] sm:max-h-[80vh]"
            >
              Your browser can not play this video. Please try Chrome, Edge, or Safari.
            </video>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const Projects = () => {
  const [videoOpen, setVideoOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState("");

  const handleVideoOpen = (videoSrc: string) => {
    setCurrentVideo(videoSrc);
    setVideoOpen(true);
  };

  const handleVideoClose = () => {
    setVideoOpen(false);
    setCurrentVideo("");
  };

  return (
    <>
      <motion.section
        className="space-y-6"
        {...fadeInUp}
      >
        <h2 className="text-2xl font-bold text-white">Projects</h2>
        
        <div className="space-y-6">
          {projects.map((project, index) => (
            <motion.div
              key={`project-${index}`}
              className="border border-gray-600 rounded-lg p-6 hover:border-gray-500 transition-colors"
              {...projectItemAnimation(index)}
            >
              {/* Project header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-bold text-white">{project.name}</h3>
                  <LiveBadge />
                </div>
                
                {/* Action buttons */}
                <div className="flex gap-2">
                  {project.video && (
                    <button
                      onClick={() => handleVideoOpen(project.video!)}
                      className="p-2 border border-gray-600 rounded hover:border-gray-500 transition-colors"
                      aria-label="Play video"
                    >
                      <Play className="w-4 h-4 text-gray-400" />
                    </button>
                  )}
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 border border-gray-600 rounded hover:border-gray-500 transition-colors"
                    aria-label="View live project"
                  >
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 border border-gray-600 rounded hover:border-gray-500 transition-colors"
                    aria-label="View source code"
                  >
                    <Github className="w-4 h-4 text-gray-400" />
                  </a>
                </div>
              </div>
              
              {/* Project description */}
              <p className="text-gray-400 leading-relaxed mb-4">
                {project.description}
              </p>
              
              {/* Tech stack */}
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, techIndex) => (
                  <span
                    key={`tech-${techIndex}`}
                    className="px-3 py-1 text-sm border border-gray-600 rounded text-gray-400"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <VideoModal
        isOpen={videoOpen}
        onClose={handleVideoClose}
        videoSrc={currentVideo}
      />
    </>
  );
};

export default Projects;
