import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/ui";
import "@/styles/globals.css";
import { Providers } from "@/lib/providers";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Shavim Platform",
  description: "פלטפורמה להזמנת מרצים עם נגישות מלאה",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl">
      <body className="min-h-screen flex flex-col bg-gradient-to-br from-purple-900/30 via-blue-900/30 to-red-900/30">
        <Providers>
          <Header />
          <main className="flex-1 container mx-auto px-4 py-8 bg-white/10 backdrop-blur-sm pt-24">
            {children}
          </main>
          <Footer />
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  );
}