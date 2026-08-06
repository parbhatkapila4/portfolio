"use client";

import { ActivityCalendar } from "react-activity-calendar";
import { useEffect, useRef, useState } from "react";

type Activity = { date: string; count: number; level: number };
type ColorScale = [string, string, string, string, string];

const monoTheme: { light: ColorScale; dark: ColorScale } = {
  light: ["#e7e7e2", "#c6c6c0", "#98988f", "#55554f", "#141412"],
  dark: ["#161616", "#2e2e2d", "#525250", "#8f8f8c", "#f2f2f0"],
};

const WEEKS = 53;

function useSystemColorScheme(): "light" | "dark" | null {
  const [scheme, setScheme] = useState<"light" | "dark" | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const update = () => setScheme(mq.matches ? "dark" : "light");
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return scheme;
}

export function GitHubCalendarClient({
  data,
  year,
}: {
  data: Activity[];
  year: number;
}) {
  const scheme = useSystemColorScheme();
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setWidth(el.clientWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Size blocks so the 53-week grid fills the container exactly.
  const blockMargin = width >= 1200 ? 6 : width >= 640 ? 5 : 3;
  const blockSize = Math.max(6, Math.floor((width - (WEEKS - 1) * blockMargin) / WEEKS));
  const fontSize = Math.max(12, Math.round(blockSize * 0.62));

  return (
    <div ref={ref} className="w-full">
      {scheme && width > 0 ? (
        <ActivityCalendar
          data={data}
          colorScheme={scheme}
          theme={monoTheme}
          blockSize={blockSize}
          blockMargin={blockMargin}
          fontSize={fontSize}
          showColorLegend={false}
          labels={{ totalCount: `{{count}} contributions in ${year}` }}
          style={{ width: "100%", maxWidth: "100%" }}
        />
      ) : (
        <div className="h-[8.75rem]" aria-hidden />
      )}
    </div>
  );
}
