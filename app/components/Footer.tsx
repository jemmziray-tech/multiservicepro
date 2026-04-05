import Link from "next/link";
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-white/70 dark:bg-[#09090b]/80 backdrop-blur-xl pt-16 pb-8 border-t border-gray-200 dark:border-gray-800/60 transition-colors duration-500 overflow-hidden">
      
      {/* Subtle Bottom Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-blue-600/5 dark:bg-blue-500/5 blur-[100px] pointer-events-none rounded-t-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Section: 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Column 1: Brand & About */}
          <div>
            <Link href="/" className="text-2xl font-extrabold text-gray-900 dark:text-white mb-4 block tracking-tight">
              MultiService<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-500">Pro</span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">
              Your trusted partner for Logistics, IT, Agriculture, and Maintenance services across Tanzania. We deliver excellence in every project.
            </p>
            
            {/* Social Media Links Using Lucide Icons */}
            <div className="flex space-x-4">
              <a href="#" className="bg-gray-100 dark:bg-gray-900 p-2.5 rounded-full text-gray-500 dark:text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:text-blue-400 dark:hover:bg-blue-900/30 transition-all hover:scale-110 hover:-translate-y-1 shadow-sm">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="bg-gray-100 dark:bg-gray-900 p-2.5 rounded-full text-gray-500 dark:text-gray-400 hover:text-pink-600 hover:bg-pink-50 dark:hover:text-pink-400 dark:hover:bg-pink-900/30 transition-all hover:scale-110 hover:-translate-y-1 shadow-sm">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="bg-gray-100 dark:bg-gray-900 p-2.5 rounded-full text-gray-500 dark:text-gray-400 hover:text-sky-500 hover:bg-sky-50 dark:hover:text-sky-400 dark:hover:bg-sky-900/30 transition-all hover:scale-110 hover:-translate-y-1 shadow-sm">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm font-medium">Home</Link></li>
              <li><Link href="/about" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm font-medium">About Us</Link></li>
              <li><Link href="/services" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm font-medium">Our Services</Link></li>
              <li><Link href="/contact" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm font-medium">Contact</Link></li>
              <li><Link href="/login" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors text-sm font-bold">Staff Login</Link></li>
              <li><Link href="/marketing" className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors text-sm font-medium">Flyers & Proposals</Link></li>
            </ul>
          </div>

          {/* Column 3: Our Services */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Our Services</h3>
            <ul className="space-y-3">
              <li className="text-gray-600 dark:text-gray-400 text-sm font-medium">Logistics & Transport</li>
              <li className="text-gray-600 dark:text-gray-400 text-sm font-medium">Farmigation & Cleaning</li>
              <li className="text-gray-600 dark:text-gray-400 text-sm font-medium">IT & Tech Support</li>
              <li className="text-gray-600 dark:text-gray-400 text-sm font-medium">Agriculture Solutions</li>
              <li className="text-gray-600 dark:text-gray-400 text-sm font-medium">Garage & Spare Parts</li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400 font-medium">
                <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
                <span>Dar es Salaam, Tanzania</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400 font-medium">
                <Phone className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0" />
                <span>+255 123 456 789</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400 font-medium">
                <Mail className="w-5 h-5 text-purple-600 dark:text-purple-400 shrink-0" />
                <span>info@multiservicepro.co.tz</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Section: Copyright */}
        <div className="pt-8 border-t border-gray-200 dark:border-gray-800/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 dark:text-gray-400 text-sm text-center md:text-left font-medium">
            &copy; {new Date().getFullYear()} MultiServicePro. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-gray-500 dark:text-gray-400 font-medium">
            <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}