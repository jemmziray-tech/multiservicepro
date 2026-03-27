"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PlusCircle, Image as ImageIcon, Tag, Loader2, CheckCircle, UploadCloud } from "lucide-react";
import { supabase } from "../lib/supabase";

export default function MarketingPage() {
  // --- AUTH STATE ---
  const [isAuthorized, setIsAuthorized] = useState(false);
  const router = useRouter();

  // --- FORM STATE ---
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Garage");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // --- SECURITY BOUNCER ---
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        // Not logged in? Kick them to the login page
        router.push("/login");
      } else {
        // Authorized!
        setIsAuthorized(true);
      }
    };
    checkUser();
  }, [router]);

  // --- UPLOAD LOGIC ---
  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      alert("Please select an image to upload!");
      return;
    }

    setLoading(true);
    try {
      // 1. Upload the image
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`; 
      const { error: uploadError } = await supabase.storage
        .from('gallery')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // 2. Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('gallery')
        .getPublicUrl(fileName);

      // 3. Save to database
      const { error: dbError } = await supabase.from('gallery_items').insert([
        { 
          name, 
          category, 
          price, 
          color: 'bg-gray-100', 
          image_url: publicUrl 
        }
      ]);

      if (dbError) throw dbError;

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

  // While checking authorization, show a clean loading screen
  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto" />
          <p className="mt-4 text-gray-500 animate-pulse">Checking credentials...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4 sm:p-8 transition-colors duration-500">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Header */}
        <div>
          <h1 className="text-4xl font-extrabold text-blue-900 dark:text-white flex items-center gap-3">
            <ImageIcon className="text-orange-500 w-10 h-10" /> Marketing Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">Upload real product photos to the public gallery.</p>
        </div>

        {/* Form */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="bg-orange-50 dark:bg-orange-900/20 p-6 border-b border-orange-100 dark:border-orange-900/30">
            <h2 className="text-xl font-bold text-orange-900 dark:text-orange-400 flex items-center gap-2">
              <PlusCircle className="w-6 h-6" /> Add New Product
            </h2>
          </div>
          
          <form onSubmit={handleAddItem} className="p-6 md:p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Product Name</label>
                <div className="relative">
                  <Tag className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  <input type="text" required value={name} onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-orange-500 outline-none text-gray-900 dark:text-white dark:bg-gray-800 font-medium" />
                </div>
              </div>

              <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price</label>
              <div className="relative">
                {/* Swapped the Dollar Icon for TZS text */}
                <span className="absolute left-4 top-3.5 text-gray-500 dark:text-gray-400 font-bold text-sm">TZS</span>
                <input 
                  type="text" 
                  required 
                  value={price} 
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="150,000"
                  className="w-full pl-14 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-orange-500 outline-none text-gray-900 dark:text-white dark:bg-gray-800 font-medium" 
                />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-medium">
                  <option value="Garage">Garage</option>
                  <option value="Agriculture">Agriculture</option>
                  <option value="IT">IT Services</option>
                  <option value="Logistics">Logistics</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Upload Product Image</label>
                <div className="relative border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-3 hover:border-orange-500 transition bg-white dark:bg-gray-800 flex items-center">
                  <UploadCloud className="w-6 h-6 text-gray-400 mr-2" />
                  <input 
                    type="file" 
                    accept="image/*" 
                    required 
                    onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                    className="w-full text-sm text-gray-600 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 dark:file:bg-orange-900/40 file:text-orange-700 dark:file:text-orange-400 cursor-pointer" 
                  />
                </div>
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full md:w-auto bg-orange-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-orange-700 transition flex items-center justify-center gap-2 shadow-lg">
              {loading ? <Loader2 className="animate-spin w-5 h-5" /> : success ? <><CheckCircle className="w-5 h-5" /> Success!</> : "Upload to Gallery"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}