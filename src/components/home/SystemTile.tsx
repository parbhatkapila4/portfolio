"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type FocusEvent, type KeyboardEvent } from "react";
import { flushSync } from "react-dom";

import { Shot } from "./Shot";
import type { SystemCard } from "./home-data";
import { ICONS } from "./icons";

const TURN_MS = 8000;
const clock = { tick: 0, timer: 0, listeners: new Set<(tick: number) => void>() };
function onTick(listener: (tick: number) => void) {
  clock.listeners.add(listener);
  if (clock.listeners.size === 1) {
    clock.timer = window.setInterval(() => {
      if (document.hidden) return;
      clock.tick += 1;
      clock.listeners.forEach((l) => l(clock.tick));
    }, TURN_MS);
  }
  return () => {
    clock.listeners.delete(listener);
    if (!clock.listeners.size) window.clearInterval(clock.timer);
  };
}
export function SystemTile({ system, order, hint }: { system: SystemCard; order: number; hint?: string }) {
  const { name, shots } = system;
  const count = shots.length;
  const tileRef = useRef<HTMLDivElement>(null);
  const deckRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [index, setIndex] = useState(0);
  const [sides, setSides] = useState(() => shots.map(() => 1));
  const [placing, setPlacing] = useState(-1);
  const [seen, setSeen] = useState(false);
  const [inView, setInView] = useState(false);
  const [pointed, setPointed] = useState(false);
  const [focused, setFocused] = useState(false);
  const holdUntil = useRef(0);
  const turn = (by: number, byHand = true) => {
    if (!by) return;
    if (byHand) holdUntil.current = Date.now() + TURN_MS;
    const to = (index + by + count) % count;
    const from = by > 0 ? 1 : -1;
    if (sides[to] !== from) {
      flushSync(() => {
        setPlacing(to);
        setSides((was) => was.map((side, i) => (i === to ? from : side)));
      });
      deckRef.current?.getBoundingClientRect();
    }
    setPlacing(-1);
    setSides((was) => was.map((side, i) => (i === index ? -from : side)));
    setIndex(to);
  };

  useEffect(() => {
    const tile = tileRef.current;
    if (!tile || count < 2) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setSeen(true);
        setInView(entry.intersectionRatio >= 0.5);
      },
      { threshold: [0, 0.5] },
    );
    io.observe(tile);
    return () => io.disconnect();
  }, [count]);
  const turnRef = useRef(turn);
  const indexRef = useRef(index);
  useEffect(() => {
    turnRef.current = turn;
    indexRef.current = index;
  });
  useEffect(() => {
    if (count < 2 || !inView || pointed || focused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    return onTick((tick) => {
      if (Date.now() < holdUntil.current) return;
      const to = tick % count;
      const from = indexRef.current;
      if (to === from) return;
      const next = slideRefs.current[to]?.querySelector("img");
      if (!next?.complete || !next.naturalWidth) return;
      turnRef.current((to - from + count) % count, false);
    });
  }, [count, inView, pointed, focused]);
  const onKey = (e: KeyboardEvent) => {
    const by = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!by) return;
    e.preventDefault();
    turn(by);
  };
  const onFocus = (e: FocusEvent) => {
    if (e.target.matches(":focus-visible")) setFocused(true);
  };
  const onBlur = (e: FocusEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false);
  };

  return (
    <div
      ref={tileRef}
      className={`tile zz-row${order % 2 ? " flip" : ""}`}
      onPointerEnter={() => setPointed(true)}
      onPointerLeave={() => setPointed(false)}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      <div
        className="tile-shot"
        {...(count > 1
          ? { role: "group", "aria-roledescription": "carousel", "aria-label": `${name} screenshots`, onKeyDown: onKey }
          : {})}
      >
        <span className="shot-slot" aria-hidden>
          <b>{name}</b>
          {hint ? <small>{hint}</small> : null}
        </span>
        <div ref={deckRef} className="deck">
          {shots.map((shot, i) => (
            <div
              key={shot.src}
              ref={(el) => {
                slideRefs.current[i] = el;
              }}
              data-at={i === index ? 0 : sides[i]}
              style={i === placing ? { transition: "none" } : undefined}
              aria-hidden={i === index ? undefined : true}
            >
              {i === 0 || seen ? (
                <Shot
                  src={shot.src}
                  alt={shot.alt}
                  fill
                  sizes="(max-width: 1180px) 100vw, 540px"
                  loading={i === 0 ? "lazy" : "eager"}
                />
              ) : null}
            </div>
          ))}
        </div>
        <a className="shot-link" href={system.url} target="_blank" rel="noopener noreferrer" tabIndex={-1} aria-hidden />
        {count > 1 ? (
          <>
            <button
              type="button"
              className="deck-nav"
              onClick={() => turn(-1)}
              aria-label={`Previous ${name} screenshot`}
            >
              <svg viewBox="0 0 24 24" aria-hidden>
                {ICONS.prev}
              </svg>
            </button>
            <button type="button" className="deck-nav" onClick={() => turn(1)} aria-label={`Next ${name} screenshot`}>
              <svg viewBox="0 0 24 24" aria-hidden>
                {ICONS.next}
              </svg>
            </button>
            <span className="deck-dots" aria-hidden>
              {shots.map((shot, i) => (
                <button
                  key={shot.src}
                  type="button"
                  tabIndex={-1}
                  aria-current={i === index ? "true" : undefined}
                  onClick={() => turn(i - index)}
                />
              ))}
            </span>
          </>
        ) : null}
      </div>
      <div className="zz-txt">
        <span className="zz-num" aria-hidden>
          {String(order + 1).padStart(2, "0")}
        </span>
        <a className="zz-name tile-link" href={system.url} target="_blank" rel="noopener noreferrer">
          <Image src={`/showcase/icon-${system.id}.png`} alt="" width={24} height={24} />
          {name}
        </a>
        {system.line ? <span className="zz-line">{system.line}</span> : null}
        {system.description ? <p className="zz-desc">{system.description}</p> : null}
        {system.metrics.length ? (
          <ul className="zz-chips">
            {system.metrics.map((m) => (
              <li key={m.value}>
                <b>{m.value}</b>
                <span>{m.label}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
