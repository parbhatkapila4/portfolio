"use client";

import Image, { type ImageProps } from "next/image";
import { useEffect, useState } from "react";
export function Shot(props: ImageProps) {
  const [missing, setMissing] = useState(false);
  const [asked, setAsked] = useState(0);
  useEffect(() => {
    if (!missing || process.env.NODE_ENV !== "development") return;
    const again = window.setTimeout(() => {
      setMissing(false);
      setAsked((n) => n + 1);
    }, 4000);
    return () => window.clearTimeout(again);
  }, [missing]);
  if (missing) return null;
  return <Image key={asked} {...props} alt={props.alt} onError={() => setMissing(true)} />;
}
