import { Reveal } from "./Reveal";

type SectionHeaderProps = {
  index: string;
  label: string;
  title?: string;
};

export function SectionHeader({ index, label, title }: SectionHeaderProps) {
  return (
    <div>
      <Reveal>
        <div className="flex items-baseline justify-between border-t border-line pt-5 font-mono text-[10px] uppercase tracking-[0.3em]">
          <span className="text-muted">{label}</span>
          <span className="tabular-nums text-faint">{index}</span>
        </div>
      </Reveal>
      {title && (
        <Reveal delay={0.08}>
          <h2 className="font-display mt-10 max-w-[18ch] text-[clamp(2.3rem,5.8vw,4.6rem)] font-semibold leading-[1.0] tracking-[-0.04em]">
            {title}
          </h2>
        </Reveal>
      )}
    </div>
  );
}
