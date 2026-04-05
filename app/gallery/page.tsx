"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, ShoppingCart, Image as ImageIcon, X } from "lucide-react";

// Updated Mock Database with placeholder images added!
const galleryItems = [
  { 
    id: 1, 
    name: "Premium Fertilizer", 
    priceValue: "TZS 65,000", 
    category: "Agriculture", 
    image: "https://images.unsplash.com/photo-1628352081506-83c43123ed6d?q=80&w=600&auto=format&fit=crop" 
  },
  { 
    id: 2, 
    name: "Toyota Engine Spares", 
    priceValue: "TZS 150,000", 
    category: "Garage", 
    image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=600&auto=format&fit=crop" 
  },
  { 
    id: 3, 
    name: "High-Grade Seed Bags", 
    priceValue: "TZS 85,000", 
    category: "Agriculture", 
    image: "https://images.unsplash.com/photo-1592982537447-6f2307270e48?q=80&w=600&auto=format&fit=crop" 
  },
  { 
    id: 4, 
    name: "Server Rack Units", 
    priceValue: "TZS 850,000", 
    category: "IT", 
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop" 
  },
  { 
    id: 5, 
    name: "Heavy Duty Tires", 
    priceValue: "TZS 450,000", 
    category: "Logistics", 
    image: "https://images.unsplash.com/photo-1586528116311-ad8ed7c663c0?q=80&w=600&auto=format&fit=crop" 
  }
];

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedImage, setSelectedImage] = useState<any>(null);
  
  const whatsappNumber = "255743924467"; // Your WhatsApp Number

  const handleInquiry = (itemName: string) => {
    const message = `Hello MultiServicePro, I am interested in the *${itemName}* I saw in your Product Gallery. Is it still available?`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const categories = ["All", "Garage", "Agriculture", "IT", "Logistics"];
  
  const filteredItems = galleryItems.filter(item => 
    activeFilter === "All" || item.category === activeFilter
  );

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#09090b] pt-32 pb-24 px-4 sm:px-6 lg:px-8 transition-colors duration-500 relative overflow-hidden">
      
      {/* --- AMBIENT BACKGROUND GLOWS --- */}
      <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-600/10 dark:bg-blue-600/5 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-green-600/10 dark:bg-green-600/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header & Filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">Product Gallery</h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">Genuine Spares, Quality Tech, & Agricultural Supplies.</p>
          </div>
          
          <div className="flex bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl rounded-2xl p-1.5 shadow-sm border border-white/50 dark:border-gray-800/60 overflow-x-auto max-w-full">
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all duration-300 ${
                  activeFilter === cat 
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20' 
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-gray-800/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div 
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-white/70 dark:bg-gray-900/50 backdrop-blur-xl rounded-[2rem] shadow-lg border border-white/50 dark:border-gray-800/60 overflow-hidden group hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                <div className="relative h-64 bg-gray-200 dark:bg-gray-800 overflow-hidden">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300 dark:text-gray-700 font-black text-4xl uppercase tracking-widest opacity-50 transform -rotate-12">
                      {item.category}
                    </div>
                  )}
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    <button 
                      onClick={() => setSelectedImage(item)}
                      className="bg-white/90 text-blue-600 p-3 rounded-full hover:scale-110 hover:bg-white transition-all shadow-xl"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => handleInquiry(item.name)}
                      className="bg-green-500 text-white p-3 rounded-full hover:scale-110 hover:bg-green-400 transition-all shadow-xl"
                    >
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="p-6 md:p-8 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-4 gap-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight">
                      {item.name}
                    </h3>
                    <span className="text-blue-600 dark:text-blue-400 font-black whitespace-nowrap bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-lg">
                      {item.priceValue}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm mb-8">
                    <ImageIcon className="w-4 h-4" />
                    <span className="font-medium">Category: {item.category}</span>
                  </div>
                  <button 
                    onClick={() => handleInquiry(item.name)}
                    className="mt-auto w-full bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-gray-700 text-blue-600 dark:text-blue-400 font-bold py-4 rounded-xl transition-colors border-2 border-blue-100 dark:border-gray-700 hover:border-blue-600 dark:hover:border-blue-500"
                  >
                    Inquire Now
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/80 p-4 backdrop-blur-md"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
              className="relative max-w-4xl w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-2xl rounded-3xl overflow-hidden shadow-2xl border border-white/20 dark:border-gray-800/50"
              onClick={(e) => e.stopPropagation()} 
            >
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 bg-black/40 hover:bg-black/70 text-white p-2.5 rounded-full backdrop-blur-md transition-all hover:scale-110"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="h-64 md:h-[400px] bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
                 {selectedImage.image ? (
                   <img src={selectedImage.image} alt={selectedImage.name} className="w-full h-full object-cover" />
                 ) : (
                   <span className="text-4xl font-black text-gray-300 dark:text-gray-700 uppercase tracking-widest -rotate-12">{selectedImage.category}</span>
                 )}
              </div>
              
              <div className="p-8 md:p-10 flex flex-col md:flex-row justify-between items-center gap-6">
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">{selectedImage.name}</h3>
                  <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">{selectedImage.priceValue}</p>
                </div>
                <button 
                  onClick={() => handleInquiry(selectedImage.name)}
                  className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-green-500/30 hover:-translate-y-0.5"
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