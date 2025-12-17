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
  title: "Parbhat Kapila | AI Full-Stack Engineer | AI & Backend Systems",
  description:
    "Senior Full-Stack Engineer specializing in scalable backend systems, AI/ML integration, and enterprise architecture. Proven expertise in building high-performance applications serving 500K+ users, architecting microservices ecosystems, and leading technical initiatives. Available for international startup opportunities.",
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
            <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 relative space-y-8">
              {children}
            </main>
          </ThemeProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}
