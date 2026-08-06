import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { Inter, Inter_Tight, Instrument_Serif, JetBrains_Mono } from "next/font/google";

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

const seoTitle =
  "Parbhat Kapila | Full Stack Engineer | AI Full-Stack Engineer | Remote";
const seoDescription =
  "Parbhat Kapila - AI full-stack engineer building production systems for early-stage startups. 4+ years: RAG, vector DBs, Next.js, TypeScript. Available for remote full-time roles. Hire a full stack engineer who ships and maintains live AI products.";
const seoKeywords = [
  "Parbhat Kapila",
  "Prabhat Kapila",
  "full stack engineer",
  "AI full stack engineer",
  "full stack developer",
  "AI engineer",
  "remote full stack engineer",
  "hire full stack engineer",
  "early-stage startup engineer",
  "production AI systems",
  "RAG systems",
  "vector databases",
  "Next.js",
  "TypeScript",
  "OpenAI",
  "LangChain",
  "full stack engineer portfolio",
  "AI full stack developer remote",
];

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
    { media: "(prefers-color-scheme: light)", color: "#f6f6f3" },
  ],
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
    siteName: "Parbhat Kapila · Full Stack Engineer Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${siteUrl}/opengraph-image.jpg`,
        secureUrl: `${siteUrl}/opengraph-image.jpg`,
        width: 1344,
        height: 768,
        type: "image/jpeg",
        alt: "Parbhat Kapila - Full Stack Engineer & AI Engineer Portfolio",
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
      description: seoDescription,
      url: siteUrl,
      image: `${siteUrl}/Parbhat1.jpg`,
      sameAs: [
        "https://www.linkedin.com/in/parbhat-kapila/",
        "https://github.com/parbhatkapila4",
        "https://x.com/Parbhat03",
      ],
      knowsAbout: [
        "Full Stack Development",
        "AI Systems",
        "RAG",
        "Next.js",
        "TypeScript",
        "Production AI",
      ],
      knowsLanguage: "en",
      jobLocation: {
        "@type": "Place",
        name: "Remote",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Parbhat Kapila · Full Stack Engineer Portfolio",
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
    <html lang="en" className={`${fontSans.variable} ${fontDisplay.variable} ${fontSerif.variable} ${fontMono.variable}`}>
      <body suppressHydrationWarning className={`${fontSans.className} font-sans antialiased`}>
        <Suspense fallback={null}>
          <PostHogPageView />
        </Suspense>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <PostHogProvider>
          <SmoothScroll>
            <main className="w-full min-h-screen">
              {children}
            </main>
          </SmoothScroll>
        </PostHogProvider>
      </body>
    </html>
  );
}
