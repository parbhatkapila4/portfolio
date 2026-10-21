import Image from "next/image";
import type { CSSProperties } from "react";

import { stack } from "@/lib/site-content";
import { STACK_LOGOS } from "./stack-logos";

const layers = stack.slice(0, -1);
const practices = stack[stack.length - 1];
const toolCount = layers.reduce((n, g) => n + g.tools.length, 0);

function Logo({ name }: { name: string }) {
  const logo = STACK_LOGOS[name];
  if (!logo) return null;
  if (logo.kind === "image") {
    return (
      <span className="stk-logo" aria-hidden>
        <Image src={logo.src} alt="" width={16} height={16} />
      </span>
    );
  }
  return (
    <span
      className={`stk-logo${logo.kind === "line" ? " line" : ""}`}
      style={logo.kind === "brand" ? ({ "--brand": logo.color } as CSSProperties) : undefined}
      aria-hidden
    >
      <svg viewBox="0 0 24 24">
        <path d={logo.d} fillRule={logo.kind === "brand" && logo.evenOdd ? "evenodd" : undefined} />
      </svg>
    </span>
  );
}

export function StackLayers() {
  return (
    <div className="stk reveal">
      <h3 className="stk-h">Stack</h3>
      <p className="stk-sub">
        {toolCount} tools and {practices.tools.length} practices
      </p>
      <div className="stk-sys">
        <ul className="stk-layers">
          {layers.map((g, i) => (
            <li key={g.title} className={`stk-band t${i + 1}`}>
              <p className="stk-label">
                <span>Layer {i + 1}</span> {g.title}
              </p>
              <ul className="stk-chips">
                {g.tools.map((t) => (
                  <li key={t}>
                    <Logo name={t} />
                    {t}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <div className="stk-across">
          <p>
            {practices.title} <span>Across every layer</span>
          </p>
          <ul className="stk-prac">
            {practices.tools.map((t) => (
              <li key={t}>
                <Logo name={t} />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
