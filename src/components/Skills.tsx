import type { ComponentType } from "react";
import {
  SiTypescript, SiReact, SiNextdotjs, SiTailwindcss,
  SiNodedotjs, SiPython, SiFastapi, SiTrpc, SiZod,
  SiOpenai, SiClaude, SiGooglegemini,
  SiPostgresql, SiPrisma, SiRedis, SiAmazon, SiAmazons3,
  SiSentry, SiOpentelemetry, SiClerk, SiStripe,
  SiDocker, SiVercel, SiGithubactions,
} from "react-icons/si";
import { Code2, Server, Cpu, Database, Activity, Cloud, Network } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";
import GitHubActivity from "./GitHubActivity";

type IconType = ComponentType<{ className?: string }>;
type Tool = { name: string; Icon?: IconType };

const categories: { title: string; CatIcon: IconType; tools: Tool[] }[] = [
  {
    title: "Frontend (Product UI)",
    CatIcon: Code2,
    tools: [
      { name: "TypeScript", Icon: SiTypescript },
      { name: "React", Icon: SiReact },
      { name: "Next.js (App Router)", Icon: SiNextdotjs },
      { name: "Tailwind CSS", Icon: SiTailwindcss },
      { name: "Remotion" },
    ],
  },
  {
    title: "Backend & APIs",
    CatIcon: Server,
    tools: [
      { name: "Node.js", Icon: SiNodedotjs },
      { name: "Python", Icon: SiPython },
      { name: "FastAPI", Icon: SiFastapi },
      { name: "tRPC", Icon: SiTrpc },
      { name: "Zod", Icon: SiZod },
      { name: "WebSockets" },
    ],
  },
  {
    title: "AI Systems (Production)",
    CatIcon: Cpu,
    tools: [
      { name: "OpenAI", Icon: SiOpenai },
      { name: "Claude", Icon: SiClaude },
      { name: "Gemini", Icon: SiGooglegemini },
      { name: "OpenRouter" },
      { name: "RAG pipelines" },
      { name: "pgvector", Icon: SiPostgresql },
    ],
  },
  {
    title: "Data & Infrastructure",
    CatIcon: Database,
    tools: [
      { name: "PostgreSQL", Icon: SiPostgresql },
      { name: "Prisma", Icon: SiPrisma },
      { name: "Redis", Icon: SiRedis },
      { name: "BullMQ" },
      { name: "Object Storage (S3)", Icon: SiAmazons3 },
    ],
  },
  {
    title: "Observability & Ops",
    CatIcon: Activity,
    tools: [
      { name: "Sentry", Icon: SiSentry },
      { name: "OpenTelemetry", Icon: SiOpentelemetry },
      { name: "Clerk", Icon: SiClerk },
      { name: "Better Auth" },
      { name: "Stripe", Icon: SiStripe },
    ],
  },
  {
    title: "Cloud & Deployment",
    CatIcon: Cloud,
    tools: [
      { name: "AWS", Icon: SiAmazon },
      { name: "Docker", Icon: SiDocker },
      { name: "Vercel", Icon: SiVercel },
      { name: "CI/CD (GitHub Actions)", Icon: SiGithubactions },
    ],
  },
  {
    title: "Architecture & Practices",
    CatIcon: Network,
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
    <section id="skills" className="px-6 py-20 md:px-10 md:py-28 lg:px-16 lg:py-32">
      <div className="mx-auto w-full max-w-[1280px]">
        <SectionHeader index="03" label="Stack" title="The tools, in production." />
        <Reveal delay={0.05}>
          <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-300 sm:text-base">
            Core depth: production RAG and vector search at scale. The rest is full-stack because shipping AI means owning the whole pipeline, not just the model.
          </p>
        </Reveal>

        <dl className="mt-14 space-y-11 lg:space-y-14">
          {categories.map((cat, i) => (
            <Reveal as="div" key={cat.title} delay={0.04 * i}>
              <div className="grid grid-cols-1 gap-x-10 gap-y-5 md:grid-cols-12">
                <dt className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400 md:col-span-4">
                  <cat.CatIcon className="h-4 w-4 shrink-0 text-[var(--foreground)]" />
                  <span>{cat.title}</span>
                </dt>
                <dd className="md:col-span-8">
                  <div className="flex flex-wrap gap-2.5">
                    {cat.tools.map((t) => (
                      <span
                        key={t.name}
                        className="group/chip inline-flex items-center gap-2 border border-black/10 px-3.5 py-2 text-sm text-[var(--foreground)] transition-colors duration-200 hover:border-[var(--foreground)] hover:bg-black/[0.03] dark:border-white/15 dark:hover:bg-white/[0.04]"
                      >
                        {t.Icon && (
                          <t.Icon className="h-4 w-4 shrink-0 text-neutral-500 transition-colors duration-200 group-hover/chip:text-[var(--foreground)] dark:text-neutral-400" />
                        )}
                        {t.name}
                      </span>
                    ))}
                  </div>
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>

        <Reveal delay={0.1}>
          <div className="mt-20">
            <div className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
              <span>Open source</span>
              <span className="h-px flex-1 bg-black/10 dark:bg-white/15" />
              <span>github.com/parbhatkapila4</span>
            </div>
            <div className="github-calendar-wrapper mt-8 overflow-x-auto text-neutral-500 dark:text-neutral-400">
              <GitHubActivity />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Skills;
