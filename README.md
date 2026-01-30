# Parbhat Kapila — Full-Stack AI Engineer (Available for Hire)

**Shipping production RAG systems, vector search, and real-time data pipelines.**  
3+ years building AI-powered SaaS from zero to deployed. Looking for full-time remote roles at seed/Series A startups.

📧 **parbhat@parbhat.dev** · 🔗 **[parbhat.dev](https://parbhat.dev)** · 💼 **Available for hire**

---

**What I build:** Internal AI tools (RAG, semantic search, document processing) and data-heavy SaaS (real-time sync, analytics, cost-optimized LLM pipelines).

**What I'm looking for:** Founding/early engineer roles at US/EU startups where I can own systems end-to-end — from schema design through monitoring and incident response. Remote.

**Why hire me:**
- I ship complete systems, not just features: auth, billing, monitoring, error handling, docs
- I've debugged production issues and fixed root causes, not just symptoms
- I design for cost-per-query and optimize from data, not guesses
- I write docs and maintainable code because I've had to operate my own systems for years

---

## Proof of Work

Since you can't see private activity, here's what's verifiable:

| **Metric** | **Evidence** |
|------------|--------------|
| **Systems in production** | 3 live products (Sentinel, RepoDocs, Visura) — all deployed, monitored, and maintained. Live links and repo links below. |
| **Stack breadth** | Next.js (App Router), TypeScript, PostgreSQL, pgvector, Redis, OpenRouter, LangChain, Stripe, GitHub API — see project sections and repo `package.json` files. |
| **Production practices** | Health checks, structured logging with request IDs, retry + backoff for external APIs, graceful degradation when dependencies fail. |
| **Performance** | Optimized for low-latency APIs (caching, indexing, connection pooling); semantic search with pgvector + HNSW; batch processing for document ingestion. |
| **Cost efficiency** | Chunk deduplication via content hashing to reuse embeddings; Redis caching to avoid redundant LLM calls; multi-provider routing (OpenRouter) for model selection. |
| **GitHub** | [github.com/parbhatkapila4](https://github.com/parbhatkapila4) — public repos for Sentinel, RepoDocs, Visura. Active in Next.js, TypeScript, PostgreSQL, RAG tooling. |

**Why this matters:** These aren't side projects. Each one has auth, integrations, error handling, and documentation — the kind of work that proves I can ship and maintain systems.

---

## Project deep-dives

### Sentinel | Pipeline intelligence

**The problem:** CRMs show deal status but don't predict which deals are at risk of stalling. Sales teams find out too late.

**What I built:** A system that ingests live pipeline data (webhooks + sync), models time decay and stage velocity, and surfaces at-risk deals with explainable risk scores — so teams know *why* a deal is flagged. Built for low-latency queries and real-time updates.

**Technical highlights:**
- PostgreSQL + Prisma for type-safe queries; Redis for cached risk scores; indexed time-series on deal stage transitions for fast temporal queries
- Idempotent webhook handler with event deduplication, retry with exponential backoff, and queue-based processing so bursts don't block the API
- Explainable scoring: each risk score includes which factors contributed (e.g. "stalled in negotiation 3 weeks", "no engagement 7 days")
- Health checks, graceful degradation when CRM/calendar APIs fail, structured logging with request IDs for debugging

**Why this was hard:** Keeping risk scores fresh under real-time webhook load while staying within latency bounds required careful caching and indexing; handling duplicate and out-of-order events without corrupting state required idempotency and clear event semantics.

**Live demo:** [sentinels.in](https://www.sentinels.in) · **Code:** [github.com/parbhatkapila4/Sentinel](https://github.com/parbhatkapila4/Sentinel)

---

### RepoDocs | Engineering infrastructure

**The problem:** Onboarding to new codebases is slow when docs are missing or stale. Engineers waste time searching or asking the wrong person.

**What I built:** A system that indexes code at file/function level, embeds with a vector model, and answers questions from *retrieved context only* — with file:line citations so every answer is verifiable. Built to demonstrate RAG with strict hallucination control.

**Technical highlights:**
- pgvector for similarity search; Redis for hot queries; top-k retrieval then LLM synthesis from only those chunks (no general knowledge)
- Citation tracking: every response includes source paths and line numbers; LLM instructed to say "I don't know" when context is insufficient
- GitHub OAuth + webhooks for repo access and re-indexing on push; Stripe for usage-based billing; background jobs for large-repo indexing
- Designed to reduce onboarding time by giving citation-backed answers so engineers can verify in code

**Why this was hard:** Keeping citations accurate and coherent required constraining the LLM to retrieved context only and validating that cited files/lines exist; scaling indexing to large repos required chunking strategy and background job design.

**Live demo:** [repodoc.parbhat.dev](https://repodoc.parbhat.dev) · **Code:** [github.com/parbhatkapila4/RepoDocs](https://github.com/parbhatkapila4/RepoDocs)

---

### Visura | Document RAG at scale

**The problem:** Naive RAG re-embeds every chunk and burns budget. Document sets have repeated or near-duplicate content.

**What I built:** A document RAG system that chunks PDFs/text, computes content hashes before embedding, and reuses embeddings when the hash matches — so duplicate or near-duplicate chunks don't trigger redundant API calls. Built to keep AI cost under control while maintaining answer quality.

**Technical highlights:**
- Hash-based chunk deduplication: compute content hash before embedding; if hash exists in DB, reuse embedding instead of calling the API
- pgvector + HNSW for fast approximate similarity search; LangChain for RAG orchestration; GPT-4 for QA with retrieved context only (citation-backed)
- Batch processing and background jobs for document ingestion; designed for throughput on large document sets
- Redis for caching; PostgreSQL for metadata and chunk hashes; constrained LLM to retrieved context to minimize hallucination

**Why this was hard:** Designing a hashing strategy that caught duplicates without over-deduplicating (and losing nuance) required domain judgment; keeping ingestion fast and correct under batching required careful ordering and error handling.

**Live demo:** [visura.parbhat.dev](https://visura.parbhat.dev) · **Code:** [github.com/parbhatkapila4/Visura](https://github.com/parbhatkapila4/Visura)

---

## What I'm actually good at (with proof)

**RAG in production**
- Built 3 different RAG systems with different chunking strategies (semantic, fixed-size, hybrid) and retrieval patterns
- Implemented vector search with pgvector and HNSW indexing; used OpenAI embeddings and OpenRouter for model orchestration
- Added citation tracking so answers include source file:line; constrained LLM to retrieved context only to reduce hallucination
- RepoDocs and Visura repos show actual implementation (chunking, embedding, retrieval, synthesis)

**Cost optimization**
- Implemented chunk deduplication via content hashing (Visura) so identical/similar chunks reuse embeddings
- Added Redis and in-memory caching to avoid redundant API calls across projects
- Used OpenRouter for multi-provider routing and model selection by task (e.g. Gemini for code, GPT-4 for critical paths)
- Designed systems to track and minimize LLM API cost per operation where applicable

**Production operations**
- Application-level health checks and structured logging with request IDs; retry logic with exponential backoff for external API failures
- Deployed on Vercel and similar platforms; configured for production (env, secrets, error handling)
- Graceful degradation when CRM, GitHub, or embedding APIs fail; clear error handling at API boundaries
- No invented uptime % — I focus on health checks, logging, and debuggability so issues can be found and fixed

**Real-time systems**
- Built idempotent webhook handlers with event deduplication (Sentinel); queue-based processing for burst traffic
- Async and background job processing for indexing and document ingestion (RepoDocs, Visura)
- Database indexing and query patterns for time-series and vector search; connection pooling and caching for latency

**Full-stack execution**
- Auth: OAuth (GitHub), session management, API patterns used across projects
- Billing: Stripe integration for usage-based billing (RepoDocs)
- APIs: RESTful patterns, error responses, and clear resource modeling; see repo structure and route design

---

## How I work (remote-first since 2022)

**Communication style:**
- Async-first: I document decisions, write clear tickets, and don't need hand-holding
- I ask questions when blocked, not after days of being stuck
- I write PRs that explain *why*, not just *what* changed

**Code practices:**
- I write testable code with clear separation of concerns; see repo READMEs for setup, deployment, and run instructions
- I document setup, env vars, and common issues so others (and future me) can run and debug
- I refactor as I go because I've had to maintain my own code for years

**Ownership mindset:**
- I ship features and also think about: monitoring, error handling, cost, performance, docs
- I've debugged production issues — I know the difference between fixing symptoms and root causes
- I don't just say "it works on my machine"; I test edge cases and failure modes where it matters

**What I need from a team:**
- Clear problem definition (I can figure out how to build it)
- Feedback loops (code review, design review, retros)
- Trust to own my work end-to-end

**What you get:**
- An engineer who ships complete systems, not just features
- Someone who thinks about users, cost, and maintenance — not just "make it work"
- A team member who documents, keeps code maintainable, and doesn't leave messes for others

---

## Interview me on these

I'm not just listing buzzwords. Here are real questions I can answer in depth:

**On RAG systems:**
- How do you prevent hallucinations when context is incomplete?
- What's your chunking strategy and why? (I've tried multiple approaches across projects)
- How do you handle citation tracking without breaking answer coherence?
- What's the tradeoff between embedding quality and cost?

**On production operations:**
- Walk me through how you debug a "slow query" issue in production
- How do you handle webhook failures and retries without creating duplicates?
- What's your approach to monitoring and alerting?
- How do you optimize database queries under load?

**On cost optimization:**
- How do you track per-user or per-query LLM costs?
- What's your approach to caching and deduplication?
- How do you choose between GPT-4, Claude, and Gemini for different tasks?

**On system design:**
- How do you handle rate limiting when calling external APIs?
- What's your approach to error handling and graceful degradation?
- How do you design for reliability when you can't control dependencies?

These aren't theoretical — I've solved these problems in the repos above.

---

## Hiring info

**Parbhat Kapila** — Full-stack engineer, 3 years independent development, now looking for full-time remote startup roles.

**What I want:**
- **Company stage:** Seed to Series A, US/EU-based startups
- **Role:** Founding engineer or early backend/full-stack hire where I own systems
- **Team size:** Prefer smaller teams (&lt;20) where I have high ownership
- **Tech fit:** RAG/AI tooling, data pipelines, internal tools, SaaS infrastructure

**What I don't want:**
- Body shops or agencies that bill me out
- Roles where I'm only implementing tickets with no design input
- Companies with no technical leadership (I need to learn from someone)

**Red flags I watch for:**
- Job posts with "we're like a family" or "hustle culture" (often means no work-life balance)
- No eng leadership on founding team (means I'll be figuring out everything alone)

**How to reach me:**
- **Email:** parbhat@parbhat.dev (best)
- **LinkedIn:** [linkedin.com/in/parbhat-kapila](https://www.linkedin.com/in/parbhat-kapila/)
- **Response time:** Within 24 hours for serious inquiries

**What makes a good first email:**
- Tell me about the problem you're solving and why it matters
- Tell me about the team (who will I work with? who will I learn from?)
- Tell me about the role (what will I own? what's the growth path?)
- Don't send a generic "we saw your profile" message

I reply to every thoughtful email, even if it's not a fit.

---

## This repo (portfolio site)

**Live:** [parbhat.dev](https://parbhat.dev)

This repo is the source for my portfolio site - built for SEO, link previews, and fast load.

**Quick start:**
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000). Production: `npm run build` → `npm start`.

**Stack:**

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | Next.js 16 (App Router) | SSR, metadata API, sitemap/robots, Vercel-optimized |
| UI | React 19, TypeScript, Tailwind 4 | Type safety, fast iteration, small bundle |
| Motion | Motion (Framer) | Declarative animations, reduced-motion support |
| Theming | next-themes | System-aware light/dark, no flash |
| Analytics | PostHog | Product + eng metrics, privacy-conscious |
| Hosting | Vercel | Edge, instant deploys, zero config for Next |

**What's in this repo:**
- **SEO:** Meta title/description, Open Graph, Twitter Cards, sitemap, robots.txt, canonical URL, dedicated `/opengraph-image.jpg` for link previews
- **Accessibility:** Skip link, semantic sections, focus states, reduced motion respected
- **Performance:** Static generation, minimal client JS, fast load
- **DX:** ESLint, TypeScript, single `npm run dev` to run locally

---

## License

Private. All rights reserved.
