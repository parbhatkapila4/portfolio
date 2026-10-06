import type { Metadata } from "next";
import { CaseStudy, type CaseStudyData } from "@/components/CaseStudy";

export const metadata: Metadata = {
  title: "CUTLINE: a director, not a template engine",
  description:
    "How CUTLINE turns one sentence into a finished MP4 - a director layer that commits the editorial calls before a frame renders, across up to twelve slideshow stages in a fixed order, with a separate worker, three talking-character modes on two providers (Google Veo and HeyGen), and an image fallback chain that ends in a placeholder.",
  alternates: { canonical: "https://www.parbhat.dev/writing/cutline" },
  openGraph: {
    title: "CUTLINE: a director, not a template engine",
    description:
      "One sentence to a finished MP4 - up to twelve slideshow stages in a fixed order, a worker off the request path, and editorial decisions made before any frame is generated.",
    url: "https://www.parbhat.dev/writing/cutline",
    type: "article",
  },
};

const data: CaseStudyData = {
  slug: "cutline",
  title: "CUTLINE: a director, not a template engine",
  tagline:
    "One sentence in, one finished MP4 out - directed by a pipeline of up to 12 stages per slideshow, not a template engine. The pipeline commits the editorial decisions before it touches a frame.",
  live: "https://cutline.cloud",
  source: "https://github.com/parbhatkapila4/Cutline",
  metrics: [
    { value: "11-12", label: "fixed-order pipeline stages" },
    { value: "81", label: "signups, all inbound" },
    { value: "Up to 3", label: "image providers per shot, then a placeholder" },
    { value: "0", label: "creative knobs" },
  ],
  blocks: [
    {
      kind: "section",
      heading: "The problem",
      intro:
        "Short-form video has eaten attention, but the production loop has not compressed.",
      paras: [
        "Script, storyboard, b-roll, cut, caption, render - every step has a tool, the assembly is still manual, and by the time the idea is on screen it has aged. The \"AI video\" category mostly automates the cut, not the editorial work that decides what to cut to.",
        "The naive AI version - \"type what you want, we'll generate a video\" - collapses into template fill-ins. Same Ken Burns pan over the same Unsplash photo, same kinetic-type intro, same captions. The output is generic because the system is generic: it picked a layout, not a narrative. CUTLINE takes the opposite bet.",
      ],
    },
    {
      kind: "quote",
      text: "The product is \"describe, receive,\" not \"configure, render.\"",
    },
    {
      kind: "section",
      heading: "Thesis",
      intro:
        "Director layer, not template engine. The pipeline commits to editorial decisions before it touches a frame.",
      bullets: [
        {
          lead: "Director layer, not template engine",
          text:
            "From one sentence it infers audience, goal, tone, complexity, and duration; plans a narrative arc whose beat count scales with the duration (3 to 12 beats); breaks each beat into 1-3 shots with per-shot purpose, motion hint, and text density; writes the script aligned to shot boundaries; sources or generates the imagery; composes the MP4. The user does not pick a template, voice, or layout. The system makes those calls.",
        },
        {
          lead: "One sentence in, no creative knobs",
          text:
            "Optional brand kit and uploaded assets enrich the pipeline; they do not steer it. A coffee brand can upload a logo and product photos, drop in two hex colors, and set banned_phrases and required_phrases on a brand_kits row - the director still chooses the shot list and the cuts.",
        },
        {
          lead: "Pipeline over agent",
          text:
            "A fresh slideshow runs eleven stages, twelve when assets or brand colors are supplied. The order is fixed. The intent, narrative, shot, script, TTS and image stages call outside models or image providers, so the same prompt can give a different video. Fixed stage boundaries beat agent loops for debugging and retries: each stage's start, finish, duration and error code are written to render_events, so most failed renders point at the stage that failed. An agent loop hides that. Spend is capped per user per month when a job is admitted, and each job's cost is estimated per category (LLM, voice, video, images), not per stage.",
        },
        {
          lead: "Worker separate from app",
          text:
            "Rendering is CPU-heavy. Serverless functions time out, and even when they don't, billing-by-execution is the wrong shape for long jobs. The Next.js app handles UI, API, and job enqueue; a separate BullMQ worker pipelines and renders.",
        },
      ],
    },
    {
      kind: "flow",
      heading: "Architecture",
      intro:
        "The app enqueues; the worker renders. The app runs on Vercel; the worker runs on a long-running host (Railway / Render / Fly), sharing the same Redis.",
      caption:
        "In the split deploy the worker's public/temp is not reachable from the Vercel app, so the finished MP4 is uploaded to Vercel Blob and the job result stores the public https URL. The client polls GET /api/generate/[jobId] with 2s -> 15s backoff, capped at 30 minutes.",
      lanes: [
        {
          label: "Browser",
          nodes: [
            { label: "POST /api/generate", sub: "one sentence" },
            { label: "Poll job", sub: "2s -> 15s, 30m cap" },
          ],
        },
        {
          label: "App - Vercel",
          nodes: [
            { label: "Next.js API", sub: "enqueue" },
            { label: "BullMQ + Redis", sub: "job queue" },
          ],
        },
        {
          label: "Worker - long-running host",
          nodes: [
            { label: "npm run worker", sub: "drains queue" },
            { label: "Stage pipeline", sub: "up to 12 slideshow stages, renders to public/temp" },
            { label: "Vercel Blob", sub: "https MP4 URL", accent: true },
          ],
        },
      ],
    },
    {
      kind: "flow",
      heading: "The slideshow stages",
      intro:
        "A fresh slideshow render runs eleven stages; asset analysis, the twelfth, runs only when assets or brand colors are supplied. The order is fixed, and each stage's start, finish, duration and error code are written to render_events.",
      caption:
        "The intent, narrative, shot, script, TTS and image stages call outside models or image providers, so the same prompt can give a different video; what stays fixed is the order and the boundaries between stages. Cancellation is a Redis SET read between every stage.",
      lanes: [
        {
          label: "Direct",
          nodes: [
            { label: "intent" },
            { label: "narrative" },
            { label: "shots" },
            { label: "script" },
          ],
        },
        {
          label: "Voice & motion",
          nodes: [
            { label: "subtitles" },
            { label: "TTS" },
            { label: "subtitle refine" },
            { label: "motion" },
          ],
        },
        {
          label: "Visuals & render",
          nodes: [
            { label: "asset analysis" },
            { label: "visuals" },
            { label: "image sourcing" },
            { label: "render", sub: "finished MP4", accent: true },
          ],
        },
      ],
    },
    {
      kind: "flow",
      heading: "The talking-character branch",
      intro:
        "When mode === talking_object the renderer detours through one of three modes on two providers (Google Veo and HeyGen), depending on talkingObjectStyle and talkingRealMode.",
      caption:
        "Three modes, three different failure semantics. Cartoon and cinematic both call Google VEO; studio framing calls HeyGen with ElevenLabs. Cinematic produces multi-clip VEO with a documentary-style different-presenter-per-chunk constraint, ffmpeg concat with crossfade, and per-chunk silence trim.",
      lanes: [
        {
          label: "Cartoon",
          nodes: [
            { label: "Google VEO", sub: "@google/genai" },
            { label: "LLM-resolved subject", sub: "humanoid fallback", accent: true },
          ],
        },
        {
          label: "Studio framing",
          nodes: [
            { label: "HeyGen", sub: "photo avatar" },
            { label: "ElevenLabs", sub: "voice", accent: true },
          ],
        },
        {
          label: "Cinematic",
          nodes: [
            { label: "Multi-clip VEO", sub: "presenter per chunk" },
            { label: "ffmpeg concat", sub: "crossfade" },
            { label: "Silence trim", sub: "per chunk", accent: true },
          ],
        },
      ],
    },
    {
      kind: "section",
      heading: "Why this is hard",
      bullets: [
        {
          lead: "Three talking-character modes, three failure semantics",
          text:
            "VEO's RAI filter can reject a chunk. The VEO client throws a distinct VeoContentFilteredError, which the retry classifier marks non-retryable. The chunk loop retries the identical prompt once, then runs up to two LLM reword passes on the narration while keeping the visual prompt intact. A chunk still blocked after that is dropped, and the loop moves on to the next one. If every chunk is blocked, the job fails with an actionable message.",
        },
        {
          lead: "HeyGen Photo Avatar quota under at-least-once submissions",
          text:
            "Lower-tier HeyGen accounts cap stored Photo Avatars at 3. The upload path keys a SHA-256 cache on image bytes so identical inputs short-circuit. On code:401028 (quota full), the orchestrator lists the account, partitions avatars into orphans vs cached, and bulk-deletes orphans oldest-first in parallel batches (concurrency 10) with LRU eviction over cached as backup.",
        },
        {
          lead: "Idempotency without a job-state table",
          text:
            "X-Idempotency-Key paired with an in-process Map and a per-key Promise lock serializes concurrent submissions with the same key and returns the original { jobId }; 24h retention. In-memory by design - BullMQ already owns job lifecycle, and duplicating that into Postgres creates two sources of truth.",
        },
        {
          lead: "Cancellation across a long-running async pipeline",
          text:
            "Cancel writes a Redis SET; every stage reads it before starting work. On hit the worker throws and the same cleanup path runs as on success or failure. Cancellation is eventual, not preemptive - latency-to-cancel is bounded by the current stage's duration.",
        },
        {
          lead: "Plan limits enforced at two layers",
          text:
            "Free gets 3 videos a month and Beginner 10, counted as videos finished. Professional and Enterprise have no video count, but every plan has a monthly dollar spend cap, and talking-character video is capped at 90 seconds a month on Professional and 400 on Enterprise, plus purchased top-ups. The UI shows Pro badges and lock states. Plan limits are checked server-side before work is admitted: the generate handler reads the plan and usage before anything reaches the BullMQ queue. A tampered request body can't get past that check.",
        },
        {
          lead: "Image sourcing falls back, then refuses to ship blank plates",
          text:
            "One missing image shouldn't throw away a job that has already run most of its stages. Each shot without an uploaded photo walks a fallback chain: Unsplash, then Pexels, then DALL-E 3 (skipped on Free and preview renders), then the same three again with the first three words of the query, then a placeholder. The query is derived per shot from intent + script via OpenRouter, falling back to words from the topic. A failed link moves on to the next; a missing OpenRouter key stops the job. But a video of mostly blank plates isn't worth shipping: on a paid plan, if more than half the shots end on the placeholder, the job fails. Free renders are stock-only and have no floor.",
        },
      ],
    },
    {
      kind: "flow",
      heading: "Image sourcing has a floor",
      intro:
        "Every shot ends up with an image, even if it's the placeholder. A paid render does not: if more than half the shots land on the placeholder, the job fails instead of shipping blank plates. Free, stock-only renders have no floor.",
      caption:
        "The query for each shot is derived from intent + script via OpenRouter; shouldRetryForImage retries 429, 5xx and timeouts and gives up on 400, 401 and 404. After every shot is sourced, the placeholder ratio is checked against IMAGE_PLACEHOLDER_MAX_RATIO (default 0.5). Over it, ImageFallbackFloorError fails the job. Free renders pass a limit of 1, so they never hit it, and shot regenerations skip the check.",
      lanes: [
        {
          label: "Per-shot fallback chain",
          nodes: [
            { label: "Unsplash", sub: "first try" },
            { label: "Pexels", sub: "stock" },
            { label: "DALL-E 3", sub: "generate, not on Free or previews" },
            { label: "All three again", sub: "first 3 words of the query" },
            { label: "Placeholder", sub: "over half: paid job fails", accent: true },
          ],
        },
      ],
    },
    {
      kind: "grid",
      heading: "Design decisions & tradeoffs",
      items: [
        {
          title: "Pipeline, not LLM agent",
          lines: [
            "Why: fixed stage boundaries beat agent loops for debugging and retries.",
            "Tradeoff: less emergent behaviour, more handcrafted prompts per stage. Visibility over magic.",
          ],
        },
        {
          title: "Worker on a long-running host",
          lines: [
            "Why: CPU-heavy renders belong off the request path, and per-execution billing is the wrong shape for long jobs.",
            "Tradeoff: deploy is two services (Vercel app + worker) sharing one Redis.",
          ],
        },
        {
          title: "In-memory idempotency + Redis cancellation",
          lines: [
            "Why: BullMQ already owns job lifecycle; a Postgres job-state table creates two sources of truth.",
            "Tradeoff: the idempotency cache resets on app restart - a duplicate POST with the same key within 24h after a restart creates a second job. The request ID is carried through logs for support correlation.",
          ],
        },
        {
          title: "Placeholder as last resort, with a floor",
          lines: [
            "Why: one missing image shouldn't throw away a job that has already run most of its stages, so a shot that finds nothing gets a placeholder.",
            "Tradeoff: a render that is mostly placeholders isn't worth shipping. On a paid plan, over half the shots on the placeholder and the job fails. Free, stock-only renders have no floor.",
          ],
        },
        {
          title: "user_plan_overrides separate from the auth table",
          lines: [
            "Why: entitlement is a thin map keyed by user_id; identity is Better Auth's job. Coupling them locks billing to one auth provider.",
            "Tradeoff: each plan lookup is its own SELECT on user_plan_overrides, up to three per generate request - a small cost for an auth-provider swap that doesn't touch billing.",
          ],
        },
      ],
    },
    {
      kind: "grid",
      heading: "Failure modes",
      items: [
        {
          title: "VEO content-safety block on chunk N",
          lines: [
            "Detected as VeoContentFilteredError. The identical prompt is retried once, then an LLM is asked up to two times to reword that chunk's narration with the same meaning.",
            "A chunk still blocked is dropped and the rest keep generating, and the user is told how many segments were skipped. If every chunk is blocked, the job fails with an actionable message.",
          ],
        },
        {
          title: "HeyGen 401028 Photo Avatar quota full",
          lines: [
            "Bulk auto-cleanup partitions orphans vs cached, deletes oldest orphans in parallel batches, then retries the upload once.",
            "If retry still hits 401028, the user-facing error is generic; the operator log carries the technical detail.",
          ],
        },
        {
          title: "Image provider 5xx / 429",
          lines: [
            "Provider calls that throw on a 429, a 5xx or a timeout are retried twice by default (1s, then 2s); then the shot falls through Unsplash, Pexels, DALL-E 3, a shorter-query pass and the placeholder.",
            "The render completes unless it's on a paid plan and more than half the shots end on the placeholder; then the job fails.",
          ],
        },
        {
          title: "Worker process killed mid-render",
          lines: [
            "Per-job temp dir is deleted on success, failure, and cancel via one shared cleanup path.",
            "An hourly cleanup job is the backstop for orphaned temp files. The same job enforces MP4 retention: published videos are kept 24 hours on Free and 90 days on paid plans.",
          ],
        },
        {
          title: "Dodo webhook replay",
          lines: [
            "Events are keyed by type plus an ID (payment, subscription, refund or dispute), with the product, the billing cycle or both added for some subscription events. processed_webhook_events.event_key is the primary key, and plan grants and revokes claim it with INSERT ... ON CONFLICT DO NOTHING before the plan changes.",
            "A replayed event finds the key taken and returns. Top-up credits run first, guarded by a Redis key that expires after 90 days.",
          ],
        },
      ],
    },
    {
      kind: "grid",
      heading: "Security model",
      items: [
        {
          title: "Browser hardening",
          lines: [
            "CSP with frame-ancestors none, object-src none, base-uri self, form-action self, upgrade-insecure-requests.",
            "HSTS (2y, includeSubDomains, preload), X-Frame-Options DENY, nosniff, Referrer-Policy strict-origin-when-cross-origin - on every response.",
          ],
        },
        {
          title: "API keys",
          lines: [
            "Format clk_<48 hex> from crypto.randomBytes(24).",
            "Stored as SHA-256 of the full key, with a 16-char prefix kept as the indexed lookup column. Plaintext is returned only at creation.",
          ],
        },
        {
          title: "Dodo webhook signature",
          lines: [
            "The @dodopayments/nextjs handler verifies the Standard Webhooks signature with DODO_PAYMENTS_WEBHOOK_KEY before any handler runs.",
            "Missing or invalid signature -> 401.",
          ],
        },
        {
          title: "SSRF guard on callbackUrl",
          lines: [
            "Validates scheme (http/https only) and rejects private and internal hostnames in every environment: localhost, .internal and .local names, cloud metadata hosts, RFC1918, CGNAT and link-local IPv4, and IPv6 loopback, ULA and fe80 link-local. ALLOW_LOCALHOST_WEBHOOK=true turns the check off.",
            "It matches the hostname as written: it does not resolve DNS or re-check redirects.",
            "Fire-and-forget, 5-second timeout, no retries.",
          ],
        },
        {
          title: "Prompt-injection rejection",
          lines: [
            "validateGenerateInput rejects topics matching the injection-pattern set.",
            "Returns a field-level VALIDATION_FAILED.",
          ],
        },
        {
          title: "Rate limiting",
          lines: [
            "Redis-backed fixed window, keyed per client IP or per API key.",
            "generate 5/h (120/h for API-key callers) and 50/day, upload 20/h, status 60/min.",
            "If Redis is down, the limiter fails open and lets the request through.",
          ],
        },
      ],
    },
    {
      kind: "section",
      heading: "Testing",
      intro:
        "The pipeline's correctness lives in pure functions, so that's where the tests concentrate - with one path that calls the real generate endpoint and polls the job it creates.",
      bullets: [
        {
          lead: "Unit coverage on the load-bearing logic",
          text:
            "304 Vitest cases across 33 files, including the two integration tests below, cover input validation, the retry classifier, the pipeline orchestrator, and the generate route. The same stage boundaries that make the pipeline debuggable are what make it testable.",
        },
        {
          lead: "Opt-in integration against a live stack",
          text:
            "Two integration tests drive the real POST /api/generate and poll job status against a running worker and Redis; they self-skip (describe.skipIf) when Redis isn't configured, so they run only when the dependency is actually present.",
        },
        {
          lead: "The deliberate tradeoff",
          text:
            "No browser test suite and no CI gate yet - the integration tests are run locally when the worker stack is up, and the unit layer is where regressions get caught first.",
        },
      ],
    },
  ],
};

export default function CutlineWriteup() {
  return <CaseStudy data={data} />;
}
