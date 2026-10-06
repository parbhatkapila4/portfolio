import type { ReactNode } from "react";

export const ICONS = {
  github: (
    <>
      <path pathLength={1} d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path pathLength={1} d="M9 18c-4.51 2-5-2-7-2" />
    </>
  ),
  linkedin: (
    <>
      <path pathLength={1} d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <path pathLength={1} d="M2 9h4v12H2z" />
      <path pathLength={1} d="M6 4a2 2 0 0 1-4 0a2 2 0 0 1 4 0z" />
    </>
  ),
  x: (
    <>
      <path pathLength={1} d="M4 4l11.733 16H20L8.267 4z" />
      <path pathLength={1} d="M4 20l6.768-6.768m2.46-2.46L20 4" />
    </>
  ),
  email: (
    <>
      <path pathLength={1} d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
      <path pathLength={1} d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
    </>
  ),
  resume: (
    <>
      <path pathLength={1} d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path pathLength={1} d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path pathLength={1} d="M10 9H8" />
      <path pathLength={1} d="M16 13H8" />
      <path pathLength={1} d="M16 17H8" />
    </>
  ),
  calendar: (
    <>
      <path pathLength={1} d="M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
      <path pathLength={1} d="M8 2v4" />
      <path pathLength={1} d="M16 2v4" />
      <path pathLength={1} d="M3 10h18" />
    </>
  ),
  arrow: <path pathLength={1} d="M7 17 17 7M7 7h10v10" />,
  briefcase: (
    <>
      <path pathLength={1} d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      <path pathLength={1} d="M4 6h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" />
    </>
  ),
  prev: <path pathLength={1} d="M14.5 6 8.5 12l6 6" />,
  next: <path pathLength={1} d="M9.5 6l6 6-6 6" />,
} satisfies Record<string, ReactNode>;
