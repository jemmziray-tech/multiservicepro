import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"; // <-- 1. Import the Footer here

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Multi-Service Platform",
  description: "Logistics, IT, Agriculture, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* We add min-h-screen and flex flex-col to the body to push the footer to the bottom */}
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Navbar />
        
        {/* The main content takes up all available middle space */}
        <div className="flex-grow">
          {children}
        </div>
        
        <Footer /> {/* <-- 2. Place the Footer at the very bottom */}
      </body>
    </html>
  );
}