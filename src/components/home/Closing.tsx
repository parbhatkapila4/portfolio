import Image from "next/image";

import { closing, closingLinks, profile } from "./home-data";
import { ICONS } from "./icons";
import { Signature } from "./Signature";

const FIRST_NAME = profile.name.split(" ")[0];
export function Closing() {
  return (
    <section className="closing" id="contact" aria-label={`A note from ${FIRST_NAME}`}>
      <span className="avatar reveal">
        <Image src="/Parbhat1.jpg" alt="" width={685} height={1066} sizes="168px" />
      </span>
      <p className="closing-note reveal">{closing.note}</p>
      <nav className="closing-links reveal" aria-label={`Contact ${FIRST_NAME}`}>
        {closingLinks.map((l) => (
          <a
            key={l.id}
            href={l.href}
            {...(l.id === "email" ? {} : { target: "_blank", rel: "noopener noreferrer" })}
          >
            <svg viewBox="0 0 24 24" aria-hidden>
              {ICONS[l.id]}
            </svg>
            {l.label}
          </a>
        ))}
      </nav>
      <div className="sign reveal">
        <Signature />
        <p>{profile.name}</p>
      </div>
      <p className="closing-more reveal">
        {closing.call.lead}{" "}
        <a className="mark" href={closing.call.href} target="_blank" rel="noopener noreferrer">
          <span className="mark-icon mark-glyph" aria-hidden>
            <svg viewBox="0 0 24 24">{ICONS.calendar}</svg>
          </span>
          {closing.call.label}
        </a>
      </p>
    </section>
  );
}
