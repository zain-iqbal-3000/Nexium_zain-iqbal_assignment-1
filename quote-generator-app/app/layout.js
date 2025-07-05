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

export const metadata = {
  title: "Quote Generator",
  description: "Generate inspiring quotes on any topic",
  icons: {
    icon: [
      { url: "/quotes-favicon.svg" },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gradient-to-br from-stone-50 to-stone-100 dark:from-stone-900 dark:to-stone-800 text-stone-800 dark:text-stone-50 transition-colors duration-300`}
      >
        {children}
      </body>
    </html>
  );
}
