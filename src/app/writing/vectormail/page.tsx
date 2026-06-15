import type { Metadata } from "next";
import { CaseStudy, type CaseStudyData } from "@/components/CaseStudy";

export const metadata: Metadata = {
  title: "VectorMail: a semantic Gmail client on one Postgres",
  description:
    "How VectorMail keeps meaning in the same database as the mail - a vector(768) column on every Email row - and gives reading, writing, and automation their own guarded rails, because those three operations have wildly different blast radii.",
  alternates: { canonical: "https://www.parbhat.dev/writing/vectormail" },
  openGraph: {
    title: "VectorMail: a semantic Gmail client on one Postgres",
    description:
      "Reads, writes, and automation each run on their own guarded rail. Embeddings live on the Email row in pgvector - no separate vector store, one consistency domain.",
    url: "https://www.parbhat.dev/writing/vectormail",
    type: "article",
  },
};

const data: CaseStudyData = {
  slug: "vectormail",
  title: "VectorMail: a semantic Gmail client on one Postgres",
  tagline:
    "Reads, writes, and automation each run on their own guarded rail. Email is a database problem with an AI surface, not the reverse.",
  live: "https://vectormail.space/",
  source: "https://github.com/parbhatkapila4/Vector-Mail",
  metrics: [
    { value: "768", label: "dim vector on every Email row" },
    { value: "1 DB", label: "inbox + embeddings, no vector store" },
    { value: "3 rails", label: "read · write · automate, each guarded" },
    { value: "Dry-run", label: "automation default" },
  ],
  blocks: [
    {
      kind: "section",
      heading: "The problem",
      intro:
        "Email is the largest structured corpus most people own, and almost none of it is searchable by what it means.",
      paras: [
        "\"The invoice Sarah flagged last week\" is a trivially human query and a hopeless keyword query - the words invoice and flagged may appear nowhere in the thread. Semantic retrieval is the obvious fix, but it drags two harder problems behind it: where the vectors live, and what happens when AI touches the outbound path instead of just the read path.",
        "Most \"AI email\" products get both wrong. They bolt a chat box onto a mail client and let the model draft and send with no gate, which turns a hallucination into a delivered message. And they stand up a separate vector database next to the system of record, which means dual writes, re-embedding drift, and tenant scoping enforced in two places instead of one.",
        "VectorMail is built on the opposite bet: keep meaning in the same database as the mail, and give reading, writing, and automating their own rails with their own guarantees - because those three operations have wildly different blast radii.",
      ],
    },
    {
      kind: "quote",
      text: "Email is a database problem with an AI surface, not the reverse.",
    },
    {
      kind: "section",
      heading: "Thesis: one stack, one database",
      intro:
        "Embeddings live on the Email row as a vector(768) column, and search is a parameterized $queryRaw using pgvector's <=> cosine operator, scoped by accountId in the same WHERE clause that enforces tenancy.",
      paras: [
        "There is no separate vector store, no sync job between the system of record and an index, no second place to get scoping wrong. The usual objection is that a dedicated vector DB scales further. True at billions of vectors - irrelevant at per-account email volume, where the working set is thousands of rows behind an accountId filter.",
        "What you give up in theoretical ANN throughput you get back in having exactly one consistency domain: when a thread is deleted or re-labeled, its vectors are already gone, because they were never anywhere else. When an embedding is missing, the query degrades to text search rather than failing.",
      ],
    },
    {
      kind: "flow",
      heading: "Architecture",
      intro:
        "A request flows in one direction. Gmail is reached only through Aurinko, so OAuth, delta sync, send, and labels are one integration surface. The three AI surfaces sit on top of the same tables.",
      caption:
        "Sync acquires the per-account lock, then writes threads and emails into Postgres; analysis jobs attach summaries and the vector(768) embedding out of band via Inngest. Every read past this point goes through authoriseAccountAccess, so tenancy is resolved once, server-side.",
      lanes: [
        {
          label: "Integration - one surface",
          nodes: [
            { label: "Gmail", sub: "via Aurinko only" },
            { label: "Per-account lock", sub: "one sync at a time" },
            { label: "Postgres", sub: "threads + emails" },
            { label: "Inngest", sub: "summary + vector(768)" },
          ],
        },
        {
          label: "Read - resolved once, server-side",
          nodes: [
            { label: "authoriseAccountAccess", sub: "tenancy gate" },
            { label: "AI Search", sub: "queries embeddings" },
            { label: "Buddy", sub: "drafts + moderation" },
            { label: "Automation", sub: "ActionExecution rows", accent: true },
          ],
        },
      ],
    },
    {
      kind: "section",
      heading: "Two AI surfaces, one inbox",
      intro:
        "Reading and writing get different rails because a bad read shows you the wrong email and a bad write sends one.",
      bullets: [
        {
          lead: "AI Search - the read rail",
          text:
            "It classifies intent (search / summarize / select), answers with a deterministic Sources footer (subject, sender, date, snippet) so every claim is traceable, and keeps lightweight session memory so \"summarize that one\" resolves. It is instructed never to invent amounts or dates and never to offer to send.",
        },
        {
          lead: "Buddy - the write rail, guarded twice",
          text:
            "A topic gate runs a regex blacklist on the user's pre-augmentation message - math, code, recipes, trivia, weather all bounce before a token reaches the model. Then, immediately before Account.sendEmail, subject and body pass through containsOutgoingViolation(): word-boundary patterns for slurs, threats, sexual violence, CSAM, drug trade, and fraud.",
        },
        {
          lead: "The model is upstream of the gate",
          text: "It is not trusted to be the gate.",
        },
      ],
    },
    {
      kind: "flow",
      heading: "The write rail is guarded twice",
      intro:
        "Buddy drafts and sends. Because a bad write is a delivered message, the model sits between two deterministic gates it cannot talk its way past.",
      caption:
        "The topic gate runs a regex blacklist on the user's pre-augmentation message; containsOutgoingViolation() checks the final subject and body with word-boundary patterns immediately before send. The model is upstream of the gate, not trusted to be the gate.",
      lanes: [
        {
          label: "Buddy - write path",
          nodes: [
            { label: "User message", sub: "pre-augmentation" },
            { label: "Topic gate", sub: "regex blacklist" },
            { label: "Model drafts", sub: "subject + body" },
            { label: "containsOutgoingViolation()", sub: "word-boundary patterns" },
            { label: "Account.sendEmail", sub: "only if clean", accent: true },
          ],
        },
      ],
    },
    {
      kind: "flow",
      heading: "Automation: simulate by default",
      intro:
        "Automation has three modes on the account - manual, assist, auto - and every automated action is an ActionExecution row that is dryRun by default.",
      caption:
        "assist parks the action in awaiting_approval until a human confirms; auto requires explicit opt-in plus a running worker. An idempotencyKey @unique makes double-execution a database error rather than a duplicate send, and the Inngest handler runs at concurrency 1 per execution.",
      lanes: [
        {
          label: "Modes",
          nodes: [
            { label: "manual", sub: "no automation" },
            { label: "assist", sub: "awaiting_approval" },
            { label: "auto", sub: "opt-in + worker" },
          ],
        },
        {
          label: "Every action - three things before it's allowed to exist",
          nodes: [
            { label: "ActionExecution", sub: "dryRun by default" },
            { label: "idempotencyKey @unique", sub: "double-fire = DB error" },
            { label: "Inngest concurrency 1", sub: "per execution" },
            { label: "Executed once", sub: "", accent: true },
          ],
        },
      ],
    },
    {
      kind: "grid",
      heading: "Why this is hard",
      items: [
        {
          title: "Sync correctness is the whole game",
          lines: [
            "The lock (up to a 30-minute wait/TTL, Upstash → ioredis → in-memory) is the easy part.",
            "Completion was originally inferred from \"has a delta token,\" so an account whose token was set early would stall with months of mail missing.",
            "Completion is now an explicit inboxBackfilledAt timestamp, set only when the list walk reaches the oldest message; an un-backfilled inbox is not delegated to the background worker.",
          ],
        },
        {
          title: "Idempotent ingestion",
          lines: [
            "Every email upserts by Email.internetMessageId @unique.",
            "Provider redeliveries, retried syncs, and overlapping delta windows converge on one row instead of duplicating threads.",
          ],
        },
        {
          title: "Automation that cannot double-fire",
          lines: [
            "ActionExecution.idempotencyKey @unique plus per-execution Inngest concurrency of 1 means a retry storm produces a uniqueness violation, not three sent emails.",
            "Permanent failures land in a FailedJob DLQ keyed by (jobType, resourceId).",
          ],
        },
        {
          title: "Search that degrades instead of erroring",
          lines: [
            "Search falls back to text search on three conditions: a zero query embedding, zero vector hits, or any pgvector error.",
            "Search returning weaker results beats search throwing.",
          ],
        },
        {
          title: "Bounded AI spend",
          lines: [
            "Per-user limiters (60 searches/min, 100 AI calls/min) cap rate.",
            "AI_DAILY_CAP_TOKENS caps daily cost by summing input+output tokens from the AiUsage table before each call.",
          ],
        },
        {
          title: "Gmail mangles plaintext",
          lines: [
            "Buddy drafts are plain text; sent naively, Gmail collapses them into one unbroken block.",
            "Before send, the body is converted to inline-styled HTML - \\n\\n to <p>, numbered lines to <ol>, **bold** to <strong>.",
          ],
        },
      ],
    },
    {
      kind: "grid",
      heading: "Design decisions & tradeoffs",
      items: [
        {
          title: "pgvector over a dedicated vector DB",
          lines: [
            "Why: one consistency domain; tenancy is a WHERE clause.",
            "Tradeoff: not billion-vector ANN - acceptable at per-account scale.",
          ],
        },
        {
          title: "Sync on user action, no background polling",
          lines: [
            "Why: stays inside Aurinko/Gmail rate limits, no idle load.",
            "Tradeoff: not live; relies on first-sync plus manual sync.",
          ],
        },
        {
          title: "AI is optional",
          lines: [
            "Why: the default deploy runs with zero AI keys - connect, sync, list, send all work.",
            "Tradeoff: without keys, search degrades to text and compose/summaries are off.",
          ],
        },
        {
          title: "In-memory lock fallback",
          lines: [
            "Why: a single instance runs with no Redis dependency.",
            "Tradeoff: multi-instance coordination requires Redis.",
          ],
        },
        {
          title: "Dry-run automation by default",
          lines: [
            "Why: safety over autonomy.",
            "Tradeoff: real autosend needs explicit opt-in and a running worker.",
          ],
        },
      ],
    },
    {
      kind: "grid",
      heading: "Failure modes",
      items: [
        {
          title: "Redis down or unreachable",
          lines: [
            "Lock acquisition retries for up to 30 minutes, then throws.",
            "Once Redis is selected there is no silent downgrade to the in-memory lock - failing loud beats running two syncs.",
          ],
        },
        {
          title: "Inngest down or unconfigured",
          lines: [
            "Sync and inbox reads are unaffected.",
            "Scheduled sends and embedding/summary jobs queue until it returns.",
          ],
        },
        {
          title: "LLM provider down",
          lines: [
            "Compose and summaries surface errors.",
            "Search falls back to text so the read path keeps working.",
          ],
        },
        {
          title: "Aurinko rate limit / auth error",
          lines: [
            "The account's needsReconnection flag is set.",
            "The UI prompts a reconnect.",
          ],
        },
        {
          title: "Cron not firing",
          lines: [
            "Due ScheduledSend rows stay pending until the next successful tick.",
            "No send is lost, just delayed.",
          ],
        },
        {
          title: "Embedding job fails repeatedly",
          lines: [
            "5 retries with exponential backoff, then a FailedJob DLQ entry keyed by (jobType, resourceId).",
            "The email stays text-searchable until re-enqueued.",
          ],
        },
      ],
    },
    {
      kind: "grid",
      heading: "Security model",
      items: [
        {
          title: "Auth & scoping",
          lines: [
            "Clerk; protectedProcedure on tRPC; middleware guards /mail and /buddy.",
            "Every mail query passes through authoriseAccountAccess(accountId, userId) - no cross-tenant reads.",
          ],
        },
        {
          title: "Outbound safety",
          lines: [
            "Buddy topic gate on the pre-augmentation message.",
            "containsOutgoingViolation() before send.",
          ],
        },
        {
          title: "Cost / abuse",
          lines: ["Per-user rate limits.", "AI_DAILY_CAP_TOKENS."],
        },
        {
          title: "Headers",
          lines: [
            "X-Frame-Options DENY, X-Content-Type-Options nosniff, Referrer-Policy, Permissions-Policy, HSTS.",
            "A CSP with frame-ancestors none.",
          ],
        },
        {
          title: "Inputs & SQL",
          lines: [
            "Zod on every tRPC input.",
            "No raw SQL except the parameterized pgvector similarity query.",
          ],
        },
        {
          title: "Tokens at rest",
          lines: [
            "Optional AES-256-GCM envelope encryption of stored account tokens.",
            "Enabled when TOKEN_ENCRYPTION_KEY is set.",
          ],
        },
      ],
    },
    {
      kind: "section",
      heading: "Demo mode as an architectural commitment",
      intro:
        "The demo isn't a fixture set behind a feature flag.",
      paras: [
        "The tRPC context rewrites ctx.auth.userId to DEMO_USER_ID, and every account-scoped procedure resolves demo data through the same isDemoCall check - no forked controllers, no parallel demo router.",
        "A demo that runs through the production resolver exercises the production auth and account-scoping path; if scoping were broken, the demo would leak too.",
      ],
    },
    {
      kind: "section",
      heading: "Testing",
      intro:
        "Testing concentrates on the rails where a mistake is expensive - the read/write/automate guards and the semantic layer - at the unit level, with the landing flow covered in a real browser.",
      bullets: [
        {
          lead: "Unit and eval coverage",
          text:
            "156 Jest tests cover the utilities, the automation-hardening guards, and an eval suite for intent detection, with the database and Clerk mocked so the logic is tested in isolation.",
        },
        {
          lead: "End-to-end on the landing flow",
          text: "8 Playwright tests drive the landing experience in a real browser.",
        },
        {
          lead: "The deliberate tradeoff",
          text:
            "No integration tests against a live Postgres - the suite mocks at the database layer - and no CI workflow runs the tests automatically yet.",
        },
      ],
    },
  ],
};

export default function VectorMailWriteup() {
  return <CaseStudy data={data} />;
}
