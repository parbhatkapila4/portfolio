import Image from "next/image";
import Link from "next/link";

import { Closing } from "./Closing";
import { GitHubBand } from "./GitHubBand";
import { Rail } from "./Rail";
import { ICONS } from "./icons";
import { SystemTile } from "./SystemTile";
import { Walkthroughs } from "./Walkthroughs";
import { SHOT, caseStudies, shotPath, systems } from "./home-data";
import { experience, stack } from "@/lib/site-content";

const SHOW_SLOT_HINT = process.env.NODE_ENV !== "production";

export function HomeSections() {
  return (
    <div className="flow">
      <section className="sec" id="projects" aria-labelledby="work-h">
        <div className="reveal rail-lg">
          <Rail
            heading={
              <h2 className="label chapter" id="work-h" data-reflection="Work">
                Work
              </h2>
            }
            label="Work"
            noun="system"
          >
            {systems.map((s) => (
              <li key={s.id}>
                <SystemTile
                  system={s}
                  hint={SHOW_SLOT_HINT ? `public${shotPath(s.id)} · ${SHOT.width} × ${SHOT.height}` : undefined}
                />
              </li>
            ))}
          </Rail>
        </div>
        <dl className="stack reveal">
          {stack.map((g) => (
            <div key={g.title}>
              <dt>{g.title}</dt>
              <dd>{g.tools.join(" · ")}</dd>
            </div>
          ))}
        </dl>
      </section>

      <Walkthroughs />

      <GitHubBand />

      <section className="sec" id="writing" aria-labelledby="writing-h">
        <div className="reveal">
          <Rail
            heading={
              <h2 className="label chapter" id="writing-h" data-reflection="Writing">
                Writing
              </h2>
            }
            label="Writing"
            noun="case study"
          >
            {caseStudies.map((c) => (
              <li key={c.slug}>
                <Link className="tile" href={`/writing/${c.slug}`}>
                  <span className="tile-shot" aria-hidden>
                    <Image src={`/showcase/writing/${c.slug}.png`} alt="" fill sizes="(max-width: 960px) 82vw, 540px" />
                  </span>
                  <span className="tile-meta">
                    <span className="tile-title">
                      {c.title}
                      <span aria-hidden>→</span>
                    </span>
                    <span className="tile-line">{c.tagline}</span>
                  </span>
                </Link>
              </li>
            ))}
          </Rail>
        </div>
      </section>

      <section className="sec" id="experience" aria-labelledby="experience-h">
        <h2 className="label sec-h reveal" id="experience-h">
          Experience
        </h2>
        <div className="xp reveal">
          <details className="xp-item">
            <summary>
              <span className="xp-mark" aria-hidden>
                <svg viewBox="0 0 24 24">{ICONS.briefcase}</svg>
              </span>
              <span className="xp-body">
                <span className="xp-head">
                  <span className="xp-role">{experience.title}</span>
                  <span className="xp-org">{experience.org}</span>
                  <span className="xp-when">{experience.period}</span>
                </span>
                <span className="xp-line">{experience.description[0]}</span>
              </span>
              <span className="xp-chev" aria-hidden />
            </summary>
            <div className="xp-detail">
              {experience.description.slice(1).map((line) => (
                <p key={line}>{line}</p>
              ))}
              <ul className="chips">
                {experience.tech.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          </details>
        </div>
      </section>

      <Closing />
    </div>
  );
}
