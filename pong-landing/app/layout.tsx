import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { PageTransition } from "@/components/PageTransition";

const outfit = Outfit({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
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
  title: "6CUPS · Toronto's Beer Pong Tournament",
  description: "Toronto's premier beer pong tournament series. Come as you are & join a game.",
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
        className={`${outfit.variable} ${posterama.variable} antialiased grain-overlay`}
      >
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
