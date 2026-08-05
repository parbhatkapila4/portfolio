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
    org: "Independent / Engineering for early-stage startups · Remote",
    title: "Founder & AI Systems Engineer",
    description: [
      "Full ownership of system design, feature delivery, reliability, and iteration - everything here built, deployed, and maintained by me.",
      "Owned backend services, data stores, AI pipelines, and deployment infrastructure, including authentication, payments, and third-party integrations. Debugged production incidents, performance bottlenecks, and scaling limits while deploying continuously without breaking live systems.",
    ],
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Redis", "OpenAI", "pgvector", "Docker", "AWS"],
  },
];

const Experience = () => {
  return (
    <section id="experience" className="px-6 py-28 sm:px-10 md:py-36 lg:px-14">
      <div className="mx-auto w-full max-w-[1400px]">
        <SectionHeader index="05" label="Experience" title="Architecture to operations, owned in full." />

        <div className="mt-16 sm:mt-20">
          {experiences.map((exp, index) => (
            <Reveal as="div" key={index}>
              <article className="grid grid-cols-1 gap-y-10 border-t border-line py-12 sm:py-14 lg:grid-cols-12 lg:gap-x-10">
                <div className="lg:col-span-4">
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--foreground)]">
                    {exp.period}
                  </p>
                  <p className="mt-3 max-w-[30ch] font-mono text-[10px] uppercase leading-relaxed tracking-[0.18em] text-faint">
                    {exp.org}
                  </p>
                </div>
                <div className="lg:col-span-8">
                  <h3 className="font-display text-[clamp(1.7rem,3.2vw,2.7rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
                    {exp.title}
                  </h3>
                  <div className="mt-6 max-w-[62ch] space-y-4 text-[15px] leading-relaxed text-muted">
                    {exp.description.map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>

                  <p className="mt-12 font-mono text-[10px] uppercase tracking-[0.3em] text-faint">
                    Focus
                  </p>
                  <ul className="mt-4">
                    {capabilities.map((c, i) => (
                      <li
                        key={c.label}
                        className="grid grid-cols-1 gap-y-1.5 border-t border-line py-5 sm:grid-cols-12 sm:gap-x-8"
                      >
                        <span className="flex items-baseline gap-3 sm:col-span-4">
                          <span aria-hidden className="font-mono text-[10px] tabular-nums text-faint">
                            0{i + 1}
                          </span>
                          <span className="text-[15px] font-medium tracking-[-0.01em] text-[var(--foreground)]">
                            {c.label}
                          </span>
                        </span>
                        <span className="max-w-[58ch] text-sm leading-relaxed text-muted sm:col-span-8">
                          {c.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <p className="mt-2 border-t border-line pt-6 font-mono text-[11px] leading-[2.1] tracking-[0.02em] text-muted">
                    {exp.tech.map((t, ti) => (
                      <span key={t}>
                        <span className="whitespace-nowrap">{t}</span>
                        {ti < exp.tech.length - 1 && (
                          <span aria-hidden className="px-1.5 text-faint">{" · "}</span>
                        )}
                      </span>
                    ))}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
