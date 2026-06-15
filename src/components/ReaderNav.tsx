import Link from "next/link";
import { ArrowUpRight, ArrowLeft, ArrowRight } from "lucide-react";
import { writingNeighbors } from "@/lib/writing";

export function ReaderNav({ slug }: { slug: string }) {
  const { prev, next } = writingNeighbors(slug);

  return (
    <div className="mt-24 lg:mt-32">
      <nav className="grid grid-cols-1 border-y border-[var(--foreground)]/10 sm:grid-cols-2 sm:divide-x sm:divide-[var(--foreground)]/10">
        <Link
          href={`/writing/${prev.slug}`}
          className="group flex flex-col gap-2.5 px-5 py-9 transition-colors hover:bg-[var(--foreground)]/[0.02] sm:px-8"
        >
          <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--foreground)]/45">
            <ArrowLeft className="h-3 w-3 transition-transform duration-300 group-hover:-translate-x-0.5" />
            Previous
          </span>
          <span className="font-heading text-xl font-semibold tracking-[-0.01em] sm:text-2xl">{prev.title}</span>
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--foreground)]/45">
            {prev.field}
          </span>
        </Link>

        <Link
          href={`/writing/${next.slug}`}
          className="group flex flex-col items-start gap-2.5 px-5 py-9 transition-colors hover:bg-[var(--foreground)]/[0.02] sm:items-end sm:px-8 sm:text-right"
        >
          <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--foreground)]/45">
            Next
            <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
          </span>
          <span className="font-heading text-xl font-semibold tracking-[-0.01em] sm:text-2xl">{next.title}</span>
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--foreground)]/45">
            {next.field}
          </span>
        </Link>
      </nav>

      <div className="mt-10">
        <Link
          href="/#contact"
          className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--foreground)]"
        >
          Work with me
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </div>
  );
}
