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
    <div className="flex shrink-0 items-center" aria-hidden>
      {words.map((w, i) => (
        <span key={i} className="flex items-center">
          <span className="font-heading whitespace-nowrap px-8 text-2xl font-medium tracking-[-0.01em] text-neutral-500 dark:text-neutral-400 sm:text-3xl">
            {w}
          </span>
          <span className="text-neutral-300 dark:text-neutral-700">✳</span>
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <div className="relative overflow-hidden border-y border-black/10 py-6 dark:border-white/15">
      <div className="flex w-max motion-safe:animate-[marquee_50s_linear_infinite]">
        <Group />
        <Group />
      </div>
    </div>
  );
}
