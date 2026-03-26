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
    <main className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Left Side: Contact Info */}
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-extrabold text-blue-900">Get in Touch</h1>
            <p className="text-gray-600 mt-4 text-lg">
              Have a question about our Logistics, IT, Agriculture, or Garage services? Send us a message and our team will get back to you immediately.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <div className="bg-blue-100 p-3 rounded-full text-blue-600"><MapPin className="w-6 h-6" /></div>
              <div>
                <h3 className="font-bold text-gray-900">Head Office</h3>
                <p className="text-gray-600">Dar es Salaam, Tanzania</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <div className="bg-green-100 p-3 rounded-full text-green-600"><Phone className="w-6 h-6" /></div>
              <div>
                <h3 className="font-bold text-gray-900">Call Us</h3>
                <p className="text-gray-600">+255 123 456 789</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <div className="bg-orange-100 p-3 rounded-full text-orange-600"><Mail className="w-6 h-6" /></div>
              <div>
                <h3 className="font-bold text-gray-900">Email Us</h3>
                <p className="text-gray-600">info@multiservicepro.co.tz</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: The Smart Form */}
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Send a Message</h2>
          
          {success ? (
            <div className="bg-green-50 border border-green-200 text-green-800 p-6 rounded-xl text-center space-y-3">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
              <p className="font-bold text-lg">Message Sent Successfully!</p>
              <p className="text-sm">We will be in touch shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                  <input type="text" required value={name} onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 outline-none text-gray-900 bg-white" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 outline-none text-gray-900 bg-white" placeholder="john@example.com" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 outline-none text-gray-900 bg-white" placeholder="Optional" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Interested In</label>
                  <select value={service} onChange={(e) => setService(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 outline-none text-gray-900 bg-white">
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Logistics">Logistics</option>
                    <option value="IT Services">IT Services</option>
                    <option value="Agriculture">Agriculture</option>
                    <option value="Garage">Garage</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
                <textarea required value={message} onChange={(e) => setMessage(e.target.value)} rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 outline-none text-gray-900 bg-white resize-none" placeholder="How can we help you?"></textarea>
              </div>

              <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white px-6 py-4 rounded-lg font-bold hover:bg-blue-700 transition flex justify-center items-center gap-2">
                {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <><Send className="w-5 h-5" /> Send Message</>}
              </button>
            </form>
          )}
        </div>

      </div>
    </main>
  );
}