import { WalkthroughList } from "./WalkthroughList";
import { walkthroughs } from "./home-data";
import { mp4Seconds } from "./video-length";

const listed = (names: string[]) =>
  names.length > 1 ? `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}` : names[0];
export async function Walkthroughs() {
  const items = await Promise.all(
    walkthroughs.map(async (w) => ({ ...w, seconds: await mp4Seconds(w.src) })),
  );
  const minutes = items.flatMap((w) => (w.seconds ? [Math.round(w.seconds / 60)] : []));
  const low = Math.min(...minutes);
  const high = Math.max(...minutes);
  const each = minutes.length === items.length ? `, each ${low === high ? low : `${low} to ${high}`} minutes long` : "";

  return (
    <section className="sec" id="walkthroughs" aria-labelledby="walkthroughs-h">
      <h2 className="label chapter reveal" id="walkthroughs-h" data-reflection="Walkthroughs">
        Walkthroughs
      </h2>
      <p className="sec-sub reveal">
        Walkthroughs I recorded on Loom for {listed(items.map((w) => w.name))}
        {each}. Open any one to watch.
      </p>
      <WalkthroughList items={items} />
    </section>
  );
}
