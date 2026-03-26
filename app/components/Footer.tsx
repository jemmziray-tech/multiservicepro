import Link from "next/link";
// Notice we removed Facebook, Instagram, and Twitter from this line!
import { MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-blue-950 text-white pt-16 pb-8 border-t border-blue-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section: 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Column 1: Brand & About */}
          <div>
            <Link href="/" className="text-2xl font-bold text-white mb-4 block">
              MultiService<span className="text-green-400">Pro</span>
            </Link>
            <p className="text-blue-200 text-sm leading-relaxed mb-6">
              Your trusted partner for Logistics, IT, Agriculture, and Maintenance services across Tanzania. We deliver excellence in every project.
            </p>
            {/* Social Media Links Using Raw SVGs */}
            <div className="flex space-x-4">
              <a href="#" className="bg-blue-900 p-2 rounded-full text-blue-300 hover:text-white hover:bg-blue-700 transition flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="#" className="bg-blue-900 p-2 rounded-full text-blue-300 hover:text-white hover:bg-blue-700 transition flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" className="bg-blue-900 p-2 rounded-full text-blue-300 hover:text-white hover:bg-blue-700 transition flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-blue-100">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-blue-300 hover:text-green-400 transition text-sm">Home</Link></li>
              <li><Link href="/about" className="text-blue-300 hover:text-green-400 transition text-sm">About Us</Link></li>
              <li><Link href="/services" className="text-blue-300 hover:text-green-400 transition text-sm">Our Services</Link></li>
              <li><Link href="/contact" className="text-blue-300 hover:text-green-400 transition text-sm">Contact</Link></li>
              <li><Link href="/login" className="text-blue-300 hover:text-white transition text-sm font-semibold">Staff Login</Link></li>
              <li><Link href="/marketing" className="text-blue-300 hover:text-green-400 transition text-sm">Flyers & Proposals</Link></li>
            </ul>
          </div>

          {/* Column 3: Our Services */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-blue-100">Our Services</h3>
            <ul className="space-y-3">
              <li className="text-blue-300 text-sm">Logistics & Transport</li>
              <li className="text-blue-300 text-sm">Farmigation & Cleaning</li>
              <li className="text-blue-300 text-sm">IT & Tech Support</li>
              <li className="text-blue-300 text-sm">Agriculture Solutions</li>
              <li className="text-blue-300 text-sm">Garage & Spare Parts</li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-blue-100">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-blue-300">
                <MapPin className="w-5 h-5 text-green-400 shrink-0" />
                <span>Dar es Salaam, Tanzania</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-blue-300">
                <Phone className="w-5 h-5 text-green-400 shrink-0" />
                <span>+255 123 456 789</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-blue-300">
                <Mail className="w-5 h-5 text-green-400 shrink-0" />
                <span>info@multiservicepro.co.tz</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Section: Copyright */}
        <div className="pt-8 border-t border-blue-900/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-blue-400 text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} MultiServicePro. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-blue-400">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}