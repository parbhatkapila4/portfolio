"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Calendar } from "lucide-react";

const CAL_LINK = "https://cal.com/parbhat.kapila/30min";
const DELAY_MS = 3000;

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
      className={`fixed bottom-3 left-1/2 -translate-x-1/2 z-40 flex items-center justify-between gap-3 px-3.5 sm:px-5 py-2 max-w-sm w-auto min-w-[300px] rounded-full bg-slate-800/95 dark:bg-white/[0.08] border border-slate-700/80 dark:border-white/10 shadow-lg backdrop-blur-sm hover:border-teal-500/40 dark:hover:border-white/20 transition-all duration-300 group ${visible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-2 pointer-events-none"
        }`}
      aria-label="Book a 30 minute meeting with Parbhat Kapila"
    >
      <div className="flex items-center gap-2 min-w-0">
        <div className="relative shrink-0">
          <Image
            src="/Parbhat1.jpg"
            alt=""
            width={32}
            height={32}
            className="w-8 h-8 rounded-full object-cover ring-2 ring-slate-600/80 dark:ring-white/10"
          />
          <span
            className="absolute bottom-0 right-0 w-1.5 h-1.5 rounded-full bg-emerald-500 border-2 border-slate-800 dark:border-white/[0.08]"
            aria-hidden
          />
        </div>
        <div className="min-w-0 text-left">
          <p className="font-heading text-xs font-bold text-white truncate leading-tight">
            Let&apos;s build together
          </p>
          <p className="text-[10px] text-slate-400 dark:text-gray-500 truncate leading-tight">
            Available for roles & projects
          </p>
        </div>
      </div>
      <span className="inline-flex items-center justify-center gap-1 px-2.5 py-1.5 bg-white text-black rounded-lg font-semibold text-[11px] shrink-0 shadow-sm group-hover:scale-[1.02] transition-transform">
        <Calendar className="w-3 h-3" aria-hidden />
        Book
      </span>
    </a>
  );
}
