import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { PostHogProvider } from "@/provider/PostHog";
import Script from "next/script";

const font = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Parbhat Kapila | Senior Full-Stack Engineer | AI & Backend Systems",
  description:
    "Senior Full-Stack Engineer specializing in scalable backend systems, AI/ML integration, and enterprise architecture. Proven expertise in building high-performance applications serving 500K+ users, architecting microservices ecosystems, and leading technical initiatives. Available for international startup opportunities.",
};

const Background = () => {
  return (
    <>
      <div className="fixed inset-0 -z-10 bg-background h-full w-full" />
      <div className="fixed inset-0 h-screen w-full -z-20 bg-[linear-gradient(to_right,#8080800a_2px,transparent_2px),linear-gradient(to_bottom,#8080800a_2px,transparent_2px)] bg-[size:14px_18px] dark:opacity-60" />
    </>
  );
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
<Script async src="https://www.googletagmanager.com/gtag/js?id=G-NR203WYBQP"></Script>
<Script>{`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-NR203WYBQP');`}
</Script>
      <body suppressHydrationWarning className={`${font.className}relative`}>
      <PostHogProvider>

        <Background />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="absolute top-0 z-[-2] h-screen w-screen bg-background bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(6,182,212,0.35),rgba(0,0,0,0))]"></div>
          <main className="max-w-3xl mx-auto py-12 sm:py-24 pt-6 sm:pt-12 px-4 sm:px-6 relative space-y-2">{children}</main>
        </ThemeProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}
