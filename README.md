# Parbhat Kapila - Full-Stack AI Engineer

**One person who ships and runs production AI systems.** RAG, vector search, real-time pipelines, built, deployed, and maintained. No team behind the repos; it's all verifiable.

📧 **parbhat@parbhat.dev** · 🔗 **[parbhat.dev](https://parbhat.dev)** · 💼 **Open to full-time remote (US/EU startups)**

---

## TL;DR for founders

- **Live products** you can use today: [Sentinel](https://www.sentinels.in), [Visura](https://visura.parbhat.dev), [VectorMail](https://vectormail.space). All with auth, billing, and production practices.
- **Measurable impact:** 50-80% AI cost reduction (Visura), sub-250ms risk scoring (Sentinel), semantic search across 10K+ emails (VectorMail). Not claims - implemented in the repos above.
- **Full-stack ownership:** Schema → API → frontend → monitoring. I've run these systems myself for years; I fix root causes, not symptoms.
- **Looking for:** I want to own systems entirely and ship without hand-holding.

If you need someone who can take "we need RAG / pipelines / internal AI" from zero to production and keep it running, I've done that multiple times. Open to a conversation.

---

## Why this profile is rare (and worth the rate)

Most candidates have either: shipped production code but not AI/ML, or done AI demos that never went to production. I've done both - multiple production RAG systems, real-time data pipelines, and cost-optimized LLM infra, all live in production and maintained by me.

**What you get:**

- **Ship speed.** I don't need a long ramp. I've built and operated similar systems; I know the failure modes and how to avoid them.
- **Full ownership.** Give me the problem and the constraints; I'll own design, implementation, deployment, and ops. I document and hand off cleanly when the team grows.
- **Cost-aware AI.** I've cut per-document processing from $5 to $0.05 via architecture (Visura), reduced redundant LLM calls with caching and deduplication, and used multi-provider routing so you're not locked to one vendor.
- **Production discipline.** Health checks, structured logging, retries, graceful degradation. When something breaks, I debug it and fix the cause, not the symptom.

---

## Proof of work (verifiable)

| **What**                 | **Evidence**                                                                                                                                                                     |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Live products**        | [Sentinel](https://www.sentinels.in), [Visura](https://visura.parbhat.dev), [VectorMail](https://vectormail.space). Auth, integrations, billing where relevant. All maintained. |
| **Impact metrics**       | 50-80% AI cost reduction via hash-based chunk reuse (Visura); sub-250ms risk scoring (Sentinel); semantic search across 10K+ emails (VectorMail). See project sections.          |
| **Stack**                | Next.js 15, TypeScript, PostgreSQL, pgvector, Redis, OpenRouter, Sentry, OpenTelemetry, Clerk, Stripe. Repos and `package.json` are public.                                     |
| **Production practices** | Self-healing recovery, cost guardrails, full observability (Sentry + OTel), distributed rate limiting. Focus on debuggability and automatic recovery.                             |
| **GitHub**               | [github.com/parbhatkapila4](https://github.com/parbhatkapila4) - Sentinel, Visura, VectorMail (and more). Active in RAG, vector search, and full-stack TypeScript.               |

These are not weekend projects. Each has the kind of structure (env, errors, docs, monitoring) that shows I can ship and maintain systems at startup pace.

---

## Projects (what I built and why it matters)

### Sentinel - Pipeline intelligence

**Problem:** CRMs show status, not risk. Deals stall and you find out too late.

**What I built:** Live pipeline ingestion (webhooks + sync), time-decay and stage-velocity modeling, explainable risk scores so teams see _why_ a deal is flagged. Sub-250ms, real-time.

**Why it's serious:** Idempotent webhooks, dedup, retry/backoff, queue-based processing so bursts don't kill the API. Health checks and graceful degradation when CRM/calendar APIs fail. [Live](https://www.sentinels.in) · [Code](https://github.com/parbhatkapila4/Sentinel)

---

### Visura - AI Document Intelligence

**Problem:** Reprocessing documents wastes AI budget. No visibility into costs, no recovery when things fail mid-process.

**What I built:** Enterprise-scale document intelligence platform. Hash-based chunk reuse saves 50-80% on AI costs. Self-healing processing with automatic crash recovery, full observability (Sentry + OpenTelemetry), distributed rate limiting, and cost guardrails. Vector search with 85%+ embedding cache hit rate. P50 under 2.5s for document processing.

**Why it's serious:** Versioned processing with idempotent replay, multi-layer security (HMAC signing, Clerk JWT, Zod validation), workspace collaboration with RBAC, and comprehensive monitoring. Not a demo - production architecture with real cost controls. [Live](https://visura.parbhat.dev) · [Code](https://github.com/parbhatkapila4/Visura)

---

## What I'm good at (with proof in the repos)

**RAG in production** - Multiple production systems, different chunking and retrieval strategies. Vector search (pgvector, HNSW), persistent embeddings, context-only synthesis to control hallucination. See Visura and VectorMail.

**Cost-efficient AI** - Chunk dedup (Visura), Redis and in-memory caching, OpenRouter for model routing. Track and minimize cost per query where it matters.

**Production ops** - Health checks, structured logs, retry/backoff, graceful degradation. Deployed on Vercel and similar; I've run and debugged these systems myself.

**Real-time and scale** - Idempotent webhooks, queues, background jobs, indexing at scale. Time-series and vector indexing, connection pooling, latency-aware design.

**Full-stack** - Auth (OAuth), billing (Stripe/PayPal/..), RESTful APIs, clear error handling. Entire ownership from DB to UI.

---

## How I work

- **Async-first.** I document decisions, write clear PRs (why, not just what), and don't need hand-holding.
- **Ownership.** I ship and maintain. I think about monitoring, cost, and docs because I've had to operate what I build.
- **Debugging.** I go for root cause, not workarounds. I've fixed production issues and built the practices so the next one is easier to find.
- **What I need:** Clear problem and constraints, feedback (code/design review), and trust to own my scope Entirely

---

## Deep Conversation with me on this

I'm not listing buzzwords. Here are areas I can go deep on - and have already implemented:

**RAG:** Chunking strategies, hallucination control, citation tracking, embedding vs cost tradeoffs.

**Production:** Debugging slow queries, webhook retries without duplicates, monitoring and alerting, DB performance under load.

**Cost:** Per-query LLM cost, caching and dedup, when to use GPT-4 vs Claude vs Gemini.

**System design:** Rate limiting, error handling, reliability when dependencies are outside your control.

The repos above are the evidence. Happy to walk through any of it live.

---

## What I'm looking for

**I want:** Seed to Series A, US/EU. Founding or early engineer role where I own systems. Small teams (&lt;20), high ownership. RAG, AI tooling, data pipelines, internal tools, SaaS infra.

**I don't want:** Agencies, ticket-only roles with no design input, or teams with no technical leadership to learn from.

**How to reach me:**  
**Email:** parbhat@parbhat.dev (best)  
**LinkedIn:** [linkedin.com/in/parbhat-kapila](https://www.linkedin.com/in/parbhat-kapila/)  
I reply within 24 hours to serious outreach.

**Good first email:** Problem you're solving, who I'd work with, what I'd own, and growth path. I read every thoughtful message and reply even when it's not a fit.

---

## This repo (portfolio site)

**Live:** [parbhat.dev](https://parbhat.dev)

Source for the portfolio: SEO, link previews, fast load.

```bash
npm install && npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Production: `npm run build` → `npm start`.

**Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind 4, Motion, next-themes, PostHog, Vercel. Meta/OG, sitemap, robots, accessibility (skip link, focus, reduced motion).

---

## License

Private. All rights reserved.
