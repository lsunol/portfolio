import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { PaletteProvider } from "@/components/PaletteProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lluís Suñol — Software Engineer · AI / ML",
  description:
    "Portfolio with selected projects in AI, Deep Learning and Machine Learning, plus an AI assistant to ask about my work.",
  metadataBase: new URL("https://lluissunol.dev"),
  openGraph: {
    type: "website",
    url: "https://lluissunol.dev/",
    title: "Lluís Suñol — Software Engineer · AI / ML",
    description:
      "Selected projects, experience and an AI assistant to ask about my work.",
    images: [
      {
        url: "/images/og.jpg",
        width: 1200,
        height: 630,
        alt: "Lluís Suñol — Software Engineer · AI / ML",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lluís Suñol — Software Engineer · AI / ML",
    description:
      "Selected projects, experience and an AI assistant to ask about my work.",
    images: ["/images/og.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.variable} text-slate-900 antialiased`} suppressHydrationWarning style={{ background: "var(--app-bg-primary)", color: "var(--app-text-primary)" }}>
        <PaletteProvider />
        {children}
      </body>
    </html>
  );
}
