"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, Github, Play, X } from "lucide-react";

const projects = [
  {
    name: "VectorMail - Communication Intelligence & Ops System",
    description: `Delivered a communication intelligence system that continuously indexes live email streams and transforms unstructured inbox data into a searchable operational layer. Designed a RAG-based retrieval pipeline with pgvector and Redis to deliver sub-200ms semantic search, integrated Gmail ingestion via OAuth and incremental sync, and optimized pipelines to process high email volumes efficiently. Actively serving daily users in production with 99.9% uptime.`,
    metrics: [
      { label: "Query Latency", value: "<200ms" },
      { label: "Emails Indexed", value: "1000+" },
      { label: "Search Improvement", value: "80% faster" },
      { label: "Uptime", value: "99.9%" },
    ],
    url: "https://vectormail.parbhat.dev",
    github: "https://github.com/parbhatkapila4/Vector-Mail",
    video:
      "https://lcbcrithcxdbqynfmtxk.supabase.co/storage/v1/object/public/Videos/Vector-Mail-1762579701087.mp4",
    tech: [
      "Next.js",
      "TypeScript",
      "OpenAI",
      "RAG/LangChain",
      "PostgreSQL",
      "Redis",
    ],
    status: "Running",
  },
  {
    name: "Visura - Autonomous Enterprise Knowledge Operations",
    description: `Engineered an enterprise knowledge operations system that ingests and reasons over large document collections, converting complex files into structured, decision-ready outputs. Designed hierarchical summarization and semantic retrieval pipelines to achieve 94%+ classification accuracy and sub-2s response times at scale. Operationalized usage-based billing, access control, and production infrastructure to support real client workflows, replacing hours of manual document review with reliable, automated intelligence.`,
    metrics: [
      { label: "Documents Processed", value: "10,000+" },
      { label: "Accuracy", value: "94%" },
      { label: "Time Saved", value: "99.8%" },
      { label: "Uptime", value: "99.9%" },
    ],
    url: "https://visura.parbhat.dev/",
    github: "https://github.com/parbhatkapila4/Visura",
    video:
      "https://lcbcrithcxdbqynfmtxk.supabase.co/storage/v1/object/public/Videos/Visura%20AI-1762578271796.mp4",
    tech: [
      "Next.js",
      "TypeScript",
      "LangChain",
      "GPT-4",
      "Razorpay/Paypal",
      "pgvector",
    ],
    status: "Running",
  },
  {
    name: "RepoDocs - Engineering Knowledge Infrastructure",
    description: `Architected an engineering knowledge infrastructure that continuously converts large codebases into a searchable, structured knowledge layer. Automatically generates and maintains documentation across 100,000+ lines of code with 92% relevance accuracy, reducing developer onboarding time from 2 weeks to 3 days for teams of 5+ engineers. Designed hybrid retrieval using vector similarity and BM25 to preserve semantic and keyword precision, and integrated OpenAI for contextual code reasoning and explanations. Actively processing 200+ repositories, with real-time documentation updates as code evolves.`,
    metrics: [
      { label: "Repositories", value: "200+" },
      { label: "Code Processed", value: "100K+ LOC" },
      { label: "Onboarding Time", value: "75% faster" },
      { label: "Accuracy", value: "92%" },
    ],
    url: "https://repodoc.parbhat.dev/",
    github: "https://github.com/parbhatkapila4/RepoDocs",
    video:
      "https://lcbcrithcxdbqynfmtxk.supabase.co/storage/v1/object/public/Videos/Repo-Doc-1762580822637.mp4",
    tech: [
      "Next.js",
      "TypeScript",
      "OpenAI",
      "BM25",
      "Stripe",
      "GitHub API",
      "PostgreSQL",
    ],
    status: "Running",
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay: 0.3 },
};

const projectItemAnimation = (index: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay: 0.4 + index * 0.1 },
});

const LiveBadge = () => (
  <div className="relative group w-fit">
    <div className="absolute -inset-1.5 sm:-inset-2 bg-gradient-to-r from-green-200 via-emerald-300 to-green-200 rounded-2xl blur-lg sm:blur-xl opacity-10 group-hover:opacity-25 transition-all duration-700" />
    <div className="absolute -inset-1 bg-gradient-to-r from-green-300 via-emerald-400 to-green-300 rounded-xl blur-md sm:blur-lg opacity-20 group-hover:opacity-40 transition-all duration-500" />
    <div className="absolute -inset-0.5 bg-gradient-to-r from-green-400 via-emerald-500 to-green-400 rounded-lg blur-sm opacity-50 group-hover:opacity-70 transition-all duration-300 animate-pulse" />

    <div className="relative bg-gradient-to-br from-green-500 via-emerald-500 to-green-600 text-white px-2.5 py-1 text-[10px] sm:px-3 sm:py-1.5 sm:text-xs rounded-lg font-bold border border-green-300/50 shadow-2xl overflow-hidden backdrop-blur-sm">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />

      <div className="flex items-center gap-1.5 relative z-10">
        <div className="relative">
          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white rounded-full animate-ping shadow-lg shadow-white/60" />
          <div className="absolute inset-0 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white rounded-full shadow-xl shadow-white/80" />
          <div className="absolute inset-0 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-gradient-to-br from-white to-green-100 rounded-full" />
        </div>
        <span className="bg-gradient-to-r from-white via-green-50 to-white bg-clip-text text-transparent font-black tracking-wider drop-shadow-lg text-shadow-sm">
          LIVE
        </span>
        <div className="w-0.5 h-0.5 bg-white/90 rounded-full animate-pulse shadow-sm" />
      </div>
    </div>
  </div>
);

const VideoModal = ({
  isOpen,
  onClose,
  videoSrc,
}: {
  isOpen: boolean;
  onClose: () => void;
  videoSrc: string;
}) => (
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
              Your browser can not play this video. Please try Chrome, Edge, or
              Safari.
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
      <motion.section className="space-y-4 sm:space-y-6" {...fadeInUp}>
        <h2 className="text-xl sm:text-2xl font-bold text-white">Projects</h2>

        <div className="space-y-4 sm:space-y-6">
          {projects.map((project, index) => (
            <motion.div
              key={`project-${index}`}
              className="border border-gray-600 rounded-lg p-4 sm:p-6 hover:border-gray-500 transition-colors"
              {...projectItemAnimation(index)}
            >
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    {project.name}
                  </h3>
                  <LiveBadge />
                </div>

                <div className="flex gap-2 w-full sm:w-auto sm:ml-auto">
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

              <p className="text-gray-400 leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base">
                {project.description}
              </p>

              {project.metrics && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-3 sm:mb-4">
                  {project.metrics.map((metric, metricIndex) => (
                    <div
                      key={`metric-${metricIndex}`}
                      className="border border-gray-600 rounded-lg p-2 sm:p-3 text-center"
                    >
                      <div className="text-base sm:text-lg font-bold text-white mb-1">
                        {metric.value}
                      </div>
                      <div className="text-[10px] sm:text-xs text-gray-500">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {project.tech.map((tech, techIndex) => (
                  <span
                    key={`tech-${techIndex}`}
                    className="px-2.5 sm:px-3 py-1 text-xs sm:text-sm border border-gray-600 rounded text-gray-400"
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
