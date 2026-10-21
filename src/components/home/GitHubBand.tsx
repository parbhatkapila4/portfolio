import type { CSSProperties } from "react";

import { GITHUB_URL, GITHUB_USER } from "@/lib/site-content";

type Day = { date: string; level: number; count: number };

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const attr = (tag: string, name: string) =>
  tag.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1];

const DAY_MS = 86_400_000;
const LABEL_WEEKS = 3;

const utc = (date: string) => new Date(`${date}T00:00:00Z`);

async function contributions(): Promise<Day[] | null> {
  try {
    const res = await fetch(`https://github.com/users/${GITHUB_USER}/contributions`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const html = await res.text();

    const counts = new Map<string, number>();
    for (const m of html.matchAll(/<tool-tip\b([^>]*)>([^<]*)<\/tool-tip>/g)) {
      const id = attr(m[1], "for");
      const n = m[2].trim().match(/^(No|[\d,]+) contributions?\b/);
      if (id && n) counts.set(id, n[1] === "No" ? 0 : Number(n[1].replace(/,/g, "")));
    }

    const days: Day[] = [];
    for (const m of html.matchAll(/<td\b[^>]*\bContributionCalendar-day\b[^>]*>/g)) {
      const date = attr(m[0], "data-date");
      const id = attr(m[0], "id");
      const level = Number(attr(m[0], "data-level"));
      const count = id ? counts.get(id) : undefined;
      if (!date || count === undefined || !(level >= 0 && level <= 4)) return null;
      days.push({ date, level, count });
    }
    days.sort((a, b) => (a.date < b.date ? -1 : 1));
    for (let i = 1; i < days.length; i++) {
      if (utc(days[i].date).getTime() - utc(days[i - 1].date).getTime() !== DAY_MS) return null;
    }
    return days.length ? days : null;
  } catch {
    return null;
  }
}

export async function GitHubBand() {
  const days = await contributions();
  if (!days) return null;

  const total = days.reduce((sum, d) => sum + d.count, 0);
  const lead = utc(days[0].date).getUTCDay();
  const weeks = Math.ceil((lead + days.length) / 7);
  const months: { col: number; span: number; month: number }[] = [];
  for (let col = 0; col < weeks; col++) {
    const month = utc(days[Math.max(0, col * 7 - lead)].date).getUTCMonth();
    const run = months[months.length - 1];
    if (run?.month === month) run.span += 1;
    else months.push({ col, span: 1, month });
  }
  const label = (d: Day) => {
    const day = utc(d.date);
    const count = d.count === 0 ? "No" : d.count.toLocaleString("en-US");
    return `${count} contribution${d.count === 1 ? "" : "s"} on ${MONTHS[day.getUTCMonth()]} ${day.getUTCDate()}, ${day.getUTCFullYear()}`;
  };

  return (
    <section className="sec gh reveal" aria-label="GitHub activity">
      <p className="gh-cap">
        <span>
          <b>{total.toLocaleString("en-US")}</b> contributions in the last year
        </span>
        <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
          Verify on GitHub ↗
        </a>
      </p>
      <div className="gh-cal" aria-hidden style={{ "--weeks": weeks } as CSSProperties}>
        <span className="gh-days">
          <span />
          <span>Mon</span>
          <span />
          <span>Wed</span>
          <span />
          <span>Fri</span>
          <span />
        </span>
        <span className="gh-grid">
          {Array.from({ length: lead }, (_, i) => (
            <span key={`pad-${i}`} className="pad" />
          ))}
          {days.map((d) => (
            <span key={d.date} className={d.level ? `l${d.level}` : undefined} title={label(d)} />
          ))}
        </span>
        <span className="gh-months">
          {months
            .filter((m) => m.span >= LABEL_WEEKS)
            .map((m) => (
              <span key={m.col} style={{ gridColumn: m.col + 1 }}>
                {MONTHS[m.month]}
              </span>
            ))}
        </span>
      </div>
    </section>
  );
}
