import Link from "next/link"; // <-- 1. We import the magical Next.js Link tool

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
      
      {/* Main Heading */}
      <h1 className="text-5xl font-extrabold text-blue-900 mb-6 text-center">
        Welcome to Our Multi-Service Platform
      </h1>
      
      {/* Subheading */}
      <p className="text-xl text-gray-600 text-center max-w-2xl mb-10">
        Your one-stop solution for Logistics, Farmigation, IT, Agriculture, and Garage Services.
      </p>
      
      {/* Buttons */}
      <div className="flex space-x-4">
        
        {/* 2. We change the button to a Link that points to "/services" */}
        <Link 
          href="/services" 
          className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition flex items-center justify-center"
        >
          Explore Services
        </Link>
        
        {/* WORKING WhatsApp Integration */}
        <a 
          href="https://wa.me/255792353234" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-green-500 text-white px-8 py-3 rounded-full font-bold hover:bg-green-600 transition flex items-center gap-2"
        >
          WhatsApp Us
        </a>
      </div>

    </main>
  );
}