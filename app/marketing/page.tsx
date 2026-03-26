"use client";

import { useState } from "react";
import { PlusCircle, Image as ImageIcon, Tag, DollarSign, Loader2, CheckCircle } from "lucide-react";
import { supabase } from "../lib/supabase";

export default function MarketingPage() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Garage");
  const [price, setPrice] = useState("");
  const [color, setColor] = useState("bg-blue-500");
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from('gallery_items').insert([
      { name, category, price, color }
    ]);

    setLoading(false);

    if (error) {
      alert("Error adding item: " + error.message);
    } else {
      setSuccess(true);
      setName("");
      setPrice("");
      setTimeout(() => setSuccess(false), 3000); // Hide success message after 3 seconds
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Header */}
        <div>
          <h1 className="text-4xl font-extrabold text-blue-900 flex items-center gap-3">
            <ImageIcon className="text-orange-500 w-10 h-10" /> Marketing Dashboard
          </h1>
          <p className="text-gray-600 mt-2 text-lg">Manage public gallery items and promotional materials.</p>
        </div>

        {/* NEW: Add to Gallery Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-orange-50 p-6 border-b border-orange-100">
            <h2 className="text-xl font-bold text-orange-900 flex items-center gap-2">
              <PlusCircle className="w-6 h-6" /> Add New Product to Gallery
            </h2>
          </div>
          
          <form onSubmit={handleAddItem} className="p-6 md:p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product/Service Name</label>
                <div className="relative">
                  <Tag className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  <input type="text" required value={name} onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 outline-none" placeholder="e.g. Premium Brake Pads" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price / Value</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  <input type="text" required value={price} onChange={(e) => setPrice(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 outline-none" placeholder="e.g. TZS 45,000" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 outline-none bg-white">
                  <option value="Garage">Garage</option>
                  <option value="Agriculture">Agriculture</option>
                  <option value="IT">IT Services</option>
                  <option value="Logistics">Logistics</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Card Color (Visual)</label>
                <select value={color} onChange={(e) => setColor(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 outline-none bg-white">
                  <option value="bg-red-500">Red (Best for Garage)</option>
                  <option value="bg-green-500">Green (Best for Agriculture)</option>
                  <option value="bg-blue-500">Blue (Best for IT)</option>
                  <option value="bg-orange-500">Orange (Best for Logistics)</option>
                </select>
              </div>

            </div>

            <button type="submit" disabled={loading} className="w-full md:w-auto bg-orange-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-orange-700 transition flex items-center justify-center gap-2">
              {loading ? <Loader2 className="animate-spin w-5 h-5" /> : success ? <><CheckCircle className="w-5 h-5" /> Added Successfully!</> : "Publish to Gallery"}
            </button>
          </form>
        </div>

      </div>
    </main>
  );
}