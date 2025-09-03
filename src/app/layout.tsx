import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ weight: ["400", "500", "600", "700", "800", "900"] });

export const metadata: Metadata = {
  title: "Parbhat | Full-Stack Developer & Startup Engineer",
  description:
    "Portfolio of Parbhat, a full-stack developer and startup-focused engineer who builds production-ready web apps, scalable backends, and AI-powered solutions. Proven track record of shipping fast, solving complex problems, and driving growth for early-stage startups.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
