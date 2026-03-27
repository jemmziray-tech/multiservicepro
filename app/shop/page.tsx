"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingCart, Plus, Minus, X, Wrench, Package, ArrowRight } from "lucide-react";

// Mock Database of Garage & Spare Parts
const initialProducts = [
  { id: 1, name: "Premium Engine Oil (5W-30)", price: 85000, category: "Fluids", inStock: true },
  { id: 2, name: "Heavy Duty Brake Pads (Set)", price: 120000, category: "Parts", inStock: true },
  { id: 3, name: "All-Terrain Truck Tire (Commercial)", price: 450000, category: "Wheels", inStock: true },
  { id: 4, name: "Industrial Tractor Battery", price: 320000, category: "Agriculture", inStock: true },
  { id: 5, name: "Spark Plugs (4-Pack)", price: 45000, category: "Parts", inStock: true },
  { id: 6, name: "Hydraulic Fluid (20L)", price: 150000, category: "Fluids", inStock: true },
];

export default function ShopPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [cart, setCart] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Business WhatsApp Number (Format: 255700000000)
  const whatsappNumber = "255743924467"; 

  // Filtering Logic
  const categories = ["All", "Parts", "Fluids", "Wheels", "Agriculture"];
  const filteredProducts = initialProducts.filter(product => 
    (activeCategory === "All" || product.category === activeCategory) &&
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Cart Functions
  const addToCart = (product: any) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
    setIsCartOpen(true); // Auto-open cart when item is added
  };

  const updateQty = (id: number, delta: number) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQty = item.qty + delta;
        return newQty > 0 ? { ...item, qty: newQty } : item;
      }
      return item;
    }));
  };

  const removeFromCart = (id: number) => setCart(cart.filter(item => item.id !== id));

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  // Checkout via WhatsApp
  const handleCheckout = () => {
    let message = `*NEW ORDER FROM WEBSITE*%0A%0A`;
    cart.forEach(item => {
      message += `▪ ${item.qty}x ${item.name} - TZS ${(item.price * item.qty).toLocaleString()}%0A`;
    });
    message += `%0A*Total: TZS ${cartTotal.toLocaleString()}*%0A%0APlease let me know how to proceed with payment and delivery.`;
    
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-32 pb-24 px-4 sm:px-6 lg:px-8 transition-colors duration-500">
      <div className="max-w-7xl mx-auto relative">
        
        {/* Header & Cart Button */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 dark:text-white tracking-tight flex items-center justify-center md:justify-start gap-3">
              <Wrench className="w-10 h-10 text-orange-500" /> Spare Parts Shop
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">High-quality parts for your logistics and agricultural fleets.</p>
          </div>
          
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 px-6 py-3 rounded-full font-bold text-gray-900 dark:text-white flex items-center gap-3 hover:shadow-lg transition-all"
          >
            <ShoppingCart className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            View Cart
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">
                {totalItems}
              </span>
            )}
          </button>
        </div>

        {/* Search & Filters */}
        <div className="bg-white dark:bg-gray-900 p-4 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 mb-10 flex flex-col lg:flex-row gap-4 justify-between items-center">
          <div className="relative w-full lg:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search parts, oils, tires..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-800 border-none outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-hide">
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-xl font-bold text-sm whitespace-nowrap transition-colors ${activeCategory === cat ? 'bg-blue-600 text-white' : 'bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl overflow-hidden hover:shadow-xl transition-all group">
              <div className="h-48 bg-gray-50 dark:bg-gray-800 flex items-center justify-center group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-colors">
                <Package className="w-16 h-16 text-gray-300 dark:text-gray-600 group-hover:text-blue-300 group-hover:scale-110 transition-all duration-500" />
              </div>
              <div className="p-6">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded-md mb-3 inline-block">
                  {product.category}
                </span>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{product.name}</h3>
                <p className="text-2xl font-black text-gray-900 dark:text-white mb-6">
                  TZS {product.price.toLocaleString()}
                </p>
                <button 
                  onClick={() => addToCart(product)}
                  className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold py-3 rounded-xl hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Floating Cart Sidebar Modal */}
        <AnimatePresence>
          {isCartOpen && (
            <>
              {/* Backdrop */}
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setIsCartOpen(false)}
                className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
              />
              
              {/* Sidebar */}
              <motion.div 
                initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 h-full w-full sm:w-96 bg-white dark:bg-gray-900 shadow-2xl z-50 flex flex-col"
              >
                <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-gray-950">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <ShoppingCart className="w-6 h-6 text-blue-600" /> Your Cart
                  </h2>
                  <button onClick={() => setIsCartOpen(false)} className="p-2 bg-white dark:bg-gray-800 rounded-full hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-500 transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  {cart.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
                      <Package className="w-16 h-16 opacity-20" />
                      <p>Your cart is empty.</p>
                    </div>
                  ) : (
                    cart.map(item => (
                      <div key={item.id} className="flex gap-4 items-center bg-gray-50 dark:bg-gray-800/50 p-4 rounded-2xl border border-gray-100 dark:border-gray-800">
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 dark:text-white text-sm leading-tight mb-1">{item.name}</h4>
                          <p className="text-blue-600 dark:text-blue-400 font-bold text-sm">TZS {(item.price * item.qty).toLocaleString()}</p>
                        </div>
                        <div className="flex items-center gap-3 bg-white dark:bg-gray-900 px-2 py-1 rounded-lg border border-gray-200 dark:border-gray-700">
                          <button onClick={() => updateQty(item.id, -1)} className="text-gray-500 hover:text-black dark:hover:text-white"><Minus className="w-4 h-4" /></button>
                          <span className="font-bold w-4 text-center text-sm dark:text-white">{item.qty}</span>
                          <button onClick={() => updateQty(item.id, 1)} className="text-gray-500 hover:text-black dark:hover:text-white"><Plus className="w-4 h-4" /></button>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-600 p-1"><X className="w-4 h-4" /></button>
                      </div>
                    ))
                  )}
                </div>

                {cart.length > 0 && (
                  <div className="p-6 bg-gray-50 dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800">
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-gray-500 dark:text-gray-400 font-bold">Total Amount</span>
                      <span className="text-2xl font-black text-gray-900 dark:text-white">TZS {cartTotal.toLocaleString()}</span>
                    </div>
                    <button 
                      onClick={handleCheckout}
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-colors shadow-lg"
                    >
                      Order via WhatsApp <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </motion.div>
            </>
          )}
        </AnimatePresence>
        
      </div>
    </main>
  );
}