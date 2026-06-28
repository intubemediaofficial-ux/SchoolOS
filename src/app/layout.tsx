import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SchoolOS - AI Powered Multi-School ERP & Website Builder",
  description:
    "Complete Digital Ecosystem for Schools. ERP, Website Builder, Mobile Apps, AI Tools, Fee Collection, Admissions & more - all in one platform.",
  keywords: [
    "school ERP",
    "school management software",
    "education technology",
    "school website builder",
    "fee management",
    "student management",
    "LMS",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
