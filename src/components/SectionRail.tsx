"use client";

import { useEffect, useState } from "react";

const items: [string, string][] = [
  ["home", "01"],
  ["projects", "02"],
  ["skills", "03"],
  ["about", "04"],
  ["experience", "05"],
  ["contact", "06"],
];

export default function SectionRail() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    items.forEach(([id]) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Section navigation"
      className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-4 lg:flex"
    >
      {items.map(([id]) => {
        const isActive = active === id;
        return (
          <a key={id} href={`#${id}`} className="group flex items-center justify-end" aria-label={`Go to ${id} section`}>
            <span
              className={`h-px transition-all duration-300 ${
                isActive ? "w-9 bg-foreground" : "w-4 bg-foreground/25 group-hover:w-7 group-hover:bg-foreground/50"
              }`}
            />
          </a>
        );
      })}
    </nav>
  );
}
