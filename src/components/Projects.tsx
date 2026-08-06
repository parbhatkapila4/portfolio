"use client";

import { useState, useEffect } from "react";
import { useReducedMotion } from "motion/react";
import Link from "next/link";
import { Github, Play, ArrowUpRight, ArrowRight } from "lucide-react";
import { useLenis } from "lenis/react";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";
import { VideoModal } from "./VideoModal";

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
  const [imgLoaded, setImgLoaded] = useState(!poster);

  return (
    <div className="absolute inset-0 bg-[#0d0d0f]">
      {poster && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={poster}
          alt=""
          aria-hidden
          onLoad={() => setImgLoaded(true)}
          className="absolute inset-0 h-full w-full scale-[1.03] object-cover opacity-[0.8] blur-[2px] transition-opacity duration-500 group-hover/v:opacity-[0.95]"
        />
      )}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/95 via-[#0a0a0a]/70 to-[#0a0a0a]/30"
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07] mix-blend-soft-light"
        style={{ backgroundImage: COVER_GRAIN, backgroundSize: "140px 140px" }}
      />
      <div
        aria-hidden
        className={`absolute inset-0 overflow-hidden transition-opacity duration-700 ${
          imgLoaded ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.04] to-transparent motion-safe:animate-[shimmer_2s_ease-in-out_infinite]" />
      </div>

      <div className="absolute inset-x-0 top-0 flex items-center justify-between px-5 py-4 font-mono text-[0.5625rem] uppercase tracking-[0.2em] text-white/40 sm:px-7 sm:py-5 sm:text-[0.625rem] sm:tracking-[0.26em]">
        <span>Product walkthrough</span>
        <span className="hidden items-center gap-2 sm:flex">
          <span className="inline-block h-1 w-1 rounded-full bg-white/60" />
          {domain}
        </span>
      </div>

      <div className="absolute inset-0 flex flex-col justify-center gap-4 px-5 sm:gap-6 sm:px-10 lg:px-12">
        <h3 className="font-display max-w-[24ch] text-left text-[clamp(1.35rem,4vw,2.4rem)] font-semibold leading-[1.1] tracking-[-0.025em] text-white">
          {hook}
        </h3>
        <span className="inline-flex items-center gap-3 sm:gap-3.5">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md transition-all duration-300 group-hover/v:bg-white group-hover/v:text-black sm:h-14 sm:w-14">
            <Play className="h-4 w-4 translate-x-px sm:h-5 sm:w-5" fill="currentColor" />
          </span>
          <span className="inline-flex items-center gap-2 whitespace-nowrap font-mono text-[0.625rem] uppercase tracking-[0.14em] text-white/60 transition-colors duration-300 group-hover/v:text-white sm:text-[0.6875rem] sm:tracking-[0.2em]">
            Watch the Loom walkthrough
            <ArrowRight className="h-3 w-3 shrink-0 transition-transform duration-300 group-hover/v:translate-x-1" />
          </span>
        </span>
      </div>

      <div className="absolute bottom-0 right-0 hidden px-6 py-5 font-mono text-[0.625rem] uppercase tracking-[0.24em] text-white/30 sm:block sm:px-7">
        {name}
      </div>
    </div>
  );
}

const projectLink =
  "group/l link-underline inline-flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted transition-colors hover:text-[var(--foreground)]";

const Projects = () => {
  const reduce = useReducedMotion();
  const lenis = useLenis();
  const [videoOpen, setVideoOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState("");
  const [currentProjectName, setCurrentProjectName] = useState("");
  const [currentPoster, setCurrentPoster] = useState<string | undefined>(undefined);

  const handleVideoOpen = (videoSrc: string, projectName: string, poster?: string) => {
    setCurrentVideo(videoSrc);
    setCurrentProjectName(projectName);
    setCurrentPoster(poster);
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
      <section id="projects" className="px-6 py-28 sm:px-10 md:py-36 lg:px-14">
        <div className="mx-auto w-full max-w-[87.5rem]">
          <SectionHeader index="02" label="Selected Work" title="Production AI systems, engineered & operated." />
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-md text-[0.9375rem] leading-relaxed text-muted sm:text-base">
              Measurable outcomes, live in production - architected, deployed, and maintained independently.
            </p>
          </Reveal>

          <div className="mt-16 sm:mt-24">
            {projects.map((project, idx) => (
              <Reveal
                as="article"
                key={project.name}
                className="group/card border-t border-line py-14 last:border-b sm:py-20"
              >
                <div>
                  <span aria-hidden className="font-mono text-[0.6875rem] tabular-nums text-faint">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div className="mt-4 flex flex-wrap items-baseline gap-x-8 gap-y-4">
                    <h3 className="font-display text-[clamp(2.7rem,7.5vw,6.2rem)] font-bold uppercase leading-[0.9] tracking-[-0.03em]">
                      {project.name}
                    </h3>
                    <p className="font-mono text-[0.625rem] uppercase tracking-[0.22em] text-muted">
                      {project.category}
                    </p>
                  </div>
                </div>

                <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-10 lg:mt-14 lg:grid-cols-12">
                  <div className="lg:col-span-7">
                    <p className="max-w-[58ch] text-[0.9375rem] leading-relaxed text-muted sm:text-base">
                      {project.description}
                    </p>
                    <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3">
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className={projectLink}>
                        <Github className="h-3.5 w-3.5" /> Source
                        <ArrowUpRight className="h-3 w-3 opacity-50 transition-transform duration-300 group-hover/l:translate-x-0.5 group-hover/l:-translate-y-0.5" />
                      </a>
                      {project.writeup && (
                        <Link
                          href={project.writeup}
                          className="group/l link-underline link-underline-active inline-flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-[var(--foreground)]"
                        >
                          Read the deep-dive
                          <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover/l:translate-x-0.5" />
                        </Link>
                      )}
                      <a href={project.url} target="_blank" rel="noopener noreferrer" className={projectLink} aria-label={`Open ${project.name}`}>
                        Visit
                        <ArrowUpRight className="h-3 w-3 opacity-50 transition-transform duration-300 group-hover/l:translate-x-0.5 group-hover/l:-translate-y-0.5" />
                      </a>
                    </div>

                    <div className="mt-10 grid grid-cols-1 gap-6 border-t border-line pt-8 sm:grid-cols-2 sm:gap-8">
                      <div>
                        <p className="font-mono text-[0.625rem] uppercase tracking-[0.22em] text-faint">Before</p>
                        <p className="mt-2.5 text-sm leading-relaxed text-muted">{project.before}</p>
                      </div>
                      <div>
                        <p className="font-mono text-[0.625rem] uppercase tracking-[0.22em] text-[var(--foreground)]">After</p>
                        <p className="mt-2.5 text-sm leading-relaxed text-[var(--foreground)]/90">{project.after}</p>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-4 lg:col-start-9">
                    <dl>
                      {project.metrics.map((m, mi) => (
                        <div
                          key={m.label}
                          className={`flex items-baseline justify-between gap-6 py-4 ${mi > 0 ? "border-t border-line" : "pt-0"}`}
                        >
                          <dt className="font-display text-lg font-semibold tracking-[-0.015em] tabular-nums sm:text-xl">{m.value}</dt>
                          <dd className="text-right font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-muted sm:text-[0.625rem]">{m.label}</dd>
                        </div>
                      ))}
                    </dl>
                    <p className="mt-4 border-t border-line pt-6 font-mono text-[0.6875rem] leading-[2.1] tracking-[0.02em] text-muted">
                      {project.tech.map((t, ti) => (
                        <span key={t}>
                          <span className="whitespace-nowrap">{t}</span>
                          {ti < project.tech.length - 1 && (
                            <span aria-hidden className="px-1.5 text-faint">{" · "}</span>
                          )}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>

                {project.video && (
                  <button
                    type="button"
                    onClick={() =>
                      handleVideoOpen(
                        project.video!,
                        project.name,
                        project.writeup ? `/covers/${project.writeup.split("/").pop()}.jpg` : undefined
                      )
                    }
                    className="group/v relative mt-12 block aspect-[4/3] w-full overflow-hidden border border-line bg-[#0d0d0f] transition-colors hover:border-line-strong focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-current sm:aspect-video"
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
                          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-black shadow-lg backdrop-blur transition-transform duration-300 group-hover/v:scale-110 sm:h-20 sm:w-20">
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

          <div className="mt-14">
            <a
              href="https://github.com/parbhatkapila4"
              target="_blank"
              rel="noopener noreferrer"
              className="group link-underline inline-flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted transition-colors hover:text-[var(--foreground)]"
            >
              View all projects on GitHub
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </section>

      <VideoModal
        isOpen={videoOpen}
        onClose={handleVideoClose}
        videoSrc={currentVideo}
        projectName={currentProjectName}
        poster={currentPoster}
      />
    </>
  );
};

export default Projects;
