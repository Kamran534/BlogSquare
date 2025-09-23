import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeProvider from "../components/ThemeProvider";
import Script from "next/script";
import Navbar from "../components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BlogSquare - An AI Powered Blogging Web Application",
  description: "An AI Powered Blogging Web Application",
  icons: {
    icon: "/logo.png",
  },
};

// Theme class is applied by client ThemeProvider

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Script id="theme-init" strategy="beforeInteractive">
          {`
            (function() {
              try {
                var stored = localStorage.getItem('theme');
                var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
                var theme = stored || (prefersDark ? 'dark-theme' : 'light-theme');
                var root = document.documentElement;
                root.classList.remove('light-theme','dark-theme');
                root.classList.add(theme);
              } catch (e) {}
            })();
          `}
        </Script>
        <ThemeProvider>
          <Navbar />
          <main className="page-container">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
