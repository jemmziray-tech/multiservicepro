"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle } from "lucide-react";
import { supabase } from "../lib/supabase";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("General Inquiry");
  const [message, setMessage] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from('contact_messages').insert([
      { name, email, phone, service_interest: service, message }
    ]);

    setLoading(false);

    if (error) {
      alert("Failed to send message: " + error.message);
    } else {
      setSuccess(true);
      // Clear the form
      setName(""); setEmail(""); setPhone(""); setMessage("");
      setTimeout(() => setSuccess(false), 5000);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#09090b] py-24 px-4 relative overflow-hidden transition-colors duration-500">
      
      {/* --- AMBIENT BACKGROUND GLOWS --- */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-600/20 dark:bg-blue-600/10 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-green-600/10 dark:bg-green-600/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
        
        {/* Left Side: Contact Info */}
        <div className="space-y-10 lg:pr-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">Get in Touch</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-6 text-lg leading-relaxed">
              Have a question about our Logistics, IT, Agriculture, or Garage services? Send us a message and our team will get back to you immediately.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-5 bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl p-6 rounded-2xl shadow-sm border border-white/40 dark:border-gray-800/60 hover:-translate-y-1 transition-transform">
              <div className="bg-blue-100 dark:bg-blue-900/50 p-4 rounded-full text-blue-600 dark:text-blue-400"><MapPin className="w-6 h-6" /></div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white text-lg">Head Office</h3>
                <p className="text-gray-600 dark:text-gray-400 mt-1">Dar es Salaam, Tanzania</p>
              </div>
            </div>
            
            <div className="flex items-center gap-5 bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl p-6 rounded-2xl shadow-sm border border-white/40 dark:border-gray-800/60 hover:-translate-y-1 transition-transform">
              <div className="bg-green-100 dark:bg-green-900/50 p-4 rounded-full text-green-600 dark:text-green-400"><Phone className="w-6 h-6" /></div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white text-lg">Call Us</h3>
                <p className="text-gray-600 dark:text-gray-400 mt-1">+255 123 456 789</p>
              </div>
            </div>

            <div className="flex items-center gap-5 bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl p-6 rounded-2xl shadow-sm border border-white/40 dark:border-gray-800/60 hover:-translate-y-1 transition-transform">
              <div className="bg-purple-100 dark:bg-purple-900/50 p-4 rounded-full text-purple-600 dark:text-purple-400"><Mail className="w-6 h-6" /></div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white text-lg">Email Us</h3>
                <p className="text-gray-600 dark:text-gray-400 mt-1">info@multiservicepro.co.tz</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: The Smart Form */}
        <div className="bg-white/70 dark:bg-gray-900/50 backdrop-blur-2xl p-8 md:p-10 rounded-3xl shadow-xl border border-white/50 dark:border-gray-800/80">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Send a Message</h2>
          
          {success ? (
            <div className="bg-green-50/80 dark:bg-green-900/20 backdrop-blur-md border border-green-200 dark:border-green-800/50 text-green-800 dark:text-green-400 p-8 rounded-2xl text-center space-y-4 my-10">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
              <p className="font-bold text-xl">Message Sent Successfully!</p>
              <p className="text-base opacity-90">We will be in touch shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Your Name</label>
                  <input type="text" required value={name} onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 dark:text-white bg-white/50 dark:bg-gray-950/50 transition-all placeholder-gray-400" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                  <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 dark:text-white bg-white/50 dark:bg-gray-950/50 transition-all placeholder-gray-400" placeholder="john@example.com" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Phone Number</label>
                  <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 dark:text-white bg-white/50 dark:bg-gray-950/50 transition-all placeholder-gray-400" placeholder="Optional" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Interested In</label>
                  <select value={service} onChange={(e) => setService(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 dark:text-white bg-white/50 dark:bg-gray-950/50 transition-all appearance-none">
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Logistics">Logistics</option>
                    <option value="IT Services">IT Services</option>
                    <option value="Agriculture">Agriculture</option>
                    <option value="Farmigation & Cleaning">Farmigation & Cleaning</option>
                    <option value="Garage">Garage</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Your Message</label>
                <textarea required value={message} onChange={(e) => setMessage(e.target.value)} rows={5}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 dark:text-white bg-white/50 dark:bg-gray-950/50 transition-all resize-none placeholder-gray-400" placeholder="How can we help you?"></textarea>
              </div>

              <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-4 rounded-xl font-bold hover:from-blue-500 hover:to-indigo-500 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex justify-center items-center gap-2 mt-6">
                {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <><Send className="w-5 h-5" /> Send Message</>}
              </button>
            </form>
          )}
        </div>

      </div>
    </main>
  );
}