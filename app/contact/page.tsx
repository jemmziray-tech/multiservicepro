"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { supabase } from "../lib/supabase"; // <-- 1. We import our connection cable!

export default function ContactPage() {
  // 2. We create "state" to remember what the user is typing
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // To show a loading state

  // 3. The magic function that sends data to Supabase
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
    setIsSubmitting(true); // Turn on loading mode

    // Send the data to the 'contacts' table we just created in Supabase!
    const { error } = await supabase
      .from('contacts')
      .insert([
        { name: name, email: email, message: message }
      ]);

    if (error) {
      alert("Oops! Something went wrong. Please try again.");
      console.error(error);
    } else {
      alert("Success! Your message has been sent to MultiServicePro.");
      // Clear the form after sending
      setName("");
      setEmail("");
      setMessage("");
    }
    
    setIsSubmitting(false); // Turn off loading mode
  };

  return (
    <main className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-blue-900 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have a question about our Logistics, IT, or other services? Send us a message directly.
          </p>
        </div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white rounded-2xl shadow-lg overflow-hidden">
          
          {/* Left Side: The Contact Form */}
          <div className="p-8 md:p-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Send a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                <input 
                  type="text" 
                  required
                  value={name} // Connect to state
                  onChange={(e) => setName(e.target.value)} // Update state when typing
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 outline-none transition text-gray-900 bg-white"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 outline-none transition text-gray-900 bg-white"
                  placeholder="john@example.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea 
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 outline-none transition text-gray-900 bg-white"
                  placeholder="How can we help you today?"
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                disabled={isSubmitting} // Disable button while sending
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition flex justify-center items-center gap-2 disabled:bg-blue-400"
              >
                {isSubmitting ? "Sending..." : "Send Message"} <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Right Side: Contact Information */}
          <div className="bg-blue-900 text-white p-8 md:p-12 flex flex-col justify-center">
            <h2 className="text-2xl font-bold mb-8">Contact Information</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-blue-300 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg">Our Location</h3>
                  <p className="text-blue-100">Dar es Salaam, Tanzania</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-blue-300 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg">Phone Number</h3>
                  <p className="text-blue-100">+255 123 456 789</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-blue-300 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg">Email Address</h3>
                  <p className="text-blue-100">info@multiservicepro.co.tz</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}