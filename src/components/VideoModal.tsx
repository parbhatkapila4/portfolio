"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, Pause, X, Volume2, VolumeX, Maximize, Minimize, Check } from "lucide-react";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];
const SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 2];
const DEFAULT_RATE = 1.25;

function fmtTime(s: number) {
  if (!Number.isFinite(s) || s < 0) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

function VideoPlayer({ src, poster }: { src: string; poster?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const rateRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [rate, setRate] = useState(DEFAULT_RATE);
  const [rateOpen, setRateOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const [isFs, setIsFs] = useState(false);

  useEffect(() => {
    const onFs = () => setIsFs(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  useEffect(() => {
    if (!rateOpen) return;
    const onDown = (e: MouseEvent) => {
      if (rateRef.current && !rateRef.current.contains(e.target as Node)) setRateOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [rateOpen]);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => { });
    else v.pause();
  };
  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };
  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const v = videoRef.current;
    if (!v || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    v.currentTime = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)) * duration;
  };
  const changeRate = (r: number) => {
    const v = videoRef.current;
    if (v) v.playbackRate = r;
    setRate(r);
    setRateOpen(false);
  };
  const toggleFs = () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else wrapRef.current?.requestFullscreen?.();
  };

  const progress = duration ? (current / duration) * 100 : 0;
  const ctrlBtn = "flex h-8 w-8 items-center justify-center rounded-full text-white/75 transition-colors hover:bg-white/10 hover:text-white";

  return (
    <div
      ref={wrapRef}
      className={`group/player relative w-full overflow-hidden bg-black ${
        isFs ? "h-full" : "aspect-video max-h-[74vh]"
      }`}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay
        playsInline
        onClick={togglePlay}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(e) => setCurrent(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => {
          setDuration(e.currentTarget.duration);
          e.currentTarget.playbackRate = DEFAULT_RATE;
        }}
        onLoadedData={() => setReady(true)}
        onPlaying={() => setReady(true)}
        onError={() => setReady(true)}
        className="absolute inset-0 h-full w-full cursor-pointer object-contain"
      >
        Your browser does not support the video tag.
      </video>

      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 overflow-hidden bg-[#0c0c0e] transition-opacity duration-700 ${
          ready ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.05] to-transparent motion-safe:animate-[shimmer_1.8s_ease-in-out_infinite]" />

        <div className="absolute inset-x-5 top-5 flex items-center justify-between sm:inset-x-8 sm:top-7">
          <span className="h-2 w-36 rounded-[2px] bg-white/[0.07]" />
          <span className="hidden h-2 w-24 rounded-[2px] bg-white/[0.05] sm:block" />
        </div>

        <div className="absolute left-5 top-1/2 w-3/5 -translate-y-1/2 sm:left-8 lg:left-10">
          <span className="block h-6 w-4/5 rounded-[2px] bg-white/[0.08] sm:h-9" />
          <span className="mt-3 block h-6 w-3/5 rounded-[2px] bg-white/[0.08] sm:h-9" />
          <span className="mt-6 block h-2 w-44 rounded-[2px] bg-white/[0.06]" />
        </div>

        <p className="absolute bottom-16 left-5 font-mono text-[0.5625rem] uppercase tracking-[0.3em] text-white/40 motion-safe:animate-pulse sm:bottom-20 sm:left-8 lg:left-10">
          Loading walkthrough
        </p>

        <div className="absolute inset-x-5 bottom-5 flex items-center gap-4 sm:inset-x-8 sm:bottom-7">
          <span className="h-7 w-7 rounded-full bg-white/[0.07]" />
          <span className="h-[3px] flex-1 rounded-[2px] bg-white/[0.06]" />
          <span className="h-2 w-12 rounded-[2px] bg-white/[0.05]" />
        </div>
      </div>

      {ready && !playing && (
        <button
          onClick={togglePlay}
          aria-label="Play"
          className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-black backdrop-blur-sm transition-transform duration-300 hover:scale-105"
        >
          <Play className="h-6 w-6 translate-x-0.5" fill="currentColor" />
        </button>
      )}

      <div
        className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent px-4 pb-3.5 pt-16 transition-opacity duration-300 ${
          !ready
            ? "pointer-events-none opacity-0"
            : playing
              ? "opacity-0 group-hover/player:opacity-100"
              : "opacity-100"
        }`}
      >
        <div onClick={seek} className="group/bar relative flex h-3 cursor-pointer items-center" aria-hidden>
          <div className="h-[3px] w-full rounded-full bg-white/20">
            <div className="relative h-full rounded-full bg-white" style={{ width: `${progress}%` }}>
              <span className="absolute right-0 top-1/2 h-2.5 w-2.5 -translate-y-1/2 translate-x-1/2 rounded-full bg-white opacity-0 transition-opacity group-hover/bar:opacity-100" />
            </div>
          </div>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <button onClick={togglePlay} aria-label={playing ? "Pause" : "Play"} className="text-white/90 transition-colors hover:text-white">
              {playing ? <Pause className="h-5 w-5" fill="currentColor" /> : <Play className="h-5 w-5 translate-x-px" fill="currentColor" />}
            </button>
            <span className="font-mono text-[0.6875rem] tabular-nums text-white/65">
              {fmtTime(current)} <span className="text-white/30">/</span> {fmtTime(duration)}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button onClick={toggleMute} aria-label={muted ? "Unmute" : "Mute"} className={ctrlBtn}>
              {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </button>

            <div ref={rateRef} className="relative">
              <button
                onClick={() => setRateOpen((o) => !o)}
                aria-label="Playback speed"
                className="flex h-8 min-w-[2.25rem] items-center justify-center rounded-full px-1.5 font-mono text-[0.6875rem] tabular-nums text-white/75 transition-colors hover:bg-white/10 hover:text-white"
              >
                {rate === 1 ? "1×" : `${rate}×`}
              </button>
              {rateOpen && (
                <div className="absolute bottom-[calc(100%+0.5rem)] right-0 z-30 flex w-32 flex-col overflow-hidden rounded-xl border border-white/10 bg-[#111113] p-1 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.8)]">
                  {SPEEDS.map((r) => (
                    <button
                      key={r}
                      onClick={() => changeRate(r)}
                      className={`flex items-center justify-between rounded-lg px-3 py-1.5 font-mono text-[0.6875rem] tabular-nums transition-colors ${rate === r ? "text-white" : "text-white/55 hover:bg-white/5 hover:text-white"
                        }`}
                    >
                      {r === 1 ? "Normal" : `${r}×`}
                      {rate === r && <Check className="h-3 w-3" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button onClick={toggleFs} aria-label={isFs ? "Exit fullscreen" : "Fullscreen"} className={ctrlBtn}>
              {isFs ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export const VideoModal = ({
  isOpen,
  onClose,
  videoSrc,
  projectName,
  poster,
}: {
  isOpen: boolean;
  onClose: () => void;
  videoSrc: string;
  projectName: string;
  poster?: string;
}) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        className="fixed inset-0 z-50 flex flex-col bg-black/80 backdrop-blur-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: EASE_OUT }}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={`${projectName} walkthrough video`}
      >
        <div className="flex flex-1 items-center justify-center px-4 py-8 sm:px-10 sm:py-10" onClick={onClose}>
          <motion.div
            className="relative w-full max-w-[73.75rem]"
            initial={{ scale: 0.96, opacity: 0, y: 14 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.97, opacity: 0, y: 14 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-5 flex items-end justify-between gap-6 border-b border-white/10 pb-5">
              <div>
                <p className="font-mono text-[0.5625rem] uppercase tracking-[0.3em] text-white/40">
                  Walkthrough
                </p>
                <h3 className="font-display mt-2 text-2xl font-bold uppercase leading-none tracking-[-0.02em] text-white sm:text-4xl">
                  {projectName}
                </h3>
              </div>
              <button
                onClick={onClose}
                aria-label="Close walkthrough"
                className="group flex items-center gap-3 font-mono text-[0.625rem] uppercase tracking-[0.22em] text-white/45 transition-colors hover:text-white"
              >
                <span className="hidden sm:inline">Close</span>
                <span className="flex h-10 w-10 items-center justify-center border border-white/15 transition-all duration-300 group-hover:border-white/50 group-hover:bg-white/5">
                  <X className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90" />
                </span>
              </button>
            </div>
            <div className="overflow-hidden bg-black shadow-[0_50px_140px_-30px_rgba(0,0,0,0.9)] ring-1 ring-white/10">
              <VideoPlayer key={videoSrc} src={videoSrc} poster={poster} />
            </div>
            <div className="mt-4 text-center font-mono text-[0.625rem] uppercase tracking-[0.22em] text-white/30">
              Esc or click outside to close
            </div>
          </motion.div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);
