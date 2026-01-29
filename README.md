# Parbhat Kapila

**Full-Stack Engineer | Production AI Systems**

---

## Overview

Independent engineer building and operating production AI systems. Owned systems from launch through ongoing maintenance, handling reliability, cost control, and scaling under real usage. Specialized in RAG architecture, vector search optimization, and production-grade AI infrastructure.

Built three production systems processing real user data, handling everything from database schema design to deployment infrastructure, monitoring, and incident response. Focus on systems that stay reliable under load, with measurable performance characteristics and controlled operational costs.

Seeking full-time engineering roles at US-based startups building AI products where technical ownership, production reliability, and architectural decision-making matter.

**Portfolio:** [parbhat.dev](https://parbhat.dev) | **LinkedIn:** [linkedin.com/in/parbhat-kapila](https://www.linkedin.com/in/parbhat-kapila/) | **Email:** [parbhat@parbhat.dev](mailto:parbhat@parbhat.dev)

---

## Production Systems

### Sentinel | Pipeline Intelligence

**Purpose:** Detects deals that are stalling before it's visible in a CRM by modeling time decay, stage velocity, and engagement signals from live pipeline data. Provides explainable risk scores so sales teams can understand why a deal is flagged.

**Problem & Approach:**
Traditional CRMs show deal status but don't predict which deals are at risk of stalling. Built a system that ingests live pipeline data, models temporal patterns (time decay, stage velocity), and combines them with engagement signals to surface at-risk deals early.

**Architecture & Technical Decisions:**

**Query Performance:**
- Sub-250ms query latency achieved through PostgreSQL with Prisma ORM for type-safe queries and Redis for caching computed risk scores
- Indexed time-series data on deal stage transitions and timestamps for fast temporal queries
- Cached risk scores with TTL based on data freshness requirements, reducing database load during peak query times
- Used connection pooling and query batching to handle concurrent requests efficiently

**Real-Time Data Sync:**
- Live sync with CRM, calendar, and webhook events using webhook endpoints that handle idempotency via event IDs
- OpenRouter integration for multi-provider LLM access, allowing fallback between providers when one is rate-limited or unavailable
- Webhook processing with retry logic and exponential backoff for transient failures
- Queue-based processing for webhook events to handle bursts without blocking the API

**Predictive Modeling:**
- Risk scoring algorithm that combines time decay (how long a deal has been in a stage), stage velocity (historical time-to-close for similar deals), and engagement signals (email opens, meeting attendance)
- Explainable signals: each risk score includes which factors contributed (e.g., "stalled in negotiation for 3 weeks", "no engagement in 7 days")
- Model runs on-demand per query rather than batch processing, trading compute cost for real-time accuracy

**Reliability:**
- 99.9% uptime under continuous sync load achieved through:
  - Retry logic with exponential backoff for external API calls (CRM, calendar APIs)
  - Backpressure handling: webhook queue limits prevent memory issues during high event volume
  - Database connection limits and query timeouts to prevent cascading failures
  - Health check endpoints for monitoring and alerting
- Error handling that gracefully degrades: if CRM sync fails, system continues serving cached data with staleness indicators

**Observability:**
- Logging for webhook processing, API latency, and error rates
- Metrics tracked: query latency (p50, p95, p99), sync success rate, cache hit rate, error rates by endpoint
- Production debugging: structured logs with request IDs for tracing issues across services

**Stack:** Next.js (App Router), TypeScript, PostgreSQL (with time-series indexing), Prisma (ORM), Redis (caching), OpenRouter (LLM orchestration), Webhooks (real-time sync)

**Repository:** [github.com/parbhatkapila4/Sentinel](https://github.com/parbhatkapila4/Sentinel)  
**Live:** [sentinels.in](https://www.sentinels.in)

---

### RepoDocs | Engineering Infrastructure

**Purpose:** Automated code documentation system that transforms repositories into queryable knowledge bases. Engineers can ask questions about codebases and get answers with citations, reducing onboarding time and enabling faster code navigation.

**Problem & Approach:**
Onboarding to new codebases is slow because documentation is often outdated or missing. Built a system that indexes code repositories, generates embeddings for semantic search, and provides a conversational interface that answers questions with source file citations to reduce hallucination.

**Architecture & Technical Decisions:**

**Semantic Search Performance:**
- Sub-1s query latency using pgvector for similarity search across code embeddings
- Indexed code at file and function level: each function gets its own embedding for granular retrieval
- Top-5 relevant file retrieval: uses cosine similarity search, then ranks by relevance score
- Redis caching for frequently asked questions to reduce database load and improve response time

**Hallucination Reduction:**
- 100% citation-backed answers: every response includes source file paths and line numbers
- Retrieval strategy: retrieves top-5 files, then uses LLM to synthesize answer from only those files (no general knowledge)
- Prompt engineering: instructs LLM to only use information from provided context, cite sources, and say "I don't know" if context is insufficient
- Validation: checks that citations in responses match actual file paths in the repository

**Cost-Effective Processing:**
- Gemini via OpenRouter for code analysis: chosen for lower cost per token compared to GPT-4 while maintaining quality for code understanding tasks
- Incremental indexing: only re-indexes changed files on subsequent runs, not entire repositories
- Processes 200+ repositories and 100K+ LOC: handles large codebases by chunking files, batching embeddings, and using background jobs for indexing

**Onboarding Impact:**
- ~75% reduction in onboarding time: measured by comparing time to answer codebase questions before and after using the system
- Automated documentation generation: creates README files and API documentation from code structure and comments
- Multi-repository support: engineers can search across multiple repos in a single query

**Integration & Operations:**
- GitHub API integration: OAuth for repository access, webhooks for automatic re-indexing on code changes
- Stripe integration for usage-based pricing: tracks API calls and document generation requests
- Background job processing: indexing large repositories runs asynchronously with progress tracking
- Error handling: graceful failures if GitHub API is rate-limited, with retry logic and user notifications

**Stack:** Next.js (App Router), TypeScript, PostgreSQL, pgvector (vector similarity search), Gemini (via OpenRouter), OpenRouter (LLM orchestration), GitHub API (OAuth, webhooks), Stripe (usage-based billing)

**Repository:** [github.com/parbhatkapila4/RepoDocs](https://github.com/parbhatkapila4/RepoDocs)  
**Live:** [repodoc.parbhat.dev](https://repodoc.parbhat.dev)

---

### Visura | Enterprise AI Platform

**Purpose:** Knowledge operations system that processes documents (PDFs, text files) and makes them searchable via semantic search. Handles document ingestion, chunking, embedding generation, and query answering with high accuracy and controlled costs.

**Problem & Approach:**
Processing large document sets with LLMs is expensive because each document chunk needs embedding generation. Built a system that uses hash-based chunk deduplication to avoid re-embedding identical or similar chunks, reducing costs by 50-80% while maintaining accuracy.

**Architecture & Technical Decisions:**

**Cost Optimization via Chunk Reuse:**
- 50-80% AI cost savings through hash-based chunk deduplication: before embedding a chunk, compute a hash of its content; if hash exists in database, reuse the existing embedding instead of calling the embedding API
- Chunking strategy: uses semantic chunking (splits on paragraph boundaries, maintains context) rather than fixed-size chunks to improve retrieval quality
- Selective re-embedding: only generates new embeddings for chunks that haven't been seen before
- Cost tracking: monitors embedding API calls and costs per document processed to measure savings

**Accuracy & Processing:**
- 94%+ accuracy on document classification and processing: measured by comparing system outputs to human-labeled test set
- Sub-3s processing time (P50) for document ingestion: includes PDF parsing, chunking, hash computation, embedding generation (or cache lookup), and vector storage
- Processes 10k+ documents: handles large document sets through batch processing, background jobs, and database batching for vector inserts

**RAG Implementation:**
- pgvector for semantic search: stores document chunk embeddings, uses cosine similarity for retrieval
- LangChain orchestration: chains together document loading, chunking, embedding, vector storage, and retrieval
- GPT-4 for question answering: uses retrieved chunks as context, generates answers with citations
- Retrieval strategy: retrieves top-k chunks by similarity, then uses LLM to synthesize answer from retrieved context

**Data Management:**
- PostgreSQL for metadata: stores document metadata (title, upload date, user), chunk metadata (hash, source document, position), and user data
- Redis for caching: caches frequently accessed documents, query results, and computed embeddings
- Multi-tenant architecture: isolates data by user/organization, with row-level security in database queries

**Performance Optimizations:**
- Database indexing: indexes on document metadata, chunk hashes (for deduplication lookup), and vector similarity search (pgvector HNSW index)
- Query optimization: batches vector similarity searches, uses connection pooling, optimizes retrieval queries
- Caching strategy: caches document parsing results, frequently queried chunks, and common query patterns

**Stack:** Next.js (App Router), TypeScript, LangChain (RAG orchestration), GPT-4 (question answering), pgvector (vector search), PostgreSQL (metadata storage), Redis (caching)

**Repository:** [github.com/parbhatkapila4/Visura](https://github.com/parbhatkapila4/Visura)  
**Live:** [visura.parbhat.dev](https://visura.parbhat.dev)

---

## Technical Focus

**AI Systems in Production**

**RAG Architecture:**
- Implemented RAG systems using pgvector for vector storage and similarity search
- Chunking strategies: semantic chunking (paragraph/section boundaries) for better context preservation vs. fixed-size chunks for uniform processing
- Hallucination reduction: retrieval-augmented generation with strict context boundaries, citation requirements, and validation that responses are grounded in retrieved chunks
- Multi-hop retrieval: for complex queries, retrieves related chunks iteratively to build comprehensive context

**Vector Search Optimization:**
- pgvector with HNSW indexing for fast approximate nearest neighbor search at scale
- Embedding optimization: experimented with different embedding models (OpenAI text-embedding-ada-002, alternatives) based on domain (code vs. documents)
- Query performance: achieved sub-second latency through proper indexing, connection pooling, and caching frequently accessed vectors
- Tradeoffs: HNSW provides fast approximate search but requires more memory; chose it over exact search for latency requirements

**Cost Control:**
- Chunk deduplication: hash-based approach to avoid redundant embeddings, reducing costs by 50-80% in production
- Provider selection: use OpenRouter to route to lower-cost providers (Gemini) for tasks where quality difference is acceptable, reserve GPT-4 for critical paths
- Selective embedding: only embed chunks that are likely to be retrieved, skip low-value content
- Monitoring: track embedding API costs per document, per query, and per user to identify optimization opportunities

**Multi-Provider LLM Orchestration:**
- OpenRouter integration for provider abstraction: single API interface to multiple LLM providers (GPT-4, Gemini, Claude)
- Fallback handling: automatic fallback to alternative provider if primary provider is rate-limited or returns errors
- Cost-aware routing: route queries to appropriate provider based on task complexity and cost requirements
- Rate limit management: implement exponential backoff, request queuing, and provider-specific rate limit handling

**Reliability & Operations**

**Uptime & Availability:**
- 99.9% uptime achieved through: health check endpoints, automated monitoring, retry logic with exponential backoff, graceful degradation when external services fail
- Error handling: comprehensive error handling at API boundaries, database operations, and external service calls
- Incident response: structured logging with request IDs for tracing, alerting on error rate thresholds, runbooks for common failure scenarios

**Observability:**
- Logging: structured JSON logs with request IDs, user IDs, timestamps, and context for production debugging
- Metrics: track query latency (p50, p95, p99), error rates by endpoint, cache hit rates, database query performance, external API latency
- Monitoring: set up alerts for error rate spikes, latency degradation, and service availability
- Production debugging: use request IDs to trace issues across services, log important state transitions and decision points

**Database & Caching:**
- PostgreSQL: schema design with proper indexing (B-tree for metadata, pgvector HNSW for vectors), query optimization, connection pooling
- Redis: caching strategy for frequently accessed data (computed results, embeddings, document metadata), TTL management, cache invalidation on updates
- Performance: monitor slow queries, database connection pool usage, cache hit rates, and optimize based on production patterns

**System Design**

**Multi-Tenant Architecture:**
- Data isolation: row-level security in database queries, user/organization IDs in all data access paths
- User management: authentication (OAuth, API keys), authorization (role-based access control), session management
- Resource isolation: prevent one tenant's usage from affecting others (rate limiting, resource quotas)

**Real-Time Sync:**
- Webhook processing: handle webhook events from external services (CRM, GitHub, calendar) with idempotency (event ID deduplication)
- Conflict resolution: handle concurrent updates, use optimistic locking or last-write-wins based on use case
- Error handling: retry logic for transient failures, dead letter queue for permanently failed events, alerting on sync failures

**Background Job Processing:**
- Long-running operations: document processing, repository indexing, batch embeddings run as background jobs
- Job queues: use database-backed queues or Redis for job storage, with workers that process jobs asynchronously
- Progress tracking: provide progress updates for long-running jobs, allow users to check status
- Failure handling: retry failed jobs with exponential backoff, log failures for debugging, notify users of permanent failures

**API Design:**
- RESTful APIs with clear resource modeling, consistent error responses, and versioning strategy
- Rate limiting: implement per-user and per-IP rate limits to prevent abuse and ensure fair resource usage
- Authentication: API key management, OAuth integration, secure token storage and validation
- Documentation: API documentation with examples, error codes, and usage patterns

**Stack:** Next.js (App Router), TypeScript, PostgreSQL (with pgvector), Redis, LangChain, OpenRouter, AWS (infrastructure), Vercel (deployment)

---

## Experience

**AI Full-Stack Engineer | Independent Product Development**  
May 2022 - Present

Built and operated three production AI systems from initial design through ongoing maintenance. Handled all aspects: system architecture, feature development, reliability engineering, cost optimization, and scaling based on real usage patterns. Systems process real user data and serve active users.

**Production Ownership:**

**System Design & Architecture:**
- Designed database schemas with proper indexing strategies: time-series indexes for temporal queries, pgvector HNSW indexes for vector search, B-tree indexes for metadata lookups
- Architected multi-tenant systems with data isolation: row-level security, user-scoped queries, resource quotas
- Built real-time sync systems: webhook processing with idempotency, conflict resolution, retry logic, and error handling
- Designed API architectures: RESTful endpoints, rate limiting, authentication, error handling, versioning

**Performance & Reliability:**
- Achieved sub-250ms query latency (Sentinel) and sub-1s latency (RepoDocs) through database indexing, query optimization, Redis caching, and connection pooling
- Maintained 99.9% uptime across systems through health checks, monitoring, retry logic, graceful degradation, and incident response procedures
- Optimized database queries: identified slow queries through monitoring, added indexes, optimized joins, used query batching where appropriate
- Implemented caching strategies: Redis for frequently accessed data, cache invalidation on updates, TTL management based on data freshness requirements

**Cost Optimization:**
- Reduced AI processing costs by 50-80% (Visura) through hash-based chunk deduplication: computed content hashes before embedding, reused existing embeddings when hash matched
- Implemented multi-provider LLM routing: used OpenRouter to route queries to cost-appropriate providers (Gemini for code analysis, GPT-4 for critical paths)
- Monitored and tracked costs: embedded API call tracking, cost per document/query/user metrics, identified optimization opportunities through data
- Made tradeoff decisions: balanced cost vs. quality, chose appropriate models for different tasks, optimized chunking strategies to reduce embedding calls

**Scaling & Operations:**
- Handled production incidents: debugging using structured logs and request IDs, identifying root causes, implementing fixes, post-mortem analysis
- Performance tuning: identified bottlenecks through monitoring, optimized database queries, improved caching strategies, optimized API response times
- Scaling decisions: added database indexes, increased connection pool sizes, implemented horizontal scaling strategies, optimized background job processing
- Monitoring & observability: set up logging, metrics collection, alerting, dashboards for key performance indicators

**Technical Implementation:**

**RAG Systems:**
- Implemented hash-based chunk deduplication: compute SHA-256 hash of chunk content, store hash in database, check hash before embedding to avoid redundant API calls
- Vector search optimization: used pgvector with HNSW indexing for fast approximate nearest neighbor search, tuned index parameters for latency vs. accuracy tradeoffs
- Chunking strategies: semantic chunking (paragraph boundaries) for better context vs. fixed-size chunks for uniform processing, chose based on use case
- Hallucination reduction: strict context boundaries in prompts, citation requirements, validation that responses are grounded in retrieved chunks

**Real-Time Data Processing:**
- Webhook processing: idempotency via event ID deduplication, retry logic with exponential backoff, queue-based processing for bursts
- Background jobs: database-backed job queues, worker processes, progress tracking, failure handling with retries
- Data sync: handled concurrent updates, conflict resolution strategies, error recovery, monitoring sync health

**Stack:** Next.js (App Router), TypeScript, Python (for some data processing), PostgreSQL (with pgvector extension), Redis, LangChain, OpenRouter, AWS (EC2, S3, RDS), Vercel

---

## Availability

Available for full-time engineering roles at US-based startups. Remote-friendly, compatible with US/EU timezones. Open to discussing opportunities where technical ownership, production reliability, and architectural decision-making are valued.

**Email:** [parbhat@parbhat.dev](mailto:parbhat@parbhat.dev)  
**Portfolio:** [parbhat.dev](https://parbhat.dev)  
**LinkedIn:** [linkedin.com/in/parbhat-kapila](https://www.linkedin.com/in/parbhat-kapila/)  
**GitHub:** [github.com/parbhatkapila4](https://github.com/parbhatkapila4)
