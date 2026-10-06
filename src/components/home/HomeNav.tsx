"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { profile, sections, socials } from "./home-data";
import { ICONS } from "./icons";

const SCROLL_KEYS = new Set(["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "]);

function useActiveSection() {
  const [active, setActive] = useState(sections[0].id);
  const pinned = useRef(false);
  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);
    if (!els.length) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      if (pinned.current) return;
      const line = Math.min(window.innerHeight * 0.3, 260);
      let current = els[0].id;
      for (const el of els) {
        if (el.getBoundingClientRect().top <= line) current = el.id;
      }
      const end = document.documentElement.scrollHeight - 2;
      if (window.scrollY + window.innerHeight >= end) current = els[els.length - 1].id;
      setActive(current);
    };
    const queue = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const release = () => {
      pinned.current = false;
      queue();
    };
    const onKey = (e: KeyboardEvent) => {
      if (SCROLL_KEYS.has(e.key)) release();
    };
    update();
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    window.addEventListener("wheel", release, { passive: true });
    window.addEventListener("touchmove", release, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
      window.removeEventListener("wheel", release);
      window.removeEventListener("touchmove", release);
      window.removeEventListener("keydown", onKey);
    };
  }, []);
  const pin = (id: string) => {
    pinned.current = true;
    setActive(id);
  };
  return [active, pin] as const;
}

export function HomeNav() {
  const [active, pin] = useActiveSection();

  return (
    <>
      <header className="ident rise">
        <span className="avatar">
          <Image src="/Parbhat1.jpg" alt="" width={685} height={1066} sizes="168px" loading="eager" />
        </span>
        <div>
          <h1 className="ident-name">{profile.name}</h1>
          <p className="ident-role">{profile.role}</p>
        </div>
      </header>

      <div className="side">
        <div className="side-in rise" style={{ animationDelay: "0.06s" }}>
          <nav className="side-nav" aria-label="Sections">
            {sections.map((s, i) => (
              <a
                key={s.id}
                href={i === 0 ? "#home" : `#${s.id}`}
                aria-current={active === s.id ? "true" : undefined}
                onClick={() => pin(s.id)}
              >
                {s.label}
              </a>
            ))}
          </nav>

          <div className="side-foot">
            <ul className="socials">
              {socials.map((s) => (
                <li key={s.id}>
                  <a
                    href={s.href}
                    aria-label={s.label}
                    title={s.label}
                    {...(s.id === "email" ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                  >
                    <svg viewBox="0 0 24 24" aria-hidden>
                      {ICONS[s.id]}
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
            <p className="status">
              <i aria-hidden />
              {profile.status}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
