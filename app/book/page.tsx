"use client";

import { useState, useEffect } from "react";
import { Calendar as CalendarIcon, Clock, Phone, User, CheckCircle, Loader2, Wrench } from "lucide-react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";

export default function BookAppointmentPage() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("IT Support");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [userId, setUserId] = useState<string | null>(null); // To hold the logged-in client's ID
  
  const router = useRouter();

  // 1. Check if the person booking is a logged-in client
  useEffect(() => {
    const checkCurrentUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id); // Save their ID so we can attach it to the booking!
      }
    };
    checkCurrentUser();
  }, []);

  // 2. Handle the Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Insert data into Supabase, attaching the user_id if they are logged in
    const { error } = await supabase.from('bookings').insert([
      {
        full_name: fullName,
        phone,
        service,
        preferred_date: preferredDate,
        preferred_time: preferredTime,
        status: 'Pending',
        user_id: userId // This is the magic link!
      }
    ]);

    setLoading(false);

    if (error) {
      alert("Something went wrong: " + error.message);
    } else {
      setSuccess(true);
      
      // If they are a logged-in client, send them straight to their dashboard after 2 seconds
      if (userId) {
        setTimeout(() => {
          router.push("/client-dashboard");
        }, 2000);
      }
    }
  };

  // 3. Success Screen
  if (success) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl max-w-md w-full text-center border border-gray-100">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Booking Confirmed!</h2>
          <p className="text-gray-600 mb-8">
            Thank you, {fullName}. Our team has received your request for {service}. We will contact you shortly.
          </p>
          <button 
            onClick={() => router.push("/")}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition w-full"
          >
            Return to Home
          </button>
        </div>
      </main>
    );
  }

  // 4. Booking Form
  return (
    <main className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          
          {/* Form Header */}
          <div className="bg-blue-900 p-8 md:p-10 text-white text-center">
            <Wrench className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <h1 className="text-3xl font-extrabold mb-2">Book a Service</h1>
            <p className="text-blue-200">
              {userId 
                ? "Fill out the details below to add a new request to your dashboard." 
                : "Need professional assistance? Schedule an appointment today."}
            </p>
          </div>

          {/* The Form */}
          <div className="p-8 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                    <input 
                      type="text" required value={fullName} onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 outline-none"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                    <input 
                      type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 outline-none"
                      placeholder="0700 000 000"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Service Required</label>
                <select 
                  value={service} onChange={(e) => setService(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 outline-none bg-white"
                >
                  <option value="IT Support">IT Support & Networking</option>
                  <option value="Logistics">Logistics & Transport</option>
                  <option value="Agriculture">Agriculture Supplies</option>
                  <option value="Garage">Garage & Spare Parts</option>
                  <option value="Fumigation">Fumigation Services</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date</label>
                  <div className="relative">
                    <CalendarIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                    <input 
                      type="date" required value={preferredDate} onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Time</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                    <input 
                      type="time" required value={preferredTime} onChange={(e) => setPreferredTime(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 outline-none"
                    />
                  </div>
                </div>
              </div>

              <button 
                type="submit" disabled={loading}
                className="w-full bg-blue-600 text-white px-6 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition shadow-md flex justify-center items-center gap-2"
              >
                {loading ? <Loader2 className="animate-spin w-6 h-6" /> : "Confirm Booking"}
              </button>
            </form>
          </div>

        </div>
      </div>
    </main>
  );
}