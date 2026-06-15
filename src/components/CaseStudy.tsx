import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { Grain } from "./Grain";
import { SystemDiagram } from "./SystemDiagram";
import { MetricStrip } from "./MetricStrip";
import { SpecGrid } from "./SpecGrid";
import { CaseHero } from "./CaseHero";
import { CaseRail } from "./CaseRail";
import { ReadingProgress } from "./ReadingProgress";
import { ReaderNav } from "./ReaderNav";
import { Rule } from "./Rule";
import { RevealGroup, RevealItem } from "./RevealGroup";
import { DatasheetBullets } from "./DatasheetBullets";
import { writingNeighbors } from "@/lib/writing";

type DiagramNode = { label: string; sub?: string; accent?: boolean };
type Lane = { label: string; nodes: DiagramNode[] };
type Bullet = { lead?: string; text: string };

export type Block =
  | { kind: "section"; heading: string; intro?: string; paras?: string[]; bullets?: Bullet[] }
  | { kind: "flow"; heading?: string; intro?: string; caption?: string; lanes: Lane[] }
  | { kind: "grid"; heading?: string; intro?: string; items: { title: string; lines: string[] }[] }
  | { kind: "quote"; text: string };

export type CaseStudyData = {
  slug: string;
  title: string;
  tagline: string;
  live: string;
  source: string;
  field?: string;
  year?: string;
  metrics: { value: string; label: string }[];
  blocks: Block[];
};

function SectionHead({ num, heading }: { num: string; heading: string }) {
  return (
    <div className="lg:col-span-4">
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--foreground)]/45">Section {num}</p>
      <h2 className="font-heading mt-2 text-2xl font-semibold tracking-[-0.01em] sm:text-3xl lg:sticky lg:top-28">
        {heading}
      </h2>
    </div>
  );
}

function GhostNum({ num }: { num: string }) {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute -left-2 -top-12 -z-10 hidden select-none font-heading text-[clamp(5rem,11vw,9rem)] font-semibold leading-none tracking-tighter tabular-nums text-[var(--foreground)]/[0.06] lg:block"
    >
      {num}
    </span>
  );
}

function Body({
  intro,
  paras,
  bullets,
  lead,
}: {
  intro?: string;
  paras?: string[];
  bullets?: Bullet[];
  lead?: boolean;
}) {
  return (
    <div className="max-w-[680px]">
      <RevealGroup className="space-y-5">
        {intro && (
          <RevealItem
            as="p"
            className={
              lead
                ? "text-xl leading-relaxed text-[var(--foreground)]/80 first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-heading first-letter:text-[3.75rem] first-letter:font-semibold first-letter:leading-[0.74]"
                : "text-lg leading-relaxed text-[var(--foreground)]/75"
            }
          >
            {intro}
          </RevealItem>
        )}
        {paras?.map((p, i) => (
          <RevealItem as="p" key={i} className="text-base leading-relaxed text-[var(--foreground)]/80">
            {p}
          </RevealItem>
        ))}
      </RevealGroup>
      {bullets && bullets.length > 0 && <DatasheetBullets bullets={bullets} />}
    </div>
  );
}

function FigureHead({ num, heading, intro }: { num: string; heading: string; intro?: string }) {
  return (
    <div className="relative mb-8 grid grid-cols-1 gap-x-8 gap-y-3 lg:grid-cols-12">
      <GhostNum num={num} />
      <SectionHead num={num} heading={heading} />
      {intro && (
        <div className="lg:col-span-7 lg:col-start-6">
          <p className="max-w-[680px] text-lg leading-relaxed text-[var(--foreground)]/75">{intro}</p>
        </div>
      )}
    </div>
  );
}

type Rendered = {
  block: Block;
  num?: string;
  id?: string;
  figNum?: number;
  lead?: boolean;
};

export function CaseStudy({ data }: { data: CaseStudyData }) {
  const { docNum, entry } = writingNeighbors(data.slug);
  const field = data.field ?? entry?.field ?? "Engineering";

  let sectionCount = 0;
  let figCount = 0;
  let firstSection = true;
  const rendered: Rendered[] = data.blocks.map((block) => {
    const hasHeading = "heading" in block && !!block.heading;
    const r: Rendered = { block };
    if (hasHeading) {
      sectionCount += 1;
      r.num = String(sectionCount).padStart(2, "0");
      r.id = `sec-${r.num}`;
    }
    if (block.kind === "flow") {
      figCount += 1;
      r.figNum = figCount;
    }
    if (block.kind === "section") {
      r.lead = firstSection;
      firstSection = false;
    }
    return r;
  });

  const railEntries = rendered
    .filter((r) => r.num && r.id && "heading" in r.block && r.block.heading)
    .map((r) => ({ num: r.num!, id: r.id!, label: (r.block as { heading: string }).heading }));

  return (
    <main className="relative min-h-screen px-6 md:px-10 lg:px-16">
      <Grain />
      <ReadingProgress />
      <CaseRail entries={railEntries} />

      <div className="mx-auto flex max-w-[1180px] items-center justify-between py-6">
        <Link
          href="/"
          className="font-heading text-base font-semibold tracking-[-0.01em] transition-opacity hover:opacity-60"
        >
          Parbhat Kapila
        </Link>
        <div className="flex items-center gap-5">
          <Link
            href="/#projects"
            className="group inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--foreground)]/55 transition-colors hover:text-[var(--foreground)]"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-0.5" />
            Work
          </Link>
          <ThemeToggle />
        </div>
      </div>

      <article className="mx-auto max-w-[1180px] pb-28">
        <CaseHero
          title={data.title}
          tagline={data.tagline}
          live={data.live}
          source={data.source}
          field={field}
          docNum={docNum}
          year={data.year}
        />

        <div className="mt-6">
          <MetricStrip items={data.metrics} />
        </div>

        <div className="mt-24 space-y-28 lg:space-y-32">
          {rendered.map((r, i) => {
            const { block, num, id, figNum, lead } = r;

            if (block.kind === "section") {
              return (
                <section
                  key={i}
                  id={id}
                  className="relative grid scroll-mt-28 grid-cols-1 gap-x-8 gap-y-6 lg:grid-cols-12"
                >
                  {num && <GhostNum num={num} />}
                  {num && <SectionHead num={num} heading={block.heading} />}
                  <div className="lg:col-span-7 lg:col-start-6">
                    <Body intro={block.intro} paras={block.paras} bullets={block.bullets} lead={lead} />
                  </div>
                </section>
              );
            }

            if (block.kind === "quote") {
              return (
                <figure key={i} className="relative mx-auto max-w-[860px] lg:-ml-10">
                  <Rule className="mb-7 w-full" />
                  <blockquote className="font-heading text-[clamp(1.6rem,3.6vw,2.4rem)] font-medium leading-[1.2] tracking-[-0.015em] text-[var(--foreground)]">
                    {block.text}
                  </blockquote>
                  <Rule className="mt-7 w-full" />
                </figure>
              );
            }

            if (block.kind === "flow") {
              return (
                <section key={i} id={id} className="scroll-mt-28">
                  {num && block.heading && <FigureHead num={num} heading={block.heading} intro={block.intro} />}
                  <SystemDiagram lanes={block.lanes} caption={block.caption} figNum={figNum} />
                </section>
              );
            }

            return (
              <section key={i} id={id} className="scroll-mt-28">
                {num && block.heading && <FigureHead num={num} heading={block.heading} intro={block.intro} />}
                <SpecGrid items={block.items} />
              </section>
            );
          })}
        </div>

        <ReaderNav slug={data.slug} />
      </article>
    </main>
  );
}
