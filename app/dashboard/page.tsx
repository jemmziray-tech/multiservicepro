"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  Users, DollarSign, CalendarCheck, MessageSquare, 
  Loader2, LogOut, RefreshCw, Mail, Check
} from "lucide-react";
import { supabase } from "../lib/supabase";

export default function DashboardPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]); // NEW: State for messages
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [updatingId, setUpdatingId] = useState<number | null>(null);
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
      await refreshData();
    };
    checkUserAndFetchData();
  }, [router]);

  // UPGRADED: Now fetches BOTH bookings and messages at the same time
  const refreshData = async () => {
    setLoading(true);
    
    // Fetch Bookings
    const { data: bData } = await supabase.from('bookings').select('*').order('created_at', { ascending: false });
    if (bData) setBookings(bData);

    // Fetch Messages
    const { data: mData } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false });
    if (mData) setMessages(mData);

    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  // Update Booking Status
  const handleStatusChange = async (bookingId: number, newStatus: string) => {
    setUpdatingId(bookingId);
    const { error } = await supabase.from('bookings').update({ status: newStatus }).eq('id', bookingId);
    if (error) alert("Failed to update status: " + error.message);
    else setBookings(bookings.map(b => b.id === bookingId ? { ...b, status: newStatus } : b));
    setUpdatingId(null);
  };

  // NEW: Update Message Status (Mark as Read)
  const markMessageRead = async (messageId: number) => {
    setUpdatingId(messageId);
    const { error } = await supabase.from('contact_messages').update({ status: 'Read' }).eq('id', messageId);
    if (error) alert("Error: " + error.message);
    else setMessages(messages.map(m => m.id === messageId ? { ...m, status: 'Read' } : m));
    setUpdatingId(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'In Progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Approved': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  if (loading && !user) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-12 h-12 animate-spin text-blue-600" /></div>;

  // 🧮 LIVE DASHBOARD MATH
  const totalBookings = bookings.length;
  const uniqueClientsCount = new Set(bookings.map(b => b.phone)).size;
  const completedJobsCount = bookings.filter(b => b.status === 'Completed').length;
  const estimatedRevenue = completedJobsCount * 150000;
  const formattedRevenue = new Intl.NumberFormat('en-TZ').format(estimatedRevenue);
  
  // NEW MATH: Count how many messages say "New"
  const unreadMessagesCount = messages.filter(m => m.status === 'New').length;

  return (
    <main className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Dashboard Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mt-6">
          <div>
            <h1 className="text-3xl font-extrabold text-blue-900">Management Dashboard</h1>
            <p className="text-gray-500 mt-1">Logged in as: <span className="text-blue-600 font-medium">{user?.email}</span></p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <Link href="/marketing" className="bg-orange-50 text-orange-600 px-4 py-2.5 rounded-lg font-bold hover:bg-orange-600 hover:text-white transition flex items-center gap-2">
              Go to Marketing Admin &rarr;
            </Link>
            <button onClick={refreshData} className="bg-gray-100 text-gray-700 px-4 py-2.5 rounded-lg font-bold hover:bg-gray-200 transition flex items-center gap-2">
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
            </button>
            <button onClick={handleLogout} className="bg-red-50 text-red-600 px-4 py-2.5 rounded-lg font-bold hover:bg-red-600 hover:text-white transition flex items-center gap-2">
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>

        {/* High-Level Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <h3 className="text-gray-500 text-sm font-medium">Earned Revenue</h3>
            <p className="text-2xl font-bold text-green-600 mt-1">TZS {formattedRevenue}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <h3 className="text-gray-500 text-sm font-medium">Total Bookings</h3>
            <p className="text-2xl font-bold text-gray-900 mt-1">{totalBookings} Requests</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <h3 className="text-gray-500 text-sm font-medium">Unique Clients</h3>
            <p className="text-2xl font-bold text-gray-900 mt-1">{uniqueClientsCount}</p>
          </div>
          <div className={`bg-white p-6 rounded-2xl shadow-sm border ${unreadMessagesCount > 0 ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}>
            <h3 className="text-gray-500 text-sm font-medium">Unread Messages</h3>
            <p className={`text-2xl font-bold mt-1 ${unreadMessagesCount > 0 ? 'text-red-600' : 'text-gray-900'}`}>
              {unreadMessagesCount} {unreadMessagesCount === 1 ? 'Message' : 'Messages'}
            </p>
          </div>
        </div>

        {/* The Two Main Tables Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* LEFT: Bookings Table (Slightly more compact) */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <CalendarCheck className="text-blue-600 w-5 h-5" /> Recent Bookings
              </h2>
            </div>
            <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
              <table className="w-full text-left border-collapse">
                <thead className="sticky top-0 bg-white shadow-sm">
                  <tr className="bg-white text-gray-500 text-xs uppercase tracking-wider">
                    <th className="p-4 font-medium">Client</th>
                    <th className="p-4 font-medium">Service</th>
                    <th className="p-4 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-700 text-sm">
                  {bookings.length === 0 ? (
                    <tr><td colSpan={3} className="p-8 text-center text-gray-400">No bookings yet.</td></tr>
                  ) : (
                    bookings.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50 transition">
                        <td className="p-4">
                          <p className="font-bold text-gray-900">{item.full_name}</p>
                          <p className="text-xs text-gray-500">{item.phone}</p>
                          <p className="text-xs text-gray-400">{item.preferred_date}</p>
                        </td>
                        <td className="p-4 font-medium text-blue-600">{item.service}</td>
                        <td className="p-4">
                          <select
                            value={item.status || 'Pending'}
                            onChange={(e) => handleStatusChange(item.id, e.target.value)}
                            disabled={updatingId === item.id}
                            className={`appearance-none outline-none border px-2 py-1 rounded-full text-xs font-bold uppercase cursor-pointer ${getStatusColor(item.status || 'Pending')}`}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Approved">Approved</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* RIGHT: Client Inbox */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <MessageSquare className="text-orange-500 w-5 h-5" /> Client Inbox
              </h2>
            </div>
            
            <div className="p-4 space-y-4 max-h-[500px] overflow-y-auto bg-gray-50">
              {messages.length === 0 ? (
                <div className="text-center p-8 text-gray-400">No messages found.</div>
              ) : (
                messages.map((msg) => (
                  <div key={msg.id} className={`bg-white p-5 rounded-xl border shadow-sm transition-all ${msg.status === 'New' ? 'border-blue-300 border-l-4 border-l-blue-600' : 'border-gray-200 opacity-75'}`}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-gray-900 flex items-center gap-2">
                          {msg.name} {msg.status === 'New' && <span className="bg-blue-100 text-blue-700 text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider">New</span>}
                        </h3>
                        <p className="text-xs text-gray-500 flex items-center gap-1 mt-1"><Mail className="w-3 h-3" /> {msg.email} • {msg.phone || 'No phone'}</p>
                      </div>
                      
                      {/* Action Button: Mark as Read */}
                      {msg.status === 'New' ? (
                        <button 
                          onClick={() => markMessageRead(msg.id)}
                          disabled={updatingId === msg.id}
                          className="bg-gray-100 hover:bg-green-100 text-gray-600 hover:text-green-700 p-2 rounded-full transition"
                          title="Mark as Read"
                        >
                          {updatingId === msg.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                        </button>
                      ) : (
                        <span className="text-xs font-bold text-gray-400 uppercase">Read</span>
                      )}
                    </div>
                    
                    <div className="mt-3 bg-gray-50 p-3 rounded-lg border border-gray-100">
                      <p className="text-xs font-bold text-gray-400 uppercase mb-1 border-b pb-1">Interest: <span className="text-gray-700">{msg.service_interest}</span></p>
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">{msg.message}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

      </div>
    </main>
  );
}