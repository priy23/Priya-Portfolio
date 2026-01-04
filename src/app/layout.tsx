import type { Metadata } from "next";
import { Outfit } from "next/font/google"; // Changed to Outfit for premium look
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import SmoothScroll from "@/components/SmoothScroll";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Priya Portfolio | Software Engineer",
  description: "Portfolio of Priya Kumari, a Software Engineer and Data Analyst.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.variable} font-sans antialiased`}>
        <SmoothScroll />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
