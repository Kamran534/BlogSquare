import "./globals.css";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeProvider from "../components/ThemeProvider";

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
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider>
          <div className="container">
            <div className="wrapper">
              {children}
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
