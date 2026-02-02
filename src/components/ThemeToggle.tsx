"use client";

import { useTheme } from "next-themes";
import { Moon, Sun, Monitor } from "lucide-react";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <button
        className="w-10 h-10 rounded-xl border border-slate-200 bg-slate-100 dark:border-white/10 dark:bg-white/5"
        aria-label="Toggle theme"
      />
    );
  }

  const cycleTheme = () => {
    if (theme === "system") setTheme("light");
    else if (theme === "light") setTheme("dark");
    else setTheme("system");
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
      className="w-10 h-10 rounded-xl flex items-center justify-center border border-slate-200 bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 transition-colors dark:border-white/10 dark:bg-white/5 dark:text-gray-400 dark:hover:bg-white/10 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50 dark:focus:ring-white/30"
      aria-label={label}
      title={label}
    >
      {theme === "system" ? (
        <Monitor className="w-5 h-5" />
      ) : resolvedTheme === "dark" ? (
        <Sun className="w-5 h-5" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
    </button>
  );
};

export default ThemeToggle;
