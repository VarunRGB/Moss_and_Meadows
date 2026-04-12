import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Inter for clean UI elements
const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
});

// Playfair Display for that high-end, luxury serif feel in headings
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  title: "Moss & Meadows | Curated Botanical Luxury",
  description: "Bring nature into your home with a calm, premium touch. Discover healthy indoor plants and curated collections.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      {/* 1. Add flex and min-h-screen to the body */}
      <body 
        className={`${inter.variable} ${playfair.variable} font-sans antialiased min-h-screen flex flex-col`}
      >
        <Navbar />
        
        {/* 2. Remove min-h-screen from main and use flex-grow instead */}
        <main className="flex-grow pt-16">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}