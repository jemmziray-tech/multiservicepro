import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md w-full sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold text-blue-900">
              MultiService<span className="text-green-500">Pro</span>
            </Link>
          </div>

          {/* Main Menu (Client Facing) */}
          <div className="hidden md:flex space-x-6">
            <Link href="/services" className="text-gray-700 hover:text-blue-600 font-medium transition">
              Our Services
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-blue-600 font-medium transition">
              Blog
            </Link>
            <Link href="/gallery" className="text-gray-700 hover:text-blue-600 font-medium transition">
              Gallery
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600 font-medium transition">
              About Us
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-600 font-medium transition">
              Contact
            </Link>
          </div>

          {/* Staff Section (Management Tools) */}
          <div className="hidden xl:flex items-center space-x-4 border-l pl-6 border-gray-200">
            <Link href="/marketing" className="text-xs text-gray-400 hover:text-orange-600 transition font-bold uppercase tracking-tighter">
              Marketing
            </Link>
            <Link href="/finance" className="text-xs text-gray-400 hover:text-green-600 transition font-bold uppercase tracking-tighter">
              Finance
            </Link>
            <Link href="/dashboard" className="text-xs text-gray-400 hover:text-blue-600 transition font-bold uppercase tracking-tighter">
              CEO Dashboard
            </Link>
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/login" className="text-blue-600 font-medium hover:underline text-sm">
              Staff Login
            </Link>
            <Link href="/book" className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition shadow-sm">
              Book Appointment
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
}