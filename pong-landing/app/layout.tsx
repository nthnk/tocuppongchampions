import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const outfit = Outfit({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-outfit",
});

const posterama = localFont({
  src: "../public/fonts/Posterama Text Bold.ttf",
  variable: "--font-posterama",
  weight: "700",
  display: "swap",
});

export const metadata: Metadata = {
  title: "6CUPS | Table Zero - Toronto Beer Pong",
  description: "32 teams. Toronto's premier beer pong tournament. The waitlist is open.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} ${posterama.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
