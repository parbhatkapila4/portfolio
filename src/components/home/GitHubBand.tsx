import type { CSSProperties } from "react";

import { GITHUB_URL, GITHUB_USER } from "@/lib/site-content";

type Day = { date: string; level: number; count: number };

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const attr = (tag: string, name: string) =>
  tag.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1];

async function contributions(year: number): Promise<Day[] | null> {
  try {
    const res = await fetch(
      `https://github.com/users/${GITHUB_USER}/contributions?from=${year}-01-01&to=${year}-12-31`,
      { next: { revalidate: 3600 } },
    );
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
    return days.length ? days : null;
  } catch {
    return null;
  }
}

const utc = (date: string) => new Date(`${date}T00:00:00Z`);

export async function GitHubBand() {
  const year = new Date().getUTCFullYear();
  const days = await contributions(year);
  if (!days || days[0].date !== `${year}-01-01`) return null;

  const today = new Date().toISOString().slice(0, 10);
  const total = days.reduce((sum, d) => sum + d.count, 0);
  const lead = utc(days[0].date).getUTCDay();
  const weeks = Math.ceil((lead + days.length) / 7);
  const weekOf = (date: string) =>
    Math.floor((lead + (utc(date).getTime() - utc(days[0].date).getTime()) / 86_400_000) / 7);
  const label = (d: Day) =>
    `${d.count === 0 ? "No" : d.count.toLocaleString("en-US")} contribution${d.count === 1 ? "" : "s"} on ${MONTHS[utc(d.date).getUTCMonth()]
    } ${utc(d.date).getUTCDate()}`;

  return (
    <section className="sec gh reveal" aria-label="GitHub activity">
      <p className="gh-cap">
        <span>
          <b>{total.toLocaleString("en-US")}</b> contributions in {year}
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
          {days.map((d) =>
            d.date > today ? (
              <span key={d.date} className="future" />
            ) : (
              <span key={d.date} className={d.level ? `l${d.level}` : undefined} title={label(d)} />
            ),
          )}
        </span>
        <span className="gh-months">
          {MONTHS.map((m, i) => {
            const first = `${year}-${String(i + 1).padStart(2, "0")}-01`;
            return (
              <span key={m} style={{ gridColumn: weekOf(first) + 1 }}>
                {m}
              </span>
            );
          })}
        </span>
      </div>
    </section>
  );
}
