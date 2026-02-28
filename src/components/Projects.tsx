"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Github, Play, X, TrendingUp, Zap, Target, ExternalLink, MessageSquare, Database, Search, Shield, ListOrdered, FileText } from "lucide-react";

type Project = {
  name: string;
  category: string;
  description: string;
  before: string;
  after: string;
  metrics: { value: string; label: string; icon: React.ComponentType<{ className?: string }> }[];
  tech: string[];
  url: string;
  github: string;
  video?: string;
  impact?: string;
};

const projects: Project[] = [
  {
    name: "Sentinel",
    category: "Pipeline Intelligence",
    description: `Detects deals that are starting to stall before it's visible in a CRM. It models time decay, stage velocity, and engagement signals from live pipeline data. Fast, explainable, and designed for real integration load.`,
    before: "Deals die silently. CRM shows green until the opp is gone. You find out when it's too late.",
    after: "Explainable risk scoring. Most AI is a black box. This shows why. See which deals are rotting before they slip. Sub-250ms.",
    metrics: [
      { value: "<250ms", label: "Query latency", icon: Zap },
      { value: "Live sync", label: "CRM & calendar sync", icon: TrendingUp },
      { value: "Predictive", label: "Explainable risk scoring", icon: Target },
      { value: "99.9%", label: "Continuous uptime", icon: Shield },
    ],
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Redis", "OpenRouter", "Webhooks"],
    url: "https://www.sentinels.in/",
    github: "https://github.com/parbhatkapila4/Sentinel",
    video: "https://lcbcrithcxdbqynfmtxk.supabase.co/storage/v1/object/public/Videos/Sentinel-tutorial.mp4",
    impact: "Know which deals are already slipping away",
  },
  {
    name: "RepoDocs",
    category: "Engineering Infrastructure",
    description: "Automated code documentation system processing 200+ repositories and 100K+ LOC. Reduced onboarding time by 75% with 92% relevance accuracy, serving engineering teams at scale.",
    before: "New hire? 2–3 days lost in READMEs and scattered docs. 'Where does X happen?' Nobody knows.",
    after: "100% cited answers. No hallucination. 92% relevance at 100K+ LOC scale. Ask in plain English, get results in under a second. One query instead of days.",
    metrics: [
      { value: "<1s", label: "Query latency", icon: Zap },
      { value: "TOP-5", label: "deterministic retrieval", icon: ListOrdered },
      { value: "~75%", label: "Onboarding time saved", icon: TrendingUp },
      { value: "100%", label: "Citation answers", icon: FileText },
    ],
    tech: ["Next.js", "TypeScript", "PostgreSQL", "pgvector", "Gemini", "OpenRouter", "GitHub API", "Stripe"],
    url: "https://repodoc.parbhat.dev/",
    github: "https://github.com/parbhatkapila4/RepoDocs",
    video: "https://lcbcrithcxdbqynfmtxk.supabase.co/storage/v1/object/public/Videos/Repodoc-AI-Demo.mp4",
    impact: "75% reduction in onboarding time for engineering teams",
  },
  {
    name: "VectorMail",
    category: "AI-Powered Email",
    description: "AI-powered email client with semantic search and smart composition. Connect Gmail via Aurinko, sync threads, search by meaning (pgvector), and compose or reply with AI. One app: inbox, semantic search and AI, no separate vector store.",
    before: "Gmail: keywords only. 'Find that email about the pricing conversation.' Good luck.",
    after: "One DB for inbox and vectors. Semantic search across 10k+ threads. 'Emails about pricing.' Instant. Inbox and AI in one place.",
    metrics: [
      { value: "Sub-second", label: "10k+ emails", icon: Zap },
      { value: "One DB", label: "inbox + vectors", icon: Database },
      { value: "By meaning", label: "not keywords", icon: Search },
      { value: "AI compose", label: "thread context", icon: MessageSquare },
    ],
    tech: ["Next.js 15", "TypeScript", "tRPC", "Prisma", "PostgreSQL", "pgvector", "Clerk", "Aurinko", "OpenRouter", "Gemini"],
    url: "https://vectormail.space/",
    github: "https://github.com/parbhatkapila4/Vector-Mail",
    video: "https://lcbcrithcxdbqynfmtxk.supabase.co/storage/v1/object/public/Videos/Vector-Mail-Demo.mp4",
    impact: "Search by meaning, compose with AI",
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
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative max-w-4xl w-full bg-white dark:bg-black rounded-2xl overflow-hidden shadow-2xl ring-2 ring-slate-200/50 dark:ring-white/10"
          initial={{ scale: 0.96, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.96, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-slate-800 text-white hover:bg-slate-700 dark:bg-white/10 dark:hover:bg-white/20 flex items-center justify-center transition-colors hover:scale-105 active:scale-95"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="relative pt-[56.25%] bg-black">
            <video src={videoSrc} controls autoPlay className="absolute inset-0 w-full h-full">
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="p-4 border-t border-slate-200 dark:border-white/10">
            <p className="text-sm font-medium text-slate-700 dark:text-gray-300 text-center">{projectName} Demo</p>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const Projects = () => {
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
    const handleEsc = (e: KeyboardEvent) => e.key === "Escape" && handleVideoClose();
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [videoOpen]);

  return (
    <>
      <section id="projects" className="py-20 sm:py-28 px-4 sm:px-6 bg-transparent relative overflow-hidden">
        <div className="absolute inset-0 opacity-0 dark:opacity-[0.02] pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "50px 50px" }} />
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            className="mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-sm font-semibold text-teal-600 dark:text-gray-500 uppercase tracking-wider">
              Full-Stack Engineer · Featured Work
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mt-2 mb-4">
              Production AI Systems
            </h2>
            <p className="text-slate-600 dark:text-gray-400 max-w-2xl text-lg">
              Production systems I ship and operate. Measurable outcomes, real users.
            </p>
          </motion.div>

          <div className="space-y-8 dark:space-y-px">
            {projects.map((project, index) => (
              <motion.article
                key={project.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group bg-white dark:bg-black rounded-2xl dark:rounded-none border border-slate-200/80 dark:border-white/5 shadow-sm hover:shadow-xl hover:border-slate-300/80 dark:hover:bg-white/[0.02] dark:border-t dark:first:border-t-0 transition-all duration-300 overflow-hidden hover:-translate-y-0.5"
              >
                <div className="p-6 sm:p-8 md:p-10 dark:p-6 sm:dark:p-8 md:dark:p-12 lg:dark:p-16">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div className="flex-1 min-w-0 space-y-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-semibold text-teal-600 dark:text-gray-500 uppercase tracking-wider">
                          {project.category}
                        </span>
                      </div>
                      <h3 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                        {project.name}
                      </h3>
                      <p className="text-slate-600 dark:text-gray-300 leading-relaxed max-w-2xl">
                        {project.description}
                      </p>

                      <div className="rounded-xl border border-slate-200/80 dark:border-white/10 bg-slate-50/50 dark:bg-white/[0.02] overflow-hidden">
                        <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-200/80 dark:divide-white/10">
                          <div className="p-4 sm:p-5">
                            <span className="text-[10px] font-semibold text-slate-400 dark:text-gray-500 uppercase tracking-widest">
                              Before
                            </span>
                            <p className="text-sm text-slate-600 dark:text-gray-400 mt-1.5 leading-relaxed">
                              {project.before}
                            </p>
                          </div>
                          <div className="p-4 sm:p-5">
                            <span className="text-[10px] font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-widest">
                              After
                            </span>
                            <p className="text-sm text-slate-700 dark:text-white mt-1.5 leading-relaxed font-medium">
                              {project.after}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-nowrap gap-2 pt-3">
                        {project.metrics.map((m, i) => {
                          const Icon = m.icon;
                          return (
                            <div
                              key={i}
                              className="flex items-center gap-2 shrink-0 whitespace-nowrap rounded-lg bg-slate-100/80 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 px-3 py-2 transition-colors hover:bg-slate-200/60 dark:hover:bg-white/[0.08] hover:border-slate-300/60 dark:hover:border-white/15"
                            >
                              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-teal-500/10 dark:bg-teal-400/10">
                                <Icon className="h-3.5 w-3.5 text-teal-600 dark:text-teal-400" />
                              </div>
                              <div className="min-w-0">
                                <div className="text-sm font-semibold text-slate-900 dark:text-white leading-tight">{m.value}</div>
                                <div className="text-[11px] text-slate-500 dark:text-gray-400 leading-tight mt-0.5">{m.label}</div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <div className="flex flex-wrap gap-2 pt-2">
                        {project.tech.map((t) => (
                          <span
                            key={t}
                            className="px-3 py-1 text-xs font-medium rounded-full bg-slate-100 text-slate-600 border border-slate-200/80 dark:bg-transparent dark:text-gray-400 dark:border-white/10"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-4 pt-2">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-teal-600 dark:text-gray-500 dark:hover:text-white transition-colors"
                        >
                          <Github className="w-4 h-4" /> Source
                        </a>
                        {project.video && (
                          <button
                            onClick={() => handleVideoOpen(project.video!, project.name)}
                            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-teal-600 dark:text-gray-500 dark:hover:text-white transition-colors"
                            aria-label={`Watch ${project.name} demo`}
                          >
                            <Play className="w-4 h-4" /> Demo
                          </button>
                        )}
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-teal-600 dark:text-gray-500 dark:hover:text-white transition-colors"
                          aria-label={`Open ${project.name}`}
                        >
                          <ExternalLink className="w-4 h-4" /> Visit
                        </a>
                      </div>
                    </div>
                    {project.video && (
                      <button
                        type="button"
                        onClick={() => handleVideoOpen(project.video!, project.name)}
                        className="flex-shrink-0 w-60 sm:w-72 md:w-80 aspect-video rounded-xl overflow-hidden border border-slate-200/80 dark:border-white/10 bg-slate-100 dark:bg-black/50 ring-1 ring-slate-200/50 dark:ring-white/5 cursor-pointer hover:ring-2 hover:ring-teal-500/50 dark:hover:ring-teal-400/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 dark:focus-visible:ring-teal-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-black transition-shadow"
                        aria-label={`Play ${project.name} demo video`}
                      >
                        <video
                          src={project.video}
                          className="w-full h-full object-cover pointer-events-none"
                          muted
                          loop
                          autoPlay
                          playsInline
                          aria-hidden
                        />
                      </button>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <a
              href="https://github.com/parbhatkapila4"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-slate-600 hover:text-teal-600 dark:text-gray-400 dark:hover:text-white font-medium transition-colors"
            >
              View all projects on GitHub <Github className="w-4 h-4" />
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
