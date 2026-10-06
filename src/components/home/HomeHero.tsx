import Image from "next/image";

import { EMAIL } from "@/lib/site-content";
import { aboutCopy, systems } from "./home-data";
import { ICONS } from "./icons";
import { richText } from "./marks";

export function HomeHero() {
  const seen = new Set<string>();
  return (
    <section id="about" className="about" aria-label="About">
      {aboutCopy.map((para, i) => (
        <p key={para} className="rise" style={{ animationDelay: `${0.08 + i * 0.07}s` }}>
          {richText(para, systems, seen).map((seg, j) => {
            if (typeof seg === "string") return seg;
            if ("strong" in seg) return <strong key={j}>{seg.strong}</strong>;
            return (
              <a key={j} className="mark" href={seg.url} target="_blank" rel="noopener noreferrer">
                <span className="mark-icon" aria-hidden>
                  <Image src={`/showcase/icon-${seg.id}.png`} alt="" width={16} height={16} />
                  <svg viewBox="0 0 24 24">{ICONS.arrow}</svg>
                </span>
                {seg.text}
              </a>
            );
          })}
          {i === aboutCopy.length - 1 ? (
            <>
              {" "}
              <a className="mark" href={`mailto:${EMAIL}`}>
                <span className="mark-icon mark-glyph" aria-hidden>
                  <svg viewBox="0 0 24 24">{ICONS.email}</svg>
                </span>
                Say hello
              </a>
              .
            </>
          ) : null}
        </p>
      ))}
    </section>
  );
}
