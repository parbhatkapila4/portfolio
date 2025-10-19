import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge Tailwind CSS classes
 * Combines clsx and tailwind-merge for optimal class handling
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Blog posts data (currently unused but kept for future use)
export const blogPosts: { title: string; date: string; href: string }[] = [
  {
    title: "Custom Loaders With React, TypeScript, and Framer Motion",
    date: "mar. '24",
    href: "animated-loaders",
  },
];