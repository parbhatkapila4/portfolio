import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";
import { LiveClock } from "./LiveClock";

const CAL_LINK = "https://cal.com/parbhat.kapila/30min";

const channels = [
  { label: "Schedule", value: "Book a 30-min call", href: CAL_LINK, external: true },
  { label: "Email", value: "parbhat@parbhat.work", href: "mailto:parbhat@parbhat.work", external: false },
  { label: "LinkedIn", value: "in/parbhat-kapila", href: "https://www.linkedin.com/in/parbhat-kapila/", external: true },
  { label: "Twitter", value: "@Parbhat03", href: "https://x.com/Parbhat03", external: true },
];

const Contact = () => {
  return (
    <section id="contact" className="px-6 pb-16 pt-28 sm:px-10 md:pt-36 lg:px-14">
      <div className="mx-auto w-full max-w-[87.5rem]">
        <SectionHeader index="06" label="Contact" />

        <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-10 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-8">
            <h2 className="font-display text-[clamp(3rem,10.5vw,9.5rem)] font-bold uppercase leading-[0.88] tracking-[-0.035em]">
              Let&apos;s work
              <br />
              <span className="font-serif italic font-normal normal-case tracking-normal text-[0.98em]">
                together.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-4">
            <p className="max-w-md text-[0.9375rem] leading-relaxed text-muted sm:text-base">
              Open to full-time remote roles at early-stage, AI-first startups. Hand me the problem
              and the constraints - I&apos;ll take it from design through deploy and on-call. Fully
              remote, flexible across US/EU hours.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 sm:mt-20">
          {channels.map((c, i) => (
            <Reveal
              as="div"
              key={c.label}
              delay={0.04 * i}
              className="border-t border-line last:border-b"
            >
              <a
                href={c.href}
                {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group grid grid-cols-1 gap-y-2 py-7 sm:grid-cols-12 sm:items-baseline sm:gap-x-10 sm:py-9"
              >
                <span className="flex items-baseline gap-4 font-mono text-[0.625rem] uppercase tracking-[0.25em] text-muted sm:col-span-3">
                  <span aria-hidden className="tabular-nums text-faint">
                    0{i + 1}
                  </span>
                  {c.label}
                </span>
                <span className="break-words font-display text-2xl font-semibold tracking-[-0.02em] text-[var(--foreground)] transition-transform duration-300 group-hover:translate-x-2 sm:col-span-8 sm:text-4xl">
                  {c.value}
                </span>
                <ArrowUpRight className="hidden h-5 w-5 justify-self-end self-center text-faint transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[var(--foreground)] sm:block" />
              </a>
            </Reveal>
          ))}
        </div>

        <div className="mt-24 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-7">
          <span className="font-display text-sm font-semibold tracking-[-0.01em] text-[var(--foreground)]">
            Parbhat Kapila
          </span>
          <span className="flex items-center gap-3 font-mono text-[0.625rem] uppercase tracking-[0.25em] text-faint">
            <LiveClock />
            <span className="opacity-50">/</span>
            Remote - US·EU
          </span>
        </div>
      </div>
    </section>
  );
};

export default Contact;
