"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion"; // For smooth animations
import { 
  Users, DollarSign, CalendarCheck, MessageSquare, 
  Loader2, LogOut, RefreshCw, Mail, Check, Reply 
} from "lucide-react";
import { supabase } from "../lib/supabase";

export default function DashboardPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const router = useRouter();

  // --- Animation Settings ---
  const containerVars = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVars = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.4 } }
  };

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

  const refreshData = async () => {
    setLoading(true);
    const { data: bData } = await supabase.from('bookings').select('*').order('created_at', { ascending: false });
    if (bData) setBookings(bData);
    const { data: mData } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false });
    if (mData) setMessages(mData);
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const handleStatusChange = async (bookingId: number, newStatus: string) => {
    setUpdatingId(bookingId);
    const { error } = await supabase.from('bookings').update({ status: newStatus }).eq('id', bookingId);
    if (error) alert("Error: " + error.message);
    else setBookings(bookings.map(b => b.id === bookingId ? { ...b, status: newStatus } : b));
    setUpdatingId(null);
  };

  const markMessageRead = async (messageId: number) => {
    setUpdatingId(messageId);
    const { error } = await supabase.from('contact_messages').update({ status: 'Read' }).eq('id', messageId);
    if (error) alert("Error: " + error.message);
    else setMessages(messages.map(m => m.id === messageId ? { ...m, status: 'Read' } : m));
    setUpdatingId(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800';
      case 'Approved': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 border-purple-200 dark:border-purple-800';
      default: return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800';
    }
  };

  if (loading && !user) return <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950"><Loader2 className="w-12 h-12 animate-spin text-blue-600" /></div>;

  const totalBookings = bookings.length;
  const uniqueClientsCount = new Set(bookings.map(b => b.phone)).size;
  const completedJobsCount = bookings.filter(b => b.status === 'Completed').length;
  const estimatedRevenue = completedJobsCount * 150000;
  const formattedRevenue = new Intl.NumberFormat('en-TZ').format(estimatedRevenue);
  const unreadMessagesCount = messages.filter(m => m.status === 'New').length;

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-950 p-4 sm:p-6 lg:p-8 transition-colors duration-500">
      <motion.div 
        className="max-w-7xl mx-auto space-y-8"
        initial="hidden"
        animate="visible"
        variants={containerVars}
      >
        
        {/* Header */}
        <motion.div variants={itemVars} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800">
          <div>
            <h1 className="text-3xl font-extrabold text-blue-900 dark:text-white">Management Dashboard</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Logged in as: <span className="text-blue-600 dark:text-blue-400 font-medium">{user?.email}</span></p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/marketing" className="bg-orange-50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400 px-4 py-2.5 rounded-lg font-bold hover:bg-orange-600 hover:text-white transition-all flex items-center gap-2">
              Marketing Admin &rarr;
            </Link>
            <button onClick={refreshData} className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-4 py-2.5 rounded-lg font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition flex items-center gap-2 shadow-sm">
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
            </button>
            <button onClick={handleLogout} className="bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 px-4 py-2.5 rounded-lg font-bold hover:bg-red-600 hover:text-white transition flex items-center gap-2 shadow-sm">
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: "Earned Revenue", val: `TZS ${formattedRevenue}`, color: "text-green-600 dark:text-green-400" },
            { label: "Total Bookings", val: totalBookings, color: "text-gray-900 dark:text-white" },
            { label: "Unique Clients", val: uniqueClientsCount, color: "text-gray-900 dark:text-white" },
            { 
              label: "Unread Messages", 
              val: unreadMessagesCount, 
              color: unreadMessagesCount > 0 ? "text-red-600 dark:text-red-400" : "text-gray-900 dark:text-white",
              special: unreadMessagesCount > 0 ? "border-red-300 bg-red-50 dark:bg-red-950/20 dark:border-red-900/50" : ""
            }
          ].map((stat, i) => (
            <motion.div 
              key={i} 
              variants={itemVars}
              whileHover={{ scale: 1.03, y: -5 }}
              className={`bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 ${stat.special}`}
            >
              <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">{stat.label}</h3>
              <p className={`text-2xl font-bold mt-1 ${stat.color}`}>{stat.val}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Recent Bookings Section */}
          <motion.div variants={itemVars} className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <CalendarCheck className="text-blue-600 dark:text-blue-400 w-5 h-5" /> Recent Bookings
              </h2>
            </div>
            <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
              <table className="w-full text-left border-collapse">
                <thead className="sticky top-0 bg-white dark:bg-gray-900 shadow-sm">
                  <tr className="text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">
                    <th className="p-4 font-medium">Client</th>
                    <th className="p-4 font-medium">Service</th>
                    <th className="p-4 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-gray-700 dark:text-gray-300 text-sm">
                  {bookings.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                      <td className="p-4">
                        <p className="font-bold text-gray-900 dark:text-white">{item.full_name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{item.phone}</p>
                      </td>
                      <td className="p-4 font-medium text-blue-600 dark:text-blue-400">{item.service}</td>
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
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Client Inbox Section */}
          <motion.div variants={itemVars} className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <MessageSquare className="text-orange-500 dark:text-orange-400 w-5 h-5" /> Client Inbox
              </h2>
            </div>
            
            <div className="p-4 space-y-4 max-h-[500px] overflow-y-auto bg-gray-50 dark:bg-gray-950/50">
              <AnimatePresence>
                {messages.map((msg) => (
                  <motion.div 
                    key={msg.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className={`p-5 rounded-xl border shadow-sm transition-all ${msg.status === 'New' ? 'bg-white dark:bg-gray-900 border-blue-300 dark:border-blue-900 border-l-4 border-l-blue-600' : 'bg-gray-50/50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-800 opacity-75'}`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                          {msg.name} {msg.status === 'New' && <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">New</span>}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-1"><Mail className="w-3 h-3" /> {msg.email}</p>
                      </div>
                      
                      <div className="flex gap-2">
                        <a 
                          href={`mailto:${msg.email}?subject=Reply from MultiServicePro&body=Hi ${msg.name},%0D%0A%0D%0ARegarding your inquiry:%0D%0A"${msg.message}"%0D%0A%0D%0A`}
                          className="bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 p-2 rounded-full transition hover:scale-110"
                          title="Reply via Email"
                        >
                          <Reply className="w-4 h-4" />
                        </a>

                        {msg.status === 'New' && (
                          <button 
                            onClick={() => markMessageRead(msg.id)}
                            disabled={updatingId === msg.id}
                            className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 p-2 rounded-full transition hover:text-green-600"
                            title="Mark as Read"
                          >
                            {updatingId === msg.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                          </button>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-3 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg border border-gray-100 dark:border-gray-700">
                      <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{msg.message}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>

      </motion.div>
    </main>
  );
}