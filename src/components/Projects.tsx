"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ExternalLink,
  Github,
  ArrowRight,
  Play,
  X,
  TrendingUp,
  Zap,
  Target,
} from "lucide-react";

const projects = [
  {
    name: "Sentinel",
    category: "Pipeline Intelligence",
    description: `Detects deals that are starting to stall before it’s visible in a CRM.
It models time decay, stage velocity, and engagement signals from live pipeline data.
Fast, explainable, and designed for real integration load.
First version shipped in 10 days and iterated weekly with live sales pipelines.`,
    metrics: [
      { value: "<250ms", label: "Query latency", icon: Zap },
      { value: "Live sync", label: "CRM & calendar sync", icon: TrendingUp },
      { value: "Predictive", label: "Explainable risk scoring", icon: Target },
      { value: "99.9%", label: "Continuous uptime", icon: Target },
    ],
    tech: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "Redis",
      "OpenRouter",
      "Webhooks",
    ],
    url: "https://www.sentinels.in/",
    github: "https://github.com/parbhatkapila4/Sentinel",
    video:"https://lcbcrithcxdbqynfmtxk.supabase.co/storage/v1/object/public/Videos/Sentinel-tutorial.mp4",
    impact: "Know which deals are already slipping away",
  },
  {
    name: "RepoDocs",
    category: "Engineering Infrastructure",
    description:
      "Automated code documentation system processing 200+ repositories and 100K+ LOC. Reduced onboarding time by 75% with 92% relevance accuracy, serving engineering teams at scale. First usable version shipped in 2 weeks, then refined by pairing directly with engineers on their repos.",
    metrics: [
      { value: "<1s", label: "QUERY LATENCY", icon: Zap },
      { value: "TOP-5", label: "deterministic retrieval", icon: Target },
      { value: "~75%", label: "ONBOARDING TIME SAVED", icon: TrendingUp },
      { value: "100%", label: "CITATION-BACKED ANSWERS", icon: Target },
    ],
    tech: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "pgvector",
      "Gemini",
      "OpenRouter",
      "GitHub API",
      "Stripe",
    ],
    url: "https://repodoc.parbhat.dev/",
    github: "https://github.com/parbhatkapila4/RepoDocs",
    video:
      "https://lcbcrithcxdbqynfmtxk.supabase.co/storage/v1/object/public/Videos/Repodoc-AI-Demo.mp4",
    impact: "75% reduction in onboarding time for engineering teams",
  },
  {
    name: "Visura",
    category: "Enterprise AI Platform",
    description:
      "Knowledge operations system processing 10k+ documents with 94%+ accuracy. Reduced processing costs significantly through intelligent architecture, achieving 50–80% AI cost savings via chunk reuse. Took it from prototype to stable production in under 6 weeks, serving real customer document workloads.",
    metrics: [
      { value: "94%+", label: "ACCURACY", icon: Target },
      { value: "10k+", label: "DOCUMENTS", icon: TrendingUp },
      { value: "50-80%", label: "AI COST SAVED", icon: Zap },
      { value: "SUB-3s", label: "PROCESSING (P50)", icon: Zap },
    ],
    tech: [
      "Next.js",
      "TypeScript",
      "LangChain",
      "GPT-4",
      "pgvector",
      "PostgreSQL",
      "Redis",
    ],
    url: "https://visura.parbhat.dev/",
    github: "https://github.com/parbhatkapila4/Visura",
    video:
      "https://lcbcrithcxdbqynfmtxk.supabase.co/storage/v1/object/public/Videos/Visura-AI-Demo.mp4",
    impact: "ACHIEVED 50–80% AI COST SAVINGS IN PRODUCTION",
  },
];

const VideoModal = ({
  isOpen,
  onClose,
  videoSrc,
  projectName,
}: {
  isOpen: boolean;
  onClose: () => void;
  videoSrc: string;
  projectName: string;
}) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative max-w-5xl w-full mx-2 sm:mx-4 bg-black border border-white/20 rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/20 bg-black/80 hover:bg-black flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-white/20"
            aria-label="Close video modal"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </button>
          <div className="relative pt-[56.25%] bg-black">
            <video
              src={videoSrc}
              controls
              autoPlay
              className="absolute inset-0 w-full h-full"
            >
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="p-4 sm:p-6 border-t border-white/10 bg-gradient-to-b from-black to-black/80">
            <p className="text-sm sm:text-base text-gray-300 text-center font-medium">
              {projectName} Demo
            </p>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const Projects = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [videoOpen, setVideoOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState("");
  const [currentProjectName, setCurrentProjectName] = useState("");

  const handleVideoOpen = (videoSrc: string, projectName: string) => {
    setCurrentVideo(videoSrc);
    setCurrentProjectName(projectName);
    setVideoOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleVideoClose = () => {
    setVideoOpen(false);
    setCurrentVideo("");
    setCurrentProjectName("");
    document.body.style.overflow = "unset";
  };

  useEffect(() => {
    if (!videoOpen) return;

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleVideoClose();
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [videoOpen]);

  return (
    <>
      <section
        id="projects"
        className="py-20 sm:py-32 px-4 sm:px-6 bg-black text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-[0.02]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
            }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            className="mb-12 sm:mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div className="h-px w-8 sm:w-12 bg-white/20"></div>
              <span className="text-xs text-gray-500 uppercase tracking-widest">
                Featured Work
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-4">
              Production AI Systems
            </h2>
            <p className="text-gray-400 font-light max-w-2xl text-base sm:text-lg">
              Real products serving real users, with measurable business impact
            </p>
          </motion.div>

          <div className="space-y-px">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                className="group relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="relative border-t border-white/5 bg-black hover:bg-white/[0.02] transition-all duration-700">
                  <div className="block p-6 sm:p-8 md:p-12 lg:p-16">
                    <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 sm:gap-12 items-center">
                      <div className="space-y-4 sm:space-y-6">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <span className="text-xs text-gray-500 uppercase tracking-wider font-light">
                            {project.category}
                          </span>
                          <div className="h-px w-6 sm:w-8 bg-white/10"></div>
                          {project.impact && (
                            <span className="text-xs text-green-400 uppercase tracking-wider font-medium">
                              {project.impact}
                            </span>
                          )}
                        </div>

                        <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.1]">
                          {project.name}
                        </h3>

                        <p className="text-gray-300 leading-relaxed max-w-2xl font-light text-base sm:text-lg">
                          {project.description}
                        </p>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-4 sm:pt-6">
                          {project.metrics.map((metric, i) => {
                            const MetricIcon = metric.icon;
                            return (
                              <div key={i} className="group/metric">
                                <div className="flex items-center justify-start gap-2 mb-1">
                                  <MetricIcon className="w-4 h-4 text-gray-500" />
                                  <div className="text-xl sm:text-2xl md:text-3xl font-light text-white transition-all group-hover/metric:translate-y-[-2px]">
                                    {metric.value}
                                  </div>
                                </div>
                                <div className="text-xs text-gray-500 uppercase tracking-wider font-light whitespace-nowrap">
                                  {metric.label}
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        <div className="flex flex-wrap gap-2 pt-6">
                          {project.tech.map((tech, i) => (
                            <span
                              key={i}
                              className="px-3 py-1.5 text-xs border border-white/10 rounded-full text-gray-400 font-light hover:border-white/20 hover:text-gray-300 transition-all"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center gap-4 pt-4">
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-xs text-gray-500 hover:text-white transition-colors uppercase tracking-wider font-light"
                          >
                            <Github className="w-3.5 h-3.5" />
                            Source
                          </a>
                          <div className="h-3 w-px bg-white/10"></div>
                          <button
                            onClick={() =>
                              project.video &&
                              handleVideoOpen(project.video, project.name)
                            }
                            className="flex items-center gap-2 text-xs text-gray-500 hover:text-white transition-colors uppercase tracking-wider font-light focus:outline-none focus:text-white"
                            aria-label={`Watch ${project.name} demo video`}
                          >
                            <Play className="w-3.5 h-3.5" />
                            Demo
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-start md:justify-end mt-4 md:mt-0">
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-white/10 flex items-center justify-center hover:border-white/20 hover:bg-white/5 transition-all duration-500 group/arrow"
                        >
                          <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 group-hover/arrow:text-white group-hover/arrow:translate-x-1 transition-all duration-500" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-12 sm:mt-20 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <a
              href="https://github.com/parbhatkapila4"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm tracking-wide font-light"
            >
              View all projects on GitHub
              <Github className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      <VideoModal
        isOpen={videoOpen}
        onClose={handleVideoClose}
        videoSrc={currentVideo}
        projectName={currentProjectName}
      />
    </>
  );
};

export default Projects;
