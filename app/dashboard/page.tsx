"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Users, DollarSign, CalendarCheck, Activity, 
  ArrowUpRight, Loader2, LogOut, RefreshCw, CheckCircle 
} from "lucide-react";
import { supabase } from "../lib/supabase";

export default function DashboardPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [updatingId, setUpdatingId] = useState<number | null>(null); // Tracks which row is loading
  const router = useRouter();

  useEffect(() => {
    const checkUserAndFetchData = async () => {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }
      setUser(user);
      await fetchBookings();
    };
    checkUserAndFetchData();
  }, [router]);

  const fetchBookings = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setBookings(data);
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  // NEW: Function to update the status in the database!
  const handleStatusChange = async (bookingId: number, newStatus: string) => {
    setUpdatingId(bookingId); // Show a loading spinner on this specific row
    
    const { error } = await supabase
      .from('bookings')
      .update({ status: newStatus })
      .eq('id', bookingId);

    if (error) {
      alert("Failed to update status: " + error.message);
    } else {
      // If successful, update our local screen immediately so we don't have to refresh
      setBookings(bookings.map(b => b.id === bookingId ? { ...b, status: newStatus } : b));
    }
    
    setUpdatingId(null); // Turn off the spinner
  };

  // Helper function to color-code statuses
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'In Progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Approved': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-yellow-100 text-yellow-800 border-yellow-200'; // Pending
    }
  };

  if (loading && !user) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-12 h-12 animate-spin text-blue-600" /></div>;

  return (
    <main className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Dashboard Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mt-6">
          <div>
            <h1 className="text-3xl font-extrabold text-blue-900">Management Dashboard</h1>
            <p className="text-gray-500 mt-1">Logged in as: <span className="text-blue-600 font-medium">{user?.email}</span></p>
          </div>
          <div className="flex gap-3">
            <button onClick={fetchBookings} className="bg-gray-100 text-gray-700 px-4 py-2.5 rounded-lg font-bold hover:bg-gray-200 transition flex items-center gap-2">
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
            </button>
            <button onClick={handleLogout} className="bg-red-50 text-red-600 px-4 py-2.5 rounded-lg font-bold hover:bg-red-600 hover:text-white transition flex items-center gap-2">
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>

        {/* High-Level Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200"><h3 className="text-gray-500 text-sm font-medium">Monthly Revenue</h3><p className="text-2xl font-bold text-gray-900 mt-1">TZS 4,500,000</p></div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200"><h3 className="text-gray-500 text-sm font-medium">Total Bookings</h3><p className="text-2xl font-bold text-gray-900 mt-1">{bookings.length} Requests</p></div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200"><h3 className="text-gray-500 text-sm font-medium">Total Clients</h3><p className="text-2xl font-bold text-gray-900 mt-1">156</p></div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200"><h3 className="text-gray-500 text-sm font-medium">Website Visitors</h3><p className="text-2xl font-bold text-gray-900 mt-1">1,204</p></div>
        </div>

        {/* LIVE Bookings Table with Interactive Statuses */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">Recent Service Requests</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-sm uppercase tracking-wider">
                  <th className="p-4 font-medium">Client Name</th>
                  <th className="p-4 font-medium">Service</th>
                  <th className="p-4 font-medium">Date / Time</th>
                  <th className="p-4 font-medium">Phone</th>
                  <th className="p-4 font-medium">Manage Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-gray-700 font-medium">
                {bookings.length === 0 && !loading ? (
                  <tr><td colSpan={5} className="p-8 text-center text-gray-400">No bookings found.</td></tr>
                ) : (
                  bookings.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition">
                      <td className="p-4">{item.full_name}</td>
                      <td className="p-4 text-blue-600">{item.service}</td>
                      <td className="p-4 text-sm">{item.preferred_date} at {item.preferred_time}</td>
                      <td className="p-4 text-sm">{item.phone}</td>
                      <td className="p-4 flex items-center gap-2">
                        
                        {/* INTERACTIVE STATUS DROPDOWN */}
                        <select
                          value={item.status || 'Pending'}
                          onChange={(e) => handleStatusChange(item.id, e.target.value)}
                          disabled={updatingId === item.id}
                          className={`appearance-none outline-none border px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider cursor-pointer transition ${getStatusColor(item.status || 'Pending')}`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Approved">Approved</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                        </select>
                        
                        {/* Show a spinner next to the dropdown if this specific row is updating */}
                        {updatingId === item.id && <Loader2 className="w-4 h-4 animate-spin text-gray-400" />}
                        
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </main>
  );
}