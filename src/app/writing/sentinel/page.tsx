import type { Metadata } from "next";
import { CaseStudy, type CaseStudyData } from "@/components/CaseStudy";

export const metadata: Metadata = {
  title: "Sentinel: CRM is the permission layer",
  description:
    "How Sentinel bounds revenue-intelligence ingestion to a boundary the business already maintains - a message is read only if a participant matches a synced CRM contact. Fail-closed, PII-blind, read-only.",
  alternates: { canonical: "https://www.parbhat.dev/writing/sentinel" },
  openGraph: {
    title: "Sentinel: CRM is the permission layer",
    description:
      "Ingest only what you're allowed to read. Sentinel gates email, calendar, and chat ingestion on CRM contact membership - self-maintaining, fail-closed, read-only.",
    url: "https://www.parbhat.dev/writing/sentinel",
    type: "article",
  },
};

const data: CaseStudyData = {
  slug: "sentinel",
  title: "Sentinel: CRM is the permission layer",
  tagline:
    "Revenue-intelligence runs on the most sensitive data a company holds. So the first question isn't \"what model scores the deal\" - it's \"what are we even allowed to read?\"",
  live: "https://www.sentinels.in/",
  source: "https://github.com/parbhatkapila4/Sentinel",
  metrics: [
    { value: "CRM", label: "is the ingestion permission gate" },
    { value: "3", label: "OAuth providers, one boundary" },
    { value: "AES-256-GCM", label: "per-integration secrets at rest" },
    { value: "Fail-closed", label: "on any verification error" },
  ],
  blocks: [
    {
      kind: "section",
      heading: "The problem",
      intro:
        "Every revenue-intelligence tool runs on the same fuel: the conversations around a deal - email, calendar invites, chat. That's also the most sensitive data a company holds.",
      paras: [
        "So the first real question isn't \"what model scores the deal,\" it's \"what are we even allowed to read?\" Most tools treat that as an afterthought, and it surfaces as one of two failure modes.",
        "One: ingest everything. Connect a mailbox, pull every thread, read the whole Slack workspace. You get great coverage and a surveillance liability - employees' private messages, vendor negotiations, HR threads, all sitting in a third-party database with no principled boundary. Security review kills the deal, or should.",
        "Two: ingest nothing useful. Make the user tag each thread by hand, or limit ingestion to a manually-maintained allowlist. Safe, and dead within a month - nobody maintains it, coverage rots, and the product degrades into a worse CRM.",
        "Sentinel takes neither. It binds ingestion to a boundary the business already maintains and already trusts: the CRM.",
      ],
    },
    {
      kind: "quote",
      text: "The first real question isn't \"what model scores the deal,\" it's \"what are we even allowed to read?\"",
    },
    {
      kind: "section",
      heading: "The thesis: CRM is the permission layer",
      intro:
        "A CRM contact book isn't just a list of people. It's an organization's standing answer to \"who are we in a business relationship with.\"",
      paras: [
        "Sales already curate it, dedupe it, and keep it current - their job depends on it. That makes it the right ACL for data ingestion, and it's already being maintained for free.",
        "So the rule is simple and absolute: a message is ingested only if at least one participant matches a Contact synced from a connected CRM. An email whose sender and recipients are all strangers is dropped. A Slack message from someone not in the book is dropped. A calendar event with no CRM attendee is dropped. The check runs on every inbound item - after self-exclusion (the user's own address never counts) and email normalization - against a Contact table populated by read-only HubSpot and Salesforce sync.",
        "This beats the alternatives on every axis that matters. Manual allowlists drift and demand maintenance nobody does. Domain allowlists (@acme.com) over-admit - they pull in a prospect's entire company, including people you've never dealt with. Shared-secret or header gates authenticate the sender, not the relationship. CRM membership is the only gate that's self-maintaining and actually models the business relationship.",
        "It is also fail-closed. The permission check returns \"not in book\" on any database error rather than admitting data it couldn't verify - a backend hiccup can never silently widen the ingestion boundary. And it is PII-blind: the filter logs outcome counts and a fixed enum of reason tokens (passed, dropped_no_crm_match, dropped_self_user, fail_closed), never an email address or message body.",
      ],
    },
    {
      kind: "flow",
      heading: "Architecture",
      intro:
        "Read-only in, gated, persisted or dropped. CRM sync populates the Contact book; every inbound message is checked against it, and only messages with a CRM-matched participant are stored.",
      caption:
        "Each inbound message's participant emails are checked against the Contact table in a single batched query that rides the @@unique([userId, email]) index. On a match, the message is persisted with the matched contact IDs and an outcome of passed; otherwise only a metric is incremented. The gate is the product, not a feature.",
      lanes: [
        {
          label: "CRM sync - read-only, never writes back",
          nodes: [
            { label: "HubSpot / Salesforce", sub: "read-only OAuth" },
            { label: "Contact table", sub: "@@unique(userId, email)" },
          ],
        },
        {
          label: "Inbound - every item is checked",
          nodes: [
            { label: "Gmail / Calendar / Slack", sub: "inbound message" },
            { label: "Self-exclusion", sub: "user's own address" },
            { label: "Normalize email", sub: "then match" },
            { label: "Batched lookup", sub: "indexed query" },
          ],
        },
        {
          label: "Outcome",
          nodes: [
            { label: "Match", sub: "≥1 CRM participant" },
            { label: "Persist", sub: "+ contact IDs · passed", accent: true },
            { label: "No match", sub: "increment metric, drop" },
          ],
        },
      ],
    },
    {
      kind: "section",
      heading: "Why this is hard",
      intro: "The thesis is one function. Making it hold up in production is the work.",
      bullets: [
        {
          lead: "Three OAuth providers, three token-expiry models",
          text:
            "Slack bot tokens don't expire, so there's nothing to refresh. HubSpot issues a short-lived access token plus a refresh token, with the server's expiry stored per integration (tokenExpiresAt). Salesforce's token response carries no expires_in at all - so the access token is treated as lifetime-based and cached for a fixed 110-minute window with a safety buffer, then refreshed. One code path, three different truths about when a credential goes stale.",
        },
        {
          lead: "HMAC verification under clock skew",
          text:
            "Slack signs each request over v0:timestamp:rawBody. Verification must use the raw bytes (a JSON.parse/stringify round-trip changes the digest), reject anything outside a 300-second replay window, and compare with timingSafeEqual after a length pre-check - because timingSafeEqual throws on unequal-length buffers.",
        },
        {
          lead: "Idempotent ingestion under at-least-once delivery",
          text:
            "Slack retries events; the same event_id can arrive several times, sometimes concurrently. Dedup is a @@unique([userId, slackEventId]) index plus a cheap pre-check, with a P2002 catch on insert to absorb the race where two retries pass the pre-check at once. Gmail uses @@unique([userId, externalId, source]).",
        },
        {
          lead: "CRM contact-set drift",
          text:
            "Admission is decided at ingest time, not re-evaluated forever. If a Contact is deleted after a message was stored, that message keeps the contact IDs it matched at the time - history doesn't rewrite itself when the book changes.",
        },
        {
          lead: "Secrets at rest with a rotation story",
          text:
            "Bearer tokens for five providers live in the database. They're encrypted with a versioned envelope so the format and key can evolve without a migration that assumes plaintext.",
        },
      ],
    },
    {
      kind: "flow",
      heading: "Three providers, three truths about a stale credential",
      intro:
        "One code path resolves credentials for Slack, HubSpot, and Salesforce - each of which tells a different story about when its token goes stale.",
      caption:
        "Slack has nothing to refresh. HubSpot stores a server-provided expiry per integration. Salesforce returns no expires_in, so its token is treated as lifetime-based and cached for a fixed 110-minute window with a safety buffer.",
      lanes: [
        {
          label: "Slack - never expires",
          nodes: [
            { label: "Bot token", sub: "no expires_in" },
            { label: "Use as-is", sub: "nothing to refresh", accent: true },
          ],
        },
        {
          label: "HubSpot - server-provided expiry",
          nodes: [
            { label: "Access + refresh", sub: "short-lived" },
            { label: "tokenExpiresAt", sub: "stored per integration" },
            { label: "Refresh on expiry", sub: "", accent: true },
          ],
        },
        {
          label: "Salesforce - no expiry returned",
          nodes: [
            { label: "Token response", sub: "no expires_in" },
            { label: "Cache 110 min", sub: "+ safety buffer" },
            { label: "Refresh after window", sub: "", accent: true },
          ],
        },
      ],
    },
    {
      kind: "flow",
      heading: "Idempotent ingestion under at-least-once delivery",
      intro:
        "Slack retries events; the same event_id can arrive several times, sometimes concurrently. Every duplicate has to collapse to one stored row.",
      caption:
        "A cheap pre-check handles the common case; the @@unique([userId, slackEventId]) index is the real guarantee; the P2002 catch absorbs the race where two retries pass the pre-check at once. Gmail uses @@unique([userId, externalId, source]).",
      lanes: [
        {
          label: "Slack - at-least-once",
          nodes: [
            { label: "event_id", sub: "arrives ≥ once" },
            { label: "Pre-check", sub: "already seen?" },
            { label: "Unique index", sub: "userId · slackEventId" },
            { label: "P2002 catch", sub: "absorbs the race" },
            { label: "duplicate_event", sub: "one row, no double-write", accent: true },
          ],
        },
      ],
    },
    {
      kind: "grid",
      heading: "Design decisions & tradeoffs",
      items: [
        {
          title: "Read-only OAuth scopes",
          lines: [
            "Why: gmail.readonly / calendar.readonly and read-only CRM scopes mean Sentinel cannot modify a customer's inbox, calendar, or CRM - smaller blast radius, an honest consent screen.",
            "Tradeoff: no auto-creating Contacts and no writing scores back into the CRM. Enrichment is one-directional.",
          ],
        },
        {
          title: "Per-integration encrypted token storage",
          lines: [
            "Why: tokens are bearer credentials; TLS protects them in transit but not at rest, so each secret is stored as an AES-256-GCM envelope.",
            "Tradeoff: more moving parts than plaintext-plus-TLS, and a key that must be present for any integration to function.",
          ],
        },
        {
          title: "CRM membership as the gate",
          lines: [
            "Why: self-maintaining, and it models the real relationship.",
            "Tradeoff: a prospect not yet added to the CRM is invisible - coverage is only as good as the book. A boundary that under-admits beats one that over-admits.",
          ],
        },
        {
          title: "HMAC-signed, stateless OAuth state",
          lines: [
            "Why: the HubSpot and Salesforce flows carry CSRF state in an HMAC-signed cookie verified with timingSafeEqual - no server-side session store, and a forged cookie can't swap the userId mid-flow.",
            "Tradeoff: shared-secret management; the Gmail/Calendar flows still use plain JSON state cookies - signing them is a deliberate follow-up.",
          ],
        },
        {
          title: "Risk recomputed on read",
          lines: [
            "Why: deal risk is derived from timeline events on each read, with auditable reason strings - no stale precomputed score to invalidate.",
            "Tradeoff: cost grows with pipeline size; very large pipelines would need precomputation or caching.",
          ],
        },
      ],
    },
    {
      kind: "grid",
      heading: "Failure modes",
      items: [
        {
          title: "Slack token revoked / rate-limited",
          lines: [
            "The email resolver throws; the handler fails closed, drops the event with a fail_closed metric, and persists nothing.",
            "Dropping one message beats admitting one we couldn't validate.",
          ],
        },
        {
          title: "Provider rate limits / transient 5xx",
          lines: [
            "External calls go through retry-with-backoff and a per-provider circuit breaker.",
            "An open circuit short-circuits instead of hammering a degraded provider.",
          ],
        },
        {
          title: "Partial failure mid-sync",
          lines: [
            "Syncs upsert by external ID, so a re-run is idempotent and a half-finished sync leaves no duplicates.",
            "Each provider emits structured completion metrics.",
          ],
        },
        {
          title: "Postgres connection-pool exhaustion",
          lines: [
            "The app uses the pooled Supabase URL (port 6543, pgbouncer); migrations use the direct URL (port 5432).",
            "The permission check fails closed on any DB error, so pool pressure degrades to dropped ingestion - never to over-admission.",
          ],
        },
        {
          title: "Duplicate event / webhook delivery",
          lines: [
            "Unique indexes plus P2002 handling collapse retries to a duplicate_event outcome.",
            "No double-write.",
          ],
        },
      ],
    },
    {
      kind: "grid",
      heading: "Security model",
      items: [
        {
          title: "Secrets at rest",
          lines: [
            "AES-256-GCM, envelope format enc:v1:<iv>:<tag>:<ciphertext> with a random 96-bit IV per secret and the GCM auth tag stored inline.",
            "A single 32-byte KEK from INTEGRATION_ENCRYPTION_KEY; legacy plaintext rows still decrypt.",
            "The v1 prefix exists so the format or key can be rotated later.",
          ],
        },
        {
          title: "HMAC in three places",
          lines: [
            "Inbound Slack requests are signature-verified with a 300-second replay window.",
            "OAuth state cookies are HMAC-signed and timingSafeEqual-checked.",
            "Outbound webhooks are signed with an X-Webhook-Signature (HMAC-SHA256) header.",
          ],
        },
        {
          title: "Read-only and private",
          lines: [
            "Read-only OAuth scopes; Sentinel never writes back to a connected system.",
            "Pipeline data is never used to train shared models.",
            "The permission filter never logs message text or participant emails.",
          ],
        },
      ],
    },
    {
      kind: "section",
      heading: "Testing",
      intro:
        "The suite is aimed at the parts where a bug is a security or correctness incident - the permission boundary, the risk scoring, token handling - not at coverage for its own sake.",
      bullets: [
        {
          lead: "Where the tests are aimed",
          text:
            "61 Vitest unit-test files concentrate on the load-bearing logic - the CRM-membership ingestion gate, deal-risk scoring, OAuth token handling, and the server actions - with Prisma, auth, and the external APIs mocked so a single rule change is caught in isolation.",
        },
        {
          lead: "A guard against claim drift",
          text:
            "A generated suite checks twelve monitored files against the banned phrases and contradiction rules in PRODUCT_CLAIMS.md, so the product's stated claims can't silently drift out of sync with what the code actually does.",
        },
        {
          lead: "The deliberate tradeoff",
          text:
            "Integration tests against a live database aren't part of the suite - the unit layer mocks Prisma and the providers - the Playwright end-to-end specs are mostly held as skipped scaffolding, and CI runs the suite on demand rather than on every push.",
        },
      ],
    },
  ],
};

export default function SentinelWriteup() {
  return <CaseStudy data={data} />;
}
