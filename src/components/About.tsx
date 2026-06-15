import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";

const expertise = [
  {
    title: "System Architecture",
    text: "Multi-tenant SaaS with per-tenant data isolation, auto-scaling infra, and deployments tuned for cost. Cut infrastructure spend ~95% through architecture changes.",
  },
  {
    title: "AI/ML Production",
    text: "RAG over 10,000+ documents at 94%+ retrieval accuracy, pgvector queries under 200ms. Models picked per task and routed through OpenRouter - GPT-4, Claude, or Gemini - with fallback when a provider degrades or prices spike.",
  },
  {
    title: "Performance & Optimization",
    text: "Brought per-document processing from $5.00 to $0.05 with hash-based chunk reuse. Semantic search holds under 200ms at load. 99.9% uptime.",
  },
  {
    title: "Ownership",
    text: "I own the whole thing: decisions, features, deploys, monitoring, and the stuff that breaks after launch. TypeScript, Next.js, Python, PostgreSQL, Redis, AWS, and Vercel.",
  },
];

const howIWork = [
  "Async-first - decisions documented, PRs that explain the why, not just the what.",
  "Full ownership - I design, deploy, monitor, and fix; root cause over workarounds.",
  "Ship continuously without breaking what's already live.",
  "Reply within 24 hours to anything real.",
];

const About = () => {
  return (
    <section id="about" className="px-6 py-20 md:px-10 md:py-28 lg:px-16 lg:py-32">
      <div className="mx-auto w-full max-w-[1280px]">
        <SectionHeader index="04" label="About" />

        <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-10 lg:col-start-2">
            <p className="font-heading text-[clamp(1.5rem,3.4vw,2.5rem)] font-medium leading-[1.18] tracking-[-0.02em]">
              I build AI systems and run them - the whole stack, from schema to monitoring.
              Four years of it, in production. The ones here are live, and I maintain them.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-8 lg:grid-cols-12 lg:gap-y-12">
          <Reveal className="lg:col-span-5 lg:col-start-2">
            <p className="max-w-md text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-300">
              Most of my work is RAG and LLM infrastructure - retrieval, vector storage, and
              model routing - tuned for low latency (sub-200ms) and 94%+ accuracy on real workloads.
            </p>
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-5">
            <p className="max-w-md text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-300">
              Looking for a full-time, early-stage role where I own real systems and ship
              without hand-holding.
            </p>
          </Reveal>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-x-10 gap-y-0 md:grid-cols-2">
          {expertise.map((item, i) => (
            <Reveal as="div" key={item.title} delay={0.05 * (i % 2)}>
              <div className="flex h-full flex-col border-t border-black/10 py-9 dark:border-white/15 md:odd:pr-6 md:even:border-l md:even:pl-10 md:even:dark:border-white/15">
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-xs tabular-nums text-neutral-400 dark:text-neutral-500">
                    0{i + 1}
                  </span>
                  <h3 className="font-heading text-2xl font-semibold tracking-[-0.01em] sm:text-3xl">
                    {item.title}
                  </h3>
                </div>
                <p className="mt-4 text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-300">
                  {item.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-400 dark:text-neutral-500">
            How I work
          </p>
          <ul className="mt-6 grid grid-cols-1 gap-x-12 gap-y-5 sm:grid-cols-2">
            {howIWork.map((item) => (
              <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-300">
                <span className="mt-2.5 h-px w-4 shrink-0 bg-current opacity-40" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
};

export default About;
