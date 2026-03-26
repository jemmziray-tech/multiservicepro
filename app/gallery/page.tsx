"use client";

import { useState, useEffect } from "react";
import { ShoppingCart, Eye, Loader2, Image as ImageIcon } from "lucide-react";
import { supabase } from "../lib/supabase";

export default function GalleryPage() {
  const [filter, setFilter] = useState("All");
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch live gallery items (now including image URLs!)
  useEffect(() => {
    const fetchGallery = async () => {
      const { data, error } = await supabase
        .from('gallery_items')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setItems(data);
      }
      setLoading(false);
    };

    fetchGallery();
  }, []);

  const filteredItems = filter === "All" ? items : items.filter(i => i.category === filter);

  return (
    <main className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-extrabold text-blue-900">Product Gallery</h1>
            <p className="text-gray-600 mt-2">Genuine Spares, Quality Tech, & Agricultural Supplies.</p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap bg-white p-1 rounded-xl shadow-sm border border-gray-200">
            {["All", "Garage", "Agriculture", "IT", "Logistics"].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 sm:px-6 py-2 rounded-lg font-bold text-sm sm:text-base transition ${filter === cat ? "bg-blue-600 text-white shadow-md" : "text-gray-500 hover:text-blue-600"}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="w-12 h-12 animate-spin text-blue-600" /></div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.length === 0 ? (
              <div className="col-span-full text-center text-gray-500 py-10">No products found in this category.</div>
            ) : (
              filteredItems.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-xl transition-all duration-300">
                  
                  {/* DYNAMIC IMAGE DISPLAY */}
                  <div className="h-64 relative overflow-hidden bg-gray-100 flex items-center justify-center">
                    
                    {item.image_url ? (
                      // If a real image exists, show it!
                      <img 
                        src={item.image_url} 
                        alt={item.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      // Fallback: If no image, show the colored block
                      <div className={`${item.color || 'bg-gray-200'} w-full h-full flex items-center justify-center`}>
                        <span className="text-white font-bold opacity-20 text-5xl uppercase transform -rotate-12">{item.category}</span>
                      </div>
                    )}
                    
                    {/* Hover Actions (Always visible on hover) */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                      <button className="bg-white p-3 rounded-full text-blue-600 hover:scale-110 transition shadow-lg"><Eye className="w-6 h-6" /></button>
                      <button className="bg-white p-3 rounded-full text-green-600 hover:scale-110 transition shadow-lg"><ShoppingCart className="w-6 h-6" /></button>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
                      <span className="text-blue-600 font-bold whitespace-nowrap ml-4">{item.price}</span>
                    </div>
                    <p className="text-gray-500 text-sm flex items-center gap-1">
                      <ImageIcon className="w-4 h-4" /> Category: {item.category}
                    </p>
                    <button className="mt-6 w-full py-3 rounded-lg border-2 border-blue-600 text-blue-600 font-bold hover:bg-blue-600 hover:text-white transition">
                      Inquire Now
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

      </div>
    </main>
  );
}