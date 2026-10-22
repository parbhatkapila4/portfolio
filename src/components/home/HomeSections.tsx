import Image from "next/image";
import Link from "next/link";

import { Closing } from "./Closing";
import { GitHubBand } from "./GitHubBand";
import { ICONS } from "./icons";
import { StackLayers } from "./StackLayers";
import { SystemTile } from "./SystemTile";
import { Walkthroughs } from "./Walkthroughs";
import { SHOT, caseStudies, shotPath, systems } from "./home-data";
import { GITHUB_URL, experience, openSource } from "@/lib/site-content";

const SHOW_SLOT_HINT = process.env.NODE_ENV !== "production";

const pulls = openSource.prs.map((pr) => {
  const [, owner, repo, , number] = new URL(pr.href).pathname.split("/");
  return { ...pr, owner, repo: `${owner}/${repo}`, number };
});

export function HomeSections() {
  return (
    <div className="flow">
      <section className="sec" id="projects" aria-labelledby="work-h">
        <h2 className="label chapter reveal" id="work-h" data-reflection="Work">
          Work
        </h2>
        <ul className="zz reveal">
          {systems.map((s, i) => (
            <li key={s.id}>
              <SystemTile
                system={s}
                order={i}
                hint={SHOW_SLOT_HINT ? `public${shotPath(s.id)} · ${SHOT.width} × ${SHOT.height}` : undefined}
              />
            </li>
          ))}
        </ul>
        <StackLayers />
      </section>

      <Walkthroughs />

      <GitHubBand />

      <section className="sec" id="writing" aria-labelledby="writing-h">
        <h2 className="label chapter reveal" id="writing-h" data-reflection="Writing">
          Writing
        </h2>
        <ul className="zz reveal">
          {caseStudies.map((c, i) => (
            <li key={c.slug}>
              <Link className={`tile zz-row${i % 2 ? " flip" : ""}`} href={`/writing/${c.slug}`}>
                <span className="tile-shot" aria-hidden>
                  <Image src={`/showcase/writing/${c.slug}.png`} alt="" fill sizes="(max-width: 1180px) 100vw, 540px" />
                </span>
                <span className="zz-txt">
                  <span className="zz-num" aria-hidden>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="zz-name">{c.title}</span>
                  <span className="zz-desc">{c.tagline}</span>
                  <span className="zz-cta">Read the case study →</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="sec" id="experience" aria-labelledby="experience-h">
        <h2 className="label chapter reveal" id="experience-h" data-reflection="Experience">
          Experience
        </h2>
        <article className="xp-hero reveal">
          <div>
            <h3 className="xp-role">{experience.title}</h3>
            <p className="xp-org">{experience.org}</p>
            <p className="xp-lead">{experience.description[0]}</p>
            {experience.description.slice(1).map((line) => (
              <p key={line} className="xp-body">
                {line}
              </p>
            ))}
          </div>
          <div className="xp-dock">
            <p className="xp-cap">Five AI products in production</p>
            <ul className="xp-apps">
              {systems.map((s) => (
                <li key={s.id}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer">
                    <Image src={`/showcase/icon-${s.id}.png`} alt="" width={44} height={44} />
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <ul className="xp-tags">
            {experience.tech.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </article>
        <div className="os">
          <div className="os-head reveal">
            <div>
              <h3 className="xp-role">{openSource.title}</h3>
              <p className="xp-org">{openSource.org}</p>
              <p className="os-desc">{openSource.description}</p>
            </div>
            <a className="os-gh" href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
              {GITHUB_URL.replace("https://", "")} <span aria-hidden>↗</span>
            </a>
          </div>
          <ul className="os-grid reveal">
            {pulls.map((pr) => (
              <li key={pr.href}>
                <a className="pr-card" href={pr.href} target="_blank" rel="noopener noreferrer">
                  <span className="pr-top">
                    <Image src={`/oss/${pr.owner}.png`} alt="" width={24} height={24} />
                    <span className="pr-repo">{pr.repo}</span>
                    <span className="pr-merged">
                      <svg viewBox="0 0 24 24" aria-hidden>
                        {ICONS.merge}
                      </svg>
                      Merged
                    </span>
                  </span>
                  <span className="pr-num">#{pr.number}</span>
                  <span className="pr-pkg">{pr.pkg}</span>
                  <span className="pr-sum">{pr.summary}</span>
                  <span className="pr-view">
                    View pull request <span aria-hidden>↗</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Closing />
    </div>
  );
}
