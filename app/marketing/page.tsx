"use client";

import { useState } from "react";
import { PlusCircle, Image as ImageIcon, Tag, DollarSign, Loader2, CheckCircle, UploadCloud } from "lucide-react";
import { supabase } from "../lib/supabase";

export default function MarketingPage() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Garage");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState<File | null>(null); // NEW: Holds the selected image
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      alert("Please select an image to upload!");
      return;
    }

    setLoading(true);

    try {
      // 1. Upload the image to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`; // Create a unique name
      
      const { error: uploadError } = await supabase.storage
        .from('gallery')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // 2. Get the public URL of the uploaded image
      const { data: { publicUrl } } = supabase.storage
        .from('gallery')
        .getPublicUrl(fileName);

      // 3. Save the product details AND the image URL to the database
      const { error: dbError } = await supabase.from('gallery_items').insert([
        { name, category, price, color: 'bg-gray-100', image_url: publicUrl } // We keep a default color just in case
      ]);

      if (dbError) throw dbError;

      // Success! Reset the form.
      setSuccess(true);
      setName("");
      setPrice("");
      setFile(null);
      setTimeout(() => setSuccess(false), 3000);

    } catch (error: any) {
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
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
          <p className="text-gray-600 mt-2 text-lg">Upload real product photos to the public gallery.</p>
        </div>

        {/* Add to Gallery Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-orange-50 p-6 border-b border-orange-100">
            <h2 className="text-xl font-bold text-orange-900 flex items-center gap-2">
              <PlusCircle className="w-6 h-6" /> Add New Product
            </h2>
          </div>
          
          <form onSubmit={handleAddItem} className="p-6 md:p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                <div className="relative">
                  <Tag className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  <input type="text" required value={name} onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 outline-none text-gray-900 bg-white font-medium" placeholder="e.g. Premium Brake Pads" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  <input type="text" required value={price} onChange={(e) => setPrice(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 outline-none text-gray-900 bg-white font-medium" placeholder="e.g. TZS 45,000" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 outline-none bg-white text-gray-900 font-medium">
                  <option value="Garage">Garage</option>
                  <option value="Agriculture">Agriculture</option>
                  <option value="IT">IT Services</option>
                  <option value="Logistics">Logistics</option>
                </select>
              </div>

              {/* NEW: Image Upload Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Upload Product Image</label>
                <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-3 hover:border-orange-500 transition bg-white flex items-center">
                  <UploadCloud className="w-6 h-6 text-gray-400 mr-2" />
                  <input 
                    type="file" 
                    accept="image/*" 
                    required 
                    onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                    className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100 cursor-pointer" 
                  />
                </div>
              </div>

            </div>

            <button type="submit" disabled={loading} className="w-full md:w-auto bg-orange-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-orange-700 transition flex items-center justify-center gap-2">
              {loading ? <Loader2 className="animate-spin w-5 h-5" /> : success ? <><CheckCircle className="w-5 h-5" /> Uploaded Successfully!</> : "Upload to Gallery"}
            </button>
          </form>
        </div>

      </div>
    </main>
  );
}