import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "UListed - Buy. Sell. Swap. Just for Students.",
  description: "A safe, verified space to exchange items, tickets, and services within your university.",
  keywords: ["university", "marketplace", "students", "buy", "sell", "swap"],
  authors: [{ name: "UListed" }],
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "UListed - Buy. Sell. Swap. Just for Students.",
    description: "A safe, verified space to exchange items, tickets, and services within your university.",
    type: "website",
    siteName: "UListed",
  },
  twitter: {
    card: "summary_large_image",
    title: "UListed - Buy. Sell. Swap. Just for Students.",
    description: "A safe, verified space to exchange items, tickets, and services within your university.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable} style={{ fontFamily: "var(--font-inter)" }}>
        {children}
      </body>
    </html>
  );
}

