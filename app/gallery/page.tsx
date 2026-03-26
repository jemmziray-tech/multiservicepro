"use client";

import { useState } from "react";
import { Search, ShoppingCart, Eye } from "lucide-react";

export default function GalleryPage() {
  const [filter, setFilter] = useState("All");

  const items = [
    { id: 1, name: "Toyota Engine Spares", category: "Garage", price: "TZS 150,000", color: "bg-red-500" },
    { id: 2, name: "High-Grade Fertilizer", category: "Agriculture", price: "TZS 85,000", color: "bg-green-500" },
    { id: 3, name: "Brake Pad Set", category: "Garage", price: "TZS 45,000", color: "bg-red-400" },
    { id: 4, name: "Hybrid Maize Seeds", category: "Agriculture", price: "TZS 20,000", color: "bg-green-400" },
    { id: 5, name: "Heavy Duty Battery", category: "Garage", price: "TZS 220,000", color: "bg-red-600" },
    { id: 6, name: "Organic Pesticide", category: "Agriculture", price: "TZS 35,000", color: "bg-green-600" },
  ];

  const filteredItems = filter === "All" ? items : items.filter(i => i.category === filter);

  return (
    <main className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-extrabold text-blue-900">Product Gallery</h1>
            <p className="text-gray-600 mt-2">Genuine Spares & Quality Agricultural Supplies.</p>
          </div>

          {/* Filter Buttons */}
          <div className="flex bg-white p-1 rounded-xl shadow-sm border border-gray-200">
            {["All", "Garage", "Agriculture"].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-lg font-bold transition ${filter === cat ? "bg-blue-600 text-white shadow-md" : "text-gray-500 hover:text-blue-600"}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-xl transition-all duration-300">
              
              {/* Product Image Placeholder */}
              <div className={`${item.color} h-64 flex items-center justify-center relative overflow-hidden`}>
                <span className="text-white font-bold opacity-20 text-6xl uppercase transform -rotate-12">{item.category}</span>
                
                {/* Hover Actions */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <button className="bg-white p-3 rounded-full text-blue-600 hover:scale-110 transition"><Eye className="w-6 h-6" /></button>
                  <button className="bg-white p-3 rounded-full text-green-600 hover:scale-110 transition"><ShoppingCart className="w-6 h-6" /></button>
                </div>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
                  <span className="text-blue-600 font-bold">{item.price}</span>
                </div>
                <p className="text-gray-500 text-sm">Category: {item.category}</p>
                <button className="mt-6 w-full py-3 rounded-lg border-2 border-blue-600 text-blue-600 font-bold hover:bg-blue-600 hover:text-white transition">
                  Inquire Now
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}