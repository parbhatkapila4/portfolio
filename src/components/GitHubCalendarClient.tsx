"use client";

import { ActivityCalendar } from "react-activity-calendar";
import { useEffect, useState } from "react";

type Activity = { date: string; count: number; level: number };
type ColorScale = [string, string, string, string, string];

const monoTheme: { light: ColorScale; dark: ColorScale } = {
  light: ["#e7e7e2", "#c6c6c0", "#98988f", "#55554f", "#141412"],
  dark: ["#161616", "#2e2e2d", "#525250", "#8f8f8c", "#f2f2f0"],
};

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

  if (!scheme) return <div className="h-[140px]" aria-hidden />;

  return (
    <ActivityCalendar
      data={data}
      colorScheme={scheme}
      theme={monoTheme}
      blockSize={18}
      blockMargin={5}
      fontSize={14}
      showColorLegend={false}
      labels={{ totalCount: `{{count}} contributions in ${year}` }}
      style={{ width: "100%", maxWidth: "100%" }}
    />
  );
}
