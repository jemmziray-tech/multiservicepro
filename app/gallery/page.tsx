"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, ShoppingCart, Image as ImageIcon, X } from "lucide-react";

// Updated Mock Database with proper TZS formatting
const galleryItems = [
  { 
    id: 1, 
    name: "Fertilizer", 
    priceValue: "TZS 65,000", 
    category: "Agriculture", 
    image: "https://images.unsplash.com/photo-1628352081506-83c43123ed6d?q=80&w=600&auto=format&fit=crop" 
  },
  { 
    id: 2, 
    name: "Toyota Engine Spares", 
    priceValue: "TZS 150,000", 
    category: "Garage", 
    image: "" 
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
  const [selectedImage, setSelectedImage] = useState<any>(null); // State for the Image Modal
  
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
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-32 pb-24 px-4 sm:px-6 lg:px-8 transition-colors duration-500 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Header & Filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-extrabold text-blue-900 dark:text-white mb-2">Product Gallery</h1>
            <p className="text-gray-600 dark:text-gray-400">Genuine Spares, Quality Tech, & Agricultural Supplies.</p>
          </div>
          
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
              <div className="relative h-64 bg-gray-100 dark:bg-gray-800 overflow-hidden">
                {item.image ? (
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-200 dark:text-gray-700 font-black text-4xl uppercase tracking-widest opacity-50 transform -rotate-12">
                    {item.category}
                  </div>
                )}
                
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  {/* The Eye button now opens the modal */}
                  <button 
                    onClick={() => setSelectedImage(item)}
                    className="bg-white text-blue-600 p-3 rounded-full hover:scale-110 transition-transform shadow-lg"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => handleInquiry(item.name)}
                    className="bg-white text-green-600 p-3 rounded-full hover:scale-110 transition-transform shadow-lg"
                  >
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                </div>
              </div>

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

      {/* LIGHTBOX MODAL (Pops up when Eye is clicked) */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="relative max-w-4xl w-full bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()} // Prevents clicking inside the box from closing it
            >
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black text-white p-2 rounded-full transition"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="h-64 md:h-96 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                 {selectedImage.image ? (
                   <img src={selectedImage.image} alt={selectedImage.name} className="w-full h-full object-cover" />
                 ) : (
                   <span className="text-4xl font-black text-gray-300 dark:text-gray-700 uppercase tracking-widest -rotate-12">{selectedImage.category}</span>
                 )}
              </div>
              
              <div className="p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{selectedImage.name}</h3>
                  <p className="text-xl font-black text-blue-600 dark:text-blue-400">{selectedImage.priceValue}</p>
                </div>
                <button 
                  onClick={() => handleInquiry(selectedImage.name)}
                  className="w-full md:w-auto px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition"
                >
                  <ShoppingCart className="w-5 h-5" /> Order via WhatsApp
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}