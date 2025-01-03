import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import { DateProvider } from "@/context/DateContext";
import { TimeProvider } from "@/context/TimeContext"; // Import TimeProvider

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
  title: "FineDine",
  description: "Create a personalised todo-list",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Link to the favicon in the public folder */}
        <link rel="icon" href="/finedine.jpeg" type="image/png" sizes="32x32" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        {/* Wrap the children with both DateProvider and TimeProvider */}
        <DateProvider>
          <TimeProvider>{children}</TimeProvider>
        </DateProvider>
      </body>
    </html>
  );
}
