import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";

const CAL_LINK = "https://cal.com/parbhat.kapila/30min";

const channels = [
  { label: "Schedule", value: "Book a 30-min call", href: CAL_LINK, external: true },
  { label: "Email", value: "parbhat@parbhat.work", href: "mailto:parbhat@parbhat.work", external: false },
  { label: "LinkedIn", value: "in/parbhat-kapila", href: "https://www.linkedin.com/in/parbhat-kapila/", external: true },
  { label: "Twitter", value: "@Parbhat03", href: "https://x.com/Parbhat03", external: true },
];

const Contact = () => {
  return (
    <section id="contact" className="px-6 py-20 md:px-10 md:py-28 lg:px-16 lg:py-32">
      <div className="mx-auto w-full max-w-[1280px]">
        <SectionHeader index="06" label="Contact" />

        <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <h2 className="font-heading text-[clamp(2.5rem,7vw,5.5rem)] font-semibold leading-[0.92] tracking-[-0.03em]">
              Let&apos;s work
              <br />
              together.
            </h2>
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-5 lg:flex lg:items-end">
            <p className="max-w-md text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-300">
              Open to full-time remote roles at early-stage, AI-first startups. Hand me the problem
              and the constraints - I&apos;ll take it from design through deploy and on-call. Fully
              remote, flexible across US/EU hours.
            </p>
          </Reveal>
        </div>

        <div className="mt-16">
          {channels.map((c, i) => (
            <Reveal as="div" key={c.label} delay={0.04 * i}>
              <a
                href={c.href}
                {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group flex items-center justify-between gap-6 border-t border-black/10 py-6 transition-colors hover:border-[var(--foreground)] dark:border-white/15 dark:hover:border-[var(--foreground)]"
              >
                <span className="flex min-w-0 flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-10">
                  <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400 sm:w-28">
                    {c.label}
                  </span>
                  <span className="min-w-0 break-words font-heading text-lg font-medium tracking-[-0.01em] transition-transform duration-300 group-hover:translate-x-1 sm:text-3xl">
                    {c.value}
                  </span>
                </span>
                <ArrowUpRight className="h-5 w-5 shrink-0 text-neutral-400 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[var(--foreground)] sm:h-7 sm:w-7" />
              </a>
            </Reveal>
          ))}
          <div className="border-t border-black/10 dark:border-white/15" />
        </div>
      </div>
    </section>
  );
};

export default Contact;
