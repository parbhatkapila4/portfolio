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

export const metadata: Metadata = {
  title: "Parbhat Kapila | AI Full-Stack Engineer | Production AI Systems",
  description:
    "AI-focused full-stack engineer building production systems that stay live under real usage. 3+ years of experience architecting scalable infrastructure, optimizing for performance and cost, and delivering systems that serve real users at scale. Available for full-time opportunities.",
  keywords: [
    "AI Full-Stack Engineer",
    "Production AI Systems",
    "RAG Systems",
    "Vector Databases",
    "Next.js",
    "TypeScript",
    "OpenAI",
    "LangChain",
    "Full-Stack Developer",
    "AI Engineer",
  ],
  authors: [{ name: "Parbhat Kapila" }],
  creator: "Parbhat Kapila",
  openGraph: {
    title: "Parbhat Kapila | AI Full-Stack Engineer",
    description:
      "AI-focused full-stack engineer building production systems that stay live under real usage. 3+ years of experience with scalable infrastructure, AI/ML integration, and production systems.",
    url: "https://parbhat.dev",
    siteName: "Parbhat Kapila Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Parbhat Kapila | AI Full-Stack Engineer",
    description:
      "AI-focused full-stack engineer building production systems that stay live under real usage.",
    creator: "@Parbhat03",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GoogleAnalytics />
      <body suppressHydrationWarning className={`${font.className} relative`}>
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
