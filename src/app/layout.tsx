import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";

const font = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Parbhat | Full-Stack Developer & Startup Engineer",
  description:
    "Portfolio of Parbhat, a full-stack developer and startup-focused engineer who builds production-ready web apps, scalable backends, and AI-powered solutions. Proven track record of shipping fast, solving complex problems, and driving growth for early-stage startups.",
};

const Background = () => {
  return (
    <>
      <div className="fixed inset-0 -z-10 bg-gradient-to-t from-background from-25%  h-full w-full" />
      <div className="fixed inset-0 h-screen w-full -z-20 bg-[linear-gradient(to_right,#8080800a_2px,transparent_2px),linear-gradient(to_bottom,#8080800a_2px,transparent_2px)] bg-[size:12px_16px] dark:opacity-75" />
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
      <body className={`${font.className} antialiased p-3 relative`}>
        <Background />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          themes={["dark", "system", "light"]}
          enableSystem
          disableTransitionOnChange
        >
          <div className="absolute top-0 z-[-2] h-screen w-screen bg-background bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,215,0,0.35),rgba(0,0,0,0))]"></div>
					<main className="max-w-2xl space-y-20 mx-auto py-24 pt-12 px-1">
						{children}
					</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
