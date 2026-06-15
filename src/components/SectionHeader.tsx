import { Reveal } from "./Reveal";

type SectionHeaderProps = {
  index: string;
  label: string;
  title?: string;
};

export function SectionHeader({ index, label, title }: SectionHeaderProps) {
  return (
    <div>
      <div className="flex items-center gap-4 font-mono text-[11px] sm:text-xs uppercase tracking-[0.25em] text-neutral-500 dark:text-neutral-400">
        <span className="h-px flex-1 bg-black/10 dark:bg-white/15" />
        <span>{label}</span>
      </div>
      {title && (
        <Reveal>
          <h2 className="font-heading mt-9 max-w-4xl text-[clamp(2rem,5.2vw,4rem)] font-semibold leading-[0.96] tracking-[-0.02em]">
            {title}
          </h2>
        </Reveal>
      )}
    </div>
  );
}
