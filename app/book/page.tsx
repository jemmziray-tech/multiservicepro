"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { 
  Truck, Monitor, Tractor, Wrench, ChevronRight, ChevronLeft, 
  CheckCircle, Loader2, Smartphone, CreditCard, Banknote, CheckCircle2, Leaf 
} from "lucide-react";
import { supabase } from "../lib/supabase";

export default function BookingWizard() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [direction, setDirection] = useState(0);
  const [mounted, setMounted] = useState(false);

  // --- FORM DATA STATE ---
  const [formData, setFormData] = useState({
    service: "",
    date: "",
    time: "",
    fullName: "",
    phone: "",
    price: 0
  });

  // Fix for Next.js Hydration (Ensures clean rendering)
  useEffect(() => {
    setMounted(true);
  }, []);

  const selectService = (name: string, price: number) => {
    setDirection(1);
    setFormData({ ...formData, service: name, price: price });
    setStep(2);
  };

  const nextStep = () => {
    setDirection(1);
    setStep((s) => s + 1);
  };

  const prevStep = () => {
    setDirection(-1);
    setStep((s) => s - 1);
  };

  const handleBooking = async () => {
    if (!formData.fullName || !formData.phone) return;
    setLoading(true);
    try {
      const { error } = await supabase.from('bookings').insert([
        { 
          full_name: formData.fullName, 
          phone: formData.phone, 
          service: formData.service,
          status: 'Pending' 
        }
      ]);

      if (error) throw error;
      setIsConfirmed(true);
    } catch (err: any) {
      alert("Booking Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const variants: Variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0
    }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({
      x: direction < 0 ? 50 : -50,
      opacity: 0
    })
  };

  if (!mounted) return null; // Prevents flickering on load

  if (isConfirmed) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-6 bg-slate-50 dark:bg-[#09090b] relative overflow-hidden transition-colors duration-500">
        <div className="absolute top-[20%] left-[20%] w-[500px] h-[500px] rounded-full bg-green-600/10 dark:bg-green-600/5 blur-[120px] pointer-events-none"></div>
        
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center space-y-6 max-w-md relative z-10 bg-white/70 dark:bg-gray-900/50 backdrop-blur-xl p-10 rounded-3xl border border-white/50 dark:border-gray-800/80 shadow-2xl">
          <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">Confirmed!</h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
            We'll contact you at <span className="font-bold text-blue-600 dark:text-blue-400">{formData.phone}</span> for your {formData.service} appointment.
          </p>
          <button onClick={() => router.push('/')} className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-2xl font-bold hover:from-blue-500 hover:to-indigo-500 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
            Return Home
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#09090b] py-16 px-4 transition-colors duration-500 relative overflow-hidden">
      
      {/* --- AMBIENT BACKGROUND GLOWS --- */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-600/20 dark:bg-blue-600/10 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-purple-600/10 dark:bg-purple-600/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-2xl mx-auto relative z-10">
        <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-6">Book a Pro</h1>
            <div className="flex gap-3 justify-center">
                {[1, 2, 3].map((num) => (
                    <div key={num} className={`h-2.5 w-20 rounded-full transition-all duration-500 ${step >= num ? 'bg-blue-600 shadow-sm shadow-blue-500/50' : 'bg-gray-200 dark:bg-gray-800'}`} />
                ))}
            </div>
        </div>

        <div className="bg-white/70 dark:bg-gray-900/60 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border border-white/50 dark:border-gray-800/80 p-8 md:p-12 relative overflow-hidden min-h-[500px]">
          <AnimatePresence mode="wait" custom={direction}>
            
            {/* STEP 1: Service */}
            {step === 1 && (
              <motion.div key="step1" custom={direction} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.2 }} className="space-y-8">
                <h2 className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest text-center">Step 1: Choose Service</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { id: 'Logistics', icon: <Truck />, price: 150000, color: 'text-blue-600' },
                    { id: 'IT Services', icon: <Monitor />, price: 100000, color: 'text-purple-600' },
                    { id: 'Agriculture', icon: <Tractor />, price: 200000, color: 'text-green-600' },
                    { id: 'Farmigation', icon: <Leaf />, price: 180000, color: 'text-emerald-500' },
                    { id: 'Garage', icon: <Wrench />, price: 80000, color: 'text-orange-600' }
                  ].map((item) => (
                    <button key={item.id} onClick={() => selectService(item.id, item.price)} className="flex flex-col items-center justify-center gap-3 p-6 rounded-3xl border border-white/60 dark:border-gray-700 bg-white/50 dark:bg-gray-800/40 hover:bg-white dark:hover:bg-gray-800 hover:border-blue-500/50 hover:shadow-xl hover:-translate-y-1 transition-all group">
                      <div className={`p-4 rounded-2xl bg-white dark:bg-gray-900 shadow-sm ${item.color} group-hover:scale-110 transition-transform`}>
                        {item.icon}
                      </div>
                      <div className="text-center">
                        <span className="font-bold text-gray-900 dark:text-white block mb-1">{item.id}</span>
                        <span className="text-xs font-bold text-gray-500 dark:text-gray-400 tracking-tight">TZS {item.price.toLocaleString()}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 2: Timing */}
            {step === 2 && (
              <motion.div key="step2" custom={direction} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.2 }} className="space-y-8">
                <h2 className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest text-center">Step 2: Schedule Timing</h2>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400 ml-2 uppercase tracking-wide">Date</label>
                    <input type="date" required value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="w-full px-6 py-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-950/50 dark:text-white outline-none focus:ring-2 focus:ring-blue-600 font-medium transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400 ml-2 uppercase tracking-wide">Time Slot</label>
                    <select value={formData.time} onChange={(e) => setFormData({...formData, time: e.target.value})} className="w-full px-6 py-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-950/50 dark:text-white outline-none focus:ring-2 focus:ring-blue-600 font-medium appearance-none transition-all">
                        <option value="">Select Time Slot</option>
                        <option value="Morning">Morning (08:00 - 12:00)</option>
                        <option value="Afternoon">Afternoon (13:00 - 17:00)</option>
                        <option value="Evening">Evening (18:00 - 21:00)</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-4 pt-6">
                  <button onClick={prevStep} className="flex-1 py-4 font-bold text-gray-500 dark:text-gray-400 flex items-center justify-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-2xl transition-all"><ChevronLeft className="w-5 h-5" /> Back</button>
                  <button onClick={nextStep} disabled={!formData.date || !formData.time} className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 disabled:opacity-50 hover:shadow-lg hover:-translate-y-0.5 transition-all">Next <ChevronRight className="w-5 h-5" /></button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Contact & Payment */}
            {step === 3 && (
              <motion.div key="step3" custom={direction} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.2 }} className="space-y-8">
                <h2 className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest text-center">Step 3: Contact & Confirm</h2>
                
                {/* Contact Inputs */}
                <div className="space-y-4">
                  <input placeholder="Full Name" type="text" required value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} className="w-full px-6 py-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-950/50 dark:text-white outline-none focus:ring-2 focus:ring-blue-600 font-medium transition-all" />
                  <input placeholder="Phone (+255...)" type="tel" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full px-6 py-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-950/50 dark:text-white outline-none focus:ring-2 focus:ring-blue-600 font-medium transition-all" />
                </div>

                {/* Booking Summary */}
                <div className="bg-blue-50/80 dark:bg-blue-900/20 backdrop-blur-sm p-6 rounded-3xl border border-blue-100 dark:border-blue-800/50 flex justify-between items-center">
                    <div>
                        <p className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-1">Estimated Total</p>
                        <p className="font-black text-2xl text-blue-900 dark:text-white">TZS {formData.price.toLocaleString()}</p>
                    </div>
                    <div className="text-right text-sm text-gray-600 dark:text-gray-400">
                        <p className="font-bold text-gray-900 dark:text-white">{formData.service}</p>
                        <p>{formData.date}</p>
                    </div>
                </div>

                {/* THE NEW PAYMENT UI */}
                <div className="space-y-3 pt-2">
                  <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest ml-2">Payment Method</h3>
                  
                  {/* Active: Pay in Person */}
                  <div className="relative border-2 border-blue-500 bg-blue-50/50 dark:bg-blue-900/20 rounded-2xl p-4 flex items-center justify-between cursor-pointer transition-all shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className="bg-white dark:bg-gray-900 p-2.5 rounded-xl text-blue-600 dark:text-blue-400 shadow-sm">
                        <Banknote className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 dark:text-white text-sm">Pay via WhatsApp / Office</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Pay after confirming details</p>
                      </div>
                    </div>
                    <CheckCircle2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>

                  {/* Disabled: Mobile Money */}
                  <div className="relative border border-gray-200 dark:border-gray-800 bg-white/30 dark:bg-gray-900/30 rounded-2xl p-4 flex items-center justify-between opacity-60 cursor-not-allowed">
                    <div className="flex items-center gap-4">
                      <div className="bg-gray-100 dark:bg-gray-800 p-2.5 rounded-xl text-gray-500 dark:text-gray-400">
                        <Smartphone className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-700 dark:text-gray-300 text-sm">Mobile Money</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">M-Pesa, Tigo Pesa, Airtel</p>
                      </div>
                    </div>
                    <span className="bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border border-orange-200 dark:border-orange-800/50">
                      Coming Soon
                    </span>
                  </div>
                </div>

                <div className="flex gap-4 pt-6">
                  <button onClick={prevStep} className="flex-1 py-4 font-bold text-gray-500 dark:text-gray-400 flex items-center justify-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-2xl transition-all"><ChevronLeft className="w-5 h-5" /> Back</button>
                  <button onClick={handleBooking} disabled={loading || !formData.phone || !formData.fullName} className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-green-500/20 hover:-translate-y-0.5 transition-all disabled:opacity-50">
                    {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Confirm Booking"}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}