"use client";

import Image from "next/image";
import { useState } from "react";

type PortraitProps = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
};

export function Portrait({ src, alt, sizes, className }: PortraitProps) {
  const [attempt, setAttempt] = useState(0);

  return (
    <Image
      key={attempt}
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      className={className}
      onError={() => {
        if (attempt < 3) setTimeout(() => setAttempt((a) => a + 1), 1200);
      }}
    />
  );
}
