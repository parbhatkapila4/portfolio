"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import Link from "next/link";
import { Github, Play, Pause, X, ArrowUpRight, ArrowRight, Volume2, VolumeX, Maximize, Minimize, Check } from "lucide-react";
import { useLenis } from "lenis/react";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";

type Project = {
  name: string;
  category: string;
  description: string;
  before: string;
  after: string;
  metrics: { value: string; label: string }[];
  tech: string[];
  url: string;
  github: string;
  writeup?: string;
  video?: string;
  lazyVideo?: boolean;
  coverHook?: string;
};

const projects: Project[] = [
  {
    name: "Sentinel",
    category: "Revenue Intelligence · Permission Layer",
    description: "A revenue-intelligence backend whose first question is what it's even allowed to read. Email, calendar, and chat are ingested only when a participant matches a contact synced from your CRM - read-only, fail-closed, and PII-blind, with encrypted per-integration tokens.",
    before: "Every revenue tool runs on a company's most sensitive data - email, calendar, chat. Ingest everything and it's a surveillance liability; gate it by hand and coverage rots within a month.",
    after: "Binds ingestion to a boundary the business already maintains: the CRM contact book. A message is stored only if a participant matches a synced contact - everything else is dropped, fail-closed, without logging an address. Across Gmail, Calendar, and Slack, with read-only HubSpot and Salesforce sync.",
    metrics: [
      { value: "CRM", label: "Permission layer" },
      { value: "Read-only", label: "Never writes back" },
      { value: "Fail-closed", label: "On any error" },
      { value: "Encrypted", label: "Tokens at rest" },
    ],
    tech: ["Next.js 16", "TypeScript", "PostgreSQL", "Prisma", "Clerk", "Upstash Redis", "OpenRouter", "Sentry"],
    url: "https://www.sentinels.in/",
    github: "https://github.com/parbhatkapila4/Sentinel",
    writeup: "/writing/sentinel",
    video: "https://lcbcrithcxdbqynfmtxk.supabase.co/storage/v1/object/public/Videos/Loom-Sentinel.mp4",
    lazyVideo: true,
    coverHook: "AI on your team's inbox, without the surveillance liability.",
  },
  {
    name: "CUTLINE",
    category: "AI Video Pipeline · 12-Stage Director",
    description: "One sentence in, one finished MP4 out - directed by a 12-stage pipeline, not a template engine. It infers audience, goal, tone, and arc; plans 8-12 shots; sources or generates imagery; composes the render. No templates, no creative knobs.",
    before: `"AI video" tools automate the cut, not the call. Same pan, same stock photo, same captions. A prompt box bolted to a template - generic in, generic out.`,
    after: "A director layer makes the editorial calls before a frame renders. One sentence becomes audience, tone, and a shot-by-shot arc. Twelve deterministic stages - bisect a bad render, swap a provider, cap cost, per stage. Not a template engine. A system that directs.",
    metrics: [
      { value: "12 Stages", label: "Pure-function pipeline" },
      { value: "Zero", label: "Creative knobs" },
      { value: "3 Modes", label: "Talking character" },
      { value: "4-Tier", label: "Image fallback" },
    ],
    tech: ["Next.js 16", "TypeScript", "Remotion", "BullMQ", "Redis", "Better Auth", "Neon Postgres", "Stripe", "Google VEO", "HeyGen", "ElevenLabs"],
    url: "https://cutline.cloud",
    github: "https://github.com/parbhatkapila4/Cutline",
    writeup: "/writing/cutline",
    video: "https://lcbcrithcxdbqynfmtxk.supabase.co/storage/v1/object/public/Videos/Loom-Cutline.mp4",
    lazyVideo: true,
    coverHook: "One sentence in. A finished video out.",
  },
  {
    name: "RepoDoc",
    category: "Codebase RAG · Indexing Infrastructure",
    description: "Ask an unfamiliar repo questions and get grounded, cited answers. Retrieval runs over what each file means - LLM summaries embedded, not raw code - indexing is a durable Postgres lease queue that survives serverless limits, and every token is metered against a per-project budget.",
    before: "Grep finds strings, not concepts. Naive 'RAG over code' embeds syntax, not meaning - and runs up an unbounded indexing bill.",
    after: "Embeds what each file means, not what it says. The database is the queue - exactly-once, leased, resumable across timeouts. Budgets cap spend mid-index. Infrastructure, not a RAG wrapper.",
    metrics: [
      { value: "Exactly-once", label: "Lease + CAS jobs" },
      { value: "Self-resuming", label: "Survives timeouts" },
      { value: "Cost-capped", label: "Per-project budget" },
      { value: "Intent-based", label: "Meaning, not syntax" },
    ],
    tech: ["Next.js 16", "TypeScript", "PostgreSQL", "pgvector", "Prisma", "OpenRouter", "Gemini", "Clerk", "Upstash Redis", "Zod"],
    url: "https://repodoc.parbhat.dev",
    github: "https://github.com/parbhatkapila4/repodoc",
    writeup: "/writing/repodoc",
    video: "https://lcbcrithcxdbqynfmtxk.supabase.co/storage/v1/object/public/Videos/Loom-Repodoc-1.mp4",
    lazyVideo: true,
    coverHook: "Ask any codebase. Get a cited answer.",
  },
  {
    name: "VectorMail",
    category: "Semantic Search · Email",
    description: "Search your whole inbox by meaning - describe a thread and it surfaces, even with none of the original words. Connects Gmail through Aurinko, syncs every thread, and runs semantic search on pgvector, with inbox and embeddings in one database - no separate vector store. Replies compose with full thread context.",
    before: "Every inbox still searches by keyword. You remember the gist of a thread, not the exact words - so you scroll forever, or never find it.",
    after: "Semantic search across 10k+ threads on pgvector - ask for 'the pricing thread,' get it instantly. Inbox and embeddings in one Postgres, no separate vector store. AI drafts replies with full thread context.",
    metrics: [
      { value: "Sub-second", label: "10k+ emails" },
      { value: "One DB", label: "inbox + vectors" },
      { value: "By meaning", label: "not keywords" },
      { value: "AI compose", label: "thread context" },
    ],
    tech: ["Next.js 15", "TypeScript", "tRPC", "Prisma", "PostgreSQL", "pgvector", "Clerk", "Aurinko", "OpenRouter", "Gemini"],
    url: "https://vectormail.space/",
    github: "https://github.com/parbhatkapila4/Vector-Mail",
    writeup: "/writing/vectormail",
    video: "https://lcbcrithcxdbqynfmtxk.supabase.co/storage/v1/object/public/Videos/Loom-Vectormail.mp4",
    lazyVideo: true,
    coverHook: "Find any email by what it means, not what it says.",
  },
];

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];
const SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 2];

function fmtTime(s: number) {
  if (!Number.isFinite(s) || s < 0) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

function VideoPlayer({ src }: { src: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const rateRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [rate, setRate] = useState(1);
  const [rateOpen, setRateOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const [isFs, setIsFs] = useState(false);

  useEffect(() => {
    const onFs = () => setIsFs(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  useEffect(() => {
    if (!rateOpen) return;
    const onDown = (e: MouseEvent) => {
      if (rateRef.current && !rateRef.current.contains(e.target as Node)) setRateOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [rateOpen]);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => { });
    else v.pause();
  };
  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };
  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const v = videoRef.current;
    if (!v || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    v.currentTime = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)) * duration;
  };
  const changeRate = (r: number) => {
    const v = videoRef.current;
    if (v) v.playbackRate = r;
    setRate(r);
    setRateOpen(false);
  };
  const toggleFs = () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else wrapRef.current?.requestFullscreen?.();
  };

  const progress = duration ? (current / duration) * 100 : 0;
  const ctrlBtn = "flex h-8 w-8 items-center justify-center text-white/75 transition-colors hover:text-white";

  return (
    <div ref={wrapRef} className="group/player relative flex items-center justify-center bg-black">
      <video
        ref={videoRef}
        src={src}
        autoPlay
        playsInline
        onClick={togglePlay}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(e) => setCurrent(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onLoadedData={() => setReady(true)}
        onPlaying={() => setReady(true)}
        onError={() => setReady(true)}
        className={`block w-full cursor-pointer object-contain ${isFs ? "h-screen max-h-screen" : "max-h-[74vh]"}`}
      >
        Your browser does not support the video tag.
      </video>

      {!ready && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black">
          <span className="h-8 w-8 animate-spin rounded-full border-2 border-white/15 border-t-white/70" />
        </div>
      )}

      {ready && !playing && (
        <button
          onClick={togglePlay}
          aria-label="Play"
          className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm transition-transform duration-300 hover:scale-105"
        >
          <Play className="h-6 w-6 translate-x-0.5" fill="currentColor" />
        </button>
      )}

      <div
        className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent px-4 pb-3.5 pt-16 transition-opacity duration-300 ${playing ? "opacity-0 group-hover/player:opacity-100" : "opacity-100"
          }`}
      >
        <div onClick={seek} className="group/bar relative flex h-3 cursor-pointer items-center" aria-hidden>
          <div className="h-[3px] w-full bg-white/20">
            <div className="relative h-full bg-white" style={{ width: `${progress}%` }}>
              <span className="absolute right-0 top-1/2 h-2.5 w-2.5 -translate-y-1/2 translate-x-1/2 rounded-full bg-white opacity-0 transition-opacity group-hover/bar:opacity-100" />
            </div>
          </div>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <button onClick={togglePlay} aria-label={playing ? "Pause" : "Play"} className="text-white/90 transition-colors hover:text-white">
              {playing ? <Pause className="h-5 w-5" fill="currentColor" /> : <Play className="h-5 w-5 translate-x-px" fill="currentColor" />}
            </button>
            <span className="font-mono text-[11px] tabular-nums text-white/65">
              {fmtTime(current)} <span className="text-white/30">/</span> {fmtTime(duration)}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button onClick={toggleMute} aria-label={muted ? "Unmute" : "Mute"} className={ctrlBtn}>
              {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </button>

            <div ref={rateRef} className="relative">
              <button
                onClick={() => setRateOpen((o) => !o)}
                aria-label="Playback speed"
                className="flex h-8 min-w-[2.25rem] items-center justify-center px-1.5 font-mono text-[11px] tabular-nums text-white/75 transition-colors hover:text-white"
              >
                {rate === 1 ? "1×" : `${rate}×`}
              </button>
              {rateOpen && (
                <div className="absolute bottom-[calc(100%+0.5rem)] right-0 z-30 flex w-32 flex-col border border-white/12 bg-[#0c0c0f] p-1 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.8)]">
                  {SPEEDS.map((r) => (
                    <button
                      key={r}
                      onClick={() => changeRate(r)}
                      className={`flex items-center justify-between px-3 py-1.5 font-mono text-[11px] tabular-nums transition-colors ${rate === r ? "text-white" : "text-white/55 hover:bg-white/5 hover:text-white"
                        }`}
                    >
                      {r === 1 ? "Normal" : `${r}×`}
                      {rate === r && <Check className="h-3 w-3" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button onClick={toggleFs} aria-label={isFs ? "Exit fullscreen" : "Fullscreen"} className={ctrlBtn}>
              {isFs ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

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
        className="fixed inset-0 z-50 flex flex-col bg-black/30 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: EASE_OUT }}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={`${projectName} walkthrough video`}
      >
        <motion.div
          className="flex shrink-0 items-center justify-between px-6 py-6 sm:px-10 sm:py-8"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4, delay: 0.05, ease: EASE_OUT }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-3.5 font-mono text-[11px] uppercase tracking-[0.28em]">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-white/80 motion-safe:animate-pulse" />
            <span className="text-white/85">{projectName}</span>
            <span className="h-px w-7 bg-white/25" />
            <span className="text-white/45">Walkthrough</span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close walkthrough"
            className="group flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-white/45 transition-colors hover:text-white"
          >
            <span className="hidden sm:inline">Close</span>
            <span className="flex h-9 w-9 items-center justify-center border border-white/15 transition-all duration-300 group-hover:border-white/45 group-hover:bg-white/5">
              <X className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90" />
            </span>
          </button>
        </motion.div>

        <div className="flex flex-1 items-center justify-center px-4 pb-8 sm:px-10 sm:pb-12" onClick={onClose}>
          <motion.div
            className="relative w-full max-w-[1180px]"
            initial={{ scale: 0.96, opacity: 0, y: 14 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.97, opacity: 0, y: 14 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="overflow-hidden bg-black shadow-[0_50px_140px_-30px_rgba(0,0,0,0.9)] ring-1 ring-white/10">
              <VideoPlayer key={videoSrc} src={videoSrc} />
            </div>
            <div className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-white/30">
              Esc or click outside to close
            </div>
          </motion.div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

function coverHost(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

const COVER_GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

function VideoCover({ name, domain, hook, poster }: { name: string; domain: string; hook: string; poster?: string }) {
  const tick = "pointer-events-none absolute h-2.5 w-2.5 border-white/25";
  return (
    <div className="absolute inset-0 bg-neutral-950">
      {poster && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={poster}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full scale-110 object-cover opacity-[0.8] blur-[11px] transition-opacity duration-500 group-hover/v:opacity-[0.95]"
        />
      )}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-neutral-950/95 via-neutral-950/68 to-neutral-950/30"
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07] mix-blend-soft-light"
        style={{ backgroundImage: COVER_GRAIN, backgroundSize: "140px 140px" }}
      />
      <span aria-hidden className={`${tick} left-4 top-4 border-l border-t`} />
      <span aria-hidden className={`${tick} right-4 top-4 border-r border-t`} />
      <span aria-hidden className={`${tick} bottom-4 left-4 border-b border-l`} />
      <span aria-hidden className={`${tick} bottom-4 right-4 border-b border-r`} />

      <div className="absolute inset-x-0 top-0 flex items-center justify-between px-5 py-4 font-mono text-[9px] uppercase tracking-[0.2em] text-white/40 sm:px-7 sm:py-5 sm:text-[10px] sm:tracking-[0.26em]">
        <span>Product walkthrough</span>
        <span className="hidden items-center gap-2 sm:flex">
          <span className="inline-block h-1 w-1 rounded-full bg-white/50" />
          {domain}
        </span>
      </div>

      <div className="absolute inset-0 flex flex-col justify-center gap-4 px-5 sm:gap-6 sm:px-10 lg:px-12">
        <h3 className="max-w-[20ch] text-left font-heading text-[clamp(1.35rem,4.4vw,2.6rem)] font-semibold leading-[1.08] tracking-[-0.02em] text-white">
          {hook}
        </h3>
        <span className="inline-flex items-center gap-3 sm:gap-3.5">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-neutral-950 shadow-lg transition-transform duration-300 group-hover/v:scale-105 sm:h-14 sm:w-14">
            <Play className="h-4 w-4 translate-x-px sm:h-5 sm:w-5" fill="currentColor" />
          </span>
          <span className="inline-flex items-center gap-2 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.14em] text-white/60 transition-colors duration-300 group-hover/v:text-white sm:text-[11px] sm:tracking-[0.2em]">
            Watch the Loom walkthrough
            <ArrowRight className="h-3 w-3 shrink-0 transition-transform duration-300 group-hover/v:translate-x-1" />
          </span>
        </span>
      </div>

      <div className="absolute bottom-0 right-0 hidden px-6 py-5 font-mono text-[10px] uppercase tracking-[0.24em] text-white/30 sm:block sm:px-7">
        {name}
      </div>
    </div>
  );
}

const projectLink =
  "group/l inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-500 transition-colors hover:text-[var(--foreground)] dark:text-neutral-400";

const Projects = () => {
  const reduce = useReducedMotion();
  const lenis = useLenis();
  const [videoOpen, setVideoOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState("");
  const [currentProjectName, setCurrentProjectName] = useState("");

  const handleVideoOpen = (videoSrc: string, projectName: string) => {
    setCurrentVideo(videoSrc);
    setCurrentProjectName(projectName);
    setVideoOpen(true);
    lenis?.stop();
    document.body.style.overflow = "hidden";
  };

  const handleVideoClose = () => {
    setVideoOpen(false);
    setCurrentVideo("");
    setCurrentProjectName("");
    lenis?.start();
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
      <section id="projects" className="px-6 py-20 md:px-10 md:py-28 lg:px-16 lg:py-32">
        <div className="mx-auto w-full max-w-[1280px]">
          <SectionHeader index="02" label="Selected Work" title="Production AI systems, shipped & operated." />
          <Reveal delay={0.05}>
            <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-300 sm:text-base">
              Measurable outcomes, live in production - built, deployed, and maintained independently.
            </p>
          </Reveal>

          <div className="mt-14">
            {projects.map((project) => (
              <Reveal as="article" key={project.name} className="border-t border-black/10 py-14 dark:border-white/15 lg:py-20">
                <div className="grid grid-cols-1 gap-x-10 gap-y-8 lg:grid-cols-12">
                  <div className="lg:col-span-7">
                    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
                      {project.category}
                    </p>
                    <h3 className="font-heading mt-3 text-4xl font-semibold tracking-[-0.02em] sm:text-5xl">
                      {project.name}
                    </h3>
                    <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-300">
                      {project.description}
                    </p>
                    <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-3">
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className={projectLink}>
                        <Github className="h-3.5 w-3.5" /> Source
                        <ArrowUpRight className="h-3 w-3 opacity-50 transition-transform duration-300 group-hover/l:translate-x-0.5 group-hover/l:-translate-y-0.5" />
                      </a>
                      {project.writeup && (
                        <Link href={project.writeup} className="group/l inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--foreground)] transition-colors">
                          Read the deep-dive
                          <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover/l:translate-x-0.5" />
                        </Link>
                      )}
                      <a href={project.url} target="_blank" rel="noopener noreferrer" className={projectLink} aria-label={`Open ${project.name}`}>
                        Visit
                        <ArrowUpRight className="h-3 w-3 opacity-50 transition-transform duration-300 group-hover/l:translate-x-0.5 group-hover/l:-translate-y-0.5" />
                      </a>
                    </div>
                  </div>

                  <div className="lg:col-span-5">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-400 dark:text-neutral-500">Before</p>
                        <p className="mt-2 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">{project.before}</p>
                      </div>
                      <div className="sm:border-l sm:border-black/10 sm:pl-6 dark:sm:border-white/10">
                        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--foreground)]">After</p>
                        <p className="mt-2 text-sm font-medium leading-relaxed text-[var(--foreground)]">{project.after}</p>
                      </div>
                    </div>
                    <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-black/10 pt-6 dark:border-white/10">
                      {project.metrics.map((m) => (
                        <div key={m.label}>
                          <dt className="font-heading text-base font-semibold tabular-nums">{m.value}</dt>
                          <dd className="mt-1 font-mono text-[10px] uppercase leading-relaxed tracking-[0.14em] text-neutral-500 dark:text-neutral-400">{m.label}</dd>
                        </div>
                      ))}
                    </dl>
                    <p className="mt-6 font-mono text-[11px] leading-relaxed text-neutral-500 dark:text-neutral-400">
                      {project.tech.join("  ·  ")}
                    </p>
                  </div>
                </div>

                {project.video && (
                  <button
                    type="button"
                    onClick={() => handleVideoOpen(project.video!, project.name)}
                    className="group/v relative mt-10 block aspect-[4/3] w-full overflow-hidden border border-black/10 bg-neutral-950 transition-colors hover:border-black/30 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-current dark:border-white/15 dark:hover:border-white/30 sm:aspect-video lg:mt-14"
                    aria-label={`Play ${project.name} walkthrough video`}
                  >
                    {project.lazyVideo ? (
                      <VideoCover
                        name={project.name}
                        domain={coverHost(project.url)}
                        hook={project.coverHook ?? project.name}
                        poster={project.writeup ? `/covers/${project.writeup.split("/").pop()}.jpg` : undefined}
                      />
                    ) : (
                      <>
                        <video
                          src={project.video}
                          className="h-full w-full object-cover"
                          muted
                          loop={!reduce}
                          autoPlay={!reduce}
                          preload="auto"
                          playsInline
                          aria-hidden
                        />
                        <span className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover/v:bg-black/15">
                          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-neutral-950 shadow-lg backdrop-blur transition-transform duration-300 group-hover/v:scale-110 sm:h-20 sm:w-20">
                            <Play className="h-5 w-5 translate-x-px sm:h-6 sm:w-6" fill="currentColor" />
                          </span>
                        </span>
                      </>
                    )}
                  </button>
                )}
              </Reveal>
            ))}
          </div>

          <div className="border-t border-black/10 pt-8 dark:border-white/15">
            <a
              href="https://github.com/parbhatkapila4"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-500 transition-colors hover:text-[var(--foreground)] dark:text-neutral-400"
            >
              View all projects on GitHub
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </section>

      <VideoModal isOpen={videoOpen} onClose={handleVideoClose} videoSrc={currentVideo} projectName={currentProjectName} />
    </>
  );
};

export default Projects;
