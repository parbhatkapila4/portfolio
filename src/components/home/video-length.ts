const CHUNK = 1024;
const HOPS = 4;

const boxType = (bytes: DataView, at: number) =>
  String.fromCharCode(bytes.getUint8(at), bytes.getUint8(at + 1), bytes.getUint8(at + 2), bytes.getUint8(at + 3));

async function chunk(url: string, from: number) {
  const res = await fetch(url, {
    headers: { Range: `bytes=${from}-${from + CHUNK - 1}` },
    next: { revalidate: 86_400 },
  });
  if (res.status !== 206) {
    await res.body?.cancel();
    return null;
  }
  return new DataView(await res.arrayBuffer());
}

export async function mp4Seconds(url: string): Promise<number | null> {
  try {
    let from = 0;
    for (let hop = 0; hop < HOPS; hop++) {
      const bytes = await chunk(url, from);
      if (!bytes) return null;
      let at = 0;
      while (at + 16 <= bytes.byteLength) {
        const type = boxType(bytes, at + 4);
        if (type === "moov") {
          at += 8;
          continue;
        }
        if (type === "mvhd") {
          const wide = bytes.getUint8(at + 8) === 1;
          const timescale = bytes.getUint32(at + (wide ? 28 : 20));
          const length = wide ? Number(bytes.getBigUint64(at + 32)) : bytes.getUint32(at + 24);
          return timescale ? length / timescale : null;
        }
        const size32 = bytes.getUint32(at);
        const size = size32 === 1 ? Number(bytes.getBigUint64(at + 8)) : size32;
        if (size < 8) return null;
        at += size;
      }
      if (at === 0) return null;
      from += at;
    }
    return null;
  } catch {
    return null;
  }
}
