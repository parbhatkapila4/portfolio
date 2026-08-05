const words = [
  "RAG pipelines",
  "pgvector",
  "Next.js",
  "TypeScript",
  "vector search",
  "LLM orchestration",
  "PostgreSQL",
  "Redis",
  "real-time systems",
  "cost-optimized AI",
  "self-healing pipelines",
  "production-grade",
];

function Group() {
  return (
    <div className="flex shrink-0 items-baseline" aria-hidden>
      {words.map((w, i) => (
        <span key={i} className="flex items-baseline">
          <span className="text-outline whitespace-nowrap px-7 font-display text-[clamp(2.2rem,5vw,4.4rem)] font-bold uppercase leading-none tracking-[-0.02em] sm:px-10">
            {w}
          </span>
          <span className="text-[clamp(0.7rem,1.2vw,1rem)] leading-none text-foreground/20">✳</span>
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <div className="relative overflow-hidden py-12 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] sm:py-16">
      <div className="flex w-max motion-safe:animate-[marquee_80s_linear_infinite]">
        <Group />
        <Group />
      </div>
    </div>
  );
}
