import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";
import GitHubActivity from "./GitHubActivity";

type Tool = { name: string };

const categories: { title: string; tools: Tool[] }[] = [
  {
    title: "Frontend (Product UI)",
    tools: [
      { name: "TypeScript" },
      { name: "React" },
      { name: "Next.js (App Router)" },
      { name: "Tailwind CSS" },
      { name: "Remotion" },
    ],
  },
  {
    title: "Backend & APIs",
    tools: [
      { name: "Node.js" },
      { name: "FastAPI" },
      { name: "tRPC" },
      { name: "Zod" },
      { name: "WebSockets" },
    ],
  },
  {
    title: "AI Systems (Production)",
    tools: [
      { name: "OpenAI" },
      { name: "Claude" },
      { name: "Gemini" },
      { name: "OpenRouter" },
      { name: "RAG pipelines" },
      { name: "pgvector" },
    ],
  },
  {
    title: "Data & Infrastructure",
    tools: [
      { name: "PostgreSQL" },
      { name: "Prisma" },
      { name: "Redis" },
      { name: "BullMQ" },
      { name: "Object Storage (S3)" },
    ],
  },
  {
    title: "Observability & Ops",
    tools: [
      { name: "Sentry" },
      { name: "OpenTelemetry" },
      { name: "Clerk" },
      { name: "Better Auth" },
      { name: "Stripe" },
    ],
  },
  {
    title: "Cloud & Deployment",
    tools: [
      { name: "AWS" },
      { name: "Docker" },
      { name: "Vercel" },
      { name: "CI/CD (GitHub Actions)" },
    ],
  },
  {
    title: "Architecture & Practices",
    tools: [
      { name: "Distributed systems" },
      { name: "Event-driven design" },
      { name: "Multi-tenant SaaS" },
      { name: "Cost optimization" },
    ],
  },
];

const Skills = () => {
  return (
    <section id="skills" className="px-6 py-28 sm:px-10 md:py-36 lg:px-14">
      <div className="mx-auto w-full max-w-[87.5rem]">
        <SectionHeader index="03" label="Stack" title="The tools, in production." />
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-xl text-[0.9375rem] leading-relaxed text-muted sm:text-base">
            Core depth: production RAG and vector search at scale. The rest is full-stack because production AI demands owning the whole pipeline, not just the model.
          </p>
        </Reveal>

        <div className="mt-16 sm:mt-20">
          {categories.map((cat, i) => (
            <Reveal
              as="div"
              key={cat.title}
              delay={0.03 * i}
              className="border-t border-line last:border-b"
            >
              <div className="grid grid-cols-1 gap-y-2 py-6 sm:grid-cols-12 sm:gap-x-10 sm:py-7">
                <div className="flex items-baseline gap-4 sm:col-span-4">
                  <span aria-hidden className="font-mono text-[0.625rem] tabular-nums text-faint">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-base font-semibold tracking-[-0.01em] sm:text-lg">
                    {cat.title}
                  </h3>
                </div>
                <p className="max-w-[70ch] text-[0.9375rem] leading-[2] text-[var(--foreground)]/80 sm:col-span-8 sm:text-base">
                  {cat.tools.map((t, j) => (
                    <span key={t.name}>
                      <span className="whitespace-nowrap">{t.name}</span>
                      {j < cat.tools.length - 1 && (
                        <span aria-hidden className="px-2 text-faint">{" · "}</span>
                      )}
                    </span>
                  ))}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-20 border-t border-line pt-5 sm:mt-24">
            <div className="flex flex-wrap items-baseline justify-between gap-3 font-mono text-[0.625rem] uppercase tracking-[0.3em]">
              <span className="text-muted">Open source</span>
              <span className="normal-case tracking-[0.08em] text-faint">github.com/parbhatkapila4</span>
            </div>
            <div className="github-calendar-wrapper mt-10 overflow-x-auto text-muted">
              <GitHubActivity />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Skills;
