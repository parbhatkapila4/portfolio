"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, ExternalLink, Github, Play, X } from "lucide-react";
const ProjectDesArray = [
  {
    name: "Vector Mail",
    description: "VectorMail is an AI-native email client built for startups where email is the backbone of growth. It combines seamless inbox sync, a polished three-pane UI, full-text search, and SaaS-ready architecture with AI compose, RAG-powered chat, and intelligent auto-replies that generate responses instantly. By cutting email overhead by over 50%, VectorMail transforms the inbox from a daily bottleneck into a competitive advantage for fast-moving teams.",
    url: "https://vectormail.parbhat.dev",
    github: "https://github.com/parbhatkapila4/Vector-Mail",
    video: "",
    tech: [
      "Next.js",
      "TypeScript",
      "Gmail API",
      "Gemini",
      "Stripe",
      "Prisma ORM",
      "PostgreSQL",
    ],
  },
  {
    name: "Repo Doc",
    description:
      "RepoDoc is an AI-powered GitHub documentation tool solving one of engineering’s costliest problems: outdated, unreliable docs that waste millions of developer hours. Teams lose 25% productivity and 60% onboarding time to poor docs. RepoDoc auto-generates READMEs, enables AI Q&A, and seamless sharing - cutting waste by over 50%. ",
    url: "https://repodoc.parbhat.dev/",
    github: "https://github.com/parbhatkapila4/RepoDocs",
    video: "",
    tech: [
      "Next.js",
      "OpenAI/Gemini API",
      "PostgreSQL",
      "TypeScript",
      "Prisma ORM",
      "Rag",
    ],
  },
  {
    name: "Visura AI",
    description:
      "Visura AI is an AI-powered document intelligence platform built for the speed startups need. It transforms dense PDFs into 30-second executive summaries, enables RAG-powered Q&A, and centralizes insights in a searchable hub - helping lean teams cut research time by 70% and make faster, smarter decisions. ",
    url: "https://visura.parbhat.dev/",
    github: "https://github.com/parbhatkapila4/Visura",
    video: "",
    tech: [
      "Next.js",
      "Gemini API",
      "Stripe",
      "Langchain",
      "TypeScript",
      "PostgreSQL",
    ],
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
  const [show, setShow] = useState(false);
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
          className="text-2xl font-bold mb-3"
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
              className="group relative overflow-hidden border border-white/20 rounded-xl p-6 hover:border-white/30 transition-all duration-300 hover:shadow-lg"
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <motion.h2
                      className="text-xl font-bold mb-2  transition-colors duration-300"
                      transition={{ duration: 0.2, delay: 5.8 }}
                    >
                      {project.name}
                    </motion.h2>
                  </div>
                  <div className="flex gap-2 ml-4">
                    {project.video && (
                      <motion.button
                        onClick={() => openVideo(project.video!)}
                        className="p-2 rounded-lg border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all duration-300 group/link flex items-center gap-2 text-xs font-medium"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="flex items-center gap-2">
                          <Play className="w-4 h-4 group-hover/link:scale-110 transition-transform duration-300" />
                          Product Demo
                        </span>
                      </motion.button>
                    )}

                    <motion.a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all duration-300 group/link"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink className="w-4 h-4 group-hover/link:scale-110 transition-transform duration-300" />
                    </motion.a>
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all duration-300 group/link"
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github className="w-4 h-4 group-hover/link:scale-110 transition-transform duration-300" />
                    </motion.a>
                  </div>
                </div>
                <motion.p
                  className="text-sm leading-relaxed text-white/70 group-hover:text-white/80 transition-colors duration-300"
                  transition={{ duration: 0.4, delay: 6.0 }}
                >
                  {project.description}
                </motion.p>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, techIndex) => (
                    <motion.span
                      key={`parbhat-project-tech-${techIndex}`}
                      className="px-3 py-1 text-xs font-medium rounded-full border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/30 transition-all duration-300"
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
        {ProjectDesArray.length > 2 && (
          <motion.div
            className="flex justify-center mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 6.4 }}
          >
            <motion.button
              onClick={() => setShow(!show)}
              className="flex items-center gap-2 px-6 py-3 rounded-lg border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all duration-300 group"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-sm font-medium">
                {show ? "Show Less" : `Show  More`}
              </span>
              <motion.div
                animate={{ rotate: show ? 180 : 0 }}
                transition={{ duration: 0.5 }}
              >
                <ChevronDown className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
              </motion.div>
            </motion.button>
          </motion.div>
        )}
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
              className="relative max-w-4xl w-full mx-4 bg-black/30 rounded-xl overflow-hidden border border-white/20"
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
                  className="w-full h-auto max-h-[80vh]"
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
