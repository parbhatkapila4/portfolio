export const RESUME_URL =
  "https://drive.google.com/file/d/1yLBv09AeSbMJHbw1-eOdo1abWDFux8mj/view?usp=drive_link";
export const GITHUB_USER = "parbhatkapila4";
export const GITHUB_URL = `https://github.com/${GITHUB_USER}`;
export const LINKEDIN_URL = "https://www.linkedin.com/in/parbhat-kapila/";
export const X_URL = "https://x.com/Parbhat03";
export const EMAIL = "parbhat@parbhat.work";
export const CAL_LINK = "https://cal.com/parbhat.kapila/10min";

export type ProjectEntry = {
  id: string;
  name: string;
  status: string;
  category: string;
  beforeAfter?: string;
  description: string;
  metrics: { value: string; label: string }[];
  url: string;
  github: string;
  writeup: string;
  video: string;
};

export const projects: ProjectEntry[] = [
  {
    id: "sentinel",
    name: "Sentinel",
    status: "LIVE",
    category: "Revenue Intelligence · Permission Layer",
    beforeAfter:
      "Most revenue tools ingest everything and filter later → Sentinel ingests nothing unless your CRM already knows someone on the thread, and fails closed when the lookup breaks.",
    description:
      "A revenue-intelligence backend whose first question is what it's even allowed to read. Email, calendar, and chat are ingested only when a participant matches a contact synced from your CRM - read-only, fail-closed, and PII-blind.",
    metrics: [
      { value: "CRM match", label: "required on every inbound item" },
      { value: "Fail-closed", label: "on any lookup error" },
      { value: "Read-only", label: "never writes to the CRM" },
      { value: "2,200+", label: "tests" },
    ],
    url: "https://www.sentinels.in/",
    github: "https://github.com/parbhatkapila4/Sentinel",
    writeup: "/writing/sentinel",
    video: "https://lcbcrithcxdbqynfmtxk.supabase.co/storage/v1/object/public/Videos/Loom-Sentinel.mp4",
  },
  {
    id: "cutline",
    name: "Cutline",
    status: "LIVE",
    category: "AI Video Pipeline · 11-12 Stage Director",
    beforeAfter:
      "Most AI video tools hand back a storyboard → Cutline hands back the finished MP4.",
    description:
      "One sentence in, one finished MP4 out - directed by a pipeline of up to 12 stages per slideshow, not a template engine. It infers audience, goal, tone, and arc; plans 1-3 shots per story beat, with more beats for longer videos; sources or generates imagery; composes the render. No templates, no creative knobs.",
    metrics: [
      { value: "11-12 stages", label: "per fresh slideshow render" },
      { value: "1st sale", label: "Sep 2026, inbound" },
      { value: "SHA-256", label: "avatar cache in Redis" },
      { value: "Event-keyed", label: "payment webhook dedup" },
    ],
    url: "https://cutline.cloud",
    github: "https://github.com/parbhatkapila4/Cutline",
    writeup: "/writing/cutline",
    video: "https://lcbcrithcxdbqynfmtxk.supabase.co/storage/v1/object/public/Videos/Loom-Cutline.mp4",
  },
  {
    id: "repodoc",
    name: "RepoDoc",
    status: "LIVE",
    category: "Codebase RAG · Indexing Infrastructure",
    beforeAfter:
      "Naive code RAG embeds syntax → RepoDoc embeds what each file does, and the database is the queue, so a timeout resumes instead of restarting.",
    description:
      "Ask an unfamiliar repo questions and get grounded, cited answers. Retrieval runs over what each file means - LLM summaries embedded, not raw code - indexing is a durable Postgres lease queue that survives serverless limits, and each answer's estimated model cost is recorded per project.",
    metrics: [
      { value: "5-min", label: "job leases" },
      { value: "45s", label: "work budget under a 60s cap" },
      { value: "5 retries", label: "before a job dies" },
      { value: "1 tarball", label: "per pass, pinned to a commit" },
    ],
    url: "https://repodoc.parbhat.dev",
    github: "https://github.com/parbhatkapila4/repodoc",
    writeup: "/writing/repodoc",
    video: "https://lcbcrithcxdbqynfmtxk.supabase.co/storage/v1/object/public/Videos/Loom-Repodoc-1.mp4",
  },
  {
    id: "vectormail",
    name: "VectorMail",
    status: "LIVE, INVITE-ONLY",
    category: "Email Agent · Rules Decide, LLM Drafts",
    beforeAfter:
      "Most email AI drafts and hopes → deterministic rules decide, the model only writes, and dry-run is the default.",
    description:
      "Reads your inbox, drafts follow-ups, and sends them. Deterministic rules pick the threads: a reminder is due, or the last message came from an external sender and you haven't replied. Rules also decide whether each follow-up sends, waits for your approval, or is dropped; the LLM only writes the draft. Inbox and embeddings live in one Postgres, with no separate vector store.",
    metrics: [
      { value: "One DB", label: "inbox and vectors" },
      { value: "Dry-run", label: "by default" },
      { value: "2 gates", label: "before an AI reply sends" },
      { value: "Tenancy", label: "in the same WHERE clause" },
    ],
    url: "https://vectormail.space/",
    github: "https://github.com/parbhatkapila4/Vector-Mail",
    writeup: "/writing/vectormail",
    video: "https://lcbcrithcxdbqynfmtxk.supabase.co/storage/v1/object/public/Videos/Loom-Vectormail.mp4",
  },
];

export const experience = {
  title: "AI Systems Engineer",
  org: "Independent / Engineering for early-stage startups · Remote",
  description: [
    "Full ownership of system design, feature delivery, reliability, and iteration - everything here built, deployed, and maintained by me.",
    "Owned backend services, data stores, AI pipelines, and deployment infrastructure, including authentication, payments, and third-party integrations. Debugged production incidents, performance bottlenecks, and scaling limits while deploying continuously without breaking live systems.",
  ],
  tech: ["Next.js", "TypeScript", "PostgreSQL", "Redis", "OpenAI", "pgvector", "Docker", "AWS"],
};

export const openSource = {
  title: "Open Source Contributor",
  org: "Remotion · Temporal",
  description: "Fixes I found in other people's codebases and got merged.",
  prs: [
    {
      pkg: "@remotion/lambda-client",
      summary: "Lambda now counts input props size in bytes, not characters.",
      href: "https://github.com/remotion-dev/remotion/pull/12260",
    },
    {
      pkg: "@remotion/lambda-client",
      summary: "getCompositionsOnLambda defaults envVariables so it no longer breaks without them.",
      href: "https://github.com/remotion-dev/remotion/pull/12284",
    },
    {
      pkg: "@remotion/serverless",
      summary: "On Lambda, a retried streamed chunk is no longer merged twice into the final video.",
      href: "https://github.com/remotion-dev/remotion/pull/12337",
    },
    {
      pkg: "@remotion/renderer",
      summary: "Renderer: two artifacts with the same filename on the same frame are now rejected.",
      href: "https://github.com/remotion-dev/remotion/pull/12446",
    },
    {
      pkg: "@remotion/lambda",
      summary: "Lambda: a retried stream that replays an artifact no longer fails the render.",
      href: "https://github.com/remotion-dev/remotion/pull/12452",
    },
    {
      pkg: "temporalio",
      summary: "Activity heartbeats stay in order when payload encoding is slow.",
      href: "https://github.com/temporalio/sdk-python/pull/1977",
    },
  ],
};

export const stack: { title: string; tools: string[] }[] = [
  { title: "Frontend (Product UI)", tools: ["TypeScript", "React", "Next.js (App Router)", "Tailwind CSS", "Remotion"] },
  { title: "Backend & APIs", tools: ["Node.js", "tRPC", "Zod", "WebSockets", "Dodo Payments", "Clerk", "Better Auth"] },
  { title: "AI Systems (Production)", tools: ["OpenAI", "Claude", "Gemini", "OpenRouter", "RAG pipelines", "pgvector"] },
  { title: "Data & Infrastructure", tools: ["PostgreSQL", "Prisma", "Redis", "BullMQ", "Object Storage (S3)"] },
  { title: "Cloud & Deployment", tools: ["AWS", "Docker", "Vercel", "CI/CD (GitHub Actions)"] },
  { title: "Architecture & Practices", tools: ["Distributed systems", "Event-driven design", "Multi-tenant SaaS", "Cost optimization"] },
];

export const about = [
  "Live products - all engineered and operated by me, no team behind them.",
  "Most of my work is RAG and LLM infrastructure - retrieval, vector storage, and model routing.",
  "Looking for a full-time, early-stage role where I own real systems and deliver without hand-holding.",
];

export const contact = {
  heading: "Let's work together.",
  text: "Open to full-time roles at early-stage, AI-first startups: remote on US/EU hours, in-office in Bengaluru, or relocating to Germany. Hand me the problem and the constraints, and I'll take it from design through deploy and on-call.",
  channels: [
    { label: "Schedule", value: "Book a 10-min call", href: CAL_LINK, external: true },
    { label: "Email", value: EMAIL, href: `mailto:${EMAIL}`, external: false },
    { label: "LinkedIn", value: "in/parbhat-kapila", href: LINKEDIN_URL, external: true },
    { label: "Twitter", value: "@Parbhat03", href: X_URL, external: true },
  ],
};
