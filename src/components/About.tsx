import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";
import { Portrait } from "./Portrait";

const expertise = [
  {
    title: "System Architecture",
    text: "Multi-tenant SaaS with per-tenant data isolation, auto-scaling infra, and deployments tuned for cost. Cut infrastructure spend ~95% through architecture changes.",
  },
  {
    title: "AI Production",
    text: "RAG over 10,000+ documents at 94%+ retrieval accuracy, pgvector queries under 200ms. Models picked per task and routed through OpenRouter - GPT-4, Claude, or Gemini - with fallback when a provider degrades or prices spike.",
  },
  {
    title: "Performance & Optimization",
    text: "Brought per-document processing from $5.00 to $0.05 with hash-based chunk reuse. Semantic search holds under 200ms at load. 99.9% uptime.",
  },
  {
    title: "Ownership",
    text: "I own the whole thing: decisions, features, deploys, monitoring, and the stuff that breaks after launch. TypeScript, Next.js, PostgreSQL, Redis, AWS, and Vercel.",
  },
];

const howIWork = [
  "Async-first - decisions documented, PRs that explain the why, not just the what.",
  "Full ownership - I design, deploy, monitor, and fix; root cause over workarounds.",
  "Deploy continuously without destabilizing what's already live.",
  "Reply within 24 hours to anything real.",
];

const About = () => {
  return (
    <section id="about" className="px-6 py-28 sm:px-10 md:py-36 lg:px-14">
      <div className="mx-auto w-full max-w-[87.5rem]">
        <SectionHeader index="04" label="About" />

        <Reveal delay={0.06}>
          <p className="font-display mt-12 max-w-[34ch] text-[clamp(1.8rem,3.8vw,3.2rem)] font-semibold leading-[1.12] tracking-[-0.03em]">
            I architect AI systems{" "}
            <span className="font-serif italic font-normal tracking-normal text-[1.06em]">
              and run them
            </span>{" "}
            - the whole stack, from schema to monitoring. Four years of it, in production. The
            ones here are live, and I maintain them.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-12 lg:mt-24 lg:grid-cols-12">
          <Reveal delay={0.1} className="lg:col-span-4">
            <figure className="group max-w-[21.25rem]">
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <Portrait
                  src="/Parbhat1.jpg"
                  alt="Parbhat Kapila - AI Systems Engineer"
                  sizes="(max-width: 1024px) 280px, 340px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>
              <figcaption className="mt-3 flex items-baseline justify-between border-t border-line pt-3 font-mono text-[0.625rem] uppercase tracking-[0.2em] text-muted">
                <span>Parbhat Kapila</span>
                <span className="text-faint">/ &apos;26</span>
              </figcaption>
              <p className="mt-5 text-[0.875rem] leading-relaxed text-muted">
                Live products you can use today - all engineered and operated by me, no team
                behind them. Everything&apos;s public and verifiable.
              </p>
            </figure>
          </Reveal>

          <div className="flex flex-col gap-10 lg:col-span-6 lg:col-start-7 lg:justify-between">
            <Reveal>
              <p className="font-mono text-[0.625rem] uppercase tracking-[0.3em] text-faint">
                How I work
              </p>
              <ul className="mt-6">
                {howIWork.map((item, i) => (
                  <li
                    key={item}
                    className="flex items-baseline gap-5 border-t border-line py-5 text-[0.9375rem] leading-relaxed text-muted last:border-b"
                  >
                    <span aria-hidden className="font-mono text-[0.6875rem] tabular-nums text-[var(--foreground)]">
                      0{i + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <div className="flex flex-col gap-8">
              <Reveal>
                <p className="max-w-[52ch] text-base leading-relaxed text-[var(--foreground)]/85 sm:text-lg">
                  Most of my work is RAG and LLM infrastructure - retrieval, vector storage, and
                  model routing - tuned for low latency (sub-200ms) and 94%+ accuracy on real workloads.
                </p>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="max-w-[52ch] text-[0.9375rem] leading-relaxed text-muted">
                  Looking for a full-time, early-stage role where I own real systems and deliver
                  without hand-holding.
                </p>
              </Reveal>
            </div>
          </div>
        </div>

        <div className="mt-20 sm:mt-24">
          {expertise.map((item, i) => (
            <Reveal
              as="div"
              key={item.title}
              delay={0.04 * i}
              className="border-t border-line last:border-b"
            >
              <div className="grid grid-cols-1 gap-y-3 py-7 sm:grid-cols-12 sm:gap-x-10 sm:py-8">
                <div className="flex items-baseline gap-4 sm:col-span-4">
                  <span aria-hidden className="font-mono text-[0.625rem] tabular-nums text-faint">
                    0{i + 1}
                  </span>
                  <h3 className="font-display text-lg font-semibold tracking-[-0.015em] sm:text-xl">
                    {item.title}
                  </h3>
                </div>
                <p className="max-w-[62ch] text-[0.9375rem] leading-relaxed text-muted sm:col-span-8">
                  {item.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
};

export default About;
