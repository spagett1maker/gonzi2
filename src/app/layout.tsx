import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import Header from "../components/Header/page";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        {children}
        <footer className="relative w-full z-[999] bg-white h-[80px] flex items-center">
          <div className="container mx-auto py-4 px-4">
            <p className="text-md font-light">Generated by 곤지곤지</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
