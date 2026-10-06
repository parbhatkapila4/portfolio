export type Mark = { text: string; id: string; url: string };
export type Segment = string | Mark | { strong: string };

type Product = { id: string; name: string; url: string };

export function richText(text: string, products: Product[], seen: Set<string>): Segment[] {
  const byName = new Map(products.map((p) => [p.name.toLowerCase(), p]));
  const names = new RegExp(`\\b(${products.map((p) => p.name).join("|")})\\b`, "gi");
  const out: Segment[] = [];
  text.split(/\*\*(.+?)\*\*/).forEach((part, i) => {
    if (i % 2 === 1) {
      out.push({ strong: part });
      return;
    }
    let last = 0;
    for (const m of part.matchAll(names)) {
      const product = byName.get(m[0].toLowerCase());
      if (!product || seen.has(product.id)) continue;
      seen.add(product.id);
      if (m.index > last) out.push(part.slice(last, m.index));
      out.push({ text: m[0], id: product.id, url: product.url });
      last = m.index + m[0].length;
    }
    if (last < part.length) out.push(part.slice(last));
  });
  return out;
}
