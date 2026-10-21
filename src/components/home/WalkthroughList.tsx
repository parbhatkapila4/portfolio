"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type PointerEvent } from "react";

export type Walkthrough = {
  id: string;
  name: string;
  blurb: string;
  src: string;
  poster: string;
  seconds: number | null;
};

const SPEEDS = [1, 1.25, 1.5, 2];
const DEFAULT_SPEED = 1.25;
const CLOSE_MS = 160;
const TIP_GAP = 14;
const EDGE = 12;

const clock = (seconds: number) =>
  `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;
function lockScroll() {
  const html = document.documentElement;
  html.style.paddingRight = `${window.innerWidth - html.clientWidth}px`;
  html.style.overflow = "hidden";
}
function unlockScroll() {
  const html = document.documentElement;
  html.style.paddingRight = "";
  html.style.overflow = "";
}

export function WalkthroughList({ items }: { items: Walkthrough[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const tipRef = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLButtonElement | null)[]>([]);
  const pressedOutside = useRef(false);
  const [shown, setShown] = useState(0);
  const [cover, setCover] = useState("");
  const [speed, setSpeed] = useState(DEFAULT_SPEED);
  const current = items[shown];

  useEffect(() => unlockScroll, []);

  const play = (i: number) => {
    const video = videoRef.current;
    if (!video) return;
    setShown(i);
    setCover(cards.current[i]?.querySelector("img")?.currentSrc || items[i].poster);
    video.src = items[i].src;
    video.defaultPlaybackRate = speed;
    video.playbackRate = speed;
    video.play().catch(() => undefined);
  };

  const open = (i: number) => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    lockScroll();
    dialog.showModal();
    play(i);
    videoRef.current?.focus({ preventScroll: true });
  };
  const close = () => {
    const dialog = dialogRef.current;
    if (!dialog?.open || dialog.dataset.closing !== undefined) return;
    videoRef.current?.pause();
    dialog.dataset.closing = "";
    window.setTimeout(() => dialog.close(), CLOSE_MS);
  };
  const closed = () => {
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.removeAttribute("src");
      video.load();
    }
    delete dialogRef.current?.dataset.closing;
    unlockScroll();
  };

  const rate = (next: number) => {
    setSpeed(next);
    const video = videoRef.current;
    if (!video) return;
    video.defaultPlaybackRate = next;
    video.playbackRate = next;
  };
  const placeTip = (e: PointerEvent<HTMLElement>) => {
    const tip = tipRef.current;
    if (!tip) return;
    let left = e.clientX + TIP_GAP;
    let top = e.clientY + TIP_GAP;
    if (left + tip.offsetWidth > window.innerWidth - EDGE) left = e.clientX - tip.offsetWidth - TIP_GAP;
    if (top + tip.offsetHeight > window.innerHeight - EDGE) top = e.clientY - tip.offsetHeight - TIP_GAP;
    tip.style.transform = `translate3d(${Math.max(EDGE, left)}px, ${Math.max(EDGE, top)}px, 0)`;
  };
  const showTip = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType === "touch") return;
    placeTip(e);
    tipRef.current?.setAttribute("data-on", "");
  };
  const moveTip = (e: PointerEvent<HTMLElement>) => {
    if (!tipRef.current?.hasAttribute("data-on")) return;
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) placeTip(e);
  };
  const hideTip = () => tipRef.current?.removeAttribute("data-on");

  return (
    <>
      <ul className="zz reveal">
        {items.map((w, i) => (
          <li key={w.id}>
            <button
              type="button"
              className={`tile zz-row${i % 2 ? " flip" : ""}`}
              ref={(el) => {
                cards.current[i] = el;
              }}
              aria-label={`Watch the ${w.name} walkthrough${w.seconds ? ` (${clock(w.seconds)})` : ""}`}
              aria-describedby={`wt-blurb-${w.id}`}
              onClick={() => open(i)}
              onPointerEnter={showTip}
              onPointerMove={moveTip}
              onPointerLeave={hideTip}
              onPointerDown={hideTip}
              onBlur={hideTip}
            >
              <span className="tile-shot poster">
                <Image src={w.poster} alt="" width={1100} height={715} sizes="(max-width: 1180px) 100vw, 540px" />
                <span className="tile-len" aria-hidden>
                  <svg viewBox="0 0 24 24">
                    <path d="M8 5.14v13.72a1 1 0 0 0 1.52.85l10.6-6.86a1 1 0 0 0 0-1.7L9.52 4.29A1 1 0 0 0 8 5.14Z" />
                  </svg>
                  {w.seconds ? clock(w.seconds) : "Play"}
                </span>
              </span>
              <span className="zz-txt">
                <span className="zz-num" aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="zz-name">{w.name}</span>
                <span className="zz-desc" id={`wt-blurb-${w.id}`}>
                  {w.blurb}
                </span>
                <span className="zz-cta" aria-hidden>
                  Watch walkthrough
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <div ref={tipRef} className="wt-tip" aria-hidden>
        Watch walkthrough
        <svg viewBox="0 0 24 24">
          <path d="M5 12h14m-6-6 6 6-6 6" />
        </svg>
      </div>

      <dialog
        ref={dialogRef}
        className="wt-box"
        aria-label={`${current.name} walkthrough`}
        data-lenis-prevent
        onPointerDown={(e) => {
          pressedOutside.current = e.target === e.currentTarget;
        }}
        onClick={(e) => {
          if (pressedOutside.current && e.target === e.currentTarget) close();
        }}
        onCancel={(e) => {
          e.preventDefault();
          close();
        }}
        onClose={closed}
      >
        <div className="wt-panel">
          <div className="wt-head">
            <div className="wt-pick" role="group" aria-label="Choose a walkthrough">
              {items.map((w, i) => (
                <button key={w.id} type="button" aria-pressed={i === shown} onClick={() => i !== shown && play(i)}>
                  <Image src={`/showcase/icon-${w.id}.png`} alt="" width={16} height={16} />
                  {w.name}
                </button>
              ))}
            </div>
            <button type="button" className="wt-close" onClick={close} aria-label="Close the walkthrough">
              <svg viewBox="0 0 24 24" aria-hidden>
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
          </div>

          <div className="wt-stage">
            <video
              ref={videoRef}
              preload="none"
              playsInline
              controls
              poster={cover || undefined}
              tabIndex={0}
              aria-label={`${current.name} walkthrough`}
              onRateChange={(e) => setSpeed(e.currentTarget.playbackRate)}
            />
          </div>

          <div className="wt-meta">
            <p>
              <b>{current.name}</b> · Loom walkthrough
              {current.seconds ? <span> · {clock(current.seconds)}</span> : null}
            </p>
            <div className="wt-speed" role="group" aria-label="Playback speed">
              {SPEEDS.map((s) => (
                <button key={s} type="button" aria-pressed={s === speed} onClick={() => rate(s)}>
                  {s}×
                </button>
              ))}
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
