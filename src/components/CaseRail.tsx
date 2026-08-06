"use client";

import { useEffect, useState } from "react";

type Entry = { num: string; label: string; id: string };

export function CaseRail({ entries }: { entries: Entry[] }) {
  const [active, setActive] = useState(entries[0]?.id ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    entries.forEach((en) => {
      const el = document.getElementById(en.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [entries]);

  if (entries.length === 0) return null;

  return (
    <nav
      aria-label="Sections"
      className="fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3.5 xl:flex"
    >
      {entries.map((en) => {
        const on = active === en.id;
        return (
          <a key={en.id} href={`#${en.id}`} className="group relative flex items-center gap-2.5">
            <span
              className={`font-mono text-[0.6875rem] tabular-nums transition-colors duration-300 ${
                on ? "text-accent" : "text-[var(--foreground)]/35"
              }`}
            >
              {en.num}
            </span>
            <span
              className={`h-px transition-all duration-300 ${
                on
                  ? "w-8 bg-[var(--accent)]"
                  : "w-3.5 bg-[var(--foreground)]/40 group-hover:w-6"
              }`}
            />
            <span
              className="pointer-events-none absolute left-[calc(100%+0.5rem)] whitespace-nowrap font-mono text-[0.625rem] uppercase tracking-[0.16em] text-[var(--foreground)]/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            >
              {en.label}
            </span>
          </a>
        );
      })}
    </nav>
  );
}
