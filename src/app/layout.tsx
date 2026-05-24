import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "Prosenjit Dey | Creative Developer",
  description: "Portfolio of Prosenjit Dey - Frontend Developer & UI Engineer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} antialiased dark`}
      suppressHydrationWarning
    >
      <body className="bg-[#121212] font-sans text-white overflow-x-hidden cursor-none" suppressHydrationWarning>
        <CustomCursor />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
