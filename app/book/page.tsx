"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { 
  Truck, Monitor, Tractor, Wrench, Calendar, 
  Clock, User, Phone, ChevronRight, ChevronLeft, CheckCircle, Loader2 
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
      <div className="min-h-[80vh] flex items-center justify-center p-6 bg-white dark:bg-gray-950">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center space-y-6 max-w-md">
          <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-black text-gray-900 dark:text-white">Confirmed!</h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            We'll contact you at <span className="font-bold text-blue-600">{formData.phone}</span> for your {formData.service} appointment.
          </p>
          <button onClick={() => router.push('/')} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition shadow-lg">
            Return Home
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4 transition-colors duration-500">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-blue-900 dark:text-white mb-4">Book a Pro</h1>
            <div className="flex gap-2 justify-center">
                {[1, 2, 3].map((num) => (
                    <div key={num} className={`h-2 w-16 rounded-full transition-all duration-500 ${step >= num ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-800'}`} />
                ))}
            </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-gray-800 p-8 md:p-10 relative overflow-hidden min-h-[450px]">
          <AnimatePresence mode="wait" custom={direction}>
            
            {/* STEP 1 */}
            {step === 1 && (
              <motion.div key="step1" custom={direction} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.2 }} className="space-y-6">
                <h2 className="text-xl font-bold text-gray-400 uppercase tracking-widest text-center">Step 1: Service</h2>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { id: 'Logistics', icon: <Truck />, price: 150000, color: 'text-blue-600' },
                    { id: 'IT Services', icon: <Monitor />, price: 100000, color: 'text-purple-600' },
                    { id: 'Agriculture', icon: <Tractor />, price: 200000, color: 'text-green-600' },
                    { id: 'Garage', icon: <Wrench />, price: 80000, color: 'text-orange-600' }
                  ].map((item) => (
                    <button key={item.id} onClick={() => selectService(item.id, item.price)} className="flex justify-between items-center p-5 rounded-2xl border-2 border-transparent bg-gray-50 dark:bg-gray-800/50 hover:border-blue-600 transition-all group">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-xl bg-white dark:bg-gray-900 ${item.color}`}>{item.icon}</div>
                        <span className="font-bold text-gray-900 dark:text-white">{item.id}</span>
                      </div>
                      <span className="text-xs font-bold text-gray-400 group-hover:text-blue-600 tracking-tighter">TZS {item.price.toLocaleString()}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <motion.div key="step2" custom={direction} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.2 }} className="space-y-6">
                <h2 className="text-xl font-bold text-gray-400 uppercase tracking-widest text-center">Step 2: Timing</h2>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 ml-2 uppercase">Date</label>
                    <input type="date" required value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="w-full px-6 py-4 rounded-2xl border border-gray-100 dark:border-gray-800 dark:bg-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-600 font-medium" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 ml-2 uppercase">Time Slot</label>
                    <select value={formData.time} onChange={(e) => setFormData({...formData, time: e.target.value})} className="w-full px-6 py-4 rounded-2xl border border-gray-100 dark:border-gray-800 dark:bg-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-600 font-medium bg-white appearance-none">
                        <option value="">Select Time Slot</option>
                        <option value="Morning">Morning (08:00 - 12:00)</option>
                        <option value="Afternoon">Afternoon (13:00 - 17:00)</option>
                        <option value="Evening">Evening (18:00 - 21:00)</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-4 pt-4">
                  <button onClick={prevStep} className="flex-1 py-4 font-bold text-gray-400 flex items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-2xl transition"><ChevronLeft className="w-5 h-5" /> Back</button>
                  <button onClick={nextStep} disabled={!formData.date || !formData.time} className="flex-1 bg-blue-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 disabled:opacity-50">Next <ChevronRight className="w-5 h-5" /></button>
                </div>
              </motion.div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <motion.div key="step3" custom={direction} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.2 }} className="space-y-6">
                <h2 className="text-xl font-bold text-gray-400 uppercase tracking-widest text-center">Step 3: Contact</h2>
                <div className="space-y-4">
                  <input placeholder="Full Name" type="text" required value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} className="w-full px-6 py-4 rounded-2xl border border-gray-100 dark:border-gray-800 dark:bg-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-600 font-medium" />
                  <input placeholder="Phone (+255...)" type="tel" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full px-6 py-4 rounded-2xl border border-gray-100 dark:border-gray-800 dark:bg-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-600 font-medium" />
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-2xl border border-blue-100 dark:border-blue-800 flex justify-between items-center">
                    <div>
                        <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Estimated Total</p>
                        <p className="font-black text-xl text-blue-900 dark:text-white">TZS {formData.price.toLocaleString()}</p>
                    </div>
                    <div className="text-right text-xs text-gray-500">
                        <p className="font-bold text-blue-600">{formData.service}</p>
                        <p>{formData.date}</p>
                    </div>
                </div>
                <div className="flex gap-4 pt-4">
                  <button onClick={prevStep} className="flex-1 py-4 font-bold text-gray-400 flex items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-2xl transition"><ChevronLeft className="w-5 h-5" /> Back</button>
                  <button onClick={handleBooking} disabled={loading || !formData.phone || !formData.fullName} className="flex-1 bg-green-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-green-700 transition disabled:opacity-50 shadow-lg">
                    {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Confirm & Pay"}
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