"use client";

import { Children, useEffect, useRef, useState, type ReactNode } from "react";

import { ICONS } from "./icons";

type WheelWithLenis = WheelEvent & { lenisStopPropagation?: boolean };

const DRAG_SLOP = 6;
const FLICK = 0.3;
const SETTLE_MS = 700;
export function Rail({
  heading,
  label,
  noun,
  children,
}: {
  heading: ReactNode;
  label: string;
  noun: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLUListElement>(null);
  const count = Children.count(children);
  const [index, setIndex] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const rail = ref.current;
    if (!rail) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const cards = rail.children as HTMLCollectionOf<HTMLElement>;
      setScrolled(rail.scrollLeft > 2);
      if (cards.length < 2) return;
      const step = cards[1].offsetLeft - cards[0].offsetLeft;
      const i = Math.round(rail.scrollLeft / step);
      setIndex(Math.max(0, Math.min(cards.length - 1, i)));
    };
    const queue = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) (e as WheelWithLenis).lenisStopPropagation = true;
    };
    update();
    rail.addEventListener("scroll", queue, { passive: true });
    rail.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("resize", queue);
    return () => {
      cancelAnimationFrame(frame);
      rail.removeEventListener("scroll", queue);
      rail.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", queue);
    };
  }, []);
  useEffect(() => {
    const rail = ref.current;
    if (!rail) return;
    let pointer = -1;
    let dragging = false;
    let dragged = false;
    let startX = 0;
    let startLeft = 0;
    let lastX = 0;
    let lastT = 0;
    let speed = 0;
    let target = 0;
    let settle = 0;

    const settled = () => {
      window.clearTimeout(settle);
      settle = 0;
      rail.removeEventListener("scrollend", arrived);
      delete rail.dataset.settling;
    };
    const arrived = () => {
      if (Math.abs(rail.scrollLeft - target) < 2) settled();
    };
    const down = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      settled();
      pointer = e.pointerId;
      dragging = dragged = false;
      startX = lastX = e.clientX;
      startLeft = rail.scrollLeft;
      lastT = e.timeStamp;
      speed = 0;
    };
    const move = (e: PointerEvent) => {
      if (e.pointerId !== pointer) return;
      if (!dragging) {
        if (Math.abs(e.clientX - startX) < DRAG_SLOP) return;
        dragging = dragged = true;
        rail.setPointerCapture(pointer);
        rail.dataset.dragging = "";
      }
      const dt = e.timeStamp - lastT;
      if (dt > 0) speed = 0.7 * speed + 0.3 * ((lastX - e.clientX) / dt);
      lastX = e.clientX;
      lastT = e.timeStamp;
      rail.scrollLeft = startLeft - (e.clientX - startX);
    };
    const up = (e: PointerEvent) => {
      if (e.pointerId !== pointer) return;
      pointer = -1;
      if (!dragging) return;
      dragging = false;
      const left = rail.scrollLeft;
      rail.dataset.settling = "";
      delete rail.dataset.dragging;
      window.setTimeout(() => {
        dragged = false;
      });
      const cards = rail.children as HTMLCollectionOf<HTMLElement>;
      const step = cards.length > 1 ? cards[1].offsetLeft - cards[0].offsetLeft : 0;
      if (!step) {
        settled();
        return;
      }
      const from = Math.round(startLeft / step);
      let to = Math.round(left / step);
      if (e.timeStamp - lastT > 80) speed = 0;
      const pulled = left - startLeft;
      if (to === from && (Math.abs(speed) > FLICK || Math.abs(pulled) > step * 0.18)) {
        to = from + Math.sign(Math.abs(speed) > FLICK ? speed : pulled);
      }
      target = Math.max(0, Math.min(cards.length - 1, to)) * step;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      rail.addEventListener("scrollend", arrived);
      settle = window.setTimeout(settled, SETTLE_MS);
      rail.scrollTo({ left: target, behavior: reduce ? "auto" : "smooth" });
    };
    const click = (e: MouseEvent) => {
      if (!dragged) return;
      dragged = false;
      e.preventDefault();
      e.stopPropagation();
    };
    const native = (e: DragEvent) => e.preventDefault();

    rail.addEventListener("pointerdown", down);
    rail.addEventListener("pointermove", move);
    rail.addEventListener("pointerup", up);
    rail.addEventListener("pointercancel", up);
    rail.addEventListener("click", click, true);
    rail.addEventListener("dragstart", native);
    return () => {
      settled();
      rail.removeEventListener("pointerdown", down);
      rail.removeEventListener("pointermove", move);
      rail.removeEventListener("pointerup", up);
      rail.removeEventListener("pointercancel", up);
      rail.removeEventListener("click", click, true);
      rail.removeEventListener("dragstart", native);
    };
  }, []);

  const go = (i: number) => {
    const rail = ref.current;
    if (!rail) return;
    const cards = rail.children as HTMLCollectionOf<HTMLElement>;
    const target = cards[Math.max(0, Math.min(cards.length - 1, i))];
    if (!target) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    rail.scrollTo({
      left: target.offsetLeft - cards[0].offsetLeft,
      behavior: reduce ? "auto" : "smooth",
    });
  };

  return (
    <div className="rail-shell">
      <div className="rail-head">{heading}</div>
      <ul ref={ref} className="rail" aria-label={label} data-scrolled={scrolled || undefined}>
        {children}
      </ul>
      {count > 1 ? (
        <div className="meter" role="group" aria-label={`${label} gallery`}>
          <button
            type="button"
            className="meter-nav"
            onClick={() => go(index - 1)}
            disabled={index === 0}
            aria-label={`Previous ${noun}`}
          >
            <svg viewBox="0 0 24 24" aria-hidden>
              {ICONS.prev}
            </svg>
          </button>
          <span className="meter-dots" aria-hidden>
            {Array.from({ length: count }, (_, i) => (
              <button
                key={i}
                type="button"
                tabIndex={-1}
                className="meter-dot"
                aria-current={i === index ? "true" : undefined}
                onClick={() => go(i)}
              />
            ))}
          </span>
          <button
            type="button"
            className="meter-nav"
            onClick={() => go(index + 1)}
            disabled={index === count - 1}
            aria-label={`Next ${noun}`}
          >
            <svg viewBox="0 0 24 24" aria-hidden>
              {ICONS.next}
            </svg>
          </button>
        </div>
      ) : null}
    </div>
  );
}
