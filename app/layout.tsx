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
  title: "Lluís Suñol — Portfolio",
  description:
    "Single-page portfolio concept showcasing work, skills, and contact information.",
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
