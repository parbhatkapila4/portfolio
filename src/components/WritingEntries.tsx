"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Play } from "lucide-react";
import { useLenis } from "lenis/react";
import { Reveal } from "./Reveal";
import { VideoModal } from "./VideoModal";

export type WritingEntryItem = {
  slug: string;
  name: string;
  subtitle: string;
  tagline: string;
  field: string;
  year: string;
  video: string;
};

export function WritingEntries({ entries }: { entries: WritingEntryItem[] }) {
  const lenis = useLenis();
  const [videoOpen, setVideoOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState("");
  const [currentName, setCurrentName] = useState("");
  const [currentPoster, setCurrentPoster] = useState<string | undefined>(undefined);

  const handleVideoOpen = (entry: WritingEntryItem) => {
    setCurrentVideo(entry.video);
    setCurrentName(entry.name);
    setCurrentPoster(`/covers/${entry.slug}.jpg`);
    setVideoOpen(true);
    lenis?.stop();
    document.body.style.overflow = "hidden";
  };

  const handleVideoClose = () => {
    setVideoOpen(false);
    setCurrentVideo("");
    setCurrentName("");
    setCurrentPoster(undefined);
    lenis?.start();
    document.body.style.overflow = "unset";
  };

  useEffect(() => {
    if (!videoOpen) return;
    const handleEsc = (e: KeyboardEvent) => e.key === "Escape" && handleVideoClose();
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoOpen]);

  return (
    <>
      <nav className="mt-14 sm:mt-20" aria-label="Case studies">
        {entries.map((w, i) => (
          <Reveal as="div" key={w.slug} delay={0.06 * i} className="border-t border-line last:border-b">
            <div className="grid grid-cols-1 gap-y-8 py-10 sm:py-14 lg:grid-cols-12 lg:gap-x-10">
              <Link
                href={`/writing/${w.slug}`}
                className="group flex flex-col lg:col-span-7"
              >
                <p className="flex items-baseline gap-4 font-mono text-[0.625rem] uppercase tracking-[0.22em] text-faint">
                  <span aria-hidden className="tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-muted">{w.field}</span>
                  <span aria-hidden>·</span>
                  <span>{w.year}</span>
                </p>

                <h2 className="font-display mt-6 text-[clamp(2.4rem,6vw,4.6rem)] font-bold uppercase leading-[0.92] tracking-[-0.03em] transition-transform duration-300 group-hover:translate-x-2">
                  {w.name}
                </h2>
                <p className="font-serif mt-3 text-[clamp(1.25rem,2.6vw,1.9rem)] italic leading-[1.15] text-[var(--foreground)]/80">
                  {w.subtitle}
                </p>

                <p className="mt-7 max-w-[52ch] text-[0.9375rem] leading-relaxed text-muted">
                  {w.tagline}
                </p>

                <span className="mt-auto hidden items-center gap-2 pt-8 font-mono text-[0.625rem] uppercase tracking-[0.22em] text-faint transition-colors duration-300 group-hover:text-[var(--foreground)] lg:inline-flex">
                  Read the deep-dive
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>

              <div className="lg:col-span-5">
                <button
                  type="button"
                  onClick={() => handleVideoOpen(w)}
                  aria-label={`Play ${w.name} walkthrough video`}
                  className="group/v relative block aspect-video w-full overflow-hidden border border-line bg-[#0d0d0f] transition-colors duration-300 hover:border-line-strong focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-current"
                >
                  <Image
                    src={`/covers/${w.slug}.jpg`}
                    alt={`${w.name} - ${w.field}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 460px"
                    className="object-cover opacity-90 transition-all duration-700 ease-out group-hover/v:scale-[1.04] group-hover/v:opacity-100"
                  />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md transition-all duration-300 group-hover/v:scale-105 group-hover/v:bg-white group-hover/v:text-black sm:h-14 sm:w-14">
                      <Play className="h-4 w-4 translate-x-px sm:h-5 sm:w-5" fill="currentColor" />
                    </span>
                  </span>
                </button>
                <Link
                  href={`/writing/${w.slug}`}
                  className="mt-4 flex items-center gap-2 font-mono text-[0.625rem] uppercase tracking-[0.22em] text-faint lg:hidden"
                >
                  Read the deep-dive
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </Reveal>
        ))}
      </nav>

      <VideoModal
        isOpen={videoOpen}
        onClose={handleVideoClose}
        videoSrc={currentVideo}
        projectName={currentName}
        poster={currentPoster}
      />
    </>
  );
}
