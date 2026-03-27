"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, ShoppingCart, Image as ImageIcon } from "lucide-react";

// Mock Database based on your screenshot
const galleryItems = [
  { 
    id: 1, 
    name: "Fertilizer", 
    priceValue: "65", 
    category: "Agriculture", 
    image: "https://images.unsplash.com/photo-1628352081506-83c43123ed6d?q=80&w=600&auto=format&fit=crop" // Realistic placeholder
  },
  { 
    id: 2, 
    name: "Toyota Engine Spares", 
    priceValue: "TZS 150,000", 
    category: "Garage", 
    image: "" // Empty string will show the grey placeholder like your screenshot
  },
  { 
    id: 3, 
    name: "High-Grade Fertilizer", 
    priceValue: "TZS 85,000", 
    category: "Agriculture", 
    image: "" 
  }
];

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  
  // --- WHATSAPP LOGIC ---
  const whatsappNumber = "255743924467"; // REPLACE WITH YOUR REAL NUMBER

  const handleInquiry = (itemName: string) => {
    const message = `Hello MultiServicePro, I am interested in the *${itemName}* I saw in your Product Gallery. Is it still available?`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const categories = ["All", "Garage", "Agriculture", "IT", "Logistics"];
  
  const filteredItems = galleryItems.filter(item => 
    activeFilter === "All" || item.category === activeFilter
  );

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-32 pb-24 px-4 sm:px-6 lg:px-8 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        
        {/* Header & Filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-extrabold text-blue-900 dark:text-white mb-2">Product Gallery</h1>
            <p className="text-gray-600 dark:text-gray-400">Genuine Spares, Quality Tech, & Agricultural Supplies.</p>
          </div>
          
          {/* Filters matching your screenshot */}
          <div className="flex bg-white dark:bg-gray-900 rounded-xl p-1 shadow-sm border border-gray-100 dark:border-gray-800 overflow-x-auto max-w-full">
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-6 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-colors ${
                  activeFilter === cat 
                    ? 'bg-blue-600 text-white shadow-sm' 
                    : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <motion.div 
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-900 rounded-[2rem] shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden group hover:shadow-xl transition-shadow"
            >
              {/* Image Container */}
              <div className="relative h-64 bg-gray-100 dark:bg-gray-800 overflow-hidden">
                {item.image ? (
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-200 dark:text-gray-700 font-black text-4xl uppercase tracking-widest opacity-50 transform -rotate-12">
                    {item.category}
                  </div>
                )}
                
                {/* Hover Overlay with Icons */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <button className="bg-white text-blue-600 p-3 rounded-full hover:scale-110 transition-transform shadow-lg">
                    <Eye className="w-5 h-5" />
                  </button>
                  {/* The Cart Icon now triggers the WhatsApp inquiry! */}
                  <button 
                    onClick={() => handleInquiry(item.name)}
                    className="bg-white text-green-600 p-3 rounded-full hover:scale-110 transition-transform shadow-lg"
                  >
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Details Container */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-4 gap-2">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight">
                    {item.name}
                  </h3>
                  <span className="text-blue-600 dark:text-blue-400 font-bold whitespace-nowrap">
                    {item.priceValue}
                  </span>
                </div>
                
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm mb-6">
                  <ImageIcon className="w-4 h-4" />
                  <span>Category: {item.category}</span>
                </div>

                {/* The "Inquire Now" Button now triggers the WhatsApp inquiry! */}
                <button 
                  onClick={() => handleInquiry(item.name)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-colors outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 border border-blue-600"
                >
                  Inquire Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </main>
  );
}