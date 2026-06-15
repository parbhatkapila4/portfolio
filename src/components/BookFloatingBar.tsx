"use client";

import { useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";

const CAL_LINK = "https://cal.com/parbhat.kapila/30min";
const DELAY_MS = 2000;

export default function BookFloatingBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  return (
    <a
      href={CAL_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className={`group fixed bottom-5 right-5 z-40 inline-flex items-center gap-2.5 border border-black/15 bg-[var(--background)]/85 px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--foreground)] shadow-[0_8px_30px_rgb(0_0_0_/0.08)] backdrop-blur-md transition-all duration-500 hover:border-[var(--foreground)] dark:border-white/15 max-md:bottom-4 max-md:right-4 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
      aria-label="Book a 30 minute call with Parbhat Kapila"
    >
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--foreground)] motion-safe:animate-pulse" />
      Book a call
      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
  );
}
