"use client";

import { useTheme } from "next-themes";
import { Moon, Sun, Monitor } from "lucide-react";
import { useEffect, useState, type MouseEvent } from "react";
import { flushSync } from "react-dom";

type ViewTransition = { ready: Promise<void> };
type DocumentWithVT = Document & {
  startViewTransition?: (callback: () => void) => ViewTransition;
};

const ThemeToggle = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <span className="inline-block h-8 w-8" aria-hidden />;
  }

  const nextTheme = () =>
    theme === "system" ? "light" : theme === "light" ? "dark" : "system";

  const cycleTheme = async (event: MouseEvent<HTMLButtonElement>) => {
    const next = nextTheme();
    const doc = document as DocumentWithVT;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (typeof doc.startViewTransition !== "function" || prefersReduced) {
      setTheme(next);
      return;
    }

    const x = event.clientX;
    const y = event.clientY;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = doc.startViewTransition(() => {
      flushSync(() => setTheme(next));
    });

    await transition.ready;

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 550,
        easing: "cubic-bezier(0.4, 0, 0.2, 1)",
        pseudoElement: "::view-transition-new(root)",
      }
    );
  };

  const label =
    theme === "system"
      ? "Using system theme (click for light)"
      : theme === "light"
        ? "Light theme (click for dark)"
        : "Dark theme (click for system)";

  return (
    <button
      onClick={cycleTheme}
      className="flex h-8 w-8 items-center justify-center text-neutral-500 transition-colors hover:text-[var(--foreground)] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-current dark:text-neutral-400"
      aria-label={label}
      title={label}
    >
      {theme === "system" ? (
        <Monitor className="h-4 w-4" />
      ) : resolvedTheme === "dark" ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </button>
  );
};

export default ThemeToggle;
