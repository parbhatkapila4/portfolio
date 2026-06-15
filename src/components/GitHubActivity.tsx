import { GitHubCalendarClient } from "./GitHubCalendarClient";

type Contribution = { date: string; count: number; level: number };
type ApiResponse = {
  contributions?: Contribution[];
};

const USERNAME = "parbhatkapila4";

export default async function GitHubActivity() {
  const year = new Date().getFullYear();

  let contributions: Contribution[] = [];

  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=${year}`,
      { next: { revalidate: 3600 } }
    );
    if (res.ok) {
      const json = (await res.json()) as ApiResponse;
      contributions = json.contributions ?? [];
    }
  } catch {
    contributions = [];
  }

  if (!contributions.length) return null;

  return <GitHubCalendarClient data={contributions} year={year} />;
}
