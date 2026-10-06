import type { Metadata } from "next";
import Link from "next/link";
import { Grain } from "@/components/Grain";
import { Reveal } from "@/components/Reveal";
import {
  WritingEntries,
  type WritingEntryItem,
} from "@/components/WritingEntries";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Case studies on production AI systems by Parbhat Kapila - Sentinel, CUTLINE, RepoDoc, and VectorMail.",
  alternates: { canonical: "https://www.parbhat.dev/writing" },
};

const entries: WritingEntryItem[] = [
  {
    slug: "sentinel",
    name: "Sentinel",
    subtitle: "CRM is the permission layer",
    tagline:
      'Revenue-intelligence runs on the most sensitive data a company holds. So the first question isn\'t "what model scores the deal" - it\'s "what are we even allowed to read?"',
    field: "Permission Layer",
    year: "2026",
    video:
      "https://lcbcrithcxdbqynfmtxk.supabase.co/storage/v1/object/public/Videos/Loom-Sentinel.mp4",
  },
  {
    slug: "cutline",
    name: "CUTLINE",
    subtitle: "a director, not a template engine",
    tagline:
      "One sentence in, one finished MP4 out - directed by a pipeline of up to 12 stages per slideshow, not a template engine. The pipeline commits the editorial decisions before it touches a frame.",
    field: "AI Video Pipeline",
    year: "2026",
    video:
      "https://lcbcrithcxdbqynfmtxk.supabase.co/storage/v1/object/public/Videos/Loom-Cutline.mp4",
  },
  {
    slug: "repodoc",
    name: "RepoDoc",
    subtitle: "codebase RAG built as infrastructure",
    tagline:
      "Retrieval runs over what each file means, indexing is a durable Postgres lease queue, and each answer's estimated model cost is recorded per project.",
    field: "Codebase RAG",
    year: "2026",
    video:
      "https://lcbcrithcxdbqynfmtxk.supabase.co/storage/v1/object/public/Videos/Loom-Repodoc-1.mp4",
  },
  {
    slug: "vectormail",
    name: "VectorMail",
    subtitle: "rules decide, the LLM only drafts",
    tagline:
      "Reads the inbox, drafts follow-ups, and sends them. Deterministic rules decide, the LLM only drafts, and automation is dry-run by default.",
    field: "Email Agent",
    year: "2026",
    video:
      "https://lcbcrithcxdbqynfmtxk.supabase.co/storage/v1/object/public/Videos/Loom-Vectormail.mp4",
  },
];

export default function WritingPage() {
  return (
    <main className="relative min-h-screen px-6 md:px-10 lg:px-16">
      <Grain />

      <div className="mx-auto flex max-w-[73.75rem] items-center justify-between py-6">
        <Link
          href="/"
          className="font-display text-[0.9375rem] font-semibold tracking-[-0.01em] transition-opacity hover:opacity-70"
        >
          Parbhat Kapila
        </Link>
        <Link
          href="/#projects"
          className="group link-underline inline-flex items-center gap-2 font-mono text-[0.625rem] uppercase tracking-[0.22em] text-muted transition-colors hover:text-[var(--foreground)]"
        >
          <span
            aria-hidden
            className="inline-block h-px w-4 shrink-0 bg-current opacity-60 transition-[width] duration-300 group-hover:w-7"
          />
          Work
        </Link>
      </div>

      <div className="mx-auto max-w-[73.75rem] pb-28 pt-14 sm:pt-20">
        <Reveal immediate>
          <p className="flex items-baseline justify-between border-t border-line pt-5 font-mono text-[0.625rem] uppercase tracking-[0.3em]">
            <span className="text-muted">Writing</span>
            <span className="tabular-nums text-faint">
              {String(entries.length).padStart(2, "0")}
            </span>
          </p>
        </Reveal>
        <Reveal delay={0.08} immediate>
          <h1 className="font-display mt-10 text-[clamp(2.6rem,7vw,5.6rem)] font-semibold leading-[0.98] tracking-[-0.04em]">
            Case studies.
          </h1>
        </Reveal>

        <WritingEntries entries={entries} />
      </div>
    </main>
  );
}
