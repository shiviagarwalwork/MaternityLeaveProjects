import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Alpha Mothers | Mental Health, Career Growth & Raising the AI Generation",
  description: "The complete companion for ambitious mothers. Support your mental health, thrive in your career, and raise confident kids in the AI age.",
  keywords: ["postpartum mental health", "working mothers", "career coaching", "Gen Alpha parenting", "maternal mental health", "return to work support"],
  openGraph: {
    title: "Alpha Mothers | Mental Health, Career Growth & Raising the AI Generation",
    description: "The complete companion for ambitious mothers.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${playfair.variable} ${inter.variable} antialiased bg-[var(--background)]`}>
        <Header />
        <main className="pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
