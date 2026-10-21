import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import {
  Inter,
  Inter_Tight,
  Instrument_Serif,
  JetBrains_Mono,
} from "next/font/google";

import "./globals.css";
import { PostHogPageView } from "@/components/PostHogPageView";
import { PostHogProvider } from "@/provider/PostHog";
import SmoothScroll from "@/components/SmoothScroll";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontDisplay = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-display",
});

const fontSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jbmono",
});

const siteUrl = "https://www.parbhat.dev";

const seoTitle = "Parbhat Kapila · AI Systems Engineer";
const seoDescription =
  "AI systems engineer building and operating production AI systems for early-stage startups. RAG, pgvector, Next.js, TypeScript. Open to full-time roles: remote, in-office in Bengaluru, or relocating to Germany.";
const seoKeywords = [
  "Parbhat Kapila",
  "Prabhat Kapila",
  "AI systems engineer",
  "AI engineer",
  "production AI systems",
  "RAG pipelines",
  "vector search",
  "pgvector",
  "PostgreSQL",
  "Next.js",
  "TypeScript",
  "remote AI engineer",
  "early-stage startup engineer",
  "AI systems engineer portfolio",
];

export const viewport: Viewport = {
  themeColor: "#f6f6f3",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: seoTitle,
    template: "%s | Parbhat Kapila",
  },
  description: seoDescription,
  keywords: seoKeywords,
  authors: [{ name: "Parbhat Kapila", url: siteUrl }],
  creator: "Parbhat Kapila",
  publisher: "Parbhat Kapila",
  applicationName: "Parbhat Kapila Portfolio",
  referrer: "origin-when-cross-origin",
  alternates: {
    canonical: "https://www.parbhat.dev/",
  },
  openGraph: {
    title: seoTitle,
    description: seoDescription,
    url: siteUrl,
    siteName: "Parbhat Kapila · AI Systems Engineer",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${siteUrl}/opengraph-image.jpg`,
        secureUrl: `${siteUrl}/opengraph-image.jpg`,
        width: 1344,
        height: 768,
        type: "image/jpeg",
        alt: "Parbhat Kapila - AI Systems Engineer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: seoTitle,
    description: seoDescription,
    creator: "@Parbhat03",
    images: [`${siteUrl}/opengraph-image.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "portfolio",
  icons: {
    icon: "/parbhat-favicon.png",
    apple: "/apple-icon.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Parbhat Kapila",
      alternateName: "Prabhat Kapila",
      jobTitle: "AI Systems Engineer",
      description:
        "Parbhat Kapila, AI systems engineer building production AI systems for early-stage startups. Working across RAG, vector search on Postgres/pgvector, Next.js, and TypeScript since 2025. Ships and maintains live AI products. Available for full-time roles: remote, in-office in Bengaluru, or relocating to Germany.",
      url: siteUrl,
      image: `${siteUrl}/Parbhat1.jpg`,
      sameAs: [
        "https://www.linkedin.com/in/parbhat-kapila/",
        "https://github.com/parbhatkapila4",
        "https://x.com/Parbhat03",
      ],
      knowsAbout: [
        "Production AI systems",
        "RAG pipelines",
        "Vector search (pgvector)",
        "PostgreSQL",
        "Next.js",
        "TypeScript",
      ],
      knowsLanguage: "en",
      jobLocation: {
        "@type": "Place",
        name: "Remote, in-office in Bengaluru, or relocating to Germany",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Parbhat Kapila · AI Systems Engineer",
      description: seoDescription,
      publisher: { "@id": `${siteUrl}/#person` },
      inLanguage: "en-US",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fontSans.variable} ${fontDisplay.variable} ${fontSerif.variable} ${fontMono.variable}`}
    >
      <body
        suppressHydrationWarning
        className={`${fontSans.className} font-sans antialiased`}
      >
        <Suspense fallback={null}>
          <PostHogPageView />
        </Suspense>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <PostHogProvider>
          <SmoothScroll>
            <main className="w-full min-h-screen">{children}</main>
          </SmoothScroll>
        </PostHogProvider>
      </body>
    </html>
  );
}
