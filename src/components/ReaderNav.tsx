import Link from "next/link";
import { writingNeighbors } from "@/lib/writing";

export function ReaderNav({ slug }: { slug: string }) {
  const { prev, next } = writingNeighbors(slug);

  return (
    <div className="mt-24 lg:mt-32">
      <nav>
        <Link
          href={`/writing/${prev.slug}`}
          className="group grid grid-cols-1 gap-y-2 border-t border-line py-8 sm:grid-cols-12 sm:items-baseline sm:gap-x-8 sm:py-9"
        >
          <span className="inline-flex items-center gap-2 font-mono text-[0.625rem] uppercase tracking-[0.22em] text-faint sm:col-span-3">
            <span
              aria-hidden
              className="inline-block h-px w-4 shrink-0 bg-current opacity-60 transition-[width] duration-300 group-hover:w-7"
            />
            Previous
          </span>
          <span className="font-display text-2xl font-semibold tracking-[-0.02em] transition-transform duration-300 group-hover:translate-x-2 sm:col-span-6 sm:text-3xl">
            {prev.title}
          </span>
          <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted sm:col-span-3 sm:text-right">
            {prev.field}
          </span>
        </Link>

        <Link
          href={`/writing/${next.slug}`}
          className="group grid grid-cols-1 gap-y-2 border-y border-line py-8 sm:grid-cols-12 sm:items-baseline sm:gap-x-8 sm:py-9"
        >
          <span className="inline-flex items-center gap-2 font-mono text-[0.625rem] uppercase tracking-[0.22em] text-faint sm:col-span-3">
            Next
            <span
              aria-hidden
              className="inline-block h-px w-4 shrink-0 bg-current opacity-60 transition-[width] duration-300 group-hover:w-7"
            />
          </span>
          <span className="font-display text-2xl font-semibold tracking-[-0.02em] transition-transform duration-300 group-hover:translate-x-2 sm:col-span-6 sm:text-3xl">
            {next.title}
          </span>
          <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted sm:col-span-3 sm:text-right">
            {next.field}
          </span>
        </Link>
      </nav>

      <div className="mt-12">
        <Link
          href="/#contact"
          className="group link-underline inline-flex items-center gap-2 font-display text-xl font-semibold tracking-[-0.02em] text-[var(--foreground)]"
        >
          Work with me
          <span
            aria-hidden
            className="inline-block h-px w-5 shrink-0 bg-current opacity-60 transition-[width] duration-300 group-hover:w-9"
          />
        </Link>
      </div>
    </div>
  );
}
