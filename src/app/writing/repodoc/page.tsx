import type { Metadata } from "next";
import { CaseStudy, type CaseStudyData } from "@/components/CaseStudy";

export const metadata: Metadata = {
  title: "RepoDoc: codebase RAG built as infrastructure",
  description:
    "How RepoDoc retrieves over what each file means (not what it says), models indexing as a durable Postgres lease queue that survives the serverless wall, and meters every token against a per-project budget.",
  alternates: { canonical: "https://www.parbhat.dev/writing/repodoc" },
  openGraph: {
    title: "RepoDoc: codebase RAG built as infrastructure",
    description:
      "Embed what a file means, not what it says. The database is the queue. Cost is a runtime constraint, not a dashboard.",
    url: "https://www.parbhat.dev/writing/repodoc",
    type: "article",
  },
};

const data: CaseStudyData = {
  slug: "repodoc",
  title: "RepoDoc: codebase RAG built as infrastructure",
  tagline:
    "Retrieval runs over what each file means, indexing is a durable Postgres lease queue, and every token is metered against a per-project budget.",
  live: "https://repodoc.parbhat.dev",
  source: "https://github.com/parbhatkapila4/repodoc",
  metrics: [
    { value: "768", label: "dim embedding per file summary" },
    { value: "top-5", label: "pgvector retrieval + top-3 memory" },
    { value: "5-min", label: "lease per indexing job" },
    { value: "402", label: "returned on a project over budget" },
  ],
  blocks: [
    {
      kind: "section",
      heading: "The problem",
      intro:
        "Most of the work in understanding a codebase isn't reading the file you have open - it's finding the three files you didn't know to open.",
      paras: [
        "Onboarding to an unfamiliar repo means reconstructing a mental model that lives nowhere: which module owns auth, where the rate limit is configured, what actually runs on a cron. Grep finds strings; it doesn't find concepts. Documentation, when it exists, drifts from the code the day after it's written.",
        "\"RAG over a codebase\" is the obvious answer and the obvious trap. The demo is easy: chunk the files, embed the chunks, retrieve top-k, call an LLM. It falls apart on real repos for reasons that have nothing to do with prompting. Raw code embeds lexically - variable names and syntax - so a query like \"how does authentication work\" retrieves whatever file happens to share tokens with the question, not the file that implements the concept. And ingesting a whole repository is a systems problem, not a model problem: it has to survive serverless time limits, partial failures, and the fact that an LLM call per file turns \"index this repo\" into an unbounded bill.",
      ],
    },
    {
      kind: "quote",
      text: "Grep finds strings; it doesn't find concepts.",
    },
    {
      kind: "section",
      heading: "The thesis",
      intro:
        "RepoDoc takes four opinionated positions, and they're the reason it behaves differently from a generic RAG wrapper.",
      bullets: [
        {
          lead: "Embed what a file means, not what it says",
          text:
            "During indexing, each file is summarized by an LLM into a ≤100-word description of its purpose, and that summary is embedded - gemini-embedding-001 at 768 dimensions - not the raw source. Retrieval is then a cosine search over intent against pgvector, top-5. The cost is an extra LLM call per file at index time and a dependency on summary quality; the payoff is that \"where are rate limits configured\" retrieves the rate limiter even when the query shares no tokens with it.",
        },
        {
          lead: "The database is the queue",
          text:
            "Indexing is modeled as an IndexingJob row in Postgres with a lease, not as a call to SQS or Redis or BullMQ. A worker claims a job with an atomic compare-and-swap, holds a five-minute lease, and releases it on completion or failure. One datastore, transactional with the data it indexes, no extra infrastructure to operate.",
        },
        {
          lead: "Cost is a runtime constraint, not a dashboard",
          text:
            "Every AI request writes a QueryMetrics row (model, tokens, latency, estimated USD, retrieval and memory counts, cold-start and cache flags, success/error). A project can set monthlyCostLimitUsd; when it's exceeded, a query returns 402 and in-flight indexing pauses itself and requeues. Spend is bounded in the hot path, not reconciled after the bill arrives.",
        },
        {
          lead: "Durable repo memory, separate from retrieval",
          text:
            "RepoDoc extracts facts from each Q&A exchange into a RepoMemory store and pulls the top matches back as secondary context on later questions - capturing intent and decisions that live in conversations, not in any file. It's labeled distinctly from code, under one rule: when memory and code conflict, the code wins.",
        },
      ],
    },
    {
      kind: "flow",
      heading: "Indexing: the database is the queue",
      intro:
        "Indexing is a job, not a request. Triggers enqueue an IndexingJob; a worker claims it atomically and processes the repo file by file.",
      caption:
        "Triggers: on project create, on a query against an unindexed project, and a daily Vercel cron (0 6 * * *). claimJob is a conditional updateMany that flips queued/stale-processing → processing and trusts the claim only when res.count === 1 - a compare-and-swap on the row, no advisory locks.",
      lanes: [
        {
          label: "Triggers",
          nodes: [
            { label: "Project create" },
            { label: "Query vs unindexed" },
            { label: "Daily cron", sub: "0 6 * * *" },
          ],
        },
        {
          label: "Claim - exactly once",
          nodes: [
            { label: "claimJob", sub: "conditional updateMany" },
            { label: "res.count === 1", sub: "CAS, no locks" },
            { label: "5-min lease", sub: "held while working" },
          ],
        },
        {
          label: "Per file",
          nodes: [
            { label: "GithubRepoLoader", sub: "walk repo" },
            { label: "Summarize", sub: "≤100 words" },
            { label: "Embed", sub: "768d" },
            { label: "Store", sub: "Postgres + pgvector", accent: true },
          ],
        },
      ],
    },
    {
      kind: "flow",
      heading: "Query: grounded answer, or a pre-index fallback",
      intro:
        "Every query passes the same gate. If the project has no embeddings yet, RepoDoc answers from a live GitHub fetch instead of making the user wait for a full index.",
      caption:
        "If embeddings == 0, the pre-index path live-fetches up to 22 high-value files (READMEs, configs, entrypoints) straight from the GitHub tree, answers now with preindex: true, and kicks the worker. Otherwise it retrieves pgvector top-5 plus RepoMemory top-3, grounds the answer with cited sources, and writes a QueryMetrics row.",
      lanes: [
        {
          label: "Gate",
          nodes: [
            { label: "POST /api/query" },
            { label: "auth" },
            { label: "rate-limit" },
            { label: "ownership" },
            { label: "budget" },
          ],
        },
        {
          label: "Indexed path",
          nodes: [
            { label: "pgvector top-5", sub: "+ RepoMemory top-3" },
            { label: "OpenRouter", sub: "gemini-2.5-flash" },
            { label: "Cited answer", sub: "+ metrics, cache, memory", accent: true },
          ],
        },
        {
          label: "Pre-index path - embeddings == 0",
          nodes: [
            { label: "Live-fetch ≤22 files", sub: "READMEs, configs" },
            { label: "Answer now", sub: "preindex: true" },
            { label: "Kick worker", sub: "index in background", accent: true },
          ],
        },
      ],
    },
    {
      kind: "flow",
      heading: "Surviving the serverless wall",
      intro:
        "A large repo can't be indexed in one 60-second invocation, and a worker can die mid-job. Both are handled by the same lease + cursor mechanism.",
      caption:
        "The worker time-boxes itself (WORKER_BUDGET_MS); when it runs out it writes a resumeAfter cursor, requeues, and re-kicks, so indexing makes forward progress across many short runs. A job stuck in processing with lockedAt older than five minutes is reclaimable - @@index([status, lockedAt]) makes finding it cheap - and resumes from its cursor.",
      lanes: [
        {
          label: "Timing out gracefully",
          nodes: [
            { label: "WORKER_BUDGET_MS", sub: "time-box" },
            { label: "resumeAfter cursor", sub: "write progress" },
            { label: "Requeue + re-kick", sub: "next invocation", accent: true },
          ],
        },
        {
          label: "Recovering a dead worker",
          nodes: [
            { label: "Lease expires", sub: "lockedAt > 5 min" },
            { label: "Next worker reclaims", sub: "@@index(status, lockedAt)" },
            { label: "Resume from cursor", sub: "no re-embedding", accent: true },
          ],
        },
      ],
    },
    {
      kind: "section",
      heading: "Why this is hard",
      bullets: [
        {
          lead: "Claiming a job exactly once under concurrent workers",
          text:
            "claimJob is a conditional updateMany - it flips queued/stale-processing → processing and trusts the claim only when res.count === 1. Two workers that wake on the same job can't both win; it's a compare-and-swap on the row, no advisory locks.",
        },
        {
          lead: "Surviving the serverless 60-second wall",
          text:
            "Indexing a large repo can't finish in one invocation. The worker time-boxes itself, and when it runs out it writes a resumeAfter cursor, requeues the job, and re-kicks - so indexing makes forward progress across many short runs instead of dying at the platform timeout.",
        },
        {
          lead: "Recovering a dead worker without double-processing",
          text:
            "A lease is five minutes. A job stuck in processing with lockedAt older than that is reclaimable; @@index([status, lockedAt]) makes finding it cheap. A crashed worker's job is picked up by the next one and resumed from its cursor.",
        },
        {
          lead: "Being useful before indexing finishes",
          text:
            "queryCodebasePreindex fetches up to 22 high-value files (READMEs, configs, entrypoints) straight from the GitHub tree and answers from those, flagging the response preindex: true, while kicking the indexer in the background.",
        },
        {
          lead: "Bounding spend mid-flight",
          text:
            "isProjectOverBudget short-circuits queries to 402, and the indexer checks budget between files - a job that would blow the limit pauses rather than running the meter up.",
        },
      ],
    },
    {
      kind: "grid",
      heading: "Design decisions & tradeoffs",
      items: [
        {
          title: "Embed LLM summaries, not raw code",
          lines: [
            "Why: code embeds lexically; intent is what you query by.",
            "Tradeoff: an LLM call per file at index time, and retrieval is only as good as the summaries.",
          ],
        },
        {
          title: "Postgres as the job queue (lease + CAS)",
          lines: [
            "Why: one transactional datastore, nothing extra to run.",
            "Tradeoff: polling, not push; not built for very high job throughput.",
          ],
        },
        {
          title: "OpenRouter as the single chat gateway",
          lines: [
            "Why: route models per task without SDK churn, one billing surface - gemini-2.5-flash for chat, gemini-2.5-pro for README generation, Claude Haiku for docs.",
            "Tradeoff: an extra network hop and no native multi-provider failover.",
          ],
        },
        {
          title: "Budget enforced in the request path and mid-index",
          lines: [
            "Why: AI cost is unbounded by default; a ceiling has to be live to matter.",
            "Tradeoff: a hard limit can interrupt indexing, which is why jobs are resumable.",
          ],
        },
        {
          title: "Rate limiting and secret encryption fail open",
          lines: [
            "Why: for a single-operator product, a Redis blip or an unset key shouldn't 500 every request.",
            "Tradeoff: a deliberately weaker posture under those failures - documented, not hidden.",
          ],
        },
      ],
    },
    {
      kind: "grid",
      heading: "Failure modes",
      items: [
        {
          title: "Worker dies mid-index",
          lines: [
            "Its lease expires after five minutes; the next worker reclaims the job and resumes from the resumeAfter cursor.",
            "No stuck jobs, no re-embedding from scratch.",
          ],
        },
        {
          title: "Serverless invocation times out",
          lines: [
            "The time-box requeues with a cursor before the platform kills the function.",
            "Indexing continues on the next invocation.",
          ],
        },
        {
          title: "Project queried before it's indexed",
          lines: [
            "The pre-index path answers from live GitHub fetches.",
            "The result is marked preindex: true.",
          ],
        },
        {
          title: "Project exceeds its budget",
          lines: [
            "Queries return 402 with a clear message.",
            "Running indexing pauses and requeues instead of overspending.",
          ],
        },
        {
          title: "Redis unavailable / provider error",
          lines: [
            "The rate limiter falls back to a per-instance in-memory window.",
            "During indexing, each summary and embedding is retried twice with backoff; a persistent failure marks the job failed with the error string, surfaced in the UI for retry.",
          ],
        },
      ],
    },
    {
      kind: "grid",
      heading: "Security model",
      items: [
        {
          title: "Auth",
          lines: [
            "Clerk middleware guards everything except an explicit public allow-list; each API route re-checks the session and returns 401.",
            "Project access is scoped by owner and deletedAt: null on every query.",
          ],
        },
        {
          title: "Input & SQL",
          lines: [
            "Zod validates request bodies; Prisma parameterizes all queries.",
            "The only raw SQL is the pgvector similarity search and embedding writes - both parameter-bound.",
          ],
        },
        {
          title: "Secrets at rest",
          lines: [
            "Stored GitHub tokens are encrypted with AES-256-GCM in an envelope format, keyed by ENCRYPTION_KEY.",
            "If ENCRYPTION_KEY is unset, the code falls back to storing plaintext so the app keeps working - set the key in every environment to actually get encryption.",
          ],
        },
        {
          title: "Webhooks",
          lines: [
            "The Clerk webhook verifies the svix HMAC signature and rejects on mismatch.",
            "The cron worker route authorizes with a constant-time (timingSafeEqual) shared-secret check.",
          ],
        },
        {
          title: "Billing webhook",
          lines: [
            "The Gumroad billing webhook authenticates with a constant-time shared-secret check and maps a product permalink to a plan.",
            "Auto-downgrades to Starter on refund, chargeback, or cancellation.",
          ],
        },
        {
          title: "Rate limiting",
          lines: [
            "Per-identity fixed-window limiting, preferring the platform-set x-real-ip over the spoofable x-forwarded-for.",
            "Returns 429 with Retry-After; it fails open under store failure.",
          ],
        },
      ],
    },
    {
      kind: "section",
      heading: "Testing",
      intro:
        "The suite is small and pointed - it covers the three places where a regression would be silent and expensive - and it runs in CI on every change.",
      bullets: [
        {
          lead: "What's covered",
          text:
            "20 Jest unit tests across three files exercise the query gate, the GitHub loader, and the RAG retrieval - Clerk, Prisma, Octokit, and the RAG layer mocked so each unit is tested in isolation.",
        },
        {
          lead: "Gated in CI",
          text:
            "GitHub Actions runs the suite (test:ci) on every push and pull request to main, so a regression in those paths blocks the merge rather than reaching production.",
        },
        {
          lead: "The deliberate tradeoff",
          text:
            "No integration tests against a live database and no end-to-end suite - everything is mocked at the boundaries, kept intentionally lightweight for a single-operator project.",
        },
      ],
    },
  ],
};

export default function RepoDocWriteup() {
  return <CaseStudy data={data} />;
}
