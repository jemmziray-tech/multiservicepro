"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md w-full sticky top-0 z-50 border-b border-transparent dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold text-blue-900 dark:text-white">
              MultiService<span className="text-green-500">Pro</span>
            </Link>
          </div>

          {/* Main Menu (Desktop Only) */}
          <div className="hidden md:flex space-x-6">
            <Link href="/services" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition">Our Services</Link>
            <Link href="/shop" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition">Shop</Link>
            <Link href="/blog" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition">Blog</Link>
            <Link href="/gallery" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition">Gallery</Link>
            <Link href="/about" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition">About Us</Link>
            <Link href="/contact" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition">Contact</Link>
          </div>

          {/* Desktop Staff/Actions (Hidden on Mobile) */}
          <div className="hidden lg:flex items-center space-x-4 border-l pl-6 border-gray-200 dark:border-gray-700">
            <Link href="/dashboard" className="text-xs text-gray-400 hover:text-blue-600 font-bold uppercase">CEO</Link>
            
            <Link href="/client-login" className="text-gray-600 dark:text-gray-400 font-bold hover:text-blue-600 dark:hover:text-blue-400 text-sm transition px-2">
              Client Portal
            </Link>

            <Link href="/book" className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition shadow-md">
              Book Now
            </Link>
          </div>

          {/* Mobile Menu Button (Shows on small screens) */}
          <div className="md:hidden flex items-center gap-4">
            <button onClick={toggleMenu} className="text-gray-700 dark:text-gray-300 outline-none">
              {isOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer (Animated dropdown) */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 p-4 space-y-4 shadow-xl">
          <Link href="/services" onClick={toggleMenu} className="block text-gray-700 dark:text-gray-300 font-medium">Our Services</Link>
          <Link href="/shop" onClick={toggleMenu} className="block text-gray-700 dark:text-gray-300 font-medium">Shop</Link>
          <Link href="/blog" onClick={toggleMenu} className="block text-gray-700 dark:text-gray-300 font-medium">Blog</Link>
          <Link href="/gallery" onClick={toggleMenu} className="block text-gray-700 dark:text-gray-300 font-medium">Gallery</Link>
          <Link href="/about" onClick={toggleMenu} className="block text-gray-700 dark:text-gray-300 font-medium">About Us</Link>
          <Link href="/contact" onClick={toggleMenu} className="block text-gray-700 dark:text-gray-300 font-medium">Contact</Link>
          <hr className="dark:border-gray-800" />
          
          <Link href="/client-login" onClick={toggleMenu} className="block text-blue-600 dark:text-blue-400 font-bold">Client Portal</Link>
          <Link href="/dashboard" onClick={toggleMenu} className="block text-gray-500 dark:text-gray-400 font-medium">Staff Dashboard</Link>
          
          <Link href="/book" onClick={toggleMenu} className="block bg-blue-600 text-white text-center py-3 rounded-lg font-bold">
            Book Appointment
          </Link>
        </div>
      )}
    </nav>
  );
}