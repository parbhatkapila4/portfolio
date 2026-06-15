export type WritingEntry = { slug: string; title: string; field: string };

export const writingIndex: WritingEntry[] = [
  { slug: "sentinel", title: "Sentinel", field: "Permission Layer" },
  { slug: "cutline", title: "CUTLINE", field: "AI Video Pipeline" },
  { slug: "repodoc", title: "RepoDoc", field: "Codebase RAG" },
  { slug: "vectormail", title: "VectorMail", field: "Semantic Email" },
];

export function writingNeighbors(slug: string) {
  const n = writingIndex.length;
  const i = writingIndex.findIndex((w) => w.slug === slug);
  if (i === -1) return { index: -1, docNum: "01", prev: writingIndex[n - 1], next: writingIndex[0], entry: undefined };
  return {
    index: i,
    docNum: String(i + 1).padStart(2, "0"),
    entry: writingIndex[i],
    prev: writingIndex[(i - 1 + n) % n],
    next: writingIndex[(i + 1) % n],
  };
}
