"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingCart, Plus, Minus, X, Wrench, Package, ArrowRight } from "lucide-react";

// Mock Database upgraded with placeholder images
const initialProducts = [
  { id: 1, name: "Premium Engine Oil (5W-30)", price: 85000, category: "Fluids", inStock: true, image: "https://images.unsplash.com/photo-1620288627223-53302f4e8c74?q=80&w=600&auto=format&fit=crop" },
  { id: 2, name: "Heavy Duty Brake Pads (Set)", price: 120000, category: "Parts", inStock: true, image: "https://images.unsplash.com/photo-1486262715619-6708146bc9b5?q=80&w=600&auto=format&fit=crop" },
  { id: 3, name: "All-Terrain Truck Tire", price: 450000, category: "Wheels", inStock: true, image: "https://images.unsplash.com/photo-1586256087541-11d279cf0214?q=80&w=600&auto=format&fit=crop" },
  { id: 4, name: "Industrial Tractor Battery", price: 320000, category: "Agriculture", inStock: true, image: "https://images.unsplash.com/photo-1557800636-894a64c1696f?q=80&w=600&auto=format&fit=crop" },
  { id: 5, name: "Spark Plugs (4-Pack)", price: 45000, category: "Parts", inStock: true, image: "https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?q=80&w=600&auto=format&fit=crop" },
  { id: 6, name: "Hydraulic Fluid (20L)", price: 150000, category: "Fluids", inStock: true, image: "https://images.unsplash.com/photo-1610491462702-4ecbe3d4d420?q=80&w=600&auto=format&fit=crop" },
];

export default function ShopPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [cart, setCart] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Business WhatsApp Number
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
    setIsCartOpen(true);
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
    <main className="min-h-screen bg-slate-50 dark:bg-[#09090b] pt-32 pb-24 px-4 sm:px-6 lg:px-8 transition-colors duration-500 relative overflow-hidden">
      
      {/* --- AMBIENT BACKGROUND GLOWS --- */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-orange-500/20 dark:bg-orange-600/10 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-blue-600/10 dark:bg-blue-600/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header & Cart Button */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight flex items-center justify-center md:justify-start gap-4 mb-4">
              <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-2xl">
                <Wrench className="w-8 h-8 text-orange-600 dark:text-orange-400" /> 
              </div>
              Spare Parts Shop
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">High-quality parts for your logistics and agricultural fleets.</p>
          </div>
          
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-gray-200 dark:border-gray-700 px-8 py-4 rounded-full font-bold text-gray-900 dark:text-white flex items-center gap-3 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
          >
            <ShoppingCart className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            View Cart
            <AnimatePresence>
              {totalItems > 0 && (
                <motion.span 
                  initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                  className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 to-red-500 text-white w-7 h-7 rounded-full flex items-center justify-center text-xs shadow-md"
                >
                  {totalItems}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Search & Filters */}
        <div className="bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl p-4 rounded-3xl shadow-sm border border-white/50 dark:border-gray-800/60 mb-10 flex flex-col lg:flex-row gap-4 justify-between items-center">
          <div className="relative w-full lg:w-[400px]">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search parts, oils, tires..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-6 py-4 rounded-2xl bg-white dark:bg-gray-950 border border-gray-200/50 dark:border-gray-800 outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white transition-all shadow-inner"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-hide">
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-3 rounded-xl font-bold text-sm whitespace-nowrap transition-all duration-300 ${
                  activeCategory === cat 
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20' 
                    : 'bg-white/50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 hover:shadow-sm'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProducts.map((product) => (
              <motion.div 
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-white/70 dark:bg-gray-900/50 backdrop-blur-xl border border-white/50 dark:border-gray-800/60 rounded-[2rem] overflow-hidden hover:shadow-2xl hover:shadow-orange-500/5 hover:-translate-y-1 transition-all duration-300 group flex flex-col"
              >
                <div className="relative h-56 bg-gray-100 dark:bg-gray-800 overflow-hidden">
                  {product.image ? (
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package className="w-16 h-16 text-gray-300 dark:text-gray-600 group-hover:scale-110 transition-transform duration-500" />
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="text-[10px] font-black uppercase tracking-widest text-white bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg">
                      {product.category}
                    </span>
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 leading-tight">{product.name}</h3>
                  <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500 mb-8 mt-auto">
                    TZS {product.price.toLocaleString()}
                  </p>
                  <button 
                    onClick={() => addToCart(product)}
                    className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold py-4 rounded-xl hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-5 h-5" /> Add to Cart
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Floating Cart Sidebar Modal */}
        <AnimatePresence>
          {isCartOpen && (
            <>
              {/* Backdrop */}
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setIsCartOpen(false)}
                className="fixed inset-0 bg-gray-900/60 z-40 backdrop-blur-sm"
              />
              
              {/* Sidebar */}
              <motion.div 
                initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 h-full w-full sm:w-[450px] bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl shadow-2xl z-50 flex flex-col border-l border-white/20 dark:border-gray-800/50"
              >
                <div className="p-8 border-b border-gray-200/50 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-gray-950/50">
                  <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white flex items-center gap-3">
                    <ShoppingCart className="w-7 h-7 text-blue-600 dark:text-blue-400" /> Your Cart
                  </h2>
                  <button onClick={() => setIsCartOpen(false)} className="p-2.5 bg-white dark:bg-gray-800 rounded-full shadow-sm hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-500 transition-colors border border-gray-100 dark:border-gray-700">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-8 space-y-6">
                  {cart.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-6">
                      <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-full">
                        <Package className="w-16 h-16 text-gray-300 dark:text-gray-600" />
                      </div>
                      <p className="font-medium text-lg">Your cart is empty.</p>
                    </div>
                  ) : (
                    cart.map(item => (
                      <div key={item.id} className="flex gap-5 items-center bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-900 shrink-0">
                          {item.image ? (
                             <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          ) : (
                             <Package className="w-full h-full p-4 text-gray-300" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-gray-900 dark:text-white text-sm leading-tight mb-1 truncate">{item.name}</h4>
                          <p className="text-blue-600 dark:text-blue-400 font-bold text-sm">TZS {(item.price * item.qty).toLocaleString()}</p>
                        </div>
                        <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-900 px-2 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700">
                          <button onClick={() => updateQty(item.id, -1)} className="text-gray-500 hover:text-gray-900 dark:hover:text-white"><Minus className="w-4 h-4" /></button>
                          <span className="font-bold w-4 text-center text-sm dark:text-white">{item.qty}</span>
                          <button onClick={() => updateQty(item.id, 1)} className="text-gray-500 hover:text-gray-900 dark:hover:text-white"><Plus className="w-4 h-4" /></button>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500 p-2 transition-colors"><X className="w-5 h-5" /></button>
                      </div>
                    ))
                  )}
                </div>

                {cart.length > 0 && (
                  <div className="p-8 bg-white dark:bg-gray-950 border-t border-gray-200/50 dark:border-gray-800 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)]">
                    <div className="flex justify-between items-end mb-6">
                      <span className="text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider text-sm">Total Amount</span>
                      <span className="text-3xl font-black text-gray-900 dark:text-white">TZS {cartTotal.toLocaleString()}</span>
                    </div>
                    <button 
                      onClick={handleCheckout}
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-green-500/30 hover:-translate-y-0.5 text-lg"
                    >
                      Order via WhatsApp <ArrowRight className="w-6 h-6" />
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