import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";

import { Header } from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { TooltipProvider } from "@/components/ui/tooltip";
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
  title: "Mini Work Tools",
  description: "Mini Work Tools for freelancers, agencies, and planners",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-21DFEQYR2P`}
          strategy="afterInteractive"
        />
        <Script id="ga4" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-21DFEQYR2P', { anonymize_ip: true });
          `}
        </Script>
      </head>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <Header />
          <main>
            <TooltipProvider>{children}</TooltipProvider>
          </main>
          <Footer />
        </body>
      </ThemeProvider>
    </html>
  );
}
