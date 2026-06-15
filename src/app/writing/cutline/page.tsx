import type { Metadata } from "next";
import { CaseStudy, type CaseStudyData } from "@/components/CaseStudy";

export const metadata: Metadata = {
  title: "CUTLINE: a director, not a template engine",
  description:
    "How CUTLINE turns one sentence into a finished MP4 - a director layer that commits the editorial calls before a frame renders, across twelve deterministic stages, with a separate worker, three talking-character providers, and a fallback chain that never fails the render.",
  alternates: { canonical: "https://www.parbhat.dev/writing/cutline" },
  openGraph: {
    title: "CUTLINE: a director, not a template engine",
    description:
      "One sentence to a finished MP4 - twelve deterministic stages, a worker off the request path, and editorial decisions made before any frame is generated.",
    url: "https://www.parbhat.dev/writing/cutline",
    type: "article",
  },
};

const data: CaseStudyData = {
  slug: "cutline",
  title: "CUTLINE: a director, not a template engine",
  tagline:
    "One sentence in, one finished MP4 out - directed by a 12-stage pipeline, not a template engine. The pipeline commits the editorial decisions before it touches a frame.",
  live: "https://cutline.cloud",
  source: "https://github.com/parbhatkapila4/Cutline",
  metrics: [
    { value: "12", label: "deterministic pipeline stages" },
    { value: "1-3 min", label: "render per video, off the request path" },
    { value: "4-tier", label: "per-shot image fallback" },
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
            "From one sentence it infers audience, goal, tone, complexity, and duration; plans a 3-5 beat narrative arc; breaks that into 8-12 shots with per-shot purpose, motion hint, and text density; writes the script aligned to shot boundaries; sources or generates the imagery; composes the MP4. The user does not pick a template, voice, or layout. The system makes those calls.",
        },
        {
          lead: "One sentence in, no creative knobs",
          text:
            "Optional brand kit and uploaded assets enrich the pipeline; they do not steer it. A coffee brand can upload a logo and product photos, drop in two hex colors, and set banned_phrases and required_phrases on a brand_kits row - the director still chooses the shot list and the cuts.",
        },
        {
          lead: "Pipeline over agent",
          text:
            "Twelve stages, each a pure function over the previous stage's output. Deterministic stage boundaries beat agent loops for debugging, retries, and per-stage cost control. When a render looks wrong, you bisect by stage. When a provider regresses, you swap one module. When token spend spikes, you isolate the stage and tighten its prompt. An agent loop hides all three.",
        },
        {
          lead: "Worker separate from app",
          text:
            "Rendering is CPU-heavy and runs 1-3 minutes per video. Serverless functions time out, and even when they don't, billing-by-execution is the wrong shape for long jobs. The Next.js app handles UI, API, and job enqueue; a separate BullMQ worker pipelines and renders.",
        },
      ],
    },
    {
      kind: "flow",
      heading: "Architecture",
      intro:
        "The app enqueues; the worker renders. The app runs on Vercel; the worker runs on a long-running host (Railway / Render / Fly), sharing the same Redis.",
      caption:
        "In the split deploy the worker's public/temp is not reachable from the Vercel app, so the finished MP4 is uploaded to Vercel Blob and the job result stores the public https URL. The client polls GET /api/generate/[jobId] with 2s → 15s backoff, capped at 30 minutes.",
      lanes: [
        {
          label: "Browser",
          nodes: [
            { label: "POST /api/generate", sub: "one sentence" },
            { label: "Poll job", sub: "2s → 15s, 30m cap" },
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
            { label: "12-stage pipeline", sub: "render to public/temp" },
            { label: "Vercel Blob", sub: "https MP4 URL", accent: true },
          ],
        },
      ],
    },
    {
      kind: "flow",
      heading: "The twelve stages",
      intro:
        "Each stage is a pure function with its own POST endpoint - which is what makes the whole thing debuggable, swappable, and testable.",
      caption:
        "Per-stage endpoints (/api/intent, /api/shots, /api/script, /api/images/source, /api/render, …) let you (a) bisect a bad output by replaying one stage with a saved input, (b) swap a provider for one stage, and (c) test the slow stages in isolation. Cancellation is a Redis SET read between every stage.",
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
        "When mode === talking_object the renderer detours through one of three providers depending on talkingObjectStyle and talkingRealMode.",
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
            "VEO's RAI filter returns a deterministic content-safety block on the generated audio - retrying the identical prompt cannot succeed. The orchestrator throws a distinct VeoContentFilteredError, the retry classifier marks it non-retryable, and the chunk loop runs an LLM reword pass that varies the narration (what RAI blocks) while keeping the visual prompt intact. After two failed rewords the job fails with an actionable message and stops burning quota.",
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
          lead: "12-stage cancellation across a long-running async pipeline",
          text:
            "Cancel writes a Redis SET; every stage reads it before starting work. On hit the worker throws and the same cleanup path runs as on success or failure. Cancellation is eventual, not preemptive - latency-to-cancel is bounded by the current stage's duration.",
        },
        {
          lead: "Plan entitlement enforced at three layers",
          text:
            "Free / Beginner / Professional / Enterprise with caps 1 / 10 / unlimited / unlimited videos per month. Pro-only features are gated by UI (badges + lock states), the API handler (before BullMQ enqueue), and the DB (user_plan_overrides + a UNIQUE on payments.stripe_checkout_session_id). A tampered request body can't bypass the handler check; a tampered URL can't bypass the DB constraint.",
        },
        {
          lead: "Image sourcing has to never fail",
          text:
            "A pipeline that finishes 11 stages and aborts on shot 7 is a wasted job. The per-shot fallback chain is Unsplash → DALL-E 3 → Pexels → placeholder, with the query derived per shot from intent + script via OpenRouter. The placeholder is deliberate: a render with one stock-filler shot beats a failed render every time.",
        },
      ],
    },
    {
      kind: "flow",
      heading: "Image sourcing has to never fail",
      intro:
        "Imagery is the least reliable stage, so it has a terminal fallback. Every shot ends up with an image.",
      caption:
        "The query for each shot is derived from intent + script via OpenRouter; shouldRetryForImage retries 429/5xx and gives up on other 4xx. The placeholder is the conscious terminal case - a render with one stock-filler frame beats a failed render.",
      lanes: [
        {
          label: "Per-shot fallback chain",
          nodes: [
            { label: "Unsplash", sub: "first try" },
            { label: "DALL-E 3", sub: "generate" },
            { label: "Pexels", sub: "stock" },
            { label: "Placeholder", sub: "render still completes", accent: true },
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
            "Why: deterministic stage boundaries beat agent loops for debugging, retries, and per-stage cost control.",
            "Tradeoff: less emergent behaviour, more handcrafted prompts per stage. Visibility over magic.",
          ],
        },
        {
          title: "Worker on a long-running host",
          lines: [
            "Why: 1-3 minute renders die in serverless timeouts, and per-execution billing is the wrong shape for long jobs.",
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
          title: "Placeholder as terminal image fallback",
          lines: [
            "Why: every shot must have an image; a 99%-success pipeline is operationally worse than one that finishes with a filler frame.",
            "Tradeoff: a deployment with no image API keys produces watermark-looking output. Logs make it loud; the trade is conscious.",
          ],
        },
        {
          title: "user_plan_overrides separate from the auth table",
          lines: [
            "Why: entitlement is a thin map keyed by user_id; identity is Better Auth's job. Coupling them locks billing to one auth provider.",
            "Tradeoff: getUserPlan(userId) reads two tables - trivial query cost for an auth-provider swap that doesn't touch billing.",
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
            "Detected as VeoContentFilteredError; an LLM reword varies that chunk's narration while preserving meaning, and the chunk regenerates.",
            "After two failed rewords it stops with an actionable message and burns no further VEO quota.",
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
            "shouldRetryForImage retries transient failures with exponential backoff, then falls through Unsplash → DALL-E → Pexels → placeholder.",
            "Render completes.",
          ],
        },
        {
          title: "Worker process killed mid-render",
          lines: [
            "Per-job temp dir is deleted on success, failure, and cancel via one shared cleanup path.",
            "An orphan-sweep job runs every 60 minutes as a backstop; final MP4 retention is separate (default 24h).",
          ],
        },
        {
          title: "Stripe webhook replay / out-of-order",
          lines: [
            "payments.stripe_checkout_session_id has a UNIQUE constraint; verifyAndUpgrade checks status before writing user_plan_overrides.",
            "Replays log already-processed and return 200. Double-credit is structurally impossible.",
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
            "Stored as SHA-256 of the full key, with a 16-char prefix kept as the indexed lookup column. Plaintext returned exactly once at creation.",
          ],
        },
        {
          title: "Stripe webhook HMAC",
          lines: [
            "stripe.webhooks.constructEvent runs before any business logic.",
            "Missing or invalid signature → 400.",
          ],
        },
        {
          title: "SSRF guard on callbackUrl",
          lines: [
            "Validates scheme (http/https only), rejects localhost/127.0.0.1 in production unless explicitly allowed.",
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
            "Redis-backed sliding window per client.",
            "generate 5/h, upload 20/h, status 60/min.",
          ],
        },
      ],
    },
    {
      kind: "section",
      heading: "Testing",
      intro:
        "The pipeline's correctness lives in pure functions, so that's where the tests concentrate - with one path that exercises the real generate endpoint end to end.",
      bullets: [
        {
          lead: "Unit coverage on the load-bearing logic",
          text:
            "67 Vitest cases across 11 files - 65 of them deterministic unit tests - cover input validation, the retry classifier, the pipeline orchestrator, and the generate route. The same stage boundaries that make the pipeline debuggable are what make it testable.",
        },
        {
          lead: "Opt-in integration against a live stack",
          text:
            "Two integration tests drive the real POST /api/generate and poll job status against a running worker and Redis; they self-skip (describe.skipIf) when Redis isn't configured, so they run only when the dependency is actually present.",
        },
        {
          lead: "The deliberate tradeoff",
          text:
            "No end-to-end browser suite and no CI gate yet - the integration tests are run locally when the worker stack is up, and the unit layer is where regressions get caught first.",
        },
      ],
    },
  ],
};

export default function CutlineWriteup() {
  return <CaseStudy data={data} />;
}
