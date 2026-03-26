"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Package, 
  Calendar, 
  Clock, 
  LogOut, 
  PlusCircle, 
  Loader2,
  Wrench
} from "lucide-react";
import Link from "next/link";
import { supabase } from "../lib/supabase";

export default function ClientDashboardPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchClientData = async () => {
      setLoading(true);
      
      // 1. Check if client is logged in
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        // Not logged in? Kick back to client login
        router.push("/client-login");
        return;
      }

      setUser(user);

      // 2. Fetch ONLY this specific client's bookings using .eq('user_id', user.id)
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('user_id', user.id) // CRITICAL SECURITY STEP
        .order('created_at', { ascending: false });

      if (!error && data) {
        setBookings(data);
      }
      setLoading(false);
    };

    fetchClientData();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/client-login");
  };

  if (loading && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200 mt-6">
          <div>
            <h1 className="text-3xl font-extrabold text-blue-900">My Services</h1>
            <p className="text-gray-500 mt-1">Welcome back, <span className="text-blue-600 font-medium">{user?.email}</span></p>
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <Link 
              href="/book"
              className="flex-1 sm:flex-none bg-blue-600 text-white px-5 py-2.5 rounded-lg font-bold hover:bg-blue-700 transition shadow-md flex items-center justify-center gap-2"
            >
              <PlusCircle className="w-5 h-5" /> New Request
            </Link>
            <button 
              onClick={handleLogout}
              className="bg-gray-100 text-gray-700 px-4 py-2.5 rounded-lg font-bold hover:bg-gray-200 transition flex items-center justify-center gap-2"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Booking History */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Package className="text-blue-600 w-6 h-6" /> Request History
          </h2>

          {loading ? (
             <div className="flex justify-center p-8"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>
          ) : bookings.length === 0 ? (
            
            // Empty State (When they haven't booked anything yet)
            <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-gray-300">
              <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wrench className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">No services requested yet</h3>
              <p className="text-gray-500 mt-2 max-w-sm mx-auto mb-6">
                Need IT support, agricultural supplies, or logistics transport? Book your first service today.
              </p>
              <Link href="/book" className="text-blue-600 font-bold hover:underline">
                Click here to book a service &rarr;
              </Link>
            </div>

          ) : (
            
            // List of their actual bookings
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bookings.map((booking) => (
                <div key={booking.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-lg text-gray-900">{booking.service}</h3>
                    <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                      {booking.status || 'Pending'}
                    </span>
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      Date: <span className="font-medium text-gray-900">{booking.preferred_date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      Time: <span className="font-medium text-gray-900">{booking.preferred_time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </main>
  );
}