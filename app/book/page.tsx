"use client";

import { useState } from "react";
import { Calendar, Clock, User, Briefcase, Phone, MessageSquare } from "lucide-react";
import { supabase } from "../lib/supabase"; // Our database connection

export default function BookAppointmentPage() {
  // 1. Create state for all form fields
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 2. Function to save the booking to Supabase
  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { error } = await supabase
      .from('bookings')
      .insert([
        { 
          full_name: fullName, 
          phone: phone, 
          service: service, 
          preferred_date: date, 
          preferred_time: time, 
          notes: notes 
        }
      ]);

    if (error) {
      alert("Error saving booking. Please try again.");
      console.error(error);
    } else {
      alert("Success! Your appointment request has been received.");
      // Clear form
      setFullName("");
      setPhone("");
      setService("");
      setDate("");
      setTime("");
      setNotes("");
    }
    setIsSubmitting(false);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">

        <div className="bg-blue-600 p-8 text-center text-white">
          <h1 className="text-3xl font-extrabold mb-2">Book an Appointment</h1>
          <p className="text-blue-100">Schedule a service with our expert team today.</p>
        </div>

        <div className="p-8 md:p-12">
          <form onSubmit={handleBooking} className="space-y-6">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input 
                    type="text" required value={fullName} onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 outline-none transition text-gray-900 bg-white" placeholder="John Doe" 
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input 
                    type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 outline-none transition text-gray-900 bg-white" placeholder="+255 743 ..." 
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Service</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Briefcase className="h-5 w-5 text-gray-400" />
                </div>
                <select 
                  required value={service} onChange={(e) => setService(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 outline-none transition text-gray-900 bg-white appearance-none"
                >
                  <option value="" disabled>Choose a service...</option>
                  <option value="Logistics">Logistics & Transport</option>
                  <option value="Farmigation">Farmigation & Cleaning</option>
                  <option value="IT">IT & Tech Support</option>
                  <option value="Agriculture">Agriculture Solutions</option>
                  <option value="Garage">Garage & Spare Parts</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input type="date" required value={date} onChange={(e) => setDate(e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 outline-none transition text-gray-900 bg-white" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Time</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Clock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input type="time" required value={time} onChange={(e) => setTime(e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 outline-none transition text-gray-900 bg-white" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
              <div className="relative">
                <div className="absolute top-3 left-3 pointer-events-none">
                  <MessageSquare className="h-5 w-5 text-gray-400" />
                </div>
                <textarea rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 outline-none transition text-gray-900 bg-white" placeholder="Tell us more..."></textarea>
              </div>
            </div>

            <button 
              type="submit" disabled={isSubmitting}
              className="w-full bg-blue-600 text-white px-6 py-4 rounded-lg font-bold hover:bg-blue-700 transition flex justify-center items-center shadow-md text-lg disabled:bg-blue-400"
            >
              {isSubmitting ? "Processing..." : "Confirm Booking Request"}
            </button>

          </form>
        </div>
      </div>
    </main>
  );
}