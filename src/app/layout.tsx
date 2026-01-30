import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";

import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { PostHogProvider } from "@/provider/PostHog";

const font = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const siteUrl = "https://parbhat.dev";

const seoTitle =
  "Parbhat Kapila | Full Stack Engineer | AI Full-Stack Engineer | Remote";
const seoDescription =
  "Parbhat Kapila - AI full-stack engineer building production systems for US startups. 3+ years: RAG, vector DBs, Next.js, TypeScript. Available for remote full-time roles. Hire a full stack engineer who ships and maintains live AI products.";
const seoKeywords = [
  "Parbhat Kapila",
  "Prabhat Kapila",
  "full stack engineer",
  "AI full stack engineer",
  "full stack developer",
  "AI engineer",
  "remote full stack engineer",
  "hire full stack engineer",
  "US startup engineer",
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
  icons: {
    icon: "/Portfolio Favicon.png",
  },
  alternates: {
    canonical: "https://parbhat.dev/",
  },
  openGraph: {
    title: seoTitle,
    description: seoDescription,
    url: siteUrl,
    siteName: "Parbhat Kapila — Full Stack Engineer Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/Portfolio%20card.jpg",
        width: 1200,
        height: 630,
        alt: "Parbhat Kapila - Full Stack Engineer & AI Engineer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: seoTitle,
    description: seoDescription,
    creator: "@Parbhat03",
    images: ["/Portfolio%20card.jpg"],
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
};

const GoogleAnalytics = () => (
  <>
    <Script
      async
      src="https://www.googletagmanager.com/gtag/js?id=G-NR203WYBQP"
    />
    <Script id="google-analytics">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-NR203WYBQP');
      `}
    </Script>
  </>
);

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Parbhat Kapila",
      alternateName: "Prabhat Kapila",
      jobTitle: "Full Stack Engineer",
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
        "AI/ML Systems",
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
      name: "Parbhat Kapila — Full Stack Engineer Portfolio",
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
    <html lang="en">
      <GoogleAnalytics />
      <body suppressHydrationWarning className={`${font.className} relative`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <PostHogProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <main className="w-full relative bg-black">{children}</main>
          </ThemeProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}
