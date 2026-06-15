import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";

const capabilities = [
  {
    label: "RAG & vector search",
    text: "Production retrieval on Postgres / pgvector - chunking strategies, persistent embeddings, and context-grounded synthesis to keep answers accurate.",
  },
  {
    label: "Cost-efficient AI",
    text: "Cut model and processing spend 50-80% with hash-based chunk reuse, embedding caches, and multi-provider routing - quality held constant.",
  },
  {
    label: "Real-time & reliable",
    text: "Idempotent webhooks, queue-backed jobs, retries with backoff, and graceful degradation when upstream APIs fail.",
  },
  {
    label: "Observability & ops",
    text: "Health checks, structured logging, Sentry + OpenTelemetry tracing, and self-healing recovery - debugged to root cause, not symptoms.",
  },
];

const experiences = [
  {
    period: "May 2022 - Present",
    org: "Independent / Building for early-stage startups · Remote",
    title: "Founder & AI Systems Engineer",
    description: [
      "Full ownership of system design, feature delivery, reliability, and iteration - everything here built, deployed, and maintained by me.",
      "Owned backend services, data stores, AI pipelines, and deployment infrastructure, including authentication, payments, and third-party integrations. Debugged production incidents, performance bottlenecks, and scaling limits while shipping continuously without breaking live systems.",
    ],
    tech: ["Next.js", "TypeScript", "Python", "PostgreSQL", "Redis", "OpenAI", "pgvector", "Docker", "AWS"],
  },
];

const Experience = () => {
  return (
    <section id="experience" className="px-6 py-20 md:px-10 md:py-28 lg:px-16 lg:py-32">
      <div className="mx-auto w-full max-w-[1280px]">
        <SectionHeader index="05" label="Experience" title="Building & operating, end to end." />

        <div className="mt-14">
          {experiences.map((exp, index) => (
            <Reveal as="div" key={index}>
              <article className="grid grid-cols-1 gap-x-10 gap-y-6 border-t border-black/10 py-12 dark:border-white/15 lg:grid-cols-12">
                <div className="lg:col-span-3">
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
                    {exp.period}
                  </p>
                  <p className="mt-3 font-mono text-[11px] uppercase leading-relaxed tracking-[0.18em] text-neutral-400 dark:text-neutral-500">
                    {exp.org}
                  </p>
                </div>
                <div className="lg:col-span-9">
                  <h3 className="font-heading text-2xl font-semibold tracking-[-0.01em] sm:text-3xl">
                    {exp.title}
                  </h3>
                  <div className="mt-5 max-w-2xl space-y-4 text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-300">
                    {exp.description.map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>

                  <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-400 dark:text-neutral-500">
                    Focus
                  </p>
                  <ul className="mt-3 space-y-0">
                    {capabilities.map((c) => (
                      <li
                        key={c.label}
                        className="flex flex-col gap-1.5 border-t border-black/10 py-4 dark:border-white/10 sm:flex-row sm:items-baseline sm:gap-6"
                      >
                        <span className="font-heading w-full shrink-0 text-base font-semibold tracking-[-0.01em] sm:w-48">
                          {c.label}
                        </span>
                        <span className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                          {c.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <p className="mt-7 font-mono text-[11px] leading-relaxed text-neutral-500 dark:text-neutral-400">
                    {exp.tech.join("  ·  ")}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
          <div className="border-t border-black/10 dark:border-white/15" />
        </div>
      </div>
    </section>
  );
};

export default Experience;
