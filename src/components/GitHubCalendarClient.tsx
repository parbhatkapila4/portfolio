"use client";

import { ActivityCalendar } from "react-activity-calendar";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

type Activity = { date: string; count: number; level: number };
type ColorScale = [string, string, string, string, string];

const monoTheme: { light: ColorScale; dark: ColorScale } = {
  light: ["#eceae4", "#d0cdc4", "#a8a49a", "#6b675e", "#1a1815"],
  dark: ["#1f1e1c", "#3b3a36", "#5f5d57", "#9a978e", "#ece9e2"],
};

export function GitHubCalendarClient({
  data,
  year,
}: {
  data: Activity[];
  year: number;
}) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="h-[140px]" aria-hidden />;

  return (
    <ActivityCalendar
      data={data}
      colorScheme={resolvedTheme === "dark" ? "dark" : "light"}
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
